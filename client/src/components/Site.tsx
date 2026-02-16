import React, { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useSite } from "../context/useSite";
import SectionRenderer from "./SectionRenderer";
import ThemeToggle from "./library/ThemeToggle";
import { SEO } from "./SEO";

const Site: React.FC = () => {
  const { siteConfig, loading, projectId } = useSite();
  const recordView = useMutation(api.analytics.recordView);

  const isDark = siteConfig.site_settings.theme?.darkMode;
  const showToggle = siteConfig.site_settings.theme?.showThemeToggle;

  useEffect(() => {
    if (!loading && projectId) {
      recordView({ projectId: projectId as any });
    }
  }, [loading, projectId]);

  // Apply dark class to body for global styles if needed, 
  // though here we apply it to the main container.
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-end pb-5 transition-colors">
        <div className="flex items-center gap-2 opacity-20 dark:text-white">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase">
            Powered by
          </span>
          <span className="text-sm font-black tracking-tighter">nekoneko</span>
        </div>
      </div>
    );
  }

  const font = siteConfig.site_settings.theme?.font || "Inter";
  const layout = siteConfig.site_settings.layout || {};

  const formatSpacing = (val: string | undefined) => {
    if (!val) return undefined;
    return /^\d+$/.test(val) ? `${val}px` : val;
  };

  return (
    <div
      className={`min-h-screen antialiased flex flex-col justify-between transition-colors ${isDark ? 'dark bg-slate-950 text-white' : 'bg-white text-slate-900'}`}
      style={{
        fontFamily: font,
        paddingTop: formatSpacing(layout.paddingTop),
        paddingRight: formatSpacing(layout.paddingRight),
        paddingBottom: formatSpacing(layout.paddingBottom),
        paddingLeft: formatSpacing(layout.paddingLeft),
        marginTop: formatSpacing(layout.marginTop),
        marginRight: formatSpacing(layout.marginRight),
        marginBottom: formatSpacing(layout.marginBottom),
        marginLeft: formatSpacing(layout.marginLeft),
      }}
    >
      <SEO
        title={siteConfig.site_settings.seo?.title || siteConfig.site_settings.name}
        description={siteConfig.site_settings.seo?.description}
      />
      <main className="w-full">
        <SectionRenderer sections={siteConfig.sections} />
      </main>

      {showToggle && <ThemeToggle variant="floating" />}

      <footer className="py-1 flex justify-center bg-slate-950">
        <div className="flex items-center gap-2 opacity-20 hover:opacity-100 transition-opacity cursor-default text-white">
          <span className="text-[10px] font-black tracking-[0.3em] uppercase">
            Powered by
          </span>
          <span className="text-sm font-black tracking-tighter">nekoneko</span>
        </div>
      </footer>
    </div>
  );
};

export default Site;
