import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import GlobalCursor from "@/components/ui/global-cursor";

import { siteInfo } from "@/data/siteInfo";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#05050f",
};

export const metadata: Metadata = {
    title: `${siteInfo.name} - Stealth Scraping Platform`,
    description: siteInfo.tagline,
    manifest: "/site.webmanifest",
    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/favicon.svg", type: "image/svg+xml" },
            { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="en" className="h-full antialiased" suppressHydrationWarning>
            <body
                className="min-h-full flex flex-col bg-mesh overflow-x-hidden"
                suppressHydrationWarning
            >
                <GlobalCursor />
                <SmoothScrolling>
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                </SmoothScrolling>
            </body>
        </html>
    );
}
