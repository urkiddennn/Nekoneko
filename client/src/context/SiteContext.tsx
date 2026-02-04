import React, { createContext, useContext, useState, useEffect } from "react";
import { SiteConfig, Section, SiteSettings } from "../types";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from "react-router-dom";

interface SiteContextType {
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

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const defaultSettings: SiteSettings = {
  name: "Alex Dev",
  favicon: "https://example.com/favicon.ico",
  theme: {
    primary: "#6366f1",
    font: "Inter",
    darkMode: true,
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

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { projectId, slug } = useParams();

  const getSlugFromHostname = () => {
    const hostname = window.location.hostname;
    if (hostname.startsWith("www.")) return null;

    // Handle localhost development
    if (hostname.includes("localhost") || hostname.includes("lvh.me")) {
      const parts = hostname.split(".");
      if (parts.length > 1) return parts[0];
      return null;
    }

    // Handle production (e.g., slug.nekoneko.space)
    const parts = hostname.split(".");
    if (parts.length >= 3) {
      return parts[0];
    }
    return null;
  };

  const hostnameSlug = getSlugFromHostname();
  const effectiveSlug = hostnameSlug || slug;

  const projectData = useQuery(
    projectId ? api.config.getProject : api.config.getProjectBySlug,
    projectId
      ? { id: projectId as any }
      : effectiveSlug
        ? { slug: effectiveSlug }
        : ("skip" as any),
  );

  const saveToConvex = useMutation(api.config.saveProjectConfig);

  const [siteConfig, setSiteConfig] = useState<SiteConfig>({
    site_settings: defaultSettings,
    sections: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (siteConfig.site_settings.theme?.font) {
      const fontName = siteConfig.site_settings.theme.font;
      const linkId = "google-font-loader";
      let link = document.getElementById(linkId) as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.id = linkId;
        link.rel = "stylesheet";
        document.head.appendChild(link);
      }
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, "+")}:wght@400;500;700;900&display=swap`;
    }
  }, [siteConfig.site_settings.theme?.font]);

  useEffect(() => {
    // Load a set of standard fonts for the editor to make transitions smooth
    const fontNames = ["Inter", "Outfit", "Space Grotesk", "Roboto", "Lexend", "JetBrains Mono"];
    const linkId = "google-fonts-preloader";
    let link = document.getElementById(linkId) as HTMLLinkElement;
    if (!link) {
      link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      document.head.appendChild(link);
    }
    const families = fontNames.map(f => `family=${f.replace(/\s+/g, "+")}:wght@400;500;700;900`).join("&");
    link.href = `https://fonts.googleapis.com/css2?${families}&display=swap`;
  }, []);

  useEffect(() => {
    if (projectData) {
      setSiteConfig({
        site_settings: projectData.site_settings,
        sections: projectData.sections,
      });
      setLoading(false);
    } else if (projectData === null) {
      setLoading(false);
    }
  }, [projectData]);

  const updateSectionProperty = (
    sectionId: string,
    key: string,
    value: any,
  ) => {
    setSiteConfig((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId
          ? { ...section, props: { ...section.props, [key]: value } }
          : section,
      ),
    }));
  };

  const updateSiteSettings = (path: string, value: any) => {
    setSiteConfig((prev) => {
      const keys = path.split(".");
      const newSettings = JSON.parse(JSON.stringify(prev.site_settings));
      let current = newSettings;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
          current[keys[i]] = {};
        }
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return { ...prev, site_settings: newSettings };
    });
  };

  const addSection = (type: string) => {
    const newSection: Section = {
      id: `${type}-${Date.now()}`,
      type,
      props: getDefaultProps(type),
      styles: {
        padding: "py-16",
        margin: "my-0",
        maxWidth: "max-w-7xl",
        backgroundColor: "bg-transparent",
        textAlign: "left",
      },
    };
    setSiteConfig((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const reorderSections = (oldIndex: number, newIndex: number) => {
    setSiteConfig((prev) => {
      const newSections = [...prev.sections];
      const [movedItem] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, movedItem);
      return { ...prev, sections: newSections };
    });
  };

  const saveConfig = async () => {
    if (!projectId) return;
    try {
      await saveToConvex({
        projectId: projectId as any,
        site_settings: siteConfig.site_settings,
        sections: siteConfig.sections,
      });
      console.log("Successfully saved project");
    } catch (error) {
      console.error("Error saving project:", error);
      throw error;
    }
  };

  return (
    <SiteContext.Provider
      value={{
        siteConfig,
        setSiteConfig,
        updateSectionProperty,
        updateSiteSettings,
        addSection,
        reorderSections,
        saveConfig,
        loading,
        projectSlug: projectData?.slug,
        projectId: projectData?._id,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

const getDefaultProps = (type: string) => {
  switch (type) {
    case "navigation":
      return {
        links: [
          { label: "About", url: "#about" },
          { label: "Projects", url: "#projects" },
          { label: "Contact", url: "#contact" },
        ],
        showResumeButton: true,
        style: {
          textColor: "text-white",
          backgroundColor: "bg-white/80",
          borderColor: "border-indigo-600",
        },
      };
    case "hero":
      return {
        heading: "Hi, I'm Alex.",
        subheading: "I build scalable web applications with Node.js and React.",
        avatarUrl: "https://api.dicebear.com/7.x/shapes/svg",
        alignment: "center",
        bg: {
          type: "gradient",
          value: "from-indigo-500 to-purple-600",
        },
      };
    case "skills":
      return {
        title: "My Skills",
        showProgressBar: true,
        showPercentage: true,
        skills: [
          { name: "React", level: 90 },
          { name: "TypeScript", level: 85 },
        ],
      };
    case "skills_bullets":
      return {
        title: "Technical Stack",
        skills: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Convex"],
      };
    default:
      return {};
  }
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
};
