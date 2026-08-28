"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { pricingAssets1, pricingAssets2 } from "@/assets/images";
import { siteInfo } from "@/data/siteInfo";
import { getPublicPricing, PricingPlan } from "@/lib/api";

function formatPlanFeatures(plan: PricingPlan | undefined, fallbackFeatures: string[]): string[] {
    if (!plan) return fallbackFeatures;

    const list: string[] = [];

    if (plan.limits) {
        list.push(`${plan.limits.monthlyResultLimit.toLocaleString()} Scraped Results / Mo`);
        list.push(
            `${plan.limits.maxDevices} Registered Device${plan.limits.maxDevices > 1 ? "s" : ""}`
        );
        const storageStr =
            plan.limits.maxStorageMb >= 1024
                ? `${(plan.limits.maxStorageMb / 1024).toFixed(0)} GB`
                : `${plan.limits.maxStorageMb} MB`;
        list.push(`${storageStr} Cloud Storage`);

        const tiers = plan.limits.allowedPluginTiers.map((t) => t.toUpperCase()).join(" & ");
        list.push(`${tiers} Plugins Access`);
    }

    const featureLabels: Record<string, string> = {
        json_export: "JSON Data Export",
        csv_export: "CSV & TSV Export",
        xlsx_export: "Excel (.xlsx) Export",
        proxy_support: "Stealth Proxy Support",
        scheduled_jobs: "Automated Cron / Scheduled Jobs",
    };

    if (Array.isArray(plan.features) && plan.features.length > 0) {
        plan.features.forEach((feat) => {
            const label = featureLabels[feat] || feat;
            if (!list.includes(label)) {
                list.push(label);
            }
        });
    }

    return list.length > 0 ? list : fallbackFeatures;
}

export default function PricingCards() {
    const [plans, setPlans] = useState<PricingPlan[]>([]);
    const { free: staticFree, pro: staticPro } = siteInfo.pricing;

    useEffect(() => {
        getPublicPricing().then((data) => {
            if (Array.isArray(data) && data.length > 0) {
                setPlans(data);
            }
        });
    }, []);

    const freeApi = plans.find((p) => p.plan.toLowerCase() === "free");
    const proApi = plans.find((p) => p.plan.toLowerCase() === "pro");

    const freePrice = freeApi ? `$${freeApi.priceMonthly}` : staticFree.price;
    const freeHighlights = formatPlanFeatures(freeApi, staticFree.highlights);

    const proPrice = proApi ? `$${proApi.priceMonthly}` : staticPro.price;
    const proHighlights = formatPlanFeatures(proApi, staticPro.highlights);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20 items-stretch relative z-10">
            {/* CARD 1: FREE PLAN */}
            <div className="bg-[#080517]/90 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl backdrop-blur-xl relative overflow-hidden group hover:border-white/20 transition-all duration-300">
                <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">
                                {staticFree.name}
                            </h3>
                            <p className="text-slate-400 text-xs sm:text-sm max-w-[220px] leading-snug">
                                Perfect for trying out the platform and basic automation.
                            </p>
                        </div>
                        <div className="w-16 h-16 shrink-0 relative mix-blend-plus-lighter opacity-90 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                            <Image
                                src={pricingAssets1}
                                alt={`${staticFree.name} Plan Asset`}
                                title={`${staticFree.name} Plan Asset`}
                                width={1310}
                                height={1200}
                                loading="eager"
                                priority
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                            {freePrice}
                        </span>
                        <span className="text-slate-400 text-sm font-normal">
                            /{staticFree.period}
                        </span>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href={siteInfo.links.docs}
                        className="w-full bg-white/5 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white font-semibold text-sm py-3.5 rounded-2xl flex items-center justify-center transition-all mb-8 shadow-inner cursor-pointer"
                    >
                        Get Started for Free
                    </Link>

                    {/* Feature List */}
                    <ul className="flex flex-col gap-3.5 text-xs sm:text-sm text-slate-300">
                        {freeHighlights.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
                                    <Check size={12} strokeWidth={3} />
                                </div>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* CARD 2: PRO PLAN (Most Popular) */}
            <div className="bg-[#090620]/95 border-2 border-indigo-500/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(76,53,230,0.35)] backdrop-blur-xl relative group hover:border-indigo-400 transition-all duration-300">
                {/* Most Popular Floating Top Edge Badge */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-20">
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white text-[11px] font-extrabold px-3.5 py-1 rounded-full shadow-[0_0_20px_rgba(76,53,230,0.7)] border border-indigo-400/40 flex items-center gap-1 whitespace-nowrap">
                        <Sparkles size={11} className="fill-white" /> Most Popular
                    </span>
                </div>

                <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-1">{staticPro.name}</h3>
                            <p className="text-slate-300/90 text-xs sm:text-sm max-w-[220px] leading-snug">
                                For power users and teams who need heavy data extraction.
                            </p>
                        </div>
                        <div className="w-20 h-20 shrink-0 relative mix-blend-plus-lighter opacity-95 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                            <Image
                                src={pricingAssets2}
                                alt={`${staticPro.name} Plan Asset`}
                                title={`${staticPro.name} Plan Asset`}
                                width={1312}
                                height={1199}
                                loading="eager"
                                priority
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                            {proPrice}
                        </span>
                        <span className="text-slate-400 text-sm font-normal">
                            /{staticPro.period}
                        </span>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href={siteInfo.links.console}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full bg-gradient-to-r from-[#4c35e6] via-[#5b43f0] to-[#3b82f6] hover:from-[#5841f5] hover:to-[#60a5fa] text-white font-bold text-sm py-3.5 rounded-2xl flex items-center justify-center transition-all mb-8 shadow-[0_0_30px_rgba(76,53,230,0.6)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                    >
                        Upgrade to Pro
                    </Link>

                    {/* Feature List */}
                    <ul className="flex flex-col gap-3.5 text-xs sm:text-sm text-slate-200 font-medium">
                        {proHighlights.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 shrink-0 shadow-sm">
                                    <Check size={12} strokeWidth={3} />
                                </div>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
