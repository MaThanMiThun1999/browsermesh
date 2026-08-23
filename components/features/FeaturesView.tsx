"use client";

import FeaturesHero from "./FeaturesHero";
import FeaturesStats from "./FeaturesStats";
import FeaturesCapabilities from "./FeaturesCapabilities";
import FeaturesPerformanceShowcase from "./FeaturesPerformanceShowcase";
import FeaturesDeveloperShowcase from "./FeaturesDeveloperShowcase";
import FeaturesCtaBanner from "./FeaturesCtaBanner";

export default function FeaturesView() {
    return (
        <div className="w-full min-h-screen bg-[#07071a] text-slate-200 pb-24 pt-28 sm:pt-36 relative overflow-hidden">
            {/* Ambient Background Glow Orbs */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent blur-[140px] pointer-events-none z-0" />
            <div className="fixed top-1/3 left-10 w-96 h-96 bg-purple-600/10 blur-[130px] pointer-events-none z-0" />
            <div className="fixed top-1/2 right-10 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* 1. Hero Header */}
                <FeaturesHero />

                {/* 2. Key Metrics Stats Bar */}
                <FeaturesStats />

                {/* 3. Core Capabilities Grid */}
                <FeaturesCapabilities />

                {/* 4. Built for Performance Showcase */}
                <FeaturesPerformanceShowcase />

                {/* 5. Developer First SDK Showcase */}
                <FeaturesDeveloperShowcase />

                {/* 6. Bottom CTA Banner */}
                <FeaturesCtaBanner />
            </div>
        </div>
    );
}
