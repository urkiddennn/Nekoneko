import React, { useState } from 'react';
import { useSite } from '../../context/useSite';
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2, CheckCircle2, ArrowRight, Users } from 'lucide-react';

interface WaitlistProps {
    title?: string;
    description?: string;
    successMessage?: string;
    buttonText?: string;
    placeholderText?: string;
    backgroundImage?: string;
    variant?: 'default' | 'split_left' | 'split_right' | 'minimal' | 'glassmorphism' | 'pixel' | 'newspaper' | 'brutalist' | 'gradient' | 'glow' | 'bento';
    showCount?: boolean;
    styles?: {
        backgroundColor?: string;
        padding?: string;
        textColor?: string;
    };
}

const Waitlist: React.FC<WaitlistProps> = ({
    title = "Join the Waitlist",
    description = "Be the first to know when we launch. Early access for the first 100 subscribers.",
    successMessage = "You're on the list! We'll be in touch soon.",
    buttonText = "Join Now",
    placeholderText = "Enter your email address",
    backgroundImage,
    variant = 'default',
    showCount = true,
}) => {
    const { siteConfig, projectId } = useSite();
    const primaryColor = siteConfig.site_settings.theme.primary || "#6366f1";

    // Subscriber count
    const subscriberCount = useQuery(api.subscriber.getSubscriberCount,
        projectId ? { projectId: projectId as any } : "skip"
    );

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
            // Reset status after 5 seconds to allow another submission or just clear the success message
            setTimeout(() => setStatus("idle"), 5000);
        } catch (err: any) {
            setStatus("error");
            setErrorMsg(err.message || "Something went wrong. Please try again.");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const optimizeImageUrl = (url: string, width: number = 1920) => {
        if (!url) return undefined;
        if (url.includes("images.unsplash.com")) {
            const baseUrl = url.split("?")[0];
            return `${baseUrl}?auto=format&fit=crop&q=80&w=${width}`;
        }
        return url;
    };

    const optimizedBg = backgroundImage ? optimizeImageUrl(backgroundImage) : undefined;

    // Common Fonts
    const serifFont = "'Playfair Display', 'Georgia', serif";
    const bodyFont = "'Lora', 'Georgia', serif";
    const pixelFont = "'Press Start 2P', monospace";
    const monoFont = "'Space Mono', monospace";

    const renderFeedback = (style: 'default' | 'minimal' | 'pixel' = 'default') => {
        if (status === "success") {
            return (
                <div className={`flex items-center gap-2 ${style === 'pixel' ? 'text-green-400' : style === 'minimal' ? 'text-slate-900 dark:text-white' : 'text-green-600 dark:text-green-400'} font-bold text-sm animate-in fade-in slide-in-from-top-2 mt-2`}>
                    <CheckCircle2 size={16} />
                    {successMessage}
                </div>
            );
        }
        if (status === "error") {
            return (
                <div className="text-red-500 font-bold text-sm animate-in fade-in slide-in-from-top-2 mt-2">
                    {errorMsg}
                </div>
            );
        }
        return null;
    };

    const renderCount = (style: 'default' | 'pixel' | 'minimal' | 'glass' = 'default') => {
        if (!showCount || subscriberCount === undefined || subscriberCount === null) return null;

        const count = subscriberCount;

        if (style === 'pixel') {
            return (
                <div className="flex items-center gap-2 text-[10px] md:text-xs opacity-70 mt-4 uppercase tracking-widest" style={{ fontFamily: pixelFont }}>
                    <Users size={12} />
                    <span>Join {count} others</span>
                </div>
            );
        }

        if (style === 'minimal') {
            return (
                <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500 mt-6">
                    <Users size={14} />
                    <span>Join {count}+ early adopters</span>
                </div>
            );
        }

        if (style === 'glass') {
            return (
                <div className="flex items-center gap-2 text-xs font-bold text-white/60 mt-4 uppercase tracking-wider">
                    <Users size={14} />
                    <span>{count} people waiting</span>
                </div>
            );
        }

        return (
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 mt-4">
                <Users size={16} />
                <span>Join {count.toLocaleString()} others on the list</span>
            </div>
        );
    };

    // --- VARIANT: SPLIT LEFT / RIGHT ---
    if (variant === 'split_left' || variant === 'split_right') {
        const isRight = variant === 'split_right';
        return (
            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
                <div className={`relative h-64 lg:h-auto ${isRight ? 'lg:order-2' : ''} overflow-hidden`}>
                    {optimizedBg ? (
                        <img
                            src={optimizedBg}
                            alt="Background"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                            <div className="text-9xl opacity-5 font-black">WAIT</div>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/10" />
                </div>
                <div className={`flex flex-col justify-center p-12 lg:p-24 bg-white dark:bg-slate-950 text-slate-950 dark:text-white ${isRight ? 'lg:order-1' : ''}`}>
                    <div className="max-w-md mx-auto w-full space-y-8">
                        <div>
                            <h1 className="text-4xl lg:text-6xl font-black tracking-tight mb-4">{title}</h1>
                            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">{description}</p>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={placeholderText}
                                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg transition-all active:scale-[0.98]"
                                style={{ backgroundColor: primaryColor }}
                            >
                                {status === 'loading' ? <Loader2 className="animate-spin" /> : buttonText}
                            </button>
                            {renderFeedback()}
                            {renderCount()}
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // --- VARIANT: MINIMAL ---
    if (variant === 'minimal') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 text-slate-950 dark:text-white text-center">
                <div className="max-w-2xl w-full space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-5xl md:text-7xl font-light tracking-tighter">{title}</h1>
                    <p className="text-xl md:text-2xl font-light text-slate-400 dark:text-slate-500 max-w-lg mx-auto">{description}</p>

                    <form onSubmit={handleSubmit} className="max-w-md mx-auto w-full relative group">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={placeholderText}
                            className="block w-full text-center pb-4 text-xl bg-transparent border-b-2 border-slate-200 dark:border-slate-800 focus:border-black dark:focus:border-white outline-none transition-colors placeholder:text-slate-300 dark:placeholder:text-slate-700 placeholder:font-light"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="absolute right-0 bottom-4 text-slate-400 hover:text-black dark:hover:text-white transition-colors"
                        >
                            {status === 'loading' ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={24} />}
                        </button>
                        {renderFeedback('minimal')}
                        {renderCount('minimal')}
                    </form>
                </div>
            </div>
        );
    }

    // --- VARIANT: GLASSMORPHISM ---
    if (variant === 'glassmorphism') {
        return (
            <div
                className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat overflow-hidden relative"
                style={{ backgroundImage: optimizedBg ? `url(${optimizedBg})` : `linear-gradient(135deg, #667eea 0%, #764ba2 100%)` }}
            >
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

                <div className="relative z-10 w-full max-w-4xl grid md:grid-cols-2 gap-8 md:gap-12 items-center p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] shadow-2xl">
                    <div className="space-y-6 text-white text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none">{title}</h1>
                        <p className="text-lg md:text-xl text-white/80 font-medium">{description}</p>
                    </div>

                    <div className="bg-white/20 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white/30 shadow-inner">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={placeholderText}
                                className="w-full px-6 py-4 bg-black/20 border border-white/10 rounded-2xl text-white placeholder:text-white/50 focus:bg-black/30 outline-none transition-all font-medium"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black uppercase tracking-widest shadow-lg hover:bg-opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {status === 'loading' ? <Loader2 className="animate-spin mx-auto" /> : buttonText}
                            </button>
                            {renderFeedback()}
                            {renderCount('glass')}
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // --- VARIANT: PIXEL ---
    if (variant === 'pixel') {
        return (
            <div className="min-h-screen bg-[#050514] text-[#00ff41] p-4 flex flex-col items-center justify-center relative overflow-hidden font-mono">
                {/* Grid Background */}
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(0, 255, 65, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 65, 0.05) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

                <div className="relative z-10 max-w-2xl w-full border-[4px] border-[#00ff41] p-8 md:p-12 bg-[#0a0a2e]" style={{ boxShadow: '12px 12px 0px 0px #005014' }}>
                    <div className="space-y-8 text-center">
                        <h1 className="text-2xl md:text-4xl leading-relaxed uppercase" style={{ fontFamily: pixelFont, textShadow: '4px 4px 0px #005014' }}>{title}</h1>
                        <p className="text-sm md:text-base leading-relaxed opacity-80" style={{ fontFamily: pixelFont }}>{description}</p>

                        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={placeholderText.toUpperCase()}
                                className="w-full p-4 bg-[#001405] border-[2px] border-[#00ff41] text-[#00ff41] placeholder:text-[#00ff41]/30 outline-none text-xs md:text-sm uppercase"
                                style={{ fontFamily: pixelFont }}
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-[#00ff41] text-[#050514] text-xs md:text-sm font-bold uppercase transition-transform hover:-translate-y-1 active:translate-y-0"
                                style={{ fontFamily: pixelFont, boxShadow: '0 6px 0 #005014' }}
                            >
                                {status === 'loading' ? 'LOADING...' : `> ${buttonText}`}
                            </button>
                            {renderFeedback('pixel')}
                            {renderCount('pixel')}
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // --- VARIANT: NEWSPAPER ---
    if (variant === 'newspaper') {
        return (
            <div className="min-h-screen bg-[#f4f1ea] text-[#1a1a1a] p-4 py-12 flex items-center justify-center">
                <div className="max-w-4xl w-full border border-[#2c2c2c] bg-[#faf7f2] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                    {/* Editorial Content */}
                    <div className="p-8 md:p-16 flex-1 flex flex-col justify-between border-r border-[#2c2c2c]">
                        <div className="space-y-6">
                            <div className="border-b-2 border-[#1a1a1a] pb-2 mb-6">
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: bodyFont }}>Breaking News • Vol. 1</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black uppercase italic leading-[0.85] tracking-tight" style={{ fontFamily: serifFont }}>
                                {title}
                            </h1>
                            <p className="text-lg md:text-xl italic leading-relaxed" style={{ fontFamily: bodyFont }}>
                                {description}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-12 space-y-4">
                            <div className="border-t border-b border-[#2c2c2c] py-2">
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={placeholderText}
                                    className="w-full bg-transparent py-2 text-xl font-bold placeholder:italic outline-none placeholder:text-[#1a1a1a]/40"
                                    style={{ fontFamily: bodyFont }}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-[#1a1a1a] text-[#f4f1ea] py-4 text-sm font-black uppercase tracking-[0.15em] hover:bg-[#2c2c2c] transition-colors"
                                style={{ fontFamily: serifFont }}
                            >
                                {status === 'loading' ? 'Processing...' : buttonText}
                            </button>
                            {renderFeedback()}
                        </form>
                    </div>

                    {/* Image Column */}
                    <div className="w-full md:w-80 h-64 md:h-auto relative bg-[#1a1a1a] border-t md:border-t-0 border-[#2c2c2c]">
                        {optimizedBg ? (
                            <img src={optimizedBg} alt="Editorial" className="w-full h-full object-cover grayscale mix-blend-screen opacity-80" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center p-8">
                                <div className="text-[#f4f1ea] text-center border-4 border-[#f4f1ea] p-4">
                                    <span className="text-4xl font-black block" style={{ fontFamily: serifFont }}>WAIT</span>
                                    <span className="text-4xl font-black block" style={{ fontFamily: serifFont }}>LIST</span>
                                </div>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        );
    }

    // --- VARIANT: BRUTALIST ---
    if (variant === 'brutalist') {
        return (
            <div className={`min-h-screen p-6 md:p-12 flex items-center justify-center bg-[#f0f0f0]`}>
                <div className={`max-w-3xl w-full bg-white border-[6px] border-black p-8 md:p-16 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] hover:shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transition-all duration-300`}>
                    <div className="space-y-8">
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8 break-words" style={{ textShadow: '2px 2px 0px #eee' }}>
                            {title}
                        </h1>
                        <p className="text-xl md:text-2xl font-bold bg-yellow-300 inline-block px-2 border-2 border-black transform -rotate-1">
                            {description}
                        </p>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-12 bg-black p-6 border-[4px] border-black transform rotate-1">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="YOUR EMAIL HERE"
                                className="w-full p-4 text-xl font-bold bg-white border-[3px] border-black text-black placeholder:text-black/30 outline-none focus:translate-x-1 focus:-translate-y-1 transition-transform"
                                style={{ fontFamily: monoFont }}
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full p-4 bg-[#ff4d4d] border-[3px] border-white text-white text-xl font-black uppercase tracking-widest hover:bg-[#ff1a1a] transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                            >
                                {status === 'loading' ? 'WAIT...' : buttonText}
                            </button>
                            {status === "success" && <div className="text-white font-bold text-center uppercase bg-green-600 p-2 border-2 border-white">{successMessage}</div>}
                            {status === "error" && <div className="text-white font-bold text-center uppercase bg-red-600 p-2 border-2 border-white">{errorMsg}</div>}
                            {renderCount()}
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // --- VARIANT: GRADIENT ---
    if (variant === 'gradient') {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                <div className="relative z-10 max-w-2xl w-full text-center space-y-10 p-10 bg-white/95 backdrop-blur-sm rounded-[3rem] shadow-2xl">
                    <span className="inline-block px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold tracking-wider uppercase">Soon</span>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-600 pb-2">
                        {title}
                    </h1>
                    <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg mx-auto">
                        {description}
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={placeholderText}
                            className="flex-1 px-6 py-4 rounded-full bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wider"
                        >
                            {status === 'loading' ? <Loader2 className="animate-spin" /> : buttonText}
                        </button>
                    </form>
                    {renderFeedback()}
                    {renderCount()}
                </div>
            </div>
        );
    }

    // --- VARIANT: GLOW ---
    if (variant === 'glow') {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-[#0a0a0a] to-black"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-500/20 blur-[100px] rounded-full user-select-none pointer-events-none"></div>

                <div className="relative z-10 max-w-3xl w-full text-center space-y-12">
                    <h1 className="text-6xl md:text-8xl font-medium tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                        {title}
                    </h1>
                    <p className="text-xl md:text-2xl text-indigo-200/60 font-light max-w-2xl mx-auto">
                        {description}
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative flex bg-black rounded-lg p-1">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={placeholderText}
                                className="flex-1 bg-transparent px-6 py-4 text-white placeholder:text-white/20 outline-none"
                            />
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-white text-black px-8 py-2 rounded font-bold hover:bg-gray-200 transition-colors"
                            >
                                {status === 'loading' ? <Loader2 className="animate-spin" /> : buttonText}
                            </button>
                        </div>
                        {renderFeedback()}
                        {renderCount()}
                    </form>
                </div>
            </div>
        );
    }


    // --- VARIANT: BENTO ---
    if (variant === 'bento') {
        return (
            <div className="min-h-screen bg-[#EBEAE5] flex items-center justify-center p-4 md:p-12 font-geist-sans relative overflow-hidden">
                {/* Background Grid Lines */}
                <div className="absolute inset-0 pointer-events-none flex justify-between max-w-7xl mx-auto px-6 md:px-12">
                    <div className="border-l border-[#2c2c2c] border-dashed h-full opacity-20" />
                    <div className="border-r border-[#2c2c2c] border-dashed h-full opacity-20" />
                </div>

                <div className="max-w-xl w-full relative z-10">
                    <div className="bg-[#EBEAE5] border border-[#2c2c2c] border-dashed p-8 md:p-12 shadow-sm relative">
                        {/* Decorative corners */}
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-[#2c2c2c]" />
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#2c2c2c]" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#2c2c2c]" />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#2c2c2c]" />

                        {/* Optional tiny top label */}
                        <div className="text-center mb-6">
                            <span className="text-xs font-bold tracking-widest uppercase text-slate-500">
                                Join the movement
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight text-center mb-4 font-geist-sans leading-tight">
                            {title}
                        </h1>
                        <p className="text-slate-600 text-center mb-10 font-medium leading-relaxed">
                            {description}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={placeholderText}
                                    className="w-full px-5 py-4 bg-white border border-[#2c2c2c] border-dashed focus:border-solid focus:border-[#FF6B00] outline-none transition-all placeholder:text-slate-400 text-slate-900 font-medium"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full py-4 bg-[#FF6B00] text-white font-bold uppercase tracking-wider hover:bg-[#FF6B00]/90 transition-colors border border-transparent shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
                            >
                                {status === 'loading' ? <Loader2 className="animate-spin mx-auto" /> : buttonText}
                            </button>
                            {renderFeedback('minimal')}
                            {renderCount('minimal')}
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    // --- DEFAULT VARIANT ---
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 md:p-12 text-center bg-white dark:bg-slate-950 text-slate-950 dark:text-white relative overflow-hidden">
            {optimizedBg && (
                <>
                    <div className="absolute inset-0 bg-cover bg-center opacity-10 blur-3xl scale-110" style={{ backgroundImage: `url(${optimizedBg})` }} />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-slate-950" />
                </>
            )}

            <div className="relative z-10 max-w-2xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Accepting Early Access
                </span>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {title}
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                    {description}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto w-full pt-4">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={placeholderText}
                        className="flex-1 px-5 py-3.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none shadow-sm"
                    />
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="px-6 py-3.5 rounded-lg font-semibold text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                        style={{ backgroundColor: primaryColor }}
                    >
                        {status === 'loading' ? <Loader2 className="animate-spin" /> : buttonText}
                    </button>
                </form>
                {renderFeedback()}
                {renderCount()}

                <p className="text-xs text-slate-400 dark:text-slate-500 pt-8">
                    By subscribing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default Waitlist;
