import React, { useState, useEffect } from "react";
import { Search, Puzzle, Check, Info, ToggleLeft, ToggleRight } from "lucide-react";
import { CORE_EXTENSIONS, OPTIONAL_EXTENSIONS } from "../extensions/registry";

interface ExtensionsPanelProps {
    onExtensionToggle?: (enabledIds: string[]) => void;
}

const STORAGE_KEY = "nekoneko_enabled_extensions";

function getStoredEnabled(): string[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

const ExtensionsPanel: React.FC<ExtensionsPanelProps> = ({ onExtensionToggle }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [enabledIds, setEnabledIds] = useState<string[]>(getStoredEnabled);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(enabledIds));
        window.dispatchEvent(new Event("extensions-changed"));
        onExtensionToggle?.(enabledIds);
    }, [enabledIds, onExtensionToggle]);

    const toggleExtension = (id: string) => {
        setEnabledIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const filteredCore = CORE_EXTENSIONS.filter((ext) =>
        ext.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const filteredOptional = OPTIONAL_EXTENSIONS.filter((ext) =>
        ext.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full bg-[#0b0b0b] select-none text-white">
            {/* Header */}
            <div className="p-3 border-b border-white/[0.04] flex flex-col gap-3 bg-[#0b0b0b] shrink-0">
                <h2 className="font-bold text-white text-[10px] uppercase tracking-[0.2em]">
                    Extensions
                </h2>
                <div className="relative group">
                    <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="Search extensions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/[0.04] rounded-md py-1.5 pl-8 pr-3 text-[11px] text-white placeholder:text-gray-700 focus:outline-none focus:border-white focus:bg-white/[0.05] transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar pt-2 px-1">
                {/* Installed / Core */}
                <div className="px-2 mb-4">
                    <h3 className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">
                        Core
                    </h3>
                    <div className="space-y-1">
                        {filteredCore.map((ext) => (
                            <div
                                key={ext.id}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer group"
                            >
                                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black shrink-0">
                                    <ext.icon size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-[11px] font-bold text-white truncate">{ext.name}</p>
                                        <Check size={10} className="text-emerald-500" />
                                    </div>
                                    <p className="text-[9px] text-gray-600 truncate tracking-tight">Built-in</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Optional / Toggleable */}
                <div className="px-2 mb-4">
                    <h3 className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">
                        Optional
                    </h3>
                    <div className="space-y-1">
                        {filteredOptional.map((ext) => {
                            const isEnabled = enabledIds.includes(ext.id);
                            return (
                                <div
                                    key={ext.id}
                                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.04] transition-colors cursor-pointer group"
                                    onMouseDown={(e) => { e.preventDefault(); toggleExtension(ext.id); }}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${isEnabled ? "bg-white text-black" : "bg-white/[0.04] text-gray-600 group-hover:bg-white/[0.08]"}`}>
                                        <ext.icon size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <p className={`text-[11px] font-bold truncate ${isEnabled ? "text-white" : "text-gray-400"}`}>{ext.name}</p>
                                            {isEnabled ? (
                                                <ToggleRight size={18} className="text-emerald-500 shrink-0" />
                                            ) : (
                                                <ToggleLeft size={18} className="text-gray-600 shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-[9px] text-gray-600 truncate tracking-tight">{ext.description || "Optional Extension"}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Recommended / Coming Soon */}
                <div className="px-2">
                    <h3 className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-2 px-1">
                        Coming Soon
                    </h3>
                    <div className="space-y-1">
                        {[
                            { id: "ai", name: "AI Autocomplete", desc: "LLM-powered code helper", icon: Puzzle },
                            { id: "audit", name: "Site Auditor", desc: "SEO & performance reports", icon: Info },
                        ].map((ext) => (
                            <div
                                key={ext.id}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.02] transition-colors cursor-pointer group opacity-60"
                            >
                                <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-gray-600 shrink-0 group-hover:bg-white/[0.08]">
                                    <ext.icon size={16} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[11px] font-bold text-gray-300 truncate">{ext.name}</p>
                                    <p className="text-[9px] text-gray-600 truncate tracking-tight">{ext.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 bg-white/[0.01] border-t border-white/[0.04] text-[9px] text-center font-bold text-gray-700 uppercase tracking-widest">
                v1.0.0-alpha
            </div>
        </div>
    );
};

export default ExtensionsPanel;
