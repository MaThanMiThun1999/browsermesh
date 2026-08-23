import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaXTwitter, FaGithub, FaYoutube, FaDiscord } from "react-icons/fa6";
import { logoWithText } from "@/assets/images";

import { footerLinks } from "@/data/navigationLinks";
import { siteInfo } from "@/data/siteInfo";

export default function Footer() {
    const socials = [
        { icon: <FaDiscord size={20} />, label: "Discord", color: "text-[#8b5cf6] drop-shadow-[0_0_10px_rgba(139,92,246,0.4)]" },
        { icon: <FaXTwitter size={20} />, label: "X", color: "text-white" },
        { icon: <FaGithub size={20} />, label: "GitHub", color: "text-white" },
        { icon: <FaYoutube size={20} />, label: "YouTube", color: "text-white" },
    ];
    
    return (
        <footer className="border-t border-white/5 mt-8 bg-transparent relative overflow-hidden">
            {/* Ambient background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 pt-10 pb-6 relative z-10">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr] gap-x-6 gap-y-10 mb-10">
                    
                    {/* Column 1: Logo & Socials */}
                    <div className="col-span-2 md:col-span-3 lg:col-span-1">
                        <Link href="/">
                            <Image src={logoWithText} alt={siteInfo.name} title={siteInfo.name} className="h-12 md:h-12 w-auto object-contain mb-5 drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]" />
                        </Link>
                        <p className="text-slate-400 text-[13px] leading-relaxed mb-6 max-w-[200px]">
                            {siteInfo.tagline}
                        </p>
                        <div className="flex gap-5">
                            {socials.map((s) => (
                                <button key={s.label} className={`${s.color} hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all`}>
                                    {s.icon}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Columns 2-4: Links */}
                    {footerLinks.map((col) => (
                        <div key={col.title}>
                            <h3 className="text-white font-bold text-[14px] mb-5">{col.title}</h3>
                            <ul className="space-y-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.path} className="text-slate-400 hover:text-white text-[13px] transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
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
                            <button className="bg-[#4c35e6] hover:bg-[#5a46e8] transition-colors px-3.5 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(76,53,230,0.4)]">
                                <ArrowRight size={16} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright */}
                <div className="flex flex-col items-center justify-center">
                    <p className="text-slate-500 text-[12px]">© {new Date().getFullYear()} {siteInfo.name}. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
