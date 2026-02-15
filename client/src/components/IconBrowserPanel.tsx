import React, { useState, useMemo } from "react";
import { Search, Check, X } from "lucide-react";
import * as LucideIcons from "lucide-react";

// Known non-icon exports from lucide-react
const EXCLUDED_KEYS = new Set(["default", "createLucideIcon", "icons", "Icon"]);

// Get all icon names from lucide-react (filter out non-icon exports)
const ALL_ICON_NAMES = Object.keys(LucideIcons).filter((key) => {
    if (EXCLUDED_KEYS.has(key)) return false;
    if (key[0] !== key[0].toUpperCase()) return false;
    if (key.endsWith("Icon")) return false;
    const val = (LucideIcons as any)[key];
    // ForwardRef components have $$typeof or render, regular components are functions
    return val && (typeof val === "function" || typeof val === "object");
});

interface IconBrowserPanelProps {
    onSelect?: (iconName: string) => void;
    onClose?: () => void;
}

const IconBrowserPanel: React.FC<IconBrowserPanelProps> = ({ onSelect }) => {
    const [search, setSearch] = useState("");
    const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

    const filteredIcons = useMemo(() => {
        if (!search) return ALL_ICON_NAMES.slice(0, 120); // Show first 120 by default
        const q = search.toLowerCase();
        return ALL_ICON_NAMES.filter((name) => name.toLowerCase().includes(q)).slice(0, 120);
    }, [search]);

    const handleCopy = (iconName: string) => {
        // Convert PascalCase to kebab-case for JSON usage
        const kebabName = iconName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
        navigator.clipboard.writeText(kebabName);
        setCopiedIcon(iconName);
        onSelect?.(kebabName);
        setTimeout(() => setCopiedIcon(null), 1500);
    };

    return (
        <div className="flex flex-col h-full bg-[#0b0b0b] select-none text-white">
            {/* Header */}
            <div className="p-3 border-b border-white/[0.04] flex flex-col gap-3 bg-[#0b0b0b] shrink-0">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-white text-[10px] uppercase tracking-[0.2em]">
                        Icons
                    </h2>
                    <span className="text-[9px] font-bold text-gray-600">
                        {ALL_ICON_NAMES.length} icons
                    </span>
                </div>
                <div className="relative group">
                    <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="Search icons..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/[0.02] border border-white/[0.04] rounded-md py-1.5 pl-8 pr-8 text-[11px] text-white placeholder:text-gray-700 focus:outline-none focus:border-white focus:bg-white/[0.05] transition-all"
                    />
                    {search && (
                        <button
                            onClick={() => setSearch("")}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                        >
                            <X size={12} />
                        </button>
                    )}
                </div>
                <p className="text-[9px] text-gray-600 font-medium">
                    Click an icon to copy its name
                </p>
            </div>

            {/* Icon Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                <div className="grid grid-cols-5 gap-1">
                    {filteredIcons.map((iconName) => {
                        const IconComp = (LucideIcons as any)[iconName];
                        if (!IconComp) return null;
                        const isCopied = copiedIcon === iconName;

                        return (
                            <button
                                key={iconName}
                                onMouseDown={(e) => { e.preventDefault(); handleCopy(iconName); }}
                                className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all aspect-square group ${isCopied ? "bg-emerald-500/10 border border-emerald-500/20" : "hover:bg-white/[0.06] border border-transparent"}`}
                                title={iconName}
                            >
                                {isCopied ? (
                                    <Check size={18} className="text-emerald-400" />
                                ) : (
                                    <IconComp size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                                )}
                            </button>
                        );
                    })}
                </div>

                {filteredIcons.length === 0 && (
                    <div className="text-center py-12">
                        <Search size={20} className="text-gray-700 mx-auto mb-3" />
                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">No icons found</p>
                    </div>
                )}

                {!search && ALL_ICON_NAMES.length > 120 && (
                    <p className="text-[9px] text-gray-600 font-medium text-center mt-4">
                        Search to find more from {ALL_ICON_NAMES.length} total icons
                    </p>
                )}
            </div>

            <div className="p-3 bg-white/[0.01] border-t border-white/[0.04] text-[9px] text-center font-bold text-gray-700 uppercase tracking-widest">
                {filteredIcons.length} {search ? "results" : "shown"}
            </div>
        </div>
    );
};

export default IconBrowserPanel;
