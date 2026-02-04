import React, { useEffect } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useSite } from '../context/SiteContext';
import SectionRenderer from './SectionRenderer';

const Site: React.FC = () => {
    const { siteConfig, loading, projectId } = useSite();
    const recordView = useMutation(api.analytics.recordView);

    useEffect(() => {
        if (!loading && projectId) {
            recordView({ projectId: projectId as any });
        }
    }, [loading, projectId]);

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

    const font = siteConfig.site_settings.theme?.font || 'Inter';

    return (
        <div
            className="min-h-screen bg-white antialiased"
            style={{ fontFamily: font }}
        >
            <SectionRenderer sections={siteConfig.sections} />
        </div>
    );
};

export default Site;
