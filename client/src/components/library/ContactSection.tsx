import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

interface ContactSectionProps {
    email: string;
    github: string;
    linkedin: string;
    footer_text: string;
    variant?: 'default' | 'impact' | 'brutalist' | 'glassmorphism' | 'connected_line' | 'creative_gradient';
}

const ContactSection: React.FC<ContactSectionProps> = ({ email, github, linkedin, footer_text, variant = 'default' }) => {
    const title = 'Get in touch'; // Added local title for consistency with new variants

    if (variant === 'brutalist') {
        return (
            <div className="p-12 bg-white dark:bg-slate-900 border-[4px] border-slate-950 dark:border-white shadow-[12px_12px_0px_0px_rgba(2,6,23,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] text-center space-y-12">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-slate-950 dark:text-white">{title || 'Get in touch'}</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {[
                        { icon: Mail, href: `mailto:${email}`, label: 'Email' },
                        { icon: Github, href: `https://github.com/${github}`, label: 'Github' },
                        { icon: Linkedin, href: `https://linkedin.com/in/${linkedin}`, label: 'LinkedIn' }
                    ].map((item, idx) => (
                        <a key={idx} href={item.href} className="p-10 bg-white dark:bg-slate-800 border-[3px] border-slate-950 dark:border-white shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] hover:bg-[#ff5a5f] hover:text-white transition-all group flex flex-col items-center gap-4">
                            <item.icon size={32} />
                            <span className="font-black uppercase tracking-widest text-[10px]">{item.label}</span>
                        </a>
                    ))}
                </div>
                <p className="text-slate-950 dark:text-slate-400 font-black uppercase text-xs border-t-[3px] border-slate-950 dark:border-white pt-8">{footer_text}</p>
            </div>
        );
    }

    if (variant === 'glassmorphism') {
        return (
            <div className="p-16 rounded-[4rem] bg-indigo-500/5 backdrop-blur-3xl border border-white/20 shadow-2xl text-center space-y-12 relative overflow-hidden">
                <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-500/10 blur-[100px] -z-10" />
                <h2 className="text-4xl font-black text-white">{title || 'Get in touch'}</h2>
                <div className="flex flex-wrap justify-center gap-8">
                    {[
                        { icon: Mail, href: `mailto:${email}`, label: 'Email' },
                        { icon: Github, href: `https://github.com/${github}`, label: 'Github' },
                        { icon: Linkedin, href: `https://linkedin.com/in/${linkedin}`, label: 'LinkedIn' }
                    ].map((item, idx) => (
                        <a key={idx} href={item.href} className="w-20 h-20 flex items-center justify-center bg-white/5 border border-white/10 rounded-3xl text-white hover:bg-[#ff5a5f] hover:border-[#ff5a5f] transition-all hover:scale-110">
                            <item.icon size={24} />
                        </a>
                    ))}
                </div>
                <p className="text-slate-400 text-sm font-medium">{footer_text}</p>
            </div>
        );
    }

    if (variant === 'connected_line') {
        return (
            <div className="relative py-12 bg-[#13131f] -mx-4 px-4 overflow-hidden">
                <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-slate-800 hidden md:block" />
                <div className="relative pl-12 space-y-16">
                    <div className="absolute left-[-45px] top-6 w-2.5 h-2.5 rounded-full bg-[#ff5a5f] shadow-[0_0_10px_#ff5a5f] hidden md:block" />
                    <h2 className="text-6xl font-black text-white uppercase tracking-tight">{title || 'Get in touch'}</h2>
                    <div className="flex flex-col gap-6">
                        {[
                            { icon: Mail, href: `mailto:${email}`, label: 'Email' },
                            { icon: Github, href: `https://github.com/${github}`, label: 'Github' },
                            { icon: Linkedin, href: `https://linkedin.com/in/${linkedin}`, label: 'LinkedIn' }
                        ].map((item, idx) => (
                            <a key={idx} href={item.href} className="flex items-center gap-12 group">
                                <span className="text-slate-600 font-black uppercase tracking-[0.4em] text-xs">0{idx + 1}</span>
                                <span className="text-4xl font-black text-white uppercase tracking-tighter group-hover:text-[#ff5a5f] transition-all">{item.label}</span>
                                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:border-[#ff5a5f] group-hover:text-[#ff5a5f] transition-all group-hover:translate-x-4">
                                    <item.icon size={16} />
                                </div>
                            </a>
                        ))}
                    </div>
                    <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.5em]">{footer_text}</p>
                </div>
            </div>
        );
    }

    if (variant === 'creative_gradient') {
        return (
            <div className="p-16 rounded-[4rem] bg-gradient-to-br from-slate-900 to-indigo-950 border border-white/5 shadow-2xl text-center space-y-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter">{title || 'Get in touch'}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { icon: Mail, href: `mailto:${email}`, label: 'Email' },
                        { icon: Github, href: `https://github.com/${github}`, label: 'Github' },
                        { icon: Linkedin, href: `https://linkedin.com/in/${linkedin}`, label: 'LinkedIn' }
                    ].map((item, idx) => (
                        <a key={idx} href={item.href} className="p-10 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2.5rem] flex flex-col items-center gap-4 hover:bg-white/10 transition-all hover:-translate-y-2 group">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-2">
                                <item.icon size={28} />
                            </div>
                            <span className="text-white font-black uppercase tracking-widest text-[10px]">{item.label}</span>
                        </a>
                    ))}
                </div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{footer_text}</p>
            </div>
        );
    }

    if (variant === 'impact') {
        return (
            <div className="flex flex-col items-center text-center space-y-16 py-12">
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-1 bg-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">CONNECT</span>
                        <div className="w-12 h-1 bg-indigo-600" />
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white uppercase tracking-tighter leading-none">
                        Get In <span className="text-indigo-600">Touch</span>
                    </h2>
                </div>

                <div className="flex flex-wrap justify-center gap-6 md:gap-12">
                    {[
                        { icon: Mail, href: `mailto:${email}`, label: 'Email' },
                        { icon: Github, href: `https://github.com/${github}`, label: 'Github' },
                        { icon: Linkedin, href: `https://linkedin.com/in/${linkedin}`, label: 'LinkedIn' }
                    ].map((item, idx) => (
                        <a
                            key={idx}
                            href={item.href}
                            className="group flex flex-col items-center gap-4 p-8 min-w-[160px] transition-all hover:-translate-y-2"
                        >
                            <div className="w-20 h-20 flex items-center justify-center bg-slate-50 dark:bg-white/5 rounded-3xl group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-2xl group-hover:shadow-indigo-500/20">
                                <item.icon size={32} />
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                                {item.label}
                            </span>
                        </a>
                    ))}
                </div>

                <div className="w-full max-w-2xl border-t border-slate-100 dark:border-white/5 pt-12">
                    <p className="text-slate-400 dark:text-white/20 text-xs font-bold uppercase tracking-[0.2em]">
                        {footer_text}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-10 text-slate-950 dark:text-white uppercase italic tracking-tighter">Get In Touch</h2>
            <div className="flex justify-center gap-8 mb-12">
                <a href={`mailto:${email}`} className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all hover:-translate-y-2">
                    <Mail size={32} />
                </a>
                <a href={`https://github.com/${github}`} className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all hover:-translate-y-2">
                    <Github size={32} />
                </a>
                <a href={`https://linkedin.com/in/${linkedin}`} className="p-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white transition-all hover:-translate-y-2">
                    <Linkedin size={32} />
                </a>
            </div>
            <p className="text-slate-950 dark:text-white/40 text-sm font-medium border-t border-slate-100 dark:border-white/5 pt-10">{footer_text}</p>
        </div>
    );
};

export default ContactSection;
