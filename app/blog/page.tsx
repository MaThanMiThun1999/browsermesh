import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts } from "@/utils/blog";
import { constructMetadata } from "@/lib/seo";
import { Calendar, Clock, ArrowRight, Sparkles, BookOpen } from "lucide-react";

export const metadata: Metadata = constructMetadata({
    title: "Stealth Web Scraping, Anti-Bot Evasion & AI Data Blog | BrowserMesh",
    description:
        "In-depth guides on bypassing Cloudflare Turnstile, DataDome, TLS JA4 fingerprinting, residential browser nodes, and AI web data extraction.",
    path: "/blog",
});

export default function BlogIndexPage() {
    const posts = getAllBlogPosts();
    const featuredPost = posts[0];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Hero */}
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    Engineering & Security Insights
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
                    Stealth Web Scraping & Anti-Bot Architecture
                </h1>
                <p className="text-base sm:text-lg text-slate-400">
                    Master modern web data extraction with reverse-engineered guides on bypassing Cloudflare Turnstile, TLS JA4 fingerprint evasion, and decentralized residential node networks.
                </p>
            </div>

            {/* Featured Hero Article */}
            {featuredPost && (
                <div className="mb-14 sm:mb-20">
                    <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="group block relative rounded-3xl overflow-hidden glass-strong border border-indigo-500/30 hover:border-indigo-500/60 transition-all duration-500 glow-blue p-6 sm:p-10 lg:p-12"
                    >
                        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-all duration-500" />

                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                                {featuredPost.frontmatter.category || "Featured Guide"}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-slate-400">
                                <Calendar className="w-3.5 h-3.5" />
                                {featuredPost.frontmatter.date}
                            </span>
                            <span className="flex items-center gap-1.5 text-xs text-slate-400">
                                <Clock className="w-3.5 h-3.5" />
                                {featuredPost.frontmatter.readTime || "6 min read"}
                            </span>
                        </div>

                        <h2 className="text-2xl sm:text-4xl font-extrabold text-white group-hover:text-indigo-300 transition-colors duration-300 mb-4 tracking-tight">
                            {featuredPost.frontmatter.title}
                        </h2>

                        <p className="text-sm sm:text-base text-slate-300 mb-6 line-clamp-3 max-w-4xl leading-relaxed">
                            {featuredPost.frontmatter.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                                    BM
                                </div>
                                <span className="text-xs sm:text-sm font-medium text-slate-300">
                                    {featuredPost.frontmatter.author || "BrowserMesh Team"}
                                </span>
                            </div>

                            <span className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 group-hover:translate-x-1 transition-all duration-300">
                                Read Full Guide <ArrowRight className="w-4 h-4" />
                            </span>
                        </div>
                    </Link>
                </div>
            )}

            {/* Articles Grid */}
            <div className="mb-16">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                    <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-indigo-400" />
                        All Articles & Tutorials
                    </h3>
                    <span className="text-xs sm:text-sm text-slate-400">
                        {posts.length} {posts.length === 1 ? "article" : "articles"} published
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {posts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="group flex flex-col justify-between rounded-2xl glass p-6 border border-slate-800/80 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-xs font-medium border border-purple-500/20">
                                        {post.frontmatter.category || "Guide"}
                                    </span>
                                    <span className="text-xs text-slate-400 flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {post.frontmatter.readTime || "5 min"}
                                    </span>
                                </div>

                                <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors duration-200 mb-2 leading-snug">
                                    {post.frontmatter.title}
                                </h4>

                                <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                                    {post.frontmatter.description}
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                                <span>{post.frontmatter.date}</span>
                                <span className="text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-200">
                                    Read <ArrowRight className="w-3.5 h-3.5" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Newsletter & Bottom CTA Banner */}
            <div className="rounded-3xl glass-strong border border-indigo-500/30 p-8 sm:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent pointer-events-none" />
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 relative z-10">
                    Ready to Scrape Without Getting Blocked?
                </h3>
                <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-6 relative z-10">
                    Deploy your first stealth web scraping node in 60 seconds with 500 free monthly results. No credit card required.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
                    <Link
                        href="/marketplace"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 transition-all duration-200"
                    >
                        Browse 250+ Scraper Plugins
                    </Link>
                    <Link
                        href="/pricing"
                        className="px-6 py-3 rounded-xl glass border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-sm transition-all duration-200"
                    >
                        View Pricing Plans
                    </Link>
                </div>
            </div>
        </div>
    );
}
