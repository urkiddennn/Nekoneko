import React from 'react';
import { useSite } from '../../context/SiteContext';
import * as Icons from 'lucide-react';

interface Job {
    role: string;
    company: string;
    period: string;
    description: string;
    icon?: string;
}

interface ExperienceProps {
    title: string;
    jobs: Job[];
    variant?: 'timeline' | 'cards' | 'brutalist' | 'outline_minimal';
}

const Experience: React.FC<ExperienceProps> = ({ title, jobs, variant = 'cards' }) => {
    const { siteConfig } = useSite();
    const primaryColor = siteConfig.site_settings.theme.primary;

    if (variant === 'outline_minimal') {
        return (
            <div className="max-w-4xl mx-auto space-y-24 py-16">
                <h2 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white uppercase tracking-tighter text-center mb-24 border-b border-slate-950 dark:border-white pb-12">{title}</h2>
                <div className="relative border-l border-slate-950 dark:border-white ml-6 md:ml-0 overflow-visible">
                    {jobs.map((job, index) => {
                        return (
                            <div key={index} className="relative pl-12 pb-24 group last:pb-0">
                                <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] bg-slate-950 dark:bg-white rounded-none z-10" />
                                <div className="space-y-6">
                                    <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                                        <h3 className="text-2xl md:text-3xl font-black text-slate-950 dark:text-white uppercase tracking-tighter">{job.role}</h3>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                                            {job.period}
                                        </span>
                                    </div>
                                    <div className="text-slate-950 dark:text-white font-black uppercase text-xs tracking-widest">{job.company}</div>
                                    <p className="text-md font-bold text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">{job.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (variant === 'brutalist') {
        return (
            <div className="max-w-4xl mx-auto space-y-12 py-12">
                <h2 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white uppercase italic tracking-tighter text-center mb-16">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {jobs.map((job, index) => {
                        const IconComponent = (Icons as any)[job.icon || ''] || Icons.Briefcase;
                        return (
                            <div key={index} className="bg-white dark:bg-slate-900 border-[3px] border-slate-950 dark:border-white rounded-[2rem] overflow-hidden shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 transition-all flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                <div className="p-8 space-y-4 flex-1">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full border-[3px] border-slate-950 dark:border-white flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm overflow-hidden">
                                                <IconComponent size={18} className="text-slate-950 dark:text-white" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-tight">{job.role}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{job.period}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-indigo-600 dark:text-indigo-400 font-black uppercase text-xs tracking-widest">{job.company}</div>
                                    <p className="text-md font-bold text-slate-900 dark:text-slate-300 leading-relaxed line-clamp-3">{job.description}</p>
                                </div>
                                <div className="bg-indigo-100 dark:bg-slate-800 p-4 border-t-[3px] border-slate-950 dark:border-white flex items-center gap-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <div className="w-6 h-6 bg-slate-950 dark:bg-white rounded-full flex items-center justify-center">
                                        <Icons.Plus className="w-3 h-3 text-white dark:text-slate-950 stroke-[4px]" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-950 dark:text-white">View Project Details</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (variant === 'timeline') {
        return (
            <section className="py-12">
                <div className="flex items-center gap-3 mb-10">
                    <h2 className="text-2xl font-black text-slate-950 dark:text-white uppercase italic tracking-tighter">{title}</h2>
                </div>
                <div className="relative pl-8 space-y-12 border-l-2 border-gray-100 dark:border-slate-800 ml-4">
                    {jobs.map((job, index) => {
                        const IconComponent = (Icons as any)[job.icon || ''] || Icons.Briefcase;
                        return (
                            <div key={index} className="relative">
                                <div
                                    className="absolute -left-[45px] top-0 w-8 h-8 rounded-full bg-white dark:bg-slate-950 border-2 border-gray-100 dark:border-slate-800 flex items-center justify-center z-10 shadow-sm"
                                    style={{ color: primaryColor }}
                                >
                                    <IconComponent size={14} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-bold text-slate-950 dark:text-white">{job.role}</h3>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-950 dark:text-gray-500 bg-gray-50 dark:bg-slate-900/50 px-2 py-1 rounded">
                                            {job.period}
                                        </span>
                                    </div>
                                    <div className="text-sm font-bold text-indigo-600" style={{ color: primaryColor }}>{job.company}</div>
                                    <p className="text-slate-950 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">{job.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        );
    }

    return (
        <section>
            <div>
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-12">
                            <h2 className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight uppercase italic mb-6 leading-none">
                                {title}
                            </h2>
                            <div className="w-16 h-2 rounded-full mb-8" style={{ backgroundColor: primaryColor }}></div>
                            <p className="text-slate-900 dark:text-slate-400 font-medium text-lg leading-relaxed">
                                A timeline of my professional journey and contributions to the tech industry.
                            </p>
                        </div>
                    </div>

                    <div className="md:w-2/3 relative mt-16 md:mt-0">
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -z-10 hidden md:block"></div>
                        <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-800 -z-10 md:hidden ml-8"></div>

                        <div className="space-y-12">
                            {jobs.map((job, index) => {
                                const IconComponent = (Icons as any)[job.icon || ''] || Icons.Briefcase;
                                return (
                                    <div key={index} className="relative pl-24 md:pl-24 group">
                                        <div className="absolute left-0 top-0 w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:border-indigo-500/30 group-hover:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.2)] transition-all z-10">
                                            <IconComponent size={24} style={{ color: index === 0 ? primaryColor : undefined }} />
                                        </div>

                                        <div className="bg-white dark:bg-slate-900/50 p-6 md:p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-[0_5px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                                <h3 className="text-lg md:text-xl font-bold text-slate-950 dark:text-white">{job.role}</h3>
                                                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-950 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full w-fit">
                                                    <Icons.Calendar size={12} /> {job.period}
                                                </div>
                                            </div>
                                            <div className="text-indigo-600 font-bold mb-4 uppercase tracking-wide text-sm" style={{ color: primaryColor }}>{job.company}</div>
                                            <p className="text-slate-900 dark:text-slate-400 leading-relaxed font-medium text-sm md:text-base">
                                                {job.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
