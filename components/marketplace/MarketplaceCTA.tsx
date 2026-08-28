import Image from "next/image";
import { marketplaceCtaImg } from "@/assets/images";

export default function MarketplaceCTA() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-12 relative z-10 mb-10">
            <div className="bg-gradient-to-r from-[#17103a] to-[#0a071d] border border-indigo-500/20 rounded-3xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute top-0 right-0 w-[600px] h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 flex-1 max-w-[500px] text-center md:text-left mb-10 md:mb-0">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        Build once. Run everywhere. Earn forever.
                    </h2>
                    <p className="text-slate-400 text-[15px] leading-relaxed mb-8">
                        Create powerful plugins and earn revenue from thousands of users.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                        <button className="w-full sm:w-auto bg-[#4c35e6] hover:bg-[#5a46e8] transition-colors text-white font-semibold text-[14px] px-8 py-3.5 rounded-xl shadow-[0_0_20px_rgba(76,53,230,0.4)]">
                            Start Building
                        </button>
                        <button className="w-full sm:w-auto bg-transparent border border-white/20 hover:bg-white/5 transition-colors text-white font-semibold text-[14px] px-8 py-3.5 rounded-xl">
                            Read Developer Docs
                        </button>
                    </div>
                </div>

                {/* Graphics right side image */}
                <div className="relative z-10 w-full max-w-[400px] flex items-center justify-center mt-6 md:mt-0">
                    <Image
                        src={marketplaceCtaImg}
                        alt="Build once, run everywhere"
                        title="Build once, run everywhere"
                        loading="lazy"
                        className="w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(99,102,241,0.3)]"
                    />
                </div>
            </div>
        </section>
    );
}
