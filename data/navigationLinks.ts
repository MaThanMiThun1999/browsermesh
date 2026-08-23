export interface NavigationLink {
    label: string;
    path: string;
}

export const navigationLinks: NavigationLink[] = [
    { label: "Home", path: "/" },
    { label: "Marketplace", path: "/marketplace" },
    { label: "Pricing", path: "/pricing" },
    { label: "Docs", path: "/docs" },
    { label: "Blog", path: "/blog" },
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
            { label: "Documentation", path: "/docs" },
            { label: "API Reference", path: "/api-reference" },
            { label: "Blog", path: "/blog" },
            { label: "Community", path: "/community" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", path: "/about" },
            { label: "Contact", path: "/contact" },
            { label: "Privacy", path: "/privacy" },
            { label: "Terms", path: "/terms" },
        ],
    },
];
