import { getAllDocs } from "@/utils/markdown";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import Header from "@/components/layout/Header";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const docs = getAllDocs();

    return (
        <div className="min-h-screen bg-[#050312] flex flex-col font-sans selection:bg-indigo-500/30">
            <Header />
            <div className="flex-1 max-w-7xl mx-auto w-full flex items-start gap-8 px-4 sm:px-6 lg:px-8 pt-28 pb-16">
                <DocsSidebar docs={docs} />
                <main className="flex-1 min-w-0 max-w-3xl">{children}</main>
            </div>
        </div>
    );
}
