import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getAllBlogPosts } from "@/utils/blog";
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer";
import { constructMetadata, generateTechArticleSchema, generateBreadcrumbSchema, SITE_URL } from "@/lib/seo";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
    const posts = getAllBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return constructMetadata({
            title: "Blog Article Not Found - BrowserMesh",
            description: "The requested web scraping tutorial or guide could not be found.",
            path: "/blog",
        });
    }

    const title = `${post.frontmatter.title} | BrowserMesh Blog`;
    const description = post.frontmatter.description;
    const path = `/blog/${post.slug}`;

    return constructMetadata({
        title,
        description,
        path,
        type: "article",
    });
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    const allPosts = getAllBlogPosts();

    if (!post) {
        notFound();
    }

    const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

    const techArticleSchema = generateTechArticleSchema({
        headline: post.frontmatter.title,
        description: post.frontmatter.description,
        url: `${SITE_URL}/blog/${post.slug}`,
        category: post.frontmatter.category || "Web Scraping",
        datePublished: post.frontmatter.date,
        dateModified: post.frontmatter.date,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", item: "/" },
        { name: "Blog", item: "/blog" },
        { name: post.frontmatter.title, item: `/blog/${post.slug}` },
    ]);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Embedded Structured Data: TechArticle & BreadcrumbList */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([techArticleSchema, breadcrumbSchema]),
                }}
            />

            {/* Back to Blog Link & Breadcrumb */}
            <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 text-xs sm:text-sm">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to all articles
                </Link>

                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                    <Link href="/" className="hover:text-slate-300">Home</Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-slate-300">Blog</Link>
                    <span>/</span>
                    <span className="text-slate-400 truncate max-w-[150px] sm:max-w-xs">{post.frontmatter.category}</span>
                </div>
            </div>

            {/* Article Header Card */}
            <header className="mb-8 sm:mb-12 p-6 sm:p-10 rounded-3xl glass-strong glow-blue relative overflow-hidden border border-indigo-500/30">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-transparent blur-2xl pointer-events-none" />

                <div className="flex flex-wrap items-center gap-3 mb-4 relative z-10">
                    <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                        {post.frontmatter.category}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.frontmatter.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        {post.frontmatter.readTime || "6 min read"}
                    </span>
                </div>

                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight relative z-10">
                    {post.frontmatter.title}
                </h1>

                <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed mb-6 relative z-10">
                    {post.frontmatter.description}
                </p>

                <div className="flex items-center gap-3 pt-6 border-t border-slate-800 relative z-10">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                        BM
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-white">
                            {post.frontmatter.author}
                        </div>
                        <div className="text-xs text-slate-400">
                            BrowserMesh Research & Stealth Security
                        </div>
                    </div>
                </div>
            </header>

            {/* Markdown Content Body */}
            <article className="glass p-6 sm:p-10 lg:p-12 rounded-3xl border border-slate-800/80 mb-12">
                <MarkdownRenderer content={post.content} />
            </article>

            {/* Navigation (Prev/Next Post) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
                {prevPost ? (
                    <Link
                        href={`/blog/${prevPost.slug}`}
                        className="group p-5 rounded-2xl glass border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
                    >
                        <span className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> Older Post
                        </span>
                        <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                            {prevPost.frontmatter.title}
                        </span>
                    </Link>
                ) : <div />}

                {nextPost ? (
                    <Link
                        href={`/blog/${nextPost.slug}`}
                        className="group p-5 rounded-2xl glass border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between text-right"
                    >
                        <span className="text-xs text-slate-400 flex items-center justify-end gap-1 mb-2">
                            Newer Post <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                        <span className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                            {nextPost.frontmatter.title}
                        </span>
                    </Link>
                ) : <div />}
            </div>

            {/* Conversion CTA Box */}
            <div className="rounded-3xl glass-strong border border-indigo-500/30 p-8 text-center relative overflow-hidden mb-16">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent pointer-events-none" />
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">
                    Bypass Anti-Bot Firewalls Today
                </h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto mb-6 relative z-10">
                    Start scraping with real residential and 4G/5G mobile nodes. Get 500 free monthly results.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
                    <Link
                        href="/marketplace"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs shadow-md shadow-indigo-500/20 transition-all"
                    >
                        Explore Marketplace Scrapers
                    </Link>
                    <Link
                        href="/docs"
                        className="px-5 py-2.5 rounded-xl glass border border-slate-700 hover:border-slate-500 text-slate-200 font-semibold text-xs transition-all"
                    >
                        Read Documentation
                    </Link>
                </div>
            </div>
        </div>
    );
}
