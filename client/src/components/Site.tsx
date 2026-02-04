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
            <div className="min-h-screen bg-white flex flex-col items-center justify-end pb-12">
                <div className="flex items-center gap-2 opacity-20">
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase">Powered by</span>
                    <span className="text-sm font-black tracking-tighter">nekoneko</span>
                </div>
            </div>
        );
    }

    const font = siteConfig.site_settings.theme?.font || 'Inter';

    return (
        <div
            className="min-h-screen bg-white antialiased flex flex-col justify-between"
            style={{ fontFamily: font }}
        >
            <main>
                <SectionRenderer sections={siteConfig.sections} />
            </main>

            <footer className="py-12 flex justify-center bg-white">
                <div className="flex items-center gap-2 opacity-20 hover:opacity-100 transition-opacity cursor-default">
                    <span className="text-[10px] font-black tracking-[0.3em] uppercase">Powered by</span>
                    <span className="text-sm font-black tracking-tighter">nekoneko</span>
                </div>
            </footer>
        </div>
    );
};

export default Site;
