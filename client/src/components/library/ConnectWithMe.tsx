import React from "react";
import { Send, ArrowRight } from "lucide-react";

interface ConnectWithMeProps {
    title: string;
    subheading?: string;
    buttonText: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    variant?: "default" | "brutalist" | "glassmorphism" | "minimal_outline";
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
    const isBrutalist = variant === "brutalist";
    const isGlassmorphism = variant === "glassmorphism";
    const isMinimalOutline = variant === "minimal_outline";

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

                    <form className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            <input
                                type="email"
                                placeholder={emailPlaceholder}
                                className="w-full px-6 py-4 bg-white dark:bg-slate-900 border-[3px] border-slate-950 dark:border-white text-lg font-bold placeholder:text-slate-400 focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(255,90,95,1)] transition-all"
                            />
                            <textarea
                                placeholder={messagePlaceholder}
                                rows={4}
                                className="w-full px-6 py-4 bg-white dark:bg-slate-900 border-[3px] border-slate-950 dark:border-white text-lg font-bold placeholder:text-slate-400 focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(255,90,95,1)] transition-all resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-10 py-5 bg-[#ff5a5f] text-white text-xl font-black uppercase tracking-widest border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-3 group"
                        >
                            {buttonText}
                            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                        </button>
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

                    <form className="grid grid-cols-1 gap-6">
                        <input
                            type="email"
                            placeholder={emailPlaceholder}
                            className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ff5a5f]/50 transition-all"
                        />
                        <textarea
                            placeholder={messagePlaceholder}
                            rows={4}
                            className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#ff5a5f]/50 transition-all resize-none"
                        />
                        <button
                            type="submit"
                            className="w-full py-5 bg-gradient-to-r from-[#ff5a5f] to-rose-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-lg shadow-rose-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
                        >
                            {buttonText}
                            <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
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

                    <form className="space-y-8">
                        <div className="grid grid-cols-1 gap-8">
                            <input
                                type="email"
                                placeholder={emailPlaceholder}
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-4 text-xl font-medium focus:outline-none focus:border-slate-950 dark:focus:border-white transition-colors"
                            />
                            <textarea
                                placeholder={messagePlaceholder}
                                rows={4}
                                className="w-full bg-transparent border-b-2 border-slate-200 dark:border-white/10 py-4 text-xl font-medium focus:outline-none focus:border-slate-950 dark:focus:border-white transition-colors resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-12 py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-base font-black uppercase tracking-[0.3em] hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                        >
                            {buttonText}
                        </button>
                    </form>
                </div>
                {showLineDecoration && <DecorativeLine />}
            </section>
        );
    }

    // Default variant (matching the user's provided image)
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

                    <form className="space-y-6 max-w-lg">
                        <div className="space-y-4">
                            <input
                                type="email"
                                placeholder={emailPlaceholder}
                                className="w-full px-6 py-5 bg-[#1a1a2e] border-none rounded-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#ff5a5f]/30"
                            />
                            <textarea
                                placeholder={messagePlaceholder}
                                rows={4}
                                className="w-full px-6 py-5 bg-[#1a1a2e] border-none rounded-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#ff5a5f]/30 resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-8 py-4 bg-[#ff5a5f] text-white font-black uppercase tracking-widest text-sm flex items-center gap-3 transition-transform hover:scale-105"
                        >
                            {buttonText}
                            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                        </button>
                    </form>
                </div>

                <div className="hidden md:block">
                    {/* Right side is mostly decorative space in the image, or the line decoration */}
                </div>
            </div>
            {showLineDecoration && <DecorativeLine />}
        </section>
    );
};

export default ConnectWithMe;
