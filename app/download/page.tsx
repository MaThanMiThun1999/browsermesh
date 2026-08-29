"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Terminal, Check, Copy, ArrowRight, ExternalLink } from "lucide-react";
import { FaWindows, FaLinux, FaAndroid, FaGlobe } from "react-icons/fa6";
import { getLatestReleases, LatestReleases } from "@/lib/api";

export default function DownloadPage() {
    const [releases, setReleases] = useState<LatestReleases | null>(null);
    const [copiedScript, setCopiedScript] = useState<string | null>(null);

    useEffect(() => {
        getLatestReleases().then(setReleases);
    }, []);

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedScript(id);
        setTimeout(() => setCopiedScript(null), 2000);
    };

    const platforms = [
        {
            id: "windows",
            name: "Windows Desktop App",
            os: "Windows 10 / 11 (64-bit)",
            tag: "GUI + Background Worker",
            icon: <FaWindows className="text-blue-400 text-3xl" />,
            badge: "RECOMMENDED",
            badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
            downloadUrl: releases?.downloads?.windows || "https://github.com/browsermesh/releases/releases/latest",
            version: releases?.version || "v1.4.0",
            filename: "BrowserMesh-Setup.exe",
            buttonLabel: "Download for Windows",
            specs: ["Integrated Headless Chromium", "Zero-config stealth proxy", "Visual Plugin Runner"],
        },
        {
            id: "android",
            name: "Android Mobile Node",
            os: "Android 9.0+ (ARM64 / ARMv7)",
            tag: "4G/5G Cellular Residential Node",
            icon: <FaAndroid className="text-indigo-400 text-3xl" />,
            badge: "4G/5G RESIDENTIAL",
            badgeColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
            downloadUrl: releases?.downloads?.androidApk || "https://github.com/browsermesh/releases/releases/latest",
            version: releases?.version || "v1.4.0",
            filename: "BrowserMesh-Node.apk",
            buttonLabel: "Download for Android",
            specs: ["$0 Mobile CGNAT IP Rotation", "Background battery-optimized worker", "1-Tap QR Account Pairing"],
        },
        {
            id: "linux",
            name: "Linux Desktop & CLI",
            os: "Ubuntu, Debian, Fedora, Arch (x64)",
            tag: "AppImage & Debian Package",
            icon: <FaLinux className="text-purple-400 text-3xl" />,
            badge: "SERVER READY",
            badgeColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
            downloadUrl: releases?.downloads?.linuxAppImage || releases?.downloads?.linuxDeb || "https://github.com/browsermesh/releases/releases/latest",
            version: releases?.version || "v1.4.0",
            filename: "BrowserMesh-linux-x64.AppImage",
            buttonLabel: "Download for Linux",
            specs: ["Systemd service integration", "Docker container support", "Ultra-low RAM footprint"],
        },
        {
            id: "web",
            name: "Cloud Web Console",
            os: "Any Modern Browser",
            tag: "No Installation Required",
            icon: <FaGlobe className="text-cyan-400 text-3xl" />,
            badge: "INSTANT ACCESS",
            badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
            downloadUrl: "https://app.browsermesh.com",
            version: "Cloud Live",
            filename: "Web Dashboard",
            buttonLabel: "Open Web Console",
            specs: ["Monitor distributed nodes", "Schedule scraping jobs", "Export CSV & JSON results"],
            isExternal: true,
        },
    ];

    const linuxCliScript = releases?.headlessCmd?.bash || "curl -fsSL https://get.browsermesh.com/linux.sh | bash";
    const windowsCliScript = releases?.headlessCmd?.powershell || "iwr -useb https://get.browsermesh.com/win.ps1 | iex";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "BrowserMesh Cross-Platform Scraper & Mobile Node",
        "operatingSystem": "Windows, Linux, Android, Web",
        "applicationCategory": "DeveloperApplication",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "128",
        },
    };

    return (
        <div className="w-full min-h-screen bg-[#07071a] text-slate-200 pb-24 pt-28 sm:pt-36 relative overflow-hidden">
            {/* Structured Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Ambient Background Glows */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent blur-[140px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest mb-4 inline-block shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        OFFICIAL DOWNLOAD CENTER
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                        Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">BrowserMesh</span> for Any Platform
                    </h1>
                    <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                        Choose your operating system below to start extracting data with stealth browser engines, automated anti-bot bypass, and 4G/5G mobile residential nodes.
                    </p>
                </div>

                {/* 4-Column Platform Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {platforms.map((p) => (
                        <div
                            key={p.id}
                            className="glass-framer rounded-3xl p-6 flex flex-col justify-between border border-white/10 hover:border-indigo-500/40 hover:shadow-[0_0_35px_rgba(99,102,241,0.2)] transition-all duration-300 group"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                                        {p.icon}
                                    </div>
                                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${p.badgeColor}`}>
                                        {p.badge}
                                    </span>
                                </div>

                                <h2 className="text-lg font-bold text-white mb-1">{p.name}</h2>
                                <div className="text-xs text-slate-400 mb-4">{p.os}</div>

                                <div className="space-y-2 mb-6 text-xs text-slate-300">
                                    {p.specs.map((spec, i) => (
                                        <div key={i} className="flex items-start gap-2">
                                            <Check size={14} className="text-indigo-400 shrink-0 mt-0.5" />
                                            <span>{spec}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                <div className="text-[11px] text-slate-400 mb-3 flex items-center justify-between">
                                    <span>Version: {p.version}</span>
                                    <span className="text-emerald-400 font-semibold">100% Free</span>
                                </div>
                                <a
                                    href={p.downloadUrl}
                                    target={p.isExternal ? "_blank" : undefined}
                                    rel="noreferrer"
                                    className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs py-3 px-3 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all whitespace-nowrap overflow-hidden text-ellipsis"
                                >
                                    {p.isExternal ? <ExternalLink size={14} className="shrink-0" /> : <Download size={14} className="shrink-0" />}
                                    <span className="truncate">{p.buttonLabel}</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Headless Terminal Scripts Section */}
                <div className="glass-framer rounded-3xl p-8 sm:p-10 border border-white/10 mb-16 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                    <div className="flex items-center gap-3 mb-6">
                        <Terminal className="text-indigo-400" size={24} />
                        <div>
                            <h2 className="text-xl font-bold text-white">One-Command Headless Server Setup</h2>
                            <p className="text-xs text-slate-400">Deploy background worker nodes on VPS (AWS, DigitalOcean, Hetzner) or local terminals.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Linux Bash */}
                        <div className="p-4 rounded-2xl bg-[#090b14] border border-white/5 font-mono text-xs">
                            <div className="text-slate-400 mb-2 flex items-center justify-between">
                                <span>🐧 Linux / Cloud VPS (Ubuntu / Debian / Arch):</span>
                                <button
                                    onClick={() => copyToClipboard(linuxCliScript, "linux")}
                                    className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-[11px]"
                                >
                                    {copiedScript === "linux" ? <Check size={12} /> : <Copy size={12} />}
                                    {copiedScript === "linux" ? "Copied!" : "Copy"}
                                </button>
                            </div>
                            <div className="p-3 bg-black/40 rounded-xl text-emerald-400 select-all overflow-x-auto">
                                {linuxCliScript}
                            </div>
                        </div>

                        {/* Windows PowerShell */}
                        <div className="p-4 rounded-2xl bg-[#090b14] border border-white/5 font-mono text-xs">
                            <div className="text-slate-400 mb-2 flex items-center justify-between">
                                <span>🪟 Windows Headless (PowerShell Admin):</span>
                                <button
                                    onClick={() => copyToClipboard(windowsCliScript, "windows")}
                                    className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 text-[11px]"
                                >
                                    {copiedScript === "windows" ? <Check size={12} /> : <Copy size={12} />}
                                    {copiedScript === "windows" ? "Copied!" : "Copy"}
                                </button>
                            </div>
                            <div className="p-3 bg-black/40 rounded-xl text-blue-300 select-all overflow-x-auto">
                                {windowsCliScript}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Getting Started Link */}
                <div className="text-center">
                    <p className="text-sm text-slate-400 mb-3">Need help with installation and linking nodes?</p>
                    <Link
                        href="/docs/getting-started"
                        className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-semibold text-sm transition-colors"
                    >
                        Read Step-by-Step Installation Documentation <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
