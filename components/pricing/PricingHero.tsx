"use client";

import { DollarSign, TrendingUp, Shield } from "lucide-react";

export default function PricingHero() {
    return (
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 relative z-10">
            {/* FLOATING 3D BACKGROUND ORBS (Aligned with Reference UI) */}
            {/* Left Floating Dollar Glass Orb */}
            <div className="hidden md:flex absolute -left-6 lg:-left-20 top-4 items-center justify-center group pointer-events-none">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-[#0d0728]/80 border border-purple-500/40 shadow-[0_0_40px_rgba(147,51,234,0.4)] backdrop-blur-xl flex items-center justify-center animate-bounce [animation-duration:7s]">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-transparent border border-indigo-400/30 flex items-center justify-center shadow-inner">
                        <DollarSign className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]" />
                    </div>
                </div>
            </div>

            {/* Right Top Floating Bar Chart Glass Tile */}
            <div className="hidden md:flex absolute right-10 lg:right-24 top-0 items-center justify-center pointer-events-none">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0d0728]/80 border border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.3)] backdrop-blur-xl flex items-center justify-center animate-pulse">
                    <TrendingUp className="w-6 h-6 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                </div>
            </div>

            {/* Right Bottom Floating Shield Glass Tile */}
            <div className="hidden md:flex absolute right-0 lg:right-8 top-20 sm:top-24 items-center justify-center pointer-events-none">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#0d0728]/80 border border-purple-500/40 shadow-[0_0_35px_rgba(168,85,247,0.35)] backdrop-blur-xl flex items-center justify-center animate-bounce [animation-duration:8s]">
                    <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-300 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                </div>
            </div>

            {/* Badge */}
            <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                PRICING
            </span>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4 drop-shadow-md">
                Simple, transparent pricing
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 text-sm sm:text-lg max-w-xl leading-relaxed">
                Scale your web automation with BrowserMesh. <br className="hidden sm:inline" />
                No hidden fees.
            </p>
        </div>
    );
}
