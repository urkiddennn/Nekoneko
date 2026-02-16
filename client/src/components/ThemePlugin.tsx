import React from "react";
import { useSite } from "../context/useSite";
import {
  Check,
  Palette,
  Shield,
  Globe,
  Layout,
  Sparkles,
  Monitor,
  X,
} from "lucide-react";

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

const FONTS = [
  "Inter",
  "Outfit",
  "Space Grotesk",
  "Roboto",
  "Lexend",
  "Lato",
  "Poppins",
  "Montserrat",
  "Playfair Display",
  "Merriweather",
  "Press Start 2P",
  "Pixelify Sans",
  "Geist",
  "Doto",
];

interface ThemePluginProps {
  activeThemeId: string;
  handleThemeChange: (themeId: string, theme: any) => void;
  setShowPlugins: (show: boolean) => void;
}

const SpacingInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | undefined;
  onChange: (val: string) => void;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-[9px] font-black text-gray-500 uppercase tracking-wider text-center">
      {label}
    </label>
    <input
      type="text"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white/[0.02] border border-white/[0.04] rounded-lg py-1.5 text-center text-xs font-bold text-white focus:outline-none focus:border-white transition-colors"
      placeholder="-"
    />
  </div>
);

const ThemePlugin: React.FC<ThemePluginProps> = ({
  activeThemeId,
  handleThemeChange,
  setShowPlugins,
}) => {
  const { siteConfig, setSiteConfig, updateSiteSettings } = useSite();
  const theme = siteConfig.site_settings.theme || {
    primary: "#6366f1",
    font: "Inter",
    darkMode: true,
  };
  const layout = siteConfig.site_settings.layout || {};

  const handleApplyPreset = (preset: (typeof PRESETS)[0]) => {
    setSiteConfig((prev) => ({
      ...prev,
      site_settings: {
        ...prev.site_settings,
        theme: { ...preset.theme },
      },
    }));
  };

  const handleThemeClick = async (id: string) => {
    let themeObj;
    switch (id) {
      case "vscodeDark":
        themeObj = (await import("@uiw/codemirror-theme-vscode")).vscodeDark;
        break;
      case "githubLight":
        themeObj = (await import("@uiw/codemirror-theme-github")).githubLight;
        break;
      case "dracula":
        themeObj = (await import("@uiw/codemirror-theme-dracula")).dracula;
        break;
      case "tokyoNight":
        themeObj = (await import("@uiw/codemirror-theme-tokyo-night"))
          .tokyoNight;
        break;
    }
    if (themeObj) {
      handleThemeChange(id, themeObj);
    }
  };

  const THEMES = [
    { name: "VS Code Dark", id: "vscodeDark" },
    { name: "GitHub Light", id: "githubLight" },
    { name: "Dracula", id: "dracula" },
    { name: "Tokyo Night", id: "tokyoNight" },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0b0b0b]">
      {/* Header */}
      <div className="p-3 border-b border-white/[0.04] flex justify-between items-center bg-[#0b0b0b] shrink-0">
        <h2 className="font-bold text-white flex items-center gap-2 text-[10px] uppercase tracking-[0.2em]">
          Appearance
        </h2>
        <button
          type="button"
          onClick={() => setShowPlugins(false)}
          className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/[0.04] text-gray-500 hover:text-white transition-colors cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* All Settings - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-20">
        {/* Theme Presets */}
        <section className="space-y-3">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Sparkles size={10} /> Presets
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((preset) => {
              const Icon = preset.icon;
              const isActive =
                theme.primary === preset.theme.primary &&
                theme.font === preset.theme.font;
              return (
                <button
                  key={preset.name}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleApplyPreset(preset);
                  }}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all group cursor-pointer select-none ${isActive
                    ? "border-white bg-white/[0.04] shadow-xl"
                    : "border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.02]"
                    }`}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-inner"
                    style={{ backgroundColor: preset.theme.primary }}
                  >
                    <Icon size={16} />
                  </div>
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                    {preset.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Theme Options */}
        <section className="space-y-3 pt-3 border-t border-white/[0.04]">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Sparkles size={10} /> Mode
          </h3>
          <div className="space-y-2">
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                updateSiteSettings("theme.darkMode", !theme.darkMode);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer select-none ${theme.darkMode ? "border-white bg-white/[0.04]" : "border-white/[0.04] hover:border-white/[0.1]"}`}
            >
              <span className="text-[11px] font-bold text-gray-300">
                Dark Mode
              </span>
              <div
                className={`w-8 h-4 rounded-full transition-colors relative ${theme.darkMode ? "bg-white" : "bg-white/[0.08]"}`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 rounded-full ${theme.darkMode ? "bg-black" : "bg-gray-500"} transition-all ${theme.darkMode ? "left-4.5" : "left-0.5"}`}
                />
              </div>
            </button>

            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                updateSiteSettings(
                  "theme.showThemeToggle",
                  !theme.showThemeToggle,
                );
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer select-none ${theme.showThemeToggle ? "border-white bg-white/[0.04]" : "border-white/[0.04] hover:border-white/[0.1]"}`}
            >
              <span className="text-[11px] font-bold text-gray-300">
                Floating Toggle
              </span>
              <div
                className={`w-8 h-4 rounded-full transition-colors relative ${theme.showThemeToggle ? "bg-white" : "bg-white/[0.08]"}`}
              >
                <div
                  className={`absolute top-0.5 w-3 h-3 rounded-full ${theme.showThemeToggle ? "bg-black" : "bg-gray-500"} transition-all ${theme.showThemeToggle ? "left-4.5" : "left-0.5"}`}
                />
              </div>
            </button>
          </div>
        </section>

        {/* Accent Color */}
        <section className="space-y-3 pt-3 border-t border-white/[0.04]">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Palette size={10} /> Accent
          </h3>
          <div className="grid grid-cols-6 gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  updateSiteSettings("theme.primary", color);
                }}
                className={`aspect-square rounded-full border transition-all flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 select-none ${theme.primary === color
                  ? "border-white scale-110 shadow-xl"
                  : "border-white/[0.04]"
                  }`}
                style={{ backgroundColor: color }}
              >
                {theme.primary === color && (
                  <Check size={12} className="text-white drop-shadow-sm" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Editor Appearance */}
        <section className="space-y-3 pt-3 border-t border-white/[0.04]">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Monitor size={10} /> Editor
          </h3>
          <div className="space-y-1">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleThemeClick(t.id);
                }}
                className={`w-full flex items-center justify-between p-2 text-left text-[11px] font-bold rounded-lg transition-all cursor-pointer select-none ${activeThemeId === t.id
                  ? "bg-white text-black shadow-xl"
                  : "text-gray-400 hover:bg-white/[0.04] hover:text-white border border-transparent hover:border-white/[0.08]"
                  }`}
              >
                <span className="flex items-center gap-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${activeThemeId === t.id ? "bg-black" : "bg-white/[0.08]"}`}
                  />
                  {t.name}
                </span>
                {activeThemeId === t.id && <Check size={10} />}
              </button>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-3 pt-3 border-t border-white/[0.04]">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
            Font
          </h3>
          <div className="space-y-2">
            <div className="relative">
              <select
                value={theme.font}
                onChange={(e) =>
                  updateSiteSettings("theme.font", e.target.value)
                }
                className="w-full appearance-none bg-white/[0.04] border border-white/[0.08] rounded-xl py-2.5 px-3 text-sm font-bold text-white focus:outline-none focus:border-white transition-colors cursor-pointer"
                style={{ fontFamily: theme.font }}
              >
                {FONTS.map((font) => (
                  <option
                    key={font}
                    value={font}
                    style={{ fontFamily: font }}
                    className="bg-[#0b0b0b] text-white"
                  >
                    {font}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                <Check size={14} className="opacity-0" /> {/* Spacer */}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Layout Settings - Granular */}
        <section className="space-y-4 pt-3 border-t border-white/[0.04]">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
            <Layout size={10} /> Global Layout
          </h3>

          {/* Padding Controls */}
          <div className="space-y-2">
            <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest pl-1">
              Padding
            </div>
            <div className="grid grid-cols-4 gap-2">
              <SpacingInput
                label="Top"
                value={layout.paddingTop}
                onChange={(v) => updateSiteSettings("layout.paddingTop", v)}
              />
              <SpacingInput
                label="Right"
                value={layout.paddingRight}
                onChange={(v) => updateSiteSettings("layout.paddingRight", v)}
              />
              <SpacingInput
                label="Bot"
                value={layout.paddingBottom}
                onChange={(v) => updateSiteSettings("layout.paddingBottom", v)}
              />
              <SpacingInput
                label="Left"
                value={layout.paddingLeft}
                onChange={(v) => updateSiteSettings("layout.paddingLeft", v)}
              />
            </div>
          </div>

          {/* Margin Controls */}
          <div className="space-y-2">
            <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest pl-1">
              Margin
            </div>
            <div className="grid grid-cols-4 gap-2">
              <SpacingInput
                label="Top"
                value={layout.marginTop}
                onChange={(v) => updateSiteSettings("layout.marginTop", v)}
              />
              <SpacingInput
                label="Right"
                value={layout.marginRight}
                onChange={(v) => updateSiteSettings("layout.marginRight", v)}
              />
              <SpacingInput
                label="Bot"
                value={layout.marginBottom}
                onChange={(v) => updateSiteSettings("layout.marginBottom", v)}
              />
              <SpacingInput
                label="Left"
                value={layout.marginLeft}
                onChange={(v) => updateSiteSettings("layout.marginLeft", v)}
              />
            </div>
          </div>
        </section>

        {/* Site Identity */}
        <section className="space-y-3 pt-3 border-t border-white/[0.04]">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
            Data
          </h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] px-1">
                Name
              </label>
              <input
                type="text"
                value={siteConfig.site_settings.name}
                onChange={(e) => updateSiteSettings("name", e.target.value)}
                className="w-full bg-white/[0.02] border border-white/[0.04] rounded-lg py-2 px-3 text-xs focus:outline-none focus:border-white font-bold transition-colors text-white"
                placeholder="Site Name"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ThemePlugin;
