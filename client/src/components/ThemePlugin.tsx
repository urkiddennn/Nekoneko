import React from "react";
import { useSite } from "../context/SiteContext";
import { Check, Palette, Shield, Globe, Layout, Sparkles, Monitor, X } from "lucide-react";
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { githubLight } from '@uiw/codemirror-theme-github';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';

const PRESETS = [
    {
        name: "Professional",
        theme: { primary: "#6366f1", font: "Inter", darkMode: true },
        icon: Shield,
    },
    {
        name: "Neon Nights",
        theme: { primary: "#f472b6", font: "Outfit", darkMode: true },
        icon: Sparkles,
    },
    {
        name: "Minimalist",
        theme: { primary: "#000000", font: "Space Grotesk", darkMode: false },
        icon: Layout,
    },
    {
        name: "Forest",
        theme: { primary: "#10b981", font: "Inter", darkMode: true },
        icon: Globe,
    },
];

const COLORS = [
    "#6366f1", // Indigo
    "#ec4899", // Pink
    "#10b981", // Emerald
    "#f59e0b", // Amber
    "#3b82f6", // Blue
    "#ef4444", // Red
    "#8b5cf6", // Violet
    "#000000", // Black
];

const FONTS = ["Inter", "Outfit", "Space Grotesk", "Roboto", "Lexend"];

interface ThemePluginProps {
    activeThemeId: string;
    handleThemeChange: (themeId: string, theme: any) => void;
    setShowPlugins: (show: boolean) => void;
}

const ThemePlugin: React.FC<ThemePluginProps> = ({ activeThemeId, handleThemeChange, setShowPlugins }) => {
    const { siteConfig, setSiteConfig, updateSiteSettings } = useSite();
    const theme = siteConfig.site_settings.theme || { primary: "#6366f1", font: "Inter", darkMode: true };

    const handleApplyPreset = (preset: typeof PRESETS[0]) => {
        setSiteConfig((prev) => ({
            ...prev,
            site_settings: {
                ...prev.site_settings,
                theme: { ...preset.theme }
            }
        }));
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
                <h2 className="font-bold text-gray-900 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">Appearance</h2>
                <button
                    type="button"
                    onClick={() => setShowPlugins(false)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-colors cursor-pointer"
                >
                    <X size={16} />
                </button>
            </div>

            {/* All Settings - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar pb-20">
                {/* Theme Presets */}
                <section className="space-y-5">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Sparkles size={12} /> Theme Presets
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {PRESETS.map((preset) => {
                            const Icon = preset.icon;
                            const isActive = theme.primary === preset.theme.primary && theme.font === preset.theme.font;
                            return (
                                <button
                                    key={preset.name}
                                    type="button"
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleApplyPreset(preset);
                                    }}
                                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all group cursor-pointer select-none ${isActive
                                        ? "border-slate-900 bg-slate-50 shadow-sm"
                                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/30"
                                        }`}
                                >
                                    <div
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-white shadow-inner"
                                        style={{ backgroundColor: preset.theme.primary }}
                                    >
                                        <Icon size={20} />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">{preset.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Accent Color */}
                <section className="space-y-4 pt-4 border-t border-slate-50">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Palette size={12} /> accent color
                    </h3>
                    <div className="grid grid-cols-5 gap-2.5">
                        {COLORS.map((color) => (
                            <button
                                key={color}
                                type="button"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    updateSiteSettings("theme.primary", color);
                                }}
                                className={`aspect-square rounded-full border-2 transition-all flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 select-none ${theme.primary === color ? "border-slate-900 scale-110 shadow-md" : "border-slate-100"
                                    }`}
                                style={{ backgroundColor: color }}
                            >
                                {theme.primary === color && <Check size={14} className="text-white drop-shadow-sm" />}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Editor Appearance */}
                <section className="space-y-4 pt-4 border-t border-slate-50">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Monitor size={12} /> editor appearance
                    </h3>
                    <div className="space-y-1.5">
                        {[
                            { name: 'VS Code Dark', id: 'vscodeDark', theme: vscodeDark },
                            { name: 'GitHub Light', id: 'githubLight', theme: githubLight },
                            { name: 'Dracula', id: 'dracula', theme: dracula },
                            { name: 'Tokyo Night', id: 'tokyoNight', theme: tokyoNight },
                        ].map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleThemeChange(t.id, t.theme);
                                }}
                                className={`w-full flex items-center justify-between p-3 text-left text-xs font-bold rounded-xl transition-all cursor-pointer select-none ${activeThemeId === t.id
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 border border-transparent hover:border-slate-100'
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    <div className={`w-1.5 h-1.5 rounded-full ${activeThemeId === t.id ? 'bg-white' : 'bg-slate-300'}`} />
                                    {t.name}
                                </span>
                                {activeThemeId === t.id && <Check size={12} />}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Typography */}
                <section className="space-y-5 pt-4 border-t border-slate-50">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Typography</h3>
                    <div className="space-y-2.5">
                        {FONTS.map((font) => (
                            <button
                                key={font}
                                type="button"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    updateSiteSettings("theme.font", font);
                                }}
                                className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all cursor-pointer select-none ${theme.font === font ? "border-slate-900 bg-slate-50 shadow-sm" : "border-slate-100 hover:border-slate-300 hover:bg-slate-50/20"
                                    }`}
                            >
                                <span className="text-base font-bold" style={{ fontFamily: font }}>{font}</span>
                                {theme.font === font && <Check size={16} className="text-slate-900" />}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Site Identity */}
                <section className="space-y-6 pt-4 border-t border-slate-50">
                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Site Identity</h3>
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Brand Name</label>
                            <input
                                type="text"
                                value={siteConfig.site_settings.name}
                                onChange={(e) => updateSiteSettings("name", e.target.value)}
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-slate-900 font-bold transition-colors"
                                placeholder="Enter site name..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Favicon URL</label>
                            <input
                                type="text"
                                value={siteConfig.site_settings.favicon}
                                onChange={(e) => updateSiteSettings("favicon", e.target.value)}
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl py-3 px-4 text-[11px] focus:outline-none focus:border-slate-900 font-mono transition-colors"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ThemePlugin;
