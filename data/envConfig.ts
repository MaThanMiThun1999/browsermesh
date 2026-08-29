export const envConfig = {
    siteName: process.env.NEXT_PUBLIC_SITE_NAME || "BrowserMesh",
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://browsermesh.in",
    consoleUrl: process.env.NEXT_PUBLIC_CONSOLE_WEBSITE || "https://studio-browsermesh.vercel.app",
    webInstallationCmdUrl:
        process.env.NEXT_PUBLIC_WEB_INSTALLATION_CMD ||
        "https://browsermesh-one.vercel.app/scripts/install-headless.sh",
};
