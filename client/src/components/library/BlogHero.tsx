import React from 'react';
import { useSite } from '../../context/useSite';

interface BlogHeroProps {
    title?: string;
    subtitle?: string;
    author?: string;
    date?: string;
    category?: string;
    image?: string;
    variant?: 'default' | 'newspaper' | 'pixel' | 'brutalist' | 'glassmorphism';
}

const BlogHero: React.FC<BlogHeroProps> = ({
    title = "The Evolution of Digital Interfaces",
    subtitle = "How design systems are changing the web.",
    author = "Jems Kem",
    date = "Feb 11, 2026",
    category = "DESIGN",
    image = "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
    variant = 'default'
}) => {
    const { siteConfig } = useSite();
    const primaryColor = siteConfig.site_settings.theme.primary;

    const serifFont = "'Playfair Display', 'Georgia', serif";
    const bodyFont = "'Lora', 'Georgia', serif";
    const pixelFont = "'Press Start 2P', monospace";

    if (variant === 'newspaper') {
        return (
            <div className="bg-[#faf7f2] border-y-4 border-double border-[#2c2c2c] py-20 -mx-4 px-4 text-[#1a1a1a]">
                <div className="max-w-4xl mx-auto space-y-8 text-center">
                    <div className="flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2c2c2c]/60" style={{ fontFamily: bodyFont }}>
                        <span>{category}</span>
                        <span className="w-1 h-1 bg-[#2c2c2c]/40 rounded-full" />
                        <span>{date}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none" style={{ fontFamily: serifFont }}>
                        {title}
                    </h1>
                    <p className="text-xl md:text-2xl font-medium italic border-y border-[#2c2c2c]/20 py-6 max-w-2xl mx-auto" style={{ fontFamily: bodyFont }}>
                        {subtitle}
                    </p>
                    <div className="pt-4">
                        <span className="text-xs font-black uppercase tracking-widest border-b border-[#1a1a1a] pb-1">BY {author}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'pixel') {
        return (
            <div className="border-4 p-12 relative overflow-hidden bg-[#0a0a2e]" style={{ borderColor: primaryColor, boxShadow: `0 0 30px ${primaryColor}33` }}>
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}4d 2px, ${primaryColor}4d 4px)` }} />
                <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-3">
                        <span className="px-2 py-1 border text-[8px] uppercase animate-pulse" style={{ fontFamily: pixelFont, borderColor: primaryColor, color: primaryColor }}>{category}</span>
                        <span className="text-[8px]" style={{ fontFamily: pixelFont, color: primaryColor }}>[{date}]</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl uppercase tracking-wider leading-tight" style={{ fontFamily: pixelFont, color: primaryColor }}>
                        {title}
                    </h1>
                    <p className="text-sm md:text-lg opacity-80 leading-relaxed max-w-3xl" style={{ fontFamily: pixelFont, color: primaryColor }}>
                        {subtitle}
                    </p>
                    <div className="pt-6 flex items-center gap-4">
                        <div className="w-12 h-12 border-2 flex items-center justify-center" style={{ backgroundColor: primaryColor, borderColor: primaryColor }}>
                            <span className="text-[#0a0a2e] text-lg font-bold">?</span>
                        </div>
                        <span className="text-[10px] uppercase" style={{ fontFamily: pixelFont, color: primaryColor }}>AUTHOR: {author}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'brutalist') {
        return (
            <div className="space-y-12">
                <div className="bg-white dark:bg-slate-900 border-[6px] border-slate-950 dark:border-white p-12 md:p-20 shadow-[16px_16px_0px_0px_rgba(255,90,95,1)]">
                    <div className="space-y-6">
                        <div className="inline-block bg-[#ff5a5f] text-white px-4 py-2 text-sm font-black uppercase tracking-widest border-4 border-slate-950 dark:border-white">
                            {category}
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-slate-950 dark:text-white">
                            {title}
                        </h1>
                        <p className="text-xl md:text-3xl font-black text-slate-400 uppercase tracking-tight max-w-2xl">
                            {subtitle}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t-[6px] border-slate-950 dark:border-white pt-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-4 border-slate-950 dark:border-white bg-[#ff5a5f]" />
                        <span className="text-lg font-black uppercase tracking-widest text-slate-950 dark:text-white">{author}</span>
                    </div>
                    <span className="text-sm font-black uppercase tracking-[0.4em] text-slate-400">{date}</span>
                </div>
            </div>
        );
    }

    if (variant === 'glassmorphism') {
        return (
            <div className="relative py-24 px-8 overflow-hidden rounded-[3rem] bg-white/5 backdrop-blur-3xl border border-white/20 shadow-2xl">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />

                <div className="relative z-10 max-w-4xl mx-auto space-y-10 text-center">
                    <span className="px-6 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold text-white uppercase tracking-widest backdrop-blur-sm">
                        {category} • {date}
                    </span>
                    <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-tight drop-shadow-2xl">
                        {title}
                    </h1>
                    <p className="text-lg md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                    <div className="pt-10 flex items-center justify-center gap-4">
                        <div className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-md" />
                        <span className="text-sm font-bold text-white/80 uppercase tracking-widest">{author}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-12">
            <div className="text-center space-y-6 max-w-4xl mx-auto">
                <span className="text-xs font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full" style={{ backgroundColor: `${primaryColor}1a`, color: primaryColor }}>
                    {category}
                </span>
                <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-[1.1]">
                    {title}
                </h1>
                <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                    {subtitle}
                </p>
            </div>

            {image && (
                <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-2xl">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                </div>
            )}

            <div className="flex items-center justify-center gap-6 pt-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                    <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-tight">{author}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{date}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogHero;
