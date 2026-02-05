import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

interface ContactSectionProps {
    email: string;
    github: string;
    linkedin: string;
    footer_text: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({ email, github, linkedin, footer_text }) => {
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
