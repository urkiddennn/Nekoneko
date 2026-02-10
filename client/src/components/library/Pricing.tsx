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
    variant?: 'grid' | 'list' | 'brutalist' | 'outline_minimal' | 'glassmorphism' | 'connected_line' | 'impact' | 'creative_gradient' | 'pixel';
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

    if (variant === 'glassmorphism') {
        return (
            <div className="max-w-7xl mx-auto py-12 px-4 relative overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -z-10" />
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full -z-10" />

                <h2 className="text-4xl md:text-5xl font-black mb-20 text-center tracking-tighter uppercase italic text-slate-950 dark:text-white">{title}</h2>
                <div className={`grid ${gridCols} gap-8 relative z-10`}>
                    {displayPlans.map((tier, idx) => (
                        <div key={idx} className={`p-10 rounded-[2.5rem] bg-indigo-500/5 backdrop-blur-xl border border-white/20 shadow-xl flex flex-col space-y-8 transition-all duration-500 hover:-translate-y-2 hover:bg-indigo-500/10 ${tier.isPopular ? 'ring-2 ring-indigo-500/50' : ''}`}>
                            <div>
                                <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-2 text-indigo-400">{tier.name}</h3>
                                <div className="text-5xl font-black tracking-tighter text-white">{tier.price}</div>
                            </div>
                            <ul className="flex-1 space-y-4">
                                {tier.features?.map((f, i) => (
                                    <li key={i} className="text-sm font-bold flex items-center gap-3 text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] transition-all active:scale-95 ${tier.isPopular ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white/10 text-white border border-white/10 hover:bg-white/20'}`}>Select Plan</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (variant === 'impact') {
        return (
            <div className="max-w-7xl mx-auto py-24 bg-[#13131f] -mx-4 px-4 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ff5a5f]/5 blur-[150px] rounded-full" />
                <h2 className="text-7xl md:text-9xl font-black mb-24 text-white uppercase tracking-tighter leading-none opacity-20">{title}</h2>
                <div className={`grid ${gridCols} gap-px bg-white/5 border border-white/5`}>
                    {displayPlans.map((tier, idx) => (
                        <div key={idx} className={`p-16 bg-[#13131f] flex flex-col space-y-12 group hover:bg-white/5 transition-colors ${tier.isPopular ? 'relative z-10 shadow-2xl ring-1 ring-[#ff5a5f]/50' : ''}`}>
                            <div className="space-y-4">
                                <h3 className="text-[#ff5a5f] text-xs font-black uppercase tracking-[0.4em]">{tier.name}</h3>
                                <div className="text-7xl font-black text-white tracking-tighter leading-none">
                                    {tier.price}
                                    <span className="text-lg text-slate-500 font-medium ml-2">/mo</span>
                                </div>
                            </div>
                            <ul className="flex-1 space-y-6">
                                {tier.features?.map((f, i) => (
                                    <li key={i} className="text-slate-400 font-bold flex items-center gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff5a5f]" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-6 bg-[#ff5a5f] text-white font-black uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all">
                                Choose Plan
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (variant === 'creative_gradient') {
        return (
            <div className="max-w-7xl mx-auto py-24 relative overflow-hidden px-4">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full" />
                <h2 className="text-4xl md:text-6xl font-black mb-24 text-center tracking-tight text-slate-900 dark:text-white">{title}</h2>
                <div className={`grid ${gridCols} gap-12 relative z-10`}>
                    {displayPlans.map((tier, idx) => (
                        <div key={idx} className={`p-12 rounded-[3.5rem] bg-white dark:bg-white/5 backdrop-blur-md border border-slate-100 dark:border-white/10 shadow-2xl flex flex-col space-y-10 transition-all duration-500 hover:-translate-y-4 ${tier.isPopular ? 'scale-105 ring-2 ring-indigo-500/30' : ''}`}>
                            <div className="text-center space-y-4">
                                <h3 className="text-sm font-black uppercase tracking-widest text-indigo-500">{tier.name}</h3>
                                <div className="text-6xl font-black tracking-tight text-slate-900 dark:text-white">{tier.price}</div>
                            </div>
                            <ul className="flex-1 space-y-5">
                                {tier.features?.map((f, i) => (
                                    <li key={i} className="text-slate-600 dark:text-slate-400 font-medium flex items-center justify-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-lg shadow-indigo-500/20 hover:scale-[1.02] transition-all">
                                Start Free Trial
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (variant === 'connected_line') {
        return (
            <div className="max-w-7xl mx-auto py-24 bg-[#13131f] -mx-4 px-4 overflow-hidden relative">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-slate-800 hidden md:block" />
                <h2 className="text-5xl font-black mb-24 text-white uppercase tracking-tight relative pl-12">
                    <div className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#ff5a5f] shadow-[0_0_10px_#ff5a5f]" />
                    {title}
                </h2>
                <div className={`grid ${gridCols} gap-12`}>
                    {displayPlans.map((tier, idx) => (
                        <div key={idx} className="relative group">
                            <div className="absolute left-0 top-0 h-full w-[1px] bg-slate-800" />
                            <div className="pl-12 space-y-10 group-hover:translate-x-2 transition-transform">
                                <div>
                                    <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.4em] mb-4">{tier.name}</h3>
                                    <div className="text-6xl font-black text-white leading-none">{tier.price}</div>
                                </div>
                                <ul className="space-y-4">
                                    {tier.features?.map((f, i) => (
                                        <li key={i} className="text-slate-400 font-medium flex items-center gap-3">
                                            <div className="w-1 h-1 bg-[#ff5a5f]" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <button className="px-10 py-5 bg-transparent border border-white text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
                                    Join Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (variant === 'pixel') {
        const pixelFont = "'Press Start 2P', monospace";
        return (
            <div className="relative bg-[#0a0a2e] border-[3px] border-[#00ff41] p-6 md:p-8 overflow-hidden"
                style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.15)' }}>
                <span className="absolute top-2 left-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
                <span className="absolute top-2 right-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
                <h2 className="text-xs md:text-sm text-[#00ff41] uppercase tracking-wider mb-8" style={{ fontFamily: pixelFont }}>{title}</h2>
                <div className={`grid ${gridCols} gap-4`}>
                    {displayPlans.map((tier, idx) => (
                        <div key={idx} className={`border-2 ${tier.isPopular ? 'border-[#00ff41]' : 'border-[#00ff41]/40'} bg-[#1a1a4e] p-6 shadow-[3px_3px_0px_0px_#00ff41] flex flex-col gap-6`}>
                            <div>
                                <h3 className="text-[8px] text-[#00ff41]/50 uppercase tracking-widest mb-2" style={{ fontFamily: pixelFont }}>{tier.name}</h3>
                                <div className="text-lg text-[#00ff41] font-bold" style={{ fontFamily: pixelFont }}>{tier.price}</div>
                            </div>
                            <ul className="flex-1 space-y-3">
                                {tier.features?.map((f, i) => (
                                    <li key={i} className="text-[7px] text-[#00ff41]/60 uppercase tracking-wider flex items-center gap-2" style={{ fontFamily: pixelFont }}>
                                        <span className="text-[#00ff41]">►</span> {f}
                                    </li>
                                ))}
                            </ul>
                            <button className="w-full py-3 text-[7px] uppercase tracking-widest border-2 border-[#00ff41] bg-[#00ff41] text-[#0a0a2e] hover:bg-transparent hover:text-[#00ff41] transition-all"
                                style={{ fontFamily: pixelFont, cursor: 'pointer' }}>Select</button>
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.3) 2px, rgba(0,255,65,0.3) 4px)' }} />
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
