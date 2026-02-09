import React from "react";
import { useSite } from "../../context/useSite";

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
    | "glassmorphism";
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
            <div className="w-12 h-1 bg-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              EXPERTISE
            </span>
            <div className="w-12 h-1 bg-indigo-600" />
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
                className="group relative px-8 py-5 bg-white dark:bg-slate-900 border-[3px] border-slate-100 dark:border-white/5 rounded-none hover:border-indigo-600 dark:hover:border-indigo-600 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className="absolute bottom-0 left-0 h-1 bg-indigo-600 transition-all duration-300 group-hover:w-full"
                  style={{ width: "0%", backgroundColor: effectiveColor }}
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
  //glassmorphism variant
  if (variant === "glassmorphism") {
    return (
      <section>
        <div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight uppercase italic mb-4">
              {title}
            </h2>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto
"
          >
            {skills.map((skill, index) => {
              return (
                <div
                  key={index}
                  className="p-4 flex items-center justify-center h-24 bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100"
                >
                  <span className="p-4 text-xl font-bold text-black uppercase tracking-wider text-center">
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
};

export default Skills;
