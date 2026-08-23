"use client";

import PricingHero from "./PricingHero";
import PricingCards from "./PricingCards";
import PricingCompareTable from "./PricingCompareTable";
import PricingFaq from "./PricingFaq";
import PricingEnterpriseCTA from "./PricingEnterpriseCTA";

export default function PricingView() {
    return (
        <div className="w-full min-h-screen bg-[#07071a] text-slate-200 pb-20 pt-28 sm:pt-36 relative overflow-hidden">
            {/* Ambient Background Glow Orbs */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent blur-[140px] pointer-events-none z-0" />
            <div className="fixed top-1/3 left-10 w-96 h-96 bg-purple-600/10 blur-[130px] pointer-events-none z-0" />
            <div className="fixed top-1/2 right-10 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none z-0" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                {/* 1. Hero Header */}
                <PricingHero />

                {/* 2. Main Pricing Cards Grid (Free & Pro) */}
                <PricingCards />

                {/* 3. Feature Comparison Matrix Table */}
                <PricingCompareTable />

                {/* 4. Frequently Asked Questions (FAQ) */}
                <PricingFaq />

                {/* 5. Enterprise CTA Banner */}
                <PricingEnterpriseCTA />
            </div>
        </div>
    );
}
