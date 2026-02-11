import React from 'react';


interface FeaturesProps {
    title: string;
    items: any[];
    columns?: number;
    renderItem?: (item: any, index: number) => React.ReactNode;
    variant?: 'default' | 'brutalist' | 'outline_minimal' | 'glassmorphism' | 'connected_line' | 'impact' | 'creative_gradient' | 'pixel' | 'newspaper';
}

const Features: React.FC<FeaturesProps> = ({
    title,
    items,
    columns = 3,
    renderItem,
    variant = 'default'
}) => {
    const isBrutalist = variant === 'brutalist';
    const isOutlineMinimal = variant === 'outline_minimal';
    const gridClass = columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

    if (variant === 'pixel') {
        const pixelFont = "'Press Start 2P', monospace";
        return (
            <div className="relative bg-[#0a0a2e] border-[3px] border-[#00ff41] p-6 md:p-8 overflow-hidden"
                style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.15)' }}>
                <span className="absolute top-2 left-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
                <span className="absolute top-2 right-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
                <h2 className="text-xs md:text-sm text-[#00ff41] uppercase tracking-wider mb-8" style={{ fontFamily: pixelFont }}>{title}</h2>
                <div className={`grid ${gridClass} gap-4`}>
                    {items?.map((item, idx) => (
                        <div key={idx} className="border-2 border-[#00ff41] bg-[#1a1a4e] p-5 shadow-[3px_3px_0px_0px_#00ff41] hover:shadow-[4px_4px_0px_0px_#00ff41] transition-shadow">
                            <span className="text-[7px] text-[#00ff41]/40 uppercase tracking-widest block mb-3" style={{ fontFamily: pixelFont }}>
                                Feature {idx + 1}
                            </span>
                            <h3 className="text-[10px] md:text-xs text-[#00ff41] uppercase tracking-wide mb-2" style={{ fontFamily: pixelFont }}>
                                {item.title}
                            </h3>
                            <p className="text-[8px] text-[#00ff41]/40 leading-relaxed" style={{ fontFamily: pixelFont }}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.3) 2px, rgba(0,255,65,0.3) 4px)' }} />
            </div>
        );
    }

    if (variant === 'newspaper') {
        const serifFont = "'Playfair Display', 'Georgia', serif";
        const bodyFont = "'Lora', 'Georgia', serif";
        return (
            <div className="bg-[#faf7f2] border-y border-[#2c2c2c] py-16 -mx-4 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] uppercase tracking-tighter mb-16 text-center" style={{ fontFamily: serifFont }}>
                        {title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-[#2c2c2c]">
                        {items?.map((item, idx) => (
                            <div key={idx} className="p-10 border-[#2c2c2c] border-b lg:border-b-0 lg:border-r last:border-0 group hover:bg-[#1a1a1a]/5 transition-colors">
                                <span className="text-[10px] text-[#2c2c2c]/60 font-bold uppercase tracking-[0.3em] mb-4 block" style={{ fontFamily: bodyFont }}>
                                    SECTION {idx + 1}
                                </span>
                                <h3 className="text-2xl font-black text-[#1a1a1a] uppercase leading-tight mb-4" style={{ fontFamily: serifFont }}>
                                    {item.title}
                                </h3>
                                <p className="text-sm text-[#1a1a1a] leading-relaxed italic" style={{ fontFamily: bodyFont }}>
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'impact') {
        return (
            <div className="space-y-24 py-20 bg-[#13131f] -mx-4 px-4 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff5a5f]/5 blur-[120px] rounded-full" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <h2 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none mb-24 opacity-20">
                        {title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                        {items?.map((item, idx) => (
                            <div key={idx} className="p-16 bg-[#13131f] group hover:bg-white/5 transition-colors">
                                <span className="text-[#ff5a5f] text-xs font-black uppercase tracking-[0.4em] mb-8 block">
                                    Feature {idx + 1}
                                </span>
                                <h3 className="text-4xl font-black text-white uppercase tracking-tight mb-6">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'creative_gradient') {
        return (
            <div className="space-y-16 py-12 relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full" />
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black mb-20 text-slate-900 dark:text-white tracking-tight">{title}</h2>
                    <div className={`grid ${gridClass} gap-8`}>
                        {items?.map((item, idx) => (
                            <div key={idx} className="p-10 bg-white dark:bg-white/5 backdrop-blur-sm border border-slate-100 dark:border-white/10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-8 mx-auto group-hover:rotate-12 transition-transform">
                                    <span className="text-xl font-black">{idx + 1}</span>
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">{item.title}</h3>
                                <p className="text-slate-600 dark:text-slate-400 font-medium">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'connected_line') {
        return (
            <div className="relative py-24 -mx-4 px-4 bg-[#13131f] overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
                    <div className="md:col-span-4 space-y-6">
                        <span className="text-[#ff5a5f] text-xs font-black uppercase tracking-[0.5em]">Capabilities</span>
                        <h2 className="text-5xl font-black text-white tracking-tight leading-none uppercase">{title}</h2>
                        <div className="h-1 w-20 bg-[#ff5a5f]" />
                    </div>

                    <div className="md:col-span-7 md:col-start-6 space-y-12 relative">
                        <div className="absolute -left-12 top-0 bottom-0 w-[1px] bg-slate-800 hidden md:block">
                            <div className="absolute top-0 -left-[5px] w-2.5 h-2.5 rounded-full bg-[#ff5a5f] shadow-[0_0_10px_#ff5a5f]" />
                        </div>
                        {items?.map((item, idx) => (
                            <div key={idx} className="relative group">
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-[#ff5a5f] transition-colors">{item.title}</h3>
                                <p className="text-slate-400 font-medium leading-relaxed max-w-xl">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-4xl font-black mb-16 text-center tracking-tighter uppercase italic text-slate-950 dark:text-white">{title}</h2>
            <div className={`grid ${gridClass} gap-12`}>
                {items?.map((item, idx) => (
                    <div key={idx} className={item.type ? "" : isBrutalist
                        ? "space-y-6 p-10 bg-white dark:bg-slate-900 rounded-[2.5rem] border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(2,6,23,1)] dark:hover:shadow-[10px_10px_0px_0px_rgba(255,255,255,1)] transition-all animate-in fade-in zoom-in-95 duration-500"
                        : isOutlineMinimal
                            ? "space-y-8 p-12 bg-white dark:bg-slate-950 rounded-none border border-slate-950 dark:border-white hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-500"
                            : variant === 'glassmorphism'
                                ? "space-y-6 p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] hover:bg-white/10 hover:border-white/20 transition-all duration-300 animate-in fade-in zoom-in-95"
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
