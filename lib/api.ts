import axios from "axios";
import { envConfig } from "@/data/envConfig";

/**
 * Shared Axios API Client configured with base URL from envConfig
 */
export const apiClient = axios.create({
    baseURL: `${envConfig.apiUrl}/api/v1`,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface PublicPlugin {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    category: string | null;
    author: string | null;
    tier: string;
    type: "official" | "community" | "verified";
    isFeatured: boolean;
    iconUrl: string | null;
    latestVersion: string | null;
    canInstall: boolean;
    isLocked: boolean;
    installedTier: string;
    hasDependencies: boolean;
    compatibility?: string[];
    installCount: number;
    viewCount: number;
    totalJobs: number;
    averageRating: number;
    reviewCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface PluginVersionDetail {
    id: string;
    version: string;
    changelog: string | null;
    createdAt: string;
}

export interface PublicPluginDetail extends PublicPlugin {
    bannerUrl: string | null;
    documentationUrl: string | null;
    websiteUrl: string | null;
    readme: string | null;
    examples: unknown | null;
    features: unknown | null;
    sampleOutput: unknown | null;
    versions: PluginVersionDetail[];
}

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface MarketplaceListQueryParams {
    filter?: "featured" | "top_rated" | "trending" | "new" | string;
    category?: string;
    search?: string;
    tier?: "free" | "pro" | "premium" | "enterprise" | string;
    type?: "official" | "community" | "verified" | string;
    minRating?: number;
    compatibility?: string;
    tags?: string;
    sortBy?: "most_installed" | "rating" | "newest" | "trending" | string;
    page?: number;
    limit?: number;
}

export interface PaginatedPluginsResponse {
    plugins: PublicPlugin[];
    meta: PaginationMeta | null;
}

export interface PublicStats {
    totalPlugins: number;
    totalInstallations: number;
    totalDevelopers: number;
    totalJobsExecuted: number;
    uptimePercentage: number;
    activeNodesOnline: number;
}

export interface LatestReleases {
    version: string;
    releaseDate: string;
    downloads: {
        windows: string;
        linuxAppImage: string;
        linuxDeb: string;
        androidApk: string;
    };
    headlessCmd: {
        bash: string;
        powershell: string;
    };
}

export interface PublicSetting {
    key: string;
    value: Record<string, unknown>;
    description: string | null;
    isPublic: boolean;
}

export interface PricingPlanLimits {
    monthlyResultLimit: number;
    maxDevices: number;
    maxStorageMb: number;
    allowedPluginTiers: string[];
}

export interface PricingPlan {
    plan: string;
    priceMonthly: number;
    stripePriceId: string | null;
    features: string[];
    limits: PricingPlanLimits;
}

// ==========================================
// IN-MEMORY REQUEST DEDUPLICATION CACHE
// ==========================================
const requestCache = new Map<string, Promise<unknown>>();

function deduplicateRequest<T>(key: string, fetchFn: () => Promise<T>): Promise<T> {
    if (requestCache.has(key)) {
        return requestCache.get(key) as Promise<T>;
    }
    const promise = fetchFn().catch((err) => {
        requestCache.delete(key);
        throw err;
    });
    requestCache.set(key, promise);
    return promise;
}

// ==========================================
// PUBLIC API CALL FUNCTIONS
// ==========================================

/**
 * GET /api/v1/public/stats
 * Retrieve real-time platform telemetry and aggregated stats
 */
export async function getPublicStats(): Promise<PublicStats | null> {
    return deduplicateRequest("public:stats", async () => {
        try {
            const response = await apiClient.get("/public/stats");
            return response.data?.data || null;
        } catch {
            return null;
        }
    });
}

/**
 * GET /api/v1/public/releases/latest
 * Retrieve latest app build versions, installer downloads & headless script commands
 */
export async function getLatestReleases(): Promise<LatestReleases | null> {
    return deduplicateRequest("public:releases:latest", async () => {
        try {
            const response = await apiClient.get("/public/releases/latest");
            return response.data?.data || null;
        } catch {
            return null;
        }
    });
}

/**
 * GET /api/v1/public/marketplace
 * Retrieve active marketplace plugins with filter, category, tier, type, minRating, search, and pagination
 */
export async function getPublicMarketplacePlugins(
    params?: MarketplaceListQueryParams
): Promise<PaginatedPluginsResponse> {
    const cacheKey = `public:marketplace:${JSON.stringify(params || {})}`;
    return deduplicateRequest(cacheKey, async () => {
        try {
            const response = await apiClient.get("/public/marketplace", { params });
            return {
                plugins: response.data?.data || [],
                meta: response.data?.meta || null,
            };
        } catch {
            return { plugins: [], meta: null };
        }
    });
}

/**
 * GET /api/v1/public/marketplace/featured
 * Retrieve featured plugins for homepage or marketplace hero previews
 */
export async function getPublicFeaturedPlugins(): Promise<PublicPlugin[]> {
    return deduplicateRequest("public:marketplace:featured", async () => {
        try {
            const response = await apiClient.get("/public/marketplace/featured");
            return response.data?.data || [];
        } catch {
            return [];
        }
    });
}

export interface CategoryWithCount {
    name: string;
    count: number;
}

/**
 * GET /api/v1/public/marketplace/categories
 * Retrieve distinct categories from active marketplace plugins
 */
export async function getPublicCategories(): Promise<string[]> {
    return deduplicateRequest("public:categories", async () => {
        try {
            const response = await apiClient.get("/public/marketplace/categories");
            return response.data?.data || [];
        } catch {
            return [];
        }
    });
}

/**
 * GET /api/v1/public/marketplace/categories?withCounts=true
 * Retrieve distinct categories with plugin counts
 */
export async function getPublicCategoriesWithCounts(): Promise<CategoryWithCount[]> {
    return deduplicateRequest("public:categories:counts", async () => {
        try {
            const response = await apiClient.get("/public/marketplace/categories", {
                params: { withCounts: true },
            });
            return response.data?.data || [];
        } catch {
            return [];
        }
    });
}

/**
 * GET /api/v1/public/marketplace/tags
 * Retrieve active marketplace tags
 */
export async function getPublicTags(): Promise<string[]> {
    return deduplicateRequest("public:tags", async () => {
        try {
            const response = await apiClient.get("/public/marketplace/tags");
            return response.data?.data || [];
        } catch {
            return [];
        }
    });
}

/**
 * GET /api/v1/public/marketplace/popular-searches
 * Retrieve popular search terms from active database plugins
 */
export async function getPublicPopularSearches(): Promise<string[]> {
    return deduplicateRequest("public:popular-searches", async () => {
        try {
            const response = await apiClient.get("/public/marketplace/popular-searches");
            return response.data?.data || [];
        } catch {
            return [];
        }
    });
}

/**
 * GET /api/v1/public/marketplace/plugins/:slug
 * Retrieve deep details and version history for a single plugin
 */
export async function getPublicPluginDetail(slug: string): Promise<PublicPluginDetail | null> {
    try {
        const response = await apiClient.get(`/public/marketplace/plugins/${slug}`);
        return response.data?.data || null;
    } catch {
        return null;
    }
}

export interface PublicPluginReviewItem {
    id: string | number;
    name: string;
    role: string;
    rating: number;
    comment: string;
    likes: number;
    date: string;
}

export interface PublicPluginReviewsData {
    averageRating: number;
    reviewCount: number;
    breakdown: {
        5: number;
        4: number;
        3: number;
        2: number;
        1: number;
    };
    reviews: PublicPluginReviewItem[];
}

/**
 * GET /api/v1/public/marketplace/plugins/:slug/reviews
 * Retrieve real plugin reviews and rating breakdown from backend
 */
export async function getPublicPluginReviews(
    slug: string,
    page = 1,
    limit = 10
): Promise<PublicPluginReviewsData | null> {
    try {
        const response = await apiClient.get(`/public/marketplace/plugins/${slug}/reviews`, {
            params: { page, limit },
        });
        return response.data?.data || null;
    } catch {
        return null;
    }
}

/**
 * GET /api/v1/public/settings
 * Retrieve public system settings
 */
export async function getPublicSettings(): Promise<PublicSetting[]> {
    return deduplicateRequest("public:settings", async () => {
        try {
            const response = await apiClient.get("/public/settings");
            return response.data?.data || [];
        } catch {
            return [];
        }
    });
}

/**
 * GET /api/v1/public/pricing
 * Retrieve available public pricing plans, limits, and feature lists
 */
export async function getPublicPricing(): Promise<PricingPlan[]> {
    return deduplicateRequest("public:pricing", async () => {
        try {
            const response = await apiClient.get("/public/pricing");
            return response.data?.data || [];
        } catch {
            return [];
        }
    });
}
