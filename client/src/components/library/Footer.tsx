import React from "react";
import { useSite } from "../../context/useSite";
import {
    Github,
    Twitter,
    Instagram,
    Linkedin,
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
    variant?: "default" | "brutalist" | "glassmorphism" | "minimal" | "impact" | "pixel" | "newspaper" | "bento";
}

const socialIconMap = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
    email: Mail,
};

const Footer: React.FC<FooterProps & { padding?: string }> = ({
    logo,
    tagline,
    copyright = `© ${new Date().getFullYear()} All rights reserved.`,
    links = [],
    socials = [],
    variant = "default",
    padding,
}) => {
    const { siteConfig } = useSite();
    const primaryColor = siteConfig.site_settings.theme.primary;
    const isBrutalist = variant === "brutalist";
    const isGlassmorphism = variant === "glassmorphism";
    const isMinimal = variant === "minimal";
    const isImpact = variant === "impact";

    if (isBrutalist) {
        return (
            <footer className={`${padding || 'py-16'} border-t-[4px] border-slate-950 dark:border-white bg-white dark:bg-slate-950 px-4 overflow-hidden`}>
                <div className="max-w-7xl mx-auto space-y-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black uppercase tracking-tighter">
                                {logo || "LOGO"}
                            </h2>
                            <p className="font-bold text-slate-600 dark:text-gray-400 max-w-xs uppercase text-sm leading-tight">
                                {tagline}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Navigation</h3>
                            <ul className="space-y-3">
                                {links.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.url} className="text-lg font-black uppercase transition-colors flex items-center gap-1 group hover:text-inherit"
                                            style={{ color: '' }}
                                            onMouseOver={(e) => e.currentTarget.style.color = primaryColor}
                                            onMouseOut={(e) => e.currentTarget.style.color = ''}>
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
                                            className="w-12 h-12 flex items-center justify-center border-[3px] border-slate-950 dark:border-white text-white shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                                            style={{ backgroundColor: primaryColor }}
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
                            <span className="text-xs font-black uppercase cursor-help underline underline-offset-4 decoration-2" style={{ textDecorationColor: primaryColor }}>Privacy Policy</span>
                            <span className="text-xs font-black uppercase cursor-help underline underline-offset-4 decoration-2" style={{ textDecorationColor: primaryColor }}>Terms of Service</span>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    if (isGlassmorphism) {
        return (
            <footer className={`relative ${padding || 'py-24'} px-4 overflow-hidden`}>
                <div className="absolute inset-x-0 bottom-0 h-96 pointer-events-none" style={{ backgroundImage: `linear-gradient(to top, ${primaryColor}1a, transparent)` }} />
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
                                        <a href={link.url} className="text-slate-300 transition-all flex items-center gap-2 group hover:text-inherit"
                                            style={{ color: '' }}
                                            onMouseOver={(e) => e.currentTarget.style.color = primaryColor}
                                            onMouseOut={(e) => e.currentTarget.style.color = ''}>
                                            <span className="w-1.5 h-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-inherit"
                                                style={{ backgroundColor: '' }}
                                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = primaryColor}
                                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''} />
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
                                            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white transition-all hover:scale-110"
                                            style={{ borderColor: '', backgroundColor: '' }}
                                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = primaryColor; e.currentTarget.style.borderColor = primaryColor }}
                                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.borderColor = '' }}
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
            <footer className={`${padding || 'py-16'} px-4 border-t border-slate-100 dark:border-white/5`}>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
                    <div className="space-y-4">
                        <h2 className="text-xl font-black tracking-tight dark:text-white uppercase">{logo}</h2>
                        <p className="text-sm text-gray-400 font-medium max-w-xs">{tagline}</p>
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
            <footer className={`${padding || 'py-32'} bg-[#13131f] px-4 overflow-hidden relative`}>
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
                                <span className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: primaryColor }}>Index</span>
                                <ul className="space-y-4">
                                    {links.map((link, idx) => (
                                        <li key={idx}>
                                            <a href={link.url} className="text-2xl font-black text-white transition-all block"
                                                style={{ color: '' }}
                                                onMouseOver={(e) => e.currentTarget.style.color = primaryColor}
                                                onMouseOut={(e) => e.currentTarget.style.color = ''}>
                                                {link.label}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="space-y-8">
                                <span className="text-xs font-black uppercase tracking-[0.4em]" style={{ color: primaryColor }}>Follow</span>
                                <ul className="space-y-4">
                                    {socials.map((social, idx) => (
                                        <li key={idx}>
                                            <a href={social.url} className="text-2xl font-black text-white transition-all capitalize"
                                                style={{ color: '' }}
                                                onMouseOver={(e) => e.currentTarget.style.color = primaryColor}
                                                onMouseOut={(e) => e.currentTarget.style.color = ''}>
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
                            <div className="w-12 h-1" style={{ backgroundColor: primaryColor }} />
                            <p className="text-white font-black uppercase tracking-widest text-sm">{copyright}</p>
                        </div>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="font-black uppercase text-sm tracking-widest flex items-center gap-2 transition-transform hover:translate-x-2"
                            style={{ color: primaryColor }}
                        >
                            Back to start <ArrowUpRight size={18} />
                        </button>
                    </div>
                </div>
            </footer>
        );
    }

    if (variant === "pixel") {
        const pixelFont = "'Press Start 2P', monospace";
        return (
            <footer className={`relative bg-[#0a0a2e] border-t-[3px] ${padding || 'py-12'} px-4 overflow-hidden`} style={{ borderTopColor: primaryColor }}>
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="space-y-4">
                            <h2 className="text-xs uppercase tracking-wider" style={{ fontFamily: pixelFont, color: primaryColor }}>
                                {logo || 'LOGO'}
                            </h2>
                            {tagline && <p className="text-[7px] leading-relaxed opacity-40" style={{ fontFamily: pixelFont, color: primaryColor }}>{tagline}</p>}
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-[7px] uppercase tracking-widest opacity-50" style={{ fontFamily: pixelFont, color: primaryColor }}>Navigation</h3>
                            <ul className="space-y-2">
                                {links.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.url} className="text-[7px] uppercase tracking-wider transition-colors hover:opacity-100 opacity-60" style={{ fontFamily: pixelFont, color: primaryColor }}>
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-[7px] uppercase tracking-widest opacity-50" style={{ fontFamily: pixelFont, color: primaryColor }}>Connect</h3>
                            <div className="flex gap-3">
                                {socials.map((social, idx) => {
                                    const Icon = socialIconMap[social.platform];
                                    return (
                                        <a key={idx} href={social.url}
                                            className="w-9 h-9 border-2 bg-[#1a1a4e] flex items-center justify-center transition-all"
                                            style={{ borderColor: `${primaryColor}4d` }}
                                            onMouseOver={(e) => { e.currentTarget.style.borderColor = primaryColor; e.currentTarget.style.backgroundColor = `${primaryColor}33` }}
                                            onMouseOut={(e) => { e.currentTarget.style.borderColor = `${primaryColor}4d`; e.currentTarget.style.backgroundColor = '#1a1a4e' }}>
                                            <Icon size={14} style={{ color: primaryColor }} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 border-t-2 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTopColor: `${primaryColor}33` }}>
                        <p className="text-[6px] uppercase tracking-widest opacity-30" style={{ fontFamily: pixelFont, color: primaryColor }}>{copyright}</p>
                    </div>
                </div>
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}4d 2px, ${primaryColor}4d 4px)` }} />
            </footer>
        );
    }

    if (variant === "newspaper") {
        const serifFont = "'Playfair Display', 'Georgia', serif";
        return (
            <footer className={`bg-[#faf7f2] border-t-4 border-double border-[#2c2c2c] ${padding || 'py-16'} px-8 relative overflow-hidden`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-12 pb-12 border-b border-[#2c2c2c]">
                        <div className="space-y-4 text-center md:text-left">
                            <h2 className="text-3xl font-black uppercase tracking-tighter text-[#1a1a1a]" style={{ fontFamily: serifFont }}>
                                {logo || "PORTFOLIO"}
                            </h2>
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2c2c2c]/60 max-w-sm">
                                {tagline || "All the news that's fit to code."}
                            </p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-8">
                            {links.map((link, idx) => (
                                <a key={idx} href={link.url} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1a1a1a] hover:italic underline decoration-1 underline-offset-4">
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2c]/40 italic">
                            {copyright}
                        </div>
                        <div className="flex gap-6">
                            {socials.map((social, idx) => {
                                const Icon = socialIconMap[social.platform];
                                return (
                                    <a key={idx} href={social.url} className="text-[#1a1a1a] hover:scale-110 transition-transform">
                                        {Icon && <Icon size={18} strokeWidth={2.5} />}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </footer>
        );
    }

    if (variant === "bento") {
        return (
            <footer className={`bg-[#2c2c2c] border-t border-white/20 border-dashed ${padding || 'py-0'} relative overflow-hidden text-[#EBEAE5]`}>
                {/* Grid Guidelines - Vertical */}
                <div className="absolute inset-0 pointer-events-none flex justify-between max-w-7xl mx-auto px-6 md:px-12">
                    <div className="border-l border-white/20 border-dashed h-full" />
                    <div className="border-r border-white/20 border-dashed h-full" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 md:px-12 py-12 md:py-16 gap-8 border-b border-white/20 border-dashed">
                        {/* Brand / Logo */}
                        <div className="text-2xl font-bold font-geist-sans tracking-tight">
                            {logo || "ClOura."}
                        </div>

                        {/* Navigation & Utilities */}
                        <div className="flex flex-wrap gap-8 md:gap-16 text-sm font-medium font-geist-sans text-[#EBEAE5]/80">
                            <div className="flex gap-6">
                                {links.map((link, idx) => (
                                    <a key={idx} href={link.url} className="hover:text-white transition-colors">
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                            <div className="flex gap-6">
                                <a href="#" className="hover:text-white transition-colors">Discord</a>
                                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                                <a href="#" className="hover:text-white transition-colors">About</a>
                            </div>
                            <div>
                                {copyright}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Massive Text */}
                    <div className="px-6 md:px-12 pt-24 pb-12 overflow-hidden flex justify-center">
                        <h1 className="text-[18vw] leading-[0.8] font-bold font-geist-sans tracking-tighter text-white select-none whitespace-nowrap relative">
                            {logo || "ClOura."}
                            <div className="absolute -bottom-4 left-0 w-full h-2 md:h-4 bg-[#FF6B00]" />
                        </h1>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className={`border-t border-slate-200 dark:border-white/5 ${padding || 'py-20'} bg-slate-50 dark:bg-slate-900/50 px-4 mt-20`}>
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{logo}</h3>
                        <p className="text-slate-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">{tagline}</p>
                    </div>

                    <div>
                        <h4 className="font-black uppercase text-xs tracking-widest text-slate-400 mb-8">Navigation</h4>
                        <ul className="space-y-4">
                            {links.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.url} className="text-slate-600 dark:text-slate-400 transition-colors font-medium hover:text-inherit"
                                        style={{ color: '' }}
                                        onMouseOver={(e) => e.currentTarget.style.color = primaryColor}
                                        onMouseOut={(e) => e.currentTarget.style.color = ''}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black uppercase text-xs tracking-widest text-slate-400 mb-8">Resources</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 transition-colors font-medium hover:text-inherit"
                                style={{ color: '' }}
                                onMouseOver={(e) => e.currentTarget.style.color = primaryColor}
                                onMouseOut={(e) => e.currentTarget.style.color = ''}>Docs</a></li>
                            <li><a href="#" className="text-slate-600 dark:text-slate-400 transition-colors font-medium hover:text-inherit"
                                style={{ color: '' }}
                                onMouseOver={(e) => e.currentTarget.style.color = primaryColor}
                                onMouseOut={(e) => e.currentTarget.style.color = ''}>Release Notes</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black uppercase text-xs tracking-widest text-slate-400 mb-8">Follow Us</h4>
                        <div className="flex gap-4">
                            {socials.map((social, idx) => {
                                const Icon = socialIconMap[social.platform];
                                return (
                                    <a key={idx} href={social.url} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/10 transition-all hover:text-white"
                                        style={{ backgroundColor: '' }}
                                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = primaryColor}
                                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = ''}>
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="pt-12 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm gap-8">
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
