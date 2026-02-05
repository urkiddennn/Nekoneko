import React from 'react';
import { Check } from 'lucide-react';

interface SelectionItem {
    id: string;
    label: string;
    icon?: string;
    description?: string;
}

interface SelectionListProps {
    title?: string;
    items: SelectionItem[];
    selectedId?: string;
}

const SelectionList: React.FC<SelectionListProps> = ({ title, items = [], selectedId }) => {
    return (
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border-[3px] border-slate-950 dark:border-white rounded-[2.5rem] p-8 shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
            {title && (
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-black uppercase text-slate-950 dark:text-white tracking-tight">{title}</h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:opacity-80">Reset</button>
                </div>
            )}
            <div className="space-y-3">
                {items.map((item) => {
                    const isSelected = item.id === selectedId;
                    return (
                        <div
                            key={item.id}
                            className={`group cursor-pointer border-[3px] rounded-2xl p-4 flex items-center justify-between gap-4 transition-all active:scale-[0.98] ${isSelected
                                    ? 'bg-indigo-50 dark:bg-slate-800 border-slate-950 dark:border-white shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
                                    : 'bg-transparent border-slate-100 dark:border-slate-800 hover:border-slate-300'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-950 flex items-center justify-center text-xl shadow-inner border-2 border-slate-100">
                                    {item.icon || "🎓"}
                                </div>
                                <div>
                                    <div className="text-sm font-black text-slate-950 dark:text-white">{item.label}</div>
                                    {item.description && <div className="text-[10px] font-bold text-slate-400">{item.description}</div>}
                                </div>
                            </div>
                            <div className={`w-7 h-7 rounded-full border-[3px] flex items-center justify-center transition-colors ${isSelected
                                    ? 'bg-emerald-500 border-slate-950 dark:border-white text-white'
                                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800'
                                }`}>
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[4px]" />}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SelectionList;
