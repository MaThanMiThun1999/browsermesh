"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Map } from "lucide-react";
import { aboutHeroImg } from "@/assets/images";

export default function AboutHero() {
    return (
        <div className="w-full relative z-10 mb-16 sm:mb-24">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
                {/* Left Text Content */}
                <div className="flex-1 w-full lg:w-[52%] relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                    {/* Badge */}
                    <div className="border border-indigo-500/40 bg-indigo-500/15 text-indigo-300 text-[10px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-full mb-5 sm:mb-7 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        ABOUT BROWSERMESH
                    </div>

                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.15] sm:leading-[1.1] tracking-tight mb-5 sm:mb-6 max-w-[620px]">
                        Built by a developer. <br />
                        For{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                            developers & dreamers.
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-4 max-w-[540px]">
                        BrowserMesh is a cross-platform stealth scraping ecosystem that helps you
                        extract data at scale with speed, reliability, and complete control.
                    </p>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-8 sm:mb-10 max-w-[540px] font-medium">
                        From a simple idea to a powerful platform — this journey is just getting
                        started.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                        <Link
                            href="/marketplace"
                            className="bg-gradient-to-r from-[#4c35e6] via-[#5b43f0] to-[#3b82f6] hover:from-[#5841f5] hover:to-[#60a5fa] text-white font-bold text-sm sm:text-base py-3.5 px-7 rounded-2xl flex items-center gap-2.5 shadow-[0_0_30px_rgba(76,53,230,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                        >
                            Explore the Platform <ArrowRight size={18} />
                        </Link>
                        <Link
                            href="/docs/how-it-works"
                            className="bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 text-white font-semibold text-sm sm:text-base py-3.5 px-6 rounded-2xl flex items-center gap-2 backdrop-blur-md transition-all shadow-lg"
                        >
                            <Map size={16} /> View Roadmap
                        </Link>
                    </div>
                </div>

                {/* Right 3D Hero Graphic */}
                <div className="flex-1 lg:w-[48%] w-full relative z-10 flex items-center justify-center mt-8 lg:mt-0">
                    {/* Glowing Pedestal Base */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[480px] lg:w-[560px] h-[300px] sm:h-[480px] lg:h-[560px] bg-gradient-to-tr from-purple-600/35 via-indigo-600/25 to-blue-500/20 blur-[100px] rounded-full pointer-events-none z-0" />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[65%] h-[40px] bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 rounded-full blur-[30px] opacity-70 pointer-events-none z-0" />

                    <Image
                        src={aboutHeroImg}
                        alt="BrowserMesh About Us 3D Globe"
                        title="BrowserMesh About Us 3D Globe"
                        loading="eager"
                        priority
                        className="w-full max-w-[340px] sm:max-w-[480px] lg:max-w-[600px] h-auto object-contain relative z-10 drop-shadow-[0_0_70px_rgba(124,58,237,0.45)] hover:drop-shadow-[0_0_100px_rgba(147,51,234,0.65)] transition-all duration-500"
                    />
                </div>
            </div>
        </div>
    );
}
