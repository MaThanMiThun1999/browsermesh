import Image from "next/image";
import KineticGrid from "@/components/ui/kinetic-grid";
import { Download, TerminalSquare, Target } from "lucide-react";
import { FaGlobe, FaWindows, FaAndroid, FaLinux } from "react-icons/fa6";
import { siteInfo } from "@/data/siteInfo";
import { heroImg } from "@/assets/images";

// Grid pattern replaced by KineticGrid

export default function Hero() {
    const platforms = [
        { icon: <FaGlobe size={20} className="text-indigo-500" />, line1: "Web", line2: "App" },
        { icon: <FaWindows size={20} className="text-indigo-500" />, line1: "Windows", line2: "App" },
        { icon: <FaAndroid size={20} className="text-indigo-500" />, line1: "Android", line2: "App" },
        { icon: <FaLinux size={20} className="text-indigo-500" />, line1: "Linux", line2: "App" },
    ];
    return (
        <KineticGrid className="!bg-mesh !bg-transparent relative overflow-hidden" globalColor="default">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl" />
            </div>

            <div className="w-full lg:min-h-screen flex items-center justify-center pt-32 lg:pt-40 pb-16">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative w-full">
                    {/* Left */}
                    <div>
                        <div className="inline-flex items-center gap-2 bg-indigo-950/40 border border-indigo-500/30 rounded-full px-4 py-1.5 mb-6">
                            <Target size={14} className="text-cyan-400" />
                            <span className="text-xs font-medium text-indigo-200 tracking-wide">Enterprise-Grade Stealth Scraping Platform</span>
                        </div>
                        <h1 className="text-[42px] leading-[1.1] md:text-5xl lg:text-6xl font-black lg:leading-[1.05] tracking-tight mb-6">
                            <span className="text-white">Extract Anything.</span><br />
                            <span className="text-white">Run Anywhere.</span><br />
                            <span className="text-gradient">Undetected.</span>
                        </h1>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
                            The ultimate cross-platform stealth scraping ecosystem powered by plugins, built for developers, and trusted by data professionals worldwide.
                        </p>
                        <div className="flex flex-wrap gap-4 mb-10">
                            <button className="btn-primary flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white text-sm">
                                <Download size={16} /> Download {siteInfo.name}
                            </button>
                            <button className="btn-outline  flex items-center  gap-2 px-6 py-3.5 rounded-xl font-semibold text-white text-sm">
                                <TerminalSquare size={16} /> Explore Marketplace
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-6 items-center">
                            {platforms.map((p, i) => (
                                <div key={i} className="flex items-center gap-2.5">
                                    {p.icon}
                                    <div className="flex flex-col">
                                        <span className="text-[11px] font-bold text-slate-200 leading-[1.2]">{p.line1}</span>
                                        <span className="text-[11px] font-bold text-slate-200 leading-[1.2]">{p.line2}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: hero image */}
                    <div className="flex justify-center lg:justify-end relative mt-8 lg:mt-0">
                        <Image
                            src={heroImg}
                            alt={`${siteInfo.name} cross-platform ecosystem`}
                            title={`${siteInfo.name} cross-platform ecosystem`}
                            className="relative w-full max-w-xl h-auto object-contain z-10"
                            style={{ filter: "drop-shadow(0 0 40px rgba(99,102,241,0.35))" }}
                            priority
                            loading="eager"
                        />
                    </div>
                </div>
            </div>
        </KineticGrid>
    );
}
