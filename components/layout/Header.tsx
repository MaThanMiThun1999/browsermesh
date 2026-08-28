"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, Menu, X } from "lucide-react";
import { logoWithText } from "@/assets/images";

import { navigationLinks } from "@/data/navigationLinks";
import { siteInfo } from "@/data/siteInfo";
import { useSettings } from "@/context/SettingsContext";

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const { appName, maintenanceMode } = useSettings();

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(path);
    };

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-6 gap-2">
            {maintenanceMode.enabled && (
                <div className="bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold px-4 py-1.5 rounded-full backdrop-blur-md flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <AlertTriangle size={14} className="shrink-0 text-amber-400" />
                    <span>{maintenanceMode.message}</span>
                </div>
            )}
            <nav className="glass-nav flex items-center justify-between h-[60px] px-6 w-full max-w-5xl rounded-full relative z-20">
                <Link href="/" className="flex items-center">
                    <Image
                        src={logoWithText}
                        alt={appName || siteInfo.name}
                        title={appName || siteInfo.name}
                        width={2172}
                        height={724}
                        className="h-12 w-auto object-contain"
                        priority
                        loading="eager"
                        unoptimized
                    />
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navigationLinks.map((link) => {
                        const active = isActive(link.path);
                        return (
                            <Link
                                key={link.label}
                                href={link.path}
                                className={`text-sm font-medium transition-all relative py-1 ${
                                    active
                                        ? "text-white font-semibold"
                                        : "text-slate-400 hover:text-white"
                                }`}
                            >
                                {link.label}
                                {active && (
                                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <Link
                        href={siteInfo.links.console}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary inline-flex text-sm font-semibold text-white px-6 py-2 rounded-full cursor-pointer"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Toggle Icon with Smooth Rotation */}
                <button
                    className="md:hidden text-slate-400 hover:text-white focus:outline-none p-1 transition-colors"
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle navigation menu"
                >
                    <div className="relative w-6 h-6 flex items-center justify-center">
                        <Menu
                            size={22}
                            className={`absolute transition-all duration-300 transform ${
                                open
                                    ? "rotate-90 opacity-0 scale-50"
                                    : "rotate-0 opacity-100 scale-100"
                            }`}
                        />
                        <X
                            size={22}
                            className={`absolute transition-all duration-300 transform ${
                                open
                                    ? "rotate-0 opacity-100 scale-100"
                                    : "-rotate-90 opacity-0 scale-50"
                            }`}
                        />
                    </div>
                </button>
            </nav>

            {/* Mobile Navigation Drawer with Smooth Slide & Fade Animation */}
            <div
                className={`absolute top-20 left-6 right-6 md:hidden bg-[#07071a]/95 backdrop-blur-3xl border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.8)] rounded-2xl p-4 flex flex-col gap-2 transition-all duration-300 ease-out transform z-10 ${
                    open
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
                }`}
            >
                {navigationLinks.map((link) => {
                    const active = isActive(link.path);
                    return (
                        <Link
                            key={link.label}
                            href={link.path}
                            className={`text-sm font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                                active
                                    ? "bg-gradient-to-r from-indigo-600/30 to-purple-600/30 text-white font-bold border border-indigo-500/40 shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                                    : "text-slate-300 hover:text-white hover:bg-white/10"
                            }`}
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    );
                })}
                <div className="flex pt-2">
                    <Link
                        href={siteInfo.links.console}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary text-center text-sm font-semibold text-white px-6 py-3 rounded-xl flex-1 cursor-pointer shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                        onClick={() => setOpen(false)}
                    >
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}
