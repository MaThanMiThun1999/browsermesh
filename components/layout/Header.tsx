"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";
import { logoWithText } from "@/assets/images";

import { navigationLinks } from "@/data/navigationLinks";
import { siteInfo } from "@/data/siteInfo";

export default function Header() {
    const [open, setOpen] = useState(false);
    
    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
            <nav className="glass-nav flex items-center justify-between h-[60px] px-6 w-full max-w-5xl rounded-full">
                <Link href="/" className="flex items-center">
                    <Image src={logoWithText} alt={siteInfo.name} title={siteInfo.name} className="h-12 w-auto object-contain" priority loading="eager" />
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {navigationLinks.map((link) => (
                        <Link key={link.label} href={link.path}
                            className={`text-sm font-medium transition-colors ${link.path === "/" ? "text-white" : "text-slate-400 hover:text-white"}`}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <button className="btn-primary text-sm font-semibold text-white px-6 py-2 rounded-full">Get Started</button>
                </div>

                <button className="md:hidden text-slate-400" onClick={() => setOpen(!open)}>
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {open && (
                <div className="absolute top-20 left-6 right-6 md:hidden bg-[#07071a]/95 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-2xl p-6 flex flex-col gap-4">
                    {navigationLinks.map((link) => (
                        <Link key={link.label} href={link.path} className="text-sm font-medium text-slate-300 hover:text-white" onClick={() => setOpen(false)}>
                            {link.label}
                        </Link>
                    ))}
                    <div className="flex pt-2">
                        <button className="btn-primary text-sm font-semibold text-white px-6 py-3 rounded-xl flex-1">Get Started</button>
                    </div>
                </div>
            )}
        </div>
    );
}
