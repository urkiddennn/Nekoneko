import React from 'react';

interface BlogContentProps {
    title?: string;
    content?: string;
    author?: string;
    date?: string;
    tags?: string[];
    image?: string;
    variant?: 'editorial' | 'newspaper_article' | 'minimal' | 'pixel_reader';
}

const BlogContent: React.FC<BlogContentProps> = ({
    title,
    content = "Article content goes here...",
    author,
    date,
    tags = [],
    image,
    variant = 'editorial'
}) => {
    const serifFont = "'Playfair Display', 'Georgia', serif";
    const bodyFont = "'Lora', 'Georgia', serif";
    const pixelFont = "'Press Start 2P', monospace";

    if (variant === 'newspaper_article') {
        return (
            <div className="bg-[#faf7f2] border-y-4 border-double border-[#2c2c2c] py-20 -mx-4 px-4 text-[#1a1a1a]">
                <div className="max-w-4xl mx-auto space-y-12">
                    {title && <h1 className="text-4xl md:text-6xl font-black uppercase text-center leading-none italic pb-8 border-b border-[#2c2c2c]/10" style={{ fontFamily: serifFont }}>{title}</h1>}
                    <div className="md:columns-2 gap-12 space-y-6 first-letter:text-7xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-2 text-justify leading-relaxed" style={{ fontFamily: bodyFont }}>
                        <p className="text-lg md:text-xl font-medium">{content}</p>
                    </div>
                    {image && (
                        <div className="border-y border-[#2c2c2c] py-6 grayscale">
                            <img src={image} alt="Illustration" className="w-full h-auto border border-[#2c2c2c]/20" />
                            <p className="text-[10px] text-center mt-3 font-bold uppercase tracking-widest opacity-60" style={{ fontFamily: bodyFont }}>Fig 1. Editorial Illustration</p>
                        </div>
                    )}
                    <div className="pt-8 border-t-2 border-[#2c2c2c] flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-2">
                            {tags.map((tag, i) => (
                                <span key={i} className="text-[10px] font-black uppercase tracking-[0.2em] border border-[#2c2c2c] px-3 py-1 italic">#{tag}</span>
                            ))}
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-widest opacity-50 italic">© 2026 NEKO JOURNAL</div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'pixel_reader') {
        return (
            <div className="bg-[#0a0a2e] border-4 border-[#00ff41] p-12 text-[#00ff41] relative overflow-hidden shadow-[0_0_30px_rgba(0,255,65,0.2)]">
                <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.3) 2px, rgba(0,255,65,0.3) 4px)' }} />
                <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                    <div className="flex items-center gap-4 text-[10px] opacity-60" style={{ fontFamily: pixelFont }}>
                        <span>READING: {title}</span>
                        <span className="animate-pulse">_</span>
                    </div>
                    <div className="space-y-8 leading-[2] tracking-wide text-xs md:text-sm border-l-2 border-[#00ff41]/20 pl-8" style={{ fontFamily: pixelFont }}>
                        <p>{content}</p>
                    </div>
                    <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {tags.map((tag, i) => (
                            <div key={i} className="bg-[#00ff41]/10 border border-[#00ff41] p-3 text-center text-[8px] uppercase">{tag}</div>
                        ))}
                    </div>
                    <div className="text-center pt-8">
                        <span className="text-[8px] opacity-40 uppercase" style={{ fontFamily: pixelFont }}>End of Data Transmission</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`max-w-3xl mx-auto space-y-12 ${variant === 'minimal' ? 'py-12' : 'py-20'}`}>
            {variant === 'editorial' && title && (
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-950 dark:text-white tracking-tighter leading-tight">{title}</h1>
                    {(author || date) && (
                        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-400">
                            {author && <span>By {author}</span>}
                            {author && date && <span className="w-1 h-1 bg-slate-300 rounded-full" />}
                            {date && <span>{date}</span>}
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-8 prose prose-lg dark:prose-invert max-w-none">
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                    {content}
                </p>
            </div>

            {image && (
                <div className="rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-white/5">
                    <img src={image} alt="Post visualization" className="w-full h-auto" />
                </div>
            )}

            <div className="pt-12 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-3">
                {tags.map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default BlogContent;
