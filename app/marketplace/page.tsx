"use client";

import { useState, useEffect, Suspense, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import MarketplaceHero from "@/components/marketplace/MarketplaceHero";
import CategoryBrowser from "@/components/marketplace/CategoryBrowser";
import MarketplaceFilters from "@/components/marketplace/MarketplaceFilters";
import MarketplaceGrid from "@/components/marketplace/MarketplaceGrid";
import MarketplaceStats from "@/components/marketplace/MarketplaceStats";
import MarketplaceCTA from "@/components/marketplace/MarketplaceCTA";
import {
    getPublicMarketplacePlugins,
    getPublicCategories,
    getPublicStats,
    PublicPlugin,
    PaginationMeta,
    PublicStats,
} from "@/lib/api";

function MarketplacePageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Read Initial Params from URL Search Query
    const initialSearch = searchParams.get("search") || searchParams.get("q") || "";
    const initialCategory = searchParams.get("category") || "All";
    const initialSortBy = searchParams.get("sortBy") || searchParams.get("sort") || "installed";
    const initialTier = searchParams.get("tier") || searchParams.get("price") || "All";
    const initialType = searchParams.get("type") || "All";
    const initialMinRating = searchParams.get("minRating") || searchParams.get("rating");
    const initialComp = searchParams.get("compatibility") || searchParams.get("os");
    const initialTags = searchParams.get("tags");
    const initialPage = searchParams.get("page");

    // Filter State
    const [search, setSearch] = useState(initialSearch);
    const [activeSearch, setActiveSearch] = useState(initialSearch);
    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [sortBy, setSortBy] = useState(initialSortBy);
    const [tier, setTier] = useState(initialTier);
    const [typeFilter, setTypeFilter] = useState(initialType);
    const [minRating, setMinRating] = useState<number | null>(
        initialMinRating && !isNaN(parseFloat(initialMinRating))
            ? parseFloat(initialMinRating)
            : null
    );
    const [compatibility, setCompatibility] = useState<string[]>(
        initialComp ? initialComp.split(",").filter(Boolean) : []
    );
    const [selectedTags, setSelectedTags] = useState<string[]>(
        initialTags ? initialTags.split(",").filter(Boolean) : []
    );
    const [currentPage, setCurrentPage] = useState<number>(
        initialPage && !isNaN(parseInt(initialPage, 10)) ? parseInt(initialPage, 10) : 1
    );
    const limit = 9;

    // Data State
    const [plugins, setPlugins] = useState<PublicPlugin[]>([]);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [stats, setStats] = useState<PublicStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // URL Query Synchronization Helper
    const updateUrlParams = useCallback(
        (overrides: Record<string, string | number | null | undefined>) => {
            const params = new URLSearchParams(searchParams.toString());

            const nextValues: Record<string, string | number | null | undefined> = {
                search: activeSearch,
                category: selectedCategory,
                sortBy,
                tier,
                type: typeFilter,
                minRating,
                compatibility: compatibility.length > 0 ? compatibility.join(",") : null,
                tags: selectedTags.length > 0 ? selectedTags.join(",") : null,
                page: currentPage > 1 ? currentPage : null,
                ...overrides,
            };

            Object.entries(nextValues).forEach(([key, value]) => {
                if (
                    value === undefined ||
                    value === null ||
                    value === "" ||
                    value === "All" ||
                    (key === "sortBy" && value === "installed") ||
                    (key === "page" && Number(value) <= 1)
                ) {
                    params.delete(key);
                } else {
                    params.set(key, String(value));
                }
            });

            const queryString = params.toString();
            const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
            router.replace(targetUrl, { scroll: false });
        },
        [
            searchParams,
            pathname,
            router,
            activeSearch,
            selectedCategory,
            sortBy,
            tier,
            typeFilter,
            minRating,
            compatibility,
            selectedTags,
            currentPage,
        ]
    );

    // Initial Fetch for Categories & Stats
    useEffect(() => {
        let isMounted = true;

        getPublicCategories().then((cats) => {
            if (isMounted && Array.isArray(cats)) {
                setCategories(cats);
            }
        });

        getPublicStats().then((s) => {
            if (isMounted && s) {
                setStats(s);
            }
        });

        return () => {
            isMounted = false;
        };
    }, []);

    // Main Plugin Listing Fetch (Effect-driven)
    useEffect(() => {
        let isMounted = true;

        async function loadPlugins() {
            setLoading(true);
            setError(null);

            const searchParam = activeSearch.trim() || undefined;
            const categoryParam = selectedCategory !== "All" ? selectedCategory : undefined;
            const tierParam = tier !== "All" ? tier.toLowerCase() : undefined;
            const typeParam = typeFilter !== "All" ? typeFilter.toLowerCase() : undefined;
            const minRatingParam = minRating !== null ? minRating : undefined;
            const compParam = compatibility.length > 0 ? compatibility.join(",") : undefined;
            const tagsParam = selectedTags.length > 0 ? selectedTags.join(",") : undefined;

            try {
                const res = await getPublicMarketplacePlugins({
                    search: searchParam,
                    category: categoryParam,
                    sortBy,
                    tier: tierParam,
                    type: typeParam,
                    minRating: minRatingParam,
                    compatibility: compParam,
                    tags: tagsParam,
                    page: currentPage,
                    limit,
                });

                if (isMounted) {
                    if (res && Array.isArray(res.plugins)) {
                        setPlugins(res.plugins);
                        setMeta(res.meta);
                    } else {
                        setPlugins([]);
                        setMeta(null);
                    }
                }
            } catch (err: unknown) {
                if (isMounted) {
                    console.error("Error fetching marketplace plugins:", err);
                    setError("Failed to load marketplace plugins. Please try again.");
                    setPlugins([]);
                    setMeta(null);
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
    }, [
        activeSearch,
        selectedCategory,
        sortBy,
        tier,
        typeFilter,
        minRating,
        compatibility,
        selectedTags,
        currentPage,
    ]);

    // Retry Handler
    const handleRetry = () => {
        setLoading(true);
        setError(null);

        const searchParam = activeSearch.trim() || undefined;
        const categoryParam = selectedCategory !== "All" ? selectedCategory : undefined;
        const tierParam = tier !== "All" ? tier.toLowerCase() : undefined;
        const typeParam = typeFilter !== "All" ? typeFilter.toLowerCase() : undefined;
        const minRatingParam = minRating !== null ? minRating : undefined;
        const compParam = compatibility.length > 0 ? compatibility.join(",") : undefined;
        const tagsParam = selectedTags.length > 0 ? selectedTags.join(",") : undefined;

        getPublicMarketplacePlugins({
            search: searchParam,
            category: categoryParam,
            sortBy,
            tier: tierParam,
            type: typeParam,
            minRating: minRatingParam,
            compatibility: compParam,
            tags: tagsParam,
            page: currentPage,
            limit,
        })
            .then((res) => {
                if (res && Array.isArray(res.plugins)) {
                    setPlugins(res.plugins);
                    setMeta(res.meta);
                } else {
                    setPlugins([]);
                    setMeta(null);
                }
            })
            .catch(() => {
                setError("Failed to load marketplace plugins. Please try again.");
                setPlugins([]);
                setMeta(null);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Smooth Scroll Helper
    const scrollToGrid = () => {
        setTimeout(() => {
            const gridEl = document.getElementById("marketplace-grid");
            if (gridEl) {
                gridEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 50);
    };

    // Handlers (Updating State + URL Query Params)
    const handleSearchSubmit = () => {
        setActiveSearch(search);
        setCurrentPage(1);
        updateUrlParams({ search, page: 1 });
        scrollToGrid();
    };

    const handleCategorySelect = (cat: string) => {
        setSelectedCategory(cat);
        setCurrentPage(1);
        updateUrlParams({ category: cat, page: 1 });
        scrollToGrid();
    };

    const handleSortByChange = (newSort: string) => {
        setSortBy(newSort);
        setCurrentPage(1);
        updateUrlParams({ sortBy: newSort, page: 1 });
    };

    const handleTierChange = (newTier: string) => {
        setTier(newTier);
        setCurrentPage(1);
        updateUrlParams({ tier: newTier, page: 1 });
    };

    const handleTypeFilterChange = (newType: string) => {
        setTypeFilter(newType);
        setCurrentPage(1);
        updateUrlParams({ type: newType, page: 1 });
    };

    const handleMinRatingChange = (rating: number | null) => {
        setMinRating(rating);
        setCurrentPage(1);
        updateUrlParams({ minRating: rating, page: 1 });
    };

    const handleCompatibilityToggle = (os: string) => {
        const nextComp = compatibility.includes(os)
            ? compatibility.filter((item) => item !== os)
            : [...compatibility, os];

        setCompatibility(nextComp);
        setCurrentPage(1);
        updateUrlParams({
            compatibility: nextComp.length > 0 ? nextComp.join(",") : null,
            page: 1,
        });
    };

    const handleTagToggle = (tag: string) => {
        const isSelected = selectedTags.includes(tag);
        const nextTags = isSelected
            ? selectedTags.filter((item) => item !== tag)
            : [...selectedTags, tag];

        setSelectedTags(nextTags);
        setCurrentPage(1);
        updateUrlParams({
            tags: nextTags.length > 0 ? nextTags.join(",") : null,
            page: 1,
        });
        scrollToGrid();
    };

    const handleClearAll = () => {
        setSearch("");
        setActiveSearch("");
        setSelectedCategory("All");
        setSortBy("installed");
        setTier("All");
        setTypeFilter("All");
        setMinRating(null);
        setCompatibility([]);
        setSelectedTags([]);
        setCurrentPage(1);

        router.replace(pathname, { scroll: false });
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        updateUrlParams({ page });
        scrollToGrid();
    };

    return (
        <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <MarketplaceHero
                search={search}
                onSearchChange={(val) => {
                    setSearch(val);
                    if (val.trim() === "") {
                        setActiveSearch("");
                        setCurrentPage(1);
                        updateUrlParams({ search: "", page: 1 });
                    }
                }}
                onSearchSubmit={handleSearchSubmit}
                stats={stats}
                onTagClick={handleTagToggle}
            />
            <CategoryBrowser
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleCategorySelect}
            />

            {/* Main Content Area (Sidebar + Grid) */}
            <section
                id="marketplace-grid"
                className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6 lg:gap-10 w-full scroll-mt-24"
            >
                <MarketplaceFilters
                    sortBy={sortBy}
                    onSortByChange={handleSortByChange}
                    tier={tier}
                    onTierChange={handleTierChange}
                    typeFilter={typeFilter}
                    onTypeFilterChange={handleTypeFilterChange}
                    minRating={minRating}
                    onMinRatingChange={handleMinRatingChange}
                    compatibility={compatibility}
                    onCompatibilityToggle={handleCompatibilityToggle}
                    selectedTags={selectedTags}
                    onTagToggle={handleTagToggle}
                    onClearAll={handleClearAll}
                />
                <MarketplaceGrid
                    plugins={plugins}
                    loading={loading}
                    error={error}
                    onRetry={handleRetry}
                    totalResults={meta?.total ?? plugins.length}
                    currentPage={currentPage}
                    totalPages={meta?.totalPages ?? 1}
                    onPageChange={handlePageChange}
                    onClearFilters={handleClearAll}
                />
            </section>

            <MarketplaceStats stats={stats} />
            <MarketplaceCTA />
        </div>
    );
}

export default function MarketplacePage() {
    return (
        <Suspense fallback={<div className="min-h-screen w-full bg-[#05020a]" />}>
            <MarketplacePageContent />
        </Suspense>
    );
}
