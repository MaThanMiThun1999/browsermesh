"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export function MarkdownRenderer({ content }: { content: string }) {
    return (
        <div className="prose prose-invert prose-indigo max-w-none prose-headings:font-bold prose-headings:text-indigo-50 prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-strong:text-white prose-code:bg-[#0a0726] prose-code:text-indigo-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-[#0a0726] prose-pre:border prose-pre:border-indigo-500/20 prose-pre:shadow-[0_0_15px_rgba(99,102,241,0.1)] prose-hr:border-indigo-500/20">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {content}
            </ReactMarkdown>
        </div>
    );
}
