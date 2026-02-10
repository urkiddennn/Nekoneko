import React from "react";
import { Palette, Files, LayoutGrid, LucideIcon } from "lucide-react";
import ThemePlugin from "../components/ThemePlugin";
import ExtensionsPanel from "../components/ExtensionsPanel";


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
            <div className="p-8 text-center bg-white h-full">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Files size={24} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Project Files</h3>
                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">Read-Only Mode</p>
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
        id: "extensions",
        name: "Extensions",
        icon: LayoutGrid,
        panel: ExtensionsPanel,
    },
];
