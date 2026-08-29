import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compress: true,
    images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
