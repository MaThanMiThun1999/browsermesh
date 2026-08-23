import { envConfig } from "./envConfig";

export const siteInfo = {
    name: envConfig.siteName,
    tagline: "The ultimate cross-platform stealth scraping ecosystem.",
    description: "Enterprise-Grade Stealth Scraping Platform. Join thousands of professionals using BrowserMesh for unlimited, undetected data extraction.",
    url: envConfig.siteUrl,
    links: {
        twitter: "https://twitter.com/",
        github: "https://github.com/",
        discord: "https://discord.com/",
        youtube: "https://youtube.com/"
    },
    contact: {
        email: "hello@browsermesh.in"
    }
};
