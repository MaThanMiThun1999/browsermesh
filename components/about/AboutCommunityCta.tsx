"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { siteInfo } from "@/data/siteInfo";

export default function AboutCommunityCta() {
    return (
        <div className="glass-framer rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-4 text-center md:text-left">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0 shadow-md">
                    <Heart className="w-6 h-6 fill-purple-400" />
                </div>
                <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1">
                        Built with passion. Open for everyone.
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm">
                        {siteInfo.name} is evolving every day, and community feedback shapes
                        everything built.
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full md:w-auto shrink-0">
                <Link
                    href={siteInfo.links.discord}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto bg-gradient-to-r from-[#4c35e6] via-[#5b43f0] to-[#3b82f6] hover:from-[#5841f5] hover:to-[#60a5fa] text-white font-bold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center transition-all shadow-md hover:shadow-[0_0_20px_rgba(76,53,230,0.35)] hover:scale-[1.01] active:scale-[0.99] whitespace-nowrap"
                >
                    Join Our Community
                </Link>
                <Link
                    href={`mailto:${siteInfo.contact.email}`}
                    className="w-full sm:w-auto bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white font-bold text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all whitespace-nowrap"
                >
                    Give Feedback
                </Link>
            </div>
        </div>
    );
}
