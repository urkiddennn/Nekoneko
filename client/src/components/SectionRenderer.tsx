import React from "react";
import Navigation from "./Navigation";
import Hero from "./Hero";
import StatsBar from "./StatsBar";
import ProjectGrid from "./ProjectGrid";
import ContactSection from "./ContactSection";
import Features from "./Features";
import Pricing from "./Pricing";
import Skills from "./Skills";
import Experience from "./Experience";
import CTA from "./CTA";
import Layout from "./Layout";
import ImageComponent from "./ImageComponent";
import SkillsBullets from "./SkillsBullets";

const componentRegistry: Record<string, React.FC<any>> = {
  navigation: Navigation,
  hero: Hero,
  stats_bar: StatsBar,
  project_grid: ProjectGrid,
  contact_section: ContactSection,
  features: Features,
  pricing: Pricing,
  skills: Skills,
  experience: Experience,
  cta: CTA,
  layout: Layout,
  image: ImageComponent,
  skills_bullets: SkillsBullets,
};

interface SectionRendererProps {
  sections: any[];
  isPreview?: boolean;
}

export const renderSection = (section: any, index: number) => {
  const Component = componentRegistry[section.type];
  const extraProps =
    section.type === "layout" ? { renderItem: renderSection } : {};

  const styles = section.styles || {};
  const containerClasses = [
    "relative group/section",
    section.type === "layout" ? "" : "w-full",
    styles.backgroundColor || "",
    styles.padding || "py-16",
    styles.margin || "my-0",
    styles.textAlign ? `text-${styles.textAlign}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const innerClasses = [
    "mx-auto px-4",
    styles.maxWidth || "max-w-7xl",
    styles.borderRadius || "",
  ]
    .filter(Boolean)
    .join(" ");

  return Component ? (
    <div key={section.id || index} className={containerClasses}>
      <div className={innerClasses}>
        <Component {...section.props} {...extraProps} styles={styles} />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-indigo-500/0 group-hover/section:bg-indigo-500/10 transition-all duration-300 pointer-events-none"></div>
    </div>
  ) : (
    <div
      key={section.id || index}
      className="p-24 bg-[#0a0a0c] text-indigo-400 m-10 rounded-[40px] border-4 border-dashed border-indigo-500/20 text-center animate-pulse shadow-inner relative overflow-hidden"
    >
      <div className="text-4xl font-black italic tracking-tighter uppercase mb-2">
        RENDER_FAULT
      </div>
      <div className="font-bold uppercase tracking-[0.4em] text-[10px] text-slate-600 italic">
        Invalid Module: "{section.type}"
      </div>
    </div>
  );
};

const SectionRenderer: React.FC<SectionRendererProps> = ({ sections }) => {
  return (
    <div className="bg-white min-h-full mx-auto w-full">
      {sections.map((section, idx) => renderSection(section, idx))}
    </div>
  );
};

export default SectionRenderer;
