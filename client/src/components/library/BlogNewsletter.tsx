import React from 'react';

interface BlogNewsletterProps {
    title?: string;
    description?: string;
    button_text?: string;
    variant?: 'default' | 'newspaper' | 'pixel' | 'glassmorphism';
}

const BlogNewsletter: React.FC<BlogNewsletterProps> = ({
    title = "Subscribe to Our Newsletter",
    description = "Get the best curated articles delivered weekly.",
    button_text = "Subscribe Now",
    variant = 'default'
}) => {
    const serifFont = "'Playfair Display', 'Georgia', serif";
    const bodyFont = "'Lora', 'Georgia', serif";
    const pixelFont = "'Press Start 2P', monospace";

    if (variant === 'newspaper') {
        return (
            <div className="bg-[#faf7f2] border-4 border-double border-[#2c2c2c] p-12 text-center text-[#1a1a1a]">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter" style={{ fontFamily: serifFont }}>{title}</h2>
                    <p className="text-lg italic opacity-80" style={{ fontFamily: bodyFont }}>{description}</p>
                    <div className="flex flex-col md:flex-row gap-0 border-2 border-[#2c2c2c]">
                        <input
                            type="email"
                            placeholder="YOUR.EMAIL@DOMAIN.COM"
                            className="flex-1 bg-transparent px-6 py-4 outline-none text-sm font-bold placeholder:italic"
                            style={{ fontFamily: bodyFont }}
                        />
                        <button className="bg-[#1a1a1a] text-[#faf7f2] px-10 py-4 font-black uppercase tracking-widest text-xs border-l-2 border-[#2c2c2c] hover:bg-transparent hover:text-[#1a1a1a] transition-all"
                            style={{ fontFamily: serifFont }}>
                            {button_text}
                        </button>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Privacy Policy Guaranteed • Unsubscribe Anytime</p>
                </div>
            </div>
        );
    }

    if (variant === 'pixel') {
        return (
            <div className="bg-[#0a0a2e] border-[3px] border-[#00ff41] p-10 text-[#00ff41] relative shadow-[8px_8px_0px_0px_rgba(0,255,101,1)]">
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-lg md:text-2xl uppercase tracking-tighter bg-[#00ff41] text-[#0a0a2e] inline-block px-4 py-1" style={{ fontFamily: pixelFont }}>{title}</h2>
                        <p className="text-xs md:text-sm leading-relaxed opacity-80" style={{ fontFamily: pixelFont }}>{description}</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="ENTER EMAIL ADDRESS"
                            className="bg-[#1a1a4e] border-2 border-[#00ff41]/50 px-6 py-4 outline-none text-[10px] placeholder:opacity-30 text-[#00ff41] focus:border-[#00ff41]"
                            style={{ fontFamily: pixelFont }}
                        />
                        <button className="w-full bg-[#00ff41] text-[#0a0a2e] py-4 text-[10px] uppercase font-bold hover:shadow-[0_0_20px_rgba(0,255,101,0.5)] transition-all"
                            style={{ fontFamily: pixelFont }}>
                            &gt; {button_text}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'glassmorphism') {
        return (
            <div className="relative p-12 md:p-20 rounded-[4rem] bg-indigo-600 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">{title}</h2>
                        <p className="text-xl text-indigo-100 font-medium opacity-80">{description}</p>
                    </div>
                    <div className="w-full md:w-[450px] space-y-4">
                        <div className="flex flex-col gap-4 p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem]">
                            <input
                                type="email"
                                placeholder="email@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-white font-bold placeholder:text-white/30 focus:bg-white/10 transition-all"
                            />
                            <button className="w-full bg-white text-indigo-600 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-indigo-950/20">
                                {button_text}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-950 dark:bg-white rounded-[3rem] p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 border border-white/10 dark:border-slate-900/10">
            <div className="max-w-xl space-y-4 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black text-white dark:text-slate-950 tracking-tighter leading-tight">{title}</h2>
                <p className="text-lg text-slate-400 dark:text-slate-500 font-medium leading-relaxed">{description}</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full sm:w-80 bg-slate-900 dark:bg-slate-50 border border-slate-800 dark:border-slate-200 rounded-2xl px-6 py-4 outline-none text-white dark:text-slate-950 font-bold focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                />
                <button className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20">
                    {button_text}
                </button>
            </div>
        </div>
    );
};

export default BlogNewsletter;
