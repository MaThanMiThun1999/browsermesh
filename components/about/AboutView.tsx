"use client";

import AboutHero from "./AboutHero";
import AboutStats from "./AboutStats";
import AboutFounderStory from "./AboutFounderStory";
import AboutWhyBuilt from "./AboutWhyBuilt";
import AboutTechStack from "./AboutTechStack";
import AboutTimeline from "./AboutTimeline";
import AboutCommunityCta from "./AboutCommunityCta";

export default function AboutView() {
    return (
        <div className="w-full min-h-screen bg-[#07071a] text-slate-200 pb-24 pt-28 sm:pt-36 relative overflow-hidden">
            {/* Ambient Background Glow Orbs */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-indigo-900/20 via-purple-900/10 to-transparent blur-[140px] pointer-events-none z-0" />
            <div className="fixed top-1/3 left-10 w-96 h-96 bg-purple-600/10 blur-[130px] pointer-events-none z-0" />
            <div className="fixed top-1/2 right-10 w-96 h-96 bg-blue-600/10 blur-[130px] pointer-events-none z-0" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* 1. Hero Header */}
                <AboutHero />

                {/* 2. Key Stats Bar */}
                <AboutStats />

                {/* 3. Founder & Developer Story */}
                <AboutFounderStory />

                {/* 4. Why I Built BrowserMesh */}
                <AboutWhyBuilt />

                {/* 5. Tech Stack */}
                <AboutTechStack />

                {/* 6. The Journey Timeline */}
                <AboutTimeline />

                {/* 7. Bottom Community Banner */}
                <AboutCommunityCta />
            </div>
        </div>
    );
}
