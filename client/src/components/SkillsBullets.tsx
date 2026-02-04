import React from "react";
import { useSite } from "../context/SiteContext";

interface SkillsBulletsProps {
    title: string;
    skills: string[];
    bulletColor?: string;
    textColor?: string;
    borderColor?: string;
    backgroundColor?: string;
}

const SkillsBullets: React.FC<SkillsBulletsProps> = ({
    title,
    skills = [],
    bulletColor,
    textColor,
    borderColor,
    backgroundColor,
}) => {
    const { siteConfig } = useSite();
    const primaryColor = bulletColor || siteConfig.site_settings.theme.primary;
    const txtColor = textColor || "text-slate-700";
    const brdColor = borderColor || "border-slate-100";
    const bgColor = backgroundColor || "bg-white";

    // Helper to determine if a color string is hex or tailwind class
    const isHex = (color: string) => color.startsWith('#') || color.startsWith('rgb');

    const getStyle = () => {
        const style: React.CSSProperties = {};
        if (isHex(brdColor)) style.borderColor = brdColor;
        if (isHex(bgColor)) style.backgroundColor = bgColor;
        if (isHex(txtColor)) style.color = txtColor;
        return style;
    };

    const getClasses = () => {
        let classes = "px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-default border-2 ";
        if (!isHex(brdColor)) classes += brdColor + " ";
        if (!isHex(bgColor)) classes += bgColor + " ";
        if (!isHex(txtColor)) classes += txtColor + " ";
        return classes;
    };

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
                        className={getClasses()}
                        style={getStyle()}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-lg font-bold uppercase tracking-wider">
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
