import React, { useState } from "react";
import { Send, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useSite } from "../../context/useSite";

interface ConnectWithMeProps {
    title: string;
    subheading?: string;
    buttonText: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    variant?: "default" | "brutalist" | "glassmorphism" | "minimal_outline" | "pixel" | "newspaper";
    showLineDecoration?: boolean;
}

const DecorativeLine = ({ position = "right" }: { position?: "left" | "right" }) => (
    <div className={`absolute ${position === "right" ? "right-0 md:right-10" : "left-0 md:left-10"} top-0 bottom-0 flex flex-col items-center justify-center pointer-events-none opacity-40 md:opacity-100`}>
        <div className="w-[1px] h-full bg-slate-400 dark:bg-slate-700 relative flex flex-col items-center py-20 gap-20">
            <div className="w-3 h-3 rounded-full bg-[#ff5a5f] shadow-[0_0_10px_#ff5a5f]" />
            <div className="w-3 h-3 rounded-full border border-slate-400 dark:border-slate-500 bg-transparent" />
            <div className="w-3 h-3 rounded-full border border-slate-400 dark:border-slate-500 bg-transparent" />
            <div className="w-3 h-3 rounded-full border border-slate-400 dark:border-slate-500 bg-transparent" />
        </div>
    </div>
);

const ConnectWithMe: React.FC<ConnectWithMeProps> = ({
    title,
    subheading,
    buttonText,
    emailPlaceholder,
    messagePlaceholder,
    variant = "default",
    showLineDecoration = true,
}) => {
    const { projectId } = useSite();
    const sendMessage = useMutation(api.messages.sendMessage);

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectId) return;

        setStatus("loading");
        try {
            await sendMessage({
                projectId: projectId as any,
                senderEmail: email,
                content: message
            });
            setStatus("success");
            setEmail("");
            setMessage("");
            setTimeout(() => setStatus("idle"), 5000);
        } catch (err: any) {
            setStatus("error");
            setErrorMsg(err.message || "Failed to send message");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    const isBrutalist = variant === "brutalist";
    const isGlassmorphism = variant === "glassmorphism";
    const isMinimalOutline = variant === "minimal_outline";

    const renderFeedback = () => {
        if (status === "success") {
            return (
                <div className="flex items-center gap-2 text-green-500 font-bold text-sm animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 size={16} />
                    Message sent successfully!
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

    if (isBrutalist) {
        return (
            <section className="relative overflow-hidden">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white uppercase tracking-tighter italic">
                            {title}
                        </h2>
                        <div className="h-2 w-32 bg-[#ff5a5f] border-2 border-slate-950 dark:border-white shadow-[4px_4px_0px_0px_rgba(2,6,23,1)]" />
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={emailPlaceholder}
                                required
                                className="w-full px-6 py-4 bg-white dark:bg-slate-900 border-[3px] border-slate-950 dark:border-white text-lg font-bold placeholder:text-slate-400 focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(255,90,95,1)] transition-all"
                            />
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={messagePlaceholder}
                                rows={4}
                                required
                                className="w-full px-6 py-4 bg-white dark:bg-slate-900 border-[3px] border-slate-950 dark:border-white text-lg font-bold placeholder:text-slate-400 focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(255,90,95,1)] transition-all resize-none"
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="px-10 py-5 bg-[#ff5a5f] text-white text-xl font-black uppercase tracking-widest border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3 group disabled:opacity-50"
                            >
                                {status === "loading" ? <Loader2 className="animate-spin" /> : buttonText}
                                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                            </button>
                            {renderFeedback()}
                        </div>
                    </form>
                </div>
                {showLineDecoration && <DecorativeLine />}
            </section>
        );
    }

    if (isGlassmorphism) {
        return (
            <section className="relative overflow-hidden">
                <div className="max-w-4xl mx-auto p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl">
                    <div className="space-y-6 mb-10 text-center">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                            {title}
                        </h2>
                        {subheading && <p className="text-slate-400 text-lg font-medium">{subheading}</p>}
                    </div>

                    <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={emailPlaceholder}
                            required
                            className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ff5a5f]/50 transition-all"
                        />
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={messagePlaceholder}
                            rows={4}
                            required
                            className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ff5a5f]/50 transition-all resize-none"
                        />
                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full py-5 bg-gradient-to-r from-[#ff5a5f] to-rose-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-rose-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group disabled:opacity-50"
                            >
                                {status === "loading" ? <Loader2 className="animate-spin" size={20} /> : buttonText}
                                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                            {renderFeedback()}
                        </div>
                    </form>
                </div>
                {showLineDecoration && <DecorativeLine />}
            </section>
        );
    }

    if (isMinimalOutline) {
        return (
            <section className="relative overflow-hidden">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="relative">
                        <h2 className="text-5xl font-black text-slate-950 dark:text-white uppercase tracking-tighter">
                            {title}
                        </h2>
                        <div className="absolute -bottom-4 left-0 w-24 h-1 bg-slate-950 dark:bg-white" />
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-8">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={emailPlaceholder}
                                required
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-4 text-xl font-medium focus:outline-none focus:border-slate-950 dark:focus:border-white transition-colors"
                            />
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={messagePlaceholder}
                                rows={4}
                                required
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-4 text-xl font-medium focus:outline-none focus:border-slate-950 dark:focus:border-white transition-colors resize-none"
                            />
                        </div>
                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="px-12 py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-base font-black uppercase tracking-[0.3em] hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors disabled:opacity-50 min-w-[200px] flex items-center justify-center gap-3"
                            >
                                {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : buttonText}
                            </button>
                            {renderFeedback()}
                        </div>
                    </form>
                </div>
                {showLineDecoration && <DecorativeLine />}
            </section>
        );
    }

    if (variant === "pixel") {
        const pixelFont = "'Press Start 2P', monospace";
        return (
            <section className="relative overflow-hidden">
                <div className="relative bg-[#0a0a2e] border-[3px] border-[#00ff41] p-6 md:p-8 overflow-hidden"
                    style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.15)' }}>
                    <span className="absolute top-2 left-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
                    <span className="absolute top-2 right-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 border-2 border-[#00ff41] bg-[#00ff41]/20 flex items-center justify-center">
                            <Send size={14} className="text-[#00ff41]" />
                        </div>
                        <h2 className="text-xs md:text-sm text-[#00ff41] uppercase tracking-wider" style={{ fontFamily: pixelFont }}>
                            {title}
                        </h2>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-[7px] text-[#00ff41]/50 uppercase tracking-widest block mb-2" style={{ fontFamily: pixelFont }}>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                placeholder={emailPlaceholder} required
                                className="w-full px-4 py-3 bg-[#1a1a4e] border-2 border-[#00ff41]/30 text-[#00ff41] text-[10px] placeholder:text-[#00ff41]/30 focus:outline-none focus:border-[#00ff41]"
                                style={{ fontFamily: pixelFont }} />
                        </div>
                        <div>
                            <label className="text-[7px] text-[#00ff41]/50 uppercase tracking-widest block mb-2" style={{ fontFamily: pixelFont }}>Message</label>
                            <textarea value={message} onChange={(e) => setMessage(e.target.value)}
                                placeholder={messagePlaceholder} rows={4} required
                                className="w-full px-4 py-3 bg-[#1a1a4e] border-2 border-[#00ff41]/30 text-[#00ff41] text-[10px] placeholder:text-[#00ff41]/30 focus:outline-none focus:border-[#00ff41] resize-none"
                                style={{ fontFamily: pixelFont }} />
                        </div>
                        <div className="space-y-3">
                            <button type="submit" disabled={status === "loading"}
                                className="px-6 py-3 text-[8px] uppercase tracking-widest border-2 border-[#00ff41] bg-[#00ff41] text-[#0a0a2e] hover:bg-transparent hover:text-[#00ff41] transition-all shadow-[3px_3px_0px_0px_#00ff41] disabled:opacity-50 flex items-center gap-2"
                                style={{ fontFamily: pixelFont, cursor: 'pointer' }}>
                                {status === "loading" ? <Loader2 className="animate-spin" size={14} /> : buttonText}
                            </button>
                            {renderFeedback()}
                        </div>
                    </form>
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.3) 2px, rgba(0,255,65,0.3) 4px)' }} />
                </div>
            </section>
        );
    }

    if (variant === "newspaper") {
        const serifFont = "'Playfair Display', 'Georgia', serif";
        const bodyFont = "'Lora', 'Georgia', serif";
        return (
            <section className="bg-[#faf7f2] border-y-4 border-double border-[#2c2c2c] py-16 -mx-4 px-4 text-[#1a1a1a]">
                <div className="max-w-2xl mx-auto space-y-10">
                    <div className="space-y-4 text-center pb-8 border-b border-[#2c2c2c]">
                        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter" style={{ fontFamily: serifFont }}>
                            {title || "CORRESPONDENCE"}
                        </h2>
                        {subheading && (
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2c2c2c]/60 italic" style={{ fontFamily: bodyFont }}>
                                {subheading}
                            </p>
                        )}
                    </div>

                    {status === "success" ? (
                        renderFeedback()
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8 pt-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2c2c]" style={{ fontFamily: bodyFont }}>From (Email)</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={emailPlaceholder}
                                    className="w-full bg-transparent border-b border-[#2c2c2c] py-2 text-sm focus:outline-none focus:border-b-2 italic"
                                    style={{ fontFamily: bodyFont }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#2c2c2c]" style={{ fontFamily: bodyFont }}>Message Body</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder={messagePlaceholder}
                                    className="w-full bg-transparent border-b border-[#2c2c2c] py-2 text-sm focus:outline-none focus:border-b-2 italic resize-none leading-relaxed"
                                    style={{ fontFamily: bodyFont }}
                                />
                            </div>
                            <button
                                disabled={status === "loading"}
                                className="w-full py-5 bg-[#1a1a1a] text-[#faf7f2] font-black uppercase tracking-[0.2em] text-xs hover:bg-transparent hover:text-[#1a1a1a] border border-[#2c2c2c] transition-all disabled:opacity-50"
                                style={{ fontFamily: serifFont }}
                            >
                                {status === "loading" ? (
                                    <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={16} /> TRANSMITTING...</span>
                                ) : (
                                    buttonText || "DISPATCH MESSAGE"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </section>
        );
    }

    // Default variant
    return (
        <section className="relative overflow-hidden bg-[#13131f] -mx-4 px-4 py-24">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-12">
                    <div className="space-y-4">
                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight">
                            {title}
                        </h2>
                        <div className="h-[3px] w-24 bg-[#ff5a5f]" />
                    </div>

                    <form className="space-y-6 max-w-lg" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={emailPlaceholder}
                                required
                                className="w-full px-6 py-5 bg-[#1a1a2e] border-none rounded-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#ff5a5f]/30"
                            />
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder={messagePlaceholder}
                                rows={4}
                                required
                                className="w-full px-6 py-5 bg-[#1a1a2e] border-none rounded-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#ff5a5f]/30 resize-none"
                            />
                        </div>
                        <div className="space-y-4">
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="px-8 py-4 bg-[#ff5a5f] text-white font-black uppercase tracking-widest text-sm flex items-center gap-3 transition-transform hover:scale-105 disabled:opacity-50 min-w-[180px] justify-center"
                            >
                                {status === "loading" ? <Loader2 className="animate-spin" size={18} /> : (
                                    <>
                                        {buttonText}
                                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                                    </>
                                )}
                            </button>
                            {renderFeedback()}
                        </div>
                    </form>
                </div>

                <div className="hidden md:block">
                </div>
            </div>
            {showLineDecoration && <DecorativeLine />}
        </section>
    );
};

export default ConnectWithMe;

