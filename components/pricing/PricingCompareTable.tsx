"use client";

import {
    Gauge,
    MonitorSmartphone,
    FileSpreadsheet,
    Blocks,
    Globe,
    Clock,
    Cloud,
    Headphones,
} from "lucide-react";

export default function PricingCompareTable() {
    const compareFeatures = [
        {
            title: "Extraction Limits",
            subtitle: "Monthly Results Limit",
            icon: <Gauge className="w-5 h-5 text-indigo-400" />,
            free: "500 / mo",
            pro: "10,000 / mo",
        },
        {
            title: "Connected Devices",
            subtitle: "Active Devices",
            icon: <MonitorSmartphone className="w-5 h-5 text-indigo-400" />,
            free: "1",
            pro: "Up to 3",
        },
        {
            title: "Export Formats",
            subtitle: "Download your data",
            icon: <FileSpreadsheet className="w-5 h-5 text-indigo-400" />,
            free: "JSON",
            pro: "JSON, CSV, Excel",
        },
        {
            title: "Plugins Access",
            subtitle: "Marketplace Access",
            icon: <Blocks className="w-5 h-5 text-indigo-400" />,
            free: "Basic only",
            pro: "Entire Marketplace (Free + Pro)",
        },
        {
            title: "Advanced Networking",
            subtitle: "Proxies & IP Rotation",
            icon: <Globe className="w-5 h-5 text-indigo-400" />,
            free: "No Proxies",
            pro: "Full Proxy Support",
        },
        {
            title: "Automation",
            subtitle: "Job Scheduling",
            icon: <Clock className="w-5 h-5 text-indigo-400" />,
            free: "Manual triggers",
            pro: "Scheduled Cron Jobs",
        },
        {
            title: "Cloud Storage",
            subtitle: "Secure data backup",
            icon: <Cloud className="w-5 h-5 text-indigo-400" />,
            free: "100 MB",
            pro: "2 GB (2048 MB)",
        },
        {
            title: "Support",
            subtitle: "Customer Support",
            icon: <Headphones className="w-5 h-5 text-indigo-400" />,
            free: "Community Support",
            pro: "Priority Support",
        },
    ];

    return (
        <div className="bg-[#080517]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl mb-16 sm:mb-20 relative z-10">
            <div className="overflow-x-auto custom-scrollbar pb-3">
                <table className="w-full text-left min-w-[620px]">
                    <thead>
                        <tr className="border-b border-white/10 text-white">
                            <th className="pb-6 text-xl font-bold w-1/2">Compare Plans</th>
                            <th className="pb-6 text-center w-1/4">
                                <div className="text-lg font-bold text-white">Free</div>
                                <div className="text-xs text-slate-400 font-mono font-normal">
                                    $0/forever
                                </div>
                            </th>
                            <th className="pb-6 text-center w-1/4">
                                <div className="text-lg font-bold text-indigo-300">Pro</div>
                                <div className="text-xs text-slate-400 font-mono font-normal">
                                    $15/month
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                        {compareFeatures.map((feat, idx) => (
                            <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                                <td className="py-4 pr-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            {feat.icon}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold text-white">
                                                {feat.title}
                                            </span>
                                            <span className="text-slate-400 text-xs">
                                                {feat.subtitle}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 text-center text-slate-300 font-mono text-xs sm:text-sm">
                                    {feat.free}
                                </td>
                                <td className="py-4 text-center font-bold text-white font-mono text-xs sm:text-sm">
                                    {feat.pro}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
