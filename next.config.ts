import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compress: true,
    images: {
        unoptimized: true,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
    },
    experimental: {
        optimizePackageImports: [
            "lucide-react",
            "react-icons",
            "framer-motion",
            "clsx",
            "tailwind-merge",
            "lenis",
        ],
    },
};

export default nextConfig;
