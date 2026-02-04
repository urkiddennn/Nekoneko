import React, { useState } from 'react';
import { Files, Copy, Check, Search } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { SCHEMAS } from '../data/schemas';

interface Schema {
    type: string;
    description: string;
    details?: string;
    example: any;
    props: Array<{ name: string; type: string; desc: string }>;
}

interface DocViewerProps {
    className?: string;
    schemas?: Schema[];
}

const DocViewer: React.FC<DocViewerProps> = ({ className = '', schemas = SCHEMAS }) => {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    if (schemas.length === 0) {
        return (
            <div className={`flex flex-col items-center justify-center py-20 bg-white/5 rounded-2xl border border-white/5 text-center px-6 ${className}`}>
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-slate-500 mb-6">
                    <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No matching modules found</h3>
                <p className="text-slate-400 max-w-sm">
                    We couldn't find any components matching your search criteria. Try using different keywords.
                </p>
            </div>
        );
    }

    const copyToClipboard = async (text: string, id: string) => {
        // Try modern Clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                setCopiedId(id);
                setTimeout(() => setCopiedId(null), 2000);
                return;
            } catch (err) {
                console.warn("Modern clipboard API failed, trying fallback:", err);
            }
        }

        // Fallback for non-secure contexts or failed API
        try {
            const textArea = document.createElement("textarea");
            textArea.value = text;

            // Ensure the textarea is not visible but is part of the DOM
            textArea.style.position = "fixed";
            textArea.style.left = "-9999px";
            textArea.style.top = "0";
            textArea.style.opacity = "0";
            textArea.setAttribute('readonly', ''); // Prevent keyboard from popping up on mobile

            document.body.appendChild(textArea);
            textArea.select();
            textArea.setSelectionRange(0, 99999); // For mobile devices

            const successful = document.execCommand("copy");
            document.body.removeChild(textArea);

            if (successful) {
                setCopiedId(id);
                setTimeout(() => setCopiedId(null), 2000);
            } else {
                console.error("ExecCommand copy failed");
            }
        } catch (fallbackErr) {
            console.error("All copy methods failed:", fallbackErr);
        }
    };

    return (
        <div className={`space-y-12 ${className}`}>
            {schemas.map((schema) => (
                <div key={schema.type} className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[11px] font-black uppercase rounded-lg border border-indigo-100 shadow-sm">
                            {schema.type}
                        </div>
                        <div className="h-px flex-1 bg-gray-100"></div>
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-lg font-bold text-gray-900">{schema.description}</h3>
                        {schema.details && (
                            <p className="text-sm text-gray-500 leading-relaxed border-l-2 border-indigo-100 pl-4">
                                {schema.details}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Code Example with Syntax Highlighting */}
                        <div className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-sm border border-gray-800">
                            <div className="absolute top-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => copyToClipboard(JSON.stringify(schema.example, null, 2), schema.type)}
                                    className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all active:scale-95 backdrop-blur-md"
                                    title="Copy Example"
                                >
                                    {copiedId === schema.type ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                </button>
                            </div>
                            <div className="px-4 py-2 bg-gray-950 border-b border-gray-800 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                                JSON Example
                            </div>
                            <CodeMirror
                                value={JSON.stringify(schema.example, null, 2)}
                                height="auto"
                                theme="dark"
                                extensions={[
                                    json(),
                                    EditorView.lineWrapping,
                                    EditorView.editable.of(false), // Read-only
                                    EditorView.theme({
                                        '&': { backgroundColor: '#111827', fontSize: '12px' },
                                        '.cm-gutters': { display: 'none' }, // Hide line numbers for cleanliness
                                        '.cm-content': { padding: '16px' },
                                    })
                                ]}
                            />
                        </div>

                        {/* Props Table */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm h-fit">
                            <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <Files size={12} /> Properties
                            </div>
                            <div className="divide-y divide-gray-50">
                                {schema.props.map((prop) => (
                                    <div key={prop.name} className="p-4 hover:bg-gray-50/50 transition-colors">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold text-gray-700 font-mono">"{prop.name}"</span>
                                            <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">{prop.type}</span>
                                        </div>
                                        <p className="text-[11px] text-gray-400 font-medium leading-normal">{prop.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DocViewer;
