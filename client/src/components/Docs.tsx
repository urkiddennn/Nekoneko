import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { SCHEMAS } from '../data/schemas';
import DocViewer from './DocViewer';

const Docs: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSchemas = searchQuery.trim()
        ? SCHEMAS.filter(schema =>
            schema.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            schema.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : SCHEMAS;

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                                title="Go Back"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-black tracking-tight">Component Documentation</h1>
                                <p className="text-sm text-gray-500 mt-0.5">Reference for all available components</p>
                            </div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="mt-4 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search components..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pl-11 pr-4 text-sm outline-none focus:border-gray-900 focus:bg-white transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                <DocViewer schemas={filteredSchemas} />
            </div>
        </div>
    );
};

export default Docs;
