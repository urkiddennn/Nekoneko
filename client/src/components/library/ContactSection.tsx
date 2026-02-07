import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

interface ContactSectionProps {
    email: string;
    github: string;
    linkedin: string;
    footer_text: string;
    variant?: 'default' | 'impact';
}

const ContactSection: React.FC<ContactSectionProps> = ({ email, github, linkedin, footer_text, variant = 'default' }) => {
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
