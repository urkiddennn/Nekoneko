import { createContext, useContext } from "react";
import { SiteConfig, SiteSettings } from "../types";

export interface SiteContextType {
    siteConfig: SiteConfig;
    setSiteConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
    updateSectionProperty: (sectionId: string, key: string, value: any) => void;
    updateSiteSettings: (path: string, value: any) => void;
    addSection: (type: string) => void;
    reorderSections: (oldIndex: number, newIndex: number) => void;
    saveConfig: () => Promise<void>;
    loading: boolean;
    projectSlug?: string;
    projectId?: string;
}

export const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const defaultSettings: SiteSettings = {
    name: "Alex Dev",
    favicon: "https://example.com/favicon.ico",
    theme: {
        primary: "#6366f1",
        font: "Inter",
        darkMode: true,
        showThemeToggle: true,
    },
    layout: {
        padding: "py-0",
        margin: "my-0",
    },
    seo: {
        title: "Alex | Fullstack Developer Portfolio",
        description: "Building high-performance web apps.",
    },
};

export const useSite = () => {
    const context = useContext(SiteContext);
    if (!context) {
        throw new Error("useSite must be used within a SiteProvider");
    }
    return context;
};
