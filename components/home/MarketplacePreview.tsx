"use client";

import { useState } from "react";
import { Star, TrendingUp, Sparkles, CheckCircle, FlameIcon, X, Download, Code2, ChevronRight } from "lucide-react";
import { FaGoogle, FaAmazon, FaInstagram, FaLinkedin } from "react-icons/fa6";

export default function MarketplacePreview() {
    const [activeTab, setActiveTab] = useState("Top Rated");
    const tabs = [
        { label: "Top Rated", icon: <Star size={13} /> },
        { label: "Trending", icon: <TrendingUp size={13} /> },
        { label: "New", icon: <Sparkles size={13} /> },
        { label: "Verified", icon: <CheckCircle size={13} /> },
    ];
    
    const plugins = [
        { brand: <FaGoogle size={22} className="text-blue-400" />, name: "Google Maps Scraper", rating: "4.9", reviews: "1.2k", badge: "Verified", bColor: "text-green-400", desc: "Extract business listings, reviews and more.", tags: ["#maps", "#business"], grad: "from-green-500/15 to-blue-500/15" },
        { brand: <FaAmazon size={22} className="text-orange-400" />, name: "Amazon Product Scraper", rating: "4.6", reviews: "982", badge: "Verified", bColor: "text-green-400", desc: "Get product data, prices, reviews and availability.", tags: ["#ecommerce", "#data"], grad: "from-orange-500/15 to-yellow-500/15" },
        { brand: <FaInstagram size={22} className="text-pink-400" />, name: "Instagram Scraper", rating: "4.7", reviews: "756", badge: "Community", bColor: "text-blue-400", desc: "Scrape profiles, posts, hashtags and followers.", tags: ["#social", "#media"], grad: "from-pink-500/15 to-purple-500/15" },
        { brand: <FaLinkedin size={22} className="text-sky-400" />, name: "LinkedIn Scraper", rating: "4.8", reviews: "1.1k", badge: "Verified", bColor: "text-green-400", desc: "Extract company data, employees and insights.", tags: ["#b2b", "#leads"], grad: "from-blue-500/15 to-cyan-500/15" },
    ];
    
    return (
        <section className="max-w-7xl mx-auto px-6 py-8">
            <div className="bg-white/[0.02] border border-white/5 shadow-2xl rounded-3xl p-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-5 md:gap-4">
                    <div className="flex items-start md:items-center gap-4">
                        <div className="w-12 h-12 md:w-14 md:h-14 shrink-0 mt-1 md:mt-0 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center shadow-inner">
                            <span className="text-2xl md:text-3xl drop-shadow-[0_0_15px_rgba(249,115,22,0.4)]">🔥</span>
                        </div>
                        <div className="flex flex-col gap-2 md:gap-1">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
                                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-none">Marketplace</h2>
                                <div className="w-fit">
                                    <span className="text-[11px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full px-2.5 py-0.5 font-semibold tracking-wide whitespace-nowrap">200+ Active Plugins</span>
                                </div>
                            </div>
                            <p className="text-slate-400 text-sm leading-snug">Discover, install and run powerful scraping plugins.</p>
                        </div>
                    </div>
                    <button className="text-sm text-[#7c3aed] hover:text-indigo-400 flex items-center gap-1 font-medium transition-colors pl-16 md:pl-0">
                        View All Plugins <ChevronRight size={14} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {tabs.map((t) => (
                        <button key={t.label} onClick={() => setActiveTab(t.label)}
                            className={`shrink-0 text-xs font-medium px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all ${activeTab === t.label ? "bg-[#7c3aed] text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]" : "glass-framer text-slate-400 hover:text-white"}`}>
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>

                {/* Plugin cards */}
                <div className="flex gap-4 mb-6 overflow-x-auto pb-6 snap-x snap-mandatory [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-indigo-500/50 hover:[&::-webkit-scrollbar-thumb]:bg-indigo-500 [&::-webkit-scrollbar-thumb]:rounded-full transition-all">
                    {plugins.map((p) => (
                        <div key={p.name} className="snap-start w-[280px] md:w-[320px] shrink-0 glass-framer rounded-2xl p-5 card-hover flex flex-col transition-all duration-300 hover:bg-white/[0.03]">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center shadow-inner">{p.brand}</div>
                                <button className="w-6 h-6 rounded-md glass-framer flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"><X size={12} /></button>
                            </div>
                            <h3 className="text-white font-semibold text-[15px] mb-1.5 tracking-tight">{p.name}</h3>
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                                <span className="flex items-center gap-1 text-yellow-400 text-xs font-medium"><Star size={11} fill="currentColor" /> {p.rating}</span>
                                <span className="text-slate-500 text-xs">({p.reviews})</span>
                                <span className={`text-xs font-medium ${p.bColor} flex items-center gap-0.5`}><CheckCircle size={10} /> {p.badge}</span>
                            </div>
                            <p className="text-slate-400 text-[13px] leading-relaxed flex-1 mb-4">{p.desc}</p>
                            <div className="flex gap-2 mb-4 flex-wrap">
                                {p.tags.map((t) => <span key={t} className="text-xs font-medium text-slate-500">{t}</span>)}
                            </div>
                            <button className="btn-primary w-full py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5">
                                <Download size={14} /> Install Plugin
                            </button>
                        </div>
                    ))}
                </div>

                {/* Build your own */}
                <div className="glass-framer rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 mt-2">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
                            <Code2 size={20} className="text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-white text-[15px] font-semibold tracking-tight">Build Your Own Plugins</p>
                            <p className="text-slate-400 text-[13px] mt-0.5">Use our TypeScript PluginContract to create powerful scrapers.</p>
                        </div>
                    </div>
                    <button className="glass-framer hover:bg-white/5 border border-indigo-500/30 flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] text-indigo-300 font-semibold transition-all">
                        <Code2 size={16} /> View Developer Docs
                    </button>
                </div>
            </div>
        </section>
    );
}
