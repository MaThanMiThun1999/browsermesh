import dynamic from "next/dynamic";
import { constructMetadata } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";

// Code-split below-the-fold components for optimal critical rendering performance
const MarketplacePreview = dynamic(() => import("@/components/home/MarketplacePreview"));
const GetStarted = dynamic(() => import("@/components/home/GetStarted"));
const DownloadPlatforms = dynamic(() => import("@/components/home/DownloadPlatforms"));
const WhyBrowserMesh = dynamic(() => import("@/components/home/WhyBrowserMesh"));
const CompetitorComparison = dynamic(() => import("@/components/home/CompetitorComparison"));
const Testimonials = dynamic(() => import("@/components/home/Testimonials"));
const CTABanner = dynamic(() => import("@/components/home/CTABanner"));

export const metadata = constructMetadata({
    title: "BrowserMesh | Multi-Platform Stealth Web Scraper & Mobile Nodes",
    description:
        "Bypass Cloudflare and anti-bot systems with BrowserMesh: a multi-platform stealth web scraper with 4G/5G mobile residential nodes and no-code plugins.",
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

