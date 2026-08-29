import type { Metadata } from "next";
import PluginDetailsView from "@/components/marketplace/PluginDetailsView";
import { getPublicPluginDetail } from "@/lib/api";
import { generatePluginSchema, generateBreadcrumbSchema, constructMetadata, SITE_URL } from "@/lib/seo";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const plugin = await getPublicPluginDetail(id);

    if (!plugin) {
        return constructMetadata({
            title: "Plugin Details | BrowserMesh",
            description: "View no-code web scraping plugin specifications and run jobs.",
            path: `/marketplace/${id}`,
        });
    }

    return constructMetadata({
        title: `${plugin.name} | BrowserMesh Marketplace`,
        description:
            plugin.description ||
            `Download and run ${plugin.name} on Windows, Linux, and Android with BrowserMesh.`,
        path: `/marketplace/${plugin.slug || id}`,
    });
}

export default async function PluginDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const plugin = await getPublicPluginDetail(id);

    const pluginSchemaData = plugin
        ? generatePluginSchema({
              name: plugin.name,
              description: plugin.description || `${plugin.name} web scraping plugin for BrowserMesh.`,
              category: plugin.category || "Web Scraping Plugin",
              rating: plugin.averageRating,
              reviewCount: plugin.reviewCount,
              authorName: typeof plugin.author === "string" ? plugin.author : "BrowserMesh Verified Creator",
              url: `${SITE_URL}/marketplace/${plugin.slug || id}`,
              image: plugin.bannerUrl || plugin.iconUrl || "/opengraph-img.png",
          })
        : null;

    const breadcrumbSchemaData = generateBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Marketplace", item: "/marketplace" },
        { name: plugin ? plugin.name : "Plugin Details", item: `/marketplace/${plugin?.slug || id}` },
    ]);

    return (
        <>
            {/* Server-Side Rendered JSON-LD Schemas for Instant Google Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        pluginSchemaData
                            ? [pluginSchemaData, breadcrumbSchemaData]
                            : [breadcrumbSchemaData]
                    ),
                }}
            />
            <PluginDetailsView slug={id} />
        </>
    );
}
