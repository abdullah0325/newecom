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

const SYSTEM_PROMPT = `
You are a high-converting AI sales assistant for OrganoCity.

Your goal is to:
- Help users choose the right product
- Explain benefits simply
- Convert them into buyers

Focus products:
- Shilajit → energy, stamina, men's health
- Pink Salt → natural minerals, daily use
- Herbal → detox, weight loss, wellness

Behavior:
- Be short, clear, and persuasive
- Recommend products naturally
- Always include a CTA
- Guide users step-by-step to order

If user shows buying intent:
→ Immediately start order process

Use real product data when available.
`;

const HTML_RESPONSE_RULES = `
Return ONLY clean HTML (no markdown, no backticks).

When showing products, use this exact card design (for WhatsApp use: https://wa.me/923171707418):

<div style="display:flex; flex-direction:column; gap:12px; margin-top:12px;">
  <!-- PRODUCT CARD -->
  <div style="border:1px solid #C6A24A20; border-radius:16px; overflow:hidden; background:white; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
    <!-- IMAGE CONTAINER -->
    <div style="position:relative; aspect-ratio:1; background:#F6F1E7; overflow:hidden;">
      <img src="IMAGE_URL" alt="PRODUCT_NAME" style="width:100%; height:100%; object-fit:cover; transition:transform 0.3s;" />
      <!-- PRICE BADGE -->
      <div style="position:absolute; top:8px; left:8px; background:rgba(255,255,255,0.8); backdrop-filter:blur(8px); border:1px solid rgba(255,255,255,0.4); border-radius:20px; padding:6px 12px; font-size:14px; font-weight:bold; color:#1F6B4F;">
        PKR PRICE
      </div>
    </div>
    <!-- CONTENT -->
    <div style="padding:12px; display:flex; flex-direction:column; gap:8px;">
      <div style="overflow:hidden; text-overflow:ellipsis; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; font-weight:600; color:#1E1F1C; font-size:14px; line-height:1.4;">
        PRODUCT_NAME
      </div>
      <!-- TAG IF AVAILABLE -->
      <span style="display:inline-flex; border-radius:999px; background:#F6F1E7; padding:4px 10px; font-size:11px; font-weight:600; color:#1F6B4F;">
        TAG_TEXT
      </span>
      <!-- BUTTONS -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:4px;">
        <!-- WhatsApp Button -->
        <a href="https://wa.me/923171707418?text=Hi, I want to order PRODUCT_NAME" target="_blank" rel="noopener noreferrer" style="display:inline-flex; align-items:center; justify-content:center; gap:6px; border:1px solid #1F6B4F20; border-radius:8px; padding:8px 6px; font-size:11px; font-weight:600; color:#1F6B4F; text-decoration:none; transition:background 0.2s;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.195.194 1.628.122.602-.1 1.64-.641 1.87-1.26.173-.423.233-.724.233-.989 0-.213-.01-.402-.01-.548-.002-.15-.006-.3-.017-.45l.007-.017.03-.033c.29-.243.42-.544.42-.87 0-.426-.352-.796-.79-.796z"/></svg>
          WhatsApp
        </a>
        <!-- Add to Cart Button - use data attributes -->
        <button data-add-to-cart="true" data-variant-id="VARIANT_ID" data-title="PRODUCT_NAME" data-price="PRICE" data-image="IMAGE_URL" style="display:inline-flex; align-items:center; justify-content:center; gap:6px; border-radius:8px; padding:8px 6px; font-size:11px; font-weight:600; color:white; background:#1F6B4F; border:none; cursor:pointer; transition:background 0.2s;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
          Add
        </button>
      </div>
    </div>
  </div>
</div>

End with CTA (no product cards after this):
<p style="margin-top:16px; text-align:center;"><strong>👉 Ready to order? Tell me and I'll assist you.</strong></p>
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
      select: { 
        id: true, 
        title: true, 
        price: true, 
        tags: true, 
        featuredImage: true,
      },
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
          recommendations: products.map((p) => ({ id: p.id, variantId: p.id, title: p.title, price: String(p.price), image: p.featuredImage })),
        });
      }
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        reply: "AI is not configured yet. Please add OPENAI_API_KEY in .env. Meanwhile, I can still help with product list and orders.",
        replyHtml:
          "<h3>AI key missing</h3><p>Please add <strong>OPENAI_API_KEY</strong> in your <code>.env</code>. I can still help with product and order guidance.</p>",
        recommendations: products.map((p) => ({ id: p.id, variantId: p.id, title: p.title, price: String(p.price), image: p.featuredImage })),
      });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const productContext = products
      .map((p) => {
        const tags = Array.isArray(p.tags)
          ? (p.tags as unknown[]).filter((x): x is string => typeof x === "string").join(", ")
          : "";
        return `- ${p.title} | PKR ${p.price} | id: ${p.id} | image: ${p.featuredImage || "N/A"} | tags: ${tags || "N/A"}`;
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
      recommendations: products.map((p) => ({ id: p.id, variantId: p.id, title: p.title, price: String(p.price), image: p.featuredImage })),
      draftOrder,
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message || "Chat failed" }, { status: 500 });
  }
}

