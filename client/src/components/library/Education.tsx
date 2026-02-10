import React from 'react';
import { useSite } from '../../context/useSite';
import { GraduationCap, Briefcase, Plus, Calendar, Star, Award, MapPin, Link as LinkIcon, ChevronRight } from "lucide-react";

const ICON_MAP: Record<string, any> = {
    GraduationCap,
    Briefcase,
    Plus,
    Calendar,
    Star,
    Award,
    MapPin,
    Link: LinkIcon
};

interface EducationItem {
    school: string;
    degree: string;
    period: string;
    icon?: string;
}

interface EducationProps {
    title: string;
    items: EducationItem[];
    variant?:
    | "timeline"
    | "cards"
    | "brutalist"
    | "outline_minimal"
    | "impact"
    | "glassmorphism"
    | "connected_line"
    | "creative_gradient"
    | "pixel";
}

const Education: React.FC<EducationProps> = ({ title, items, variant = 'timeline' }) => {
    const { siteConfig } = useSite();
    const primaryColor = siteConfig.site_settings.theme.primary;

    if (variant === 'impact') {
        return (
            <div className="space-y-16 py-12">
                <div className="flex flex-col items-center text-center space-y-4">
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-1 bg-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">ACADEMICS</span>
                        <div className="w-12 h-1 bg-indigo-600" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white uppercase tracking-tighter leading-none">
                        Education <span className="text-indigo-600">Background</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="group p-8 md:p-12 bg-white dark:bg-slate-900 border-[3px] border-slate-100 dark:border-white/5 rounded-none hover:border-indigo-600 dark:hover:border-indigo-600 transition-all duration-500 flex flex-col justify-between"
                        >
                            <div className="space-y-6">
                                <div className="text-lg font-black uppercase tracking-widest text-indigo-600">
                                    {item.period}
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white uppercase tracking-tighter leading-none">
                                        {item.school}
                                    </h3>
                                    <p className="text-md font-bold text-slate-400 uppercase tracking-widest">
                                        {item.degree}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (variant === 'outline_minimal') {
        return (
            <div className="max-w-4xl mx-auto py-16">
                <h2 className="text-4xl font-black text-slate-950 dark:text-white uppercase tracking-widest text-left mb-16 border-l-4 border-slate-950 dark:border-white pl-6">{title}</h2>
                <div className="space-y-0 border-t border-slate-950 dark:border-white">
                    {items.map((item, index) => (
                        <div key={index} className="py-10 border-b border-slate-950 dark:border-white flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors px-4">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tighter">{item.school}</h3>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{item.degree}</p>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-950 dark:text-white bg-slate-100 dark:bg-slate-800 px-3 py-1 self-start md:self-center">
                                {item.period}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (variant === 'brutalist') {
        return (
            <div className="max-w-4xl mx-auto space-y-12 py-12">
                <h2 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white uppercase italic tracking-tighter text-center mb-16">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((item, index) => {
                        return (
                            <div key={index} className="bg-white dark:bg-slate-900 border-[3px] border-slate-950 dark:border-white rounded-2xl p-6 flex items-center gap-6 shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(2,6,23,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer group animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="w-20 h-24 bg-orange-100 dark:bg-slate-800 border-[3px] border-slate-950 dark:border-white rounded-xl flex items-center justify-center font-black text-[12px] p-3 text-center uppercase shadow-inner leading-tight text-slate-950 dark:text-white flex-shrink-0">
                                    {item.school.split(' ').slice(0, 2).join('\n')}
                                </div>
                                <div className="flex-1">
                                    <div className="text-md font-black text-slate-950 dark:text-white uppercase tracking-tight leading-tight">{item.school}</div>
                                    <div className="text-xs font-bold text-slate-400 mt-1">{item.degree}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mt-4 leading-none">{item.period}</div>
                                </div>
                                <div className="text-slate-950 dark:text-white group-hover:translate-x-1 transition-transform">
                                    <ChevronRight className="w-6 h-6 stroke-[3px]" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (variant === 'pixel') {
        const pixelFont = "'Press Start 2P', monospace";
        return (
            <div className="relative bg-[#0a0a2e] border-[3px] border-[#00ff41] p-6 md:p-8 overflow-hidden"
                style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.15)' }}>
                {/* Corner markers */}
                <span className="absolute top-2 left-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
                <span className="absolute top-2 right-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>

                {/* Section header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 border-2 border-[#00ff41] bg-[#00ff41]/20 flex items-center justify-center">
                        <GraduationCap size={14} className="text-[#00ff41]" />
                    </div>
                    <h2 className="text-xs md:text-sm text-[#00ff41] uppercase tracking-wider" style={{ fontFamily: pixelFont }}>
                        {title}
                    </h2>
                </div>

                {/* Items */}
                <div className="space-y-0 relative">
                    {items.map((item, index) => (
                        <div key={index} className="relative">
                            {/* Dashed connector */}
                            {index > 0 && (
                                <div className="w-px h-4 border-l-2 border-dashed border-[#00ff41]/30 ml-[15px]" />
                            )}
                            <div className="flex items-start gap-4 group">
                                {/* Year badge */}
                                <div className="w-[32px] h-[32px] border-2 border-[#00ff41] bg-[#1a1a4e] flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_#00ff41]">
                                    <span className="text-[6px] text-[#00ff41] font-bold" style={{ fontFamily: pixelFont }}>
                                        {item.period.match(/\d{4}/)?.[0] || item.period.slice(0, 4)}
                                    </span>
                                </div>
                                {/* Content */}
                                <div className="pt-1">
                                    <h3 className="text-[10px] md:text-xs text-[#00ff41] uppercase tracking-wide leading-relaxed" style={{ fontFamily: pixelFont }}>
                                        {item.school}
                                    </h3>
                                    <p className="text-[8px] md:text-[10px] text-[#00ff41]/50 uppercase tracking-wider mt-1" style={{ fontFamily: pixelFont }}>
                                        {item.degree}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scanline */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.3) 2px, rgba(0,255,65,0.3) 4px)' }}
                />
            </div>
        );
    }

    return (
        <section className="py-12">
            <div className="flex items-center gap-3 mb-10">
                <div
                    className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100"
                    style={{ color: primaryColor }}
                >
                    <GraduationCap size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-950 dark:text-white uppercase italic tracking-tighter">{title}</h2>
            </div>

            <div className="relative pl-8 space-y-12">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-gray-100 dark:bg-slate-800"></div>

                {items.map((item, index) => {
                    const IconComponent = ICON_MAP[item.icon || ''] || null;
                    return (
                        <div key={index} className="relative">
                            {/* Dot/Icon */}
                            {IconComponent ? (
                                <div
                                    className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm flex items-center justify-center z-10"
                                    style={{ color: index === 0 ? primaryColor : undefined }}
                                >
                                    <IconComponent size={14} />
                                </div>
                            ) : (
                                <div
                                    className="absolute -left-[33px] top-1.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 shadow-sm"
                                    style={{ backgroundColor: index === 0 ? primaryColor : '#d1d5db' }}
                                ></div>
                            )}

                            <div>
                                <h3 className="text-xl font-bold text-slate-950 dark:text-white mb-1 leading-none">{item.school}</h3>
                                <p className="text-slate-900 dark:text-slate-400 font-medium mb-1">{item.degree}</p>
                                <p className="text-slate-950 dark:text-slate-500 text-xs font-black uppercase tracking-widest leading-none">{item.period}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Education;
