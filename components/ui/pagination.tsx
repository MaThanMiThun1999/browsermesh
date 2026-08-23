"use client";

import { useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number;
    showFirstLast?: boolean;
    showSummary?: boolean;
    totalItems?: number;
    pageSize?: number;
    align?: "center" | "right" | "between";
    className?: string;
}

/**
 * Calculates page numbers with ellipses logic (e.g., [1, '...', 4, 5, 6, '...', 13])
 */
function usePaginationRange({
    currentPage,
    totalPages,
    siblingCount = 1,
}: {
    currentPage: number;
    totalPages: number;
    siblingCount?: number;
}): (number | string)[] {
    return useMemo(() => {
        // Total numbers to show = siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        const totalPageNumbers = siblingCount * 2 + 5;

        // Case 1: If total pages is less than the page numbers we want to show
        if (totalPageNumbers >= totalPages) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        // Case 2: No left dots, but right dots to be shown
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount;
            const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
            return [...leftRange, "...", totalPages];
        }

        // Case 3: No right dots, but left dots to be shown
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount;
            const rightRange = Array.from(
                { length: rightItemCount },
                (_, i) => totalPages - rightItemCount + i + 1
            );
            return [firstPageIndex, "...", ...rightRange];
        }

        // Case 4: Both left and right dots to be shown
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = Array.from(
                { length: rightSiblingIndex - leftSiblingIndex + 1 },
                (_, i) => leftSiblingIndex + i
            );
            return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
        }

        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }, [currentPage, totalPages, siblingCount]);
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
    showFirstLast = true,
    showSummary = false,
    totalItems,
    pageSize,
    align = "center",
    className = "",
}: PaginationProps) {
    const paginationRange = usePaginationRange({
        currentPage,
        totalPages,
        siblingCount,
    });

    if (totalPages <= 1) return null;

    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            onPageChange(page);
        }
    };

    const startItem = totalItems && pageSize ? (currentPage - 1) * pageSize + 1 : null;
    const endItem = totalItems && pageSize ? Math.min(currentPage * pageSize, totalItems) : null;

    const alignmentClass =
        align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";

    return (
        <div
            className={`flex flex-col sm:flex-row items-center ${
                showSummary ? "justify-between" : alignmentClass
            } gap-4 w-full ${className}`}
        >
            {/* Optional Items Summary */}
            {showSummary && totalItems && startItem && endItem && (
                <div className="text-slate-400 text-xs sm:text-sm font-medium">
                    Showing <span className="text-white font-semibold">{startItem}</span> to{" "}
                    <span className="text-white font-semibold">{endItem}</span> of{" "}
                    <span className="text-white font-semibold">{totalItems}</span> results
                </div>
            )}

            {/* Pagination Controls Container */}
            <div className="flex items-center gap-1 sm:gap-1.5 bg-[#080517]/90 border border-white/10 rounded-2xl p-1.5 shadow-xl backdrop-blur-md">
                {/* First Page Button */}
                {showFirstLast && (
                    <button
                        onClick={() => handlePageClick(1)}
                        disabled={currentPage === 1}
                        aria-label="First page"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all"
                    >
                        <ChevronsLeft size={16} />
                    </button>
                )}

                {/* Previous Page Button */}
                <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all"
                >
                    <ChevronLeft size={16} />
                </button>

                {/* Page Number Buttons */}
                {paginationRange.map((pageNumber, idx) => {
                    if (pageNumber === "...") {
                        return (
                            <span
                                key={`dots-${idx}`}
                                className="w-7 h-8 sm:w-8 sm:h-9 flex items-center justify-center text-slate-500 text-xs font-semibold select-none"
                            >
                                ...
                            </span>
                        );
                    }

                    const page = pageNumber as number;
                    const isActive = page === currentPage;

                    return (
                        <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            aria-label={`Page ${page}`}
                            aria-current={isActive ? "page" : undefined}
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs sm:text-sm transition-all ${
                                isActive
                                    ? "bg-[#4c35e6] text-white font-bold shadow-[0_0_15px_rgba(76,53,230,0.5)] scale-105"
                                    : "text-slate-400 font-medium hover:text-white hover:bg-white/10"
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}

                {/* Next Page Button */}
                <button
                    onClick={() => handlePageClick(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all"
                >
                    <ChevronRight size={16} />
                </button>

                {/* Last Page Button */}
                {showFirstLast && (
                    <button
                        onClick={() => handlePageClick(totalPages)}
                        disabled={currentPage === totalPages}
                        aria-label="Last page"
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all"
                    >
                        <ChevronsRight size={16} />
                    </button>
                )}
            </div>
        </div>
    );
}
