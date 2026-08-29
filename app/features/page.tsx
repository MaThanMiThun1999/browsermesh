import { constructMetadata } from "@/lib/seo";
import FeaturesView from "@/components/features/FeaturesView";

export const metadata = constructMetadata({
    title: "Stealth Browser Automation & Concurrency Features | BrowserMesh",
    description:
        "Explore BrowserMesh capabilities: Canvas fingerprint spoofing, auto-retry job queues, TLS JA4 masking, and encrypted cloud sync across cross-platform nodes.",
    path: "/features",
});

export default function FeaturesPage() {
    return <FeaturesView />;
}
