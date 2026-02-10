import React from "react";
const Navigation = React.lazy(() => import("./library/Navigation"));
const Hero = React.lazy(() => import("./library/Hero"));
const StatsBar = React.lazy(() => import("./library/StatsBar"));
const Features = React.lazy(() => import("./library/Features"));
const Pricing = React.lazy(() => import("./library/Pricing"));
const Skills = React.lazy(() => import("./library/Skills"));
const Experience = React.lazy(() => import("./library/Experience"));
const CTA = React.lazy(() => import("./library/CTA"));
const Layout = React.lazy(() => import("./library/Layout"));
const ImageComponent = React.lazy(() => import("./library/ImageComponent"));
const ImageSlider = React.lazy(() => import("./library/ImageSlider"));
const ContactInfo = React.lazy(() => import("./library/ContactInfo"));
const ProjectDetails = React.lazy(() => import("./library/ProjectDetails"));
const Education = React.lazy(() => import("./library/Education"));
const ThemeToggle = React.lazy(() => import("./library/ThemeToggle"));
const SearchBar = React.lazy(() => import("./library/SearchBar"));
const SelectionList = React.lazy(() => import("./library/SelectionList"));
const StepProgress = React.lazy(() => import("./library/StepProgress"));
const Section = React.lazy(() => import("./library/Section"));
const FAQ = React.lazy(() => import("./library/FAQ"));
const LiveSitePreview = React.lazy(() => import("./LiveSitePreview"));

const componentRegistry: Record<string, React.LazyExoticComponent<React.FC<any>>> = {
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
  image_slider: ImageSlider,
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
  faq: FAQ,
  live_site_preview: LiveSitePreview,
};

interface SectionRendererProps {
  sections: any[];
  isPreview?: boolean;
}

export const renderSection = (section: any, index: number) => {
  const Component = componentRegistry[section.type];
  const extraProps = React.useMemo(() =>
    section.type === "layout" || section.type === "features" || section.type === "section"
      ? { renderItem: renderSection }
      : {}, [section.type]);

  const styles = section.styles || {};

  const containerClasses = React.useMemo(() => [
    "relative group/section",
    section.type === "layout" ? "" : "w-full",
    styles.backgroundColor || "",
    styles.padding || "py-16",
    styles.margin || "my-0",
    styles.textAlign ? `text-${styles.textAlign}` : "",
    section.props?.anchorId ? "scroll-mt-20" : "",
  ].filter(Boolean).join(" "), [section.type, styles, section.props?.anchorId]);

  const innerClasses = React.useMemo(() => [
    "mx-auto px-4",
    styles.maxWidth || "max-w-8xl",
    styles.borderRadius || "",
  ].filter(Boolean).join(" "), [styles.maxWidth, styles.borderRadius]);

  return Component ? (
    <div
      key={section.id || index}
      id={section.props?.anchorId}
      className={containerClasses}
    >
      <div className={innerClasses}>
        <React.Suspense fallback={<div className="p-12 text-center text-gray-400 text-sm font-mono animate-pulse">Loading component...</div>}>
          <Component {...section.props} {...extraProps} styles={styles} />
        </React.Suspense>
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
