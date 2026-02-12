import React from 'react';
import { useSite } from '../../context/useSite';

interface Post {
    title: string;
    summary: string;
    image: string;
    date: string;
    author: string;
    slug: string;
    category?: string;
}

interface BlogListProps {
    title?: string;
    posts?: Post[];
    variant?: 'grid' | 'list' | 'newspaper_columns' | 'pixel_list' | 'brutalist_cards';
}

const BlogList: React.FC<BlogListProps> = ({
    title = "Latest Stories",
    posts = [],
    variant = 'grid'
}) => {
    const { siteConfig } = useSite();
    const primaryColor = siteConfig.site_settings.theme.primary;

    const serifFont = "'Playfair Display', 'Georgia', serif";
    const bodyFont = "'Lora', 'Georgia', serif";
    const pixelFont = "'Press Start 2P', monospace";

    if (variant === 'newspaper_columns') {
        return (
            <div className="bg-[#faf7f2] border-y-4 border-double border-[#2c2c2c] py-20 -mx-4 px-4 text-[#1a1a1a]">
                <div className="max-w-7xl mx-auto space-y-16">
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-center border-b border-[#2c2c2c] pb-8 tracking-tighter" style={{ fontFamily: serifFont }}>
                        {title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {posts.map((post, idx) => (
                            <article key={idx} className="space-y-6 flex flex-col group border-r border-[#2c2c2c]/10 last:border-0 pr-6 last:pr-0">
                                <div className="aspect-[4/3] border border-[#2c2c2c] grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="space-y-4 flex-1">
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] italic text-[#2c2c2c]/60" style={{ fontFamily: bodyFont }}>{post.date}</span>
                                    <h3 className="text-2xl font-black uppercase leading-tight italic group-hover:text-indigo-600 transition-colors" style={{ fontFamily: serifFont }}>{post.title}</h3>
                                    <p className="text-sm leading-relaxed line-clamp-3" style={{ fontFamily: bodyFont }}>{post.summary}</p>
                                </div>
                                <div className="pt-4 border-t border-[#2c2c2c]/10">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">BY {post.author}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'pixel_list') {
        return (
            <div className="border-4 p-10 space-y-12 bg-[#0a0a2e]" style={{ borderColor: primaryColor, boxShadow: `0 0 30px ${primaryColor}1a` }}>
                <h2 className="text-lg md:text-2xl uppercase tracking-[0.2em] border-b-2 pb-6" style={{ fontFamily: pixelFont, color: primaryColor, borderColor: primaryColor }}>{title}</h2>
                <div className="space-y-8">
                    {posts.map((post, idx) => (
                        <article key={idx} className="border-2 p-6 flex flex-col md:flex-row gap-8 transition-all group relative overflow-hidden" style={{ borderColor: `${primaryColor}4d` }} onMouseOver={(e) => e.currentTarget.style.borderColor = primaryColor} onMouseOut={(e) => e.currentTarget.style.borderColor = `${primaryColor}4d`}>
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}4d 2px, ${primaryColor}4d 4px)` }} />
                            <div className="w-full md:w-32 h-32 flex-shrink-0 border-2 overflow-hidden bg-[#1a1a4e]" style={{ imageRendering: 'pixelated', borderColor: `${primaryColor}66` }}>
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="flex-1 space-y-4 relative z-10">
                                <div className="flex items-center gap-4 text-[8px] opacity-60" style={{ fontFamily: pixelFont, color: primaryColor }}>
                                    <span>{post.date}</span>
                                    <span>#{post.author}</span>
                                </div>
                                <h3 className="text-sm md:text-lg uppercase leading-relaxed tracking-wider group-hover:translate-x-2 transition-transform" style={{ fontFamily: pixelFont, color: primaryColor }}>{post.title}</h3>
                                <p className="text-[10px] leading-relaxed max-w-2xl" style={{ fontFamily: pixelFont, color: `${primaryColor}b3` }}>{post.summary}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        );
    }

    if (variant === 'brutalist_cards') {
        return (
            <div className="space-y-16">
                <h2 className="text-5xl md:text-7xl font-black uppercase text-slate-950 dark:text-white italic tracking-tighter border-l-8 border-[#ff5a5f] pl-8">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {posts.map((post, idx) => (
                        <article key={idx} className="bg-white dark:bg-slate-900 border-[5px] border-slate-950 dark:border-white shadow-[12px_12px_0px_0px_rgba(255,90,95,1)] flex flex-col hover:-translate-y-1 transition-all group">
                            <div className="aspect-[16/9] border-b-[5px] border-slate-950 dark:border-white overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="p-8 space-y-4 flex-1">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    <span>{post.date}</span>
                                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 border border-slate-950 dark:border-white">{post.author}</span>
                                </div>
                                <h3 className="text-3xl font-black uppercase tracking-tight leading-none text-slate-950 dark:text-white group-hover:text-[#ff5a5f] transition-all">{post.title}</h3>
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-relaxed">{post.summary}</p>
                            </div>
                            <div className="px-8 pb-8">
                                <button className="bg-slate-950 dark:bg-white text-white dark:text-black px-6 py-3 text-xs font-black uppercase tracking-widest border border-transparent group-hover:bg-[#ff5a5f] group-hover:text-white transition-all">READ POST</button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 dark:text-white tracking-tighter">{title}</h2>
            <div className={variant === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10' : 'space-y-12'}>
                {posts.map((post, idx) => (
                    <article key={idx} className={variant === 'grid' ? 'flex flex-col space-y-6 group' : 'flex flex-col md:flex-row gap-8 group pb-12 border-b border-slate-100 dark:border-slate-800 last:border-0'}>
                        <div className={variant === 'grid' ? 'aspect-[4/3] rounded-[2rem] overflow-hidden' : 'w-full md:w-64 aspect-[4/3] md:h-48 rounded-[2rem] flex-shrink-0 overflow-hidden shadow-xl'}>
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 space-y-4 pt-2">
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest" style={{ color: primaryColor }}>
                                <span>{post.category || 'ARTICLE'}</span>
                                <span className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                                <span className="text-slate-400">{post.date}</span>
                            </div>
                            <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight group-hover:text-indigo-600 transition-colors"
                                style={{ color: '' }}
                                onMouseOver={(e) => e.currentTarget.style.color = primaryColor}
                                onMouseOut={(e) => e.currentTarget.style.color = ''}
                            >{post.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2">{post.summary}</p>
                            <div className="flex items-center gap-3 pt-2">
                                <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" />
                                <span className="text-[10px] font-black uppercase tracking-tight text-slate-900 dark:text-slate-300">{post.author}</span>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
