import React from 'react';
import { useSite } from '../../context/useSite';

interface CTAProps {
    title: string;
    buttonText: string;
    variant?: 'default' | 'brutalist' | 'glassmorphism' | 'connected_line' | 'impact' | 'creative_gradient' | 'pixel' | 'newspaper';
}

const CTA: React.FC<CTAProps> = ({ title, buttonText, variant = 'default' }) => {
    const { siteConfig } = useSite();
    const primaryColor = siteConfig.site_settings.theme.primary;

    if (variant === 'brutalist') {
        return (
            <div className="p-12 md:p-20 bg-white dark:bg-slate-900 border-[4px] border-slate-950 dark:border-white shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] flex flex-col items-center text-center space-y-10">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-slate-950 dark:text-white">{title}</h2>
                <button className="px-12 py-5 text-white border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] font-black uppercase tracking-widest text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                    style={{ backgroundColor: primaryColor }}>
                    {buttonText}
                </button>
            </div>
        );
    }

    if (variant === 'glassmorphism') {
        return (
            <div className="p-16 md:p-24 rounded-[4rem] backdrop-blur-3xl border border-white/20 shadow-2xl flex flex-col items-center text-center space-y-10 relative overflow-hidden"
                style={{ backgroundColor: `${primaryColor}0d` }}>
                <div className="absolute top-0 left-0 w-full h-full -z-10" style={{ backgroundImage: `linear-gradient(to bottom right, ${primaryColor}1a, ${primaryColor}1a)` }} />
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight max-w-2xl">{title}</h2>
                <button className="px-12 py-5 bg-white rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-xl"
                    style={{ color: primaryColor, boxShadow: `0 20px 40px -10px ${primaryColor}33` }}>
                    {buttonText}
                </button>
            </div>
        );
    }

    if (variant === 'impact') {
        return (
            <div className="py-24 bg-[#13131f] -mx-4 px-4 overflow-hidden relative flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-[120px] -z-10" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}1a, transparent)` }} />
                <h2 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none max-w-4xl">{title}</h2>
                <button className="text-2xl font-black uppercase tracking-tighter hover:translate-x-4 transition-transform flex items-center gap-4 group" style={{ color: primaryColor }}>
                    {buttonText}
                    <div className="w-12 h-px group-hover:w-24 transition-all" style={{ backgroundColor: primaryColor }} />
                </button>
            </div>
        );
    }

    if (variant === 'connected_line') {
        return (
            <div className="relative py-24 -mx-4 px-4 bg-[#13131f] flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-slate-800 hidden md:block" />
                <div className="relative pl-12 space-y-6">
                    <div className="absolute left-[-45px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full hidden md:block" style={{ backgroundColor: primaryColor, boxShadow: `0 0 10px ${primaryColor}` }} />
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
            <div className="p-16 md:p-24 rounded-[3.5rem] flex flex-col items-center text-center space-y-10 shadow-2xl relative overflow-hidden group"
                style={{ backgroundImage: `linear-gradient(to bottom right, ${primaryColor}, #7c3bed)` }}>
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight max-w-3xl leading-none">{title}</h2>
                <button className="px-12 py-5 bg-white text-slate-900 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all shadow-2xl">
                    {buttonText}
                </button>
            </div>
        );
    }
    if (variant === 'newspaper') {
        const serifFont = "'Playfair Display', 'Georgia', serif";
        return (
            <div className="relative py-20 bg-[#faf7f2] border-y-4 border-double border-[#2c2c2c] flex flex-col items-center text-center space-y-10 px-8">
                <h2 className="text-4xl md:text-6xl font-black text-[#1a1a1a] uppercase tracking-tighter leading-none max-w-4xl" style={{ fontFamily: serifFont }}>
                    {title}
                </h2>
                <button className="px-12 py-5 bg-[#1a1a1a] text-[#faf7f2] border border-[#2c2c2c] font-black uppercase tracking-[0.2em] text-xs hover:bg-transparent hover:text-[#1a1a1a] transition-all"
                    style={{ fontFamily: serifFont }}>
                    {buttonText}
                </button>
                <div className="absolute top-4 right-8 text-[10px] text-[#2c2c2c]/40 font-bold uppercase tracking-widest hidden md:block">
                    URGENT DISPATCH
                </div>
            </div>
        );
    }
    if (variant === 'pixel') {
        const pixelFont = "'Press Start 2P', monospace";
        return (
            <div className="relative bg-[#0a0a2e] border-[3px] p-10 md:p-16 overflow-hidden flex flex-col items-center text-center space-y-8"
                style={{ boxShadow: `0 0 20px ${primaryColor}26`, borderColor: primaryColor }}>
                <span className="absolute top-2 left-3 text-xs select-none opacity-40" style={{ fontFamily: pixelFont, color: primaryColor }}>+</span>
                <span className="absolute top-2 right-3 text-xs select-none opacity-40" style={{ fontFamily: pixelFont, color: primaryColor }}>+</span>
                <span className="absolute bottom-2 left-3 text-xs select-none opacity-40" style={{ fontFamily: pixelFont, color: primaryColor }}>+</span>
                <span className="absolute bottom-2 right-3 text-xs select-none opacity-40" style={{ fontFamily: pixelFont, color: primaryColor }}>+</span>
                <h2 className="text-sm md:text-lg uppercase tracking-wider max-w-xl leading-relaxed" style={{ fontFamily: pixelFont, color: primaryColor }}>
                    {title}
                </h2>
                <button className="px-8 py-4 text-[8px] md:text-[10px] uppercase tracking-widest border-2 transition-all"
                    style={{ fontFamily: pixelFont, cursor: 'pointer', backgroundColor: primaryColor, borderColor: primaryColor, color: '#0a0a2e', boxShadow: `4px 4px 0px 0px ${primaryColor}` }}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = primaryColor; e.currentTarget.style.boxShadow = `2px 2px 0px 0px ${primaryColor}` }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = primaryColor; e.currentTarget.style.color = '#0a0a2e'; e.currentTarget.style.boxShadow = `4px 4px 0px 0px ${primaryColor}` }}>
                    {buttonText}
                </button>
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}4d 2px, ${primaryColor}4d 4px)` }} />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic max-w-2xl leading-none text-slate-950 dark:text-white">{title}</h2>
            <button className="px-12 py-5 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-sm shadow-2xl transition-all active:scale-95 border-b-8 active:border-b-0 active:translate-y-2"
                style={{ backgroundColor: primaryColor, borderColor: `${primaryColor}b3`, boxShadow: `0 20px 40px -10px ${primaryColor}4d` }}
                onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.filter = 'none'}>
                {buttonText}
            </button>
        </div>
    );
};

export default CTA;
