export interface NavigationLink {
    label: string;
    path: string;
}

export const navigationLinks: NavigationLink[] = [
    { label: "Home", path: "/" },
    { label: "Features", path: "/features" },
    { label: "About Us", path: "/about" },
    { label: "Marketplace", path: "/marketplace" },
    { label: "Pricing", path: "/pricing" },
    { label: "Blog", path: "/blog" },
    { label: "Docs", path: "/docs/getting-started" },
];

export interface FooterLinkGroup {
    title: string;
    links: NavigationLink[];
}

export const footerLinks: FooterLinkGroup[] = [
    {
        title: "Popular Scrapers",
        links: [
            { label: "Google Maps Scraper", path: "/marketplace" },
            { label: "Amazon Product Scraper", path: "/marketplace/amazon-product-scraper" },
            { label: "LinkedIn Lead Extractor", path: "/marketplace" },
            { label: "Twitter / X Post Scraper", path: "/marketplace" },
            { label: "Turnstile Bypass Node", path: "/marketplace" },
        ],
    },
    {
        title: "Platforms & Nodes",
        links: [
            { label: "Windows Node (.exe)", path: "/download" },
            { label: "Linux Headless (.deb)", path: "/docs/install-linux" },
            { label: "Android 4G/5G APK", path: "/docs/install-android" },
            { label: "Web Fleet Dashboard", path: "/marketplace" },
        ],
    },
    {
        title: "Guides & Docs",
        links: [
            { label: "Blog & Tutorials", path: "/blog" },
            { label: "Bypass Turnstile 2026", path: "/blog/how-to-bypass-cloudflare-turnstile-in-2026" },
            { label: "Anti-Bot Evasion Guide", path: "/blog/how-to-bypass-anti-bot-scraping-protections" },
            { label: "API Documentation", path: "/docs/getting-started" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", path: "/about" },
            { label: "Pricing Plans", path: "/pricing" },
            { label: "Privacy Policy", path: "/privacy" },
            { label: "Terms of Service", path: "/terms" },
        ],
    },
];
