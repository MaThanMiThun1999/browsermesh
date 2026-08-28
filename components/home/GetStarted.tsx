"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Monitor, Terminal, Download, Copy, Check } from "lucide-react";
import { FaAndroid, FaLinux } from "react-icons/fa6";
import { logoOnly } from "@/assets/images";
import { siteInfo } from "@/data/siteInfo";
import { getLatestReleases, LatestReleases } from "@/lib/api";
import { useSettings } from "@/context/SettingsContext";

export default function GetStarted() {
    const { bashCommand } = useSettings();
    const [active, setActive] = useState("Web Installation");
    const [releases, setReleases] = useState<LatestReleases | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        getLatestReleases().then((res) => {
            if (res) {
                setReleases(res);
            }
        });
    }, []);

    const tabs = [
        { label: "Web Installation", icon: <Globe size={14} /> },
        { label: "Windows App", icon: <Monitor size={14} /> },
        { label: "Linux App", icon: <Terminal size={14} /> },
        { label: "Android App", icon: <FaAndroid size={14} /> },
    ];

    const cliCommand = releases?.headlessCmd?.bash || bashCommand;

    const handleCopy = () => {
        if (typeof window !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(cliCommand);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const windowsUrl =
        releases?.downloads?.windows ||
        "https://s3.browsermesh.in/releases/BrowserMesh-Setup-1.0.0.exe";
    const linuxAppImageUrl =
        releases?.downloads?.linuxAppImage ||
        "https://s3.browsermesh.in/releases/BrowserMesh-1.0.0.AppImage";
    const linuxDebUrl =
        releases?.downloads?.linuxDeb ||
        "https://s3.browsermesh.in/releases/browsermesh_1.0.0_amd64.deb";
    const androidUrl =
        releases?.downloads?.androidApk ||
        "https://s3.browsermesh.in/releases/BrowserMesh-v1.0.apk";

    return (
        <section className="max-w-7xl mx-auto px-3 sm:px-6 py-6 md:py-16">
            <div className="mb-4 md:mb-10 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 tracking-tight">
                        Get Started in <span className="text-gradient">Minutes</span>
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm">
                        Install BrowserMesh on your platform of choice.
                    </p>
                </div>
                {releases?.version && (
                    <span className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[11px] sm:text-xs font-mono px-2.5 py-1 rounded-full font-semibold">
                        Latest Release v{releases.version}
                    </span>
                )}
            </div>

            <div className="grid grid-cols-2 md:flex gap-1.5 sm:gap-2 mb-4 md:mb-8">
                {tabs.map((t) => (
                    <button
                        key={t.label}
                        onClick={() => setActive(t.label)}
                        className={`w-full md:w-auto justify-center md:justify-start relative text-[11px] sm:text-[13px] font-semibold px-2 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer ${
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

            <div className="grid lg:grid-cols-3 gap-3.5 sm:gap-5">
                {/* Combined Browser Mockup & Steps */}
                <div className="glass-framer rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:col-span-2 grid md:grid-cols-2 gap-4 sm:gap-8 items-center h-full">
                    {active === "Web Installation" && (
                        <>
                            {/* Browser mockup (Left) */}
                            <div className="rounded-xl border border-indigo-500/20 flex flex-col bg-gradient-to-br from-[#130f2f] to-[#0a071d] shadow-2xl overflow-hidden relative w-full h-full min-h-[180px] sm:min-h-[220px]">
                                <div className="bg-black/40 px-3.5 sm:px-4 py-2 sm:py-3 flex items-center justify-between border-b border-white/5">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-mono">
                                        {siteInfo.consoleUrl}
                                    </span>
                                    <div className="w-3 h-3" />
                                </div>
                                <div className="p-4 sm:p-6 flex flex-col items-center justify-center gap-4 sm:gap-6 flex-1 relative z-10">
                                    <Image
                                        src={logoOnly}
                                        alt={siteInfo.name}
                                        title={siteInfo.name}
                                        className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-[0_0_25px_rgba(99,102,241,0.8)]"
                                    />
                                    <Link
                                        href={siteInfo.links.console}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-[#4c1d95] hover:bg-[#5b21b6] border border-indigo-400/30 transition-all w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs font-bold text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                                    >
                                        <Globe size={14} /> Open Browser Console
                                    </Link>
                                </div>
                            </div>

                            {/* Steps (Right) */}
                            <div className="flex flex-col justify-center">
                                <ol className="space-y-3 sm:space-y-6">
                                    {[
                                        `Open browser console at ${siteInfo.consoleUrl}`,
                                        'Click "Connect Browser Node"',
                                        "Authenticate with your BrowserMesh account",
                                        "Start web stealth scraping instantly",
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0a0a1a] border border-indigo-500/30 text-indigo-300 text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                                                {i + 1}
                                            </div>
                                            <span className="text-slate-300 text-xs sm:text-[13px] leading-snug">
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
                            <div className="rounded-xl border border-indigo-500/20 flex flex-col bg-gradient-to-br from-[#1a1442] to-[#0f0c29] shadow-2xl overflow-hidden relative w-full h-full min-h-[180px] sm:min-h-[220px]">
                                <div className="bg-black/20 px-3.5 sm:px-4 py-2 sm:py-3 flex items-center justify-start gap-2 border-b border-white/5">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6 flex flex-col items-center justify-center gap-4 sm:gap-6 flex-1 relative z-10">
                                    <Monitor
                                        size={40}
                                        className="text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] sm:w-[48px] sm:h-[48px]"
                                    />
                                    <a
                                        href={windowsUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-indigo-600 hover:bg-indigo-500 transition-all border border-indigo-400/40 w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-xs font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                                    >
                                        <Download size={14} /> Download Windows App
                                    </a>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <ol className="space-y-3 sm:space-y-6">
                                    {[
                                        "Download BrowserMesh-Setup.exe installer",
                                        "Run the setup wizard & launch App",
                                        "Login to your BrowserMesh account",
                                        "Start desktop stealth scraping",
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0a0a1a] border border-indigo-500/30 text-indigo-300 text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                                                {i + 1}
                                            </div>
                                            <span className="text-slate-300 text-xs sm:text-[13px] leading-snug">
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
                            <div className="rounded-xl border border-indigo-500/20 flex flex-col bg-gradient-to-br from-[#1a1442] to-[#0f0c29] shadow-2xl overflow-hidden relative w-full h-full min-h-[180px] sm:min-h-[220px]">
                                <div className="bg-black/20 px-3.5 sm:px-4 py-2 sm:py-3 flex items-center justify-start gap-2 border-b border-white/5">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#E95420]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6 flex flex-col items-center justify-center gap-3 sm:gap-4 flex-1 relative z-10">
                                    <Terminal
                                        size={36}
                                        className="text-indigo-400 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] mb-1 sm:mb-2 sm:w-[44px] sm:h-[44px]"
                                    />
                                    <div className="flex flex-col gap-2 w-full">
                                        <a
                                            href={linuxAppImageUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-indigo-600 hover:bg-indigo-500 transition-all border border-indigo-400/40 w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold text-white shadow-[0_0_15px_rgba(79,70,229,0.3)]"
                                        >
                                            <Download size={13} /> Download .AppImage
                                        </a>
                                        <a
                                            href={linuxDebUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-white/10 hover:bg-white/20 transition-all border border-white/10 w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold text-slate-200"
                                        >
                                            <FaLinux size={13} /> Download .deb Package
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <ol className="space-y-3 sm:space-y-6">
                                    {[
                                        "Download .AppImage or .deb package",
                                        "Run `chmod +x BrowserMesh-1.0.0.AppImage`",
                                        "Execute the app or install via dpkg",
                                        "Start Linux stealth scraping",
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0a0a1a] border border-indigo-500/30 text-indigo-300 text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                                                {i + 1}
                                            </div>
                                            <span className="text-slate-300 text-xs sm:text-[13px] leading-snug">
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
                            <div className="rounded-[1.75rem] sm:rounded-[2rem] border-[5px] sm:border-[6px] border-slate-900 flex flex-col bg-gradient-to-br from-[#1a1442] to-[#0f0c29] shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative w-[180px] sm:w-[200px] mx-auto h-[90%] my-auto min-h-[190px] sm:min-h-[220px]">
                                <div className="bg-black/50 px-3.5 sm:px-4 py-1.5 flex items-center justify-between border-b border-white/5">
                                    <span className="text-[10px] text-slate-300 font-medium">
                                        12:00
                                    </span>
                                    <div className="flex gap-1 items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                                        <div className="w-2.5 h-1.5 rounded-sm bg-slate-400" />
                                    </div>
                                </div>
                                <div className="p-3.5 sm:p-4 flex flex-col items-center justify-center gap-4 sm:gap-6 flex-1 relative z-10">
                                    <FaAndroid
                                        size={40}
                                        className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)] sm:w-[48px] sm:h-[48px]"
                                    />
                                    <a
                                        href={androidUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-indigo-600 hover:bg-indigo-500 transition-all border border-indigo-400/40 w-full flex items-center justify-center gap-1.5 py-2 sm:py-2.5 rounded-lg text-[11px] font-bold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                                    >
                                        <Download size={12} /> Download APK
                                    </a>
                                </div>
                                {/* Home Indicator */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full" />
                            </div>
                            <div className="flex flex-col justify-center">
                                <ol className="space-y-3 sm:space-y-6">
                                    {[
                                        "Download official BrowserMesh APK",
                                        "Allow 'Install from Unknown Sources'",
                                        "Install BrowserMesh App on Android",
                                        "Run node & contribute mobile proxies",
                                    ].map((step, i) => (
                                        <li key={i} className="flex items-center gap-3 sm:gap-4">
                                            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0a0a1a] border border-indigo-500/30 text-indigo-300 text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(99,102,241,0.15)]">
                                                {i + 1}
                                            </div>
                                            <span className="text-slate-300 text-xs sm:text-[13px] leading-snug">
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
                <div className="glass-framer rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col h-full justify-between">
                    <div>
                        <h3 className="text-white font-semibold mb-2 sm:mb-3 text-sm sm:text-[15px] px-1 flex items-center justify-between">
                            <span>Headless CLI Install</span>
                            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                                Auto-Script
                            </span>
                        </h3>
                        <div className="rounded-xl overflow-hidden border border-white/5 bg-[#0a0a1a] flex flex-col mb-3 sm:mb-4">
                            <div className="bg-white/[0.02] px-3.5 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between border-b border-white/5">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                                </div>
                                <span className="text-[10px] text-slate-300 font-mono">
                                    bash / powershell
                                </span>
                            </div>
                            <div className="p-3 sm:p-4 font-mono text-[10px] sm:text-[11px] leading-relaxed break-all bg-black/40 text-slate-300 select-all min-h-[85px] sm:min-h-[110px]">
                                <span className="text-cyan-400">$ </span>
                                {cliCommand}
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handleCopy}
                        className={`transition-all border w-full py-2 sm:py-2.5 rounded-lg text-xs sm:text-[13px] font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                            copied
                                ? "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                                : "bg-indigo-600 hover:bg-indigo-500 border-indigo-400/40 text-white shadow-[0_0_20px_rgba(79,70,229,0.3)]"
                        }`}
                    >
                        {copied ? (
                            <>
                                <Check size={14} /> Copied to Clipboard!
                            </>
                        ) : (
                            <>
                                <Copy size={14} /> Copy Installation Script
                            </>
                        )}
                    </button>
                </div>
            </div>
        </section>
    );
}
