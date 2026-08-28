"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaXTwitter, FaGithub, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { logoWithText } from "@/assets/images";

import { footerLinks } from "@/data/navigationLinks";
import { siteInfo } from "@/data/siteInfo";
import { useSettings } from "@/context/SettingsContext";
import { getLatestReleases, LatestReleases } from "@/lib/api";

type PlatformType = "windows" | "macos" | "linux" | "android" | "web" | "unknown";

export default function Footer() {
    const { appName, tagline, getSettingValue } = useSettings();
    const [releases, setReleases] = useState<LatestReleases | null>(null);
    const [detectedPlatform, setDetectedPlatform] = useState<PlatformType>("windows");

    useEffect(() => {
        getLatestReleases().then((res) => {
            if (res) {
                setReleases(res);
            }
        });

        if (typeof window !== "undefined") {
            const userAgent = navigator.userAgent.toLowerCase();
            let currentOS: PlatformType = "windows";
            if (userAgent.includes("mac") || userAgent.includes("darwin")) {
                currentOS = "macos";
            } else if (userAgent.includes("android")) {
                currentOS = "android";
            } else if (userAgent.includes("linux")) {
                currentOS = "linux";
            } else if (userAgent.includes("win")) {
                currentOS = "windows";
            }

            const timer = setTimeout(() => {
                setDetectedPlatform(currentOS);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, []);

    const getDownloadUrl = (): string => {
        switch (detectedPlatform) {
            case "windows":
                return (
                    releases?.downloads?.windows ||
                    "https://s3.browsermesh.in/releases/BrowserMesh-Setup-1.0.0.exe"
                );
            case "macos":
                return siteInfo.links.docs;
            case "linux":
                return (
                    releases?.downloads?.linuxAppImage ||
                    releases?.downloads?.linuxDeb ||
                    "/docs/install-linux"
                );
            case "android":
                return releases?.downloads?.androidApk || "/docs/install-android";
            default:
                return (
                    releases?.downloads?.windows ||
                    "https://s3.browsermesh.in/releases/BrowserMesh-Setup-1.0.0.exe"
                );
        }
    };

    const downloadUrl = getDownloadUrl();

    const twitterUrl = getSettingValue<string>(
        "twitter_url",
        getSettingValue<string>("x_url", siteInfo.links.twitter || "")
    );
    const facebookUrl = getSettingValue<string>("facebook_url", "");
    const instagramUrl = getSettingValue<string>("instagram_url", "");
    const linkedinUrl = getSettingValue<string>("linkedin_url", "");
    const githubUrl = getSettingValue<string>("github_url", siteInfo.links.github || "");

    const socials = [
        {
            icon: <FaXTwitter size={20} />,
            label: "X",
            href: twitterUrl,
            color: "text-white",
        },
        {
            icon: <FaFacebook size={20} />,
            label: "Facebook",
            href: facebookUrl,
            color: "text-[#1877f2]",
        },
        {
            icon: <FaInstagram size={20} />,
            label: "Instagram",
            href: instagramUrl,
            color: "text-[#e4405f]",
        },
        {
            icon: <FaLinkedin size={20} />,
            label: "LinkedIn",
            href: linkedinUrl,
            color: "text-[#0a66c2]",
        },
        {
            icon: <FaGithub size={20} />,
            label: "GitHub",
            href: githubUrl,
            color: "text-white",
        },
    ].filter((s) => Boolean(s.href && typeof s.href === "string" && s.href.trim() !== ""));

    return (
        <footer className="border-t border-white/5 mt-8 bg-transparent relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr] gap-x-6 gap-y-10 mb-10">
                    {/* Column 1: Logo & Socials */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-1">
                        <Link href="/">
                            <Image
                                src={logoWithText}
                                alt={appName || siteInfo.name}
                                title={appName || siteInfo.name}
                                className="h-12 md:h-12 w-auto object-contain mb-5 drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                                unoptimized
                            />
                        </Link>
                        <p className="text-slate-400 text-[13px] leading-relaxed mb-6 max-w-[200px]">
                            {tagline || siteInfo.tagline}
                        </p>
                        <div className="flex gap-5">
                            {socials.map((s) => (
                                <Link
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label={s.label}
                                    className={`${s.color} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all`}
                                >
                                    {s.icon}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Columns 2-4: Links */}
                    {footerLinks.map((col) => (
                        <div key={col.title}>
                            <h3 className="text-white font-bold text-[14px] mb-5">{col.title}</h3>
                            <ul className="space-y-3">
                                {col.links.map((link) => {
                                    const isDownloadLink =
                                        link.label.toLowerCase().includes("download") ||
                                        link.path === "/download";
                                    const targetUrl = isDownloadLink ? downloadUrl : link.path;
                                    const isExternal = targetUrl.startsWith("http");

                                    return (
                                        <li key={link.label}>
                                            {isExternal ? (
                                                <a
                                                    href={targetUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-slate-400 hover:text-white text-[13px] transition-colors"
                                                >
                                                    {link.label}
                                                </a>
                                            ) : (
                                                <Link
                                                    href={targetUrl}
                                                    className="text-slate-400 hover:text-white text-[13px] transition-colors"
                                                >
                                                    {link.label}
                                                </Link>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}

                    {/* Column 5: Stay Updated */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-1">
                        <h3 className="text-white font-bold text-[14px] mb-5">Stay Updated</h3>
                        <p className="text-slate-400 text-[13px] leading-relaxed mb-4 max-w-[200px]">
                            Get the latest updates and scraping tips.
                        </p>
                        <div className="flex gap-2">
                            <input
                                placeholder="Your email"
                                className="flex-1 bg-[#0a0515] border border-white/10 rounded-lg px-4 py-2.5 text-[13px] text-white placeholder-slate-600 outline-none focus:border-indigo-500 focus:bg-[#0e0720] transition-colors min-w-0 shadow-inner"
                            />
                            <button className="bg-[#4c35e6] hover:bg-[#5a46e8] transition-colors px-3.5 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(76,53,230,0.4)] cursor-pointer">
                                <ArrowRight size={16} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="flex flex-col items-center justify-center">
                    <p className="text-slate-500 text-[12px]">
                        © {new Date().getFullYear()} {siteInfo.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
