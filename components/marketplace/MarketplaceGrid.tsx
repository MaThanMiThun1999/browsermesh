"use client";

import Link from "next/link";
import { useState } from "react";
import { Grid, List, Star, Download, RefreshCw, ChevronRight } from "lucide-react";
import { FaWindows, FaLinux, FaAndroid, FaGlobe } from "react-icons/fa";
import { getDynamicPluginIcon } from "@/utils/icon-utils";
import { PublicPlugin } from "@/lib/api";
import Pagination from "@/components/ui/pagination";

interface MarketplaceGridProps {
    plugins: PublicPlugin[];
    loading: boolean;
    error: string | null;
    onRetry: () => void;
    totalResults: number;
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onClearFilters: () => void;
}

export default function MarketplaceGrid({
    plugins,
    loading,
    error,
    onRetry,
    totalResults,
    currentPage,
    totalPages,
    onPageChange,
    onClearFilters,
}: MarketplaceGridProps) {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const isPlatformSupported = (plugin: PublicPlugin, platform: string) => {
        const list = plugin.compatibility || ["windows", "linux", "android", "web"];
        const target = platform.toLowerCase();
        return list.some((item) => item.toLowerCase() === target);
    };

    return (
        <div className="flex-1 flex flex-col min-w-0">
            {/* Header Toolbar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-white font-bold text-xl sm:text-[22px]">All Plugins</h2>
                    <p className="text-slate-400 text-xs sm:text-[13px]">
                        {loading
                            ? "Loading results..."
                            : `${totalResults} result${totalResults === 1 ? "" : "s"}`}
                    </p>
                </div>

                {/* Grid / List View Toggle Controls */}
                <div className="flex items-center gap-1 bg-[#05050f]/80 backdrop-blur-md border border-white/10 rounded-xl p-1">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            viewMode === "grid"
                                ? "bg-[#4c35e6] text-white shadow-[0_0_12px_rgba(76,53,230,0.5)]"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <Grid size={14} /> <span>Grid</span>
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            viewMode === "list"
                                ? "bg-[#4c35e6] text-white shadow-[0_0_12px_rgba(76,53,230,0.5)]"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                    >
                        <List size={14} /> <span>List</span>
                    </button>
                </div>
            </div>

            {/* Plugin Grid / List Items */}
            {loading ? (
                /* Skeleton Loading View */
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-5 mb-10">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="glass-framer rounded-2xl p-5 flex flex-col justify-between animate-pulse"
                        >
                            <div className="flex items-start justify-between gap-3 mb-4">
                                <div className="w-14 h-14 bg-white/10 rounded-xl" />
                                <div className="w-16 h-5 rounded-full bg-white/10" />
                            </div>
                            <div className="w-3/4 h-5 rounded bg-white/10 mb-2" />
                            <div className="w-full h-12 rounded bg-white/10 mb-4" />
                            <div className="w-full h-10 rounded-xl bg-white/10 pt-3 border-t border-white/5" />
                        </div>
                    ))}
                </div>
            ) : error ? (
                /* Error State Card */
                <div className="glass-framer rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-4 mb-10">
                    <p className="text-slate-300 text-sm">{error}</p>
                    <button
                        onClick={onRetry}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
                    >
                        <RefreshCw size={14} /> Try Again
                    </button>
                </div>
            ) : plugins.length === 0 ? (
                /* Empty State Card */
                <div className="glass-framer rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-4 mb-10">
                    <p className="text-slate-400 text-sm sm:text-base font-medium">
                        No plugins match your current filters.
                    </p>
                    <button
                        onClick={onClearFilters}
                        className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                        Reset All Filters <ChevronRight size={14} />
                    </button>
                </div>
            ) : viewMode === "grid" ? (
                /* GRID VIEW */
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-5 mb-10">
                    {plugins.map((plugin) => {
                        const pluginTypeBadge =
                            plugin.type === "verified" || plugin.isFeatured
                                ? "Verified"
                                : plugin.type === "official" ||
                                    plugin.author?.toLowerCase() === "browsermesh"
                                  ? "Official"
                                  : "Community";

                        const badgeStyle =
                            pluginTypeBadge === "Verified"
                                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                : pluginTypeBadge === "Official"
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                  : "bg-purple-500/10 text-purple-300 border-purple-500/20";

                        return (
                            <div
                                key={plugin.id}
                                className="glass-framer rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-[0_8px_35px_rgba(99,102,241,0.25)] transition-all duration-300 group"
                            >
                                {/* Card Header: Logo + Title + Type Badge */}
                                <div>
                                    <div className="flex items-start justify-between gap-3 mb-3">
                                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-lg shrink-0 overflow-hidden group-hover:border-indigo-500/40 transition-colors">
                                            {plugin.iconUrl ? (
                                                <img
                                                    src={plugin.iconUrl}
                                                    alt={plugin.name}
                                                    title={plugin.name}
                                                    width={56}
                                                    height={56}
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
                                                        plugin.name.toLowerCase(),
                                                        plugin.category?.toLowerCase() || "",
                                                    ],
                                                    "w-7 h-7"
                                                )
                                            )}
                                        </div>
                                        <span
                                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${badgeStyle}`}
                                        >
                                            {pluginTypeBadge}
                                        </span>
                                    </div>

                                    <h3 className="text-white font-bold text-base sm:text-lg mb-1 group-hover:text-indigo-300 transition-colors line-clamp-1">
                                        {plugin.name}
                                    </h3>

                                    <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
                                        {plugin.description ||
                                            "High-performance automated web scraper plugin for BrowserMesh."}
                                    </p>
                                </div>

                                {/* Card Body & Footer: OS Icons, Rating, Action */}
                                <div className="flex flex-col gap-4 pt-3 border-t border-white/5">
                                    {/* Valid OS Compatibility Icons Only */}
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <div className="flex items-center gap-2 text-slate-400 bg-white/[0.03] border border-white/5 rounded-md px-2 py-1 text-[11px]">
                                            {isPlatformSupported(plugin, "windows") && (
                                                <FaWindows
                                                    size={12}
                                                    className="text-blue-400"
                                                    title="Windows"
                                                />
                                            )}

                                            {isPlatformSupported(plugin, "linux") && (
                                                <FaLinux
                                                    size={12}
                                                    className="text-yellow-400"
                                                    title="Linux"
                                                />
                                            )}
                                            {isPlatformSupported(plugin, "android") && (
                                                <FaAndroid
                                                    size={12}
                                                    className="text-green-400"
                                                    title="Android"
                                                />
                                            )}
                                            {isPlatformSupported(plugin, "web") && (
                                                <FaGlobe
                                                    size={12}
                                                    className="text-cyan-400"
                                                    title="Web"
                                                />
                                            )}
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center gap-3 text-xs text-slate-400">
                                            <div className="flex items-center gap-1">
                                                <Star
                                                    size={13}
                                                    className="text-yellow-400 fill-yellow-400"
                                                />
                                                <span className="text-white font-semibold">
                                                    {plugin.averageRating
                                                        ? plugin.averageRating.toFixed(1)
                                                        : "4.8"}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Download size={12} />
                                                <span>{plugin.installCount}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Install Button & Price */}
                                    <div className="flex items-center justify-between pt-1">
                                        <span className="text-slate-300 text-xs font-semibold uppercase">
                                            {plugin.tier}
                                        </span>
                                        <Link
                                            href={`/marketplace/${plugin.slug}`}
                                            className="bg-[#4c35e6] hover:bg-[#5a46e8] transition-colors text-white font-semibold text-xs px-5 py-2 rounded-xl shadow-[0_0_15px_rgba(76,53,230,0.4)]"
                                        >
                                            View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                /* LIST VIEW */
                <div className="flex flex-col gap-4 mb-10">
                    {plugins.map((plugin) => {
                        const pluginTypeBadge =
                            plugin.type === "verified" || plugin.isFeatured
                                ? "Verified"
                                : plugin.type === "official" ||
                                    plugin.author?.toLowerCase() === "browsermesh"
                                  ? "Official"
                                  : "Community";

                        const badgeStyle =
                            pluginTypeBadge === "Verified"
                                ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                                : pluginTypeBadge === "Official"
                                  ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                  : "bg-purple-500/10 text-purple-300 border-purple-500/20";

                        return (
                            <div
                                key={plugin.id}
                                className="glass-framer rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-[0_8px_35px_rgba(99,102,241,0.2)] transition-all duration-300 group"
                            >
                                {/* Left Main Content Block */}
                                <div className="flex items-start gap-4 flex-1 min-w-0">
                                    {/* Logo Box */}
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center shadow-lg shrink-0 overflow-hidden group-hover:border-indigo-500/40 transition-colors">
                                        {plugin.iconUrl ? (
                                            <img
                                                src={plugin.iconUrl}
                                                alt={plugin.name}
                                                title={plugin.name}
                                                width={64}
                                                height={64}
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
                                                    plugin.name.toLowerCase(),
                                                    plugin.category?.toLowerCase() || "",
                                                ],
                                                "w-8 h-8"
                                            )
                                        )}
                                    </div>

                                    {/* Title, Description, Metadata */}
                                    <div className="flex-1 flex flex-col min-w-0">
                                        <div className="flex items-center gap-2.5 mb-1">
                                            <h3 className="text-white font-bold text-base sm:text-[18px] tracking-tight group-hover:text-indigo-300 transition-colors line-clamp-1">
                                                {plugin.name}
                                            </h3>
                                            <span
                                                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${badgeStyle}`}
                                            >
                                                {pluginTypeBadge}
                                            </span>
                                        </div>

                                        <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed mb-3 max-w-[580px] line-clamp-2">
                                            {plugin.description ||
                                                "High-performance automated web scraper plugin for BrowserMesh."}
                                        </p>

                                        {/* Bottom Metadata Row */}
                                        <div className="flex flex-wrap items-center gap-3">
                                            <div className="flex items-center gap-2 text-slate-400 bg-white/[0.03] border border-white/5 rounded-md px-2.5 py-1 text-[11px]">
                                                {isPlatformSupported(plugin, "windows") && (
                                                    <FaWindows
                                                        size={13}
                                                        className="text-blue-400"
                                                        title="Windows"
                                                    />
                                                )}

                                                {isPlatformSupported(plugin, "linux") && (
                                                    <FaLinux
                                                        size={13}
                                                        className="text-yellow-400"
                                                        title="Linux"
                                                    />
                                                )}
                                                {isPlatformSupported(plugin, "android") && (
                                                    <FaAndroid
                                                        size={13}
                                                        className="text-green-400"
                                                        title="Android"
                                                    />
                                                )}
                                                {isPlatformSupported(plugin, "web") && (
                                                    <FaGlobe
                                                        size={13}
                                                        className="text-cyan-400"
                                                        title="Web"
                                                    />
                                                )}
                                            </div>

                                            <div className="w-[1px] h-4 bg-white/10 hidden sm:block" />

                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {plugin.category && (
                                                    <span className="text-slate-300 bg-white/[0.03] border border-white/5 rounded-md px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium">
                                                        #
                                                        {plugin.category
                                                            .toLowerCase()
                                                            .replace(/\s+/g, "")}
                                                    </span>
                                                )}
                                                <span className="text-slate-300 bg-white/[0.03] border border-white/5 rounded-md px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium">
                                                    #{plugin.tier}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Metric & Action Block */}
                                <div className="flex items-center gap-6 shrink-0 border-t lg:border-t-0 lg:border-l border-white/5 pt-3 lg:pt-0 lg:pl-6 justify-between lg:justify-end w-full lg:w-auto">
                                    <div className="flex flex-col gap-1 text-[12px]">
                                        <div className="flex items-center gap-1.5">
                                            <Star
                                                size={14}
                                                className="text-yellow-400 fill-yellow-400"
                                            />
                                            <span className="text-white font-bold">
                                                {plugin.averageRating
                                                    ? plugin.averageRating.toFixed(1)
                                                    : "4.8"}
                                            </span>
                                            <span className="text-slate-500">
                                                ({plugin.reviewCount || 0})
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-slate-400">
                                            <Download size={13} />
                                            <span>{plugin.installCount} installs</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-1 shrink-0">
                                        <Link
                                            href={`/marketplace/${plugin.slug}`}
                                            className="bg-[#4c35e6] hover:bg-[#5a46e8] transition-colors text-white font-semibold text-xs sm:text-[13px] px-6 sm:px-7 py-2 sm:py-2.5 rounded-xl shadow-[0_0_20px_rgba(76,53,230,0.4)]"
                                        >
                                            View
                                        </Link>
                                        <span className="text-slate-400 text-[11px] font-medium uppercase">
                                            {plugin.tier}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Centralized Pagination */}
            {!loading && totalPages > 1 && (
                <div className="mb-16 mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={onPageChange}
                    />
                </div>
            )}
        </div>
    );
}
