"use client";

import { Download, BookOpen, Globe, ExternalLink, Eye, Layers } from "lucide-react";
import { FaWindows, FaApple, FaAndroid, FaLinux } from "react-icons/fa";
import Link from "next/link";
import { formatRelativeTime } from "@/utils/date";

import { siteInfo } from "@/data/siteInfo";

export interface PluginSidebarProps {
    id?: string;
    slug?: string;
    latestVersion?: string | null;
    author?: string | null;
    installCount?: number;
    viewCount?: number;
    totalJobs?: number;
    compatibility?: string[];
    websiteUrl?: string | null;
    documentationUrl?: string | null;
    createdAt?: string;
}

export default function PluginSidebar({
    id,
    slug,
    latestVersion = "1.0.0",
    author = "BrowserMesh",
    installCount = 1500,
    viewCount = 4500,
    totalJobs = 12000,
    compatibility = ["windows", "macos", "linux", "android", "web"],
    websiteUrl,
    documentationUrl,
    createdAt,
}: PluginSidebarProps) {
    const handleInstallClick = () => {
        const consoleTargetUrl = `${siteInfo.consoleUrl}/marketplace/${slug || id || ""}`;
        window.open(consoleTargetUrl, "_blank", "noopener,noreferrer");
    };
    const formattedInstalls =
        installCount >= 1000000
            ? `${(installCount / 1000000).toFixed(1)}M+`
            : installCount >= 1000
              ? `${(installCount / 1000).toFixed(1)}k+`
              : `${installCount}`;

    const formattedViews =
        viewCount >= 1000000
            ? `${(viewCount / 1000000).toFixed(1)}M+`
            : viewCount >= 1000
              ? `${(viewCount / 1000).toFixed(1)}k+`
              : `${viewCount}`;

    const formattedJobs =
        totalJobs >= 1000000
            ? `${(totalJobs / 1000000).toFixed(1)}M+`
            : totalJobs >= 1000
              ? `${(totalJobs / 1000).toFixed(1)}k+`
              : `${totalJobs}`;

    const activePlatforms = (compatibility || []).map((c) => c.toLowerCase());

    return (
        <div className="flex flex-col gap-6">
            {/* 1. Install & Use Box */}
            <div className="bg-[#080517]/90 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
                <h2 className="text-white font-bold text-base">Install & Info</h2>

                <div className="flex flex-col gap-3 text-xs">
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Current Version</span>
                        <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-semibold px-2.5 py-0.5 rounded-md font-mono">
                            v{latestVersion || "1.0.0"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Author</span>
                        <span className="text-white font-medium">{author || "BrowserMesh"}</span>
                    </div>
                    {createdAt && (
                        <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                            <span className="text-slate-400">Released</span>
                            <span className="text-white font-medium">
                                {formatRelativeTime(createdAt)}
                            </span>
                        </div>
                    )}
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Total Installs</span>
                        <span className="text-white font-medium flex items-center gap-1">
                            <Download size={12} className="text-cyan-400" />
                            {formattedInstalls}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 border-b border-white/5">
                        <span className="text-slate-400">Total Views</span>
                        <span className="text-white font-medium flex items-center gap-1">
                            <Eye size={12} className="text-indigo-400" />
                            {formattedViews}
                        </span>
                    </div>
                    <div className="flex items-center justify-between py-1.5">
                        <span className="text-slate-400">Jobs Executed</span>
                        <span className="text-white font-medium flex items-center gap-1">
                            <Layers size={12} className="text-emerald-400" />
                            {formattedJobs}
                        </span>
                    </div>
                </div>

                <button
                    onClick={handleInstallClick}
                    className="w-full bg-[#4c35e6] hover:bg-[#5a46e8] text-white font-bold text-sm py-3 rounded-xl shadow-[0_0_20px_rgba(76,53,230,0.5)] transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                    <Download size={16} /> Install Plugin
                </button>
            </div>

            {/* 2. Compatibility Box */}
            <div className="bg-[#080517]/90 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
                <h2 className="text-white font-bold text-base">Compatibility</h2>

                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-2 text-center">
                    <div
                        className={`border rounded-xl p-3 flex flex-col items-center gap-2 ${
                            activePlatforms.includes("windows")
                                ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                                : "bg-white/[0.02] border-white/5 text-slate-500"
                        }`}
                    >
                        <FaWindows size={20} />
                        <span className="text-[11px] font-medium">Windows</span>
                    </div>

                    <div
                        className={`border rounded-xl p-3 flex flex-col items-center gap-2 ${
                            activePlatforms.includes("macos") || activePlatforms.includes("mac")
                                ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                                : "bg-white/[0.02] border-white/5 text-slate-500"
                        }`}
                    >
                        <FaApple size={20} />
                        <span className="text-[11px] font-medium">macOS</span>
                    </div>

                    <div
                        className={`border rounded-xl p-3 flex flex-col items-center gap-2 ${
                            activePlatforms.includes("linux")
                                ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                                : "bg-white/[0.02] border-white/5 text-slate-500"
                        }`}
                    >
                        <FaLinux size={20} />
                        <span className="text-[11px] font-medium">Linux</span>
                    </div>

                    <div
                        className={`border rounded-xl p-3 flex flex-col items-center gap-2 ${
                            activePlatforms.includes("android")
                                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                : "bg-white/[0.02] border-white/5 text-slate-500"
                        }`}
                    >
                        <FaAndroid size={20} />
                        <span className="text-[11px] font-medium">Android</span>
                    </div>
                </div>
            </div>

            {/* 3. Resources & Links Box */}
            <div className="bg-[#080517]/90 border border-white/10 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col gap-4">
                <h2 className="text-white font-bold text-base">Resources & Links</h2>

                <div className="flex flex-col gap-2">
                    {documentationUrl ? (
                        <a
                            href={documentationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5 text-xs group"
                        >
                            <div className="flex items-center gap-2.5">
                                <BookOpen size={16} className="text-indigo-400" />
                                <span className="font-medium">Documentation</span>
                            </div>
                            <ExternalLink
                                size={14}
                                className="text-slate-500 group-hover:text-white transition-colors"
                            />
                        </a>
                    ) : (
                        <Link
                            href="/docs"
                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5 text-xs group"
                        >
                            <div className="flex items-center gap-2.5">
                                <BookOpen size={16} className="text-indigo-400" />
                                <span className="font-medium">BrowserMesh Docs</span>
                            </div>
                            <ExternalLink
                                size={14}
                                className="text-slate-500 group-hover:text-white transition-colors"
                            />
                        </Link>
                    )}

                    {websiteUrl && (
                        <a
                            href={websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5 text-xs group"
                        >
                            <div className="flex items-center gap-2.5">
                                <Globe size={16} className="text-cyan-400" />
                                <span className="font-medium">Official Website</span>
                            </div>
                            <ExternalLink
                                size={14}
                                className="text-slate-500 group-hover:text-white transition-colors"
                            />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}
