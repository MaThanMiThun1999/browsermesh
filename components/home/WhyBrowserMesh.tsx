import Image from "next/image";
import { MonitorSmartphone, Blocks } from "lucide-react";
import { siteInfo } from "@/data/siteInfo";
import { effect } from "@/assets/images";

export default function WhyBrowserMesh() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-10">
            <div className="glass-framer rounded-[24px] border border-white/5 bg-[#05050f] p-8 lg:p-10 relative overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                {/* Background effect image (Right side) */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-32 w-[600px] h-[600px] pointer-events-none z-0 opacity-80 mix-blend-screen">
                    <Image
                        src={effect}
                        alt={`${siteInfo.name} Effect`}
                        title={`${siteInfo.name} Effect`}
                        priority
                        className="w-full h-full object-contain object-left drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                    />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full lg:w-[80%] flex flex-col gap-6">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-white mb-1.5">
                            Why Use {siteInfo.name}?
                        </h2>
                        <p className="text-slate-400 text-[15px]">
                            More power. Less detection. Better data.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Card 1 */}
                        <div className="bg-[#03030a]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:bg-white/[0.02] transition-colors h-full">
                            <div className="mb-2 h-10 flex items-center justify-center">
                                <span className="text-[34px] leading-none font-black text-[#00d2ff] tracking-tight mt-1">
                                    99.9%
                                </span>
                            </div>
                            <div className="text-slate-200 font-semibold text-[13px] mb-1">
                                Success Rate
                            </div>
                            <div className="text-slate-500 text-[11px] font-medium">
                                Stealth, reliable scraping
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-[#03030a]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:bg-white/[0.02] transition-colors h-full">
                            <div className="mb-2 h-10 flex items-center justify-center">
                                <span className="text-[34px] leading-none font-black text-[#00d2ff] tracking-tight mt-1">
                                    10x
                                </span>
                            </div>
                            <div className="text-slate-200 font-semibold text-[13px] mb-1">
                                Faster
                            </div>
                            <div className="text-slate-500 text-[11px] font-medium">
                                Optimized engine
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-[#03030a]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:bg-white/[0.02] transition-colors h-full">
                            <div className="mb-2 h-10 flex items-center justify-center">
                                <MonitorSmartphone
                                    size={32}
                                    className="text-[#00d2ff] drop-shadow-[0_0_10px_rgba(0,210,255,0.4)] stroke-[1.5]"
                                />
                            </div>
                            <div className="text-slate-200 font-semibold text-[13px] mb-1">
                                Cross-Platform
                            </div>
                            <div className="text-slate-500 text-[11px] font-medium">
                                Web • Desktop • Mobile
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="bg-[#03030a]/60 backdrop-blur-md border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:bg-white/[0.02] transition-colors h-full">
                            <div className="mb-2 h-10 flex items-center justify-center">
                                <Blocks
                                    size={32}
                                    className="text-[#a855f7] drop-shadow-[0_0_10px_rgba(168,85,247,0.4)] stroke-[1.5]"
                                />
                            </div>
                            <div className="text-slate-200 font-semibold text-[13px] mb-1">
                                Plugin Ecosystem
                            </div>
                            <div className="text-slate-500 text-[11px] font-medium">
                                200+ ready-to-use tools
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
