"use client";

import { Shield, Layers, Puzzle, MonitorSmartphone, Cloud, TrendingUp, Check } from "lucide-react";

export default function FeaturesCapabilities() {
    const capabilities = [
        {
            title: "Stealth Execution",
            description:
                "CloakBrowser technology with canvas spoofing, fingerprint masking, and anti-bot bypass.",
            icon: <Shield className="w-6 h-6 text-purple-400" />,
            bgColor: "bg-purple-500/10 border-purple-500/25 text-purple-400",
            checkColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
            features: [
                "Fingerprint Randomization",
                "Canvas & WebGL Spoofing",
                "Request Interception",
            ],
        },
        {
            title: "Smart Job Queue",
            description:
                "Robust queue system with concurrency, retries, checkpoints, and auto-recovery built-in.",
            icon: <Layers className="w-6 h-6 text-blue-400" />,
            bgColor: "bg-blue-500/10 border-blue-500/25 text-blue-400",
            checkColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
            features: ["Concurrency Control", "Auto Retry & Backoff", "Crash Recovery"],
        },
        {
            title: "Plugin Ecosystem",
            description:
                "A thriving marketplace of powerful scrapers. Install, configure, and run in seconds.",
            icon: <Puzzle className="w-6 h-6 text-emerald-400" />,
            bgColor: "bg-emerald-500/10 border-emerald-500/25 text-emerald-400",
            checkColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
            features: ["250+ Community Plugins", "One-Click Installation", "Write & Monetize"],
        },
        {
            title: "Cross-Platform",
            description:
                "Run on Web, Desktop (Windows, Linux) or even Android with identical power.",
            icon: <MonitorSmartphone className="w-6 h-6 text-pink-400" />,
            bgColor: "bg-pink-500/10 border-pink-500/25 text-pink-400",
            checkColor: "bg-pink-500/20 text-pink-400 border-pink-500/30",
            features: ["Web & Desktop Apps", "Android (PRoot) Support", "Seamless Sync"],
        },
        {
            title: "Cloud Sync & Backup",
            description:
                "Sync jobs, results, and settings across devices with encrypted cloud storage and backups.",
            icon: <Cloud className="w-6 h-6 text-amber-400" />,
            bgColor: "bg-amber-500/10 border-amber-500/25 text-amber-400",
            checkColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
            features: ["Encrypted Data Sync", "Cloud Storage", "Multi-Device Roaming"],
        },
        {
            title: "Analytics & Logs",
            description:
                "Detailed logs, usage analytics, and real-time monitoring for full visibility and control.",
            icon: <TrendingUp className="w-6 h-6 text-indigo-400" />,
            bgColor: "bg-indigo-500/10 border-indigo-500/25 text-indigo-400",
            checkColor: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
            features: ["Real-time Job Logs", "Usage & Performance", "Export Reports"],
        },
    ];

    return (
        <div className="mb-20 sm:mb-28 relative z-10">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
                <span className="bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 text-[11px] font-bold px-3.5 py-1 rounded-full uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    CORE CAPABILITIES
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                    Everything you need to extract data, your way
                </h2>
                <p className="text-slate-400 text-sm sm:text-base max-w-xl">
                    From stealth browsing to data delivery, BrowserMesh handles it all.
                </p>
            </div>

            {/* 3x2 Grid with Rich Glass Effect */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {capabilities.map((item, idx) => (
                    <div
                        key={idx}
                        className="glass-framer rounded-3xl p-6 sm:p-8 flex flex-col justify-between group hover:border-white/25 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all duration-300"
                    >
                        <div>
                            {/* Icon */}
                            <div
                                className={`w-12 h-12 rounded-2xl border ${item.bgColor} flex items-center justify-center mb-6 shadow-md group-hover:scale-105 transition-transform duration-300`}
                            >
                                {item.icon}
                            </div>

                            {/* Title & Subtext */}
                            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                                {item.description}
                            </p>

                            {/* Checkmark Features */}
                            <ul className="flex flex-col gap-3 pt-4 border-t border-white/5">
                                {item.features.map((feat, fIdx) => (
                                    <li
                                        key={fIdx}
                                        className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 font-medium"
                                    >
                                        <div
                                            className={`w-5 h-5 rounded-full border ${item.checkColor} flex items-center justify-center shrink-0 shadow-sm`}
                                        >
                                            <Check size={12} strokeWidth={3} />
                                        </div>
                                        <span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
