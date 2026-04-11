import { getPolicyContent } from "@/lib/site-settings";

export default async function TermsPage() {
    const policy = await getPolicyContent("termsOfService", {
        title: "Terms and Conditions",
        body: "<p>Welcome to OrganoCity. These terms and conditions outline the rules and regulations for the use of our Website.</p>",
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

