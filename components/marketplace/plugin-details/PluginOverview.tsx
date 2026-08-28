"use client";

import { useState } from "react";
import {
    Target,
    Layers,
    Shield,
    Globe,
    Zap,
    FileText,
    ChevronLeft,
    ChevronRight,
    ScanSearch,
    Monitor,
    MousePointer2,
    PlaySquare,
    CopyCheck,
    Code2,
    Share2,
    Wrench,
    Heading,
    Image as ImageIcon,
} from "lucide-react";
import { MarkdownRenderer } from "@/components/docs/MarkdownRenderer";

export interface PluginFeatureItem {
    title?: string;
    name?: string;
    description?: string;
    desc?: string;
    icon?: string;
}

export interface PluginExampleItem {
    title: string;
    code: string;
    description?: string;
}

export interface PluginOverviewProps {
    description?: string | null;
    readme?: string | null;
    features?: PluginFeatureItem[] | string | unknown;
    examples?: PluginExampleItem[] | string | unknown;
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    ScanSearch,
    Zap,
    Monitor,
    MousePointer2,
    PlaySquare,
    CopyCheck,
    ShieldCheck: Shield,
    Heading,
    Image: ImageIcon,
    Share2,
    Code2,
    Wrench,
    Target,
    Layers,
    Shield,
    Globe,
    FileText,
};

const FEATURE_COLOR_PALETTES = [
    {
        text: "text-blue-400",
        bg: "bg-blue-500/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]",
    },
    {
        text: "text-emerald-400",
        bg: "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
    },
    {
        text: "text-purple-400",
        bg: "bg-purple-500/10 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.2)]",
    },
    {
        text: "text-amber-400",
        bg: "bg-amber-500/10 border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.2)]",
    },
    {
        text: "text-cyan-400",
        bg: "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]",
    },
    {
        text: "text-rose-400",
        bg: "bg-rose-500/10 border-rose-500/30 shadow-[0_0_20px_rgba(244,63,94,0.2)]",
    },
];

const DEFAULT_FEATURES = [
    {
        icon: Target,
        title: "Accurate Data",
        desc: "Get accurate and up-to-date structured information.",
    },
    {
        icon: Layers,
        title: "Pagination Support",
        desc: "Automatically handles pagination for all results.",
    },
    {
        icon: Shield,
        title: "Stealth Bypass",
        desc: "Built-in stealth mode to bypass anti-bot protections.",
    },
    {
        icon: Globe,
        title: "Global Reach",
        desc: "Supports multi-region & localized data extraction.",
    },
    {
        icon: Zap,
        title: "Ultra Fast Engine",
        desc: "Optimized for speed and high execution success rates.",
    },
    {
        icon: FileText,
        title: "Export Ready",
        desc: "Returns clean JSON data, easy to integrate.",
    },
];

export default function PluginOverview({ description, readme, features }: PluginOverviewProps) {
    const [testimonialIdx, setTestimonialIdx] = useState(0);

    const testimonials = [
        {
            quote: "The BrowserMesh plugin ecosystem is incredibly reliable and easy to integrate. Saved us weeks of custom scraper development!",
            author: "Alex Johnson",
            role: "Data Engineer at MarketLens",
        },
        {
            quote: "Built-in stealth engine and SPA JSON extraction work like magic. We pull 50,000+ daily listings seamlessly.",
            author: "Sophia Martinez",
            role: "Head of Analytics at CommercePulse",
        },
        {
            quote: "Clean structured data output and resumable checkpoint support make this plugin worth every single penny.",
            author: "David Chen",
            role: "Lead Developer at ScrapingHub",
        },
    ];

    const parsedFeatures = Array.isArray(features) && features.length > 0 ? features : null;

    const featureCount = parsedFeatures ? parsedFeatures.length : DEFAULT_FEATURES.length;

    // Responsive grid and item span logic
    const getGridConfig = (count: number) => {
        if (count === 1) {
            return { gridClass: "grid-cols-1", getItemSpan: () => "col-span-full" };
        }
        if (count === 2) {
            return { gridClass: "grid-cols-1 sm:grid-cols-2", getItemSpan: () => "" };
        }
        if (count === 4) {
            return {
                gridClass: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
                getItemSpan: (index: number) => (index === 3 ? "sm:col-span-2 md:col-span-3" : ""),
            };
        }
        return {
            gridClass: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
            getItemSpan: (index: number) =>
                count % 3 === 1 && index === count - 1 ? "sm:col-span-2 md:col-span-3" : "",
        };
    };

    const { gridClass, getItemSpan } = getGridConfig(featureCount);

    return (
        <div className="flex flex-col gap-10">
            {/* About / Description Section */}
            {description && (
                <div>
                    <h3 className="text-white font-bold text-lg mb-3">About this plugin</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
                </div>
            )}

            {/* Key Features Grid (Dynamic columns & spans for 2, 4, or N features) */}
            <div>
                <h3 className="text-white font-bold text-lg mb-4">Key Features</h3>
                <div className={`grid ${gridClass} gap-4`}>
                    {parsedFeatures
                        ? parsedFeatures.map((feat: PluginFeatureItem, i: number) => {
                              const IconComponent = (feat.icon && ICON_MAP[feat.icon]) || Zap;
                              const palette =
                                  FEATURE_COLOR_PALETTES[i % FEATURE_COLOR_PALETTES.length];
                              const spanClass = getItemSpan(i);

                              return (
                                  <div
                                      key={i}
                                      className={`bg-[#080517] border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-indigo-500/40 transition-all group ${spanClass}`}
                                  >
                                      <div
                                          className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${palette.bg}`}
                                      >
                                          <IconComponent size={20} className={palette.text} />
                                      </div>
                                      <h4 className="text-white font-bold text-sm group-hover:text-indigo-300 transition-colors">
                                          {feat.title || feat.name}
                                      </h4>
                                      <p className="text-slate-400 text-xs leading-relaxed">
                                          {feat.description || feat.desc}
                                      </p>
                                  </div>
                              );
                          })
                        : DEFAULT_FEATURES.map((feature, i) => {
                              const IconComp = feature.icon;
                              const palette =
                                  FEATURE_COLOR_PALETTES[i % FEATURE_COLOR_PALETTES.length];
                              const spanClass = getItemSpan(i);

                              return (
                                  <div
                                      key={i}
                                      className={`bg-[#080517] border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-indigo-500/40 transition-all group ${spanClass}`}
                                  >
                                      <div
                                          className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${palette.bg}`}
                                      >
                                          <IconComp size={20} className={palette.text} />
                                      </div>
                                      <h4 className="text-white font-bold text-sm group-hover:text-indigo-300 transition-colors">
                                          {feature.title}
                                      </h4>
                                      <p className="text-slate-400 text-xs leading-relaxed">
                                          {feature.desc}
                                      </p>
                                  </div>
                              );
                          })}
                </div>
            </div>

            {/* Readme Markdown Renderer (From API) */}
            {readme && (
                <div className="bg-[#080517]/80 border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
                    <h3 className="text-white font-bold text-xl mb-6 pb-4 border-b border-white/10">
                        README
                    </h3>
                    <MarkdownRenderer content={readme} />
                </div>
            )}

            {/* Testimonials Carousel Box */}
            <div className="bg-gradient-to-br from-[#0c0724] to-[#060314] border border-white/10 rounded-2xl p-6 sm:p-7 relative overflow-hidden">
                <h4 className="text-white font-bold text-sm mb-4">
                    Why developers love this plugin
                </h4>

                <div className="relative min-h-[90px] flex flex-col justify-between">
                    <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed mb-4">
                        &quot;{testimonials[testimonialIdx].quote}&quot;
                    </p>

                    <div className="flex items-center justify-between border-t border-white/10 pt-3">
                        <div className="flex flex-col">
                            <span className="text-white font-bold text-xs">
                                {testimonials[testimonialIdx].author}
                            </span>
                            <span className="text-slate-500 text-[11px]">
                                {testimonials[testimonialIdx].role}
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() =>
                                    setTestimonialIdx((prev) =>
                                        prev === 0 ? testimonials.length - 1 : prev - 1
                                    )
                                }
                                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            <button
                                onClick={() =>
                                    setTestimonialIdx((prev) =>
                                        prev === testimonials.length - 1 ? 0 : prev + 1
                                    )
                                }
                                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
