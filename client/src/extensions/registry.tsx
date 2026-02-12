import React from "react";
import { Palette, Files, LayoutGrid, LucideIcon, Image as ImageIcon } from "lucide-react";
import ThemePlugin from "../components/ThemePlugin";
import ExtensionsPanel from "../components/ExtensionsPanel";
import AssetLibrary from "../components/AssetLibrary";


export interface EditorExtension {
    id: string;
    name: string;
    icon: LucideIcon;
    panel: React.FC<any>;
}

export const CORE_EXTENSIONS: EditorExtension[] = [
    {
        id: "explorer",
        name: "Explorer",
        icon: Files,
        panel: () => (
            <div className="p-8 text-center bg-[#0b0b0b] h-full">
                <div className="w-12 h-12 bg-white/[0.02] border border-white/[0.04] rounded-xl flex items-center justify-center mx-auto mb-4 text-gray-500">
                    <Files size={24} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Project Files</h3>
                <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">Read-Only Mode</p>
            </div>
        ),
    },

    {
        id: "appearance",
        name: "Appearance",
        icon: Palette,
        panel: ThemePlugin,
    },
    {
        id: "assets",
        name: "Assets",
        icon: ImageIcon,
        panel: AssetLibrary,
    },
    {
        id: "extensions",
        name: "Extensions",
        icon: LayoutGrid,
        panel: ExtensionsPanel,
    },
];
