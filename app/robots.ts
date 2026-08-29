import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = SITE_URL || "https://browsermesh-one.vercel.app";

    return {
        rules: [
            {
                // Global rule for all standard search engine crawlers & web indexers
                // (Google, Bing, Yahoo, DuckDuckGo, Baidu, Yandex, etc.)
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/internal/",
                    "/admin/",
                    "/private/",
                ],
            },
            {
                // Explicit rules for Top-Tier Search Engine Crawlers
                userAgent: [
                    "Googlebot",
                    "Googlebot-Image",
                    "Googlebot-News",
                    "Bingbot",
                    "msnbot",
                    "BingPreview",
                    "DuckDuckBot",
                    "Baiduspider",
                    "YandexBot",
                    "Slurp",
                ],
                allow: "/",
                disallow: [
                    "/api/internal/",
                    "/admin/",
                    "/private/",
                ],
            },
            {
                // Social Media & Messaging Link Preview Bots (Twitter, LinkedIn, Slack, Discord, Telegram, WhatsApp)
                userAgent: [
                    "Twitterbot",
                    "LinkedInBot",
                    "Slackbot",
                    "Slackbot-LinkExpanding",
                    "Discordbot",
                    "TelegramBot",
                    "WhatsApp",
                    "Pinterestbot",
                ],
                allow: "/",
                disallow: [
                    "/api/internal/",
                    "/admin/",
                ],
            },
            {
                // Explicit permissions for AI Answer Engines & LLM Citation Crawlers
                userAgent: [
                    "GPTBot",
                    "ChatGPT-User",
                    "PerplexityBot",
                    "ClaudeBot",
                    "anthropic-ai",
                    "Google-Extended",
                    "Applebot",
                    "Applebot-Extended",
                    "Amazonbot",
                    "Bytespider",
                    "CCBot",
                    "Meta-ExternalAgent",
                    "FacebookBot",
                    "cohere-ai",
                    "Diffbot",
                ],
                allow: "/",
                disallow: [
                    "/api/internal/",
                    "/admin/",
                ],
            },
            {
                // SEO Analytics & Performance Crawlers (Ahrefs, Semrush)
                userAgent: [
                    "AhrefsBot",
                    "SemrushBot",
                    "DotBot",
                ],
                allow: "/",
                disallow: [
                    "/api/internal/",
                    "/admin/",
                ],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
        host: baseUrl,
    };
}
