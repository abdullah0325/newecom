import { getPolicyContent } from "@/lib/site-settings";

export default async function PrivacyPage() {
    const policy = await getPolicyContent("privacyPolicy", {
        title: "Privacy Policy",
        body: "<p>At OrganoCity, we value your privacy. This policy outlines how we collect, use, and protect your personal information.</p>",
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

