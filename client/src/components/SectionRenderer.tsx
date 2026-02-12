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
const ConnectWithMe = React.lazy(() => import("./library/ConnectWithMe"));
const Footer = React.lazy(() => import("./library/Footer"));
const BlogHero = React.lazy(() => import("./library/BlogHero"));
const BlogList = React.lazy(() => import("./library/BlogList"));
const BlogContent = React.lazy(() => import("./library/BlogContent"));
const BlogNewsletter = React.lazy(() => import("./library/BlogNewsletter"));
const Subscribe = React.lazy(() => import("./library/Subscribe"));
const Background = React.lazy(() => import("./library/Background"));
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
  connect_with_me: ConnectWithMe,
  footer: Footer,
  blog_hero: BlogHero,
  blog_list: BlogList,
  blog_content: BlogContent,
  blog_newsletter: BlogNewsletter,
  subscribe: Subscribe,
  background: Background,
  live_site_preview: LiveSitePreview,
};

interface SectionRendererProps {
  sections: any[];
  isPreview?: boolean;
}

interface SectionComponentProps {
  section: any;
  index: number;
  isPreview?: boolean;
}

const SectionComponent: React.FC<SectionComponentProps> = ({ section, index: _index, isPreview }) => {
  const Component = componentRegistry[section.type];
  const extraProps = React.useMemo(() =>
    section.type === "layout" || section.type === "features" || section.type === "section" || section.type === "background"
      ? { renderItem: (s: any, i: number) => renderSection(s, i, isPreview) }
      : {}, [section.type, isPreview]);

  const styles = section.styles || {};

  const containerClasses = React.useMemo(() => [
    "relative group/section",
    section.type === "layout" ? "" : "w-full",
    styles.backgroundColor || "",
    styles.padding || (section.type === "background" || section.type === "footer" || isPreview ? "py-0" : "py-2"),
    styles.margin || "my-0",
    styles.textAlign ? `text-${styles.textAlign}` : "",
    section.props?.anchorId ? "scroll-mt-20" : "",
  ].filter(Boolean).join(" "), [section.type, styles, section.props?.anchorId, isPreview]);

  const innerClasses = React.useMemo(() => [
    (section.type === "background" || section.type === "footer" || isPreview) ? "w-full" : "mx-auto px-4",
    styles.maxWidth || ((section.type === "background" || section.type === "footer" || isPreview) ? "max-w-full" : "max-w-8xl"),
    styles.borderRadius || "",
  ].filter(Boolean).join(" "), [styles.maxWidth, styles.borderRadius, isPreview, section.type]);

  return Component ? (
    <div
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

export const renderSection = (section: any, index: number, isPreview?: boolean) => {
  return <SectionComponent key={section.id || index} section={section} index={index} isPreview={isPreview} />;
};

const MemoizedSection = React.memo(({ section, index }: { section: any; index: number }) => {
  return renderSection(section, index);
}, (prevProps, nextProps) => {
  return JSON.stringify(prevProps.section) === JSON.stringify(nextProps.section);
});

const SectionRenderer: React.FC<SectionRendererProps> = ({ sections }) => {
  return (
    <div className="bg-transparent text-slate-950 dark:text-white min-h-full mx-auto w-full">
      {sections?.filter(Boolean).map((section, idx) => (
        <MemoizedSection key={section.id || idx} section={section} index={idx} />
      ))}
    </div>
  );
};

export default React.memo(SectionRenderer);
