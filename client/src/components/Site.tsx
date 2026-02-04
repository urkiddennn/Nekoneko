import React from 'react';
import { useSite } from '../context/SiteContext';
import SectionRenderer from './SectionRenderer';

const Site: React.FC = () => {
    const { siteConfig, loading } = useSite();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#07090e] text-indigo-500 font-sans">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 border-4 border-t-indigo-500 border-indigo-500/10 rounded-full animate-spin"></div>
                    <div className="text-2xl font-black tracking-[0.2em] italic uppercase">LOADING_SITE...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans antialiased">
            <SectionRenderer sections={siteConfig.sections} />
        </div>
    );
};

export default Site;
