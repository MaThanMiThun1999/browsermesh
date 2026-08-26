"use client";

import Link from "next/link";
import { BookOpen, LifeBuoy, ArrowUpRight, HelpCircle, Sparkles } from "lucide-react";

export default function PluginHelpCTA() {
    return (
        <div className="w-full bg-[#080517]/90 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-2xl flex flex-col gap-5 relative overflow-hidden group">
            {/* Multi-layered Neon Ambient Background Orbs */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-600/20 rounded-full blur-[90px] pointer-events-none group-hover:bg-indigo-500/25 transition-all duration-700" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-purple-600/15 rounded-full blur-[80px] pointer-events-none" />

            {/* Top Header Row with Title & 3D Glowing Glass Visual */}
            <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="flex flex-col gap-1.5 max-w-xs">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold px-3 py-0.5 rounded-full w-fit shadow-[0_0_12px_rgba(99,102,241,0.25)]">
                        <Sparkles size={12} className="text-indigo-400" />
                        <span>Support & Resources</span>
                    </div>

                    <h4 className="text-white font-extrabold text-xl sm:text-2xl tracking-tight leading-tight pt-0.5">
                        Need help getting started?
                    </h4>
                    <p className="text-slate-300/80 text-xs sm:text-sm leading-relaxed">
                        Explore our comprehensive guides or reach out directly to our engineering
                        support team.
                    </p>
                </div>

                {/* 3D Glowing Glass Help Icon Badge */}
                <div className="relative shrink-0 hidden sm:block">
                    <div className="absolute -inset-1.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-md opacity-40 group-hover:opacity-75 transition-all duration-500 pointer-events-none" />
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-900 p-[2px] shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                        <div className="w-full h-full bg-[#0a061c] rounded-[14px] sm:rounded-[18px] flex items-center justify-center backdrop-blur-md">
                            <HelpCircle
                                size={32}
                                className="text-indigo-300 drop-shadow-[0_0_15px_rgba(129,140,248,0.8)]"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom 2 Interactive Action Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10 pt-1">
                {/* Card 1: Documentation */}
                <Link
                    href="/docs"
                    className="bg-[#050312]/80 hover:bg-white/[0.07] border border-white/10 hover:border-indigo-500/40 rounded-xl sm:rounded-2xl p-3.5 flex flex-col justify-between gap-2.5 group/doc transition-all duration-300 hover:shadow-[0_0_20px_rgba(76,53,230,0.3)] cursor-pointer"
                >
                    <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover/doc:scale-110 transition-transform">
                            <BookOpen size={16} />
                        </div>
                        <ArrowUpRight
                            size={15}
                            className="text-slate-500 group-hover/doc:text-indigo-400 group-hover/doc:translate-x-0.5 group-hover/doc:-translate-y-0.5 transition-all"
                        />
                    </div>
                    <div>
                        <span className="text-white font-bold text-xs sm:text-sm block">
                            Documentation
                        </span>
                        <span className="text-slate-400 text-[11px] block mt-0.5">
                            Guides & API reference
                        </span>
                    </div>
                </Link>

                {/* Card 2: Technical Support */}
                <Link
                    href="/about"
                    className="bg-[#050312]/80 hover:bg-white/[0.07] border border-white/10 hover:border-purple-500/40 rounded-xl sm:rounded-2xl p-3.5 flex flex-col justify-between gap-2.5 group/sup transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] cursor-pointer"
                >
                    <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover/sup:scale-110 transition-transform">
                            <LifeBuoy size={16} />
                        </div>
                        <ArrowUpRight
                            size={15}
                            className="text-slate-500 group-hover/sup:text-purple-400 group-hover/sup:translate-x-0.5 group-hover/sup:-translate-y-0.5 transition-all"
                        />
                    </div>
                    <div>
                        <span className="text-white font-bold text-xs sm:text-sm block">
                            Contact Support
                        </span>
                        <span className="text-slate-400 text-[11px] block mt-0.5">
                            24/7 Engineer help
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
