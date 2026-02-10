import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQProps {
    title?: string;
    description?: string;
    items?: FAQItem[];
    variant?: 'accordion' | 'grid' | 'minimal_cards' | 'brutalist' | 'glassmorphism' | 'connected_line' | 'impact' | 'creative_gradient';
}

const FAQ: React.FC<FAQProps> = ({
    title = "Frequently Asked Questions",
    description,
    items = [],
    variant = 'accordion',
}) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const renderAccordion = () => (
        <div className="space-y-4 max-w-3xl mx-auto">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                const isBrutalist = variant === 'brutalist';
                const isGlass = variant === 'glassmorphism';

                return (
                    <div
                        key={index}
                        className={`
                            overflow-hidden transition-all duration-300
                            ${isBrutalist
                                ? 'border-[3px] border-slate-950 bg-white shadow-[4px_4px_0px_0px_rgba(2,6,23,1)]'
                                : isGlass
                                    ? 'bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl'
                                    : 'bg-slate-50 border border-slate-100 rounded-2xl'
                            }
                        `}
                    >
                        <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full text-left px-6 py-5 flex items-center justify-between group"
                        >
                            <span className={`font-bold transition-colors ${isOpen ? 'text-indigo-600' : 'text-slate-950'} ${isGlass && 'text-white'}`}>
                                {item.question}
                            </span>
                            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                {isOpen ? <ChevronUp size={20} className="text-indigo-600" /> : <ChevronDown size={20} className="text-slate-400 group-hover:text-slate-950" />}
                            </div>
                        </button>
                        <div
                            className={`
                                transition-all duration-300 ease-in-out
                                ${isOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0 py-0'}
                                px-6 border-t border-slate-100/50
                            `}
                        >
                            <p className={`text-slate-600 leading-relaxed font-medium ${isGlass && 'text-slate-300'}`}>
                                {item.answer}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, index) => {
                const isBrutalist = variant === 'brutalist';
                const isGlass = variant === 'glassmorphism';
                const isMinimal = variant === 'minimal_cards';

                return (
                    <div
                        key={index}
                        className={`
                            p-8 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4
                            ${isBrutalist
                                ? 'border-[3px] border-slate-950 bg-white shadow-[6px_6px_0px_0px_rgba(2,6,23,1)] rounded-none'
                                : isGlass
                                    ? 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] hover:bg-white/10'
                                    : isMinimal
                                        ? 'bg-white border border-slate-200 rounded-xl hover:border-slate-400 shadow-sm'
                                        : 'bg-slate-50 border border-slate-100 rounded-[2rem]'
                            }
                            transition-all duration-300
                        `}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className={`p-3 rounded-xl w-fit ${isGlass ? 'bg-white/10' : 'bg-indigo-50 text-indigo-600'}`}>
                            <HelpCircle size={24} />
                        </div>
                        <h3 className={`text-lg font-black tracking-tight ${isGlass ? 'text-white' : 'text-slate-900 uppercase italic'}`}>
                            {item.question}
                        </h3>
                        <p className={`text-sm leading-relaxed font-medium ${isGlass ? 'text-slate-400' : 'text-slate-600'}`}>
                            {item.answer}
                        </p>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="w-full">
            {(title || description) && (
                <div className="text-center mb-16 space-y-4">
                    {title && (
                        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase text-slate-950 dark:text-white">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-slate-500 font-medium max-w-2xl mx-auto dark:text-slate-400">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {variant === 'impact' ? (
                <div className="space-y-1 bg-[#13131f] -mx-4 px-4 border border-white/5">
                    {items.map((item, index) => (
                        <div key={index} className="group border-b border-white/5 last:border-0">
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full text-left py-12 flex flex-col md:flex-row md:items-center justify-between gap-8 group"
                            >
                                <span className="text-[#ff5a5f] text-xs font-black uppercase tracking-[0.5em]">0{index + 1}</span>
                                <span className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter group-hover:text-[#ff5a5f] transition-colors flex-1">
                                    {item.question}
                                </span>
                                <div className={`w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white transition-all ${openIndex === index ? 'bg-[#ff5a5f] border-[#ff5a5f] rotate-180' : 'group-hover:border-[#ff5a5f]'}`}>
                                    <ChevronDown size={24} />
                                </div>
                            </button>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96 pb-12' : 'max-h-0'}`}>
                                <div className="md:ml-[15%] max-w-2xl">
                                    <p className="text-xl text-slate-400 font-medium leading-relaxed">{item.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : variant === 'creative_gradient' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-indigo-500/5 to-purple-500/5 blur-[120px] -z-10" />
                    {items.map((item, index) => (
                        <div key={index} className="p-10 bg-white dark:bg-white/5 backdrop-blur-md border border-slate-100 dark:border-white/10 rounded-[3rem] shadow-xl hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-4">
                                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-[10px]">{index + 1}</span>
                                {item.question}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{item.answer}</p>
                        </div>
                    ))}
                </div>
            ) : variant === 'connected_line' ? (
                <div className="relative py-12 bg-[#13131f] -mx-4 px-4 overflow-hidden">
                    <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-slate-800 hidden md:block" />
                    <div className="max-w-4xl mx-auto space-y-12">
                        {items.map((item, index) => (
                            <div key={index} className="relative pl-12 group">
                                <div className="absolute left-[-45px] top-4 w-2.5 h-2.5 rounded-full bg-[#ff5a5f] shadow-[0_0_10px_#ff5a5f] hidden md:block" />
                                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-[#ff5a5f] transition-colors">{item.question}</h3>
                                <p className="text-slate-400 font-medium leading-relaxed max-w-2xl">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                variant === 'grid' || variant === 'minimal_cards' ? renderGrid() : renderAccordion()
            )}
        </div>
    );
};

export default FAQ;
