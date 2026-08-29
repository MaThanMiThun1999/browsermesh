import { Check, X, Sparkles, Minus } from "lucide-react";
import Link from "next/link";

const comparisonFeatures = [
    {
        feature: "4G/5G Cellular Mobile Nodes",
        description: "Carrier-Grade NAT (CGNAT) IPs immune to anti-bot bans.",
        browsermesh: { text: "Included ($0 / GB)", isBest: true },
        brightdata: { text: "$30 - $40 / GB", isBad: true },
        apify: { text: "Datacenter Only", isBad: true },
        uscraper: { text: "Home IP Only", isBad: true },
    },
    {
        feature: "Cloud Compute Overhead",
        description: "Execution cost to run scrapers and headless browser nodes.",
        browsermesh: { text: "$0 (Local & P2P)", isBest: true },
        brightdata: { text: "High Bandwidth", isBad: true },
        apify: { text: "Cloud CU Fees", isBad: true },
        uscraper: { text: "Local PC Only", isNeutral: true },
    },
    {
        feature: "Supported Platforms",
        description: "Operating systems supported for background node execution.",
        browsermesh: { text: "Windows, Linux, Android, Web", isBest: true },
        brightdata: { text: "Proxy Gateway", isNeutral: true },
        apify: { text: "Cloud Docker", isNeutral: true },
        uscraper: { text: "Windows Only", isBad: true },
    },
    {
        feature: "Cloudflare Turnstile Bypass",
        description: "Bypasses TLS JA4 ciphers, Canvas noise, and bot challenges.",
        browsermesh: { text: "99.9% Native Fingerprints", isBest: true },
        brightdata: { text: "Unlocker API", isNeutral: true },
        apify: { text: "Fingerprint Patches", isNeutral: true },
        uscraper: { text: "Standard Engine", isNeutral: true },
    },
    {
        feature: "Pre-Built Plugin Marketplace",
        description: "Ready-to-use visual extractors for Amazon, Google Maps, LinkedIn.",
        browsermesh: { text: "250+ Plugins", isBest: true },
        brightdata: { text: "No Marketplace", isBad: true },
        apify: { text: "64k+ Actors", isNeutral: true },
        uscraper: { text: "Builder Only", isBad: true },
    },
    {
        feature: "Entry Pricing",
        description: "Transparent pricing for developers and high-volume teams.",
        browsermesh: { text: "$0 Free / $15 Pro", isBest: true },
        brightdata: { text: "$500+ / mo", isBad: true },
        apify: { text: "$49 / mo + Usage", isNeutral: true },
        uscraper: { text: "$99 Lifetime", isNeutral: true },
    },
];

export default function CompetitorComparison() {
    return (
        <section className="max-w-7xl mx-auto px-3 sm:px-6 py-6 md:py-12">
            <div className="glass-framer rounded-2xl sm:rounded-[24px] border border-white/5 bg-[#05050f] p-5 sm:p-8 lg:p-10 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                {/* Header Title */}
                <div className="mb-6 md:mb-10 text-center max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-3">
                        <Sparkles className="w-3.5 h-3.5" />
                        Transparent Benchmark
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-2">
                        Why Developers Switch to BrowserMesh
                    </h2>
                    <p className="text-slate-400 text-xs sm:text-sm">
                        Zero proxy markup. Real 4G/5G mobile nodes. Multi-platform peer-to-peer grid.
                    </p>
                </div>

                {/* Table Container */}
                <div className="overflow-x-auto rounded-xl sm:rounded-2xl border border-white/10 bg-[#03030a]/90">
                    <table className="w-full text-left border-collapse table-fixed min-w-[820px]">
                        <thead>
                            <tr className="border-b border-white/10 bg-[#070714]">
                                <th className="p-4 sm:p-5 text-xs sm:text-sm font-semibold text-slate-400 w-[28%]">
                                    Capability
                                </th>
                                <th className="p-4 sm:p-5 text-center w-[24%] bg-indigo-950/40 border-x border-indigo-500/30">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00d2ff]" />
                                        <span className="text-white text-xs sm:text-sm font-bold tracking-wide">
                                            BrowserMesh
                                        </span>
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-600 text-white">
                                            Next-Gen
                                        </span>
                                    </div>
                                </th>
                                <th className="p-4 sm:p-5 text-center text-xs sm:text-sm font-semibold text-slate-300 w-[16%]">
                                    Bright Data
                                </th>
                                <th className="p-4 sm:p-5 text-center text-xs sm:text-sm font-semibold text-slate-300 w-[16%]">
                                    Apify
                                </th>
                                <th className="p-4 sm:p-5 text-center text-xs sm:text-sm font-semibold text-slate-300 w-[16%]">
                                    UScraper
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                            {comparisonFeatures.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className="hover:bg-white/[0.02] transition-colors"
                                >
                                    {/* Capability Column */}
                                    <td className="p-4 sm:p-5 align-middle">
                                        <div className="font-semibold text-slate-100 mb-0.5 text-xs sm:text-sm">
                                            {item.feature}
                                        </div>
                                        <div className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                                            {item.description}
                                        </div>
                                    </td>

                                    {/* BrowserMesh Column (Highlighted & Centered) */}
                                    <td className="p-4 sm:p-5 align-middle text-center bg-indigo-950/40 border-x border-indigo-500/30">
                                        <div className="w-full max-w-[200px] mx-auto flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-semibold text-xs shadow-[0_0_12px_rgba(0,210,255,0.12)]">
                                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 stroke-[2.5]" />
                                            <span>{item.browsermesh.text}</span>
                                        </div>
                                    </td>

                                    {/* Bright Data Column (Centered Uniform Pill) */}
                                    <td className="p-4 sm:p-5 align-middle text-center">
                                        {item.brightdata.isBad ? (
                                            <div className="w-full max-w-[130px] mx-auto flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-500/5 border border-rose-500/10 text-rose-300/80 text-xs">
                                                <X className="w-3 h-3 text-rose-400 shrink-0" />
                                                <span>{item.brightdata.text}</span>
                                            </div>
                                        ) : (
                                            <div className="w-full max-w-[130px] mx-auto flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 text-xs">
                                                <Minus className="w-3 h-3 text-slate-500 shrink-0" />
                                                <span>{item.brightdata.text}</span>
                                            </div>
                                        )}
                                    </td>

                                    {/* Apify Column (Centered Uniform Pill) */}
                                    <td className="p-4 sm:p-5 align-middle text-center">
                                        {item.apify.isBad ? (
                                            <div className="w-full max-w-[130px] mx-auto flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-500/5 border border-rose-500/10 text-rose-300/80 text-xs">
                                                <X className="w-3 h-3 text-rose-400 shrink-0" />
                                                <span>{item.apify.text}</span>
                                            </div>
                                        ) : (
                                            <div className="w-full max-w-[130px] mx-auto flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 text-xs">
                                                <Minus className="w-3 h-3 text-slate-500 shrink-0" />
                                                <span>{item.apify.text}</span>
                                            </div>
                                        )}
                                    </td>

                                    {/* UScraper Column (Centered Uniform Pill) */}
                                    <td className="p-4 sm:p-5 align-middle text-center">
                                        {item.uscraper.isBad ? (
                                            <div className="w-full max-w-[130px] mx-auto flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-500/5 border border-rose-500/10 text-rose-300/80 text-xs">
                                                <X className="w-3 h-3 text-rose-400 shrink-0" />
                                                <span>{item.uscraper.text}</span>
                                            </div>
                                        ) : (
                                            <div className="w-full max-w-[130px] mx-auto flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/[0.02] border border-white/5 text-slate-400 text-xs">
                                                <Minus className="w-3 h-3 text-slate-500 shrink-0" />
                                                <span>{item.uscraper.text}</span>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Bottom Link */}
                <div className="mt-6 text-center">
                    <Link
                        href="/pricing"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-indigo-400 hover:text-cyan-300 transition-colors"
                    >
                        Compare all plan features & node capabilities &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
}
