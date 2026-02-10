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
    variant?: 'default' | 'card' | 'impact';
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
