"use client";

import Image from "next/image";
import Link from "next/link";
import { Code, Terminal, BookOpen, Users, ArrowRight } from "lucide-react";
import { featureAssets2 } from "@/assets/images";

export default function FeaturesDeveloperShowcase() {
    const devPoints = [
        { title: "TypeScript Plugin SDK", icon: <Code size={16} className="text-blue-400" /> },
        { title: "REST & WebSocket APIs", icon: <Terminal size={16} className="text-blue-400" /> },
        { title: "Detailed Documentation", icon: <BookOpen size={16} className="text-blue-400" /> },
        {
            title: "Active Developer Community",
            icon: <Users size={16} className="text-blue-400" />,
        },
    ];

    return (
        <div className="glass-framer rounded-3xl p-6 sm:p-10 relative z-10 mb-20 sm:mb-28 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Text Description */}
                <div className="lg:col-span-5 flex flex-col items-start text-left order-2 lg:order-1">
                    <span className="bg-blue-500/10 text-blue-300 border border-blue-500/25 text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                        DEVELOPER FIRST
                    </span>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                        Build, extend, and automate without limits
                    </h2>

                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
                        Create custom plugins with our TypeScript SDK and powerful APIs. Full
                        control for developers.
                    </p>

                    <div className="flex flex-col gap-3.5 w-full mb-8">
                        {devPoints.map((point, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
                                    {point.icon}
                                </div>
                                <span className="text-sm font-semibold text-slate-200">
                                    {point.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Link
                        href="/docs/getting-started"
                        className="bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/30 text-white font-semibold text-sm py-3 px-6 rounded-2xl flex items-center gap-2 backdrop-blur-md transition-all shadow-lg"
                    >
                        Read Developer Docs <ArrowRight size={16} />
                    </Link>
                </div>

                {/* Right Image Code Showcase (Clean native image inside glass card) */}
                <div className="lg:col-span-7 relative flex items-center justify-center order-1 lg:order-2">
                    <div className="relative w-full aspect-[4/3] group">
                        <Image
                            src={featureAssets2}
                            alt="BrowserMesh TypeScript SDK Code Editor"
                            fill
                            className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:scale-102 transition-transform duration-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
