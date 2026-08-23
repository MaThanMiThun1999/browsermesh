import React from "react";

// ==========================================
// User & Auth Types
// ==========================================

export type UserRole = "user" | "plugin_author" | "admin" | "super_admin";
export type UserStatus = "active" | "suspended" | "banned" | "pending_verification";

export interface User {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    planId?: string | null;
    isEmailVerified: boolean;
    isOnboardingCompleted: boolean;
    emailVerifiedAt?: string | Date | null;
    storageUsedBytes: number;
    subscriptionId?: string | null;
    lastLoginAt?: string | Date | null;
    metadata?: Record<string, unknown> | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

// ==========================================
// Marketplace & Plugin Types
// ==========================================

export type PluginStatus = "draft" | "review" | "approved" | "published" | "archived";
export type DevicePlatform = "android" | "ios" | "windows" | "linux" | "macos" | "web";
export type PluginTier = "free" | "starter" | "pro" | "enterprise";

export interface Category {
    id: string;
    label: string;
    plugins: number;
    icon: React.ReactNode;
    color: string;
}

export interface PluginListItem {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    category: string | null;
    author: string | null;
    tier: PluginTier | string;
    isFeatured: boolean;
    iconUrl: string | null;
    latestVersion: string | null;
    canInstall: boolean;
    isLocked: boolean;
    installedTier: string;
    hasDependencies: boolean;
    installCount: number;
    viewCount: number;
    totalJobs: number;
    averageRating?: number | null;
    reviewCount?: number;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface PluginVersion {
    id: string;
    pluginId: string;
    version: string;
    status: PluginStatus;
    changelog?: string | null;
    packageUrl: string;
    checksumSha256: string;
    sizeBytes?: number;
    hasDependencies?: boolean;
    minAppVersion?: string | null;
    compatibility?: DevicePlatform[] | null;
    publishedAt?: string | Date | null;
    createdAt?: string | Date;
}

export interface PluginDetailItem extends PluginListItem {
    bannerUrl: string | null;
    documentationUrl: string | null;
    websiteUrl: string | null;
    readme: string | null;
    examples: Record<string, unknown> | null;
    features: Record<string, unknown> | null;
    sampleOutput: Record<string, unknown> | null;
    versions: {
        id: string;
        version: string;
        changelog: string | null;
        createdAt: string | Date;
    }[];
}

export interface PluginReview {
    id: string;
    pluginId: string;
    userId: string;
    rating: number;
    reviewText?: string | null;
    user?: {
        fullName: string;
        avatarUrl?: string;
    };
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

// ==========================================
// License & Subscription Types
// ==========================================

export type LicenseStatus = "active" | "expired" | "suspended";
export type SubscriptionStatus = "active" | "past_due" | "unpaid" | "cancelled" | "incomplete";
export type PaymentStatus = "pending" | "succeeded" | "failed" | "refunded";

export interface License {
    id: string;
    userId: string;
    plan: string;
    status: LicenseStatus;
    expiresAt?: string | Date | null;
    lastValidatedAt?: string | Date | null;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface Subscription {
    id: string;
    userId: string;
    provider: string;
    providerSubscriptionId: string;
    plan: string;
    status: SubscriptionStatus;
    currency: string;
    amount: number;
    startsAt: string | Date;
    endsAt?: string | Date | null;
    cancelledAt?: string | Date | null;
    renewsAt?: string | Date | null;
    cancelAtPeriodEnd: boolean;
    createdAt?: string | Date;
}

// ==========================================
// API Standard Responses
// ==========================================

export interface PaginationMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

export interface ApiSuccessResponse<T> {
    success: true;
    status_code: number;
    message: string;
    data: T;
    meta?: PaginationMeta | null;
    timestamp: string;
}

export interface ApiErrorResponse {
    success: false;
    status_code: number;
    message: string;
    correlation_id: string;
    errors?: unknown;
    timestamp: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
