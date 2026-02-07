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
  variant?: "stack" | "split" | "invest" | "brutalist" | "outline_minimal" | "impact";
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

  if (variant === "impact") {
    const titleParts = heading.split(' ');
    return (
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 text-slate-950 dark:text-white py-16 md:py-24 relative overflow-hidden">
        {/* Subtle background blob */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[40%] h-[80%] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

        <div className="flex-1 space-y-8 md:space-y-10 w-full animate-in fade-in slide-in-from-left-12 duration-1000">
          <div className="flex items-center gap-4">
            <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">HELLO</span>
          </div>

          <h1
            className={`${style?.titleSize || "text-5xl md:text-[5.5rem]"} font-black tracking-tight leading-[1.1] break-words`}
          >
            {titleParts.map((part, i) => (
              <span key={i} style={i === 1 ? { color: style?.titleColor || "#ef4444" } : { color: style?.titleColor ? undefined : undefined }}>
                {part}{' '}
              </span>
            ))}
          </h1>

          <p className="text-lg md:text-xl font-medium text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            {subheading}
          </p>

          <div className="flex flex-wrap gap-4 pt-6">
            {ctaButtons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.url}
                className={`px-10 py-4 md:px-12 md:py-5 text-sm font-black transition-all uppercase tracking-widest hover:scale-105 active:scale-95 w-full md:w-auto text-center ${btn.variant === 'primary'
                  ? 'text-white'
                  : 'bg-transparent text-slate-950 dark:text-white border border-slate-200 dark:border-white/10'
                  }`}
                style={btn.variant === 'primary' ? { backgroundColor: style?.titleColor || "#ef4444", borderRadius: '2px' } : { borderRadius: '2px' }}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 relative animate-in fade-in zoom-in-95 duration-1000 delay-200">
          {/* Decorative behind image */}
          <div
            className="absolute -right-12 top-1/2 -translate-y-1/2 w-full h-[120%] bg-slate-50 dark:bg-slate-900/50 -z-10 rotate-3 rounded-[4rem]"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.05) 0%, transparent 50%)' }}
          />
          <img
            src={avatarUrl}
            alt="Hero Avatar"
            className="w-full md:w-[480px] aspect-[4/5] object-cover rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
          />
        </div>
      </div>
    );
  }

  if (variant === "outline_minimal") {
    return (
      <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 text-slate-950 dark:text-white py-12 md:py-20 border-b border-slate-950 dark:border-white shadow-none`}>
        <div className="flex-1 space-y-6 md:space-y-10 w-full">
          <h1
            className={`${style?.titleSize || "text-5xl md:text-8xl"} font-black tracking-[ -0.05em] leading-[0.9] uppercase antialiased break-words`}
            style={{ color: style?.titleColor }}
          >
            {heading.split('\n').map((line, i) => <div key={i}>{line}</div>)}
          </h1>
          <p
            className="text-base md:text-xl font-bold text-slate-400 dark:text-slate-500 max-w-xl leading-relaxed uppercase tracking-widest break-words"
            style={{ color: style?.subtitleColor }}
          >
            {subheading}
          </p>
          <div className="flex flex-wrap gap-0 pt-4">
            {ctaButtons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.url}
                className={`px-6 py-4 md:px-10 md:py-5 text-xs md:text-sm font-black transition-all border border-slate-950 dark:border-white rounded-none uppercase tracking-tighter hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-black w-full md:w-auto text-center ${btn.variant === 'primary'
                  ? 'bg-slate-950 text-white dark:bg-white dark:text-black'
                  : 'bg-transparent text-slate-950 dark:text-white'
                  }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 grayscale opacity-90 w-full md:w-auto flex justify-center">
          <img
            src={avatarUrl}
            alt="Avatar"
            {...({ fetchpriority: "high" } as any)}
            className="w-full md:w-80 h-auto md:h-96 aspect-square md:aspect-auto rounded-none border border-slate-950 dark:border-white object-cover"
          />
        </div>
      </div>
    );
  }

  if (variant === "brutalist") {
    return (
      <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 text-slate-950 dark:text-white py-8 md:py-12`}>
        <div className="flex-1 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 w-full">
          <h1
            className={`${style?.titleSize || "text-4xl md:text-7xl"} font-black tracking-tight leading-[1.05] uppercase break-words`}
            style={{ color: style?.titleColor }}
          >
            {heading.split('\n').map((line, i) => <div key={i}>{line}</div>)}
          </h1>
          <p
            className="text-lg md:text-2xl font-bold text-slate-900 dark:text-slate-300 max-w-2xl leading-relaxed break-words"
            style={{ color: style?.subtitleColor }}
          >
            {subheading}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            {ctaButtons.map((btn, idx) => (
              <a
                key={idx}
                href={btn.url}
                className={`px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-black transition-all active:scale-95 border-[3px] border-slate-950 dark:border-white shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] w-full md:w-auto text-center ${btn.variant === 'primary'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 animate-in fade-in zoom-in-95 duration-700 delay-150 w-full md:w-auto flex justify-center">
          <img
            src={avatarUrl}
            alt="Avatar"
            {...({ fetchpriority: "high" } as any)}
            className="w-64 h-64 md:w-72 md:h-72 rounded-[2rem] border-[3px] border-slate-950 dark:border-white shadow-[8px_8px_0px_0px_rgba(2,6,23,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] object-cover"
          />
        </div>
      </div>
    );
  }

  if (variant === "invest") {
    return (
      <div
        className="relative min-h-[500px] md:min-h-[600px] flex flex-col justify-center px-4 md:px-8 py-12 md:py-20 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden"
        style={{
          backgroundImage: backgroundImageUrl ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${backgroundImageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto w-full space-y-6 md:space-y-8">
          {topBadgeItems.length > 0 && (
            <div className="inline-flex flex-wrap items-center gap-4 md:gap-6 bg-white/90 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-full shadow-xl max-w-full">
              {topBadgeItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 border-r last:border-0 border-gray-200 pr-4 md:pr-6 last:pr-0">
                  {item.logo && <img src={item.logo} alt="" className="w-4 h-4 md:w-5 md:h-5 rounded-full" />}
                  <span className="text-gray-900 font-bold text-xs md:text-sm tracking-tight whitespace-nowrap">{item.label}</span>
                  <span className={`text-xs md:text-sm font-black ${item.trend === 'down' ? 'text-red-500' : 'text-emerald-500'}`}>
                    {item.value} {item.trend === 'down' ? '↓' : '↑'}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <h1
              className={`${style?.titleSize || "text-4xl md:text-7xl"} font-black ${backgroundImageUrl ? 'text-white' : 'text-slate-950 dark:text-white'} leading-[1.05] tracking-tight uppercase break-words`}
              style={{ color: style?.titleColor }}
            >
              {heading.split('\n').map((line, i) => <div key={i}>{line}</div>)}
            </h1>
            <p
              className={`text-lg md:text-2xl font-bold ${backgroundImageUrl ? 'text-white' : 'text-slate-900 dark:text-slate-400'} max-w-2xl leading-relaxed break-words`}
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
                className={`px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-black transition-all active:scale-95 w-full md:w-auto text-center ${btn.variant === 'primary'
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
        className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 text-slate-950 dark:text-white`}
      >
        <div className="flex-1 space-y-4 md:space-y-6 w-full">
          <h1
            className={`${style?.titleSize || "text-4xl md:text-6xl"} font-black tracking-tight leading-none break-words`}
            style={{ color: style?.titleColor }}
          >
            {heading}
          </h1>
          <p
            className="text-lg md:text-2xl font-medium text-slate-900 dark:text-white/80 max-w-2xl break-words"
            style={{ color: style?.subtitleColor }}
          >
            {subheading}
          </p>
        </div>
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
          <img
            src={avatarUrl}
            alt="Avatar"
            {...({ fetchpriority: "high" } as any)}
            className="w-full md:w-64 h-auto md:h-64 rounded-3xl border-8 border-slate-100 dark:border-white/10 shadow-2xl object-cover"
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
        fetchPriority="high"
        className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-slate-100 dark:border-white/20 shadow-lg mb-4 md:mb-6 object-cover"
      />
      <h1
        className={`${style?.titleSize || "text-4xl md:text-6xl"} font-black mb-4 tracking-tight leading-none break-words`}
        style={{ color: style?.titleColor }}
      >
        {heading}
      </h1>
      <p
        className="text-lg md:text-2xl font-medium text-slate-900 dark:text-white/80 max-w-2xl break-words"
        style={{ color: style?.subtitleColor }}
      >
        {subheading}
      </p>
    </div>
  );
};

export default Hero;
