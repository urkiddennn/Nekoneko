import React from "react";

interface BadgeItem {
  label: string;
  value: string;
  logo?: string;
  trend?: 'up' | 'down';
}

interface CTAButton {
  label: string;
  url: string;
  variant: 'primary' | 'outline';
}

interface HeroProps {
  heading: string;
  subheading: string;
  avatarUrl: string;
  alignment: "left" | "center" | "right";
  variant?: "stack" | "split" | "invest" | "brutalist" | "outline_minimal";
  backgroundImageUrl?: string;
  topBadgeItems?: BadgeItem[];
  ctaButtons?: CTAButton[];
  style?: {
    titleColor?: string;
    subtitleColor?: string;
    titleSize?: string;
  };
}

const Hero: React.FC<HeroProps> = ({
  heading,
  subheading,
  avatarUrl,
  alignment,
  variant = "stack",
  backgroundImageUrl,
  topBadgeItems = [],
  ctaButtons = [],
  style,
}) => {
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[alignment];

  if (variant === "outline_minimal") {
    return (
      <div className={`flex flex-col md:flex-row items-center gap-16 text-slate-950 dark:text-white py-20 border-b border-slate-950 dark:border-white shadow-none`}>
        <div className="flex-1 space-y-10">
          <h1
            className={`${style?.titleSize || "text-6xl md:text-8xl"} font-black tracking-[ -0.05em] leading-[0.9] uppercase antialiased`}
            style={{ color: style?.titleColor }}
          >
            {heading.split('\n').map((line, i) => <div key={i}>{line}</div>)}
          </h1>
          <p
            className="text-lg md:text-xl font-bold text-slate-400 dark:text-slate-500 max-w-xl leading-relaxed uppercase tracking-widest"
            style={{ color: style?.subtitleColor }}
          >
            {subheading}
          </p>
          <div className="flex flex-wrap gap-0 pt-4">
            {ctaButtons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.url}
                className={`px-10 py-5 text-sm font-black transition-all border border-slate-950 dark:border-white rounded-none uppercase tracking-tighter hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-black ${btn.variant === 'primary'
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-black'
                  : 'bg-transparent text-slate-950 dark:text-white'
                  }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 grayscale opacity-90">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-80 h-96 rounded-none border border-slate-950 dark:border-white object-cover"
          />
        </div>
      </div>
    );
  }

  if (variant === "brutalist") {
    return (
      <div className={`flex flex-col md:flex-row items-center gap-12 text-slate-950 dark:text-white py-12`}>
        <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
          <h1
            className={`${style?.titleSize || "text-5xl md:text-7xl"} font-black tracking-tight leading-[1.05] uppercase`}
            style={{ color: style?.titleColor }}
          >
            {heading.split('\n').map((line, i) => <div key={i}>{line}</div>)}
          </h1>
          <p
            className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-300 max-w-2xl leading-relaxed"
            style={{ color: style?.subtitleColor }}
          >
            {subheading}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            {ctaButtons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.url}
                className={`px-8 py-4 rounded-xl text-lg font-black transition-all active:scale-95 border-[3px] border-slate-950 dark:border-white shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] ${btn.variant === 'primary'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 animate-in fade-in zoom-in-95 duration-700 delay-150">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-72 h-72 rounded-[2rem] border-[3px] border-slate-950 dark:border-white shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] object-cover"
          />
        </div>
      </div>
    );
  }

  if (variant === "invest") {
    return (
      <div
        className="relative min-h-[600px] flex flex-col justify-center px-8 py-20 rounded-[2rem] overflow-hidden"
        style={{
          backgroundImage: backgroundImageUrl ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgroundImageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto w-full space-y-8">
          {topBadgeItems.length > 0 && (
            <div className="inline-flex flex-wrap items-center gap-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-full shadow-xl">
              {topBadgeItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 border-r last:border-0 border-gray-200 pr-6 last:pr-0">
                  {item.logo && <img src={item.logo} alt="" className="w-5 h-5 rounded-full" />}
                  <span className="text-gray-900 font-bold text-sm tracking-tight">{item.label}</span>
                  <span className={`text-sm font-black ${item.trend === 'down' ? 'text-red-500' : 'text-emerald-500'}`}>
                    {item.value} {item.trend === 'down' ? '↓' : '↑'}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <h1
              className={`${style?.titleSize || "text-5xl md:text-7xl"} font-black ${backgroundImageUrl ? 'text-white' : 'text-slate-950 dark:text-white'} leading-[1.05] tracking-tight uppercase`}
              style={{ color: style?.titleColor }}
            >
              {heading.split('\n').map((line, i) => <div key={i}>{line}</div>)}
            </h1>
            <p
              className={`text-xl md:text-2xl font-bold ${backgroundImageUrl ? 'text-white' : 'text-slate-900 dark:text-slate-400'} max-w-2xl leading-relaxed`}
              style={{ color: style?.subtitleColor }}
            >
              {subheading}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            {ctaButtons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.url}
                className={`px-8 py-4 rounded-xl text-lg font-black transition-all active:scale-95 ${btn.variant === 'primary'
                  ? 'bg-white text-gray-900 shadow-xl hover:bg-gray-100'
                  : 'bg-white/10 text-white backdrop-blur-sm border border-white/30 hover:bg-white/20'
                  }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "split") {
    return (
      <div
        className={`flex flex-col md:flex-row items-center gap-12 text-slate-950 dark:text-white`}
      >
        <div className="flex-1 space-y-6">
          <h1
            className={`${style?.titleSize || "text-4xl md:text-6xl"} font-black tracking-tight leading-none`}
            style={{ color: style?.titleColor }}
          >
            {heading}
          </h1>
          <p
            className="text-lg md:text-2xl font-medium text-slate-900 dark:text-white/80 max-w-2xl"
            style={{ color: style?.subtitleColor }}
          >
            {subheading}
          </p>
        </div>
        <div className="flex-shrink-0">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-64 h-64 rounded-3xl border-8 border-slate-100 dark:border-white/10 shadow-2xl object-cover"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${alignClass} text-slate-950 dark:text-white`}>
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-24 h-24 rounded-full border-4 border-slate-100 dark:border-white/20 shadow-lg mb-6 object-cover"
      />
      <h1
        className={`${style?.titleSize || "text-4xl md:text-6xl"} font-black mb-4 tracking-tight leading-none`}
        style={{ color: style?.titleColor }}
      >
        {heading}
      </h1>
      <p
        className="text-lg md:text-2xl font-medium text-slate-900 dark:text-white/80 max-w-2xl"
        style={{ color: style?.subtitleColor }}
      >
        {subheading}
      </p>
    </div>
  );
};

export default Hero;
