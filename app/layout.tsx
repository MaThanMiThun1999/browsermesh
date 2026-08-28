import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScrolling from "@/components/layout/SmoothScrolling";
import GlobalCursor from "@/components/ui/global-cursor";

import { siteInfo } from "@/data/siteInfo";
import { envConfig } from "@/data/envConfig";

const inter = Inter({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-inter",
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-jetbrains-mono",
    display: "swap",
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#05050f",
};

export const metadata: Metadata = {
    metadataBase: new URL(envConfig.siteUrl),
    alternates: {
        canonical: "./",
    },
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
    openGraph: {
        title: `${siteInfo.name} - Stealth Scraping Platform`,
        description: siteInfo.tagline,
        url: envConfig.siteUrl,
        siteName: siteInfo.name,
        images: [
            {
                url: "/opengraph-img.png",
                width: 1200,
                height: 630,
                alt: `${siteInfo.name} Stealth Scraping Platform`,
            },
        ],
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: `${siteInfo.name} - Stealth Scraping Platform`,
        description: siteInfo.tagline,
        images: ["/opengraph-img.png"],
    },
};

import { SettingsProvider } from "@/context/SettingsContext";

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`h-full antialiased ${inter.variable} ${jetbrainsMono.variable}`}
            suppressHydrationWarning
        >
            <head>
                <link rel="preconnect" href="https://dzaw5b2mobklq.cloudfront.net" />
                <link rel="dns-prefetch" href="https://dzaw5b2mobklq.cloudfront.net" />
            </head>
            <body
                className="min-h-full flex flex-col bg-mesh overflow-x-hidden"
                suppressHydrationWarning
            >
                <SettingsProvider>
                    <GlobalCursor />
                    <SmoothScrolling>
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </SmoothScrolling>
                </SettingsProvider>
            </body>
        </html>
    );
}
