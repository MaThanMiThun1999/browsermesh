"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { mathanmithunWorkingComputer } from "@/assets/images";
import { siteInfo } from "@/data/siteInfo";

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
    </svg>
);

export default function AboutFounderStory() {
    const checklist = [
        "Designing the architecture",
        "Writing the code",
        "Maintaining the platform",
        "Listening to the community",
    ];

    return (
        <div className="glass-framer rounded-3xl p-6 sm:p-10 relative z-10 mb-20 sm:mb-28 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Story Content */}
                <div className="lg:col-span-6 flex flex-col items-start text-left">
                    <span className="bg-purple-500/10 text-purple-300 border border-purple-500/25 text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        {siteInfo.author.role}
                    </span>

                    <h2 className="text-3xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight mb-6">
                        Hey, I&apos;m {siteInfo.author.name} 👋
                    </h2>

                    <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                        <p>
                            I built {siteInfo.name} because I was tired of slow, expensive, and
                            unreliable scraping solutions.
                        </p>
                        <p>
                            As a developer, I wanted a tool that is fast, cross-platform, stealthy,
                            and truly developer-friendly — so I built it myself.
                        </p>
                        <p>
                            Every feature, every line of code, every late night is dedicated to
                            making {siteInfo.name} the best scraping ecosystem for you.
                        </p>
                    </div>

                    {/* Checklist */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-8">
                        {checklist.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0 shadow-sm">
                                    <Check size={12} strokeWidth={3} />
                                </div>
                                <span className="text-xs sm:text-sm font-semibold text-slate-200">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Founder Social Links */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href={siteInfo.author.github}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md"
                        >
                            <SiGithub title="GitHub" aria-label="GitHub" size={16} /> GitHub (@
                            {siteInfo.author.alias})
                        </Link>
                        <Link
                            href={siteInfo.author.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-blue-600/10 border border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-600/20 text-blue-300 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md"
                        >
                            <LinkedinIcon size={16} /> LinkedIn
                        </Link>
                    </div>
                </div>

                {/* Right Workstation & Code Floating Card */}
                <div className="lg:col-span-6 relative flex items-center justify-center">
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                        {/* Background Developer Workstation Art */}
                        <div className="absolute inset-0 bg-[#060412] flex items-center justify-center">
                            <Image
                                src={mathanmithunWorkingComputer}
                                alt={`${siteInfo.author.name} Developer Workstation`}
                                title={`${siteInfo.author.name} Developer Workstation`}
                                width={1200}
                                height={900}
                                loading="lazy"
                                className="w-full h-full object-cover opacity-60"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#060412] via-transparent to-transparent" />
                        </div>

                        {/* Floating Syntax-Highlighted Code Card Overlay (Glassmorphism Effect) */}
                        <div className="absolute bottom-1.5 right-1.5 sm:bottom-4 sm:right-4 w-fit max-w-[80%] sm:max-w-[calc(100%-1.5rem)] bg-slate-950/70 border border-white/20 rounded-md sm:rounded-xl p-1.5 sm:p-3.5 shadow-[0_4px_20px_0_rgba(0,0,0,0.9)] backdrop-blur-md sm:backdrop-blur-xl font-mono text-[9px] sm:text-xs leading-[1.2] sm:leading-relaxed text-slate-200 group-hover:border-indigo-400/40 transition-colors duration-500">
                            <div className="text-slate-400 mb-0 sm:mb-0.5">
                                <span className="text-purple-400">const</span>{" "}
                                <span className="text-blue-400">developer</span> = &#123;
                            </div>
                            <div className="pl-1.5 sm:pl-3 space-y-0 sm:space-y-0.5">
                                <div>
                                    <span className="text-purple-300">name:</span>{" "}
                                    <span className="text-emerald-400">
                                        &quot;{siteInfo.author.name}&quot;
                                    </span>
                                    ,
                                </div>
                                <div>
                                    <span className="text-purple-300">alias:</span>{" "}
                                    <span className="text-cyan-300">
                                        &quot;{siteInfo.author.alias}&quot;
                                    </span>
                                    ,
                                </div>
                                <div>
                                    <span className="text-purple-300">building:</span>{" "}
                                    <span className="text-emerald-400">
                                        &quot;{siteInfo.name}&quot;
                                    </span>
                                    ,
                                </div>
                                <div>
                                    <span className="text-purple-300">mission:</span>{" "}
                                    <span className="text-emerald-400">
                                        &quot;Empower data extraction&quot;
                                    </span>
                                    ,
                                </div>
                                <div className="hidden sm:block">
                                    <span className="text-purple-300">coffeeIntake:</span>{" "}
                                    <span className="text-emerald-400">
                                        &quot;Unlimited ☕&quot;
                                    </span>
                                    ,
                                </div>
                                <div>
                                    <span className="text-purple-300">status:</span>{" "}
                                    <span className="text-amber-300">
                                        &quot;Always building&quot;
                                    </span>
                                </div>
                            </div>
                            <div className="text-slate-400 mt-0 sm:mt-0.5">&#125;;</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
