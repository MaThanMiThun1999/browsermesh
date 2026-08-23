"use client";

export default function PluginChangelog() {
    const history = [
        {
            version: "v1.2.4",
            tag: "Latest",
            date: "2 days ago",
            changes: [
                "Improved success rate on product pages",
                "Added support for new Amazon UI",
                "Fixed minor bugs and optimizations",
            ],
        },
        {
            version: "v1.2.3",
            date: "2 weeks ago",
            changes: [
                "Enhanced anti-bot bypass mechanism",
                "Added new parameters for filtering results",
                "Performance improvements",
            ],
        },
        {
            version: "v1.2.2",
            date: "1 month ago",
            changes: [
                "Fixed pagination issue on search results",
                "Updated JSON output structure",
                "Bug fixes and stability improvements",
            ],
        },
    ];

    return (
        <div className="w-full h-full bg-[#080517]/90 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl flex flex-col gap-6">
            <h3 className="text-white font-bold text-lg">Changelog</h3>

            <div className="flex flex-col gap-6 pl-4 border-l-2 border-indigo-500/30 my-auto">
                {history.map((item, idx) => (
                    <div key={idx} className="relative pl-6">
                        {/* Timeline Glowing Node Dot */}
                        <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-[#080517] border-2 border-indigo-500 flex items-center justify-center shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                        </div>

                        <div className="flex items-center gap-2.5 mb-2">
                            <span className="text-white font-bold text-sm">{item.version}</span>
                            {item.tag && (
                                <span className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                                    {item.tag}
                                </span>
                            )}
                            <span className="text-slate-400 text-xs font-mono">{item.date}</span>
                        </div>

                        <ul className="flex flex-col gap-1.5 text-xs text-slate-300">
                            {item.changes.map((c, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 shrink-0" />
                                    <span>{c}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
