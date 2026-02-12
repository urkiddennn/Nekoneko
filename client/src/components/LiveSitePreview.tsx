import React, { useEffect, useRef, useState } from 'react';

interface LiveSitePreviewProps {
    slug: string;
    name: string;
}

const LiveSitePreview: React.FC<LiveSitePreviewProps> = ({ slug, name }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.25);
    const [loading, setLoading] = useState(true);

    const getSiteUrl = (slug: string) => {
        const protocol = window.location.protocol;
        const host = window.location.host;
        // Handle local development vs production subdomain logic if needed
        // For now, following the pattern: slug.host
        return `${protocol}//${slug}.${host}`;
    };

    const url = getSiteUrl(slug);

    useEffect(() => {
        const calculateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                // We want to simulate a desktop viewport of roughly 1280px or 1440px
                const targetBaseWidth = 1280;
                const newScale = containerWidth / targetBaseWidth;
                setScale(newScale);
            }
        };

        // Initial calculation
        calculateScale();

        // Use ResizeObserver to detect container size changes
        const observer = new ResizeObserver(() => {
            calculateScale();
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-hidden bg-black relative group-hover:shadow-inner transition-all"
        >
            {/* Loading Skeleton */}
            {loading && (
                <div className="absolute inset-0 z-10 bg-[#0b0b0b] animate-pulse flex items-center justify-center border border-white/[0.04]">
                    <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-2 border-white/[0.08] border-t-white rounded-full animate-spin" />
                    </div>
                </div>
            )}

            {/* Scaled Iframe */}
            <iframe
                src={url}
                title={`Preview of ${name}`}
                className="absolute top-0 left-0 origin-top-left border-none pointer-events-none select-none"
                style={{
                    width: '1280px', // Fixed desktop width
                    height: '1280px', // Taller height to show more content, will be cropped by container
                    transform: `scale(${scale})`,
                    opacity: loading ? 0 : 1,
                    transition: 'opacity 0.3s ease-in-out',
                }}
                onLoad={() => setLoading(false)}
                tabIndex={-1}
                loading="lazy"
            />

            {/* Overlay to prevent interaction and handle generic clicks if needed, 
                though pointer-events-none on iframe handles most, 
                this ensures no clickjacking or accidental scroll capture */}
            <div className="absolute inset-0 z-20 bg-transparent" />
        </div>
    );
};

export default LiveSitePreview;
