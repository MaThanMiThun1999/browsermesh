import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "BrowserMesh Marketplace - 250+ Stealth Web Scraping Plugins",
    description:
        "Browse pre-built scrapers for Amazon, Google Maps, LinkedIn, Instagram, Twitter, and Zillow. Instantly extract clean structured data with BrowserMesh plugins.",
    path: "/marketplace",
});

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
