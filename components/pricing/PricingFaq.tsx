"use client";

import { useState } from "react";
import { ChevronDown, CreditCard, Zap, Laptop, ShieldCheck, Layers } from "lucide-react";
import { generateFaqSchema } from "@/lib/seo";

export default function PricingFaq() {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        {
            id: 0,
            question: "Can I cancel anytime?",
            answer: "Yes, subscriptions can be canceled at any time directly from your billing dashboard with zero hassle or cancellation fees.",
            icon: <CreditCard className="w-5 h-5 text-indigo-400" />,
            bgColor: "bg-indigo-500/10 border-indigo-500/20",
        },
        {
            id: 1,
            question: "What happens when I hit my monthly result limit?",
            answer: "Your scraping jobs will pause until the next billing cycle resets, or you can purchase an instant result limit add-on directly in your account.",
            icon: <Zap className="w-5 h-5 text-purple-400" />,
            bgColor: "bg-purple-500/10 border-purple-500/20",
        },
        {
            id: 2,
            question: "How does the device limit work?",
            answer: "The Free plan allows you to run the local Android/Desktop node on 1 device. Pro lets you connect up to 3 devices to your account simultaneously for parallel scraping.",
            icon: <Laptop className="w-5 h-5 text-amber-400" />,
            bgColor: "bg-amber-500/10 border-amber-500/20",
        },
        {
            id: 3,
            question: "What scraping features are included in Free vs Pro?",
            answer: "The Free plan includes 500 monthly results, 1 active device node, free marketplace plugins, and JSON exports. The Pro plan ($15/mo) unlocks 10,000 monthly results, 3 active devices, Pro/Premium plugins, proxy support, scheduled jobs, 2 GB storage, and CSV/XLSX exports.",
            icon: <Layers className="w-5 h-5 text-cyan-400" />,
            bgColor: "bg-cyan-500/10 border-cyan-500/20",
        },
        {
            id: 4,
            question: "Can I use my own proxies with BrowserMesh?",
            answer: "BrowserMesh does not sell or provide proxies directly. However, the Pro plan includes custom Proxy Support, allowing you to easily configure your own HTTP/SOCKS5 proxies or residential proxy services for your scraping tasks.",
            icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
            bgColor: "bg-emerald-500/10 border-emerald-500/20",
        },
    ];

    const faqSchemaData = generateFaqSchema(
        faqs.map((f) => ({ question: f.question, answer: f.answer }))
    );

    return (
        <div className="bg-[#080517]/90 border border-white/10 rounded-3xl p-6 sm:p-9 shadow-2xl backdrop-blur-xl mb-16 sm:mb-20 relative z-10">
            {/* Embedded FAQPage JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
            />

            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">
                Frequently Asked Questions
            </h2>

            <div className="flex flex-col gap-4">
                {faqs.map((faq) => {
                    const isOpen = openFaq === faq.id;
                    return (
                        <div
                            key={faq.id}
                            className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                                isOpen
                                    ? "bg-[#090624]/95 border-indigo-500/40 shadow-[0_0_25px_rgba(99,102,241,0.15)]"
                                    : "bg-[#050312]/80 border-white/10 hover:border-white/20"
                            }`}
                        >
                            <button
                                onClick={() => toggleFaq(faq.id)}
                                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left hover:bg-white/[0.02] transition-colors cursor-pointer"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div
                                        className={`w-9 h-9 rounded-xl border ${faq.bgColor} flex items-center justify-center shrink-0 shadow-md transition-transform duration-300 ${
                                            isOpen
                                                ? "scale-105 shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                                                : ""
                                        }`}
                                    >
                                        {faq.icon}
                                    </div>
                                    <span className="text-sm sm:text-base font-bold text-white">
                                        {faq.question}
                                    </span>
                                </div>
                                <ChevronDown
                                    size={18}
                                    className={`text-slate-400 transition-transform duration-300 shrink-0 ${
                                        isOpen ? "rotate-180 text-indigo-400" : ""
                                    }`}
                                />
                            </button>

                            {/* Smooth Grid Row Height Expansion Animation */}
                            <div
                                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                                    isOpen
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                }`}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pl-16">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
