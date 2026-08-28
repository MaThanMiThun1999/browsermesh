"use client";

import { Zap, ShieldCheck, Puzzle, MonitorSmartphone } from "lucide-react";

export default function AboutWhyBuilt() {
    const reasons = [
        {
            title: "Speed & Performance",
            description:
                "Blazing fast execution engine optimized for real-world heavy automation workloads.",
            icon: <Zap className="w-6 h-6 text-blue-400" />,
            bgColor: "bg-blue-500/10 border-blue-500/25",
        },
        {
            title: "Stealth by Design",
            description:
                "Advanced anti-detection techniques to bypass modern bot protections seamlessly.",
            icon: <ShieldCheck className="w-6 h-6 text-purple-400" />,
            bgColor: "bg-purple-500/10 border-purple-500/25",
        },
        {
            title: "Extensible & Open",
            description:
                "Plugin-driven architecture so you can build, extend, and monetize without limits.",
            icon: <Puzzle className="w-6 h-6 text-indigo-400" />,
            bgColor: "bg-indigo-500/10 border-indigo-500/25",
        },
        {
            title: "Cross-Platform",
            description:
                "Run on Web, Desktop (Windows, Linux), and Android — same power everywhere.",
            icon: <MonitorSmartphone className="w-6 h-6 text-pink-400" />,
            bgColor: "bg-pink-500/10 border-pink-500/25",
        },
    ];

    return (
        <div className="mb-20 sm:mb-28 relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
                <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    WHY BROWSERMESH
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                    Why I built BrowserMesh
                </h2>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {reasons.map((item, idx) => (
                    <div
                        key={idx}
                        className="glass-framer rounded-3xl p-6 sm:p-8 flex flex-col items-center text-center justify-between group hover:border-white/25 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300"
                    >
                        <div className="flex flex-col items-center">
                            {/* Icon Tile */}
                            <div
                                className={`w-14 h-14 rounded-2xl border ${item.bgColor} flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300`}
                            >
                                {item.icon}
                            </div>

                            {/* Title & Subtext */}
                            <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
