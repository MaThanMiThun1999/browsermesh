"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Star, SlidersHorizontal } from "lucide-react";
import { getPublicTags } from "@/lib/api";

interface MarketplaceFiltersProps {
    sortBy: string;
    onSortByChange: (val: string) => void;
    tier: string;
    onTierChange: (val: string) => void;
    typeFilter: string;
    onTypeFilterChange: (val: string) => void;
    minRating: number | null;
    onMinRatingChange: (val: number | null) => void;
    compatibility: string[];
    onCompatibilityToggle: (os: string) => void;
    selectedTags: string[];
    onTagToggle: (tag: string) => void;
    onClearAll: () => void;
    tags?: string[];
}

export default function MarketplaceFilters({
    sortBy,
    onSortByChange,
    tier,
    onTierChange,
    typeFilter,
    onTypeFilterChange,
    minRating,
    onMinRatingChange,
    compatibility,
    onCompatibilityToggle,
    selectedTags,
    onTagToggle,
    onClearAll,
    tags: propTags,
}: MarketplaceFiltersProps) {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
    const [fetchedTags, setFetchedTags] = useState<string[]>([]);
    const [showAllTags, setShowAllTags] = useState(false);

    useEffect(() => {
        if (!propTags || propTags.length === 0) {
            let isMounted = true;

            getPublicTags().then((data) => {
                if (isMounted && Array.isArray(data) && data.length > 0) {
                    setFetchedTags(data);
                }
            });

            return () => {
                isMounted = false;
            };
        }
    }, [propTags]);

    const activeTagsList = propTags && propTags.length > 0 ? propTags : fetchedTags;
    const visibleTags = showAllTags ? activeTagsList : activeTagsList.slice(0, 6);

    return (
        <aside className="w-full lg:w-[260px] shrink-0">
            {/* Mobile & Tablet Filter Control Bar (< lg) */}
            <div className="lg:hidden flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between gap-2 bg-[#080514] border border-white/10 rounded-2xl p-2.5 sm:p-3.5 shadow-md w-full">
                    {/* Left: Filter Toggle & Tablet Quick Chips */}
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-0.5 shrink-0">
                        <button
                            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                            className="flex items-center gap-1.5 bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold hover:bg-indigo-600/30 transition-colors shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.2)] cursor-pointer"
                        >
                            <SlidersHorizontal size={13} />
                            <span>Filters</span>
                            <ChevronDown
                                size={13}
                                className={`transition-transform ${mobileFilterOpen ? "rotate-180" : ""}`}
                            />
                        </button>

                        {/* Quick Active Filter Badges on Mobile Bar */}
                        {tier !== "All" && (
                            <span className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg shrink-0">
                                Price: {tier}
                            </span>
                        )}
                        {typeFilter !== "All" && (
                            <span className="bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg shrink-0">
                                Type: {typeFilter}
                            </span>
                        )}
                        {minRating !== null && (
                            <span className="bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-semibold px-2.5 py-1 rounded-lg shrink-0">
                                ★ {minRating}+
                            </span>
                        )}
                    </div>

                    {/* Right: Sort By Dropdown */}
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="text-slate-400 text-xs font-medium hidden sm:inline">
                            Sort:
                        </span>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => onSortByChange(e.target.value)}
                                className="appearance-none bg-[#0c081f] border border-white/15 text-white text-xs font-semibold rounded-xl py-1.5 sm:py-2 pl-3 pr-7 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                            >
                                <option value="installed">Most Installed</option>
                                <option value="rating">Top Rated</option>
                                <option value="newest">Newest</option>
                                <option value="trending">Trending</option>
                            </select>
                            <ChevronDown
                                size={12}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Collapsible Mobile Filters Drawer */}
                {mobileFilterOpen && (
                    <div className="glass-framer rounded-2xl p-4 sm:p-5 flex flex-col gap-5 border border-indigo-500/30 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                            <h3 className="text-white font-bold text-sm">Refine Search</h3>
                            <button
                                onClick={onClearAll}
                                className="text-indigo-400 hover:text-indigo-300 text-xs font-semibold transition-colors cursor-pointer"
                            >
                                Reset All
                            </button>
                        </div>

                        {/* Price / Tier */}
                        <div>
                            <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2.5">
                                Price
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {["All", "Free", "Premium"].map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => onTierChange(p)}
                                        className={`py-1.5 px-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                                            tier === p
                                                ? "bg-indigo-600 border-indigo-500 text-white"
                                                : "bg-white/[0.02] border-white/5 hover:bg-white/5 text-slate-300"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Compatibility */}
                        <div>
                            <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2.5">
                                Compatibility
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {["Windows", "Linux", "Android", "Web"].map(
                                    (os) => {
                                        const isChecked = compatibility.includes(os);
                                        return (
                                            <button
                                                key={os}
                                                onClick={() => onCompatibilityToggle(os)}
                                                className={`flex items-center gap-2 cursor-pointer p-2 rounded-lg border transition-colors text-left ${
                                                    isChecked
                                                        ? "bg-indigo-600/20 border-indigo-500 text-white"
                                                        : "bg-white/[0.02] border-white/5 hover:bg-white/5 text-slate-300"
                                                }`}
                                            >
                                                <div
                                                    className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                                                        isChecked
                                                            ? "bg-indigo-500 border-indigo-400 text-white"
                                                            : "border-white/20"
                                                    }`}
                                                >
                                                    {isChecked && (
                                                        <span className="text-[10px] leading-none">
                                                            ✓
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-[11px] font-medium truncate">
                                                    {os}
                                                </span>
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>

                        {/* Plugin Type */}
                        <div>
                            <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2.5">
                                Plugin Type
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {["Official", "Community", "Verified"].map((type) => {
                                    const isChecked = typeFilter === type;
                                    return (
                                        <button
                                            key={type}
                                            onClick={() =>
                                                onTypeFilterChange(isChecked ? "All" : type)
                                            }
                                            className={`flex items-center justify-center gap-1.5 p-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${
                                                isChecked
                                                    ? "bg-indigo-600 border-indigo-500 text-white"
                                                    : "bg-white/[0.02] border-white/5 hover:bg-white/5 text-slate-300"
                                            }`}
                                        >
                                            {type}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Ratings */}
                        <div>
                            <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2.5">
                                Minimum Rating
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {[4.5, 4.0, 3.5, 3.0].map((stars) => {
                                    const isChecked = minRating === stars;
                                    return (
                                        <button
                                            key={stars}
                                            onClick={() =>
                                                onMinRatingChange(isChecked ? null : stars)
                                            }
                                            className={`p-2 rounded-lg border flex items-center justify-between transition-colors cursor-pointer ${
                                                isChecked
                                                    ? "bg-amber-500/20 border-amber-500 text-amber-300"
                                                    : "bg-white/[0.02] border-white/5 hover:bg-white/5 text-slate-300"
                                            }`}
                                        >
                                            <div className="flex items-center gap-1">
                                                <span className="text-xs font-bold">{stars}</span>
                                                <Star
                                                    size={11}
                                                    className="fill-amber-400 text-amber-400"
                                                />
                                            </div>
                                            <span className="text-slate-400 text-[10px]">& up</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2.5">
                                Popular Tags
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                                {activeTagsList.map((tag) => {
                                    const isSelected = selectedTags.includes(tag);
                                    return (
                                        <button
                                            key={tag}
                                            onClick={() => onTagToggle(tag)}
                                            className={`text-[10px] font-medium px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                                                isSelected
                                                    ? "bg-indigo-600 text-white border border-indigo-500"
                                                    : "text-slate-400 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white"
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop Filters Sidebar (>= lg) */}
            <div className="hidden lg:block glass-framer rounded-2xl p-6 border border-white/10 sticky top-28">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                    <h3 className="text-white font-bold text-base flex items-center gap-2">
                        <SlidersHorizontal size={16} className="text-indigo-400" /> Filters
                    </h3>
                    <button
                        onClick={onClearAll}
                        className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold transition-colors cursor-pointer"
                    >
                        Reset All
                    </button>
                </div>

                {/* Filter Sections Container */}
                <div className="flex flex-col gap-6">
                    {/* Sort By Dropdown */}
                    <div className="flex flex-col gap-2">
                        <label className="text-white text-sm font-semibold">Sort By</label>
                        <div className="relative">
                            <select
                                value={sortBy}
                                onChange={(e) => onSortByChange(e.target.value)}
                                className="w-full appearance-none bg-[#0a0518] border border-white/15 text-slate-200 text-xs font-semibold rounded-xl p-3 pr-8 outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                            >
                                <option value="installed">Most Installed</option>
                                <option value="rating">Top Rated</option>
                                <option value="newest">Newest</option>
                                <option value="trending">Trending</option>
                            </select>
                            <ChevronDown
                                size={14}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                        </div>
                    </div>

                    {/* Price / Tier Filter */}
                    <div className="flex flex-col gap-2.5">
                        <label className="text-white text-sm font-semibold">Price</label>
                        <div className="flex flex-col gap-2">
                            {["All", "Free", "Premium"].map((p) => (
                                <label
                                    key={p}
                                    onClick={() => onTierChange(p)}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <div
                                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                            tier === p
                                                ? "border-indigo-500 bg-indigo-500/20"
                                                : "border-white/20 group-hover:border-white/40"
                                        }`}
                                    >
                                        {tier === p && (
                                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                        )}
                                    </div>
                                    <span
                                        className={`text-[13px] transition-colors ${
                                            tier === p
                                                ? "text-white font-semibold"
                                                : "text-slate-400 group-hover:text-white"
                                        }`}
                                    >
                                        {p}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Compatibility */}
                    <div className="flex flex-col gap-2.5">
                        <label className="text-white text-sm font-semibold">Compatibility</label>
                        <div className="flex flex-col gap-2">
                            {["Windows", "Linux", "Android", "Web"].map((os) => {
                                const isChecked = compatibility.includes(os);
                                return (
                                    <label
                                        key={os}
                                        onClick={() => onCompatibilityToggle(os)}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <div
                                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                                isChecked
                                                    ? "bg-indigo-500 border-indigo-400 text-white"
                                                    : "border-white/20 group-hover:border-white/40"
                                            }`}
                                        >
                                            {isChecked && <span className="text-[10px]">✓</span>}
                                        </div>
                                        <span
                                            className={`text-[13px] transition-colors ${
                                                isChecked
                                                    ? "text-white font-semibold"
                                                    : "text-slate-400 group-hover:text-white"
                                            }`}
                                        >
                                            {os}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Plugin Type */}
                    <div className="flex flex-col gap-2.5">
                        <label className="text-white text-sm font-semibold">Plugin type</label>
                        <div className="flex flex-col gap-2">
                            {["Official", "Community", "Verified"].map((t) => {
                                const isChecked = typeFilter === t;
                                return (
                                    <label
                                        key={t}
                                        onClick={() => onTypeFilterChange(isChecked ? "All" : t)}
                                        className="flex items-center gap-3 cursor-pointer group"
                                    >
                                        <div
                                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                                isChecked
                                                    ? "bg-indigo-500 border-indigo-400 text-white"
                                                    : "border-white/20 group-hover:border-white/40"
                                            }`}
                                        >
                                            {isChecked && <span className="text-[10px]">✓</span>}
                                        </div>
                                        <span
                                            className={`text-[13px] transition-colors ${
                                                isChecked
                                                    ? "text-white font-semibold"
                                                    : "text-slate-400 group-hover:text-white"
                                            }`}
                                        >
                                            {t}
                                        </span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Ratings */}
                    <div className="flex flex-col gap-2.5">
                        <label className="text-white text-sm font-semibold">Ratings</label>
                        <div className="flex flex-col gap-2">
                            {[4.5, 4.0, 3.5, 3.0].map((stars) => {
                                const isChecked = minRating === stars;
                                return (
                                    <label
                                        key={stars}
                                        onClick={() => onMinRatingChange(isChecked ? null : stars)}
                                        className="flex items-center justify-between cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                                    isChecked
                                                        ? "bg-amber-500 border-amber-400 text-white"
                                                        : "border-white/20 group-hover:border-white/40"
                                                }`}
                                            >
                                                {isChecked && (
                                                    <span className="text-[10px]">✓</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={12}
                                                        fill={i < stars ? "#facc15" : "transparent"}
                                                        className={
                                                            i < stars
                                                                ? "text-yellow-400"
                                                                : "text-white/20"
                                                        }
                                                    />
                                                ))}
                                                <span className="text-slate-400 text-[11px] ml-1">
                                                    & up
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tags (Only Valid API Tags) */}
                    {activeTagsList.length > 0 && (
                        <div className="flex flex-col gap-2.5">
                            <div className="flex items-center justify-between">
                                <label className="text-white text-sm font-semibold">Tags</label>
                                {activeTagsList.length > 6 && (
                                    <button
                                        onClick={() => setShowAllTags(!showAllTags)}
                                        className="text-indigo-400 hover:text-indigo-300 text-xs font-medium cursor-pointer transition-colors"
                                    >
                                        {showAllTags
                                            ? "Show Less"
                                            : `+${activeTagsList.length - 6} More`}
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {visibleTags.map((tag) => {
                                    const isSelected = selectedTags.includes(tag);
                                    return (
                                        <button
                                            key={tag}
                                            onClick={() => onTagToggle(tag)}
                                            className={`text-[11px] font-medium px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                                                isSelected
                                                    ? "bg-indigo-600 text-white border border-indigo-500"
                                                    : "text-slate-400 bg-white/[0.02] border border-white/5 hover:bg-white/10 hover:text-white"
                                            }`}
                                        >
                                            {tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
