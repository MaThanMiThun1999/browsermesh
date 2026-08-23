"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DocData } from "@/utils/markdown";
import { BookOpen, Layers, Terminal, Bot, Sparkles, FileText, ChevronRight } from "lucide-react";

const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case "introduction":
            return <BookOpen size={16} />;
        case "architecture":
            return <Layers size={16} />;
        case "installation":
            return <Terminal size={16} />;
        case "automation":
            return <Bot size={16} />;
        case "features":
            return <Sparkles size={16} />;
        default:
            return <FileText size={16} />;
    }
};

export function DocsSidebar({ docs }: { docs: DocData[] }) {
    const pathname = usePathname();

    const categories: Record<string, DocData[]> = {};
    docs.forEach((doc) => {
        const cat = doc.frontmatter.category || "General";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(doc);
    });

    return (
        <aside className="w-64 flex-shrink-0 hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20 border-r border-white/10">
            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-6 pt-4 scrollbar-none space-y-8">
                {Object.entries(categories).map(([category, items]) => (
                    <div key={category} className="space-y-3">
                        <div className="flex items-center gap-2 text-white/50 px-2">
                            {getCategoryIcon(category)}
                            <h4 className="text-xs font-bold uppercase tracking-widest mt-0.5">
                                {category}
                            </h4>
                        </div>
                        <ul className="space-y-0.5 border-l border-white/10 ml-4 pl-1">
                            {items.map((doc) => {
                                const href = `/docs/${doc.slug}`;
                                const isActive = pathname === href;
                                return (
                                    <li key={doc.slug}>
                                        <Link
                                            href={href}
                                            className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all relative ${
                                                isActive
                                                    ? "text-indigo-400 font-semibold bg-indigo-500/10"
                                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                            }`}
                                        >
                                            {isActive && (
                                                <div className="absolute -left-[5px] top-1/2 -translate-y-1/2 w-[2px] h-6 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                                            )}
                                            <span className="truncate pr-2">
                                                {doc.frontmatter.title}
                                            </span>
                                            {isActive && (
                                                <ChevronRight
                                                    size={14}
                                                    className="text-indigo-400/50"
                                                />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>
        </aside>
    );
}
