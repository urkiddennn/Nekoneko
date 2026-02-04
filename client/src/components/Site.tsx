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
            <div className="flex h-screen items-center justify-center bg-white font-sans overflow-hidden">
                <div className="flex flex-col items-center gap-10">
                    <div className="relative">
                        <div className="font-black text-3xl tracking-tighter animate-pulse duration-[2000ms] select-none">
                            nekoneko
                        </div>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-1 bg-gray-900 rounded-full animate-in slide-in-from-left-full duration-1000 iteration-infinite" />
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                        <div className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
                            INITIALIZING_SPACE
                        </div>
                    </div>
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
