import { constructMetadata } from "@/lib/seo";
import PricingView from "@/components/pricing/PricingView";

export const metadata = constructMetadata({
    title: "BrowserMesh Pricing - Free & Pro Stealth Web Scraping Plans",
    description:
        "Flexible BrowserMesh pricing plans. Start free with 500 monthly results or upgrade to Pro for $15/mo with 10,000 results, proxy support, and Pro plugins.",
    path: "/pricing",
});

export default function PricingPage() {
    return <PricingView />;
}
