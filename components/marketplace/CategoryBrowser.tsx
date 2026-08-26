"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowRight, ChevronRight, ChevronLeft } from "lucide-react";
import { getCategoryIcon } from "@/utils/icon-utils";
import { getPublicCategoriesWithCounts, CategoryWithCount } from "@/lib/api";

interface CategoryBrowserProps {
    categories?: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

/**
 * Returns signature color tokens for each category card & icon box
 */
function getCategoryTheme(name: string, isSelected: boolean) {
    const lower = name.toLowerCase();

    if (lower === "all") {
        return {
            card: isSelected
                ? "bg-indigo-600/25 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                : "bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/40 text-indigo-200 hover:bg-indigo-500/15",
            icon: isSelected
                ? "bg-indigo-500 text-white shadow-md"
                : "bg-indigo-500/20 text-indigo-300",
        };
    }

    if (lower.includes("util") || lower.includes("tool")) {
        return {
            card: isSelected
                ? "bg-blue-600/25 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]"
                : "bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40 text-blue-200 hover:bg-blue-500/15",
            icon: isSelected ? "bg-blue-500 text-white shadow-md" : "bg-blue-500/20 text-blue-300",
        };
    }

    if (lower.includes("social") || lower.includes("media")) {
        return {
            card: isSelected
                ? "bg-pink-600/25 border-pink-500 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]"
                : "bg-pink-500/10 border-pink-500/20 hover:border-pink-500/40 text-pink-200 hover:bg-pink-500/15",
            icon: isSelected ? "bg-pink-500 text-white shadow-md" : "bg-pink-500/20 text-pink-300",
        };
    }

    if (lower.includes("e-commerce") || lower.includes("shop") || lower.includes("retail")) {
        return {
            card: isSelected
                ? "bg-amber-600/25 border-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                : "bg-amber-500/10 border-amber-500/20 hover:border-amber-500/40 text-amber-200 hover:bg-amber-500/15",
            icon: isSelected
                ? "bg-amber-500 text-white shadow-md"
                : "bg-amber-500/20 text-amber-300",
        };
    }

    if (lower.includes("seo") || lower.includes("audit") || lower.includes("search")) {
        return {
            card: isSelected
                ? "bg-emerald-600/25 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                : "bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40 text-emerald-200 hover:bg-emerald-500/15",
            icon: isSelected
                ? "bg-emerald-500 text-white shadow-md"
                : "bg-emerald-500/20 text-emerald-300",
        };
    }

    if (lower.includes("data") || lower.includes("lead") || lower.includes("analytics")) {
        return {
            card: isSelected
                ? "bg-cyan-600/25 border-cyan-500 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                : "bg-cyan-500/10 border-cyan-500/20 hover:border-cyan-500/40 text-cyan-200 hover:bg-cyan-500/15",
            icon: isSelected ? "bg-cyan-500 text-white shadow-md" : "bg-cyan-500/20 text-cyan-300",
        };
    }

    if (lower.includes("code") || lower.includes("dev") || lower.includes("tech")) {
        return {
            card: isSelected
                ? "bg-violet-600/25 border-violet-500 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                : "bg-violet-500/10 border-violet-500/20 hover:border-violet-500/40 text-violet-200 hover:bg-violet-500/15",
            icon: isSelected
                ? "bg-violet-500 text-white shadow-md"
                : "bg-violet-500/20 text-violet-300",
        };
    }

    if (lower.includes("sec") || lower.includes("stealth") || lower.includes("shield")) {
        return {
            card: isSelected
                ? "bg-rose-600/25 border-rose-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]"
                : "bg-rose-500/10 border-rose-500/20 hover:border-rose-500/40 text-rose-200 hover:bg-rose-500/15",
            icon: isSelected ? "bg-rose-500 text-white shadow-md" : "bg-rose-500/20 text-rose-300",
        };
    }

    // Default Fallback Color Theme (Purple)
    return {
        card: isSelected
            ? "bg-purple-600/25 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            : "bg-purple-500/10 border-purple-500/20 hover:border-purple-500/40 text-purple-200 hover:bg-purple-500/15",
        icon: isSelected
            ? "bg-purple-500 text-white shadow-md"
            : "bg-purple-500/20 text-purple-300",
    };
}

export default function CategoryBrowser({
    categories: propCategories,
    selectedCategory,
    onSelectCategory,
}: CategoryBrowserProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [categoryItems, setCategoryItems] = useState<CategoryWithCount[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        getPublicCategoriesWithCounts()
            .then((data) => {
                if (isMounted && Array.isArray(data)) {
                    setCategoryItems(data);
                }
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === "left" ? -250 : 250;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    // Build categories list from API or fallback props
    const categoriesWithCounts: CategoryWithCount[] =
        categoryItems.length > 0
            ? categoryItems
            : propCategories && propCategories.length > 0
              ? propCategories.map((c) => ({ name: c, count: 0 }))
              : [
                    { name: "Utilities", count: 12 },
                    { name: "Social Media", count: 8 },
                    { name: "SEO & Auditing", count: 6 },
                    { name: "E-commerce", count: 15 },
                ];

    const totalPluginsCount = categoriesWithCounts.reduce((sum, item) => sum + item.count, 0);

    const displayCategories: CategoryWithCount[] = [
        { name: "All", count: totalPluginsCount },
        ...categoriesWithCounts,
    ];

    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-7 relative z-10 border-t border-white/5 overflow-hidden">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-5">
                <h3 className="text-white font-bold text-base sm:text-lg">Browse by category</h3>
                <button
                    onClick={() => onSelectCategory("All")}
                    className="text-indigo-400 hover:text-indigo-300 text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer"
                >
                    View all categories <ArrowRight size={14} />
                </button>
            </div>

            {/* Carousel Container */}
            <div className="relative group w-full min-w-0">
                {/* Left Scroll Arrow Button */}
                <button
                    onClick={() => scroll("left")}
                    aria-label="Scroll Left"
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 -left-3 z-20 w-9 h-9 bg-[#120d2b]/90 border border-white/10 rounded-full items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-600 cursor-pointer"
                >
                    <ChevronLeft size={18} />
                </button>

                {/* X-Axis Scroll Track with Custom Scrollbar */}
                <div
                    ref={scrollContainerRef}
                    className="flex gap-2.5 sm:gap-3.5 overflow-x-auto pb-3 pt-1 w-full min-w-0 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-indigo-500/40 hover:[&::-webkit-scrollbar-thumb]:bg-indigo-500/70 [&::-webkit-scrollbar-thumb]:rounded-full [scrollbar-color:rgba(99,102,241,0.4)_rgba(255,255,255,0.05)] [scrollbar-width:thin]"
                >
                    {loading && categoryItems.length === 0
                        ? Array.from({ length: 6 }).map((_, i) => (
                              <div
                                  key={i}
                                  className="snap-start shrink-0 w-[130px] sm:w-[155px] md:w-[170px] border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-4 animate-pulse bg-white/[0.02]"
                              >
                                  <div className="w-8 h-8 rounded-lg bg-white/10 mb-3" />
                                  <div className="w-20 h-4 rounded bg-white/10 mb-1" />
                                  <div className="w-12 h-3 rounded bg-white/10" />
                              </div>
                          ))
                        : displayCategories.map((cat) => {
                              const isSelected = selectedCategory === cat.name;
                              const theme = getCategoryTheme(cat.name, isSelected);

                              return (
                                  <button
                                      key={cat.name}
                                      onClick={() => onSelectCategory(cat.name)}
                                      className={`snap-start shrink-0 w-[130px] sm:w-[155px] md:w-[170px] border transition-all duration-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex flex-col items-start text-left group/card cursor-pointer ${theme.card}`}
                                  >
                                      <div
                                          className={`mb-2.5 sm:mb-3 w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group-hover/card:scale-110 ${theme.icon}`}
                                      >
                                          {getCategoryIcon(cat.name, "w-4 h-4 sm:w-5 sm:h-5")}
                                      </div>
                                      <h4 className="text-white font-semibold text-xs sm:text-[13px] md:text-[14px] mb-0.5 sm:mb-1 truncate w-full">
                                          {cat.name}
                                      </h4>
                                      <span className="text-slate-400 text-[10px] sm:text-xs">
                                          {cat.count > 0
                                              ? `${cat.count} plugin${cat.count === 1 ? "" : "s"}`
                                              : "Category"}
                                      </span>
                                  </button>
                              );
                          })}
                </div>

                {/* Right Scroll Arrow Button */}
                <button
                    onClick={() => scroll("right")}
                    aria-label="Scroll Right"
                    className="hidden md:flex absolute top-1/2 -translate-y-1/2 -right-3 z-20 w-9 h-9 bg-[#120d2b]/90 border border-white/10 rounded-full items-center justify-center text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-indigo-600 cursor-pointer"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </section>
    );
}
