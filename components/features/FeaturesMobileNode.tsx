"use client";

import { Monitor, Cpu, Zap, ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import Link from "next/link";

export default function FeaturesMobileNode() {
    const highlights = [
        {
            title: "Real Consumer Residential ISPs",
            desc: "Route scraping traffic through authentic residential connections (Comcast, AT&T, Verizon, Spectrum). Anti-bot firewalls trust genuine consumer ASNs over datacenter proxies.",
        },
        {
            title: "$0 Proxy Bandwidth Markup",
            desc: "Instead of paying $15 to $30 per GB to proxy vendors like Bright Data or Oxylabs, your connected desktop and server nodes execute jobs with zero proxy bandwidth markup.",
        },
        {
            title: "1-Command Cross-Platform Daemon",
            desc: "Deploy lightweight headless nodes on Windows (PowerShell), Linux (Bash), or macOS in under 60 seconds with automated TLS fingerprint stealth.",
        },
    ];

    return (
        <div className="glass-framer rounded-2xl sm:rounded-3xl p-4 sm:p-10 relative z-10 mb-14 sm:mb-28 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 hover:border-indigo-500/30 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                {/* Left Content */}
                <div className="lg:col-span-6 flex flex-col items-start text-left">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-4 flex-wrap">
                        <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(99,102,241,0.2)] flex items-center gap-1.5">
                            <Cpu size={11} className="animate-pulse text-indigo-400" />
                            DECENTRALIZED RESIDENTIAL NODES
                        </span>
                        <span className="bg-white/5 text-slate-300 border border-white/10 text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                            Windows • Linux • macOS
                        </span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3 sm:mb-4">
                        Turn Any Machine into an <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Unbannable Residential Node</span>
                    </h2>

                    <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-4 sm:mb-6">
                        Why pay extortionate proxy bandwidth fees? Run the lightweight BrowserMesh headless daemon on your Windows workstation, Linux server, or macOS machine to harvest data through authentic residential connections.
                    </p>

                    <div className="space-y-2.5 sm:space-y-4 w-full mb-5 sm:mb-8">
                        {highlights.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 sm:gap-3.5 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-colors">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle2 size={14} className="text-indigo-400 sm:w-4 sm:h-4" />
                                </div>
                                <div>
                                    <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5">{item.title}</h3>
                                    <p className="text-[11px] sm:text-xs text-slate-400 leading-normal sm:leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
                        <Link
                            href="/download"
                            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.35)] transition-all hover:scale-105 w-full sm:w-auto"
                        >
                            <Monitor size={15} /> Download Node Daemon
                        </Link>
                        <Link
                            href="/blog/why-4g-mobile-ips-never-get-blocked"
                            className="text-xs sm:text-sm text-slate-300 hover:text-white font-medium flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors w-full sm:w-auto"
                        >
                            Read Node Architecture <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>

                {/* Right Interactive Mockup / Terminal */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                    {/* Simulated Node Terminal Card */}
                    <div className="rounded-xl sm:rounded-2xl bg-[#080914] border border-indigo-500/25 overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)] font-mono text-[10px] sm:text-xs">
                        <div className="bg-[#0e1122] px-3 py-2 sm:px-4 sm:py-3 border-b border-white/10 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                <span className="text-slate-400 text-[10px] sm:text-[11px] ml-1 sm:ml-2 flex items-center gap-1">
                                    <Terminal size={11} className="text-indigo-400 shrink-0" />
                                    <span className="hidden xs:inline sm:inline">node-win11-us-east.local</span>
                                    <span className="xs:hidden sm:hidden">node-win11.local</span>
                                </span>
                            </div>
                            <span className="text-[9px] sm:text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-sans font-semibold shrink-0 whitespace-nowrap">
                                ONLINE (RESIDENTIAL)
                            </span>
                        </div>

                        <div className="p-3 sm:p-5 space-y-2 sm:space-y-3 text-slate-300 leading-normal sm:leading-relaxed">
                            <div className="text-slate-500">$ browsermesh-headless --token=bm_live_***</div>
                            <div className="text-indigo-400 font-semibold">[INIT] BrowserMesh Headless Daemon v1.4.0 started.</div>
                            <div className="text-slate-300">
                                [OS] Operating System: <span className="text-cyan-300">Windows 11 / Linux (x86_64)</span>
                            </div>
                            <div className="text-slate-300">
                                [ISP] Residential WAN: <span className="text-indigo-300 font-bold">Comcast Cable (AS7922)</span>
                            </div>
                            <div className="text-slate-300">
                                [BOT-SCORE] Cloudflare Score: <span className="text-indigo-300 font-bold">99/100 (Clean Human)</span>
                            </div>
                            <div className="p-2.5 sm:p-3.5 rounded-lg sm:rounded-xl bg-white/[0.03] border border-white/5 space-y-1 sm:space-y-1.5 text-[10px] sm:text-[11px]">
                                <div className="text-slate-400 flex justify-between">
                                    <span>Active Jobs:</span> <span className="text-white font-bold">14 Scrapers</span>
                                </div>
                                <div className="text-slate-400 flex justify-between">
                                    <span>Bypass Rate:</span> <span className="text-indigo-300 font-bold">99.8% (0 Captchas)</span>
                                </div>
                                <div className="text-slate-400 flex justify-between">
                                    <span>Bandwidth Cost:</span> <span className="text-emerald-400 font-bold">$0.00 / GB</span>
                                </div>
                            </div>
                            <div className="text-indigo-400 flex items-center gap-1.5 text-[10px] sm:text-[11px]">
                                <Zap size={11} className="text-indigo-400 animate-pulse shrink-0" />
                                <span>Linked to Orchestrator via WebSocket.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
