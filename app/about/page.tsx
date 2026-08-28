import { constructMetadata } from "@/lib/seo";
import AboutView from "@/components/about/AboutView";

export const metadata = constructMetadata({
    title: "About BrowserMesh - Founder Story, Mission & Platform Journey",
    description:
        "Learn about BrowserMesh and founder Mathanraj Murugesan. Built to revolutionize stealth data extraction with decentralized residential browser nodes.",
    path: "/about",
});

export default function AboutPage() {
    return <AboutView />;
}
