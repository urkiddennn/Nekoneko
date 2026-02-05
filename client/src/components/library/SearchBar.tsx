import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchResult {
    title: string;
    description: string;
    stats?: {
        answers?: number;
        rating?: number;
        likes?: number;
    };
}

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    category?: string;
    results?: SearchResult[];
}

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Search...",
    value = "",
    category = "General",
    results = []
}) => {
    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Main Search Input Container */}
            <div className="relative group bg-white dark:bg-slate-900 border-[3px] border-slate-950 dark:border-white rounded-full p-2 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all focus-within:-translate-y-1 focus-within:shadow-[6px_6px_0px_0px_rgba(2,6,23,1)]">
                <div className="flex items-center gap-2 pl-4">
                    <X className="w-4 h-4 text-slate-400 cursor-pointer hover:text-slate-950" />
                    <span className="text-sm font-black text-slate-950 dark:text-white uppercase">{category}</span>
                </div>
                <input
                    type="text"
                    defaultValue={value}
                    placeholder={placeholder}
                    className="flex-1 bg-transparent border-none outline-none font-bold text-slate-950 dark:text-white placeholder:text-slate-400 px-2 min-w-0"
                />
                <div className="pr-4">
                    <Search className="w-5 h-5 text-slate-950 dark:text-white" />
                </div>
            </div>

            {/* Results Area */}
            {results.length > 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4 mb-4">Search Result :</h3>
                    {results.map((res, idx) => (
                        <div
                            key={idx}
                            className="bg-orange-50 dark:bg-slate-800 border-[3px] border-slate-950 dark:border-white rounded-[2rem] p-8 space-y-4 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 transition-all"
                        >
                            <p className="text-lg font-bold text-slate-950 dark:text-white leading-relaxed">
                                {res.title}
                            </p>
                            {res.stats && (
                                <div className="flex items-center gap-6 pt-4 border-t border-slate-950/10 dark:border-white/10 mt-4">
                                    <div className="flex items-center gap-2 text-xs font-black uppercase text-emerald-600">
                                        <div className="w-5 h-5 bg-emerald-100 rounded flex items-center justify-center">
                                            <span className="scale-75">💬</span>
                                        </div>
                                        {res.stats.answers} Answers
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-black uppercase text-yellow-600">
                                        ⭐ {res.stats.rating}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-black uppercase text-rose-600">
                                        ❤️ {res.stats.likes}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
