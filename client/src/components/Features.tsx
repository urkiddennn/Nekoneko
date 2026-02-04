import React from 'react';


interface FeaturesProps {
    title: string;
    items: any[];
    columns?: number;
    renderItem?: (item: any, index: number) => React.ReactNode;
}

const Features: React.FC<FeaturesProps> = ({ title, items, columns = 3, renderItem }) => {
    const gridClass = columns === 2 ? 'grid-cols-2' : 'grid-cols-3';
    return (
        <div>
            <h2 className="text-4xl font-black mb-16 text-center tracking-tighter uppercase italic">{title}</h2>
            <div className={`grid ${gridClass} gap-12`}>
                {items?.map((item, idx) => (
                    <div key={idx} className={item.type ? "" : "space-y-4 p-8 bg-slate-50 rounded-[32px] border border-slate-100 ring-1 ring-slate-200/50 hover:shadow-xl transition-all"}>
                        {item.type && renderItem ? (
                            renderItem(item, idx)
                        ) : (
                            <>
                                <h3 className="text-xl font-black text-indigo-600 uppercase tracking-tight">{item.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.description}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
