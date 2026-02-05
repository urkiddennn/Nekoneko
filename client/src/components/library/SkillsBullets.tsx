import React from "react";
import { useSite } from '../../context/useSite';

interface SkillsBulletsProps {
    title: string;
    skills: string[];
    bulletColor?: string;
    textColor?: string;
    borderColor?: string;
    backgroundColor?: string;
    variant?: 'default' | 'brutalist' | 'outline_minimal';
}

const SkillsBullets: React.FC<SkillsBulletsProps> = ({
    title,
    skills = [],
    bulletColor,
    textColor,
    borderColor,
    backgroundColor,
    variant = 'default',
}) => {
    const { siteConfig } = useSite();
    const isBrutalist = variant === 'brutalist';
    const isOutlineMinimal = variant === 'outline_minimal';
    const primaryColor = bulletColor || siteConfig.site_settings.theme.primary;
    const txtColor = textColor || "text-slate-700 dark:text-slate-200";
    const brdColor = borderColor || "border-slate-100 dark:border-slate-800";
    const bgColor = backgroundColor || "bg-white dark:bg-slate-900";

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
        let classes = isBrutalist
            ? "px-8 py-4 rounded-2xl border-[3px] border-slate-950 dark:border-white shadow-[3px_3px_0px_0px_rgba(2,6,23,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[5px_5px_0px_0px_rgba(2,6,23,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 group cursor-default "
            : isOutlineMinimal
                ? "px-10 py-4 rounded-none border border-slate-950 dark:border-white hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 group cursor-default "
                : "px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group cursor-default border-2 ";
        if (!isHex(brdColor) && !isBrutalist && !isOutlineMinimal) classes += brdColor + " ";
        if (!isHex(bgColor)) classes += bgColor + " ";
        if (!isHex(txtColor)) classes += txtColor + " ";
        return classes;
    };
    return (
        <section>
            <div className="text-center mb-12">
                <h2 className={`text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-[ -0.05em] uppercase ${isOutlineMinimal ? 'border-b border-slate-950 dark:border-white inline-block pb-4 px-12' : 'italic'}`}>
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
