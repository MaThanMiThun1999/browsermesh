"use client";

import { formatRelativeTime } from "@/utils/date";

export interface PluginChangelogProps {
    createdAt?: string | null;
    versions?: Array<{
        id: string;
        version: string;
        changelog: string | null;
        createdAt?: string | null;
    }>;
}

export default function PluginChangelog({ createdAt, versions }: PluginChangelogProps) {
    const list =
        Array.isArray(versions) && versions.length > 0
            ? versions.map((v, i) => {
                  const rawDate = v.createdAt || createdAt;
                  let formattedDate = rawDate ? formatRelativeTime(rawDate) : "Recently released";
                  if (formattedDate === "Invalid Date") {
                      formattedDate = "Recently released";
                  }
                  return {
                      version: v.version.startsWith("v") ? v.version : `v${v.version}`,
                      tag: i === 0 ? "Latest" : undefined,
                      date: formattedDate,
                      changelog: v.changelog || "Initial plugin release & bug fixes.",
                  };
              })
            : [
                  {
                      version: "v1.0.0",
                      tag: "Latest",
                      date: createdAt ? formatRelativeTime(createdAt) : "Recently released",
                      changelog: "Initial plugin release.",
                  },
              ];

    return (
        <div className="w-full h-full bg-[#080517]/90 border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl flex flex-col gap-6">
            <h3 className="text-white font-bold text-lg">Changelog</h3>

            <div className="flex flex-col gap-6 pl-4 border-l-2 border-indigo-500/30 my-auto">
                {list.map((item, idx) => (
                    <div key={idx} className="relative flex flex-col gap-2 group">
                        {/* Timeline Bullet */}
                        <div className="absolute -left-[25px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-[#080517] group-hover:scale-125 transition-transform" />

                        <div className="flex items-center gap-3">
                            <span className="text-white font-bold text-sm sm:text-base font-mono">
                                {item.version}
                            </span>
                            {item.tag && (
                                <span className="bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    {item.tag}
                                </span>
                            )}
                            <span className="text-slate-500 text-xs ml-auto">{item.date}</span>
                        </div>

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed bg-white/[0.02] border border-white/5 rounded-xl p-3.5 mt-1">
                            {item.changelog}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
