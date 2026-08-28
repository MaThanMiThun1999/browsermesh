import { constructMetadata } from "@/lib/seo";
import FeaturesView from "@/components/features/FeaturesView";

export const metadata = constructMetadata({
    title: "BrowserMesh Features - Stealth Nodes, Proxy Rotation & 99.99% Uptime",
    description:
        "Explore BrowserMesh features: real TLS fingerprinting, automated CAPTCHA solving, peer-to-peer browser pool, and cross-platform GUI/CLI nodes.",
    path: "/features",
});

export default function FeaturesPage() {
    return <FeaturesView />;
}
