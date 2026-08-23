import React from "react";
import {
    Search,
    ShoppingCart,
    Users,
    Home,
    MapPin,
    Briefcase,
    Newspaper,
    Wallet,
} from "lucide-react";
import { Category, DevicePlatform } from "@/types";

export const marketplaceCategories: Category[] = [
    {
        id: "search",
        label: "Search Engines",
        plugins: 28,
        icon: <Search size={20} />,
        color: "text-blue-400",
    },
    {
        id: "ecommerce",
        label: "E-commerce",
        plugins: 34,
        icon: <ShoppingCart size={20} />,
        color: "text-purple-400",
    },
    {
        id: "social",
        label: "Social Media",
        plugins: 54,
        icon: <Users size={20} />,
        color: "text-pink-400",
    },
    {
        id: "realestate",
        label: "Real Estate",
        plugins: 16,
        icon: <Home size={20} />,
        color: "text-orange-400",
    },
    {
        id: "travel",
        label: "Maps & Travel",
        plugins: 22,
        icon: <MapPin size={20} />,
        color: "text-green-400",
    },
    {
        id: "jobs",
        label: "Jobs & Recruitment",
        plugins: 18,
        icon: <Briefcase size={20} />,
        color: "text-indigo-400",
    },
    {
        id: "news",
        label: "News & Data",
        plugins: 31,
        icon: <Newspaper size={20} />,
        color: "text-cyan-400",
    },
    {
        id: "finance",
        label: "Finance",
        plugins: 19,
        icon: <Wallet size={20} />,
        color: "text-emerald-400",
    },
];

export interface PluginData {
    id: string;
    name: string;
    type: "Official" | "Community";
    description: string;
    rating: number;
    reviews: string;
    installs: string;
    updatedAt: string;
    tags: string[];
    platforms: DevicePlatform[];
    price: "Free" | "Premium";
    logoUrl?: string;
    logoColor: string;
}

export const marketplacePlugins: PluginData[] = [
    {
        id: "google-maps",
        name: "Google Maps Scraper",
        type: "Official",
        description:
            "Extract business listings, reviews, ratings, photos and more from Google Maps with high accuracy.",
        rating: 4.9,
        reviews: "2.1K",
        installs: "2.1M installs",
        updatedAt: "Updated 2 days ago",
        tags: ["Maps", "Local SEO", "Lead Generation"],
        platforms: ["windows", "macos", "linux", "android", "ios", "web"],
        price: "Free",
        logoColor: "from-blue-500 to-green-400",
    },
    {
        id: "amazon-product",
        name: "Amazon Product Scraper",
        type: "Official",
        description:
            "Extract product data, prices, reviews, availability and seller info from Amazon.",
        rating: 4.8,
        reviews: "1.8K",
        installs: "1.8M installs",
        updatedAt: "Updated 5 days ago",
        tags: ["E-commerce", "Amazon", "Products"],
        platforms: ["windows", "macos", "linux", "android", "ios", "web"],
        price: "Free",
        logoColor: "from-orange-400 to-yellow-500",
    },
    {
        id: "instagram",
        name: "Instagram Scraper",
        type: "Community",
        description: "Scrape profiles, posts, hashtags, stories, and followers from Instagram.",
        rating: 4.7,
        reviews: "1.5K",
        installs: "1.5M installs",
        updatedAt: "Updated 1 week ago",
        tags: ["Social Media", "Instagram", "No Code"],
        platforms: ["windows", "macos", "linux", "android", "ios", "web"],
        price: "Free",
        logoColor: "from-pink-500 to-orange-400",
    },
    {
        id: "linkedin",
        name: "LinkedIn Company Scraper",
        type: "Official",
        description: "Extract company data, employees, jobs, and insights from LinkedIn.",
        rating: 4.7,
        reviews: "1.2K",
        installs: "1.2M installs",
        updatedAt: "Updated 3 days ago",
        tags: ["Business", "Leads", "Recruitment"],
        platforms: ["windows", "macos", "linux", "android", "ios", "web"],
        price: "Free",
        logoColor: "from-blue-600 to-cyan-500",
    },
    {
        id: "twitter",
        name: "Twitter/X Scraper",
        type: "Community",
        description: "Real-time tweets, users, hashtags, and trends scraper for Twitter/X.",
        rating: 4.6,
        reviews: "1.0K",
        installs: "1.0M installs",
        updatedAt: "Updated 2 weeks ago",
        tags: ["Social Media", "Twitter/X", "Real-time"],
        platforms: ["windows", "macos", "linux", "android", "ios", "web"],
        price: "Free",
        logoColor: "from-slate-700 to-black",
    },
    {
        id: "airbnb",
        name: "Airbnb Listing Scraper",
        type: "Community",
        description: "Extract Airbnb listings, prices, reviews, availability and host information.",
        rating: 4.7,
        reviews: "842",
        installs: "842K installs",
        updatedAt: "Updated 1 week ago",
        tags: ["Real Estate", "Airbnb", "Travel"],
        platforms: ["windows", "macos", "linux", "android", "ios", "web"],
        price: "Free",
        logoColor: "from-rose-500 to-red-600",
    },
];
