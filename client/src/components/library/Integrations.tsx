import React from 'react';


interface IntegrationItem {
    label: string;
    icon: string; // URL or simplified SVG path for now
}

interface IntegrationsProps {
    intro?: string;
    heading: string;
    subheading: string;
    accentLabel?: string;
    competitorLogos?: IntegrationItem[];
    alternativeLogos?: IntegrationItem[];
    items: IntegrationItem[];
    variant?: "default" | "bento";
}

const Integrations: React.FC<IntegrationsProps> = ({
    intro = "ALTERNATIVE TO",
    heading,
    subheading,
    accentLabel = "Use on your favorite frameworks",

    alternativeLogos,
    items,
    variant = "default"
}) => {



    if (variant === "bento") {
        return (
            <div className="bg-[#EBEAE5] relative overflow-hidden border-b border-[#2c2c2c] border-dashed">
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-4 border-l border-[#2c2c2c] border-dashed">

                        {/* Row 1: Intro Header (Full Width) */}
                        <div className="md:col-span-4 p-8 border-r border-b border-[#2c2c2c] border-dashed flex justify-center items-center bg-[#EBEAE5]">
                            <span className="text-xs md:text-sm font-bold tracking-widest uppercase text-slate-500 font-geist-sans">
                                {intro}
                            </span>
                        </div>

                        {/* Row 2: Alternative Logos Grid (Left) + Fillers (Right) */}
                        <div className="md:col-span-4 border-r border-b border-[#2c2c2c] border-dashed bg-[#EBEAE5]">
                            <div className="grid grid-cols-3 h-full w-full">
                                {alternativeLogos && alternativeLogos.slice(0, 4).map((logo, idx) => (
                                    <div
                                        key={idx}
                                        className={`
                                            flex items-center flex-col justify-center p-6 h-32 md:h-auto
                                            hover:bg-white transition-colors group
                                            ${idx % 2 === 0 ? 'border-r border-[#2c2c2c] border-dashed' : ''}
                                            ${idx < 2 ? 'border-b border-r border-[#2c2c2c] border-dashed' : ''}
                                        `}
                                    >
                                        <img
                                            src={logo.icon}
                                            alt={logo.label}
                                            className="w-10 h-10 md:w-12 md:h-12 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100 group-hover:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* 3 Filler Cells to complete Row 2 */}
                        {/* {[...Array(3)].map((_, i) => (
                            <div key={`filler-${i}`} className="md:col-span-1 border-r border-b border-[#2c2c2c] border-dashed bg-[#EBEAE5] hidden md:block" />
                        ))} */}

                        {/* Row 3: Headline (Left) & Description (Right) */}
                        <div className="md:col-span-2 p-12 md:p-16 border-r border-b border-[#2c2c2c] border-dashed bg-[#EBEAE5] flex items-center">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] tracking-tight leading-[1] font-geist-sans">
                                {heading}
                            </h2>
                        </div>
                        <div className="md:col-span-2 p-12 md:p-16 border-r border-b border-[#2c2c2c] border-dashed bg-[#EBEAE5] flex items-center">
                            <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed max-w-sm">
                                {subheading}
                            </p>
                        </div>


                        {/* Orange Accent Block */}
                        <div className="md:col-span-1 p-12 border-r border-b border-[#2c2c2c] border-dashed bg-[#FF6B00] flex flex-col justify-end min-h-[240px]">
                            <h3 className="text-xl md:text-2xl font-bold text-black tracking-tight leading-tight font-geist-sans">
                                {accentLabel}
                            </h3>
                        </div>

                        {/* Framework Logos Layout - Fill remaining 3 columns */}
                        {(items.length > 0 ? items : [
                            { label: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                            { label: "Vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
                            { label: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                        ]).slice(0, 3).map((item, idx) => (
                            <div key={idx} className="md:col-span-1 p-10 border-r border-b border-[#2c2c2c] border-dashed flex items-center justify-center bg-[#EBEAE5] hover:bg-white transition-colors group">
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="w-12 h-12 md:w-16 md:h-16 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-80 group-hover:opacity-100 group-hover:scale-110"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Vertical Grid Lines Background */}
                <div className="absolute inset-0 pointer-events-none flex justify-center w-full h-full max-w-7xl mx-auto px-6 md:px-12">
                    <div className="border-l border-[#2c2c2c]/10 border-dashed h-full hidden md:block" />
                    <div className="border-r border-[#2c2c2c]/10 border-dashed h-full hidden md:block" />
                </div>
            </div>
        );
    }

    return (
        <div className="py-20 bg-slate-50 dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-12">{heading}</h2>
                <div className="flex flex-wrap justify-center gap-12 opacity-70">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-4">
                            <img src={item.icon} alt={item.label} className="w-12 h-12" />
                            <span className="text-sm font-medium">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Integrations;
