import React from 'react';

interface PricingTier {
    name: string;
    price: string;
    features: string[];
    isPopular?: boolean;
}

interface PricingProps {
    title: string;
    plans?: PricingTier[];
    tiers?: PricingTier[]; // Backward compatibility
    variant?: 'grid' | 'list' | 'brutalist' | 'outline_minimal';
}

const Pricing: React.FC<PricingProps> = ({ title, plans, tiers, variant = 'grid' }) => {
    const displayPlans = plans || tiers || [];

    if (variant === 'list') {
        return (
            <div className="max-w-4xl mx-auto">
                <h2 className="text-4xl font-black mb-16 text-center tracking-tighter uppercase italic text-slate-950 dark:text-white">{title}</h2>
                <div className="space-y-4">
                    {displayPlans.map((tier, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-indigo-600/20 transition-all group">
                            <div className="flex-1">
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-1">{tier.name}</h3>
                                <div className="text-3xl font-black tracking-tighter text-slate-950 dark:text-white">{tier.price}</div>
                            </div>
                            <div className="flex-[2] flex flex-wrap gap-x-6 gap-y-2">
                                {tier.features?.map((f, i) => (
                                    <div key={i} className="text-xs font-bold text-slate-900 dark:text-slate-400 flex items-center gap-2">
                                        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                        {f}
                                    </div>
                                ))}
                            </div>
                            <button className="px-8 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[10px] whitespace-nowrap group-hover:bg-indigo-600 transition-colors">Select Plan</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const gridCols = displayPlans.length === 1 ? 'grid-cols-1 max-w-lg mx-auto' : displayPlans.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    if (variant === 'outline_minimal') {
        return (
            <div className="max-w-7xl mx-auto py-12">
                <h2 className="text-6xl font-black mb-24 text-center tracking-[ -0.05em] uppercase text-slate-950 dark:text-white border-b border-slate-950 dark:border-white pb-12">{title}</h2>
                <div className={`grid ${displayPlans.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} border-l border-t border-slate-950 dark:border-white`}>
                    {displayPlans.map((tier, idx) => (
                        <div key={idx} className={`p-16 border-r border-b border-slate-950 dark:border-white bg-white dark:bg-slate-950 space-y-12 flex flex-col hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors`}>
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-slate-400">{tier.name}</h3>
                                <div className="text-6xl font-black tracking-tight text-slate-950 dark:text-white">{tier.price}</div>
                            </div>
                            <ul className="flex-1 space-y-4">
                                {tier.features?.map((f, i) => (
                                    <li key={i} className="text-[11px] font-black uppercase tracking-widest flex items-center justify-between text-slate-500 group">
                                        <span>{f}</span>
                                        <div className="w-1 h-1 bg-slate-950 dark:bg-white rounded-none"></div>
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-6 rounded-none font-black uppercase tracking-tighter text-sm border border-slate-950 dark:border-white transition-all hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-black">
                                Join Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (variant === 'brutalist') {
        return (
            <div className="max-w-7xl mx-auto py-12">
                <h2 className="text-4xl md:text-5xl font-black mb-20 text-center tracking-tighter uppercase italic text-slate-950 dark:text-white animate-in fade-in slide-in-from-top-4 duration-700">{title}</h2>
                <div className={`grid ${gridCols} gap-10`}>
                    {displayPlans.map((tier, idx) => (
                        <div key={idx} className={`p-10 rounded-[2.5rem] border-[3px] border-slate-950 dark:border-white shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-slate-900 space-y-8 flex flex-col transition-all hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] animate-in fade-in zoom-in-95 duration-500`} style={{ animationDelay: `${idx * 150}ms` }}>
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-2 text-indigo-600 dark:text-indigo-400">{tier.name}</h3>
                                <div className="text-5xl font-black tracking-tighter text-slate-950 dark:text-white">{tier.price}</div>
                            </div>
                            <ul className="flex-1 space-y-5">
                                {tier.features?.map((f, i) => (
                                    <li key={i} className="text-sm font-bold flex items-center gap-4 text-slate-900 dark:text-slate-300">
                                        <div className="w-2.5 h-2.5 rounded-full bg-slate-950 dark:bg-white"></div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] border-[3px] border-slate-950 dark:border-white shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 transition-all">Select Plan</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-4xl font-black mb-16 text-center tracking-tighter uppercase italic text-slate-950 dark:text-white">{title}</h2>
            <div className={`grid ${gridCols} gap-8`}>
                {displayPlans.map((tier, idx) => (
                    <div key={idx} className={`p-10 rounded-[40px] border-2 ${tier.isPopular ? 'bg-indigo-600 border-indigo-600 dark:border-indigo-500 text-white shadow-2xl scale-105 z-10' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-950 dark:text-white'} space-y-8 flex flex-col`}>
                        <div>
                            <h3 className={`text-sm font-black uppercase tracking-[0.2em] mb-2 ${tier.isPopular ? 'opacity-80' : 'opacity-60'}`}>{tier.name}</h3>
                            <div className="text-5xl font-black tracking-tighter">{tier.price}</div>
                        </div>
                        <ul className="flex-1 space-y-4">
                            {tier.features?.map((f, i) => (
                                <li key={i} className="text-sm font-bold flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full ${tier.isPopular ? 'bg-white' : 'bg-indigo-600 dark:bg-indigo-400'}`}></div>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 ${tier.isPopular ? 'bg-white text-indigo-600 hover:bg-slate-50' : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'}`}>Get Started</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
