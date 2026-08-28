import Image from "next/image";
import { Check } from "lucide-react";
import { FaWindows, FaGlobe, FaLinux, FaAndroid } from "react-icons/fa6";
import { mobileMock } from "@/assets/images";
import { siteInfo } from "@/data/siteInfo";

export default function DownloadPlatforms() {
    return (
        <section className="max-w-7xl mx-auto px-3 sm:px-6 py-6 md:py-16 relative">
            <div className="glass-framer rounded-2xl sm:rounded-[24px] p-5 sm:p-8 lg:p-14 relative overflow-hidden flex flex-col lg:flex-row items-center gap-6 lg:gap-12 bg-[#05050f] border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                {/* Pixel-Perfect SVG Background Rings */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <svg
                        viewBox="0 0 1000 600"
                        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        {/* Huge intersecting orbit arc */}
                        <circle
                            cx="800"
                            cy="0"
                            r="450"
                            fill="none"
                            stroke="url(#arcGradient1)"
                            strokeWidth="1.5"
                            className="drop-shadow-[0_0_20px_rgba(99,102,241,0.6)]"
                        />
                        <circle
                            cx="900"
                            cy="100"
                            r="500"
                            fill="none"
                            stroke="url(#arcGradient2)"
                            strokeWidth="0.5"
                            className="drop-shadow-[0_0_10px_rgba(168,85,247,0.3)]"
                        />

                        <defs>
                            <linearGradient id="arcGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#6366f1" stopOpacity="1" />
                                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="arcGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {/* Soft ambient glows */}
                <div className="absolute -top-32 -right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none z-0" />
                <div className="absolute -bottom-32 -left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

                {/* Left Content */}
                <div className="lg:w-[35%] shrink-0 flex flex-col items-start relative z-10 pl-0 lg:pl-6">
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold tracking-[0.15em] text-[10px] mb-2 md:mb-5 uppercase">
                        Cross-Platform Supremacy
                    </span>

                    <h2 className="text-2xl sm:text-[40px] lg:text-[44px] font-black text-white leading-[1.1] tracking-tight mb-3 md:mb-5">
                        One Platform.
                        <br />
                        Every Device.
                    </h2>

                    <p className="text-slate-400/90 text-xs sm:text-[14px] leading-relaxed mb-5 md:mb-10 max-w-[360px]">
                        Run BrowserMesh on any device you prefer. Your settings, jobs, and data stay
                        in sync.
                    </p>

                    <ul className="space-y-2.5 sm:space-y-4 mb-6 md:mb-12">
                        {[
                            "Windows, macOS, Linux & Android",
                            "Seamless device sync & license roaming",
                            "Headless daemons and PRoot support",
                            "Same UI. Same power.",
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-2.5 sm:gap-3.5">
                                <div className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px] rounded-full border border-indigo-500/70 shadow-[0_0_10px_rgba(99,102,241,0.2)] flex items-center justify-center shrink-0">
                                    <Check
                                        size={10}
                                        className="text-indigo-400 stroke-[3] sm:w-[11px] sm:h-[11px]"
                                    />
                                </div>
                                <span className="text-slate-300 text-xs sm:text-[13px] font-medium tracking-wide">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="flex gap-2.5 sm:gap-3">
                        {[
                            {
                                icon: <FaGlobe className="w-5 h-5 sm:w-6 sm:h-6" />,
                                color: "text-indigo-400",
                            },
                            {
                                icon: <FaWindows className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />,
                                color: "text-[#00a4ef]",
                            },
                            {
                                icon: <FaLinux className="w-4.5 h-4.5 sm:w-5.5 sm:h-5.5" />,
                                color: "text-slate-300",
                            },
                            {
                                icon: <FaAndroid className="w-5 h-5 sm:w-6 sm:h-6" />,
                                color: "text-[#3ddc84]",
                            },
                        ].map((platform, i) => (
                            <button
                                key={i}
                                className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-black/40 border border-white/5 hover:bg-white/[0.04] hover:border-white/20 transition-all flex items-center justify-center shadow-lg group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                                <span
                                    className={`${platform.color} group-hover:scale-110 transition-transform duration-300 relative z-10 drop-shadow-md`}
                                >
                                    {platform.icon}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Image */}
                <div className="flex-1 relative z-10 w-full flex justify-center lg:justify-end mt-2 lg:mt-0">
                    <Image
                        src={mobileMock}
                        alt={`${siteInfo.name} cross-platform mockups`}
                        title={`${siteInfo.name} cross-platform mockups`}
                        className="w-full max-w-full h-auto object-contain object-right drop-shadow-[0_0_60px_rgba(99,102,241,0.15)] transform scale-[1.05] origin-right transition-transform duration-700 pointer-events-none select-none"
                        loading="lazy"
                        draggable={false}
                    />
                </div>
            </div>
        </section>
    );
}
