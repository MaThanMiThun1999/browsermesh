"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featureHeroImg } from "@/assets/images";

export default function FeaturesHero() {
    return (
        <div className="w-full relative z-10 mb-16 sm:mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                {/* Left Text Content */}
                <div className="lg:col-span-6 flex flex-col items-start text-left">
                    {/* Badge */}
                    <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        FEATURES
                    </span>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 drop-shadow-md">
                        Powerful by design. <br />
                        Built{" "}
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            for results.
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-400 text-base sm:text-lg max-w-lg leading-relaxed mb-8">
                        BrowserMesh gives you everything you need to extract data at scale with
                        stealth, speed, and complete control.
                    </p>

                    {/* CTA Button */}
                    <Link
                        href="/marketplace"
                        className="bg-gradient-to-r from-[#4c35e6] via-[#5b43f0] to-[#3b82f6] hover:from-[#5841f5] hover:to-[#60a5fa] text-white font-bold text-sm sm:text-base py-3.5 px-7 rounded-2xl flex items-center gap-2.5 shadow-[0_0_30px_rgba(76,53,230,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Explore the Platform <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Right 3D Hero Graphic */}
                <div className="lg:col-span-6 relative flex items-center justify-center">
                    <div className="relative w-full max-w-[540px] aspect-[4/3] group">
                        {/* Ambient Radial Glow */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-blue-600/30 blur-[80px] rounded-full pointer-events-none" />
                        <Image
                            src={featureHeroImg}
                            alt="BrowserMesh Features 3D Platform"
                            fill
                            className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 group-hover:scale-105"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
