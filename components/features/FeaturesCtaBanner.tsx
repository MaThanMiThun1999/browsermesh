"use client";

import Link from "next/link";

export default function FeaturesCtaBanner() {
    return (
        <div className="bg-[#080517]/90 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl backdrop-blur-xl relative z-10">
            <div className="text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                    Ready to unlock the full power of BrowserMesh?
                </h3>
                <p className="text-slate-300 text-sm sm:text-base">
                    Start extracting smarter today.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto shrink-0">
                <Link
                    href="/download"
                    className="w-full sm:w-auto bg-gradient-to-r from-[#4c35e6] via-[#5b43f0] to-[#3b82f6] hover:from-[#5841f5] hover:to-[#60a5fa] text-white font-bold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center transition-all shadow-md hover:shadow-[0_0_20px_rgba(76,53,230,0.35)] hover:scale-[1.01] active:scale-[0.99] whitespace-nowrap"
                >
                    Get Started for Free
                </Link>
                <Link
                    href="/marketplace"
                    className="w-full sm:w-auto bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white font-bold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all whitespace-nowrap"
                >
                    Explore Marketplace
                </Link>
            </div>
        </div>
    );
}
