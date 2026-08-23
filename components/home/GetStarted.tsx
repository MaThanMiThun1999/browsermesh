"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, Monitor, Terminal, Download, Copy } from "lucide-react";
import { FaAndroid } from "react-icons/fa6";
import { logoOnly } from "@/assets/images";
import { siteInfo } from "@/data/siteInfo";

export default function GetStarted() {
    const [active, setActive] = useState("Web Installation");
    const tabs = [
        { label: "Web Installation", icon: <Globe size={14} /> },
        { label: "Windows App", icon: <Monitor size={14} /> },
        { label: "Linux App", icon: <Terminal size={14} /> },
        { label: "Android App", icon: <FaAndroid size={14} /> },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-16">
            <div className="mb-10">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
                    Get Started in <span className="text-gradient">Minutes</span>
                </h2>
                <p className="text-slate-400 text-sm">
                    Install BrowserMesh on your platform of choice.
                </p>
            </div>

            <div className="grid grid-cols-2 md:flex gap-2 md:gap-2 mb-8">
                {tabs.map((t) => (
                    <button
                        key={t.label}
                        onClick={() => setActive(t.label)}
                        className={`w-full md:w-auto justify-center md:justify-start relative text-[12px] sm:text-[13px] font-semibold px-2 sm:px-5 py-2.5 rounded-xl flex items-center gap-1.5 sm:gap-2 transition-all ${
                            active === t.label
                                ? "bg-gradient-to-b from-white/[0.05] to-indigo-500/10 border border-white/10 text-white overflow-hidden shadow-[0_4px_20px_rgba(99,102,241,0.15)]"
                                : "border border-transparent text-slate-400 hover:text-white hover:bg-white/[0.02]"
                        }`}
                    >
                        {t.icon} <span className="whitespace-nowrap">{t.label}</span>
                        {active === t.label && (
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-[0_0_12px_rgba(124,58,237,0.8)]" />
                        )}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-5">
                {/* Combined Browser Mockup & Steps */}
                <div className="glass-framer rounded-2xl p-6 lg:col-span-2 grid md:grid-cols-2 gap-8 items-center h-full">
                    {active === "Web Installation" && (
                        <>
                            {/* Browser mockup (Left) */}
                            <div className="rounded-xl border border-indigo-500/20 flex flex-col bg-gradient-to-br from-[#130f2f] to-[#0a071d] shadow-2xl overflow-hidden relative w-full h-full min-h-[220px]">
                                <div className="bg-black/40 px-4 py-3 flex items-center justify-between border-b border-white/5">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                        https://www.browsermesh.com
                                    </span>
                                    <div className="w-3 h-3" />
                                </div>
                                <div className="p-6 flex flex-col items-center justify-center gap-6 flex-1 relative z-10">
                                    <Image
                                        src={logoOnly}
                                        alt={siteInfo.name}
                                        title={siteInfo.name}
                                        className="w-16 h-16 object-contain drop-shadow-[0_0_25px_rgba(99,102,241,0.8)]"
                                    />
                                    <button className="bg-[#4c1d95] hover:bg-[#5b21b6] border border-indigo-400/30 transition-all w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                                        <Download size={14} /> Install for Web
                                    </button>
                                </div>
                            </div>

                            {/* Steps (Right) */}
                            <div className="flex flex-col justify-center">
                                <ol className="space-y-6">
                                    {[
                                        "Open your browser and go to browsermesh.com",
                                        'Click "Install for Web"',
                                        "Add BrowserMesh to your browser",
                                        "Start scraping instantly",
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-center gap-4">
                                            <div className="w-7 h-7 rounded-full bg-[#0a0a1a] border border-indigo-500/30 text-indigo-300 text-[11px] font-bold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                                                {i + 1}
                                            </div>
                                            <span className="text-slate-300 text-[13px] leading-snug">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </>
                    )}

                    {active === "Windows App" && (
                        <>
                            <div className="rounded-xl border border-indigo-500/20 flex flex-col bg-gradient-to-br from-[#1a1442] to-[#0f0c29] shadow-2xl overflow-hidden relative w-full h-full min-h-[220px]">
                                <div className="bg-black/20 px-4 py-3 flex items-center justify-start gap-2 border-b border-white/5">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col items-center justify-center gap-6 flex-1 relative z-10">
                                    <Monitor
                                        size={48}
                                        className="text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                    />
                                    <button className="bg-indigo-600 hover:bg-indigo-500 transition-all border border-indigo-400/40 w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                                        <Download size={14} /> Download Windows App
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <ol className="space-y-6">
                                    {[
                                        "Download the installer for Windows",
                                        "Run the setup wizard",
                                        "Login to your BrowserMesh account",
                                        "Start desktop stealth scraping",
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-center gap-4">
                                            <div className="w-7 h-7 rounded-full bg-[#0a0a1a] border border-indigo-500/30 text-indigo-300 text-[11px] font-bold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                                                {i + 1}
                                            </div>
                                            <span className="text-slate-300 text-[13px] leading-snug">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </>
                    )}

                    {active === "Linux App" && (
                        <>
                            <div className="rounded-xl border border-indigo-500/20 flex flex-col bg-gradient-to-br from-[#1a1442] to-[#0f0c29] shadow-2xl overflow-hidden relative w-full h-full min-h-[220px]">
                                <div className="bg-black/20 px-4 py-3 flex items-center justify-start gap-2 border-b border-white/5">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#E95420]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                    </div>
                                </div>
                                <div className="p-6 flex flex-col items-center justify-center gap-6 flex-1 relative z-10">
                                    <Terminal
                                        size={48}
                                        className="text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                                    />
                                    <button className="bg-indigo-600 hover:bg-indigo-500 transition-all border border-indigo-400/40 w-full flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                                        <Download size={14} /> Download Linux App
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <ol className="space-y-6">
                                    {[
                                        "Download the Linux .AppImage or .deb",
                                        "Make the downloaded file executable",
                                        "Run the BrowserMesh application",
                                        "Start desktop stealth scraping",
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-center gap-4">
                                            <div className="w-7 h-7 rounded-full bg-[#0a0a1a] border border-indigo-500/30 text-indigo-300 text-[11px] font-bold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                                                {i + 1}
                                            </div>
                                            <span className="text-slate-300 text-[13px] leading-snug">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </>
                    )}

                    {active === "Android App" && (
                        <>
                            <div className="rounded-[2rem] border-[6px] border-slate-900 flex flex-col bg-gradient-to-br from-[#1a1442] to-[#0f0c29] shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative w-[200px] mx-auto h-[90%] my-auto min-h-[220px]">
                                <div className="bg-black/50 px-4 py-1.5 flex items-center justify-between border-b border-white/5">
                                    <span className="text-[10px] text-slate-300 font-medium">
                                        12:00
                                    </span>
                                    <div className="flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                        <div className="w-2.5 h-1.5 rounded-sm bg-slate-400" />
                                    </div>
                                </div>
                                <div className="p-4 flex flex-col items-center justify-center gap-6 flex-1 relative z-10">
                                    <FaAndroid
                                        size={48}
                                        className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]"
                                    />
                                    <button className="bg-indigo-600 hover:bg-indigo-500 transition-all border border-indigo-400/40 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-[11px] font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                                        <Download size={12} /> Download APK
                                    </button>
                                </div>
                                {/* Home Indicator */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <ol className="space-y-6">
                                    {[
                                        "Download the official Android APK",
                                        "Allow 'Unknown Sources' in settings",
                                        "Install the BrowserMesh app",
                                        "Contribute idle mobile bandwidth",
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-center gap-4">
                                            <div className="w-7 h-7 rounded-full bg-[#0a0a1a] border border-indigo-500/30 text-indigo-300 text-[11px] font-bold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                                                {i + 1}
                                            </div>
                                            <span className="text-slate-300 text-[13px] leading-snug">
                                                {step}
                                            </span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </>
                    )}
                </div>

                {/* CLI block */}
                <div className="glass-framer rounded-2xl p-5 flex flex-col h-full">
                    <h4 className="text-white font-semibold mb-4 text-[15px] px-1">
                        CLI Installation
                    </h4>
                    <div className="rounded-xl overflow-hidden border border-white/5 bg-[#0a0a1a] flex-1 flex flex-col mb-4">
                        <div className="bg-white/[0.02] px-4 py-3 flex items-center gap-1.5 border-b border-white/5">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                        </div>
                        <div className="p-4 font-mono text-[11px] leading-[1.8] flex gap-4">
                            {/* Line numbers */}
                            <div className="flex flex-col text-slate-700 select-none text-right font-medium">
                                <span>1</span>
                                <span>2</span>
                                <span>3</span>
                                <span>4</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-emerald-400"># Install via npm</span>
                                <span className="text-slate-300">npm install -g browsermesh</span>
                                <span className="text-emerald-400 mt-2"># Run BrowserMesh</span>
                                <span className="text-slate-300">browsermesh</span>
                            </div>
                        </div>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-500 transition-all border border-indigo-400/40 w-full py-2.5 rounded-lg text-[13px] text-white font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                        <Copy size={14} /> Copy Command
                    </button>
                </div>
            </div>
        </section>
    );
}
