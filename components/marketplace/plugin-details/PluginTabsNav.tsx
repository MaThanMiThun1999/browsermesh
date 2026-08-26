"use client";

export type PluginTabType = "overview" | "readme" | "schema" | "reviews" | "changelog";

interface PluginTabsNavProps {
    activeTab: PluginTabType;
    onTabChange: (tab: PluginTabType) => void;
    reviewCount?: number;
}

const formatCountBadge = (count?: number) => {
    if (count === undefined || count === null) return undefined;
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return `${count}`;
};

export default function PluginTabsNav({ activeTab, onTabChange, reviewCount }: PluginTabsNavProps) {
    const badgeText = formatCountBadge(reviewCount);

    const tabs = [
        { id: "overview", label: "Overview" },
        { id: "readme", label: "README" },
        { id: "schema", label: "Data & Schema" },
        { id: "reviews", label: "Reviews", badge: badgeText },
        { id: "changelog", label: "Changelog" },
    ];

    return (
        <div className="border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-8 min-w-max">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id as PluginTabType)}
                            className={`py-3.5 text-sm font-semibold transition-all relative flex items-center gap-2 cursor-pointer ${
                                isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                            }`}
                        >
                            <span>{tab.label}</span>
                            {tab.badge !== undefined && (
                                <span className="bg-white/10 text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-bold">
                                    {tab.badge}
                                </span>
                            )}
                            {isActive && (
                                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-[0_0_12px_rgba(99,102,241,0.8)]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
