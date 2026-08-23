"use client";

import Link from "next/link";
import { Rocket } from "lucide-react";

export default function PricingEnterpriseCTA() {
    return (
        <div className="bg-gradient-to-r from-[#0c0733] via-[#120a4a] to-[#1c084f] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(76,53,230,0.3)] relative z-10">
            <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                    <Rocket className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Need more power?</h3>
                    <p className="text-slate-300 text-xs sm:text-sm">
                        Contact us for custom enterprise plans with higher limits and dedicated
                        support.
                    </p>
                </div>
            </div>

            <Link
                href="/contact"
                className="bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 shrink-0 backdrop-blur-md transition-all whitespace-nowrap shadow-lg"
            >
                <Rocket size={15} /> Contact Sales
            </Link>
        </div>
    );
}
