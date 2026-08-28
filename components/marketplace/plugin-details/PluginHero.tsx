"use client";

import Link from "next/link";
import { Star, Download, CheckCircle, ChevronRight } from "lucide-react";
import { getDynamicPluginIcon } from "@/utils/icon-utils";
import { siteInfo } from "@/data/siteInfo";

export interface PluginHeroProps {
    id?: string;
    slug?: string;
    name?: string;
    author?: string | null;
    category?: string | null;
    tier?: string;
    isVerified?: boolean;
    averageRating?: number | null;
    reviewCount?: number;
    installCount?: number;
    iconUrl?: string | null;
    bannerUrl?: string | null;
}

export default function PluginHero({
    id,
    slug,
    name = "Amazon Product Scraper",
    author = "DataMiner Labs",
    category = "E-commerce",
    tier = "Premium",
    isVerified = true,
    averageRating = 4.8,
    reviewCount = 0,
    installCount = 1800000,
    iconUrl = null,
    bannerUrl = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600",
}: PluginHeroProps) {
    const formattedInstalls =
        installCount >= 1000000
            ? `${(installCount / 1000000).toFixed(1)}M+`
            : installCount >= 1000
              ? `${(installCount / 1000).toFixed(0)}K+`
              : `${installCount}`;

    const formattedReviews =
        reviewCount >= 1000 ? `${(reviewCount / 1000).toFixed(1)}K` : `${reviewCount}`;

    const safeBannerUrl =
        bannerUrl &&
        typeof bannerUrl === "string" &&
        bannerUrl.trim() !== "" &&
        bannerUrl !== "null" &&
        bannerUrl !== "undefined"
            ? bannerUrl
            : "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1600";

    const handleInstallClick = () => {
        const consoleTargetUrl = `${siteInfo.consoleUrl}/marketplace/${slug || id || ""}`;
        window.open(consoleTargetUrl, "_blank", "noopener,noreferrer");
    };

    return (
        <>
            {/* 1. Breadcrumb Path */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6 flex-wrap relative z-20">
                <Link href="/marketplace" className="hover:text-indigo-400 transition-colors">
                    Marketplace
                </Link>
                <ChevronRight size={14} className="text-slate-600" />
                <span className="text-white font-medium truncate max-w-[200px] sm:max-w-none">
                    {name}
                </span>
            </nav>

            {/* 2. Ultra-Premium Glassmorphism Hero Card with Background Banner */}
            <div className="bg-[#080517]/80 border border-white/15 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 min-h-[220px] sm:min-h-[240px] md:min-h-[250px] flex flex-col justify-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl mb-8 relative overflow-hidden group">
                {/* Background Banner Image Layer */}
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-90 mix-blend-luminosity scale-105 group-hover:scale-100 transition-transform duration-700 pointer-events-none"
                    style={{ backgroundImage: `url('${safeBannerUrl}')` }}
                />

                {/* Multi-stage Dark Glass Overlay Masks */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#060314] via-[#08051a]/90 to-[#0e072b]/80 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060314] via-transparent to-black/30 pointer-events-none" />

                {/* Ambient Neon Purple & Indigo Glow Orbs */}
                <div className="absolute top-0 right-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-gradient-to-br from-indigo-600/25 via-purple-600/20 to-transparent blur-[100px] sm:blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/3 w-64 sm:w-80 h-64 sm:h-80 bg-blue-600/15 blur-[80px] sm:blur-[100px] pointer-events-none" />

                {/* Foreground Content Layout */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8 relative z-10">
                    {/* Left Info & Branding Block */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-1 min-w-0">
                        {/* Logo Box with Glass & Neon Glow Effect */}
                        <div className="relative shrink-0 group/logo">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-amber-500/30 via-indigo-500/30 to-purple-500/30 rounded-2xl sm:rounded-3xl blur-md opacity-70 group-hover/logo:opacity-100 transition-opacity pointer-events-none" />
                            <div className="w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-[#0a061d]/90 border border-white/20 rounded-2xl sm:rounded-3xl p-3 sm:p-5 flex items-center justify-center shadow-2xl backdrop-blur-md relative z-10 text-amber-400">
                                {getDynamicPluginIcon(
                                    category || undefined,
                                    [name.toLowerCase()],
                                    "w-10 h-10 sm:w-14 sm:h-14 text-amber-400 drop-shadow-[0_4px_12px_rgba(251,191,36,0.4)]",
                                    iconUrl
                                )}
                            </div>
                        </div>

                        {/* Title, Badges & Author Metadata */}
                        <div className="flex-1 min-w-0 w-full">
                            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap mb-2">
                                <h1 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                                    {name}
                                </h1>
                                {isVerified && (
                                    <span className="bg-blue-500/15 text-blue-400 border border-blue-500/30 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                                        <CheckCircle size={12} className="fill-blue-400/20" />{" "}
                                        Official
                                    </span>
                                )}
                            </div>

                            <p className="text-slate-300/90 text-xs sm:text-sm mb-3.5 max-w-2xl leading-relaxed font-normal">
                                Extract product data, prices, reviews, availability and seller info
                                from Amazon with ease.
                            </p>

                            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs">
                                {/* Author Avatar & Link */}
                                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl">
                                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-[10px] text-white font-bold shadow-sm">
                                        {author?.charAt(0) || "D"}
                                    </div>
                                    <span className="text-slate-400 text-[11px]">by</span>
                                    <span className="text-white font-semibold text-[11px] flex items-center gap-1">
                                        {author || "DataMiner Labs"}{" "}
                                        <CheckCircle
                                            size={12}
                                            className="text-blue-400 fill-blue-400/20"
                                        />
                                    </span>
                                </div>

                                <span className="text-slate-600 hidden sm:inline">•</span>

                                {/* Category Pill */}
                                <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-2.5 sm:px-3 py-1 rounded-xl font-medium text-[11px]">
                                    {category || "E-commerce"}
                                </span>

                                {/* Tier Badge */}
                                <span className="bg-amber-500/10 border border-amber-500/25 text-amber-300 px-2.5 sm:px-3 py-1 rounded-xl font-semibold text-[11px] flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                                    👑 {tier || "Premium"}
                                </span>

                                <span className="text-slate-600 hidden sm:inline">•</span>

                                {/* Ratings & Install Metrics (Wrap-Safe on Mobile) */}
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-300 bg-white/5 border border-white/10 px-2.5 sm:px-3 py-1 rounded-xl max-w-full text-xs">
                                    <div className="flex items-center gap-1">
                                        <Star
                                            size={12}
                                            className="text-amber-400 fill-amber-400 shrink-0"
                                        />
                                        <span className="font-bold text-white text-[11px] sm:text-xs">
                                            {averageRating ? averageRating.toFixed(1) : "4.8"}
                                        </span>
                                        <span className="text-slate-400 text-[10px] sm:text-xs">
                                            ({formattedReviews} reviews)
                                        </span>
                                    </div>
                                    <span className="text-slate-600">|</span>
                                    <div className="flex items-center gap-1">
                                        <Download size={12} className="text-indigo-400 shrink-0" />
                                        <span className="font-semibold text-white text-[11px] sm:text-xs whitespace-nowrap">
                                            {formattedInstalls}
                                        </span>
                                        <span className="text-slate-400 text-[10px] sm:text-xs whitespace-nowrap">
                                            installs
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right CTA Action Buttons */}
                    <div className="w-full lg:w-auto flex flex-col items-stretch gap-3 shrink-0 pt-2 lg:pt-0">
                        <button
                            onClick={handleInstallClick}
                            className="w-full bg-gradient-to-r from-[#4c35e6] to-[#5b43f0] hover:from-[#5841f5] hover:to-[#674ff9] transition-all text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-[0_0_25px_rgba(76,53,230,0.5)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cursor-pointer"
                        >
                            <Download size={16} /> Install Plugin
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
