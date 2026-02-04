import React from 'react';
import { useSite } from '../context/SiteContext';
import { Briefcase, Calendar } from 'lucide-react';

interface Job {
    role: string;
    company: string;
    period: string;
    description: string;
}

interface ExperienceProps {
    title: string;
    jobs: Job[];
}

const Experience: React.FC<ExperienceProps> = ({ title, jobs }) => {
    const { siteConfig } = useSite();
    const primaryColor = siteConfig.site_settings.theme.primary;

    return (
        <section>
            <div>
                <div className="flex flex-col md:flex-row gap-16">
                    <div className="md:w-1/3">
                        <div className="sticky top-12">
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase italic mb-6 leading-none">
                                {title}
                            </h2>
                            <div className="w-16 h-2 rounded-full mb-8" style={{ backgroundColor: primaryColor }}></div>
                            <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                A timeline of my professional journey and contributions to the tech industry.
                            </p>
                        </div>
                    </div>

                    <div className="md:w-2/3 relative">
                        <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 -z-10"></div>

                        <div className="space-y-12">
                            {jobs.map((job, index) => (
                                <div key={index} className="relative pl-24 group">
                                    <div className="absolute left-0 top-0 w-16 h-16 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-500/30 group-hover:shadow-[0_10px_30px_-5px_rgba(99,102,241,0.2)] transition-all z-10">
                                        <Briefcase size={24} style={{ color: index === 0 ? primaryColor : undefined }} />
                                    </div>

                                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_5px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                                            <h3 className="text-xl font-bold text-slate-900">{job.role}</h3>
                                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
                                                <Calendar size={12} /> {job.period}
                                            </div>
                                        </div>
                                        <div className="text-indigo-600 font-bold mb-4 uppercase tracking-wide text-sm" style={{ color: primaryColor }}>{job.company}</div>
                                        <p className="text-slate-600 leading-relaxed font-medium">
                                            {job.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
