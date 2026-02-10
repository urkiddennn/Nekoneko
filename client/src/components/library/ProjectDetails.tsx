import { ExternalLink } from 'lucide-react';

interface ProjectItem {
    title: string;
    image: string;
    tags: string[];
    link: string;
    description?: string;
    stacks?: string[];
}

interface ProjectDetailsProps {
    title?: string;
    description?: string;
    stacks?: string[];
    link?: string;
    items?: ProjectItem[];
    columns?: number;
    variant?: 'card' | 'grid' | 'impact';
}

const optimizeImageUrl = (url: string, width: number = 800) => {
    if (!url) return url;
    if (url.includes("images.unsplash.com")) {
        const baseUrl = url.split("?")[0];
        return `${baseUrl}?auto=format&fit=crop&q=80&w=${width}`;
    }
    return url;
};

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
    title = "Project Title",
    description = "Detailed description.",
    stacks = [],
    link,
    items = [],
    columns = 2,
    variant = 'card'
}) => {
    const gridClass = columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    if (variant === 'impact' || variant === 'grid') {
        const isImpact = variant === 'impact';
        const displayItems = items.length > 0 ? items : [{ title, description, stacks, link, image: '', tags: stacks }];

        if (isImpact) {
            return (
                <div className="space-y-16">
                    <div className="flex flex-col items-start gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-1 bg-indigo-600" />
                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">PORTFOLIO</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white uppercase tracking-tighter leading-none">
                            Featured <span className="text-indigo-600">Work</span>
                        </h2>
                    </div>

                    <div className={`grid ${gridClass} gap-12`}>
                        {displayItems.map((item, idx) => (
                            <a
                                key={idx}
                                href={item.link}
                                className="group block space-y-6 transition-all duration-700"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] bg-gray-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 shadow-sm group-hover:shadow-2xl group-hover:shadow-indigo-500/20 transition-all duration-700">
                                    <img
                                        src={optimizeImageUrl(item.image, 800)}
                                        alt={item.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-end p-8">
                                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                                            <span className="text-white text-xs font-black uppercase tracking-widest bg-indigo-600 px-4 py-2 rounded-none">View Case Study</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4 px-2">
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags?.map((tag, tIdx) => (
                                            <span key={tIdx} className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-black text-slate-950 dark:text-white uppercase tracking-tighter leading-none group-hover:text-indigo-600 transition-colors">
                                        {item.title}
                                    </h3>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            );
        }

        return (
            <div>
                {title && <h2 className="text-3xl font-black mb-12 text-slate-950 dark:text-white border-l-8 border-indigo-600 dark:border-indigo-400 pl-6 uppercase italic tracking-tighter">{title}</h2>}
                <div className={`grid ${gridClass} gap-8`}>
                    {displayItems.map((item, idx) => (
                        <a key={idx} href={item.link} className="group block overflow-hidden rounded-2xl bg-gray-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 hover:shadow-2xl transition-all duration-500">
                            <div className="aspect-[16/10] overflow-hidden">
                                <img src={optimizeImageUrl(item.image, 800)} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 text-slate-950 dark:text-white">{item.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {item.tags?.map((tag, tIdx) => (
                                        <span key={tIdx} className="px-3 py-1 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase rounded-full">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
            <div className="flex-1">
                <h3 className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors mb-3 leading-none">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                    {description}
                </p>
                {stacks.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {stacks.map((stack, idx) => (
                            <span
                                key={idx}
                                className="px-2.5 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 rounded-md"
                            >
                                {stack}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {link && (
                <div className="pt-6 border-t border-gray-50 dark:border-slate-800">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white hover:text-black dark:hover:text-indigo-400 transition-colors group/link"
                    >
                        Visit Link
                        <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;


