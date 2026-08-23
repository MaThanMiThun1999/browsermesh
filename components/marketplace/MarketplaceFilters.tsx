"use client";

import { useState } from "react";
import { ChevronDown, Star, Puzzle, SlidersHorizontal } from "lucide-react";

export default function MarketplaceFilters() {
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    return (
        <aside className="w-full lg:w-[260px] shrink-0">
            {/* Mobile & Tablet Filter Control Bar (< lg) */}
            <div className="lg:hidden flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between gap-2 bg-[#080514] border border-white/10 rounded-2xl p-2.5 sm:p-3.5 shadow-md w-full">
                    {/* Left: Filter Toggle & Tablet Quick Chips */}
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-0.5 shrink-0">
                        <button
                            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                            className="flex items-center gap-1.5 bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold hover:bg-indigo-600/30 transition-colors shrink-0 shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                        >
                            <SlidersHorizontal size={13} />
                            <span>Filters</span>
                            <ChevronDown
                                size={13}
                                className={`transition-transform duration-300 ${
                                    mobileFilterOpen ? "rotate-180" : "rotate-0"
                                }`}
                            />
                        </button>

                        {/* Tablet Quick Filter Chips */}
                        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                            {["All", "Free", "Premium", "Official"].map((chip, idx) => (
                                <button
                                    key={chip}
                                    className={`text-[11px] font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
                                        idx === 0
                                            ? "bg-white/10 text-white border-white/20"
                                            : "bg-white/[0.02] text-slate-400 border-white/5 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    {chip}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Sort Dropdown & Clear */}
                    <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                        <div className="flex items-center gap-1.5">
                            <span className="hidden sm:inline text-slate-400 text-xs font-medium">
                                Sort:
                            </span>
                            <div className="relative">
                                <select className="appearance-none bg-[#0a061a] border border-white/10 rounded-xl px-2.5 sm:px-3 py-1.5 text-xs text-white outline-none focus:border-indigo-500 cursor-pointer pr-7 font-medium">
                                    <option value="installed">Most Installed</option>
                                    <option value="rated">Highest Rated</option>
                                    <option value="updated">Recently Updated</option>
                                </select>
                                <ChevronDown
                                    size={13}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                />
                            </div>
                        </div>

                        <button className="text-slate-400 hover:text-white text-xs font-medium px-1.5 py-1 transition-colors shrink-0">
                            Clear
                        </button>
                    </div>
                </div>

                {/* Mobile Animated Collapsible Filter Drawer */}
                <div
                    className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                        mobileFilterOpen
                            ? "grid-rows-[1fr] opacity-100 mt-1 pointer-events-auto"
                            : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
                    }`}
                >
                    <div className="min-h-0">
                        <div className="bg-[#0a061c] border border-white/10 rounded-2xl p-4 flex flex-col gap-5 shadow-2xl">
                            {/* Price */}
                            <div>
                                <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2.5">
                                    Price
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {["All", "Free", "Premium"].map((p, idx) => (
                                        <button
                                            key={p}
                                            className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                                                idx === 0
                                                    ? "bg-indigo-600 text-white border-indigo-500"
                                                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
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
                                    {["Windows", "macOS", "Linux", "Android", "iOS", "Web"].map(
                                        (os) => (
                                            <label
                                                key={os}
                                                className="flex items-center gap-2 cursor-pointer bg-white/[0.02] border border-white/5 p-2 rounded-lg hover:bg-white/5 transition-colors"
                                            >
                                                <div className="w-3.5 h-3.5 rounded border border-white/20 flex items-center justify-center shrink-0" />
                                                <span className="text-slate-300 text-[11px] font-medium truncate">
                                                    {os}
                                                </span>
                                            </label>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Plugin Type */}
                            <div>
                                <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2.5">
                                    Plugin Type
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["Official", "Community", "Verified"].map((type) => (
                                        <label
                                            key={type}
                                            className="flex items-center gap-2 cursor-pointer bg-white/[0.02] border border-white/5 p-2 rounded-lg hover:bg-white/5 transition-colors"
                                        >
                                            <div className="w-3.5 h-3.5 rounded border border-white/20 flex items-center justify-center shrink-0" />
                                            <span className="text-slate-300 text-[11px] font-medium truncate">
                                                {type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Ratings */}
                            <div>
                                <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2.5">
                                    Ratings
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {[5, 4, 3, 2].map((stars) => (
                                        <label
                                            key={stars}
                                            className="flex items-center gap-2 cursor-pointer bg-white/[0.02] border border-white/5 p-2 rounded-lg hover:bg-white/5 transition-colors"
                                        >
                                            <div className="w-3.5 h-3.5 rounded border border-white/20 flex items-center justify-center shrink-0" />
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        size={10}
                                                        fill={i < stars ? "#facc15" : "transparent"}
                                                        className={
                                                            i < stars
                                                                ? "text-yellow-400"
                                                                : "text-white/20"
                                                        }
                                                    />
                                                ))}
                                                <span className="text-slate-400 text-[10px] ml-1">
                                                    & up
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2.5">
                                    Popular Tags
                                </label>
                                <div className="flex flex-wrap gap-1.5">
                                    {[
                                        "Popular",
                                        "Trending",
                                        "New",
                                        "No Code",
                                        "Fast",
                                        "Stealth",
                                        "Headless",
                                    ].map((tag) => (
                                        <button
                                            key={tag}
                                            className="text-slate-400 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white text-[10px] font-medium px-2.5 py-1 rounded-md transition-colors"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Vertical Sidebar (lg:flex) */}
            <div className="hidden lg:flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold text-lg">Filters</h3>
                    <button className="text-[#3b82f6] text-xs font-medium hover:text-blue-400">
                        Clear all
                    </button>
                </div>

                {/* Sort By */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-white text-sm font-semibold">Sort by</label>
                    <div className="relative">
                        <select className="w-full appearance-none bg-transparent border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer">
                            <option className="bg-[#05050f]">Most Installed</option>
                            <option className="bg-[#05050f]">Highest Rated</option>
                            <option className="bg-[#05050f]">Recently Updated</option>
                        </select>
                        <ChevronDown
                            size={16}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                        />
                    </div>
                </div>

                {/* Price */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-white text-sm font-semibold">Price</label>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-4 h-4 rounded-full border border-indigo-500 flex items-center justify-center shrink-0">
                                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                            </div>
                            <span className="text-slate-300 text-[13px] group-hover:text-white transition-colors">
                                All
                            </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-4 h-4 rounded-full border border-white/20 group-hover:border-white/40 flex items-center justify-center shrink-0 transition-colors" />
                            <span className="text-slate-400 text-[13px] group-hover:text-white transition-colors">
                                Free
                            </span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="w-4 h-4 rounded-full border border-white/20 group-hover:border-white/40 flex items-center justify-center shrink-0 transition-colors" />
                            <span className="text-slate-400 text-[13px] group-hover:text-white transition-colors">
                                Premium
                            </span>
                        </label>
                    </div>
                </div>

                {/* Compatibility */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-white text-sm font-semibold">Compatibility</label>
                    <div className="flex flex-col gap-2">
                        {["Windows", "macOS", "Linux", "Android", "iOS", "Web"].map((os) => (
                            <label
                                key={os}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="w-4 h-4 rounded border border-white/20 group-hover:border-white/40 flex items-center justify-center shrink-0 transition-colors" />
                                <span className="text-slate-400 text-[13px] group-hover:text-white transition-colors">
                                    {os}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Plugin Type */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-white text-sm font-semibold">Plugin type</label>
                    <div className="flex flex-col gap-2">
                        {["Official", "Community", "Verified"].map((type) => (
                            <label
                                key={type}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="w-4 h-4 rounded border border-white/20 group-hover:border-white/40 flex items-center justify-center shrink-0 transition-colors" />
                                <span className="text-slate-400 text-[13px] group-hover:text-white transition-colors">
                                    {type}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Ratings */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-white text-sm font-semibold">Ratings</label>
                    <div className="flex flex-col gap-2">
                        {[5, 4, 3, 2].map((stars) => (
                            <label
                                key={stars}
                                className="flex items-center gap-3 cursor-pointer group"
                            >
                                <div className="w-4 h-4 rounded border border-white/20 group-hover:border-white/40 flex items-center justify-center shrink-0 transition-colors" />
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={12}
                                            fill={i < stars ? "#facc15" : "transparent"}
                                            className={
                                                i < stars ? "text-yellow-400" : "text-white/20"
                                            }
                                        />
                                    ))}
                                    <span className="text-slate-400 text-[11px] ml-1">& up</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-col gap-2.5">
                    <label className="text-white text-sm font-semibold">Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {[
                            "Popular",
                            "Trending",
                            "New",
                            "No Code",
                            "Fast",
                            "Stealth",
                            "Headless",
                        ].map((tag) => (
                            <button
                                key={tag}
                                className="text-slate-400 bg-white/[0.02] border border-white/5 hover:bg-white/10 hover:text-white text-[11px] font-medium px-3 py-1.5 rounded-lg transition-colors"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Build & Earn CTA */}
                <div className="mt-2 bg-gradient-to-br from-[#120a2e] to-[#070314] border border-indigo-500/20 rounded-2xl p-5 relative overflow-hidden">
                    <div className="absolute top-4 right-4 text-indigo-400 opacity-20 rotate-12">
                        <Puzzle size={48} />
                    </div>
                    <h4 className="text-white font-bold text-[14px] mb-2 relative z-10">
                        Build & Earn
                    </h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed mb-4 relative z-10">
                        Create your own plugin and earn from thousands of users worldwide.
                    </p>
                    <button className="w-full bg-[#4c35e6] hover:bg-[#5a46e8] transition-colors text-white font-semibold text-[12px] py-2.5 rounded-lg relative z-10 shadow-[0_0_15px_rgba(76,53,230,0.4)]">
                        Become a Developer
                    </button>
                </div>
            </div>
        </aside>
    );
}
