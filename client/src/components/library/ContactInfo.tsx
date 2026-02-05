import React from 'react';
import * as Icons from 'lucide-react';

interface Link {
    label: string;
    url: string;
    icon: string;
}

interface ContactInfoProps {
    title?: string;
    description?: string;
    links: Link[];
    alignment?: 'left' | 'center' | 'right';
    variant?: 'default' | 'card';
}

const ContactInfo: React.FC<ContactInfoProps> = ({
    title = "Get in touch",
    description,
    links = [],
    alignment = 'center',
    variant = 'default'
}) => {
    if (variant === 'card') {
        return (
            <div className="bg-[#ff4d4d] dark:bg-red-600 p-8 rounded-2xl relative overflow-hidden group">
                {/* Decorative triangle cutout */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-white dark:bg-slate-950 translate-x-8 -translate-y-8 rotate-45"></div>

                <div className="relative z-10">
                    <h3 className="text-[10px] font-black tracking-[0.4em] mb-12 opacity-80 text-white leading-none">{title}</h3>

                    <div className="space-y-6">
                        {links.map((link, idx) => {
                            const IconComponent = (Icons as any)[link.icon || ''] || null;
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
                                    <Icons.ArrowUpRight size={20} className="text-white group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
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
                    const IconComponent = (Icons as any)[link.icon || ''] || null;
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
