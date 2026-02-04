import React, { useState, useEffect, useMemo } from 'react';
import { useSite } from '../context/SiteContext';
import { useNavigate } from 'react-router-dom';
import { Files, BookOpen, X, Sparkles, Puzzle, Search, Globe } from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import SectionRenderer from './SectionRenderer';

import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { autocompletion, CompletionContext } from '@codemirror/autocomplete';

import { vscodeDark, githubLight, dracula, tokyoNight } from '@uiw/codemirror-themes-all';
import DocViewer from './DocViewer';
import { SCHEMAS } from '../data/schemas';

function myCompletions(context: CompletionContext) {
    let word = context.matchBefore(/\w*/)
    if (!word || (word.from == word.to && !context.explicit))
        return null
    return {
        from: word.from,
        options: [
            { label: "site_settings", type: "keyword", info: "Global configuration" },
            { label: "sections", type: "keyword", info: "List of page modules" },
            { label: "id", type: "property" },
            { label: "type", type: "property" },
            { label: "props", type: "property" },
        ]
    }
}

const Editor: React.FC = () => {
    const { siteConfig, setSiteConfig, saveConfig, loading, projectSlug } = useSite();
    const navigate = useNavigate();

    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showDocs, setShowDocs] = useState(false);
    const [showPlugins, setShowPlugins] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [editorTheme, setEditorTheme] = useState<any>(vscodeDark);
    const [activeThemeId, setActiveThemeId] = useState<string>('vscodeDark');

    useEffect(() => {
        if (!loading) {
            setJsonInput(JSON.stringify(siteConfig, null, 2));
        }
    }, [loading, siteConfig]);

    const handleJsonChange = (val: string) => {
        setJsonInput(val);
        try {
            const parsed = JSON.parse(val);
            if (parsed.site_settings && Array.isArray(parsed.sections)) {
                setSiteConfig(parsed);
                setError(null);
            } else {
                setError("Missing 'site_settings' or 'sections' array.");
            }
        } catch (e: any) {
            setError(`Invalid JSON: ${e.message}`);
        }
    };

    const handleThemeChange = (themeId: string, themeObj: any) => {
        setEditorTheme(themeObj);
        setActiveThemeId(themeId);
    };

    const handleColorChange = (color: string) => {
        const newConfig = { ...siteConfig };
        if (!newConfig.site_settings.theme) {
            newConfig.site_settings.theme = { primary: color, font: 'Inter', darkMode: true };
        } else {
            newConfig.site_settings.theme.primary = color;
        }
        setSiteConfig(newConfig);
        setJsonInput(JSON.stringify(newConfig, null, 2));
    };

    const filteredSchemas = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return SCHEMAS;
        return SCHEMAS.filter(schema =>
            schema.type.toLowerCase().includes(query) ||
            schema.description.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    const [isDeploying, setIsDeploying] = useState(false);

    const handleDeploy = async () => {
        setIsDeploying(true);
        try {
            await saveConfig();
        } finally {
            // Fake delay for "Building..." feel if it's too fast, or just finish
            setTimeout(() => setIsDeploying(false), 1500);
        }
    };

    if (loading) return (
        <div className="flex h-screen items-center justify-center bg-white text-gray-900 font-sans">
            <div className="flex flex-col items-center gap-6">
                <div className="w-12 h-12 border-4 border-t-gray-900 border-gray-100 rounded-full animate-spin"></div>
                <div className="text-sm font-bold uppercase tracking-widest text-gray-400">Loading Project...</div>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-screen bg-white text-gray-900 font-sans overflow-hidden">
            {/* Header */}
            <div className="h-14 border-b border-gray-200 flex items-center justify-between px-6 bg-white shrink-0 z-40">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-gray-400 hover:text-gray-900 transition-colors p-1"
                        title="Back to Dashboard"
                    >
                        <Files size={18} />
                    </button>
                    <div className="font-black tracking-tighter text-lg select-none">nekoneko</div>
                </div>

                <div className="text-sm font-medium text-gray-500 max-w-[200px] truncate">
                    {siteConfig.site_settings?.name || 'Untitled Project'}
                </div>

                <div className="flex gap-2">
                    {!isDeploying && projectSlug && (
                        <button
                            onClick={() => {
                                const protocol = window.location.protocol;
                                const host = window.location.host; // e.g., localhost:5173 or nekoneko.vercel.app
                                const newUrl = `${protocol}//${projectSlug}.${host}`;
                                window.open(newUrl, '_blank');
                            }}
                            className="px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 animate-in fade-in duration-500"
                        >
                            <Globe size={14} />
                            View Live
                        </button>
                    )}
                    <button
                        onClick={() => {
                            try {
                                const parsed = JSON.parse(jsonInput);
                                setJsonInput(JSON.stringify(parsed, null, 2));
                            } catch (e) {
                                setError("Invalid JSON");
                            }
                        }}
                        className="px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5"
                    >
                        <Sparkles size={14} />
                        Format
                    </button>
                    <button
                        onClick={handleDeploy}
                        disabled={isDeploying}
                        className={`px-4 py-1.5 rounded bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all active:scale-95 flex items-center gap-2 ${isDeploying ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isDeploying && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                        {isDeploying ? 'Building...' : 'Deploy'}
                    </button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Side Nav */}
                <div className="w-14 border-r border-gray-200 bg-white flex flex-col items-center py-6 gap-6 shrink-0 z-30">
                    <button
                        className={`p-2 rounded transition-colors ${!showPlugins && !showDocs ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
                        onClick={() => { setShowPlugins(false); setShowDocs(false); }}
                    >
                        <Files size={20} />
                    </button>
                    <button
                        onClick={() => { setShowPlugins(!showPlugins); setShowDocs(false); }}
                        className={`p-2 rounded transition-colors ${showPlugins ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
                    >
                        <Puzzle size={20} />
                    </button>
                    <button
                        onClick={() => { setShowDocs(!showDocs); setShowPlugins(false); }}
                        className={`p-2 rounded transition-colors ${showDocs ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-900'}`}
                    >
                        <BookOpen size={20} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex overflow-hidden relative">
                    <PanelGroup direction="horizontal">
                        <Panel defaultSize={40} minSize={25}>
                            <div className="h-full relative flex flex-col">
                                <div className="flex-1 relative overflow-hidden">
                                    <div className="absolute inset-0">
                                        <CodeMirror
                                            value={jsonInput}
                                            height="100%"
                                            basicSetup={{ lineNumbers: true, foldGutter: true, autocompletion: true }}
                                            theme={editorTheme}
                                            extensions={[json(), autocompletion({ override: [myCompletions] }), EditorView.lineWrapping]}
                                            onChange={handleJsonChange}
                                            className="text-sm font-mono h-full"
                                        />
                                    </div>
                                </div>
                                {error && (
                                    <div className="absolute bottom-4 left-4 right-4 p-3 bg-red-50 text-red-600 border border-red-100 rounded text-xs font-bold">
                                        {error}
                                    </div>
                                )}

                                {showPlugins && (
                                    <div className="absolute inset-0 bg-white z-50 flex flex-col border-r border-gray-200">
                                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0">
                                            <h2 className="font-bold text-gray-900 flex items-center gap-2 text-sm uppercase tracking-wider">Plugins</h2>
                                            <button onClick={() => setShowPlugins(false)} className="text-gray-400 hover:text-gray-900"><X size={18} /></button>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-6 space-y-8">
                                            <div className="space-y-4">
                                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Site Theme</h3>
                                                <div className="grid grid-cols-5 gap-2">
                                                    {['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#000000'].map(color => (
                                                        <button
                                                            key={color}
                                                            onClick={() => handleColorChange(color)}
                                                            className={`w-full aspect-square rounded border-2 transition-all ${siteConfig.site_settings?.theme?.primary === color ? 'border-gray-900 scale-105 shadow-sm' : 'border-transparent'}`}
                                                            style={{ backgroundColor: color }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-4 pt-8 border-t border-gray-100">
                                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Editor Appearance</h3>
                                                <div className="space-y-1">
                                                    {[
                                                        { name: 'VS Code Dark', id: 'vscodeDark', theme: vscodeDark },
                                                        { name: 'GitHub Light', id: 'githubLight', theme: githubLight },
                                                        { name: 'Dracula', id: 'dracula', theme: dracula },
                                                        { name: 'Tokyo Night', id: 'tokyoNight', theme: tokyoNight },
                                                    ].map((t) => (
                                                        <button
                                                            key={t.id}
                                                            onClick={() => handleThemeChange(t.id, t.theme)}
                                                            className={`w-full flex items-center justify-between p-2 text-left text-xs font-bold rounded ${activeThemeId === t.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                                                        >
                                                            {t.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {showDocs && (
                                    <div className="absolute inset-0 bg-white z-50 flex flex-col border-r border-gray-200">
                                        <div className="p-4 border-b border-gray-100 flex flex-col gap-4 bg-white sticky top-0">
                                            <div className="flex justify-between items-center">
                                                <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Documentation</h2>
                                                <button onClick={() => setShowDocs(false)} className="text-gray-400 hover:text-gray-900"><X size={18} /></button>
                                            </div>
                                            <div className="relative">
                                                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                                                <input
                                                    type="text"
                                                    placeholder="Search components..."
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    className="w-full bg-gray-50 border border-gray-100 rounded py-1.5 pl-8 pr-4 text-xs outline-none focus:border-gray-300 transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-4">
                                            <DocViewer schemas={filteredSchemas} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Panel>

                        <PanelResizeHandle className="w-px bg-gray-100 hover:bg-gray-300 transition-colors" />

                        <Panel>
                            <div className="h-full bg-gray-50 overflow-y-auto p-8 relative">
                                <div className="bg-white min-h-full border border-gray-200 shadow-sm mx-auto">
                                    <SectionRenderer sections={siteConfig.sections} />
                                </div>
                            </div>
                        </Panel>
                    </PanelGroup>
                </div>
            </div>
            <style>{`
                .cm-editor { height: 100% !important; }
                .cm-scroller { overflow: auto !important; }
                .cm-content { font-family: 'JetBrains Mono', 'Fira Code', monospace !important; }
            `}</style>
        </div>
    );
};

export default Editor;
