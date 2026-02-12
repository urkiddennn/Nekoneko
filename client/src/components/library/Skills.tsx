import React from "react";
import { useSite } from "../../context/useSite";
import {
  ArrowRight,
  Github,
  Smartphone,
  Database,
  Globe,
  Camera,
  Briefcase,
  Layers,
  Code
} from "lucide-react";

interface SkillsProps {
  title: string;
  skills: any[]; // Supporting both Skill object and string for backward compatibility
  barColor?: string;
  bulletColor?: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  showProgressBar?: boolean;
  showPercentage?: boolean;
  variant?:
  | "default"
  | "artistic"
  | "impact"
  | "bullets"
  | "brutalist"
  | "outline_minimal"
  | "glassmorphism"
  | "creative_gradient"
  | "detailed_cards"
  | "pixel"
  | "newspaper";
}

const Skills: React.FC<SkillsProps> = ({
  title,
  skills = [],
  barColor,
  bulletColor,
  textColor,
  borderColor,
  backgroundColor,
  showProgressBar = true,
  showPercentage = true,
  variant = "default",
}) => {
  const { siteConfig } = useSite();
  const primaryColor =
    barColor || bulletColor || siteConfig.site_settings.theme.primary;

  const isBrutalist = variant === "brutalist";
  const isOutlineMinimal = variant === "outline_minimal";
  const isGlassmorphism = variant === "glassmorphism";
  const isBulletVariant =
    variant === "bullets" || isBrutalist || isOutlineMinimal || isGlassmorphism;

  const txtColor = textColor || "text-slate-700 dark:text-slate-200";
  const brdColor = borderColor || "border-slate-100 dark:border-slate-800";
  const bgColor = backgroundColor || "bg-white dark:bg-slate-900";

  const isHex = (color: string) =>
    color &&
    (color.startsWith("#") ||
      color.startsWith("rgb") ||
      color.startsWith("hsl"));

  const getBulletStyle = () => {
    const style: React.CSSProperties = {};
    if (isHex(brdColor)) style.borderColor = brdColor;
    if (isHex(bgColor)) style.backgroundColor = bgColor;
    if (isHex(txtColor)) style.color = txtColor;
    return style;
  };

  const getBulletClasses = () => {
    let classes = isBrutalist
      ? "px-8 py-4 rounded-2xl border-[3px] border-slate-950 dark:border-white shadow-[3px_3px_0px_0px_rgba(2,6,23,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(2,6,23,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 group cursor-default "
      : isOutlineMinimal
        ? "px-10 py-4 rounded-none border border-slate-950 dark:border-white hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group cursor-default "
        : isGlassmorphism
          ? "p-2 hover:scale-90 transition duration-200 bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 text-black"
          : "";

    if (!isHex(brdColor) && !isBrutalist && !isOutlineMinimal)
      classes += brdColor + " ";
    if (!isHex(bgColor)) classes += bgColor + " ";
    if (!isHex(txtColor)) classes += txtColor + " ";
    return classes;
  };

  if (isBulletVariant) {
    return (
      <section>
        <div className="text-center mb-12">
          <h2
            className={`text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight uppercase ${isOutlineMinimal ? "border-b border-slate-950 dark:border-white inline-block pb-4 px-12" : "italic"}`}
          >
            {title}
          </h2>
          {!isOutlineMinimal && (
            <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 mx-auto rounded-full overflow-hidden mt-4">
              <div
                className="h-full rounded-full w-1/2 mx-auto"
                style={{ backgroundColor: primaryColor }}
              ></div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill: any, index: number) => {
            const skillName = typeof skill === "string" ? skill : skill.name;
            return (
              <div
                key={index}
                className={getBulletClasses()}
                style={getBulletStyle()}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold uppercase tracking-wider">
                    {skillName}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (variant === "impact") {
    return (
      <div className="space-y-16 py-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-1" style={{ backgroundColor: primaryColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              EXPERTISE
            </span>
            <div className="w-12 h-1" style={{ backgroundColor: primaryColor }} />
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white uppercase tracking-tighter leading-none">
            {title}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
          {skills.map((skill, index) => {
            const effectiveColor = skill.color || primaryColor;
            return (
              <div
                key={index}
                className="group relative px-8 py-5 bg-white dark:bg-slate-900 border-[3px] border-slate-100 dark:border-white/5 rounded-none transition-all duration-300 transform hover:-translate-y-1"
                style={{ borderColor: '' }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = primaryColor}
                onMouseOut={(e) => e.currentTarget.style.borderColor = ''}
              >
                <div
                  className="absolute bottom-0 left-0 h-1 transition-all duration-300 group-hover:w-full"
                  style={{ width: "0%", backgroundColor: effectiveColor || primaryColor }}
                />
                <span className="text-lg md:text-xl font-black text-slate-950 dark:text-white uppercase tracking-widest break-words">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === "default") {
    return (
      <section>
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight uppercase italic mb-4">
              {title}
            </h2>
            <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 mx-auto rounded-full overflow-hidden">
              <div
                className="h-full rounded-full w-1/2 mx-auto"
                style={{ backgroundColor: primaryColor }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto">
            {skills.map((skill, index) => {
              const effectiveColor = skill.color || primaryColor;
              return (
                <div key={index} className="group">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-lg font-bold text-slate-950 dark:text-white uppercase tracking-wider">
                      {skill.name}
                    </span>
                    {showPercentage && (
                      <span
                        className="text-sm font-black text-slate-400 group-hover:text-indigo-600 transition-colors"
                        style={{ color: effectiveColor }}
                      >
                        {skill.level}%
                      </span>
                    )}
                  </div>
                  {showProgressBar && (
                    <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out group-hover:scale-x-105 origin-left"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: effectiveColor,
                          opacity: 0.9,
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
  if (variant === "artistic") {
    return (
      <section>
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight uppercase italic mb-4">
              {title}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto ">
            {skills.map((skill, index) => {
              const effectiveColor = skill.color || primaryColor;
              return (
                <div
                  key={index}
                  className="p-4 rounded-lg flex items-center justify-center h-24"
                  style={{ backgroundColor: effectiveColor }}
                >
                  <span className="text-xl font-bold text-white uppercase tracking-wider text-center">
                    {skill.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "detailed_cards") {
    return (
      <section className="py-24 bg-[#13131f] -mx-4 px-4">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">
              Services
            </span>
            <h2 className="text-5xl font-black text-[#ff5a5f] tracking-tight">
              {title}
            </h2>
            <div className="h-[4px] w-24 bg-[#ff5a5f]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill: any, index: number) => {
              const skillName = typeof skill === "string" ? skill : skill.name;
              const skillIconStr = typeof skill === "object" ? skill.icon : "";
              const description = skill.description || "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.";

              const iconMap: Record<string, any> = {
                github: Github,
                mobile: Smartphone,
                app: Smartphone,
                database: Database,
                book: Database,
                globe: Globe,
                web: Globe,
                camera: Camera,
                photography: Camera,
                freelancing: Briefcase,
                business: Briefcase,
                layers: Layers,
                code: Code,
                react: Code
              };

              const lowerName = skillName.toLowerCase();
              const IconComponent = iconMap[skillIconStr.toLowerCase()] ||
                iconMap[lowerName] ||
                (lowerName.includes("git") ? Github :
                  lowerName.includes("dev") ? Code :
                    lowerName.includes("design") ? Layers :
                      ArrowRight);

              return (
                <div
                  key={index}
                  className="p-10 bg-[#1a1a2e] rounded-sm hover:-translate-y-2 transition-all duration-300 group shadow-lg shadow-black/20"
                >
                  <div className="text-[#ff5a5f] mb-6 group-hover:scale-110 transition-transform">
                    <div className="w-12 h-12 flex items-center justify-start">
                      <IconComponent size={32} strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="text-white font-black text-lg mb-3 tracking-wide uppercase">
                    {skillName}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "newspaper") {
    const serifFont = "'Playfair Display', 'Georgia', serif";
    const bodyFont = "'Lora', 'Georgia', serif";
    return (
      <div className="bg-[#faf7f2] border-y-4 border-double border-[#2c2c2c] py-16 -mx-4 px-4 text-[#1a1a1a]">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center border-b border-[#2c2c2c] pb-8">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter" style={{ fontFamily: serifFont }}>
              {title || "MARKET INDICES"}
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2c]/60 mt-2" style={{ fontFamily: bodyFont }}>
              DAILY TECH STACK PERFORMANCE REPORT
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-12 pt-8">
            {skills.map((skill: any, index: number) => {
              const skillName = typeof skill === "string" ? skill : skill.name;
              const level = typeof skill === "object" ? skill.level || 80 : 80;
              const isGain = level > 50;
              return (
                <div key={index} className="flex flex-col border-l border-[#2c2c2c]/20 pl-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2c]/40 mb-1" style={{ fontFamily: bodyFont }}>
                    ITEM {index + 1}
                  </span>
                  <div className="flex items-end justify-between gap-2 border-b border-[#2c2c2c] pb-2">
                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tight italic flex-1 truncate" style={{ fontFamily: serifFont }}>
                      {skillName}
                    </h3>
                    <div className="flex flex-col items-end">
                      <span className="text-sm font-black tracking-tighter" style={{ fontFamily: bodyFont }}>
                        {isGain ? "▲" : "▼"} {level}%
                      </span>
                      <span className="text-[8px] font-bold text-[#2c2c2c]/60 uppercase">YTD</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center pt-12 text-[8px] font-medium text-[#2c2c2c]/40 uppercase tracking-[0.3em]">
            MARKET DATA IS DELAYED BY AT LEAST 15 MINUTES • SOURCE: CREATIVE CODING INDEX
          </div>
        </div>
      </div>
    );
  }

  if (variant === "pixel") {
    const pixelFont = "'Press Start 2P', monospace";
    return (
      <div className="relative bg-[#0a0a2e] border-[3px] p-6 md:p-8 overflow-hidden"
        style={{ boxShadow: `0 0 20px ${primaryColor}26`, borderColor: primaryColor }}>
        <span className="absolute top-2 left-3 text-xs select-none opacity-40" style={{ fontFamily: pixelFont, color: primaryColor }}>+</span>
        <span className="absolute top-2 right-3 text-xs select-none opacity-40" style={{ fontFamily: pixelFont, color: primaryColor }}>+</span>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 border-2 bg-transparent flex items-center justify-center" style={{ borderColor: primaryColor, backgroundColor: `${primaryColor}33` }}>
            <Layers size={14} style={{ color: primaryColor }} />
          </div>
          <h2 className="text-xs md:text-sm uppercase tracking-wider" style={{ fontFamily: pixelFont, color: primaryColor }}>
            {title}
          </h2>
        </div>
        <div className="space-y-4">
          {skills.map((skill: any, index: number) => {
            const skillName = typeof skill === "string" ? skill : skill.name;
            const level = typeof skill === "object" ? skill.level || 80 : 80;
            const blocks = Math.round(level / 10);
            return (
              <div key={index} className="flex items-center gap-4">
                <span className="text-[8px] md:text-[10px] uppercase tracking-wider w-28 md:w-36 flex-shrink-0 truncate" style={{ fontFamily: pixelFont, color: primaryColor }}>
                  {skillName}
                </span>
                <div className="flex-1 flex gap-[3px]">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-3 flex-1 border`}
                      style={{
                        borderColor: `${primaryColor}4d`,
                        backgroundColor: i < blocks ? primaryColor : `${primaryColor}1a`
                      }}
                    />
                  ))}
                </div>
                <div className="w-7 h-7 border-2 bg-[#1a1a4e] flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px]" style={{ borderColor: primaryColor, boxShadow: `2px 2px 0px 0px ${primaryColor}` }}>
                  <span className="text-[6px]" style={{ fontFamily: pixelFont, color: primaryColor }}>
                    {skillName.substring(0, 2).toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}4d 2px, ${primaryColor}4d 4px)` }}
        />
      </div>
    );
  }

  if (variant === "creative_gradient") {
    // Helper for icons if passed as string names, assuming standard set or Lucide
    // In a real implementation, we'd map string names to components.
    // For now, we'll use a placeholder circle with initials if no icon is available.

    return (
      <section className="py-8">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-12 drop-shadow-lg">
          {title}
        </h2>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => {
            // Handle both string and object skills
            const skillName = typeof skill === "string" ? skill : skill.name;
            const skillIcon = typeof skill === "object" ? skill.icon : null;
            // Generate initials for fallback icon
            const initials = skillName.substring(0, 2).toUpperCase();

            return (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-pink-500/0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>

                {/* Icon Placeholder or Image */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {skillIcon ? (
                    <span className="text-2xl">⚡</span> // Placeholder till valid icon mapping
                  ) : (
                    initials
                  )}
                </div>

                <span className="text-white font-bold tracking-wide text-sm uppercase text-center relative z-10">
                  {skillName}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
};

export default Skills;
