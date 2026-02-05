import React from 'react';
import { User, Check } from 'lucide-react';

interface ProgressStep {
    label: string;
}

interface StepProgressProps {
    steps?: ProgressStep[];
    currentStep?: number;
    title?: string;
    subTitle?: string;
    ctaText?: string;
    avatarUrls?: string[];
}

const StepProgress: React.FC<StepProgressProps> = ({
    steps = [
        { label: "1" }, { label: "2" }, { label: "3" }, { label: "4" }, { label: "5" }
    ],
    currentStep = 2,
    title = "Explore Features",
    subTitle = "Join Now",
    ctaText = "Let's Start",
    avatarUrls = [
        "https://api.dicebear.com/7.x/avataaars/svg?seed=1",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=2",
        "https://api.dicebear.com/7.x/avataaars/svg?seed=3"
    ]
}) => {
    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white dark:bg-slate-900 border-[3px] border-slate-950 dark:border-white rounded-[2.5rem] p-10 shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                {/* Stepper Header */}
                <div className="flex items-center justify-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                    {steps.map((step, idx) => {
                        const stepNum = idx + 1;
                        const isDone = stepNum < currentStep;
                        const isCurrent = stepNum === currentStep;

                        return (
                            <React.Fragment key={idx}>
                                <div className={`flex-shrink-0 w-10 h-10 rounded-full border-[3px] flex items-center justify-center text-sm font-black transition-all ${isCurrent ? 'bg-white border-slate-950 scale-110 shadow-lg' :
                                        isDone ? 'bg-emerald-500 border-slate-950 text-white' :
                                            'bg-white border-slate-200 text-slate-300'
                                    }`}>
                                    {isDone ? <Check className="w-4 h-4 stroke-[4px]" /> : step.label}
                                </div>
                                {idx < steps.length - 1 && (
                                    <div className={`h-[3px] flex-1 min-w-[32px] rounded-full mx-1 ${stepNum < currentStep ? 'bg-emerald-500' : 'bg-slate-100 dark:bg-slate-800'}`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>

                {/* Info Block */}
                <div className="flex flex-col md:flex-row items-center justify-between bg-emerald-50/30 dark:bg-slate-950 border-[3px] border-slate-950 dark:border-white rounded-3xl p-6 shadow-inner gap-6 overflow-hidden">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full border-[3px] border-slate-950 dark:border-white flex items-center justify-center bg-white dark:bg-slate-800 shadow-sm">
                            <User className="w-5 h-5 text-slate-950 dark:text-white" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">{title}</div>
                            <div className="text-xl font-black text-slate-950 dark:text-white">{subTitle}</div>
                        </div>
                    </div>
                    <button className="whitespace-nowrap bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:-translate-y-0.5 active:scale-95 transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]">
                        {ctaText}
                    </button>
                </div>
            </div>

            {/* Bottom Floating Bar Example */}
            <div className="bg-orange-50 dark:bg-slate-800 border-[3px] border-slate-950 dark:border-white rounded-2xl p-4 flex items-center justify-between shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                <div className="flex -space-x-3 pl-2">
                    {avatarUrls.map((url, i) => (
                        <img key={i} src={url} className="w-10 h-10 rounded-full border-[3px] border-slate-950 dark:border-white bg-white" />
                    ))}
                </div>
                <div className="text-sm font-black text-slate-950 dark:text-white pr-4 cursor-pointer hover:underline uppercase tracking-tight">The top champions &gt;</div>
            </div>
        </div>
    );
};

export default StepProgress;
