"use client";

import Image from "next/image";
import { Zap, Cpu, Server, ShieldCheck } from "lucide-react";
import { featureAssets1 } from "@/assets/images";

export default function FeaturesPerformanceShowcase() {
    const points = [
        {
            title: "High performance execution engine",
            icon: <Zap className="w-4 h-4 text-purple-400" />,
        },
        {
            title: "Optimized resource handling",
            icon: <Cpu className="w-4 h-4 text-purple-400" />,
        },
        {
            title: "Auto-scaling job workers",
            icon: <Server className="w-4 h-4 text-purple-400" />,
        },
        {
            title: "Enterprise-grade reliability",
            icon: <ShieldCheck className="w-4 h-4 text-purple-400" />,
        },
    ];

    return (
        <div className="glass-framer rounded-3xl p-6 sm:p-10 relative z-10 mb-20 sm:mb-28 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Image Graphic Showcase (Clean native image inside glass card) */}
                <div className="lg:col-span-7 relative flex items-center justify-center">
                    <div className="relative w-full aspect-[4/3] group">
                        <Image
                            src={featureAssets1}
                            alt="Jobs Manager and 99.99% Success Rate Dashboard"
                            fill
                            className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:scale-102 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* Right Text Description */}
                <div className="lg:col-span-5 flex flex-col items-start text-left">
                    <span className="bg-purple-500/10 text-purple-300 border border-purple-500/25 text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        BUILT FOR PERFORMANCE
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                        Fast, reliable, and built to scale
                    </h2>

                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
                        BrowserMesh is engineered for heavy-duty automation. Execute thousands of
                        jobs with unmatched reliability.
                    </p>

                    <div className="flex flex-col gap-4 w-full">
                        {points.map((point, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3.5 bg-white/[0.03] border border-white/10 rounded-2xl p-4 transition-all hover:bg-white/[0.06] hover:border-purple-500/30"
                            >
                                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 shadow-md">
                                    {point.icon}
                                </div>
                                <span className="text-sm font-semibold text-white">
                                    {point.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
