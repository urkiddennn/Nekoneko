import React from 'react';
import * as Icons from 'lucide-react';

interface StatItem {
    label: string;
    value: string;
    icon?: string;
}

interface StatsBarProps {
    items?: StatItem[];
    stats?: StatItem[]; // Backward compatibility
}

const StatsBar: React.FC<StatsBarProps> = ({ items, stats }) => {
    const displayItems = items || stats || [];
    return (
        <div className="flex flex-wrap items-center justify-around gap-12 py-10 px-8 bg-white dark:bg-slate-900/50 rounded-[2.5rem] border-2 border-slate-50 dark:border-slate-800 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)]">
            {displayItems.map((item, idx) => {
                const IconComponent = (Icons as any)[item.icon || ''] || null;
                return (
                    <div key={idx} className="text-center group flex flex-col items-center">
                        <div className="flex items-center gap-2">
                            {IconComponent && <IconComponent size={24} className="text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />}
                            <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">{item.value}</div>
                        </div>
                        <div className="text-[10px] uppercase font-black text-slate-950 dark:text-slate-500 tracking-[0.2em] mt-2 leading-none">{item.label}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default StatsBar;
