import { envConfig } from "./envConfig";

export interface AuthorInfo {
    name: string;
    alias: string;
    role: string;
    bio: string;
    github: string;
    linkedin: string;
    email: string;
}

export interface SiteLinks {
    twitter: string;
    facebook: string;
    instagram: string;
    linkedin: string;
    github: string;
    githubRepo: string;
    discord: string;
    youtube: string;
    console: string;
    docs: string;
    marketplace: string;
    pricing: string;
    features: string;
    about: string;
}

export interface PlatformStats {
    plugins: string;
    installations: string;
    developers: string;
    jobsExecuted: string;
    uptime: string;
    supportedBrowsers: string;
    proxyLocations: string;
    stealthSuccessRate: string;
}

export interface TechStackItem {
    name: string;
    category: string;
}

export interface PricingPlanSummary {
    name: string;
    price: string;
    period: string;
    resultsLimit: string;
    devicesLimit: string;
    storageLimit: string;
    highlights: string[];
}

export interface MarketplaceSummary {
    totalCategories: number;
    topCategories: string[];
    featuredPlugins: string[];
}

export interface DocumentationGuide {
    title: string;
    slug: string;
    category: string;
}

export interface JourneyMilestone {
    year: string;
    title: string;
    description: string;
}

export interface SiteInfo {
    name: string;
    tagline: string;
    description: string;
    version: string;
    url: string;
    apiUrl: string;
    consoleUrl: string;
    webInstallationCmdUrl: string;
    author: AuthorInfo;
    links: SiteLinks;
    contact: {
        email: string;
        supportEmail: string;
        location: string;
    };
    stats: PlatformStats;
    pricing: {
        free: PricingPlanSummary;
        pro: PricingPlanSummary;
    };
    marketplace: MarketplaceSummary;
    docs: DocumentationGuide[];
    techStack: TechStackItem[];
    supportedPlatforms: string[];
    journeyTimeline: JourneyMilestone[];
    features: string[];
}

export const siteInfo: SiteInfo = {
    name: envConfig.siteName,
    tagline: "The ultimate cross-platform stealth scraping ecosystem",
    description:
        "Enterprise-Grade Stealth Scraping Platform. Join thousands of professionals using BrowserMesh for unlimited, undetected data extraction.",
    version: "1.0.0-beta",
    url: envConfig.siteUrl,
    apiUrl: envConfig.apiUrl,
    consoleUrl: envConfig.consoleUrl,
    webInstallationCmdUrl: envConfig.webInstallationCmdUrl,

    author: {
        name: "Mathanraj Murugesan",
        alias: "mathanmithun",
        role: "Founder & Lead Developer",
        bio: "Creator of BrowserMesh. Passionate about web automation, stealth scraping, and high-performance cross-platform software.",
        github: "https://github.com/MaThanMiThun1999",
        linkedin: "http://linkedin.com/in/mathanraj-murugesan",
        email: "mathanraj.murugesan@browsermesh.in",
    },

    links: {
        twitter: "https://x.com/mathan_mithun",
        facebook:
            "https://www.facebook.com/people/M%C3%A3Th%C3%A2%C3%B1-M%C4%ABTh%C3%BC%C3%B1/100011065608887/",
        instagram: "https://www.instagram.com/its.me_mathan_mithun",
        linkedin: "https://www.linkedin.com/in/mathanraj-murugesan",
        github: "https://github.com/MaThanMiThun1999",
        githubRepo: "https://github.com/MaThanMiThun1999/browsermesh",
        discord: "https://discord.gg/browsermesh",
        youtube: "https://youtube.com/@browsermesh",
        console: envConfig.consoleUrl,
        docs: "/docs/getting-started",
        marketplace: "/marketplace",
        pricing: "/pricing",
        features: "/features",
        about: "/about",
    },

    contact: {
        email: "browsermesh@gmail.com",
        supportEmail: "browsermesh@gmail.com",
        location: "Global / Remote",
    },

    stats: {
        plugins: "250+",
        installations: "1.2M+",
        developers: "10K+",
        jobsExecuted: "500K+",
        uptime: "99.99%",
        supportedBrowsers: "15+",
        proxyLocations: "100+",
        stealthSuccessRate: "99.9%",
    },

    pricing: {
        free: {
            name: "Free",
            price: "$0",
            period: "forever",
            resultsLimit: "500 Monthly Results",
            devicesLimit: "1 Active Device",
            storageLimit: "100 MB Cloud Storage",
            highlights: [
                "500 Monthly Results Limit",
                "1 Active Device",
                "Access to Free Plugins only",
                "Export to JSON format",
                "100 MB Cloud Storage limit",
            ],
        },
        pro: {
            name: "Pro",
            price: "$29",
            period: "month",
            resultsLimit: "10,000 Monthly Results",
            devicesLimit: "Up to 3 Active Devices",
            storageLimit: "2 GB (2048 MB) Cloud Storage",
            highlights: [
                "10,000 Monthly Results Limit",
                "Up to 3 Active Devices",
                "Access to Premium (Pro) Plugins",
                "Export to JSON, CSV, & XLSX formats",
                "Distributed Multi-Node Mesh",
                "Scheduled Jobs automation",
                "2 GB Cloud Storage",
            ],
        },
    },

    marketplace: {
        totalCategories: 8,
        topCategories: [
            "Search Engines",
            "E-commerce",
            "Social Media",
            "Real Estate",
            "Maps & Travel",
            "Jobs & Recruitment",
            "News & Data",
            "Finance",
        ],
        featuredPlugins: [
            "Google Maps Scraper",
            "Amazon Product Scraper",
            "Instagram Scraper",
            "LinkedIn Company Scraper",
            "Twitter/X Scraper",
            "Airbnb Listing Scraper",
        ],
    },

    docs: [
        { title: "Getting Started", slug: "getting-started", category: "Core" },
        { title: "How it Works", slug: "how-it-works", category: "Core" },
        { title: "API Reference", slug: "api-reference", category: "Developer" },
        { title: "Browser Pool", slug: "browser-pool", category: "Architecture" },
        { title: "Writing Selectors", slug: "writing-selectors", category: "Scraping" },
        { title: "Windows Installation", slug: "install-windows", category: "Installation" },
        { title: "Linux Installation", slug: "install-linux", category: "Installation" },
        { title: "Android Installation", slug: "install-android", category: "Installation" },
    ],

    techStack: [
        { name: "TypeScript", category: "Language" },
        { name: "Node.js", category: "Runtime" },
        { name: "Next.js", category: "Framework" },
        { name: "React", category: "UI Library" },
        { name: "Playwright", category: "Automation" },
        { name: "Tailwind CSS", category: "Styling" },
        { name: "PostgreSQL", category: "Database" },
        { name: "SQLite", category: "Database" },
    ],

    supportedPlatforms: ["Windows", "Linux", "Android", "Web"],

    journeyTimeline: [
        {
            year: "2022",
            title: "The Idea",
            description: "I wanted a better way to scrape — faster, stealthier, and smarter.",
        },
        {
            year: "2022",
            title: "First Commit",
            description: "Wrote the first line of code. The prototype was born.",
        },
        {
            year: "2023",
            title: "Going Public",
            description: "Released to early users and built an amazing community.",
        },
        {
            year: "2024+",
            title: "Growing Together",
            description: "Continuously improving and building the future of web automation.",
        },
    ],

    features: [
        "Stealth Fingerprint Anti-Detect Engine",
        "Distributed Mesh Browser Pool",
        "Smart Job Queue with Concurrency Control",
        "Low-Code Marketplace Plugins",
        "Built-in Proxy Rotator & CAPTCHA Solver",
        "Cloud Sync & Encrypted Backup",
        "Real-Time Scraping Telemetry & Analytics",
    ],
};
