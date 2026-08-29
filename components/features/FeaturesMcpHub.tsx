"use client";

import { Bot, Cpu, Sparkles, ArrowRight, CheckCircle2, Code2 } from "lucide-react";
import Link from "next/link";

export default function FeaturesMcpHub() {
    const aiCapabilities = [
        {
            title: "Model Context Protocol (MCP) Standard",
            desc: "Plug BrowserMesh straight into Claude Desktop, Cursor, Zed, or any MCP client as a standard native tool for autonomous agents.",
        },
        {
            title: "Token-Optimized Markdown & Clean JSON",
            desc: "Raw HTML wastes 90% of LLM context windows. BrowserMesh automatically strips boilerplate, scripts, and CSS, emitting clean, dense Markdown tailored for GPT-4o, Claude 3.5, and DeepSeek.",
        },
        {
            title: "Autonomous Multi-Step Interactions",
            desc: "Instruct AI agents to log into dashboards, paginate complex dynamic grids, click filters, and bypass Turnstile puzzles without writing brittle Selenium/Puppeteer scripts.",
        },
    ];

    const mcpConfigCode = `{
  "mcpServers": {
    "browsermesh": {
      "command": "npx",
      "args": ["-y", "@browsermesh/mcp-server", "--stealth=true"],
      "env": {
        "BROWSERMESH_API_KEY": "bm_live_xxxxxxxxxxxxxxxx"
      }
    }
  }
}`;

    return (
        <div className="glass-framer rounded-2xl sm:rounded-3xl p-4 sm:p-10 relative z-10 mb-14 sm:mb-28 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-purple-500/20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                {/* Left Code Showcase */}
                <div className="lg:col-span-6 flex flex-col gap-4 order-2 lg:order-1">
                    <div className="rounded-xl sm:rounded-2xl bg-[#09071a] border border-purple-500/30 overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.15)] font-mono text-[10px] sm:text-xs">
                        <div className="bg-[#120e2e] px-3 py-2 sm:px-4 sm:py-3 border-b border-white/10 flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                                <span className="text-slate-400 text-[10px] sm:text-[11px] ml-1 sm:ml-2 flex items-center gap-1">
                                    <Code2 size={11} className="text-purple-400 shrink-0" />
                                    <span className="hidden xs:inline sm:inline">claude_desktop_config.json</span>
                                    <span className="xs:hidden sm:hidden">mcp_config.json</span>
                                </span>
                            </div>
                            <span className="text-[9px] sm:text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full font-sans font-semibold shrink-0 whitespace-nowrap">
                                MCP READY
                            </span>
                        </div>

                        <div className="p-3 sm:p-5 text-slate-300 overflow-x-auto leading-normal sm:leading-relaxed">
                            <pre className="text-purple-300 text-[9.5px] sm:text-xs">{mcpConfigCode}</pre>
                            <div className="mt-3 pt-3 sm:mt-4 sm:pt-4 border-t border-white/10 text-[10px] sm:text-[11px] space-y-1.5 sm:space-y-2">
                                <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
                                    <Sparkles size={12} className="text-emerald-400 shrink-0" />
                                    AI Agent Capabilities Unlocked:
                                </div>
                                <div className="text-slate-400 pl-2 sm:pl-4">
                                    • <code className="text-cyan-300 font-bold">browsermesh_scrape_markdown</code>: Context extraction
                                </div>
                                <div className="text-slate-400 pl-2 sm:pl-4">
                                    • <code className="text-cyan-300 font-bold">browsermesh_solve_turnstile</code>: Anti-bot stealth proxy
                                </div>
                                <div className="text-slate-400 pl-2 sm:pl-4">
                                    • <code className="text-cyan-300 font-bold">browsermesh_execute_plugin</code>: Run 250+ scrapers
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Content */}
                <div className="lg:col-span-6 flex flex-col items-start text-left order-1 lg:order-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-4 flex-wrap">
                        <span className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.2)] flex items-center gap-1.5">
                            <Bot size={11} className="text-purple-400" />
                            AI AGENT INFRASTRUCTURE
                        </span>
                        <span className="bg-white/5 text-slate-300 border border-white/10 text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                            Model Context Protocol (MCP)
                        </span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3 sm:mb-4">
                        Turn Any LLM into an <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Autonomous Web Scraping Agent</span>
                    </h2>

                    <p className="text-slate-300 text-xs sm:text-base leading-relaxed mb-4 sm:mb-6">
                        Empower Claude, GPT-4, Cursor, and LangChain/CrewAI agents with live web browsing capabilities. BrowserMesh solves Cloudflare challenges, renders client-side SPAs, and returns pristine structured data directly into the agent prompt context.
                    </p>

                    <div className="space-y-2.5 sm:space-y-4 w-full mb-5 sm:mb-8">
                        {aiCapabilities.map((item, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 sm:gap-3.5 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/5 hover:border-purple-500/30 transition-colors">
                                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <CheckCircle2 size={14} className="text-purple-400 sm:w-4 sm:h-4" />
                                </div>
                                <div>
                                    <h3 className="text-xs sm:text-sm font-bold text-white mb-0.5">{item.title}</h3>
                                    <p className="text-[11px] sm:text-xs text-slate-400 leading-normal sm:leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 w-full sm:w-auto">
                        <Link
                            href="/blog/mcp-ai-agent-web-scraping-guide"
                            className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl sm:rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.35)] transition-all hover:scale-105 w-full sm:w-auto"
                        >
                            <Cpu size={15} /> Read MCP Integration Guide
                        </Link>
                        <Link
                            href="/docs/getting-started"
                            className="text-xs sm:text-sm text-slate-300 hover:text-white font-medium flex items-center justify-center gap-1.5 py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors w-full sm:w-auto"
                        >
                            SDK Quickstart <ArrowRight size={13} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
