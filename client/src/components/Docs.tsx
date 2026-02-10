import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Layers, Box, Terminal, Globe, Menu, X } from 'lucide-react';
import { SCHEMAS } from '../data/schemas';
import DocViewer from './DocViewer';
import { SEO } from './SEO';

const Docs: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeType, setActiveType] = useState<string>(SCHEMAS[0].type);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div className="flex h-screen bg-white text-gray-900 font-sans overflow-hidden relative">
            <SEO
                title="Documentation"
                description="Learn how to use Nekoneko's JSON-based site builder. Explore our component library and schema definitions."
            />

            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden animate-in fade-in duration-200"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 md:relative md:bg-gray-50/30
                ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="p-6 border-b border-gray-100 bg-white flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Back
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsSidebarOpen(false);
                        }}
                        className="md:hidden p-3 -m-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all"
                        aria-label="Close menu"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="p-6 border-b border-gray-100 bg-white">
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
                                        onClick={() => {
                                            setActiveType(item.type);
                                            setIsSidebarOpen(false);
                                        }}
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

            <div className="flex-1 flex flex-col overflow-hidden bg-white relative">
                {/* Mobile Top Header */}
                <div className="md:hidden h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-white shrink-0">
                    <div className="font-black text-lg tracking-tighter">nekoneko</div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-gray-400 hover:text-gray-900"
                    >
                        <Menu size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
                        <DocViewer key={activeSchema.type} schema={activeSchema} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Docs;
