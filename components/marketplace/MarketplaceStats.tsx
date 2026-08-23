import { Box, Download, Users, Star } from "lucide-react";

export default function MarketplaceStats() {
    const stats = [
        {
            icon: <Box size={22} />,
            value: "250+",
            label: "Plugins Available",
            color: "bg-blue-500/10 border-blue-500/20 text-blue-400",
        },
        {
            icon: <Download size={22} />,
            value: "1.2M+",
            label: "Total Installations",
            color: "bg-purple-500/10 border-purple-500/20 text-purple-400",
        },
        {
            icon: <Users size={22} />,
            value: "10K+",
            label: "Developers",
            color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
        },
        {
            icon: <Star size={22} fill="currentColor" />,
            value: "4.9/5",
            label: "Average Rating",
            color: "bg-amber-500/10 border-amber-500/20 text-amber-400",
        },
    ];

    return (
        <div className="w-full relative overflow-hidden py-4 sm:py-6">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-purple-600/10 blur-[130px] pointer-events-none z-0" />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Outer Dark Glass Box Container matching reference design */}
                <div className="bg-[#050312]/90 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl">
                    <h3 className="text-white font-bold text-base sm:text-lg mb-5 sm:mb-6">
                        Marketplace by the numbers
                    </h3>

                    {/* 2-Column Grid on Mobile, 4-Column Grid on Desktop */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                        {stats.map((stat, i) => (
                            <div
                                key={i}
                                className="bg-[#080517] border border-white/5 hover:border-white/15 transition-all rounded-xl sm:rounded-2xl p-3.5 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 group"
                            >
                                <div
                                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center shrink-0 ${stat.color} group-hover:scale-105 transition-transform`}
                                >
                                    {stat.icon}
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-white font-extrabold text-lg sm:text-2xl leading-tight tracking-tight">
                                        {stat.value}
                                    </span>
                                    <span className="text-slate-400 text-[10px] sm:text-[12px] font-medium truncate">
                                        {stat.label}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
