import { getPolicyContent } from "@/lib/site-settings";

export default async function RefundPolicyPage() {
    const policy = await getPolicyContent("refundPolicy", {
        title: "Refund Policy",
        body: "<p>Thank you for shopping at OrganoCity. If you are not entirely satisfied with your purchase, we're here to help.</p>",
    });

    return (
        <div className="bg-background px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-muted-foreground">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{policy.title}</h1>
                <div
                    className="mt-6 text-base leading-7 prose prose-gray max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: policy.body }}
                />
            </div>
        </div>
    );
}

