"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DocData } from "@/utils/markdown";
import {
    BookOpen,
    Layers,
    Terminal,
    Bot,
    Sparkles,
    FileText,
    ChevronRight,
    ChevronDown,
    Menu,
} from "lucide-react";

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
    const [mobileOpen, setMobileOpen] = useState(false);

    const categories: Record<string, DocData[]> = {};
    docs.forEach((doc) => {
        const cat = doc.frontmatter.category || "General";
        if (!categories[cat]) categories[cat] = [];
        categories[cat].push(doc);
    });

    const activeDoc = docs.find((doc) => pathname === `/docs/${doc.slug}`);

    const renderNavContent = () => (
        <div className="space-y-6">
            {Object.entries(categories).map(([category, items]) => (
                <div key={category} className="space-y-2.5">
                    <div className="flex items-center gap-2 text-white/60 px-2">
                        {getCategoryIcon(category)}
                        <span className="text-xs font-bold uppercase tracking-widest mt-0.5">
                            {category}
                        </span>
                    </div>
                    <ul className="space-y-0.5 border-l border-white/10 ml-3.5 pl-1.5">
                        {items.map((doc) => {
                            const href = `/docs/${doc.slug}`;
                            const isActive = pathname === href;
                            return (
                                <li key={doc.slug}>
                                    <Link
                                        href={href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`group flex items-center justify-between px-3 py-1.5 rounded-lg text-xs sm:text-sm transition-all relative ${
                                            isActive
                                                ? "text-indigo-400 font-semibold bg-indigo-500/10"
                                                : "text-slate-400 hover:text-white hover:bg-white/5"
                                        }`}
                                    >
                                        {isActive && (
                                            <div className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-[2px] h-5 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                                        )}
                                        <span className="truncate pr-2">
                                            {doc.frontmatter.title}
                                        </span>
                                        {isActive && (
                                            <ChevronRight
                                                size={13}
                                                className="text-indigo-400/70 shrink-0"
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );

    return (
        <>
            {/* Mobile Docs Collapsible Selector (Visible on mobile/tablet screens < md) */}
            <div className="w-full md:hidden mb-4">
                <button
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-[#090726] border border-indigo-500/30 text-slate-200 text-xs font-semibold shadow-lg cursor-pointer active:scale-[0.99] transition-all"
                >
                    <div className="flex items-center gap-2 truncate">
                        <Menu size={16} className="text-indigo-400 shrink-0" />
                        <span className="text-slate-400">Docs:</span>
                        <span className="text-white font-bold truncate">
                            {activeDoc?.frontmatter?.title || "Select Guide"}
                        </span>
                    </div>
                    <ChevronDown
                        size={16}
                        className={`text-indigo-400 transition-transform duration-200 shrink-0 ${
                            mobileOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {mobileOpen && (
                    <div
                        data-lenis-prevent="true"
                        data-lenis-prevent-touch="true"
                        className="mt-2 p-4 rounded-xl bg-[#07051a] border border-indigo-500/30 max-h-[55vh] overflow-y-auto overscroll-contain shadow-2xl scrollbar-thin scrollbar-thumb-indigo-500/40 scrollbar-track-white/5"
                    >
                        {renderNavContent()}
                    </div>
                )}
            </div>

            {/* Desktop Sticky Sidebar (Visible on >= md screens) */}
            <aside
                data-lenis-prevent="true"
                data-lenis-prevent-touch="true"
                className="w-64 flex-shrink-0 hidden md:flex flex-col h-[calc(100vh-140px)] sticky top-28 sm:top-32 border-r border-white/10 pr-3 z-20"
            >
                <nav
                    data-lenis-prevent="true"
                    data-lenis-prevent-touch="true"
                    className="flex-1 overflow-y-auto overscroll-contain py-2 pr-2 space-y-6 scrollbar-thin scrollbar-thumb-indigo-500/30 hover:scrollbar-thumb-indigo-500/50 scrollbar-track-transparent"
                >
                    {renderNavContent()}
                </nav>
            </aside>
        </>
    );
}
