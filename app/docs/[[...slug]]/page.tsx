import { getDocBySlug, getAllDocs } from "@/utils/markdown";
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const docs = getAllDocs();
    return docs.map((doc) => ({
        slug: [doc.slug],
    }));
}

export default async function DocPage({ params }: { params: Promise<{ slug?: string[] }> }) {
    const slugArray = (await params).slug;
    // Default to 'getting-started' if no slug is provided
    const slug = slugArray ? slugArray.join("/") : "getting-started";

    const doc = getDocBySlug(slug);
    const allDocs = getAllDocs();

    if (!doc) {
        notFound();
    }

    // Find previous and next docs based on order
    const currentIndex = allDocs.findIndex((d) => d.slug === doc.slug);
    const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
    const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

    return (
        <article className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out pb-20">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6 font-medium">
                <span>Docs</span>
                <span>/</span>
                <span className="text-indigo-400">{doc.frontmatter.category || "General"}</span>
            </div>

            {/* Header */}
            <div className="mb-10 p-8 rounded-3xl glass-strong glow-blue relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4 relative z-10">
                    {doc.frontmatter.title}
                </h1>
                {doc.frontmatter.description && (
                    <p className="text-lg text-slate-300 leading-relaxed max-w-2xl relative z-10">
                        {doc.frontmatter.description}
                    </p>
                )}
            </div>

            <div className="w-full h-px bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-transparent mb-10" />

            <div className="glass p-6 sm:p-10 rounded-3xl">
                <MarkdownRenderer content={doc.content} />
            </div>

            {/* Pagination Links */}
            <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                {prevDoc ? (
                    <a
                        href={`/docs/${prevDoc.slug}`}
                        className="group flex flex-col gap-1 items-start p-4 pr-8 rounded-2xl glass-dark hover:border-indigo-500/50 transition-all w-full sm:w-1/2"
                    >
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Previous
                        </span>
                        <span className="text-indigo-400 group-hover:text-indigo-300 font-medium transition-colors">
                            ← {prevDoc.frontmatter.title}
                        </span>
                    </a>
                ) : (
                    <div className="w-full sm:w-1/2" />
                )}

                {nextDoc ? (
                    <a
                        href={`/docs/${nextDoc.slug}`}
                        className="group flex flex-col gap-1 items-end p-4 pl-8 rounded-2xl glass-dark hover:border-indigo-500/50 transition-all w-full sm:w-1/2 text-right"
                    >
                        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                            Next
                        </span>
                        <span className="text-indigo-400 group-hover:text-indigo-300 font-medium transition-colors">
                            {nextDoc.frontmatter.title} →
                        </span>
                    </a>
                ) : (
                    <div className="w-full sm:w-1/2" />
                )}
            </div>
        </article>
    );
}
