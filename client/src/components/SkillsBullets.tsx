import React from "react";
import { useSite } from "../context/SiteContext";

interface SkillsBulletsProps {
    title: string;
    skills: string[];
    bulletColor?: string;
}

const SkillsBullets: React.FC<SkillsBulletsProps> = ({
    title,
    skills = [],
    bulletColor,
}) => {
    const { siteConfig } = useSite();
    const primaryColor = bulletColor || siteConfig.site_settings.theme.primary;

    return (
        <section>
            <div className="text-center mb-12">
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

            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className="px-6 py-3 rounded-2xl bg-white border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-300 group cursor-default"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="w-2.5 h-2.5 rounded-full animate-pulse"
                                style={{ backgroundColor: primaryColor }}
                            ></div>
                            <span className="text-lg font-bold text-slate-700 uppercase tracking-wider group-hover:text-slate-900">
                                {skill}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkillsBullets;
