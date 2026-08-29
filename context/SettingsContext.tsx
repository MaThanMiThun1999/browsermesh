"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getPublicSettings, PublicSetting } from "@/lib/api";

export interface SettingsContextType {
    settings: PublicSetting[];
    isLoading: boolean;
    getSettingValue: <T = unknown>(key: string, fallback?: T) => T;
    appName: string;
    tagline: string;
    marketplaceEnabled: boolean;
    maintenanceMode: { enabled: boolean; message: string };
    bashCommand: string;
    powershellCommand: string;
    allowRegistration: boolean;
    showPlatformStatus: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<PublicSetting[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getPublicSettings()
            .then((data) => {
                if (Array.isArray(data)) {
                    setSettings(data);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const getSettingValue = <T = unknown,>(key: string, fallback?: T): T => {
        const found = settings.find((s) => s.key === key);
        if (!found || !found.value) return fallback as T;
        const valObj = found.value as Record<string, unknown>;
        if ("name" in valObj) return valObj.name as T;
        if ("tagline" in valObj) return valObj.tagline as T;
        if ("cmd" in valObj) return valObj.cmd as T;
        if ("enabled" in valObj && Object.keys(valObj).length === 1) return valObj.enabled as T;
        if ("text" in valObj) return valObj.text as T;
        if ("url" in valObj) return valObj.url as T;
        return valObj as T;
    };

    const appName = getSettingValue<string>("app_name", "BrowserMesh");
    const tagline = getSettingValue<string>(
        "tagline",
        "The ultimate cross-platform stealth scraping ecosystem"
    );

    const marketplaceSetting = settings.find((s) => s.key === "marketplace_enabled");
    const marketplaceEnabled = marketplaceSetting
        ? Boolean((marketplaceSetting.value as { enabled?: boolean })?.enabled)
        : true;

    const maintenanceSetting = settings.find((s) => s.key === "maintenance_mode");
    const maintenanceMode = {
        enabled: Boolean((maintenanceSetting?.value as { enabled?: boolean })?.enabled ?? false),
        message:
            (maintenanceSetting?.value as { message?: string })?.message ||
            "Scheduled maintenance in progress.",
    };

    const bashSetting = settings.find((s) => s.key === "headless_install_cmd_bash");
    const bashCommand =
        (bashSetting?.value as { cmd?: string })?.cmd ||
        "curl -sSL https://browsermesh-one.vercel.app/scripts/install-headless.sh | bash";

    const powershellSetting = settings.find((s) => s.key === "headless_install_cmd_powershell");
    const powershellCommand =
        (powershellSetting?.value as { cmd?: string })?.cmd ||
        'powershell -NoProfile -ExecutionPolicy Bypass -Command "iwr -useb https://browsermesh-one.vercel.app/scripts/install-headless.ps1 | iex"';

    const regSetting = settings.find((s) => s.key === "allow_user_registration");
    const allowRegistration = regSetting
        ? Boolean((regSetting.value as { enabled?: boolean })?.enabled)
        : true;

    const statusSetting = settings.find((s) => s.key === "show_platform_status");
    const showPlatformStatus = statusSetting
        ? Boolean((statusSetting.value as { enabled?: boolean })?.enabled)
        : true;

    return (
        <SettingsContext.Provider
            value={{
                settings,
                isLoading,
                getSettingValue,
                appName,
                tagline,
                marketplaceEnabled,
                maintenanceMode,
                bashCommand,
                powershellCommand,
                allowRegistration,
                showPlatformStatus,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings(): SettingsContextType {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
