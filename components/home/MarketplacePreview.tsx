"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Star,
    TrendingUp,
    Sparkles,
    CheckCircle,
    Download,
    Code2,
    ChevronRight,
    RefreshCw,
    Eye,
} from "lucide-react";
import { getDynamicPluginIcon } from "@/utils/icon-utils";
import { getPublicMarketplacePlugins, getPublicStats, PublicPlugin } from "@/lib/api";

type TabLabel = "Top Rated" | "Trending" | "New" | "Verified";

interface TabItem {
    label: TabLabel;
    key: string;
    icon: React.ReactNode;
}

const TABS: TabItem[] = [
    { label: "Top Rated", key: "top_rated", icon: <Star size={13} /> },
    { label: "Trending", key: "trending", icon: <TrendingUp size={13} /> },
    { label: "New", key: "new", icon: <Sparkles size={13} /> },
    { label: "Verified", key: "featured", icon: <CheckCircle size={13} /> },
];

export default function MarketplacePreview() {
    const [activeTab, setActiveTab] = useState<TabLabel>("Top Rated");
    const [plugins, setPlugins] = useState<PublicPlugin[]>([]);
    const [globalTotalPlugins, setGlobalTotalPlugins] = useState<number | null>(null);
    const [statsLoading, setStatsLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch overall platform telemetry stats for the header badge with loading state
    useEffect(() => {
        let isMounted = true;
        getPublicStats()
            .then((stats) => {
                if (isMounted && stats && typeof stats.totalPlugins === "number") {
                    setGlobalTotalPlugins(stats.totalPlugins);
                }
            })
            .finally(() => {
                if (isMounted) {
                    setStatsLoading(false);
                }
            });
        return () => {
            isMounted = false;
        };
    }, []);

    // Fetch tab-filtered preview plugins with limit: 5
    useEffect(() => {
        let isMounted = true;

        async function loadPlugins() {
            setLoading(true);
            setError(null);

            const tab = TABS.find((t) => t.label === activeTab);
            const filterKey = tab?.key || "top_rated";

            try {
                const res = await getPublicMarketplacePlugins({
                    filter: filterKey,
                    limit: 5,
                });

                if (isMounted) {
                    if (res && Array.isArray(res.plugins)) {
                        setPlugins(res.plugins);
                    } else {
                        setPlugins([]);
                    }
                }
            } catch (err: unknown) {
                if (isMounted) {
                    console.error("Error fetching marketplace preview plugins:", err);
                    setError("Failed to load plugins. Please check your connection.");
                    setPlugins([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        loadPlugins();

        return () => {
            isMounted = false;
        };
    }, [activeTab]);

    const handleRetry = () => {
        setLoading(true);
        setError(null);
        const tab = TABS.find((t) => t.label === activeTab);
        const filterKey = tab?.key || "top_rated";
        getPublicMarketplacePlugins({ filter: filterKey, limit: 5 })
            .then((res) => {
                if (res && Array.isArray(res.plugins)) {
                    setPlugins(res.plugins);
                } else {
                    setPlugins([]);
                }
            })
            .catch(() => {
                setError("Failed to load plugins. Please check your connection.");
                setPlugins([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4 md:py-8">
            <div className="bg-white/[0.02] border border-white/5 shadow-2xl rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 md:mb-8 gap-3 md:gap-4">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center shadow-inner">
                            <span className="text-xl md:text-3xl drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                                🔥
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-row items-center gap-2 md:gap-3 flex-wrap">
                                <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight leading-none">
                                    Marketplace
                                </h2>
                                <div className="w-fit">
                                    {statsLoading ? (
                                        <span className="text-[10px] md:text-[11px] bg-indigo-500/10 text-indigo-300/70 border border-indigo-500/20 rounded-full px-2 py-0.5 font-semibold tracking-wide whitespace-nowrap animate-pulse flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                                            Loading Stats...
                                        </span>
                                    ) : (
                                        <span className="text-[10px] md:text-[11px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full px-2 py-0.5 font-semibold tracking-wide whitespace-nowrap">
                                            {globalTotalPlugins !== null && globalTotalPlugins > 0
                                                ? `${globalTotalPlugins}+`
                                                : "200+"}{" "}
                                            Active Plugins
                                        </span>
                                    )}
                                </div>
                            </div>
                            <p className="text-slate-400 text-xs md:text-sm leading-snug">
                                Discover, install and run powerful scraping plugins.
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/marketplace"
                        className="text-xs md:text-sm text-[#7c3aed] hover:text-indigo-400 flex items-center gap-1 font-medium transition-colors"
                    >
                        View All Plugins <ChevronRight size={14} />
                    </Link>
                </div>

                {/* Tabs */}
                <div className="flex gap-1.5 md:gap-2 mb-4 md:mb-8 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {TABS.map((t) => (
                        <button
                            key={t.label}
                            onClick={() => setActiveTab(t.label)}
                            className={`shrink-0 text-[11px] md:text-xs font-medium px-3 py-2 md:px-4 md:py-2.5 rounded-lg md:rounded-xl flex items-center gap-1.5 md:gap-2 transition-all ${activeTab === t.label ? "bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" : "glass-framer text-slate-400 hover:text-white"}`}
                        >
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                {/* Plugin Cards List */}
                <div className="flex gap-3 md:gap-4 mb-4 md:mb-6 overflow-x-auto pb-4 md:pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-indigo-500/50 hover:[&::-webkit-scrollbar-thumb]:bg-indigo-500 [&::-webkit-scrollbar-thumb]:rounded-full transition-all">
                    {loading ? (
                        /* Skeleton Loading Cards */
                        Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="snap-start w-[250px] md:w-[320px] shrink-0 glass-framer rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col animate-pulse"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="w-9 h-9 rounded-xl bg-white/10" />
                                    <div className="w-10 h-4 rounded bg-white/10" />
                                </div>
                                <div className="w-3/4 h-4 rounded bg-white/10 mb-2" />
                                <div className="w-1/2 h-3 rounded bg-white/10 mb-3" />
                                <div className="w-full h-10 rounded bg-white/10 mb-3" />
                                <div className="w-full h-8 rounded-lg bg-white/10 mt-auto" />
                            </div>
                        ))
                    ) : error ? (
                        /* Error State Card */
                        <div className="w-full glass-framer rounded-xl md:rounded-2xl p-6 md:p-8 text-center flex flex-col items-center justify-center gap-3">
                            <p className="text-slate-400 text-xs md:text-sm">{error}</p>
                            <button
                                onClick={handleRetry}
                                className="px-3.5 py-1.5 md:px-4 md:py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg md:rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
                            >
                                <RefreshCw size={14} /> Retry
                            </button>
                        </div>
                    ) : plugins.length === 0 ? (
                        /* Empty State Card */
                        <div className="w-full glass-framer rounded-xl md:rounded-2xl p-6 md:p-8 text-center flex flex-col items-center justify-center gap-3">
                            <p className="text-slate-400 text-xs md:text-sm">
                                No plugins found for this filter.
                            </p>
                            <Link
                                href="/marketplace"
                                className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold flex items-center gap-1"
                            >
                                Explore Marketplace <ChevronRight size={12} />
                            </Link>
                        </div>
                    ) : (
                        /* Loaded Plugin Cards */
                        plugins.map((p) => {
                            const tags = [
                                p.category
                                    ? `#${p.category.toLowerCase().replace(/\s+/g, "")}`
                                    : "#scraper",
                                `#${p.tier}`,
                            ];

                            return (
                                <div
                                    key={p.id}
                                    className="snap-start w-[250px] md:w-[320px] shrink-0 glass-framer rounded-xl md:rounded-2xl p-4 md:p-5 card-hover flex flex-col transition-all duration-300 hover:bg-white/[0.03]"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shadow-inner text-indigo-400 overflow-hidden">
                                            {p.iconUrl ? (
                                                /* eslint-disable-next-line @next/next/no-img-element */
                                                <img
                                                    src={p.iconUrl}
                                                    alt={p.name}
                                                    title={p.name}
                                                    width={40}
                                                    height={40}
                                                    loading="lazy"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        (e.target as HTMLElement).style.display =
                                                            "none";
                                                    }}
                                                />
                                            ) : (
                                                getDynamicPluginIcon(
                                                    undefined,
                                                    [
                                                        p.name.toLowerCase(),
                                                        p.category?.toLowerCase() || "",
                                                    ],
                                                    "w-4 h-4 md:w-5 md:h-5"
                                                )
                                            )}
                                        </div>

                                        {/* Tier Badge */}
                                        <span
                                            className={`text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full border ${
                                                p.tier === "free"
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                    : p.tier === "pro"
                                                      ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                                      : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                            }`}
                                        >
                                            {p.tier.toUpperCase()}
                                        </span>
                                    </div>

                                    <h3 className="text-white font-semibold text-sm md:text-[15px] mb-1 tracking-tight line-clamp-1">
                                        {p.name}
                                    </h3>

                                    <div className="flex items-center gap-2.5 md:gap-3 mb-2.5 flex-wrap text-slate-400 text-[11px] md:text-xs">
                                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                                            <Download size={11} /> {p.installCount}
                                        </span>
                                        <span className="flex items-center gap-1 text-slate-400">
                                            <Eye size={11} /> {p.viewCount}
                                        </span>
                                        {p.isFeatured && (
                                            <span className="text-[11px] font-medium text-indigo-400 flex items-center gap-0.5">
                                                <CheckCircle size={10} /> Verified
                                            </span>
                                        )}
                                    </div>

                                    <p className="text-slate-400 text-xs md:text-[13px] leading-relaxed flex-1 mb-3 line-clamp-2">
                                        {p.description ||
                                            "High performance automated web scraping plugin for BrowserMesh."}
                                    </p>

                                    <div className="flex gap-1.5 mb-3 flex-wrap">
                                        {tags.map((t) => (
                                            <span
                                                key={t}
                                                className="text-[11px] md:text-xs font-medium text-slate-500"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/marketplace/${p.slug}`}
                                        className="btn-primary w-full py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all"
                                    >
                                        <Download size={13} /> View Plugin
                                    </Link>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Build your own banner */}
                <div className="glass-framer rounded-xl md:rounded-2xl p-3.5 sm:p-5 flex items-center justify-between flex-wrap gap-3 md:gap-4 mt-1 md:mt-2">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 shrink-0">
                            <Code2 size={18} className="text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-white text-sm md:text-[15px] font-semibold tracking-tight">
                                Build Your Own Plugins
                            </p>
                            <p className="text-slate-400 text-xs md:text-[13px] mt-0.5">
                                Use our TypeScript PluginContract to create powerful scrapers.
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/docs"
                        className="glass-framer hover:bg-white/5 border border-indigo-500/30 flex items-center gap-1.5 md:gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-[13px] text-indigo-300 font-semibold transition-all"
                    >
                        <Code2 size={14} /> View Developer Docs
                    </Link>
                </div>
            </div>
        </section>
    );
}
