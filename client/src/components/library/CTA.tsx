import React from 'react';

interface CTAProps {
    title: string;
    buttonText: string;
}

const CTA: React.FC<CTAProps> = ({ title, buttonText }) => {
    return (
        <div className="flex flex-col items-center text-center space-y-8">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic max-w-2xl leading-none text-slate-950 dark:text-white">{title}</h2>
            <button className="px-12 py-5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-[24px] font-black uppercase tracking-[0.2em] text-sm shadow-2xl hover:bg-indigo-500 dark:hover:bg-indigo-400 transition-all active:scale-95 border-b-8 border-indigo-800 dark:border-indigo-700 active:border-b-0 active:translate-y-2">
                {buttonText}
            </button>
        </div>
    );
};

export default CTA;
