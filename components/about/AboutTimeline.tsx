"use client";

import { Code2, Puzzle, Server, Globe } from "lucide-react";

export default function AboutTimeline() {
    const milestones = [
        {
            year: "Jun 2026",
            title: "Stealth Core Engine",
            description: "Built anti-detection fingerprinting & browser automation kernel.",
            icon: <Code2 className="w-6 h-6 text-indigo-400" />,
            glowColor: "shadow-[0_0_30px_rgba(99,102,241,0.4)] border-indigo-500/40 bg-[#090726]",
        },
        {
            year: "Jul 2026",
            title: "Plugin Marketplace",
            description: "Architected modular plugin engine & dynamic marketplace API.",
            icon: <Puzzle className="w-6 h-6 text-purple-400" />,
            glowColor: "shadow-[0_0_30px_rgba(168,85,247,0.4)] border-purple-500/40 bg-[#0c0729]",
        },
        {
            year: "Aug 2026",
            title: "Cloud Infrastructure",
            description: "Developed cloud backend, node sync, & license management.",
            icon: <Server className="w-6 h-6 text-blue-400" />,
            glowColor: "shadow-[0_0_30px_rgba(59,130,246,0.4)] border-blue-500/40 bg-[#060b2b]",
        },
        {
            year: "Late Aug 2026",
            title: "BrowserMesh Platform",
            description: "Launched web platform & automated headless node setup.",
            icon: <Globe className="w-6 h-6 text-emerald-400" />,
            glowColor: "shadow-[0_0_30px_rgba(16,185,129,0.4)] border-emerald-500/40 bg-[#041a22]",
        },
    ];

    return (
        <div className="glass-framer rounded-3xl p-6 sm:p-10 lg:p-14 mb-20 sm:mb-28 relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
                <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    THE JOURNEY
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    From idea to reality
                </h2>
            </div>

            {/* Horizontal Timeline Stepper Container */}
            <div className="relative max-w-5xl mx-auto">
                {/* Horizontal Gradient Line (Desktop) */}
                <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-emerald-500/40 z-0" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-6 relative z-10">
                    {milestones.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            {/* Icon Node Circle */}
                            <div
                                className={`w-14 h-14 rounded-full border ${item.glowColor} flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300`}
                            >
                                {item.icon}
                            </div>

                            {/* Milestone Title */}
                            <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">
                                {item.title}
                            </h3>

                            {/* Year */}
                            <span className="text-xs font-semibold text-slate-400 mb-3">
                                {item.year}
                            </span>

                            {/* Description */}
                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-[250px]">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
