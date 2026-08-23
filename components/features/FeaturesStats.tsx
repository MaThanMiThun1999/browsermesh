"use client";

import { Box, Puzzle, Users, Zap, ShieldCheck } from "lucide-react";

export default function FeaturesStats() {
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
            icon: <Puzzle className="w-5 h-5 text-purple-400" />,
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
        <div className="glass-framer rounded-3xl p-6 sm:p-8 mb-20 sm:mb-28 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-white/10">
                {stats.map((stat, idx) => (
                    <div
                        key={idx}
                        className={`flex items-center gap-3.5 ${
                            idx !== 0 ? "pt-4 md:pt-0 md:pl-6" : ""
                        }`}
                    >
                        <div
                            className={`w-11 h-11 rounded-2xl border ${stat.bgColor} flex items-center justify-center shrink-0 shadow-md`}
                        >
                            {stat.icon}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                                {stat.value}
                            </span>
                            <span className="text-slate-400 text-xs font-medium">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
