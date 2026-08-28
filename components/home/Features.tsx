import Image from "next/image";
import { assetsImg1, assetsImg2, assetsImg3, assetsImg4 } from "@/assets/images";

export default function Features() {
    const features = [
        {
            img: assetsImg1,
            title: "Undetectable Execution",
            desc: "Cloud-browser with canvas spoofing & telemetry blocking.",
            grad: "from-blue-500/15 to-indigo-600/15",
        },
        {
            img: assetsImg2,
            title: "Plugin Marketplace",
            desc: "Write once, run anywhere. Community-driven ecosystem.",
            grad: "from-purple-500/15 to-pink-600/15",
        },
        {
            img: assetsImg3,
            title: "Total Control",
            desc: "Background job queue, SLA & rate limits.",
            grad: "from-cyan-500/15 to-blue-600/15",
        },
        {
            img: assetsImg4,
            title: "Multi-Platform",
            desc: "Web • Desktop (Windows/Linux) • Mobile (Android) • CLI",
            grad: "from-indigo-500/15 to-purple-600/15",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-6 py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.map((f) => (
                    <div
                        key={f.title}
                        className="glass-framer rounded-2xl p-5 card-hover flex items-center gap-4 transition-all duration-300 cursor-pointer hover:bg-white/[0.05]"
                    >
                        <div className="flex-shrink-0">
                            <Image
                                src={f.img}
                                alt={f.title}
                                title={f.title}
                                className="w-11 h-11 object-contain drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                                priority
                                loading="eager"
                            />
                        </div>
                        <div className="flex flex-col text-left">
                            <h2 className="text-white font-semibold text-[15px] tracking-tight mb-1 leading-tight">
                                {f.title}
                            </h2>
                            <p className="text-slate-400 text-[13px] leading-snug">{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
