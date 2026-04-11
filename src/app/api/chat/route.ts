import { NextResponse } from "next/server";
import OpenAI from "openai";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const reqSchema = z.object({
  message: z.string().min(1),
  history: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() })).optional(),
  draftOrder: z
    .object({
      productId: z.string().optional(),
      customerName: z.string().optional(),
      customerPhone: z.string().optional(),
      customerAddress: z.string().optional(),
      expectedField: z.enum(["name", "phone", "address"]).optional(),
    })
    .optional(),
});

const SYSTEM_PROMPT = `You are an AI sales assistant for an eCommerce store called OrganoCity.
Your goal is to help users find the right products, answer questions, and guide them to purchase.

You sell:
* Shilajit (energy, stamina, men health)
* Himalayan Pink Salt (natural mineral)
* Herbal products (health, detox, wellness)

Rules:
* Always be helpful and sales-focused
* Recommend products when relevant
* Keep answers short and clear
* If user wants to buy, guide them step-by-step
* Ask for name, phone, and address for order
* Suggest WhatsApp if needed

If product data is available, use real product info.`;

const HTML_RESPONSE_RULES = `
Return your final answer as valid, clean HTML fragment only (no markdown).
Use tags like: <h3>, <p>, <ul>, <li>, <strong>, <div>, <img>.
When recommending products, include compact product cards in HTML with title, price, and image when available.
Keep output concise and visually structured.
`;

export async function POST(request: Request) {
  try {
    const body = reqSchema.parse(await request.json());
    const text = body.message.trim();
    const lower = text.toLowerCase();

    const products = await prisma.product.findMany({
      where: { status: "ACTIVE" },
      take: 6,
      orderBy: { updatedAt: "desc" },
      select: { id: true, title: true, price: true, tags: true, featuredImage: true },
    });

    let draftOrder = body.draftOrder || {};
    const buyIntent = /(buy|order|purchase|place order|book)/i.test(lower);

    // Draft order state-machine.
    if (draftOrder.expectedField === "name") {
      draftOrder = { ...draftOrder, customerName: text, expectedField: "phone" };
      return NextResponse.json({
        reply: "Great! Please share your phone number.",
        replyHtml: "<h3>Great!</h3><p>Please share your <strong>phone number</strong>.</p>",
        draftOrder,
        intent: "order",
      });
    }
    if (draftOrder.expectedField === "phone") {
      draftOrder = { ...draftOrder, customerPhone: text, expectedField: "address" };
      return NextResponse.json({
        reply: "Perfect. Please send your full delivery address.",
        replyHtml: "<h3>Perfect.</h3><p>Please send your <strong>full delivery address</strong>.</p>",
        draftOrder,
        intent: "order",
      });
    }
    if (draftOrder.expectedField === "address") {
      draftOrder = { ...draftOrder, customerAddress: text, expectedField: undefined };
      if (draftOrder.productId && draftOrder.customerName && draftOrder.customerPhone && draftOrder.customerAddress) {
        return NextResponse.json({
          reply: "Thanks! I have everything. Confirm to place your order now.",
          replyHtml:
            "<h3>Order details captured</h3><p>I have your details now. Please confirm and I will place your order.</p>",
          draftOrder,
          intent: "order_confirm",
          action: "submit_order",
        });
      }
    }

    if (buyIntent) {
      const selected = products.find((p) => lower.includes(p.title.toLowerCase())) || products[0];
      if (selected) {
        draftOrder = { productId: selected.id, expectedField: "name" };
        return NextResponse.json({
          reply: `Awesome choice. I can place an order for ${selected.title} (PKR ${selected.price}). Please share your name.`,
          replyHtml: `<h3>Great choice!</h3><div><strong>${selected.title}</strong> - PKR ${selected.price}</div><p>Please share your <strong>name</strong> to start order confirmation.</p>`,
          draftOrder,
          intent: "order",
          recommendations: products.map((p) => ({ id: p.id, title: p.title, price: p.price, image: p.featuredImage })),
        });
      }
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        reply: "AI is not configured yet. Please add OPENAI_API_KEY in .env. Meanwhile, I can still help with product list and orders.",
        replyHtml:
          "<h3>AI key missing</h3><p>Please add <strong>OPENAI_API_KEY</strong> in your <code>.env</code>. I can still help with product and order guidance.</p>",
        recommendations: products.map((p) => ({ id: p.id, title: p.title, price: p.price, image: p.featuredImage })),
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const productContext = products
      .map((p) => {
        const tags = Array.isArray(p.tags)
          ? (p.tags as unknown[]).filter((x): x is string => typeof x === "string").join(", ")
          : "";
        return `- ${p.title} | PKR ${p.price} | image: ${p.featuredImage || "N/A"} | tags: ${tags || "N/A"}`;
      })
      .join("\n");
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "system",
          content: `Live product data:\n${productContext}\nIf user asks for energy suggest Shilajit first, if weight loss suggest herbal products.\n${HTML_RESPONSE_RULES}`,
        },
        ...(body.history || []).map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: text },
      ],
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content || "How can I help you with OrganoCity products?",
      replyHtml: completion.choices[0]?.message?.content || "<p>How can I help you with OrganoCity products?</p>",
      recommendations: products.map((p) => ({ id: p.id, title: p.title, price: p.price, image: p.featuredImage })),
      draftOrder,
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message || "Chat failed" }, { status: 500 });
  }
}

