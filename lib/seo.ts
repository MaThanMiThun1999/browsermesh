import type { Metadata } from "next";

export interface SEOConfig {
    title: string;
    description: string;
    path?: string;
    image?: string;
    noIndex?: boolean;
    type?: "website" | "article";
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface BreadcrumbItem {
    name: string;
    item: string;
}

export interface PluginSchemaOptions {
    name: string;
    description: string;
    category?: string;
    rating?: number;
    reviewCount?: number;
    authorName?: string;
    url: string;
    image?: string;
}

export interface TechArticleSchemaOptions {
    headline: string;
    description: string;
    url: string;
    category?: string;
    datePublished?: string;
    dateModified?: string;
    image?: string;
}

export const SITE_URL = "https://browsermesh-one.vercel.app";
export const DEFAULT_OG_IMAGE = "/opengraph-img.png";

/**
 * Centralized Metadata Builder for Next.js App Router routes.
 * Ensures consistent canonical URLs, OpenGraph metadata, Twitter cards, and indexing headers.
 */
export function constructMetadata({
    title,
    description,
    path = "",
    image = DEFAULT_OG_IMAGE,
    noIndex = false,
    type = "website",
}: SEOConfig): Metadata {
    const formattedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
    const canonicalUrl = `${SITE_URL}${formattedPath}`;
    const fullImageUrl = image.startsWith("http")
        ? image
        : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;

    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: "BrowserMesh",
            images: [
                {
                    url: fullImageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            type,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [fullImageUrl],
        },
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}

/**
 * JSON-LD Schema Generators for Search & Answer Engine Optimization (AEO / GEO)
 */

export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "BrowserMesh",
        "url": SITE_URL,
        "logo": `${SITE_URL}/images/logo-with-text.webp`,
        "description": "Enterprise stealth web scraping platform and decentralized peer-to-peer residential browser node network.",
        "foundingDate": "2024",
        "sameAs": [
            "https://github.com/MaThanMiThun1999",
            "https://www.linkedin.com/in/mathanraj-murugesan",
            "https://x.com/BrowserMesh",
        ],
        "knowsAbout": [
            "Web Scraping",
            "Anti-Bot Evasion",
            "Cloudflare Turnstile Bypass",
            "TLS JA4 Fingerprinting",
            "Residential Proxy Nodes",
            "Mobile 4G/5G Cellular Scraping",
            "Headless Browser Automation",
            "Puppeteer and Playwright Stealth",
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "url": `${SITE_URL}/about`,
        },
    };
}

export function generateWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "BrowserMesh",
        "url": SITE_URL,
        "description": "Bypass Cloudflare and anti-bot protections with stealth residential browser nodes and no-code marketplace plugins.",
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${SITE_URL}/marketplace?search={search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": crumb.item.startsWith("http")
                ? crumb.item
                : `${SITE_URL}${crumb.item.startsWith("/") ? crumb.item : `/${crumb.item}`}`,
        })),
    };
}

export function generateSoftwareApplicationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "BrowserMesh",
        "operatingSystem": "Windows, Linux, Android, Web",
        "applicationCategory": "DeveloperApplication",
        "description": "Stealth web scraping and residential browser node automation platform.",
        "offers": {
            "@type": "AggregateOffer",
            "priceCurrency": "USD",
            "lowPrice": "0",
            "highPrice": "49",
            "offerCount": "3",
            "offers": [
                {
                    "@type": "Offer",
                    "name": "Starter / Free",
                    "price": "0",
                    "priceCurrency": "USD",
                },
                {
                    "@type": "Offer",
                    "name": "Pro Developer",
                    "price": "15",
                    "priceCurrency": "USD",
                },
                {
                    "@type": "Offer",
                    "name": "Enterprise Mesh",
                    "price": "49",
                    "priceCurrency": "USD",
                },
            ],
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "1250",
            "reviewCount": "840",
            "bestRating": "5",
            "worstRating": "1",
        },
    };
}

export function generateFaqSchema(faqs: FAQItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
            },
        })),
    };
}

export function generatePluginSchema({
    name,
    description,
    category = "Web Scraping Plugin",
    rating = 4.9,
    reviewCount = 120,
    authorName = "Mathanraj Murugesan",
    url,
    image = DEFAULT_OG_IMAGE,
}: PluginSchemaOptions) {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": name,
        "description": description,
        "applicationCategory": category,
        "operatingSystem": "Windows, Linux, Android, Web",
        "url": url,
        "image": image.startsWith("http") ? image : `${SITE_URL}${image}`,
        "author": {
            "@type": "Person",
            "name": authorName,
        },
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR",
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": rating.toString(),
            "reviewCount": reviewCount.toString(),
            "bestRating": "5",
            "worstRating": "1",
        },
    };
}

export function generateTechArticleSchema({
    headline,
    description,
    url,
    category = "Documentation",
    datePublished = "2024-01-01T00:00:00Z",
    dateModified = new Date().toISOString(),
    image = DEFAULT_OG_IMAGE,
}: TechArticleSchemaOptions) {
    return {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": headline,
        "description": description,
        "url": url,
        "articleSection": category,
        "datePublished": datePublished,
        "dateModified": dateModified,
        "image": image.startsWith("http") ? image : `${SITE_URL}${image}`,
        "author": {
            "@type": "Organization",
            "name": "BrowserMesh Security & Research Team",
            "url": SITE_URL,
        },
        "publisher": {
            "@type": "Organization",
            "name": "BrowserMesh",
            "logo": {
                "@type": "ImageObject",
                "url": `${SITE_URL}/images/logo-with-text.webp`,
            },
        },
    };
}
