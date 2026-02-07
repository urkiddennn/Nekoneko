import React, { useState, useEffect } from "react";
import { SiteConfig, Section, SiteSettings } from "../types";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from "react-router-dom";
import { getToken } from "../utils/authUtils";
import { SiteContext, defaultSettings } from "./useSite";

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
    // SWR Strategy:
    // 1. Try to load from local cache first for instant render
    if (effectiveSlug) {
      try {
        const cached = localStorage.getItem(`site_cache_${effectiveSlug}`);
        if (cached) {
          const parsed = JSON.parse(cached);
          // Only use cache if it looks valid
          if (parsed && parsed.site_settings) {
            setSiteConfig({
              site_settings: parsed.site_settings,
              sections: parsed.sections || [],
            });
            setLoading(false); // Show cached version immediately
          }
        }
      } catch (e) {
        console.warn("Failed to load from cache", e);
      }
    }
  }, [effectiveSlug]);

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
    if (projectData) {
      const mergedSettings: SiteSettings = {
        ...defaultSettings,
        ...projectData.site_settings,
        theme: {
          ...defaultSettings.theme,
          ...(projectData.site_settings.theme || {}),
        },
        seo: {
          ...defaultSettings.seo,
          ...(projectData.site_settings.seo || {}),
        },
        layout: {
          ...defaultSettings.layout,
          ...(projectData.site_settings.layout || {}),
        },
      };

      const newConfig = {
        site_settings: mergedSettings,
        sections: projectData.sections,
      };

      setSiteConfig(newConfig);
      setLoading(false);

      // Update Cache with fresh data
      if (effectiveSlug) {
        try {
          localStorage.setItem(
            `site_cache_${effectiveSlug}`,
            JSON.stringify(newConfig),
          );
        } catch (e) {
          console.warn("Failed to save to cache", e);
        }
      }
    } else if (projectData === null) {
      setLoading(false);
    }
  }, [projectData, effectiveSlug]);

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
    const defaultStyles = getDefaultStyles(type);
    const newSection: Section = {
      id: `${type}-${Date.now()}`,
      type,
      props: getDefaultProps(type),
      styles: {
        padding: "py-5",
        margin: "my-0",
        maxWidth: "max-w-8xl",
        backgroundColor: "bg-transparent",
        textAlign: "left",
        ...defaultStyles,
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
    const token = getToken() || "";
    try {
      await saveToConvex({
        token: token || undefined,
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

const getDefaultStyles = (type: string) => {
  switch (type) {
    case "navigation":
      return {
        textColor: "text-slate-950",
        backgroundColor: "bg-transparent",
        buttonBackgroundColor: "bg-indigo-600",
        borderColor: "border-indigo-600",
      };
    default:
      return {};
  }
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
