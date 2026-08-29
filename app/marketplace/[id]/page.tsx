import type { Metadata } from "next";
import PluginDetailsView from "@/components/marketplace/PluginDetailsView";
import { getPublicPluginDetail } from "@/lib/api";
import { constructMetadata, generatePluginSchema, generateBreadcrumbSchema } from "@/lib/seo";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const plugin = await getPublicPluginDetail(id);

    if (!plugin) {
        return constructMetadata({
            title: "Plugin Details - BrowserMesh Marketplace",
            description:
                "View details, parameters, and live execution preview for BrowserMesh web scraping plugins.",
            path: `/marketplace/${id}`,
        });
    }

    const title = `${plugin.name} - Stealth Web Scraper Plugin | BrowserMesh`;
    const description =
        plugin.description ||
        `Extract structured data with the ${plugin.name} plugin on BrowserMesh. 99.99% success rate with automated residential node proxy routing.`;
    const path = `/marketplace/${plugin.slug || id}`;
    const image = plugin.bannerUrl || "/opengraph-img.png";

    return constructMetadata({
        title,
        description,
        path,
        image,
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
              url: `https://browsermesh-one.vercel.app/marketplace/${plugin.slug || id}`,
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
