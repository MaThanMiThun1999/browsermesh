import PluginDetailsView from "@/components/marketplace/PluginDetailsView";

export default async function PluginDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    return <PluginDetailsView slug={id} />;
}
