"use client";

import { Download, BookOpen, Globe, Flag, Mail, ExternalLink, Star } from "lucide-react";
import { FaWindows, FaApple, FaAndroid, FaGlobe } from "react-icons/fa";

export default function PluginSidebar() {
    return (
        <div className="flex flex-col gap-6">
            {/* 1. Install & Use Box */}
            <div className="bg-[#080517]/90 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
                <h3 className="text-white font-bold text-base">Install & Use</h3>

                <div className="flex flex-col gap-3 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Current Version</span>
                        <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold px-2.5 py-0.5 rounded-md font-mono">
                            v1.2.4
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Released</span>
                        <span className="text-white font-medium">2 days ago</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Plugin Size</span>
                        <span className="text-white font-medium">512 KB</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                        <span className="text-slate-400">Min. BrowserMesh Version</span>
                        <span className="bg-white/5 border border-white/10 text-slate-300 px-2 py-0.5 rounded-md font-mono">
                            v2.3.0
                        </span>
                    </div>
                </div>

                <button className="w-full bg-[#4c35e6] hover:bg-[#5a46e8] text-white font-bold text-sm py-3 rounded-xl shadow-[0_0_20px_rgba(76,53,230,0.5)] transition-all flex items-center justify-center gap-2 mt-2">
                    <Download size={16} /> Install Plugin
                </button>
            </div>

            {/* 2. Compatibility Box */}
            <div className="bg-[#080517]/90 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
                <h3 className="text-white font-bold text-base">Compatibility</h3>

                <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col items-center gap-2">
                        <FaWindows size={20} className="text-blue-400" />
                        <span className="text-[11px] text-slate-400 font-medium">Windows</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col items-center gap-2">
                        <FaApple size={20} className="text-slate-200" />
                        <span className="text-[11px] text-slate-400 font-medium">macOS</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col items-center gap-2">
                        <FaAndroid size={20} className="text-green-400" />
                        <span className="text-[11px] text-slate-400 font-medium">Android</span>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 flex flex-col items-center gap-2">
                        <FaGlobe size={20} className="text-purple-400" />
                        <span className="text-[11px] text-slate-400 font-medium">Web</span>
                    </div>
                </div>
            </div>

            {/* 3. Links Box */}
            <div className="bg-[#080517]/90 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-3 text-xs">
                <h3 className="text-white font-bold text-base mb-1">Links</h3>

                <a
                    href="#"
                    className="flex items-center justify-between text-slate-300 hover:text-white py-2 border-b border-white/5 transition-colors group"
                >
                    <div className="flex items-center gap-2">
                        <BookOpen size={14} className="text-indigo-400" />
                        <span>Documentation</span>
                    </div>
                    <ExternalLink
                        size={13}
                        className="text-slate-500 group-hover:text-white transition-colors"
                    />
                </a>

                <a
                    href="#"
                    className="flex items-center justify-between text-slate-300 hover:text-white py-2 border-b border-white/5 transition-colors group"
                >
                    <div className="flex items-center gap-2">
                        <Globe size={14} className="text-indigo-400" />
                        <span>Developer Website</span>
                    </div>
                    <ExternalLink
                        size={13}
                        className="text-slate-500 group-hover:text-white transition-colors"
                    />
                </a>

                <a
                    href="#"
                    className="flex items-center justify-between text-slate-300 hover:text-rose-400 py-2 border-b border-white/5 transition-colors group"
                >
                    <div className="flex items-center gap-2">
                        <Flag size={14} className="text-rose-400" />
                        <span>Report Abuse</span>
                    </div>
                </a>

                <a
                    href="#"
                    className="flex items-center justify-between text-slate-300 hover:text-white py-1.5 transition-colors group"
                >
                    <div className="flex items-center gap-2">
                        <Mail size={14} className="text-indigo-400" />
                        <span>Support / Contact</span>
                    </div>
                </a>
            </div>

            {/* 4. More by DataMiner Labs Box */}
            <div className="bg-[#080517]/90 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
                <h3 className="text-white font-bold text-base">More by DataMiner Labs</h3>

                <div className="flex flex-col gap-3">
                    {[
                        {
                            name: "Flipkart Product Scraper",
                            rating: "4.7",
                            installs: "1.2M",
                            logoBg: "bg-yellow-400 text-blue-900 font-bold",
                            letter: "F",
                        },
                        {
                            name: "eBay Product Scraper",
                            rating: "4.6",
                            installs: "945K",
                            logoBg: "bg-white text-red-600 font-bold",
                            letter: "eBay",
                        },
                        {
                            name: "Walmart Product Scraper",
                            rating: "4.8",
                            installs: "890K",
                            logoBg: "bg-blue-600 text-yellow-400 font-bold",
                            letter: "W",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white/[0.02] border border-white/5 hover:border-white/15 rounded-xl p-3 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-9 h-9 rounded-lg ${item.logoBg} text-xs flex items-center justify-center shadow-md`}
                                >
                                    {item.letter}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white font-semibold text-xs truncate max-w-[140px]">
                                        {item.name}
                                    </span>
                                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                                        <span className="flex items-center gap-0.5 text-yellow-400">
                                            <Star size={10} fill="currentColor" /> {item.rating}
                                        </span>
                                        <span>•</span>
                                        <span>{item.installs}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-semibold py-2.5 rounded-xl transition-colors mt-1">
                    View all plugins
                </button>
            </div>
        </div>
    );
}
