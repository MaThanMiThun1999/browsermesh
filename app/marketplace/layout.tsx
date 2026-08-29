import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
    title: "No-Code Web Scraper Plugins Marketplace | BrowserMesh",
    description:
        "Install 250+ pre-built stealth web scrapers with zero coding. Extract data from Amazon, Google Maps, and LinkedIn with zero IP bans. Run on Windows, Linux, Android, or Web.",
    path: "/marketplace",
});

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
