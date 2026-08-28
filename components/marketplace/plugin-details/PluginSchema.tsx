"use client";

import { useState } from "react";
import {
    FileSpreadsheet,
    Download,
    ExternalLink,
    Hash,
    Table2,
    Layers,
    Code,
    Copy,
    Check,
    Rows,
} from "lucide-react";

export interface SchemaFieldInput {
    type: string;
    label?: string;
    required?: boolean;
    hint?: string;
    placeholder?: string;
    default?: unknown;
    description?: string;
}

export interface PluginSchemaProps {
    sampleOutput?: Record<string, unknown>[] | null;
    inputSchema?: Record<string, SchemaFieldInput> | null;
}

function isUrl(value: string): boolean {
    return (
        typeof value === "string" && (value.startsWith("http://") || value.startsWith("https://"))
    );
}

// Utility to recursively flatten a nested object for "Flattened Columns" view
function flattenObject(obj: Record<string, unknown>, prefix = ""): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;
        if (value !== null && typeof value === "object" && !Array.isArray(value)) {
            Object.assign(result, flattenObject(value as Record<string, unknown>, newKey));
        } else {
            result[newKey] = value;
        }
    }
    return result;
}

// Helper to render nested object as a mini inline sub-table
function MiniObjectTable({ data }: { data: Record<string, unknown> }) {
    const entries = Object.entries(data);
    if (entries.length === 0) {
        return <span className="text-slate-500 font-mono text-[11px] italic">Empty object</span>;
    }

    return (
        <div className="my-1 max-w-[320px] overflow-hidden rounded-lg border border-indigo-500/25 bg-indigo-950/40 text-[11px] shadow-sm">
            <table className="w-full border-collapse text-left">
                <tbody>
                    {entries.map(([k, v]) => (
                        <tr
                            key={k}
                            className="border-b border-indigo-500/10 last:border-0 hover:bg-indigo-500/10"
                        >
                            <td className="border-r border-indigo-500/15 bg-indigo-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold tracking-wider whitespace-nowrap text-indigo-300 uppercase">
                                {k}
                            </td>
                            <td className="px-2.5 py-1 font-mono font-medium whitespace-nowrap text-indigo-100">
                                {typeof v === "boolean" ? (
                                    <span
                                        className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase ${
                                            v ? "text-emerald-400" : "text-rose-400"
                                        }`}
                                    >
                                        <span
                                            className={`h-1.5 w-1.5 rounded-full ${
                                                v ? "bg-emerald-400" : "bg-rose-400"
                                            }`}
                                        />
                                        {v ? "True" : "False"}
                                    </span>
                                ) : typeof v === "number" ? (
                                    <span className="font-semibold text-amber-300">{v}</span>
                                ) : isUrl(String(v)) ? (
                                    <a
                                        href={String(v)}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-indigo-400 text-[10px] hover:underline"
                                    >
                                        {String(v).replace(/^https?:\/\//, "")}
                                    </a>
                                ) : typeof v === "object" && v !== null ? (
                                    <span className="text-[10px] text-indigo-300/70">
                                        {JSON.stringify(v)}
                                    </span>
                                ) : (
                                    <span>{String(v ?? "—")}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// Helper to render nested array as mini sub-table / list
function MiniArrayTable({ data }: { data: unknown[] }) {
    if (data.length === 0) {
        return <span className="text-slate-500 font-mono text-[11px] italic">Empty array</span>;
    }

    return (
        <div className="my-1 max-w-[320px] overflow-hidden rounded-lg border border-purple-500/25 bg-purple-950/40 text-[11px] shadow-sm">
            <table className="w-full border-collapse text-left">
                <tbody>
                    {data.map((item, idx) => (
                        <tr
                            key={idx}
                            className="border-b border-purple-500/10 last:border-0 hover:bg-purple-500/10"
                        >
                            <td className="w-7 border-r border-purple-500/15 bg-purple-500/10 px-2 py-0.5 text-center font-mono text-[10px] font-bold text-purple-300 select-none">
                                #{idx + 1}
                            </td>
                            <td className="px-2.5 py-1 font-mono font-medium whitespace-nowrap text-purple-100">
                                {typeof item === "object" && item !== null ? (
                                    <span className="text-[10px] text-purple-300">
                                        {JSON.stringify(item)}
                                    </span>
                                ) : (
                                    <span>{String(item)}</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function CellValue({ value }: { value: unknown }) {
    if (value === null || value === undefined) {
        return <span className="text-slate-500 font-mono text-[11px] italic">—</span>;
    }

    if (Array.isArray(value)) {
        return <MiniArrayTable data={value} />;
    }

    if (typeof value === "object" && value !== null) {
        return <MiniObjectTable data={value as Record<string, unknown>} />;
    }

    const strVal = String(value);

    if (isUrl(strVal)) {
        return (
            <a
                href={strVal}
                target="_blank"
                rel="noopener noreferrer"
                title={strVal}
                className="text-indigo-400 hover:text-indigo-300 inline-flex max-w-[240px] items-center gap-1 font-mono text-[11px] transition-colors"
            >
                <ExternalLink className="h-3 w-3 shrink-0 opacity-70" />
                <span className="truncate underline underline-offset-2 opacity-90">
                    {strVal.replace(/^https?:\/\//, "")}
                </span>
            </a>
        );
    }

    if (typeof value === "number") {
        return (
            <span className="inline-flex h-6 items-center justify-center rounded-md border border-amber-500/30 bg-amber-500/10 px-2 font-mono text-[11px] font-semibold text-amber-300 tabular-nums">
                {value}
            </span>
        );
    }

    if (typeof value === "boolean") {
        return (
            <span
                className={`inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-[10px] font-bold tracking-wider uppercase ${
                    value
                        ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-400"
                        : "border-rose-500/30 bg-rose-500/15 text-rose-400"
                }`}
            >
                <span
                    className={`h-1.5 w-1.5 rounded-full ${
                        value ? "bg-emerald-400" : "bg-rose-400"
                    }`}
                />
                {String(value)}
            </span>
        );
    }

    if (/^[a-z]+\/[a-z]+/.test(strVal)) {
        return (
            <span className="inline-flex h-6 items-center rounded-md border border-purple-500/30 bg-purple-500/10 px-2 font-mono text-[11px] text-purple-300">
                {strVal}
            </span>
        );
    }

    if (!strVal) {
        return <span className="text-slate-500 font-mono text-[11px] italic">—</span>;
    }

    return (
        <span className="text-slate-200 block max-w-[240px] truncate text-[12px]" title={strVal}>
            {strVal}
        </span>
    );
}

// Fallback sample data array aligned with cloud_backend/scraper_backend PostgreSQL JSONB
const DEFAULT_SAMPLE_OUTPUT = [
    {
        title: "Apple iPhone 15 Pro Max (256 GB) - Natural Titanium",
        price: 1199.0,
        currency: "USD",
        availability: true,
        rating: 4.6,
        reviewCount: 12456,
        brand: "Apple",
        category: "Electronics > Mobiles",
        seller: "Amazon.com",
        image: "https://m.media-amazon.com/images/I/71...jpg",
        url: "https://www.amazon.com/dp/B0CHX1W1XY",
        attributes: {
            color: "Natural Titanium",
            storage: "256 GB",
            model: "iPhone 15 Pro Max",
            inStock: true,
        },
        features: ["A17 Pro chip", "Titanium design", "48MP Main camera"],
        scrapedAt: "2026-08-23T18:40:00.000Z",
    },
    {
        title: "Apple iPhone 15 (128 GB) - Blue",
        price: 799.0,
        currency: "USD",
        availability: true,
        rating: 4.7,
        reviewCount: 8920,
        brand: "Apple",
        category: "Electronics > Mobiles",
        seller: "Amazon.com",
        image: "https://m.media-amazon.com/images/I/71...jpg",
        url: "https://www.amazon.com/dp/B0CHX2W2YY",
        attributes: {
            color: "Blue",
            storage: "128 GB",
            model: "iPhone 15",
            inStock: true,
        },
        features: ["Dynamic Island", "48MP Main camera", "USB-C"],
        scrapedAt: "2026-08-23T18:41:00.000Z",
    },
    {
        title: "Apple Watch Series 9 GPS 45mm",
        price: 429.0,
        currency: "USD",
        availability: false,
        rating: 4.8,
        reviewCount: 3410,
        brand: "Apple",
        category: "Electronics > Smartwatches",
        seller: "Apple Store Amazon",
        image: "https://m.media-amazon.com/images/I/71...jpg",
        url: "https://www.amazon.com/dp/B0CHX3W3ZZ",
        attributes: {
            color: "Midnight",
            size: "45mm",
            model: "Series 9",
            inStock: false,
        },
        features: ["S9 SiP chip", "Double tap gesture", "Brighter display"],
        scrapedAt: "2026-08-23T18:42:00.000Z",
    },
];

// Fallback parameter schema matching backend PluginContract.ts PluginSchema
const DEFAULT_INPUT_SCHEMA: Record<string, SchemaFieldInput> = {
    keyword: {
        type: "string",
        label: "Search Keyword",
        required: true,
        description: "Search term or product keyword",
    },
    marketplace: {
        type: "string",
        label: "Amazon Marketplace",
        required: true,
        description: "Amazon marketplace domain (e.g., amazon.com)",
    },
    maxPages: {
        type: "number",
        label: "Max Pages",
        required: false,
        default: 1,
        description: "Max pages to scrape (default: 1)",
    },
    sortBy: {
        type: "select",
        label: "Sort By",
        required: false,
        description: "Sort by: price_asc, price_desc, rating",
    },
    minRating: {
        type: "number",
        label: "Minimum Rating",
        required: false,
        description: "Minimum product rating (1-5)",
    },
};

export default function PluginSchema({
    sampleOutput: rawSampleOutput,
    inputSchema: rawInputSchema,
}: PluginSchemaProps) {
    const [viewMode, setViewMode] = useState<"nested" | "flat" | "json">("nested");
    const [copied, setCopied] = useState(false);

    const sampleOutput =
        rawSampleOutput && rawSampleOutput.length > 0 ? rawSampleOutput : DEFAULT_SAMPLE_OUTPUT;

    const inputSchema =
        rawInputSchema && Object.keys(rawInputSchema).length > 0
            ? rawInputSchema
            : DEFAULT_INPUT_SCHEMA;

    const displayData =
        viewMode === "flat"
            ? sampleOutput.map((row) => flattenObject(row as Record<string, unknown>))
            : sampleOutput;

    const columns = Object.keys(displayData[0] || {});

    const handleCopyAllJSON = () => {
        navigator.clipboard.writeText(JSON.stringify(sampleOutput, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleExport = (format: "json" | "csv" | "html") => {
        let content: string;
        let mimeType: string;
        let ext: string;

        if (format === "json") {
            content = JSON.stringify(sampleOutput, null, 2);
            mimeType = "application/json";
            ext = "json";
        } else if (format === "html") {
            const header = `<tr>${columns.map((c) => `<th><pre>${c}</pre></th>`).join("")}</tr>`;
            const rows = displayData.map((rawRow) => {
                const row = rawRow as Record<string, unknown>;
                return `<tr>${columns
                    .map((col) => {
                        const val = row[col] ?? "";
                        const rawStr =
                            typeof val === "object" && val !== null
                                ? JSON.stringify(val)
                                : String(val);
                        const str = rawStr
                            .replace(/&/g, "&amp;")
                            .replace(/</g, "&lt;")
                            .replace(/>/g, "&gt;")
                            .replace(/"/g, "&quot;")
                            .replace(/'/g, "&#039;");
                        return `<td><pre>${str}</pre></td>`;
                    })
                    .join("")}</tr>`;
            });
            const htmlStyle = `
  <style>
    body { margin: 0; font-family: sans-serif; background: #07071a; color: #fff; }
    table { border-collapse: collapse; border-spacing: 0; border: solid 1px rgba(255,255,255,0.1); font-size: 12px; width: 100%; }
    th { position: sticky; top: -1px; background-color: #0f0a28; color: #a5b4fc; }
    th, td { padding: 8px; border: solid 1px rgba(255,255,255,0.1); text-align: left; }
    td { vertical-align: top; }
    th pre, td pre { font-family: monospace !important; margin: 0; white-space: pre-wrap; }
    tbody>tr:nth-of-type(odd) { background-color: rgba(255,255,255,0.02); }
  </style>
`;
            content = `<!DOCTYPE html>\n<html>\n<head>\n<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n<title>Sample Output Preview</title>\n${htmlStyle}</head>\n<body>\n<table>\n<thead>\n${header}\n</thead>\n<tbody>\n${rows.join("\n")}\n</tbody>\n</table>\n</body>\n</html>`;
            mimeType = "text/html";
            ext = "html";
        } else {
            const header = columns.join(",");
            const rows = displayData.map((rawRow) => {
                const row = rawRow as Record<string, unknown>;
                return columns
                    .map((col) => {
                        const val = row[col] ?? "";
                        const str =
                            typeof val === "object" && val !== null
                                ? JSON.stringify(val)
                                : String(val);
                        return str.includes(",") || str.includes('"')
                            ? `"${str.replace(/"/g, '""')}"`
                            : str;
                    })
                    .join(",");
            });
            content = [header, ...rows].join("\n");
            mimeType = "text/csv";
            ext = "csv";
        }

        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `plugin-sample-data.${ext}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col gap-10">
            {/* 1. Rich Sample Output Container */}
            <div className="bg-[#080517]/90 border border-white/10 overflow-hidden rounded-3xl shadow-2xl backdrop-blur-xl">
                {/* Header */}
                <div className="flex flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 border-b border-white/10 bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-transparent">
                    <div className="flex items-start gap-3">
                        <div className="bg-indigo-500/10 border border-indigo-500/20 mt-0.5 shrink-0 rounded-xl p-2.5">
                            <FileSpreadsheet className="text-indigo-400 h-5 w-5" />
                        </div>
                        <div>
                            <div className="font-mono text-indigo-400 mb-0.5 text-[10px] tracking-widest uppercase font-semibold">
                                Sample Output
                            </div>
                            <h2 className="text-white text-lg leading-tight font-bold">
                                Live Execution Preview
                            </h2>
                            <p className="text-slate-400 mt-0.5 text-[12px]">
                                {sampleOutput.length} record{sampleOutput.length !== 1 ? "s" : ""} ·{" "}
                                {columns.length} {viewMode === "flat" ? "flattened" : "nested"}{" "}
                                field{columns.length !== 1 ? "s" : ""} · real execution preview
                            </p>
                        </div>
                    </div>

                    {/* Action Controls Toolbar */}
                    <div className="flex w-full flex-col sm:flex-row sm:w-auto items-center gap-3">
                        {/* View Mode Segmented Control */}
                        <div className="bg-white/5 border border-white/10 flex w-full sm:w-auto items-center rounded-xl p-1 shadow-inner">
                            <button
                                type="button"
                                onClick={() => setViewMode("nested")}
                                title="Nested Sub-Tables View"
                                className={`flex flex-1 sm:flex-none cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all ${
                                    viewMode === "nested"
                                        ? "bg-[#4c35e6] text-white font-bold shadow-md"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <Table2 className="h-3.5 w-3.5 shrink-0" />
                                <span className="whitespace-nowrap">Sub-Tables</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setViewMode("flat")}
                                title="Flattened Columns View"
                                className={`flex flex-1 sm:flex-none cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all ${
                                    viewMode === "flat"
                                        ? "bg-[#4c35e6] text-white font-bold shadow-md"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <Layers className="h-3.5 w-3.5 shrink-0" />
                                <span className="whitespace-nowrap">Flattened</span>
                            </button>

                            <button
                                type="button"
                                onClick={() => setViewMode("json")}
                                title="Raw JSON View"
                                className={`flex flex-1 sm:flex-none cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all ${
                                    viewMode === "json"
                                        ? "bg-[#4c35e6] text-white font-bold shadow-md"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <Code className="h-3.5 w-3.5 shrink-0" />
                                <span className="whitespace-nowrap">JSON</span>
                            </button>
                        </div>

                        {/* Export Control Group */}
                        <div className="bg-white/5 border border-white/10 flex w-full sm:w-auto items-center gap-1 rounded-xl p-1">
                            <button
                                onClick={() => handleExport("csv")}
                                className="text-slate-300 hover:text-white hover:bg-white/5 flex flex-1 sm:flex-none cursor-pointer items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase transition-all"
                            >
                                <Download className="h-3 w-3 shrink-0" />
                                CSV
                            </button>
                            <button
                                onClick={() => handleExport("html")}
                                className="text-slate-300 hover:text-white hover:bg-white/5 flex flex-1 sm:flex-none cursor-pointer items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase transition-all"
                            >
                                <Download className="h-3 w-3 shrink-0" />
                                HTML
                            </button>
                            <button
                                onClick={() => handleExport("json")}
                                className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30 flex flex-1 sm:flex-none cursor-pointer items-center justify-center gap-1 rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase transition-all"
                            >
                                <Download className="h-3 w-3 shrink-0" />
                                JSON
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Body */}
                {viewMode === "json" ? (
                    <div className="bg-[#04020a] p-4">
                        <div className="mb-3 flex items-center justify-between px-1">
                            <span className="font-mono text-xs font-semibold text-indigo-300">
                                Raw Sample JSON Output
                            </span>
                            <button
                                type="button"
                                onClick={handleCopyAllJSON}
                                className="text-slate-300 hover:text-white border border-white/10 hover:bg-white/5 flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1 font-mono text-xs transition-colors"
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                                        <span className="font-bold text-emerald-400">Copied!</span>
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3.5 w-3.5" />
                                        <span>Copy JSON</span>
                                    </>
                                )}
                            </button>
                        </div>
                        <pre className="border border-white/10 max-h-[500px] overflow-x-auto rounded-2xl bg-black/60 p-4 font-mono text-xs leading-relaxed text-indigo-200">
                            {JSON.stringify(sampleOutput, null, 2)}
                        </pre>
                    </div>
                ) : (
                    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-500/20">
                        <table className="w-full border-collapse text-left text-xs">
                            <thead>
                                <tr className="bg-white/[0.03] border-b border-white/10">
                                    <th
                                        className="border-r border-white/10 bg-white/[0.05] text-center select-none"
                                        style={{ width: 44, minWidth: 44, padding: "10px 0" }}
                                    >
                                        <Hash className="text-slate-500 mx-auto h-3 w-3" />
                                    </th>
                                    {columns.map((col, i) => (
                                        <th
                                            key={col}
                                            className={`text-slate-300 align-middle text-[11px] font-semibold whitespace-nowrap ${
                                                i < columns.length - 1
                                                    ? "border-r border-white/10"
                                                    : ""
                                            }`}
                                            style={{ padding: "10px 14px" }}
                                        >
                                            <span className="inline-flex items-center gap-1.5 font-mono">
                                                <span className="bg-indigo-500 h-1.5 w-1.5 shrink-0 rounded-full" />
                                                {col}
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-white/5">
                                {displayData.map((rawRow, rowIdx) => {
                                    const row = rawRow as Record<string, unknown>;
                                    return (
                                        <tr
                                            key={rowIdx}
                                            className="hover:bg-indigo-500/[0.03] transition-colors"
                                        >
                                            <td
                                                className="border-r border-white/10 font-mono text-slate-500 bg-[#070514] text-center align-top select-none"
                                                style={{
                                                    width: 44,
                                                    minWidth: 44,
                                                    padding: "12px 0",
                                                }}
                                            >
                                                <span>{rowIdx + 1}</span>
                                            </td>

                                            {columns.map((col, i) => (
                                                <td
                                                    key={col}
                                                    className={`align-top ${
                                                        i < columns.length - 1
                                                            ? "border-r border-white/5"
                                                            : ""
                                                    }`}
                                                    style={{ padding: "10px 14px", maxWidth: 360 }}
                                                >
                                                    <CellValue value={row[col]} />
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Footer */}
                <div className="border-t border-white/10 bg-white/[0.02] flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6">
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1.5">
                            <Rows className="h-3.5 w-3.5" />
                            <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
                                {sampleOutput.length} record{sampleOutput.length !== 1 ? "s" : ""}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Hash className="h-3.5 w-3.5" />
                            <span className="font-mono text-[10px] tracking-wider uppercase font-semibold">
                                {columns.length} field{columns.length !== 1 ? "s" : ""} ({viewMode})
                            </span>
                        </div>
                    </div>
                    <span className="font-mono text-slate-500 text-[10px] tracking-widest uppercase">
                        Sample preview
                    </span>
                </div>
            </div>

            {/* 2. Input Parameters Table (Mapped dynamically from Backend PluginContract PluginSchema) */}
            <div>
                <h2 className="text-white font-bold text-lg mb-3">Input Parameters</h2>
                <div className="bg-[#080517] border border-white/10 rounded-2xl overflow-x-auto shadow-xl w-full scrollbar-thin scrollbar-thumb-indigo-500/20">
                    <table className="w-full min-w-[540px] text-left text-xs sm:text-sm">
                        <thead className="bg-white/[0.03] border-b border-white/10 text-slate-400 font-semibold">
                            <tr>
                                <th className="p-3 sm:p-4 whitespace-nowrap">Parameter</th>
                                <th className="p-3 sm:p-4 whitespace-nowrap">Type</th>
                                <th className="p-3 sm:p-4 whitespace-nowrap">Required</th>
                                <th className="p-3 sm:p-4">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-slate-300 font-mono text-xs">
                            {Object.entries(inputSchema).map(([key, field]) => (
                                <tr key={key}>
                                    <td className="p-3 sm:p-4 text-indigo-300 font-semibold whitespace-nowrap">
                                        {key}
                                    </td>
                                    <td className="p-3 sm:p-4 text-slate-400 whitespace-nowrap">
                                        {field.type}
                                    </td>
                                    <td
                                        className={`p-3 sm:p-4 font-semibold whitespace-nowrap ${
                                            field.required ? "text-emerald-400" : "text-slate-500"
                                        }`}
                                    >
                                        {field.required ? "Yes" : "No"}
                                    </td>
                                    <td className="p-3 sm:p-4 font-sans text-slate-400 min-w-[220px]">
                                        {field.description ||
                                            field.hint ||
                                            field.label ||
                                            "No description provided"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
