"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { logoWithText } from "@/assets/images";

import { navigationLinks } from "@/data/navigationLinks";
import { siteInfo } from "@/data/siteInfo";

export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === "/") {
            return pathname === "/";
        }
        return pathname.startsWith(path);
    };

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
            <nav className="glass-nav flex items-center justify-between h-[60px] px-6 w-full max-w-5xl rounded-full">
                <Link href="/" className="flex items-center">
                    <Image
                        src={logoWithText}
                        alt={siteInfo.name}
                        title={siteInfo.name}
                        className="h-12 w-auto object-contain"
                        priority
                        loading="eager"
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
                    <button className="btn-primary text-sm font-semibold text-white px-6 py-2 rounded-full">
                        Get Started
                    </button>
                </div>

                <button className="md:hidden text-slate-400" onClick={() => setOpen(!open)}>
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {open && (
                <div className="absolute top-20 left-6 right-6 md:hidden bg-[#07071a]/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-2xl p-4 flex flex-col gap-2">
                    {navigationLinks.map((link) => {
                        const active = isActive(link.path);
                        return (
                            <Link
                                key={link.label}
                                href={link.path}
                                className={`text-sm font-medium px-3.5 py-2.5 rounded-xl transition-all ${
                                    active
                                        ? "bg-indigo-600/20 text-white font-bold border border-indigo-500/30"
                                        : "text-slate-300 hover:text-white hover:bg-white/5"
                                }`}
                                onClick={() => setOpen(false)}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                    <div className="flex pt-2">
                        <button className="btn-primary text-sm font-semibold text-white px-6 py-3 rounded-xl flex-1">
                            Get Started
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
