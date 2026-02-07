import React from "react";
import Navigation from "./library/Navigation";
import Hero from "./library/Hero";
import StatsBar from "./library/StatsBar";


import Features from "./library/Features";
import Pricing from "./library/Pricing";
import Skills from "./library/Skills";
import Experience from "./library/Experience";
import CTA from "./library/CTA";
import Layout from "./library/Layout";
import ImageComponent from "./library/ImageComponent";

import ContactInfo from "./library/ContactInfo";
import ProjectDetails from "./library/ProjectDetails";
import Education from './library/Education';
import ThemeToggle from "./library/ThemeToggle";
import SearchBar from "./library/SearchBar";
import SelectionList from "./library/SelectionList";
import StepProgress from "./library/StepProgress";
import Section from "./library/Section";

const componentRegistry: Record<string, React.FC<any>> = {
  navigation: Navigation,
  navigation_minimal: Navigation,
  hero: Hero,
  stats_bar: StatsBar,
  project_grid: ProjectDetails,
  contact_section: ContactInfo,
  features: Features,
  pricing: Pricing,
  skills: Skills,
  experience: Experience,
  cta: CTA,
  layout: Layout,
  image: ImageComponent,
  skills_bullets: Skills,
  contact_info: ContactInfo,
  project_details: ProjectDetails,
  education: Education,
  contact_card: ContactInfo,
  theme_toggle: ThemeToggle,
  search_bar: SearchBar,
  selection_list: SelectionList,
  step_progress: StepProgress,
  section: Section,
};

interface SectionRendererProps {
  sections: any[];
  isPreview?: boolean;
}

export const renderSection = (section: any, index: number) => {
  const Component = componentRegistry[section.type];
  const extraProps =
    section.type === "layout" || section.type === "features" || section.type === "section"
      ? { renderItem: renderSection }
      : {};

  const styles = section.styles || {};
  const containerClasses = [
    "relative group/section",
    section.type === "layout" ? "" : "w-full",
    styles.backgroundColor || "",
    styles.padding || "py-16",
    styles.margin || "my-0",
    styles.textAlign ? `text-${styles.textAlign}` : "",
    section.props?.anchorId ? "scroll-mt-20" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const innerClasses = [
    "mx-auto px-4",
    styles.maxWidth || "max-w-8xl",
    styles.borderRadius || "",
  ]
    .filter(Boolean)
    .join(" ");

  return Component ? (
    <div
      key={section.id || index}
      id={section.props?.anchorId}
      className={containerClasses}
    >
      <div className={innerClasses}>
        <Component {...section.props} {...extraProps} styles={styles} />
      </div>
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

const MemoizedSection = React.memo(({ section, index }: { section: any; index: number }) => {
  return renderSection(section, index);
});

const SectionRenderer: React.FC<SectionRendererProps> = ({ sections }) => {
  return (
    <div className="bg-transparent text-slate-950 dark:text-white min-h-full mx-auto w-full">
      {sections.map((section, idx) => (
        <MemoizedSection key={section.id || idx} section={section} index={idx} />
      ))}
    </div>
  );
};

export default React.memo(SectionRenderer);
