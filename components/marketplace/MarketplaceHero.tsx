import Image from "next/image";
import { Search, ShieldCheck, Download, Star, Target } from "lucide-react";
import { marketplaceHeroImg } from "@/assets/images";

export default function MarketplaceHero() {
    return (
        <div className="w-full relative overflow-hidden">
            {/* Full-Screen Ambient Background Glows */}
            <div className="absolute -top-32 right-0 w-[600px] sm:w-[900px] lg:w-[1100px] h-[600px] sm:h-[900px] lg:h-[1100px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-600/35 via-indigo-600/20 to-transparent blur-[130px] pointer-events-none z-0" />
            <div className="absolute top-1/3 -left-32 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/15 via-purple-600/10 to-transparent blur-[140px] pointer-events-none z-0" />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-8">
                    {/* Left Content */}
                    <div className="flex-1 w-full lg:w-[52%] relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="border border-indigo-500/40 bg-indigo-500/15 text-indigo-300 text-[10px] uppercase font-bold tracking-wider px-3.5 py-1 rounded-full mb-5 sm:mb-7 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                            Marketplace
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-bold text-white leading-[1.15] sm:leading-[1.1] tracking-tight mb-5 sm:mb-6 max-w-[600px]">
                            Powerful plugins.
                            <br />
                            Limitless{" "}
                            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">
                                possibilities.
                            </span>
                        </h1>

                        <p className="text-slate-400 text-sm sm:text-[15px] leading-relaxed mb-8 sm:mb-10 max-w-[540px]">
                            Explore a growing collection of community and official plugins built to
                            extract any data you need — fast, stealthy, and reliable.
                        </p>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 md:gap-8 mb-8 sm:mb-10 w-full">
                            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-0 bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0 rounded-xl">
                                <ShieldCheck className="text-blue-400 shrink-0" size={22} />
                                <div className="flex flex-col items-start">
                                    <span className="text-white font-bold text-base sm:text-lg leading-tight">
                                        250+
                                    </span>
                                    <span className="text-slate-500 text-[10px] sm:text-[11px] font-medium">
                                        Plugins
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-0 bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0 rounded-xl">
                                <Download className="text-cyan-400 shrink-0" size={22} />
                                <div className="flex flex-col items-start">
                                    <span className="text-white font-bold text-base sm:text-lg leading-tight">
                                        1.2M+
                                    </span>
                                    <span className="text-slate-500 text-[10px] sm:text-[11px] font-medium">
                                        Installations
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-0 bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0 rounded-xl">
                                <Star
                                    className="text-yellow-400 shrink-0"
                                    size={22}
                                    fill="currentColor"
                                />
                                <div className="flex flex-col items-start">
                                    <span className="text-white font-bold text-base sm:text-lg leading-tight">
                                        4.9★
                                    </span>
                                    <span className="text-slate-500 text-[10px] sm:text-[11px] font-medium">
                                        Avg. Rating
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 sm:gap-3 p-3 sm:p-0 bg-white/[0.02] sm:bg-transparent border border-white/5 sm:border-0 rounded-xl">
                                <Target className="text-purple-400 shrink-0" size={22} />
                                <div className="flex flex-col items-start">
                                    <span className="text-white font-bold text-base sm:text-lg leading-tight">
                                        99.99%
                                    </span>
                                    <span className="text-slate-500 text-[10px] sm:text-[11px] font-medium">
                                        Success Rate
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="w-full max-w-[540px] relative mb-5 sm:mb-6">
                            <div className="absolute inset-y-0 left-3.5 sm:left-4 flex items-center pointer-events-none">
                                <Search className="text-slate-500" size={16} />
                            </div>
                            <input
                                type="text"
                                placeholder='Search plugins, e.g. "Google Maps"'
                                className="w-full bg-[#0a0515]/90 backdrop-blur-xl border border-white/10 rounded-xl sm:rounded-2xl py-3.5 sm:py-4 pl-10 sm:pl-12 pr-24 sm:pr-32 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:bg-[#0e0720] transition-colors shadow-inner"
                            />
                            <div className="absolute inset-y-1.5 right-1.5 sm:inset-y-2 sm:right-2">
                                <button className="h-full bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold text-xs sm:text-sm px-4 sm:px-6 rounded-lg sm:rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.6)]">
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Popular Tags */}
                        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center lg:justify-start">
                            <span className="text-slate-500 text-xs font-medium mr-1">
                                Popular:
                            </span>
                            {["Google Maps", "Instagram", "Amazon", "LinkedIn", "Twitter/X"].map(
                                (tag) => (
                                    <button
                                        key={tag}
                                        className="text-[10px] sm:text-[11px] font-medium text-slate-400 bg-white/5 border border-white/5 rounded-full px-2.5 sm:px-3 py-1 hover:bg-white/10 hover:text-white transition-colors"
                                    >
                                        {tag}
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    {/* Right Hero 3D Graphic */}
                    <div className="flex-1 lg:w-[48%] w-full relative z-10 flex items-center justify-center mt-8 lg:mt-0">
                        {/* Direct Pedestal Glowing Base */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] lg:w-[600px] h-[300px] sm:h-[500px] lg:h-[600px] bg-gradient-to-tr from-purple-600/35 via-indigo-600/25 to-blue-500/20 blur-[100px] rounded-full pointer-events-none z-0" />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[65%] h-[40px] bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 rounded-full blur-[30px] opacity-70 pointer-events-none z-0" />

                        <Image
                            src={marketplaceHeroImg}
                            alt="Marketplace"
                            className="w-full max-w-[360px] sm:max-w-[520px] lg:max-w-[650px] xl:max-w-[700px] h-auto object-contain relative z-10 drop-shadow-[0_0_70px_rgba(124,58,237,0.45)] hover:drop-shadow-[0_0_100px_rgba(147,51,234,0.65)] transition-all duration-500"
                            priority
                        />
                    </div>
                </div>
            </section>

            {/* Smooth Bottom Edge Gradient Fade Mask */}
            <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-b from-transparent via-[#07071a]/80 to-[#07071a] pointer-events-none z-20" />
        </div>
    );
}
