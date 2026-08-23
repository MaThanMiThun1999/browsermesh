import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import MarketplacePreview from "@/components/home/MarketplacePreview";
import GetStarted from "@/components/home/GetStarted";
import DownloadPlatforms from "@/components/home/DownloadPlatforms";
import WhyBrowserMesh from "@/components/home/WhyBrowserMesh";
import Testimonials from "@/components/home/Testimonials";
import CTABanner from "@/components/home/CTABanner";

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
