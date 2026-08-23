"use client";

import Link from "next/link";
import { useState } from "react";
import { marketplacePlugins, PluginData } from "@/data/marketplaceData";
import { Grid, List, Star, Download, Clock } from "lucide-react";
import { FaWindows, FaApple, FaLinux, FaAndroid, FaGlobe } from "react-icons/fa";

import { getDynamicPluginIcon } from "@/utils/icon-utils";

function PluginLogo({ plugin }: { plugin: PluginData }) {
    if (plugin.id === "google-maps") {
        return (
            <svg
                viewBox="0 0 24 24"
                className="w-9 h-9 drop-shadow-[0_2px_8px_rgba(66,133,244,0.4)]"
            >
                <path
                    fill="#EA4335"
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                />
                <path fill="#34A853" d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.92 2.88 7.37L12 9z" />
                <path
                    fill="#FBBC05"
                    d="M12 9l-4.12 7.37C9.37 18.3 10.74 20 12 22s2.63-1.7 4.12-5.63L12 9z"
                    opacity="0.9"
                />
                <path fill="#4285F4" d="M12 2c1.86 0 3.54.72 4.79 1.9L12 9z" />
                <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" />
            </svg>
        );
    }

    return getDynamicPluginIcon(undefined, [plugin.id, ...plugin.tags], "w-8 h-8", plugin.logoUrl);
}

import Pagination from "@/components/ui/pagination";

export default function MarketplaceGrid() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="flex-1 flex flex-col min-w-0">
            {/* Header Toolbar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-white font-bold text-xl sm:text-[22px]">All Plugins</h2>
                    <p className="text-slate-400 text-xs sm:text-[13px]">250+ results</p>
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
            {viewMode === "grid" ? (
                /* GRID VIEW (2 Columns on MD, 2-3 Columns on Large Screens) */
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-5 mb-10">
                    {marketplacePlugins.map((plugin) => (
                        <div
                            key={plugin.id}
                            className="glass-framer rounded-2xl p-5 flex flex-col justify-between hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-[0_8px_35px_rgba(99,102,241,0.25)] transition-all duration-300 group"
                        >
                            {/* Card Header: Logo + Title + Type Badge */}
                            <div>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg shrink-0 overflow-hidden group-hover:border-indigo-500/40 transition-colors">
                                        <PluginLogo plugin={plugin} />
                                    </div>
                                    <span
                                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                                            plugin.type === "Official"
                                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                                : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                                        }`}
                                    >
                                        {plugin.type}
                                    </span>
                                </div>

                                <h3 className="text-white font-bold text-base sm:text-lg mb-1 group-hover:text-indigo-300 transition-colors">
                                    {plugin.name}
                                </h3>

                                <p className="text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
                                    {plugin.description}
                                </p>
                            </div>

                            {/* Card Body & Footer: OS Icons, Rating, Action */}
                            <div className="flex flex-col gap-4 pt-3 border-t border-white/5">
                                {/* OS Compatibility & Tags */}
                                <div className="flex items-center justify-between gap-2 flex-wrap">
                                    <div className="flex items-center gap-2 text-slate-400 bg-white/[0.03] border border-white/5 rounded-md px-2 py-1 text-[11px]">
                                        <FaWindows
                                            size={12}
                                            className={
                                                plugin.platforms.includes("windows")
                                                    ? "text-blue-400"
                                                    : "opacity-30"
                                            }
                                        />
                                        <FaApple
                                            size={12}
                                            className={
                                                plugin.platforms.includes("macos") ||
                                                plugin.platforms.includes("ios")
                                                    ? "text-slate-200"
                                                    : "opacity-30"
                                            }
                                        />
                                        <FaLinux
                                            size={12}
                                            className={
                                                plugin.platforms.includes("linux")
                                                    ? "text-yellow-400"
                                                    : "opacity-30"
                                            }
                                        />
                                        <FaAndroid
                                            size={12}
                                            className={
                                                plugin.platforms.includes("android")
                                                    ? "text-green-400"
                                                    : "opacity-30"
                                            }
                                        />
                                        <FaGlobe
                                            size={12}
                                            className={
                                                plugin.platforms.includes("web")
                                                    ? "text-cyan-400"
                                                    : "opacity-30"
                                            }
                                        />
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-3 text-xs text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Star
                                                size={13}
                                                className="text-yellow-400 fill-yellow-400"
                                            />
                                            <span className="text-white font-semibold">
                                                {plugin.rating}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Download size={12} />
                                            <span>{plugin.installs}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Install Button & Price */}
                                <div className="flex items-center justify-between pt-1">
                                    <span className="text-slate-300 text-xs font-semibold">
                                        {plugin.price}
                                    </span>
                                    <Link
                                        href={`/marketplace/${plugin.id}`}
                                        className="bg-[#4c35e6] hover:bg-[#5a46e8] transition-colors text-white font-semibold text-xs px-5 py-2 rounded-xl shadow-[0_0_15px_rgba(76,53,230,0.4)]"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* LIST VIEW (Vertical List Rows) */
                <div className="flex flex-col gap-4 mb-10">
                    {marketplacePlugins.map((plugin) => (
                        <div
                            key={plugin.id}
                            className="glass-framer rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-[0_8px_35px_rgba(99,102,241,0.2)] transition-all duration-300 group"
                        >
                            {/* Left Main Content Block */}
                            <div className="flex items-start gap-4 flex-1 min-w-0">
                                {/* Logo Box */}
                                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-lg shrink-0 overflow-hidden group-hover:border-indigo-500/40 transition-colors">
                                    <PluginLogo plugin={plugin} />
                                </div>

                                {/* Title, Description, Metadata */}
                                <div className="flex-1 flex flex-col min-w-0">
                                    <div className="flex items-center gap-2.5 mb-1">
                                        <h3 className="text-white font-bold text-base sm:text-[18px] tracking-tight group-hover:text-indigo-300 transition-colors">
                                            {plugin.name}
                                        </h3>
                                        <span
                                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shrink-0 ${
                                                plugin.type === "Official"
                                                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                                    : "bg-purple-500/10 text-purple-300 border border-purple-500/20"
                                            }`}
                                        >
                                            {plugin.type}
                                        </span>
                                    </div>

                                    <p className="text-slate-400 text-xs sm:text-[13px] leading-relaxed mb-3 max-w-[580px]">
                                        {plugin.description}
                                    </p>

                                    {/* Bottom Metadata Row */}
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="flex items-center gap-2 text-slate-400 bg-white/[0.03] border border-white/5 rounded-md px-2.5 py-1 text-[11px]">
                                            <FaWindows
                                                size={13}
                                                className={
                                                    plugin.platforms.includes("windows")
                                                        ? "text-blue-400"
                                                        : "opacity-30"
                                                }
                                            />
                                            <FaApple
                                                size={13}
                                                className={
                                                    plugin.platforms.includes("macos") ||
                                                    plugin.platforms.includes("ios")
                                                        ? "text-slate-200"
                                                        : "opacity-30"
                                                }
                                            />
                                            <FaLinux
                                                size={13}
                                                className={
                                                    plugin.platforms.includes("linux")
                                                        ? "text-yellow-400"
                                                        : "opacity-30"
                                                }
                                            />
                                            <FaAndroid
                                                size={13}
                                                className={
                                                    plugin.platforms.includes("android")
                                                        ? "text-green-400"
                                                        : "opacity-30"
                                                }
                                            />
                                            <FaGlobe
                                                size={13}
                                                className={
                                                    plugin.platforms.includes("web")
                                                        ? "text-cyan-400"
                                                        : "opacity-30"
                                                }
                                            />
                                        </div>

                                        <div className="w-[1px] h-4 bg-white/10 hidden sm:block" />

                                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                            {plugin.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-slate-300 bg-white/[0.03] border border-white/5 rounded-md px-2.5 py-0.5 text-[10px] sm:text-[11px] font-medium"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
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
                                            {plugin.rating}
                                        </span>
                                        <span className="text-slate-500">({plugin.reviews})</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <Download size={13} />
                                        <span>{plugin.installs}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-400">
                                        <Clock size={13} />
                                        <span>{plugin.updatedAt}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center gap-1 shrink-0">
                                    <Link
                                        href={`/marketplace/${plugin.id}`}
                                        className="bg-[#4c35e6] hover:bg-[#5a46e8] transition-colors text-white font-semibold text-xs sm:text-[13px] px-6 sm:px-7 py-2 sm:py-2.5 rounded-xl shadow-[0_0_20px_rgba(76,53,230,0.4)]"
                                    >
                                        View
                                    </Link>
                                    <span className="text-slate-400 text-[11px] font-medium">
                                        {plugin.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Centralized Pagination */}
            <div className="mb-16 mt-4">
                <Pagination
                    currentPage={currentPage}
                    totalPages={13}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
}
