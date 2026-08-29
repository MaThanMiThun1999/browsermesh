import { constructMetadata } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import MarketplacePreview from "@/components/home/MarketplacePreview";
import GetStarted from "@/components/home/GetStarted";
import DownloadPlatforms from "@/components/home/DownloadPlatforms";
import WhyBrowserMesh from "@/components/home/WhyBrowserMesh";
import CompetitorComparison from "@/components/home/CompetitorComparison";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export const metadata = constructMetadata({
    title: "BrowserMesh | Multi-Platform Stealth Web Scraper & Mobile Residential Nodes",
    description:
        "Bypass Cloudflare and anti-bot protections instantly. BrowserMesh is a multi-platform stealth web scraper for Windows, Linux, and Android with 4G/5G mobile residential nodes and no-code plugins.",
    path: "/",
});

export default function Home() {
    return (
        <>
            <Hero />
            <Features />
            <MarketplacePreview />
            <GetStarted />
            <DownloadPlatforms />
            <WhyBrowserMesh />
            <CompetitorComparison />
            <Testimonials />
            <CTABanner />
        </>
    );
}
