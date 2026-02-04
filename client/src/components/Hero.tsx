import React from 'react';

interface HeroProps {
    heading: string;
    subheading: string;
    avatarUrl: string;
    alignment: 'left' | 'center' | 'right';
    layout?: 'stack' | 'split';
    bg: {
        type: 'gradient' | 'color';
        value: string;
    };
    style?: {
        titleColor?: string;
        subtitleColor?: string;
        titleSize?: string;
    };
}

const Hero: React.FC<HeroProps> = ({ heading, subheading, avatarUrl, alignment, layout = 'stack', bg, style }) => {
    const alignClass = {
        left: 'text-left items-start',
        center: 'text-center items-center',
        right: 'text-right items-end',
    }[alignment];

    const bgStyle = bg.type === 'gradient'
        ? { backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }
        : { backgroundColor: bg.value };

    const bgClass = bg.type === 'gradient' ? `bg-gradient-to-br ${bg.value}` : '';

    if (layout === 'split') {
        return (
            <div className={`py-32 px-10 flex flex-col md:flex-row items-center gap-12 ${bgClass} text-white`} style={bg.type === 'color' ? bgStyle : {}}>
                <div className="flex-1 space-y-6">
                    <h1 className={`${style?.titleSize || 'text-6xl'} font-black tracking-tight leading-none`} style={{ color: style?.titleColor }}>
                        {heading}
                    </h1>
                    <p className="text-2xl font-medium text-white/80 max-w-2xl" style={{ color: style?.subtitleColor }}>
                        {subheading}
                    </p>
                </div>
                <div className="flex-shrink-0">
                    <img src={avatarUrl} alt="Avatar" className="w-64 h-64 rounded-3xl border-8 border-white/10 shadow-2xl object-cover" />
                </div>
            </div>
        );
    }

    return (
        <div className={`py-32 px-10 flex flex-col ${alignClass} ${bgClass} text-white`} style={bg.type === 'color' ? bgStyle : {}}>
            <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white/20 shadow-lg mb-6 object-cover" />
            <h1 className={`${style?.titleSize || 'text-6xl'} font-black mb-4 tracking-tight leading-none`} style={{ color: style?.titleColor }}>
                {heading}
            </h1>
            <p className="text-2xl font-medium text-white/80 max-w-2xl" style={{ color: style?.subtitleColor }}>{subheading}</p>
        </div>
    );
};

export default Hero;
