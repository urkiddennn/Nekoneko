import React from 'react';
import { Mail, Github, Linkedin, ArrowUpRight, Globe, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const ICON_MAP: Record<string, any> = {
    Mail,
    Github,
    Linkedin,
    ArrowUpRight,
    Globe,
    Phone,
    MapPin,
    Instagram,
    Twitter,
    Facebook
};

interface Link {
    label: string;
    url: string;
    icon: string;
}

interface ContactInfoProps {
    title?: string;
    description?: string;
    links?: Link[];
    alignment?: 'left' | 'center' | 'right';
    variant?: 'default' | 'card' | 'impact' | 'brutalist' | 'glassmorphism' | 'connected_line' | 'creative_gradient' | 'pixel' | 'newspaper';
    email?: string;
    github?: string;
    linkedin?: string;
    footer_text?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({
    title = "Get in touch",
    description,
    links = [],
    alignment = 'center',
    variant = 'default',
    email,
    github,
    linkedin,
    footer_text,
}) => {
    if (variant === 'brutalist') {
        return (
            <div className="p-12 bg-white dark:bg-slate-900 border-[4px] border-slate-950 dark:border-white shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] space-y-10">
                <h2 className="text-4xl font-black uppercase tracking-tighter text-slate-950 dark:text-white">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {links.map((link, idx) => {
                        const IconComponent = ICON_MAP[link.icon || ''] || Mail;
                        return (
                            <a key={idx} href={link.url} className="p-6 bg-white dark:bg-slate-800 border-[3px] border-slate-950 dark:border-white hover:bg-[#ff5a5f] hover:text-white transition-all group flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(2,6,23,1)]">
                                <div className="flex items-center gap-4">
                                    <IconComponent size={24} />
                                    <span className="font-black uppercase tracking-widest text-sm">{link.label}</span>
                                </div>
                                <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </a>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (variant === 'glassmorphism') {
        return (
            <div className="p-16 rounded-[4rem] bg-indigo-500/5 backdrop-blur-3xl border border-white/20 shadow-2xl space-y-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[100px] -z-10" />
                <h2 className="text-3xl font-black text-white">{title}</h2>
                <div className="flex flex-wrap gap-6">
                    {links.map((link, idx) => {
                        const IconComponent = ICON_MAP[link.icon || ''] || Mail;
                        return (
                            <a key={idx} href={link.url} className="px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-4 group">
                                <IconComponent size={20} className="text-slate-400 group-hover:text-white transition-colors" />
                                <span className="font-bold text-sm tracking-wide">{link.label}</span>
                            </a>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (variant === 'connected_line') {
        return (
            <div className="relative py-12 bg-[#13131f] -mx-4 px-4 overflow-hidden">
                <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-slate-800 hidden md:block" />
                <div className="relative pl-12 space-y-12">
                    <div className="absolute left-[-45px] top-4 w-2.5 h-2.5 rounded-full bg-[#ff5a5f] shadow-[0_0_10px_#ff5a5f] hidden md:block" />
                    <h2 className="text-5xl font-black text-white uppercase tracking-tight">{title}</h2>
                    <div className="space-y-6">
                        {links.map((link, idx) => (
                            <a key={idx} href={link.url} className="flex items-center gap-8 group">
                                <span className="text-slate-600 font-black uppercase tracking-[0.4em] text-xs">0{idx + 1}</span>
                                <span className="text-3xl font-black text-white uppercase tracking-tighter group-hover:text-[#ff5a5f] transition-all">{link.label}</span>
                                <ArrowUpRight size={24} className="text-[#ff5a5f] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-2" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'creative_gradient') {
        return (
            <div className="p-16 rounded-[4rem] bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-12 relative overflow-hidden group">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                <h2 className="text-4xl font-black text-white italic tracking-tighter">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {links.map((link, idx) => {
                        const IconComponent = ICON_MAP[link.icon || ''] || Mail;
                        return (
                            <a key={idx} href={link.url} className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-all group/item">
                                <div className="flex items-center gap-6">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                                        <IconComponent size={24} />
                                    </div>
                                    <span className="text-white font-black uppercase tracking-widest text-xs">{link.label}</span>
                                </div>
                                <ArrowUpRight size={20} className="text-white opacity-0 group-hover/item:opacity-100 transition-all" />
                            </a>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (variant === "impact") {
        const contactLinks = [
            { id: 'email', label: email, icon: Mail, url: `mailto:${email}` },
            { id: 'github', label: github, icon: Github, url: `https://github.com/${github}` },
            { id: 'linkedin', label: linkedin, icon: Linkedin, url: `https://linkedin.com/in/${linkedin}` },
        ].filter(l => l.label);

        return (
            <div className="py-24 flex flex-col items-center">
                {/* Connection line/header */}
                <div className="flex flex-col items-center mb-16 space-y-4">
                    <div className="w-px h-24 bg-gradient-to-b from-transparent to-indigo-600" />
                    <div className="bg-indigo-600 text-white px-6 py-2 rounded-full text-[10px] font-black tracking-[0.3em] uppercase">
                        CONNECT WITH ME
                    </div>
                </div>

                <h2 className="text-5xl md:text-8xl font-black text-slate-950 dark:text-white uppercase tracking-tighter text-center mb-20 italic">
                    LET'S WORK <br /> <span className="text-indigo-600 not-italic">TOGETHER</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-5xl px-4">
                    {contactLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col items-center space-y-6 transition-all duration-300"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-indigo-600/20 rounded-full blur-2xl group-hover:blur-3xl transition-all opacity-0 group-hover:opacity-100" />
                                <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-white/5 rounded-full flex items-center justify-center group-hover:border-indigo-600 transition-colors">
                                    <link.icon size={40} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                                </div>
                            </div>
                            <span className="font-black text-slate-950 dark:text-white uppercase tracking-widest text-sm md:text-base border-b-2 border-transparent group-hover:border-indigo-600 pb-1 transition-all">
                                {link.id}
                            </span>
                        </a>
                    ))}
                </div>

                {footer_text && (
                    <div className="mt-32 border-t border-slate-100 dark:border-white/5 pt-12 w-full text-center">
                        <p className="text-[10px] font-black tracking-[0.5em] text-slate-400 uppercase">
                            {footer_text}
                        </p>
                    </div>
                )}
            </div>
        );
    }
    if (variant === 'card') {
        return (
            <div className="bg-[#ff4d4d] dark:bg-red-600 p-8 rounded-2xl relative overflow-hidden group">
                {/* Decorative triangle cutout */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white dark:bg-slate-950 translate-x-8 -translate-y-8 rotate-45"></div>

                <div className="relative z-10">
                    <h3 className="text-[10px] font-black tracking-[0.4em] mb-12 opacity-80 text-white leading-none">{title}</h3>

                    <div className="space-y-6">
                        {links.map((link, idx) => {
                            const IconComponent = ICON_MAP[link.icon || ''] || null;
                            return (
                                <a
                                    key={idx}
                                    href={link.url}
                                    className="flex items-center justify-between group/link border-b border-white/20 pb-4 last:border-0 hover:opacity-80 transition-opacity"
                                >
                                    <div className="flex items-center gap-4">
                                        {IconComponent && <IconComponent size={20} className="text-white" />}
                                        <span className="font-mono font-bold uppercase tracking-tighter text-lg text-white">{link.label}</span>
                                    </div>
                                    <ArrowUpRight size={20} className="text-white group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'newspaper') {
        const serifFont = "'Playfair Display', 'Georgia', serif";
        const bodyFont = "'Lora', 'Georgia', serif";
        return (
            <div className="bg-[#faf7f2] border-y-4 border-double border-[#2c2c2c] py-16 -mx-4 px-4 text-[#1a1a1a]">
                <div className="max-w-4xl mx-auto space-y-12">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-center" style={{ fontFamily: serifFont }}>
                        {title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#2c2c2c]">
                        {links.map((link, idx) => {
                            const Icon = ICON_MAP[link.icon] || Mail;
                            return (
                                <a key={idx} href={link.url} className="bg-[#faf7f2] p-8 flex items-center gap-6 group hover:bg-[#1a1a1a]/5 transition-colors border-r border-[#2c2c2c] last:border-r-0">
                                    <div className="w-12 h-12 flex items-center justify-center border border-[#2c2c2c] group-hover:bg-[#1a1a1a] group-hover:text-[#faf7f2] transition-colors">
                                        <Icon size={20} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#2c2c2c]/40" style={{ fontFamily: bodyFont }}>CONTACT {idx + 1}</span>
                                        <h3 className="text-lg font-black uppercase tracking-tight italic" style={{ fontFamily: serifFont }}>{link.label}</h3>
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                    {footer_text && (
                        <div className="text-center pt-8">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#2c2c2c]/60 max-w-sm mx-auto italic" style={{ fontFamily: bodyFont }}>
                                {footer_text}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    if (variant === 'pixel') {
        const pixelFont = "'Press Start 2P', monospace";
        return (
            <div className="relative bg-[#0a0a2e] border-[3px] border-[#00ff41] p-6 md:p-8 overflow-hidden"
                style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.15)' }}>
                <span className="absolute top-2 left-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
                <span className="absolute top-2 right-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 border-2 border-[#00ff41] bg-[#00ff41]/20 flex items-center justify-center">
                        <Mail size={14} className="text-[#00ff41]" />
                    </div>
                    <h2 className="text-xs md:text-sm text-[#00ff41] uppercase tracking-wider" style={{ fontFamily: pixelFont }}>
                        {title}
                    </h2>
                </div>
                <div className="space-y-3">
                    {links.map((link, idx) => {
                        const IconComponent = ICON_MAP[link.icon || ''] || Mail;
                        return (
                            <a key={idx} href={link.url}
                                className="flex items-center justify-between px-4 py-3 border-2 border-[#00ff41]/30 bg-[#1a1a4e] hover:border-[#00ff41] transition-colors group">
                                <div className="flex items-center gap-3">
                                    <IconComponent size={14} className="text-[#00ff41]" />
                                    <span className="text-[8px] md:text-[10px] text-[#00ff41] uppercase tracking-wider" style={{ fontFamily: pixelFont }}>
                                        {link.label}
                                    </span>
                                </div>
                                <span className="text-[#00ff41]/40 text-xs group-hover:text-[#00ff41] transition-colors" style={{ fontFamily: pixelFont }}>→</span>
                            </a>
                        );
                    })}
                </div>
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.3) 2px, rgba(0,255,65,0.3) 4px)' }} />
            </div>
        );
    }

    const alignmentClasses = {
        left: 'items-start text-left',
        center: 'items-center text-center',
        right: 'items-end text-right'
    };

    // The original code had `alignmentClasses[alignment]` for `alignClass`.
    // The provided edit uses `alignClass` directly, implying it should be defined.
    // To maintain functionality, I'll assume `alignClass` should be `alignmentClasses[alignment]`.
    const alignClass = alignmentClasses[alignment];

    return (
        <div className={`flex flex-col ${alignClass} py-8`}>
            {title && <h2 className="text-2xl font-black mb-2 uppercase italic tracking-tighter text-slate-950 dark:text-white">{title}</h2>}
            {description && <p className="text-slate-950 dark:text-slate-400 font-medium mb-8 max-w-md">{description}</p>}
            <div className="flex flex-wrap gap-4">
                {links.map((link, idx) => {
                    const IconComponent = ICON_MAP[link.icon || ''] || null;
                    return (
                        <a
                            key={idx}
                            href={link.url}
                            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-600/30 dark:hover:border-indigo-500/30 hover:shadow-xl transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                {IconComponent && <IconComponent size={20} className="text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 transition-colors" />}
                                <span className="font-bold text-slate-900 dark:text-gray-100 text-sm">{link.label}</span>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default ContactInfo;
