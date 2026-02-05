import React from 'react';

interface ProjectItem {
    title: string;
    image: string;
    tags: string[];
    link: string;
}

interface ProjectGridProps {
    title: string;
    columns: number;
    items?: ProjectItem[];
    projects?: ProjectItem[]; // Backward compatibility
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ title, columns, items, projects }) => {
    const displayItems = items || projects || [];
    const gridClass = columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    return (
        <div>
            <h2 className="text-3xl font-black mb-12 text-slate-950 dark:text-white border-l-8 border-indigo-600 dark:border-indigo-400 pl-6 uppercase italic tracking-tighter">{title}</h2>
            <div className={`grid ${gridClass} gap-8`}>
                {displayItems.map((item, idx) => (
                    <a key={idx} href={item.link} className="group block overflow-hidden rounded-2xl bg-gray-50 dark:bg-slate-900 border border-transparent dark:border-slate-800 hover:shadow-2xl transition-all duration-500">
                        <div className="aspect-[16/10] overflow-hidden">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
};

export default ProjectGrid;
