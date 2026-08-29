import { getAllDocs } from "@/utils/markdown";
import { DocsSidebar } from "@/components/docs/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
    const docs = getAllDocs();

    return (
        <div className="max-w-7xl mx-auto w-full flex items-start gap-4 sm:gap-8 px-3 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-8 sm:pb-16 selection:bg-indigo-500/30">
            <DocsSidebar docs={docs} />
            <div className="flex-1 min-w-0 max-w-3xl">{children}</div>
        </div>
    );
}
