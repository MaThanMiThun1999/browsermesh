"use client";

import { Smartphone, Signal, Zap, ArrowRight, CheckCircle2, Terminal } from "lucide-react";
import Link from "next/link";

export default function FeaturesMobileNode() {
    const highlights = [
        {
            title: "Carrier-Grade NAT (CGNAT)",
            desc: "Mobile carrier IPs are shared among thousands of real cellular devices simultaneously. Cloudflare, Akamai, and Datadome cannot block them without blocking legitimate mobile users.",
        },
        {
            title: "$0 Proxy Bill Markup",
            desc: "Instead of paying $15 to $40 per GB to proxy vendors like Bright Data or Oxylabs, your Android devices route scraping traffic using your existing mobile data plan at zero markup.",
        },
        {
            title: "Automated IP Rotation via Airplane Mode",
            desc: "Toggle airplane mode programmatically via ADB or our background service to get a brand-new pristine residential IP in under 3 seconds.",
        },
    ];

    return (
        <div className="glass-framer rounded-3xl p-6 sm:p-10 relative z-10 mb-20 sm:mb-28 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 hover:border-indigo-500/30 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                {/* Left Content */}
                <div className="lg:col-span-6 flex flex-col items-start text-left">
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(99,102,241,0.2)] flex items-center gap-1.5">
                            <Signal size={12} className="animate-pulse text-indigo-400" />
                            INDUSTRY FIRST
                        </span>
                        <span className="bg-white/5 text-slate-300 border border-white/10 text-[11px] font-semibold px-3 py-1 rounded-full">
                            4G / 5G Mobile Residential Nodes
                        </span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                        Turn Any Android Phone into an <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">Unbannable Residential Node</span>
                    </h2>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                        Why pay extortionate proxy bandwidth fees? Run the lightweight BrowserMesh Android APK or Headless Termux daemon on spare phones to harvest data through genuine mobile carrier pools (AT&T, Verizon, T-Mobile, Vodafone, Jio).
                    </p>

                    <div className="space-y-4 w-full mb-8">
                        {highlights.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-colors">
                                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle2 size={16} className="text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-0.5">{item.title}</h3>
                                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href="/download"
                            className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm py-3 px-6 rounded-2xl flex items-center gap-2 shadow-[0_0_25px_rgba(99,102,241,0.35)] transition-all hover:scale-105"
                        >
                            <Smartphone size={16} /> Download Android APK
                        </Link>
                        <Link
                            href="/blog/why-4g-mobile-ips-never-get-blocked"
                            className="text-sm text-slate-300 hover:text-white font-medium flex items-center gap-1.5 py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                        >
                            Read CGNAT Guide <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                {/* Right Interactive Mockup / Terminal */}
                <div className="lg:col-span-6 flex flex-col gap-4">
                    {/* Simulated Mobile Node Terminal Card */}
                    <div className="rounded-2xl bg-[#080914] border border-indigo-500/25 overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)] font-mono text-xs">
                        <div className="bg-[#0e1122] px-4 py-3 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                                <span className="text-slate-400 text-[11px] ml-2 flex items-center gap-1">
                                    <Terminal size={12} className="text-indigo-400" />
                                    node-android-5g-us-east.local
                                </span>
                            </div>
                            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-sans font-semibold">
                                STATUS: ONLINE (5G-NR)
                            </span>
                        </div>

                        <div className="p-5 space-y-3 text-slate-300 leading-relaxed overflow-x-auto">
                            <div className="text-slate-500">$ browsermesh-node --carrier=auto --stealth=max</div>
                            <div className="text-indigo-400 font-semibold">[INIT] BrowserMesh Android Headless Daemon v1.4.0 started.</div>
                            <div className="text-slate-300">
                                [CELL] Connected to Mobile Tower: <span className="text-cyan-300">T-Mobile US (eNB ID 38491)</span>
                            </div>
                            <div className="text-slate-300">
                                [IP] Cellular WAN: <span className="text-indigo-300 font-bold">172.56.21.84 (CGNAT Pool)</span>
                            </div>
                            <div className="text-slate-300">
                                [BOT-SCORE] Cloudflare Score: <span className="text-indigo-300 font-bold">99/100 (Clean Human Residential)</span>
                            </div>
                            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1.5 text-[11px]">
                                <div className="text-slate-400 flex justify-between">
                                    <span>Active Jobs Relayed:</span> <span className="text-white font-bold">14 Scrapers</span>
                                </div>
                                <div className="text-slate-400 flex justify-between">
                                    <span>Bypass Success Rate:</span> <span className="text-indigo-300 font-bold">99.8% (0 Captchas)</span>
                                </div>
                                <div className="text-slate-400 flex justify-between">
                                    <span>Bandwidth Cost to You:</span> <span className="text-emerald-400 font-bold">$0.00 / GB</span>
                                </div>
                            </div>
                            <div className="text-indigo-400 flex items-center gap-1.5 text-[11px]">
                                <Zap size={12} className="text-indigo-400 animate-pulse" />
                                Mesh peer linked to Central Orchestrator via encrypted WebSocket.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
