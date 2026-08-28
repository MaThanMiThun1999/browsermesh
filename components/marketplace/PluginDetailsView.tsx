"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import PluginHero from "./plugin-details/PluginHero";
import PluginTabsNav, { PluginTabType } from "./plugin-details/PluginTabsNav";
import PluginOverview from "./plugin-details/PluginOverview";
import PluginSchema from "./plugin-details/PluginSchema";
import PluginReviews from "./plugin-details/PluginReviews";
import PluginChangelog from "./plugin-details/PluginChangelog";
import PluginHelpCTA from "./plugin-details/PluginHelpCTA";
import PluginSidebar from "./plugin-details/PluginSidebar";
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer";
import { getPublicPluginDetail, PublicPluginDetail } from "@/lib/api";

const VALID_TABS: PluginTabType[] = ["overview", "readme", "schema", "reviews", "changelog"];

interface PluginDetailsViewProps {
    slug?: string;
}

function PluginDetailsContent({ slug }: PluginDetailsViewProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Data Fetching State
    const [plugin, setPlugin] = useState<PublicPluginDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Tab Navigation State
    const rawTabParam = searchParams.get("tab") as PluginTabType;
    const activeTab: PluginTabType =
        rawTabParam && VALID_TABS.includes(rawTabParam) ? rawTabParam : "overview";

    useEffect(() => {
        if (!slug) return;
        let isMounted = true;

        async function loadPluginData() {
            setLoading(true);
            setError(null);
            try {
                const data = await getPublicPluginDetail(slug as string);
                if (isMounted) {
                    if (data) {
                        setPlugin(data);
                    } else {
                        setError("Plugin not found. It may have been removed or updated.");
                    }
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Failed to load plugin details:", err);
                    setError(
                        "Unable to load plugin details. Please check your connection and try again."
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadPluginData();

        return () => {
            isMounted = false;
        };
    }, [slug]);

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

    const handleRetry = () => {
        if (!slug) return;
        setLoading(true);
        setError(null);
        getPublicPluginDetail(slug)
            .then((data) => {
                if (data) {
                    setPlugin(data);
                } else {
                    setError("Plugin not found. It may have been removed or updated.");
                }
            })
            .catch(() => {
                setError("Unable to load plugin details. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // 1. Loading Skeleton View
    if (loading) {
        return (
            <div className="w-full min-h-screen bg-[#07071a] text-slate-200 pb-0 md:pb-20 pt-28 sm:pt-36">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-8">
                    {/* Hero Skeleton */}
                    <div className="w-full bg-[#080517]/80 border border-white/10 rounded-3xl p-6 sm:p-10 h-72 animate-pulse flex flex-col justify-between">
                        <div className="flex gap-4">
                            <div className="w-20 h-20 bg-white/5 rounded-2xl shrink-0" />
                            <div className="flex flex-col gap-3 flex-1">
                                <div className="h-7 bg-white/5 rounded-lg w-1/3" />
                                <div className="h-4 bg-white/5 rounded-lg w-2/3" />
                                <div className="h-4 bg-white/5 rounded-lg w-1/4" />
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="h-10 bg-white/5 rounded-xl w-32" />
                            <div className="h-10 bg-white/5 rounded-xl w-32" />
                        </div>
                    </div>

                    {/* Tabs Skeleton */}
                    <div className="h-12 bg-white/5 rounded-2xl w-full max-w-md animate-pulse" />

                    {/* Content Columns Skeleton */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 h-96 bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse" />
                        <div className="lg:col-span-4 h-96 bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    // 2. Error / 404 View
    if (error || !plugin) {
        return (
            <div className="w-full min-h-screen bg-[#07071a] text-slate-200 pb-0 md:pb-20 pt-28 sm:pt-36 flex items-center justify-center">
                <div className="max-w-md mx-auto px-4 text-center flex flex-col items-center gap-5 bg-[#0a0518] border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
                    <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                        <AlertCircle size={28} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold text-white">Plugin Unavailable</h2>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {error || "Plugin not found."}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mt-2 w-full">
                        <button
                            onClick={handleRetry}
                            className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <RefreshCw size={14} /> Retry
                        </button>
                        <Link
                            href="/marketplace"
                            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <ArrowLeft size={14} /> Marketplace
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // 3. Plugin Loaded View
    return (
        <div className="w-full min-h-screen bg-[#07071a] text-slate-200 pb-0 md:pb-20 pt-28 sm:pt-36">
            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent blur-[140px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* 1. Hero Card & Breadcrumbs */}
                <PluginHero
                    id={plugin.id}
                    slug={plugin.slug}
                    name={plugin.name}
                    author={plugin.author}
                    category={plugin.category}
                    tier={plugin.tier}
                    isVerified={plugin.type === "verified" || plugin.isFeatured}
                    averageRating={plugin.averageRating}
                    reviewCount={plugin.reviewCount}
                    installCount={plugin.installCount}
                    iconUrl={plugin.iconUrl}
                    bannerUrl={plugin.bannerUrl}
                />

                {/* 2. Sub-Navigation Tabs Bar */}
                <PluginTabsNav
                    activeTab={activeTab}
                    onTabChange={handleTabChange}
                    reviewCount={plugin.reviewCount}
                />

                {/* 3. Conditional Tab Views */}
                {/* TAB 1: REVIEWS TAB */}
                {activeTab === "reviews" && (
                    <div className="w-full mb-10">
                        <PluginReviews
                            id={plugin.id}
                            slug={plugin.slug}
                            averageRating={plugin.averageRating}
                            reviewCount={plugin.reviewCount}
                        />
                    </div>
                )}

                {/* TAB 2: README TAB */}
                {activeTab === "readme" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
                        <div className="lg:col-span-8 bg-[#080517]/80 border border-white/10 rounded-2xl p-4 sm:p-8 shadow-xl">
                            <h3 className="text-white font-bold text-base sm:text-xl mb-4 sm:mb-6 pb-2.5 sm:pb-4 border-b border-white/10">
                                Plugin README & Documentation
                            </h3>
                            {plugin.readme ? (
                                <MarkdownRenderer content={plugin.readme} />
                            ) : (
                                <p className="text-slate-400 text-sm">
                                    No README documentation provided for this plugin.
                                </p>
                            )}
                        </div>
                        <div className="lg:col-span-4">
                            <PluginSidebar
                                id={plugin.id}
                                slug={plugin.slug}
                                latestVersion={plugin.latestVersion}
                                author={plugin.author}
                                installCount={plugin.installCount}
                                viewCount={plugin.viewCount}
                                totalJobs={plugin.totalJobs}
                                compatibility={plugin.compatibility}
                                websiteUrl={plugin.websiteUrl}
                                documentationUrl={plugin.documentationUrl}
                                createdAt={plugin.createdAt}
                            />
                        </div>
                    </div>
                )}

                {/* TAB 3: DATA & SCHEMA TAB (FULL WIDTH ONLY, NO SIDEBAR) */}
                {activeTab === "schema" && (
                    <div className="w-full mb-10">
                        <PluginSchema
                            sampleOutput={
                                Array.isArray(plugin.sampleOutput)
                                    ? (plugin.sampleOutput as Record<string, unknown>[])
                                    : null
                            }
                        />
                    </div>
                )}

                {/* TAB 4: CHANGELOG TAB */}
                {activeTab === "changelog" && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 items-start">
                        <div className="lg:col-span-7">
                            <PluginChangelog
                                createdAt={plugin.createdAt}
                                versions={plugin.versions}
                            />
                        </div>
                        <div className="lg:col-span-5">
                            <PluginHelpCTA />
                        </div>
                    </div>
                )}

                {/* TAB 5: OVERVIEW TAB (Full Page View) */}
                {activeTab === "overview" && (
                    <div className="flex flex-col gap-10 mb-10">
                        {/* Top Section: Overview Content (8 cols) + Action Sidebar (4 cols) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            <div className="lg:col-span-8">
                                <PluginOverview
                                    description={plugin.description}
                                    readme={plugin.readme}
                                    features={plugin.features}
                                    examples={plugin.examples}
                                />
                            </div>
                            <div className="lg:col-span-4">
                                <PluginSidebar
                                    id={plugin.id}
                                    slug={plugin.slug}
                                    latestVersion={plugin.latestVersion}
                                    author={plugin.author}
                                    installCount={plugin.installCount}
                                    viewCount={plugin.viewCount}
                                    totalJobs={plugin.totalJobs}
                                    compatibility={plugin.compatibility}
                                    websiteUrl={plugin.websiteUrl}
                                    documentationUrl={plugin.documentationUrl}
                                    createdAt={plugin.createdAt}
                                />
                            </div>
                        </div>

                        {/* Full-Width Execution Preview Section */}
                        <div className="w-full">
                            <PluginSchema
                                sampleOutput={
                                    Array.isArray(plugin.sampleOutput)
                                        ? (plugin.sampleOutput as Record<string, unknown>[])
                                        : null
                                }
                            />
                        </div>

                        {/* Full Width Help CTA Banner */}
                        <div className="w-full">
                            <PluginHelpCTA />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PluginDetailsView({ slug }: PluginDetailsViewProps) {
    return (
        <Suspense fallback={<div className="min-h-screen w-full bg-[#07071a]" />}>
            <PluginDetailsContent slug={slug} />
        </Suspense>
    );
}
