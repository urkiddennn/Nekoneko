import React, { useState } from 'react';
import { useSite } from '../../context/useSite';
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2, CheckCircle2, ChevronRight, Send } from 'lucide-react';

interface SubscribeProps {
    title?: string;
    description?: string;
    buttonText?: string;
    variant?: 'default' | 'newspaper' | 'pixel' | 'glassmorphism';
}

const Subscribe: React.FC<SubscribeProps> = ({
    title = "Join Our Newsletter",
    description = "Get the latest updates delivered straight to your inbox.",
    buttonText = "Subscribe",
    variant = 'default'
}) => {
    const { siteConfig, projectId } = useSite();
    const primaryColor = siteConfig.site_settings.theme.primary || "#6366f1";

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const subscribeMutation = useMutation(api.subscriber.subscribeNow);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectId) return;

        setStatus("loading");
        try {
            await subscribeMutation({
                projectId: projectId as any,
                subscriberEmail: email
            });
            setStatus("success");
            setEmail("");
            setTimeout(() => setStatus("idle"), 5000);
        } catch (err: any) {
            setStatus("error");
            setErrorMsg(err.message || "Subscription failed");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const serifFont = "'Playfair Display', 'Georgia', serif";
    const bodyFont = "'Lora', 'Georgia', serif";
    const pixelFont = "'Press Start 2P', monospace";

    const renderFeedback = () => {
        if (status === "success") {
            return (
                <div className="flex items-center gap-2 text-green-500 font-bold text-sm animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 size={16} />
                    Subscribed successfully!
                </div>
            );
        }
        if (status === "error") {
            return (
                <div className="text-red-500 font-bold text-sm animate-in fade-in slide-in-from-top-2">
                    {errorMsg}
                </div>
            );
        }
        return null;
    };

    if (variant === 'newspaper') {
        return (
            <div className="bg-[#faf7f2] border-4 border-double border-[#2c2c2c] p-12 text-center text-[#1a1a1a]">
                <div className="max-w-2xl mx-auto space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter" style={{ fontFamily: serifFont }}>{title}</h2>
                    <p className="text-lg italic opacity-80" style={{ fontFamily: bodyFont }}>{description}</p>
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-0 border-2 border-[#2c2c2c]">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="YOUR.EMAIL@DOMAIN.COM"
                            className="flex-1 bg-transparent px-6 py-4 outline-none text-sm font-bold placeholder:italic"
                            style={{ fontFamily: bodyFont }}
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="bg-[#1a1a1a] text-[#faf7f2] px-10 py-4 font-black uppercase tracking-widest text-xs border-l-2 border-[#2c2c2c] hover:bg-transparent hover:text-[#1a1a1a] transition-all disabled:opacity-50"
                            style={{ fontFamily: serifFont }}>
                            {status === 'loading' ? 'WAIT...' : buttonText}
                        </button>
                    </form>
                    {renderFeedback()}
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">Privacy Policy Guaranteed • Unsubscribe Anytime</p>
                </div>
            </div>
        );
    }

    if (variant === 'pixel') {
        return (
            <div className="border-[3px] p-10 relative bg-[#0a0a2e]" style={{ borderColor: primaryColor, boxShadow: `8px 8px 0px 0px ${primaryColor}` }}>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-lg md:text-2xl uppercase tracking-tighter inline-block px-4 py-1" style={{ fontFamily: pixelFont, backgroundColor: primaryColor, color: '#0a0a2e' }}>{title}</h2>
                        <p className="text-xs md:text-sm leading-relaxed opacity-80" style={{ fontFamily: pixelFont, color: primaryColor }}>{description}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ENTER EMAIL ADDRESS"
                            className="bg-[#1a1a4e] border-2 px-6 py-4 outline-none text-[10px] placeholder:opacity-30"
                            style={{ fontFamily: pixelFont, borderColor: `${primaryColor}80`, color: primaryColor }}
                            onFocus={(e) => e.currentTarget.style.borderColor = primaryColor}
                            onBlur={(e) => e.currentTarget.style.borderColor = `${primaryColor}80`}
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full py-4 text-[10px] uppercase font-bold transition-all disabled:opacity-50"
                            style={{ fontFamily: pixelFont, backgroundColor: primaryColor, color: '#0a0a2e' }}
                            onMouseOver={(e) => e.currentTarget.style.boxShadow = `0 0 20px ${primaryColor}80`}
                            onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}>
                            {status === 'loading' ? '_LOADING' : `> ${buttonText}`}
                        </button>
                    </form>
                    {renderFeedback()}
                </div>
            </div>
        );
    }

    if (variant === 'glassmorphism') {
        return (
            <div className="relative p-12 md:p-20 rounded-[4rem] overflow-hidden shadow-2xl" style={{ backgroundColor: primaryColor }}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6 text-center md:text-left">
                        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">{title}</h2>
                        <p className="text-xl text-indigo-100 font-medium opacity-80">{description}</p>
                    </div>
                    <div className="w-full md:w-[450px] space-y-4">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem]">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none text-white font-bold placeholder:text-white/30 focus:bg-white/10 transition-all"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-indigo-950/20 flex items-center justify-center gap-2 disabled:opacity-50"
                                style={{ backgroundColor: 'white', color: primaryColor }}>
                                {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : <><Send size={16} /> {buttonText}</>}
                            </button>
                            {renderFeedback()}
                        </form>
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
            <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full sm:w-80 bg-slate-900 dark:bg-slate-50 border border-slate-800 dark:border-slate-200 rounded-2xl px-6 py-4 outline-none text-white dark:text-slate-950 font-bold transition-all"
                        style={{ borderColor: '' }}
                        onFocus={(e) => e.currentTarget.style.borderColor = primaryColor}
                        onBlur={(e) => e.currentTarget.style.borderColor = ''}
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
                        style={{ backgroundColor: primaryColor, color: 'white', boxShadow: `0 10px 20px -10px ${primaryColor}66` }}
                        onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
                        onMouseOut={(e) => e.currentTarget.style.filter = 'none'}>
                        {status === 'loading' ? <Loader2 className="animate-spin" size={16} /> : <>{buttonText} <ChevronRight size={16} /></>}
                    </button>
                </div>
                {renderFeedback()}
            </form>
        </div>
    );
};

export default Subscribe;
