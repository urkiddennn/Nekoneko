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
    variant?: 'accordion' | 'grid' | 'minimal_cards' | 'brutalist' | 'glassmorphism';
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

            {variant === 'grid' || variant === 'minimal_cards' ? renderGrid() : renderAccordion()}
        </div>
    );
};

export default FAQ;
