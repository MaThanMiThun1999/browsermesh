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
    { label: "Docs", path: "/docs/getting-started" },
];

export interface FooterLinkGroup {
    title: string;
    links: NavigationLink[];
}

export const footerLinks: FooterLinkGroup[] = [
    {
        title: "Product",
        links: [
            { label: "Features", path: "/features" },
            { label: "Marketplace", path: "/marketplace" },
            { label: "Pricing", path: "/pricing" },
            { label: "Download", path: "/download" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Documentation", path: "/docs/getting-started" },
            { label: "API Reference", path: "/docs/api-reference" },
            { label: "How it Works", path: "/docs/how-it-works" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", path: "/about" },
            { label: "Privacy", path: "/privacy" },
            { label: "Terms", path: "/terms" },
        ],
    },
];
