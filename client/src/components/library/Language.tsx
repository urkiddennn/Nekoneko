import React from 'react';
import { MessageCircle } from 'lucide-react';

interface LanguageItem {
    name: string;
    code: string;
    level?: number;
}

interface LanguageProps {
    title: string;
    languages: LanguageItem[];
    variant?: 'default' | 'pixel';
}

const Language: React.FC<LanguageProps> = ({ title, languages, variant = 'default' }) => {
    const pixelFont = "'Press Start 2P', monospace";

    if (variant === 'pixel') {
        return (
            <div className="relative bg-[#0a0a2e] border-[3px] border-[#00ff41] p-6 md:p-8 overflow-hidden"
                style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.15)' }}>
                {/* Corner markers */}
                <span className="absolute top-2 left-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
                <span className="absolute top-2 right-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>

                {/* Section header */}
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 border-2 border-[#00ff41] bg-[#00ff41]/20 flex items-center justify-center">
                        <MessageCircle size={14} className="text-[#00ff41]" />
                    </div>
                    <h2 className="text-xs md:text-sm text-[#00ff41] uppercase tracking-wider" style={{ fontFamily: pixelFont }}>
                        {title}
                    </h2>
                </div>

                {/* Languages */}
                <div className="space-y-0">
                    {languages.map((lang, index) => (
                        <div key={index} className="relative">
                            {/* Dashed connector */}
                            {index > 0 && (
                                <div className="w-px h-3 border-l-2 border-dashed border-[#00ff41]/30 ml-[15px]" />
                            )}
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-[10px] md:text-xs text-[#00ff41] uppercase tracking-wider" style={{ fontFamily: pixelFont }}>
                                    {lang.name}
                                </span>
                                {/* Code badge */}
                                <div className="w-8 h-8 border-2 border-[#00ff41] bg-[#1a1a4e] flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_#00ff41]">
                                    <span className="text-[7px] text-[#00ff41] font-bold" style={{ fontFamily: pixelFont }}>
                                        {lang.code}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Scanline */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.3) 2px, rgba(0,255,65,0.3) 4px)' }}
                />
            </div>
        );
    }

    // Default variant
    return (
        <section className="py-12">
            <h2 className="text-2xl font-bold text-slate-950 dark:text-white uppercase italic tracking-tighter mb-8">{title}</h2>
            <div className="space-y-4">
                {languages.map((lang, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg">
                        <div className="flex items-center gap-3">
                            <MessageCircle size={16} className="text-slate-400" />
                            <span className="text-lg font-bold text-slate-950 dark:text-white uppercase tracking-wider">{lang.name}</span>
                        </div>
                        <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 rounded">
                            {lang.code}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Language;
