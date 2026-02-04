import React, { useState } from 'react';
import { Copy, Check, Terminal, Box, Settings, Ghost, Hash, Type, Eye, Code } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import SectionRenderer from './SectionRenderer';

interface Schema {
    type: string;
    category: string;
    description: string;
    details?: string;
    example: any;
    props: Array<{ name: string; type: string; desc: string }>;
    common_styles?: Array<{ name: string; type: string; desc: string }>;
}

interface DocViewerProps {
    schema: Schema;
    className?: string;
}

const DocViewer: React.FC<DocViewerProps> = ({ schema, className = '' }) => {
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'preview' | 'json'>('preview');

    const copyToClipboard = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    const getBadge = (type: string) => {
        switch (type.toLowerCase()) {
            case 'hex':
            case 'color':
                return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-50 text-amber-600 text-[10px] font-black uppercase ring-1 ring-amber-200/50"><Hash size={10} /> Color</span>;
            case 'tailwind':
                return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase ring-1 ring-indigo-200/50"><Box size={10} /> Style</span>;
            case 'boolean':
                return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase ring-1 ring-emerald-200/50"><Settings size={10} /> Logic</span>;
            case 'string':
            case 'url':
                return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-50 text-slate-600 text-[10px] font-black uppercase ring-1 ring-slate-200/50"><Type size={10} /> Text</span>;
            default:
                if (type.includes('|')) return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-purple-50 text-purple-600 text-[10px] font-black uppercase ring-1 ring-purple-200/50"><Ghost size={10} /> Enum</span>;
                return <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-gray-50 text-gray-500 text-[10px] font-black uppercase ring-1 ring-gray-200/50">Component</span>;
        }
    };

    return (
        <div className={`space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 ${className}`}>
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-5xl font-black tracking-tighter text-gray-900">{schema.type}</h1>
                    <div className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-indigo-200">
                        {schema.category}
                    </div>
                </div>
                <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
                    {schema.description}
                </p>
                {schema.details && (
                    <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50 flex items-start gap-3">
                        <Terminal size={18} className="text-indigo-600 mt-1 shrink-0" />
                        <p className="text-sm text-indigo-900/70 font-medium leading-relaxed italic">
                            {schema.details}
                        </p>
                    </div>
                )}
            </div>

            {/* Config & Example with Tabs */}
            <div className="space-y-4">
                <div className="flex items-center gap-1 border-b border-gray-100 px-2">
                    <button
                        onClick={() => setActiveTab('preview')}
                        className={`px-4 py-2.5 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === 'preview' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Eye size={14} />
                            Preview
                        </div>
                        {activeTab === 'preview' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 animate-in fade-in" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('json')}
                        className={`px-4 py-2.5 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === 'json' ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Code size={14} />
                            JSON
                        </div>
                        {activeTab === 'json' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 animate-in fade-in" />
                        )}
                    </button>
                </div>

                {activeTab === 'preview' ? (
                    <div className="relative bg-gray-50/50 rounded-[40px] border border-gray-100 overflow-hidden ring-1 ring-black/5 min-h-[300px] flex items-center justify-center p-12">
                        {/* Diagonal pattern background to mimic reference */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                        <div className="w-full max-w-4xl relative z-10 bg-white p-8 rounded-[32px] shadow-2xl shadow-indigo-500/10 border border-white ring-1 ring-black/5">
                            <SectionRenderer sections={[schema.example]} />
                        </div>
                    </div>
                ) : (
                    <div className="group relative bg-gray-950 rounded-[40px] overflow-hidden border border-gray-800 shadow-2xl ring-1 ring-black/20 animate-in fade-in zoom-in-95 duration-300">
                        <div className="absolute top-6 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => copyToClipboard(JSON.stringify(schema.example, null, 2), schema.type)}
                                className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl transition-all active:scale-95 backdrop-blur-md"
                                title="Copy Example"
                            >
                                {copiedId === schema.type ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                            </button>
                        </div>
                        <CodeMirror
                            value={JSON.stringify(schema.example, null, 2)}
                            theme="dark"
                            extensions={[
                                json(),
                                EditorView.lineWrapping,
                                EditorView.editable.of(false),
                                EditorView.theme({
                                    '&': { backgroundColor: '#030712', fontSize: '14px', paddingTop: '20px', paddingBottom: '20px' },
                                    '.cm-gutters': { display: 'none' },
                                    '.cm-content': { padding: '32px' },
                                })
                            ]}
                        />
                    </div>
                )}
            </div>

            {/* Properties Table */}
            <div className="space-y-6">
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Structure & Props</h2>
                <div className="overflow-hidden bg-white border border-gray-100 rounded-[32px] shadow-sm">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Property</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Type</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Description</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {schema.props.map((prop) => (
                                <tr key={prop.name} className="group hover:bg-gray-50/30 transition-colors">
                                    <td className="px-8 py-5 font-mono text-xs font-black text-indigo-600">
                                        "{prop.name}"
                                    </td>
                                    <td className="px-8 py-5">
                                        {getBadge(prop.type)}
                                    </td>
                                    <td className="px-8 py-5 text-sm text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                                        {prop.desc}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Common Styles Table */}
            {(schema.common_styles && schema.common_styles.length > 0) && (
                <div className="space-y-6">
                    <h1 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Visual Modifiers</h1>
                    <div className="overflow-hidden bg-white border border-gray-100 rounded-[32px] shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <tbody className="divide-y divide-gray-50">
                                {schema.common_styles.map((style) => (
                                    <tr key={style.name} className="group hover:bg-gray-50/30 transition-colors">
                                        <td className="px-8 py-5 font-mono text-xs font-black text-slate-400">
                                            "{style.name}"
                                        </td>
                                        <td className="px-8 py-5">
                                            {getBadge(style.type)}
                                        </td>
                                        <td className="px-8 py-5 text-sm text-gray-500 font-medium">
                                            {style.desc}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DocViewer;
