import type { Metadata } from "next";
import PluginDetailsView from "@/components/marketplace/PluginDetailsView";
import { getPublicPluginDetail } from "@/lib/api";
import { constructMetadata } from "@/lib/seo";

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

    const title = `${plugin.name} - BrowserMesh Marketplace Plugin`;
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
    return <PluginDetailsView slug={id} />;
}
