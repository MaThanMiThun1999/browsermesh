import { MetadataRoute } from "next";
import { getPublicMarketplacePlugins } from "@/lib/api";
import { getAllDocs } from "@/utils/markdown";
import { getAllBlogPosts } from "@/utils/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "https://browsermesh-one.vercel.app";

    // 1. Static Key Pages
    const staticRoutes = [
        "",
        "/features",
        "/pricing",
        "/about",
        "/docs",
        "/marketplace",
        "/blog",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: route === "" ? 1.0 : 0.8,
    }));

    // 2. Documentation Detail Pages
    let docRoutes: MetadataRoute.Sitemap = [];
    try {
        const docs = getAllDocs();
        if (docs && docs.length > 0) {
            docRoutes = docs.map((doc) => ({
                url: `${baseUrl}/docs/${doc.slug}`,
                lastModified: new Date(),
                changeFrequency: "weekly" as const,
                priority: 0.7,
            }));
        }
    } catch {
        // Fallback if docs directory reading fails
    }

    // 3. Blog Article Pages
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const posts = getAllBlogPosts();
        if (posts && posts.length > 0) {
            blogRoutes = posts.map((post) => ({
                url: `${baseUrl}/blog/${post.slug}`,
                lastModified: new Date(post.frontmatter.date || Date.now()),
                changeFrequency: "weekly" as const,
                priority: 0.8,
            }));
        }
    } catch {
        // Fallback if blog directory reading fails
    }

    // 4. Marketplace Plugin Detail Pages
    let pluginRoutes: MetadataRoute.Sitemap = [];
    try {
        const { plugins } = await getPublicMarketplacePlugins({ limit: 100 });
        if (plugins && plugins.length > 0) {
            pluginRoutes = plugins.map((plugin) => ({
                url: `${baseUrl}/marketplace/${plugin.slug}`,
                lastModified: new Date(plugin.updatedAt || plugin.createdAt || Date.now()),
                changeFrequency: "weekly" as const,
                priority: 0.7,
            }));
        }
    } catch {
        // Graceful fallback if backend is unreachable during sitemap generation
    }

    return [...staticRoutes, ...docRoutes, ...blogRoutes, ...pluginRoutes];
}
