import React from 'react';


interface FeaturesProps {
    title: string;
    items: any[];
    columns?: number;
    renderItem?: (item: any, index: number) => React.ReactNode;
    variant?: 'default' | 'brutalist' | 'outline_minimal';
}

const Features: React.FC<FeaturesProps> = ({ title, items, columns = 3, renderItem, variant = 'default' }) => {
    const isBrutalist = variant === 'brutalist';
    const isOutlineMinimal = variant === 'outline_minimal';
    const gridClass = columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    return (
        <div>
            <h2 className="text-4xl font-black mb-16 text-center tracking-tighter uppercase italic text-slate-950 dark:text-white">{title}</h2>
            <div className={`grid ${gridClass} gap-12`}>
                {items?.map((item, idx) => (
                    <div key={idx} className={item.type ? "" : isBrutalist
                        ? "space-y-6 p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(2,6,23,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] transition-all animate-in fade-in zoom-in-95 duration-500"
                        : isOutlineMinimal
                            ? "space-y-8 p-12 bg-white dark:bg-slate-950 rounded-none border border-slate-950 dark:border-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500"
                            : "space-y-4 p-8 bg-slate-50 dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 ring-1 ring-slate-200/50 hover:shadow-xl transition-all"}>
                        {item.type && renderItem ? (
                            renderItem(item, idx)
                        ) : (
                            <>
                                <h3 className="text-xl font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-slate-950 dark:text-slate-400 font-medium leading-relaxed">{item.description}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
