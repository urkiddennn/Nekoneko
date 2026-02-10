import React from 'react';

interface CTAProps {
    title: string;
    buttonText: string;
    variant?: 'default' | 'brutalist' | 'glassmorphism' | 'connected_line' | 'impact' | 'creative_gradient';
}

const CTA: React.FC<CTAProps> = ({ title, buttonText, variant = 'default' }) => {
    if (variant === 'brutalist') {
        return (
            <div className="p-12 md:p-20 bg-white dark:bg-slate-900 border-[4px] border-slate-950 dark:border-white shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] flex flex-col items-center text-center space-y-10">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-slate-950 dark:text-white">{title}</h2>
                <button className="px-12 py-5 bg-[#ff5a5f] text-white border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] font-black uppercase tracking-widest text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
                    {buttonText}
                </button>
            </div>
        );
    }

    if (variant === 'glassmorphism') {
        return (
            <div className="p-16 md:p-24 rounded-[4rem] bg-indigo-500/5 backdrop-blur-3xl border border-white/20 shadow-2xl flex flex-col items-center text-center space-y-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 -z-10" />
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight max-w-2xl">{title}</h2>
                <button className="px-12 py-5 bg-white text-indigo-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/20">
                    {buttonText}
                </button>
            </div>
        );
    }

    if (variant === 'impact') {
        return (
            <div className="py-24 bg-[#13131f] -mx-4 px-4 overflow-hidden relative flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-[#ff5a5f]/10 to-transparent blur-[120px] -z-10" />
                <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none max-w-4xl">{title}</h2>
                <button className="text-[#ff5a5f] text-2xl font-black uppercase tracking-tighter hover:translate-x-4 transition-transform flex items-center gap-4 group">
                    {buttonText}
                    <div className="w-12 h-px bg-[#ff5a5f] group-hover:w-24 transition-all" />
                </button>
            </div>
        );
    }

    if (variant === 'connected_line') {
        return (
            <div className="relative py-24 -mx-4 px-4 bg-[#13131f] flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-slate-800 hidden md:block" />
                <div className="relative pl-12 space-y-6">
                    <div className="absolute left-[-45px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#ff5a5f] shadow-[0_0_10px_#ff5a5f] hidden md:block" />
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight max-w-xl">{title}</h2>
                </div>
                <button className="px-12 py-6 border border-white text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">
                    {buttonText}
                </button>
            </div>
        );
    }

    if (variant === 'creative_gradient') {
        return (
            <div className="p-16 md:p-24 rounded-[3.5rem] bg-gradient-to-br from-indigo-600 to-purple-700 flex flex-col items-center text-center space-y-10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-3xl leading-none">{title}</h2>
                <button className="px-12 py-5 bg-white text-slate-900 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shadow-2xl">
                    {buttonText}
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic max-w-2xl leading-none text-slate-950 dark:text-white">{title}</h2>
            <button className="px-12 py-5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-all active:scale-95 border-b-8 border-indigo-800 dark:border-indigo-700 active:border-b-0 active:translate-y-2">
                {buttonText}
            </button>
        </div>
    );
};

export default CTA;
