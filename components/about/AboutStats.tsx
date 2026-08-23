"use client";

import { Box, Download, Users, Zap, ShieldCheck } from "lucide-react";

export default function AboutStats() {
    const stats = [
        {
            value: "250+",
            label: "Plugins",
            icon: <Box className="w-5 h-5 text-indigo-400" />,
            bgColor: "bg-indigo-500/10 border-indigo-500/20",
        },
        {
            value: "1.2M+",
            label: "Installations",
            icon: <Download className="w-5 h-5 text-purple-400" />,
            bgColor: "bg-purple-500/10 border-purple-500/20",
        },
        {
            value: "10K+",
            label: "Developers",
            icon: <Users className="w-5 h-5 text-blue-400" />,
            bgColor: "bg-blue-500/10 border-blue-500/20",
        },
        {
            value: "500K+",
            label: "Jobs Executed",
            icon: <Zap className="w-5 h-5 text-amber-400" />,
            bgColor: "bg-amber-500/10 border-amber-500/20",
        },
        {
            value: "99.99%",
            label: "Uptime",
            icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
            bgColor: "bg-emerald-500/10 border-emerald-500/20",
        },
    ];

    return (
        <div className="glass-framer rounded-3xl p-4 sm:p-6 lg:p-8 mb-20 sm:mb-28 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5 items-center">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-3 sm:gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/[0.05] transition-all ${
                            idx === 4 ? "col-span-2 sm:col-span-1" : ""
                        }`}
                    >
                        <div
                            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl border ${stat.bgColor} flex items-center justify-center shrink-0 shadow-md`}
                        >
                            {stat.icon}
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-tight">
                                {stat.value}
                            </span>
                            <span className="text-slate-400 text-[11px] sm:text-xs font-medium truncate">
                                {stat.label}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
