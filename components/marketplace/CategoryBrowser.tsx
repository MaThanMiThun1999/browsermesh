"use client";

import { useRef } from "react";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { marketplaceCategories } from "@/data/marketplaceData";
import Link from "next/link";

export default function CategoryBrowser() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === "left" ? -250 : 250;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-7 relative z-10 border-t border-white/5 overflow-hidden">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h3 className="text-white font-bold text-base sm:text-lg">Browse by category</h3>
                <Link
                    href="/marketplace/categories"
                    className="text-indigo-400 hover:text-indigo-300 text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors"
                >
                    View all categories <ArrowRight size={14} />
                </Link>
            </div>

            {/* Carousel Container */}
            <div className="relative group w-full min-w-0">
                {/* Left Scroll Arrow Button */}
                <button
                    onClick={() => scroll("left")}
                    aria-label="Scroll Left"
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-3 z-20 w-9 h-9 bg-[#120d2b]/90 border border-white/10 rounded-full items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-600"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* X-Axis Scroll Track with Custom Scrollbar */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-2.5 sm:gap-3.5 overflow-x-auto pb-3 pt-1 w-full min-w-0 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-indigo-500/40 hover:[&::-webkit-scrollbar-thumb]:bg-indigo-500/70 [&::-webkit-scrollbar-thumb]:rounded-full [scrollbar-color:rgba(99,102,241,0.4)_rgba(255,255,255,0.05)] [scrollbar-width:thin]"
                >
                    {marketplaceCategories.map((cat) => (
                        <button
                            key={cat.id}
                            className="snap-start shrink-0 w-[130px] sm:w-[155px] md:w-[170px] bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col items-start text-left group/card"
                        >
                            <div
                                className={`mb-2.5 sm:mb-3 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-white/[0.03] flex items-center justify-center ${cat.color} group-hover/card:scale-110 transition-transform`}
                            >
                                {cat.icon}
                            </div>
                            <h4 className="text-white font-semibold text-xs sm:text-[13px] md:text-[14px] mb-0.5 sm:mb-1 truncate w-full">
                                {cat.label}
                            </h4>
                            <span className="text-slate-500 text-[10px] sm:text-xs">
                                {cat.plugins} plugins
                            </span>
                        </button>
                    ))}
                </div>

                {/* Right Scroll Arrow Button */}
                <button
                    onClick={() => scroll("right")}
                    aria-label="Scroll Right"
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-3 z-20 w-9 h-9 bg-[#120d2b]/90 border border-white/10 rounded-full items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-600"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </section>
    );
}
