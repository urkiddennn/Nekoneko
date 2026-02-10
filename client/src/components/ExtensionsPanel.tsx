import React from "react";
import { Search, Puzzle, Check, Info } from "lucide-react";
import { CORE_EXTENSIONS } from "../extensions/registry";

const ExtensionsPanel: React.FC = () => {
    return (
        <div className="flex flex-col h-full bg-white select-none">
            {/* Header */}
            <div className="p-3 border-b border-gray-100 flex flex-col gap-3 bg-white shrink-0">
                <h2 className="font-bold text-gray-900 text-[10px] uppercase tracking-[0.2em]">
                    Extensions
                </h2>
                <div className="relative group">
                    <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search extensions..."
                        className="w-full bg-gray-50 border border-gray-100 rounded-md py-1.5 pl-8 pr-3 text-[11px] focus:outline-none focus:border-gray-200 focus:bg-white transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pt-2 px-1">
                {/* Installed Section */}
                <div className="px-2 mb-4">
                    <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                        Installed
                    </h3>
                    <div className="space-y-1">
                        {CORE_EXTENSIONS.map((ext) => (
                            <div
                                key={ext.id}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gray-900 flex items-center justify-center text-white shrink-0">
                                    <ext.icon size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[11px] font-bold text-gray-900 truncate">{ext.name}</p>
                                        <Check size={10} className="text-emerald-500" />
                                    </div>
                                    <p className="text-[9px] text-gray-400 truncate tracking-tight">Built-in Extension</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Section */}
                <div className="px-2">
                    <h3 className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2 px-1">
                        Recommended
                    </h3>
                    <div className="space-y-1">
                        {[
                            { id: "ai", name: "AI Autocomplete", desc: "LLM-powered code helper", icon: Puzzle },
                            { id: "audit", name: "Site Auditor", desc: "SEO & performance reports", icon: Info },
                        ].map((ext) => (
                            <div
                                key={ext.id}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group opacity-60"
                            >
                                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 shrink-0 group-hover:bg-gray-100">
                                    <ext.icon size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-bold text-gray-700 truncate">{ext.name}</p>
                                    <p className="text-[9px] text-gray-400 truncate tracking-tight">{ext.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 bg-gray-50/50 border-t border-gray-100 text-[9px] text-center font-bold text-gray-400 uppercase tracking-widest">
                v1.0.0-alpha
            </div>
        </div>
    );
};

export default ExtensionsPanel;
