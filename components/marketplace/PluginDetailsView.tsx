"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import PluginHero from "./plugin-details/PluginHero";
import PluginTabsNav, { PluginTabType } from "./plugin-details/PluginTabsNav";
import PluginOverview from "./plugin-details/PluginOverview";
import PluginSchema from "./plugin-details/PluginSchema";
import PluginReviews from "./plugin-details/PluginReviews";
import PluginChangelog from "./plugin-details/PluginChangelog";
import PluginHelpCTA from "./plugin-details/PluginHelpCTA";
import PluginSidebar from "./plugin-details/PluginSidebar";

const VALID_TABS: PluginTabType[] = ["overview", "schema", "reviews", "changelog"];

function PluginDetailsContent() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Derive activeTab directly during render from searchParams (React 19 / Next.js best practice)
    const rawTabParam = searchParams.get("tab") as PluginTabType;
    const activeTab: PluginTabType =
        rawTabParam && VALID_TABS.includes(rawTabParam) ? rawTabParam : "overview";

    // Update URL search parameters on tab selection
    const handleTabChange = (tab: PluginTabType) => {
        const params = new URLSearchParams(searchParams.toString());
        if (tab === "overview") {
            params.delete("tab");
        } else {
            params.set("tab", tab);
        }
        const queryString = params.toString();
        const newPath = queryString ? `${pathname}?${queryString}` : pathname;
        router.replace(newPath, { scroll: false });
    };

    return (
        <div className="w-full min-h-screen bg-[#07071a] text-slate-200 pb-20 pt-28 sm:pt-36">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent blur-[140px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* 1. Hero Card & Breadcrumbs */}
                <PluginHero />

                {/* 2. Sub-Navigation Tabs Bar */}
                <PluginTabsNav activeTab={activeTab} onTabChange={handleTabChange} />

                {/* 3. Conditional Tab Views */}
                {/* TAB 1: REVIEWS TAB */}
                {activeTab === "reviews" && (
                    <div className="w-full mb-10">
                        <PluginReviews />
                    </div>
                )}

                {/* TAB 2: DATA & SCHEMA TAB */}
                {activeTab === "schema" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
                        <div className="lg:col-span-8">
                            <PluginSchema />
                        </div>
                        <div className="lg:col-span-4">
                            <PluginSidebar />
                        </div>
                    </div>
                )}

                {/* TAB 3: CHANGELOG TAB */}
                {activeTab === "changelog" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
                        <div className="lg:col-span-7">
                            <PluginChangelog />
                        </div>
                        <div className="lg:col-span-5">
                            <PluginHelpCTA />
                        </div>
                    </div>
                )}

                {/* TAB 4: OVERVIEW TAB (Full Page View) */}
                {activeTab === "overview" && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
                            {/* Left Main Content Column (8 cols) */}
                            <div className="lg:col-span-8 flex flex-col gap-10">
                                <PluginOverview />
                                <div className="pt-4 border-t border-white/5">
                                    <PluginSchema />
                                </div>
                            </div>

                            {/* Right Action Sidebar Column (4 cols) */}
                            <div className="lg:col-span-4">
                                <PluginSidebar />
                            </div>
                        </div>

                        {/* Full-Width Changelog (7 cols) + Need Help CTA (5 cols) */}
                        <div className="w-full mb-10 pt-4 border-t border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                            <div className="lg:col-span-7">
                                <PluginChangelog />
                            </div>
                            <div className="lg:col-span-5">
                                <PluginHelpCTA />
                            </div>
                        </div>

                        {/* Full-Width Customer Reviews */}
                        <div className="w-full mb-10 pt-4 border-t border-white/5">
                            <PluginReviews />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function PluginDetailsView() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#07071a]" />}>
            <PluginDetailsContent />
        </Suspense>
    );
}
