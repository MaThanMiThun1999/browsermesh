"use client";

import { useState } from "react";
import {
    Target,
    Layers,
    Shield,
    Globe,
    Zap,
    FileText,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

export default function PluginOverview() {
    const [testimonialIdx, setTestimonialIdx] = useState(0);

    const testimonials = [
        {
            quote: "The Amazon scraper from DataMiner Labs is incredibly reliable and easy to integrate. Saved us weeks of development!",
            author: "Alex Johnson",
            role: "Data Engineer at MarketLens",
        },
        {
            quote: "Built-in stealth and anti-bot bypass works like magic. We extract 50,000+ daily product prices seamlessly.",
            author: "Sophia Martinez",
            role: "Head of Analytics at CommercePulse",
        },
        {
            quote: "Clean JSON schema output and fast pagination support make this plugin worth every single penny.",
            author: "David Chen",
            role: "Lead Developer at ScrapingHub",
        },
    ];

    return (
        <div className="flex flex-col gap-10">
            {/* About Section */}
            <div>
                <h3 className="text-white font-bold text-lg mb-3">About this plugin</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                    The Amazon Product Scraper allows you to extract product details from Amazon
                    listings, including title, price, ratings, reviews, seller information,
                    availability, images, and more. Data is returned in clean JSON format, ready to
                    use.
                </p>
            </div>

            {/* Key Features Grid */}
            <div>
                <h3 className="text-white font-bold text-lg mb-4">Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                        {
                            icon: <Target size={20} className="text-blue-400" />,
                            bg: "bg-blue-500/10 border-blue-500/20",
                            title: "Accurate Data",
                            desc: "Get accurate and up-to-date product information.",
                        },
                        {
                            icon: <Layers size={20} className="text-emerald-400" />,
                            bg: "bg-emerald-500/10 border-emerald-500/20",
                            title: "Pagination Support",
                            desc: "Automatically handles pagination for all results.",
                        },
                        {
                            icon: <Shield size={20} className="text-purple-400" />,
                            bg: "bg-purple-500/10 border-purple-500/20",
                            title: "Anti-Bot Bypass",
                            desc: "Built-in stealth mode to bypass Amazon protections.",
                        },
                        {
                            icon: <Globe size={20} className="text-orange-400" />,
                            bg: "bg-orange-500/10 border-orange-500/20",
                            title: "Multiple Markets",
                            desc: "Supports multiple Amazon marketplaces worldwide.",
                        },
                        {
                            icon: <Zap size={20} className="text-yellow-400" />,
                            bg: "bg-yellow-500/10 border-yellow-500/20",
                            title: "Fast & Reliable",
                            desc: "Optimized for speed and high success rate.",
                        },
                        {
                            icon: <FileText size={20} className="text-cyan-400" />,
                            bg: "bg-cyan-500/10 border-cyan-500/20",
                            title: "Export Ready",
                            desc: "Returns clean JSON data, easy to integrate.",
                        },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="bg-[#080517] border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-indigo-500/30 transition-all group"
                        >
                            <div
                                className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${feature.bg}`}
                            >
                                {feature.icon}
                            </div>
                            <h4 className="text-white font-bold text-sm group-hover:text-indigo-300 transition-colors">
                                {feature.title}
                            </h4>
                            <p className="text-slate-400 text-xs leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Description */}
            <div>
                <h3 className="text-white font-bold text-lg mb-3">Detailed Description</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    This scraper is designed for developers, analysts, and businesses who need to
                    collect Amazon product data at scale. It handles dynamic content, pagination,
                    and anti-bot mechanisms so you can focus on your data.
                </p>
                <ul className="flex flex-col gap-2 text-xs sm:text-sm text-slate-300">
                    {[
                        "Extract product details, pricing, ratings, reviews, seller info and more.",
                        "Supports search results, product pages & category listings.",
                        "Built with BrowserMesh stealth engine for maximum reliability.",
                        "Easy to integrate and customize for your needs.",
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                            <CheckCircle size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Use Cases */}
            <div>
                <h3 className="text-white font-bold text-sm mb-3 uppercase tracking-wider text-slate-400">
                    Use Cases
                </h3>
                <div className="flex flex-wrap gap-2">
                    {[
                        "Market Research",
                        "Price Monitoring",
                        "Product Analysis",
                        "Competitor Tracking",
                        "E-commerce Intelligence",
                    ].map((useCase) => (
                        <span
                            key={useCase}
                            className="bg-white/5 border border-white/10 text-slate-300 text-xs font-medium px-3.5 py-1.5 rounded-xl hover:border-indigo-500/40 transition-colors"
                        >
                            {useCase}
                        </span>
                    ))}
                </div>
            </div>

            {/* Testimonials Carousel Box */}
            <div className="bg-gradient-to-br from-[#0c0724] to-[#060314] border border-white/10 rounded-2xl p-6 sm:p-7 relative overflow-hidden">
                <h4 className="text-white font-bold text-sm mb-4">
                    Why developers love this plugin
                </h4>

                <div className="flex items-center justify-between gap-4">
                    <button
                        onClick={() =>
                            setTestimonialIdx((prev) =>
                                prev === 0 ? testimonials.length - 1 : prev - 1
                            )
                        }
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div className="flex-1 text-center px-4">
                        <p className="text-slate-200 text-sm sm:text-base italic leading-relaxed mb-3">
                            "{testimonials[testimonialIdx].quote}"
                        </p>
                        <p className="text-xs font-semibold text-indigo-300">
                            – {testimonials[testimonialIdx].author},{" "}
                            <span className="text-slate-400 font-normal">
                                {testimonials[testimonialIdx].role}
                            </span>
                        </p>
                    </div>

                    <button
                        onClick={() =>
                            setTestimonialIdx((prev) =>
                                prev === testimonials.length - 1 ? 0 : prev + 1
                            )
                        }
                        className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>

                {/* Dots */}
                <div className="flex justify-center items-center gap-1.5 mt-5">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setTestimonialIdx(idx)}
                            className={`h-1.5 rounded-full transition-all ${
                                testimonialIdx === idx ? "w-5 bg-indigo-500" : "w-1.5 bg-white/20"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
