import { Rocket } from "lucide-react";
import { siteInfo } from "@/data/siteInfo";

export default function CTABanner() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-12 relative">
            <div className="rounded-[24px] p-8 lg:px-12 lg:py-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 border border-white/50 relative overflow-hidden backdrop-blur-xl"
                 style={{ 
                     background: "linear-gradient(90deg, rgba(20, 10, 45, 0.65) 0%, rgba(8, 4, 20, 0.8) 100%)",
                     boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)" 
                 }}>
                
                {/* Subtle right corner arcs and glow */}
                <div className="absolute -top-10 -right-10 w-64 h-64 border-[1px] border-white/5 rounded-full pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 border-[1px] border-indigo-500/10 rounded-full pointer-events-none" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-8 text-center md:text-left w-full md:w-auto">
                    {/* Glowing Rocket Icon (Mimicking the 3D asset) */}
                    <div className="shrink-0 flex items-center justify-center">
                        <Rocket 
                            size={64} 
                            className="text-[#6366f1] drop-shadow-[0_0_25px_rgba(99,102,241,0.8)] -rotate-12" 
                            strokeWidth={1.5} 
                        />
                    </div>
                    
                    <div className="flex flex-col justify-center pt-1">
                        <h2 className="text-[26px] font-bold text-white mb-1.5 tracking-tight">Ready to bypass the bots?</h2>
                        <p className="text-slate-300 text-[14px] leading-relaxed max-w-[420px]">
                            Join thousands of professional using {siteInfo.name} for unlimited, undetected data extraction.
                        </p>
                    </div>
                </div>
                
                <div className="relative z-10 flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 mt-2 md:mt-0">
                    <button className="bg-[#4c35e6] hover:bg-[#5a46e8] text-white transition-all flex items-center justify-center px-6 md:px-8 py-3.5 rounded-xl font-semibold text-[14px] shadow-[0_0_20px_rgba(76,53,230,0.5)] w-full sm:w-auto whitespace-nowrap">
                        Get Started
                    </button>
                    <button className="bg-transparent border border-indigo-500/40 hover:bg-white/[0.05] text-white transition-all flex items-center justify-center px-6 md:px-8 py-3.5 rounded-xl font-semibold text-[14px] w-full sm:w-auto whitespace-nowrap">
                        View Docs
                    </button>
                </div>
            </div>
        </section>
    );
}
