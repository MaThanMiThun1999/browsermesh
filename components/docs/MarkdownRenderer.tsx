"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Copy, Check } from "lucide-react";

function PreBlock({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) {
    const [copied, setCopied] = useState(false);

    const extractText = (node: React.ReactNode): string => {
        if (typeof node === "string") return node;
        if (typeof node === "number") return String(node);
        if (Array.isArray(node)) return node.map(extractText).join("");
        if (node && typeof node === "object" && "props" in node) {
            return extractText((node as { props: { children?: React.ReactNode } }).props.children);
        }
        return "";
    };

    const rawCode = extractText(children).trim();

    const handleCopy = () => {
        if (!rawCode) return;
        if (typeof window !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(rawCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="my-3 sm:my-4 rounded-xl border border-indigo-500/20 bg-[#0a0726] shadow-[0_0_15px_rgba(99,102,241,0.1)] overflow-hidden">
            <div className="bg-white/[0.04] border-b border-white/10 px-3 sm:px-4 py-1.5 flex items-center justify-between">
                <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-indigo-300/70 uppercase tracking-wider">
                    Terminal / Command
                </span>
                <button
                    type="button"
                    onClick={handleCopy}
                    title="Copy command"
                    className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 px-2.5 py-1 rounded-md border border-white/10 transition-all cursor-pointer shadow-sm active:scale-95"
                >
                    {copied ? (
                        <>
                            <Check size={12} className="text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy size={12} />
                            <span>Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre
                className="px-4 py-3.5 sm:px-6 sm:py-5 overflow-x-auto text-xs sm:text-sm font-mono text-indigo-200 leading-relaxed"
                {...props}
            >
                {children}
            </pre>
        </div>
    );
}

export function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div className="prose prose-sm sm:prose-base prose-invert prose-indigo max-w-none prose-headings:font-bold prose-headings:text-indigo-50 prose-headings:tracking-tight prose-h1:text-xl sm:prose-h1:text-3xl prose-h1:my-3 sm:prose-h1:my-5 prose-h2:text-lg sm:prose-h2:text-2xl prose-h2:my-2.5 sm:prose-h2:my-4 prose-h3:text-base sm:prose-h3:text-xl prose-h3:my-2 sm:prose-h3:my-3 prose-p:text-xs sm:prose-p:text-sm prose-p:leading-relaxed prose-p:my-2 sm:prose-p:my-3 prose-p:text-slate-300 prose-ul:my-2 sm:prose-ul:my-3 prose-ul:pl-4 sm:prose-ul:pl-6 prose-ol:my-2 sm:prose-ol:my-3 prose-ol:pl-4 sm:prose-ol:pl-6 prose-li:text-xs sm:prose-li:text-sm prose-li:my-1 sm:prose-li:my-1.5 prose-li:text-slate-300 prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white prose-code:bg-[#0a0726] prose-code:text-indigo-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs sm:prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:m-0 prose-pre:p-0 prose-pre:bg-transparent prose-pre:border-none prose-hr:border-indigo-500/20 prose-hr:my-4 sm:prose-hr:my-6 prose-table:m-0">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ ...props }) => (
                        <h2
                            className="text-xl sm:text-3xl font-bold text-indigo-50 my-3 sm:my-5 tracking-tight"
                            {...props}
                        />
                    ),
                    pre: PreBlock,
                    table: ({ ...props }) => (
                        <div className="w-full overflow-x-auto my-4 rounded-xl border border-white/10 bg-[#0a0726]/70 shadow-lg [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-indigo-500/50 [&::-webkit-scrollbar-thumb]:rounded-full">
                            <table
                                className="w-full text-left border-collapse min-w-[500px] text-xs sm:text-sm"
                                {...props}
                            />
                        </div>
                    ),
                    thead: ({ ...props }) => (
                        <thead
                            className="bg-white/[0.06] border-b border-white/10 text-white font-bold"
                            {...props}
                        />
                    ),
                    th: ({ ...props }) => (
                        <th
                            className="px-3 py-2.5 sm:px-4 sm:py-3 font-semibold text-xs sm:text-sm text-indigo-200 border-b border-white/10 whitespace-nowrap"
                            {...props}
                        />
                    ),
                    td: ({ ...props }) => (
                        <td
                            className="px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-slate-300 border-b border-white/5 leading-relaxed align-top"
                            {...props}
                        />
                    ),
                    tr: ({ ...props }) => (
                        <tr
                            className="hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-b-0"
                            {...props}
                        />
                    ),
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
