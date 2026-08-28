import { constructMetadata } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import MarketplacePreview from "@/components/home/MarketplacePreview";
import GetStarted from "@/components/home/GetStarted";
import DownloadPlatforms from "@/components/home/DownloadPlatforms";
import WhyBrowserMesh from "@/components/home/WhyBrowserMesh";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

export const metadata = constructMetadata({
    title: "BrowserMesh - Enterprise Stealth Scraping & Residential Node Network",
    description:
        "Extract web data at scale with BrowserMesh: decentralized residential browser nodes, 99.99% success rate, automated proxy rotation, and CAPTCHA solver.",
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
            <Testimonials />
            <CTABanner />
        </>
    );
}
