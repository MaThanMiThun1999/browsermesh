import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
    title: "Download BrowserMesh | Windows, Linux & Android 4G/5G Node",
    description:
        "Download BrowserMesh for Windows (.exe), Linux (.deb), and Android (.apk). Harness multi-platform stealth web scraping with free 4G/5G mobile residential proxy nodes.",
    path: "/download",
});

export default function DownloadLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
