import React from "react";
import { useSite } from "../context/SiteContext";

interface Skill {
  name: string;
  level: number; // 0-100
  icon?: string;
  color?: string;
}

interface SkillsProps {
  title: string;
  skills: Skill[];
  barColor?: string;
  showProgressBar?: boolean; // New prop to control visibility of the progress bar
  showPercentage?: boolean; // New prop to control visibility of the percentage
}

const Skills: React.FC<SkillsProps> = ({
  title,
  skills,
  barColor,
  showProgressBar = true,
  showPercentage = true,
}) => {
  const { siteConfig } = useSite();
  const primaryColor = barColor || siteConfig.site_settings.theme.primary;

  return (
    <section>
      <div>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic mb-4">
            {title}
          </h2>
          <div className="w-24 h-1.5 bg-slate-200 mx-auto rounded-full overflow-hidden">
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
                  <span className="text-lg font-bold text-slate-700 uppercase tracking-wider">
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
                  <div className="h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 shadow-inner">
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
};

export default Skills;
