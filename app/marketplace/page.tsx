import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import CategoryBrowser from "@/components/marketplace/CategoryBrowser";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import MarketplaceGrid from "@/components/marketplace/MarketplaceGrid";
import MarketplaceStats from "@/components/marketplace/MarketplaceStats";
import MarketplaceCTA from "@/components/marketplace/MarketplaceCTA";

export default function MarketplacePage() {
    return (
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <MarketplaceHero />
            <CategoryBrowser />

            {/* Main Content Area (Sidebar + Grid) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6 lg:gap-10 w-full">
                <MarketplaceFilters />
                <MarketplaceGrid />
            </section>

            <MarketplaceStats />
            <MarketplaceCTA />
        </div>
    );
}
