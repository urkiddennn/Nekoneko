import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Layers, Box, Terminal, Globe } from 'lucide-react';
import { SCHEMAS } from '../data/schemas';
import DocViewer from './DocViewer';

const Docs: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeType, setActiveType] = useState<string>(SCHEMAS[0].type);

    // Group schemas by category
    const categories = useMemo(() => {
        const groups: Record<string, typeof SCHEMAS> = {};
        SCHEMAS.forEach(schema => {
            const cat = schema.category || 'Other';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(schema);
        });
        return groups;
    }, []);

    const filteredSchemas = useMemo(() => {
        if (!searchQuery.trim()) return SCHEMAS;
        return SCHEMAS.filter(schema =>
            schema.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            schema.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const activeSchema = useMemo(() => {
        return SCHEMAS.find(s => s.type === activeType) || SCHEMAS[0];
    }, [activeType]);

    const getIcon = (category: string) => {
        switch (category) {
            case 'Core': return <Terminal size={14} />;
            case 'Layout': return <Layers size={14} />;
            case 'Content': return <Box size={14} />;
            case 'Connect': return <Globe size={14} />;
            default: return <Box size={14} />;
        }
    };

    return (
        <div className="flex h-screen bg-white text-gray-900 font-sans overflow-hidden">
            {/* Sidebar */}
            <div className="w-72 border-r border-gray-100 flex flex-col bg-gray-50/30">
                <div className="p-6 border-b border-gray-100 bg-white">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors mb-6 group"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Editor
                    </button>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <input
                            type="text"
                            placeholder="Search modules..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-9 pr-4 text-xs outline-none focus:border-gray-900 focus:bg-white transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
                    {Object.entries(categories).map(([category, items]) => {
                        const filteredItems = items.filter(item =>
                            filteredSchemas.some(fs => fs.type === item.type)
                        );
                        if (filteredItems.length === 0) return null;

                        return (
                            <div key={category} className="space-y-1">
                                <div className="px-3 py-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                    {getIcon(category)}
                                    {category}
                                </div>
                                {filteredItems.map(item => (
                                    <button
                                        key={item.type}
                                        onClick={() => setActiveType(item.type)}
                                        className={`w-full text-left px-3 py-2 rounded-xl text-sm font-bold transition-all flex items-center justify-between group ${activeType === item.type
                                            ? 'bg-white text-gray-900 shadow-sm border border-gray-100 ring-1 ring-black/5'
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                                            }`}
                                    >
                                        {item.type}
                                        {activeType === item.type && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-pulse" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto bg-white relative custom-scrollbar">
                <div className="max-w-4xl mx-auto px-12 py-16">
                    <DocViewer key={activeSchema.type} schema={activeSchema} />
                </div>
            </div>
        </div>
    );
};

export default Docs;
