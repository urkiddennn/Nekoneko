import React from "react";
import {
    Github,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    ArrowUpRight
} from "lucide-react";

interface FooterLink {
    label: string;
    url: string;
}

interface SocialLink {
    platform: "github" | "twitter" | "linkedin" | "instagram" | "email";
    url: string;
}

interface FooterProps {
    logo?: string;
    tagline?: string;
    copyright?: string;
    links?: FooterLink[];
    socials?: SocialLink[];
    variant?: "default" | "brutalist" | "glassmorphism" | "minimal" | "impact";
}

const socialIconMap = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    email: Mail,
};

const Footer: React.FC<FooterProps> = ({
    logo,
    tagline,
    copyright = `© ${new Date().getFullYear()} All rights reserved.`,
    links = [],
    socials = [],
    variant = "default",
}) => {
    const isBrutalist = variant === "brutalist";
    const isGlassmorphism = variant === "glassmorphism";
    const isMinimal = variant === "minimal";
    const isImpact = variant === "impact";

    if (isBrutalist) {
        return (
            <footer className="border-t-[4px] border-slate-950 dark:border-white bg-white dark:bg-slate-950 py-16 -mx-4 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black uppercase tracking-tighter">
                                {logo || "LOGO"}
                            </h2>
                            <p className="font-bold text-slate-600 dark:text-slate-400 max-w-xs uppercase text-sm leading-tight">
                                {tagline}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Navigation</h3>
                            <ul className="space-y-3">
                                {links.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.url} className="text-lg font-black uppercase hover:text-[#ff5a5f] transition-colors flex items-center gap-1 group">
                                            {link.label}
                                            <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Connect</h3>
                            <div className="flex flex-wrap gap-4">
                                {socials.map((social, idx) => {
                                    const Icon = socialIconMap[social.platform];
                                    return (
                                        <a
                                            key={idx}
                                            href={social.url}
                                            className="w-12 h-12 flex items-center justify-center border-[3px] border-slate-950 dark:border-white bg-[#ff5a5f] text-white shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                                        >
                                            <Icon size={24} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t-[3px] border-slate-950 dark:border-white flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="font-black uppercase text-sm tracking-tight">{copyright}</p>
                        <div className="flex gap-8">
                            <span className="text-xs font-black uppercase cursor-help underline underline-offset-4 decoration-2 decoration-[#ff5a5f]">Privacy Policy</span>
                            <span className="text-xs font-black uppercase cursor-help underline underline-offset-4 decoration-2 decoration-[#ff5a5f]">Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    if (isGlassmorphism) {
        return (
            <footer className="relative py-24 -mx-4 px-4 overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-[#ff5a5f]/10 to-transparent pointer-events-none" />
                <div className="max-w-7xl mx-auto backdrop-blur-2xl bg-white/5 border border-white/10 p-12 md:p-20 rounded-[4rem] shadow-2xl relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-black text-white">{logo}</h2>
                            <p className="text-slate-400 font-medium leading-relaxed">{tagline}</p>
                        </div>

                        <div className="space-y-8 lg:col-start-3">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">Explore</h3>
                            <ul className="space-y-4">
                                {links.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.url} className="text-slate-300 hover:text-[#ff5a5f] transition-all flex items-center gap-2 group">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-[#ff5a5f] transition-colors" />
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">Network</h3>
                            <div className="flex gap-4">
                                {socials.map((social, idx) => {
                                    const Icon = socialIconMap[social.platform];
                                    return (
                                        <a
                                            key={idx}
                                            href={social.url}
                                            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-[#ff5a5f] hover:border-[#ff5a5f] transition-all hover:scale-110"
                                        >
                                            <Icon size={20} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm font-medium gap-4">
                        <p>{copyright}</p>
                        <p className="flex gap-6">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                        </p>
                    </div>
                </div>
            </footer>
        );
    }

    if (isMinimal) {
        return (
            <footer className="py-16 -mx-4 px-4 border-t border-slate-100 dark:border-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                    <div className="space-y-4">
                        <h2 className="text-xl font-black tracking-tight dark:text-white uppercase">{logo}</h2>
                        <p className="text-sm text-slate-500 font-medium max-w-xs">{tagline}</p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-6">
                        <ul className="flex flex-wrap justify-center gap-8">
                            {links.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.url} className="text-sm font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-6">
                            {socials.map((social, idx) => {
                                const Icon = socialIconMap[social.platform];
                                return (
                                    <a key={idx} href={social.url} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                                        <Icon size={18} strokeWidth={1.5} />
                                    </a>
                                );
                            })}
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-slate-300 dark:text-slate-600 font-bold">{copyright}</p>
                    </div>
                </div>
            </footer>
        );
    }

    if (isImpact) {
        return (
            <footer className="py-32 bg-[#13131f] -mx-4 px-4 overflow-hidden relative">
                <div className="max-w-7xl mx-auto space-y-24 relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
                        <div className="space-y-10 max-w-2xl">
                            <h2 className="text-7xl md:text-9xl font-black text-white leading-none tracking-tighter">
                                {logo || "HELLO."}
                            </h2>
                            <p className="text-2xl md:text-3xl text-slate-400 font-medium leading-tight">
                                {tagline}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-20">
                            <div className="space-y-8">
                                <span className="text-[#ff5a5f] text-xs font-black uppercase tracking-[0.4em]">Index</span>
                                <ul className="space-y-4">
                                    {links.map((link, idx) => (
                                        <li key={idx}>
                                            <a href={link.url} className="text-2xl font-black text-white hover:text-[#ff5a5f] transition-all block">
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-8">
                                <span className="text-[#ff5a5f] text-xs font-black uppercase tracking-[0.4em]">Follow</span>
                                <ul className="space-y-4">
                                    {socials.map((social, idx) => (
                                        <li key={idx}>
                                            <a href={social.url} className="text-2xl font-black text-white hover:text-[#ff5a5f] transition-all capitalize">
                                                {social.platform}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-1 bg-[#ff5a5f]" />
                            <p className="text-white font-black uppercase tracking-widest text-sm">{copyright}</p>
                        </div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-[#ff5a5f] font-black uppercase text-sm tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform"
                        >
                            Back to start <ArrowUpRight size={18} />
                        </button>
                    </div>
                </div>
            </footer>
        );
    }

    // Default variant
    return (
        <footer className="border-t border-slate-200 dark:border-white/5 py-20 bg-slate-50 dark:bg-slate-900/50 -mx-4 px-4 mt-20">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{logo}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">{tagline}</p>
                    </div>

                    <div>
                        <h4 className="font-black uppercase text-xs tracking-widest text-slate-400 mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {links.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.url} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors font-medium">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black uppercase text-xs tracking-widest text-slate-400 mb-8">Resources</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors font-medium">Docs</a></li>
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 transition-colors font-medium">Release Notes</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black uppercase text-xs tracking-widest text-slate-400 mb-8">Follow Us</h4>
                        <div className="flex gap-4">
                            {socials.map((social, idx) => {
                                const Icon = socialIconMap[social.platform];
                                return (
                                    <a key={idx} href={social.url} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/10 hover:bg-indigo-600 hover:text-white transition-all">
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm gap-8">
                    <p>{copyright}</p>
                    <div className="flex gap-8 font-medium">
                        <a href="#" className="hover:text-slate-950 dark:hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-950 dark:hover:text-white">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
