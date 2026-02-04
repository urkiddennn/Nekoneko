import React from 'react';

interface StatItem {
    label: string;
    value: string;
}

interface StatsBarProps {
    items: StatItem[];
}

const StatsBar: React.FC<StatsBarProps> = ({ items }) => {
    return (
        <div className="flex justify-around items-center py-10 bg-gray-50 border-y border-gray-100 italic">
            {items.map((item, idx) => (
                <div key={idx} className="text-center group">
                    <div className="text-4xl font-black text-indigo-600 group-hover:scale-110 transition-transform">{item.value}</div>
                    <div className="text-xs uppercase font-bold text-gray-400 tracking-widest mt-1">{item.label}</div>
                </div>
            ))}
        </div>
    );
};

export default StatsBar;
