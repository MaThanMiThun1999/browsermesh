"use client";

import Link from "next/link";
import { ArrowRight, Code, Bot } from "lucide-react";
import {
    SiTypescript,
    SiNodedotjs,
    SiNextdotjs,
    SiReact,
    SiTailwindcss,
    SiPostgresql,
    SiSqlite,
} from "react-icons/si";

import { siteInfo } from "@/data/siteInfo";

export default function AboutTechStack() {
    const techStack = [
        {
            name: "TypeScript",
            icon: (
                <SiTypescript
                    title="TypeScript"
                    aria-label="TypeScript"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400"
                />
            ),
        },
        {
            name: "Node.js",
            icon: (
                <SiNodedotjs
                    title="Node.js"
                    aria-label="Node.js"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-400"
                />
            ),
        },
        {
            name: "Next.js",
            icon: (
                <SiNextdotjs
                    title="Next.js"
                    aria-label="Next.js"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                />
            ),
        },
        {
            name: "React",
            icon: (
                <SiReact
                    title="React"
                    aria-label="React"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-300"
                />
            ),
        },
        {
            name: "Playwright",
            icon: (
                <Bot
                    aria-label="Playwright"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400"
                />
            ),
        },
        {
            name: "Tailwind",
            icon: (
                <SiTailwindcss
                    title="Tailwind"
                    aria-label="Tailwind"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400"
                />
            ),
        },
        {
            name: "PostgreSQL",
            icon: (
                <SiPostgresql
                    title="PostgreSQL"
                    aria-label="PostgreSQL"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400"
                />
            ),
        },
        {
            name: "SQLite",
            icon: (
                <SiSqlite
                    title="SQLite"
                    aria-label="SQLite"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300"
                />
            ),
        },
    ];

    return (
        <div className="glass-framer rounded-3xl p-6 sm:p-10 relative z-10 mb-20 sm:mb-28 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Text Header */}
                <div className="lg:col-span-5 flex flex-col items-start text-left">
                    <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        BUILT WITH LOVE
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                        Tech Stack
                    </h2>

                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
                        Modern technologies powering BrowserMesh ecosystem.
                    </p>

                    <Link
                        href={siteInfo.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 text-white font-semibold text-sm py-3 px-6 rounded-2xl flex items-center gap-2 backdrop-blur-md transition-all shadow-lg"
                    >
                        <Code size={16} /> See Code on GitHub <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Right 4x2 Grid of Tech Tiles with Rich Glass Effect & Precise Text Fitting */}
                <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                    {techStack.map((tech, idx) => (
                        <div
                            key={idx}
                            className="glass-framer rounded-2xl px-3 sm:px-3.5 py-3.5 flex items-center gap-2.5 shadow-md hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:scale-[1.03] transition-all duration-300 group min-w-0"
                        >
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-indigo-500/40 transition-colors">
                                {tech.icon}
                            </div>
                            <span className="text-xs sm:text-[13px] font-bold text-white tracking-tight whitespace-nowrap truncate">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
