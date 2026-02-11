import React from "react";

interface BadgeItem {
  label: string;
  value: string;
  logo?: string;
  trend?: "up" | "down";
}

interface CTAButton {
  label: string;
  url: string;
  variant: "primary" | "outline";
}

interface HeroProps {
  heading: string;
  subheading: string;
  avatarUrl: string;
  alignment: "left" | "center" | "right";
  variant?:
  | "stack"
  | "split"
  | "invest"
  | "brutalist"
  | "outline_minimal"
  | "impact"
  | "glassmorphism"
  | "glassmorphism_vibrant"
  | "glassmorphism_dark"
  | "creative_gradient"
  | "connected_line"
  | "pixel"
  | "newspaper";
  backgroundImageUrl?: string;
  topBadgeItems?: BadgeItem[];
  ctaButtons?: CTAButton[];
  socialLinks?: { platform: string; url: string }[];
  style?: {
    titleColor?: string;
    subtitleColor?: string;
    titleSize?: string;
  };
}

const optimizeImageUrl = (url: string, width: number = 800) => {
  if (!url) return url;
  if (url.includes("images.unsplash.com")) {
    const baseUrl = url.split("?")[0];
    return `${baseUrl}?auto=format&fit=crop&q=80&w=${width}`;
  }
  return url;
};

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
  const optimizedAvatar = React.useMemo(() => optimizeImageUrl(avatarUrl, 1000), [avatarUrl]);
  const optimizedBg = React.useMemo(() => backgroundImageUrl ? optimizeImageUrl(backgroundImageUrl, 1920) : undefined, [backgroundImageUrl]);

  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[alignment];

  if (variant === "impact") {
    const titleParts = heading.split(" ");
    return (
      <div className="flex flex-col md:flex-row items-center gap-12 md:gap-24 text-slate-950 dark:text-white py-16 md:py-24 relative overflow-hidden">
        {/* Subtle background blob */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[40%] h-[80%] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

        <div className="flex-1 space-y-8 md:space-y-10 w-full animate-in fade-in slide-in-from-left-12 duration-1000">
          <div className="flex items-center gap-4">
            <div className="w-12 h-1 bg-slate-200 dark:bg-slate-800" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              HELLO
            </span>
          </div>

          <h1
            className={`${style?.titleSize || "text-5xl md:text-[5.5rem]"} font-black tracking-tight leading-[1.1] break-words`}
          >
            {titleParts.map((part, i) => (
              <span
                key={i}
                style={
                  i === 1
                    ? { color: style?.titleColor || "#ef4444" }
                    : { color: style?.titleColor ? undefined : undefined }
                }
              >
                {part}{" "}
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
                className={`px-10 py-4 md:px-12 md:py-5 text-sm font-black transition-all uppercase tracking-widest hover:scale-105 active:scale-95 w-full md:w-auto text-center ${btn.variant === "primary"
                  ? "text-white"
                  : "bg-transparent text-slate-950 dark:text-white border border-slate-200 dark:border-white/10"
                  }`}
                style={
                  btn.variant === "primary"
                    ? {
                      backgroundColor: style?.titleColor || "#ef4444",
                      borderRadius: "2px",
                    }
                    : { borderRadius: "2px" }
                }
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
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(239, 68, 68, 0.05) 0%, transparent 50%)",
            }}
          />
          <img
            src={optimizedAvatar}
            alt="Hero Avatar"
            width={480}
            height={600}
            fetchPriority="high"
            className="w-full md:w-[480px] aspect-[4/5] object-cover rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 ease-out"
          />
        </div>
      </div>
    );
  }

  if (variant === "outline_minimal") {
    return (
      <div
        className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 text-slate-950 dark:text-white py-12 md:py-20 border-b border-slate-950 dark:border-white shadow-none`}
      >
        <div className="flex-1 space-y-6 md:space-y-10 w-full">
          <h1
            className={`${style?.titleSize || "text-5xl md:text-8xl"} font-black tracking-[ -0.05em] leading-[0.9] uppercase antialiased break-words`}
            style={{ color: style?.titleColor }}
          >
            {heading.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
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
                className={`px-6 py-4 md:px-10 md:py-5 text-sm md:text-sm font-black transition-all border border-slate-950 dark:border-white rounded-none uppercase tracking-tighter hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-black w-full md:w-auto text-center ${btn.variant === "primary"
                  ? "bg-slate-950 text-white dark:bg-white dark:text-black"
                  : "bg-transparent text-slate-950 dark:text-white"
                  }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 grayscale opacity-90 w-full md:w-auto flex justify-center">
          <img
            src={optimizedAvatar}
            alt="Avatar"
            width={320}
            height={384}
            fetchPriority="high"
            className="w-full md:w-80 h-auto md:h-96 aspect-square md:aspect-auto rounded-none border border-slate-950 dark:border-white object-cover"
          />
        </div>
      </div>
    );
  }

  if (variant === "brutalist") {
    return (
      <div
        className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 text-slate-950 dark:text-white py-8 md:py-12`}
      >
        <div className="flex-1 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 w-full">
          <h1
            className={`${style?.titleSize || "text-4xl md:text-7xl"} font-black tracking-tight leading-[1.05] uppercase break-words`}
            style={{ color: style?.titleColor }}
          >
            {heading.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
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
                className={`px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-black transition-all active:scale-95 border-[3px] border-slate-950 dark:border-white shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] w-full md:w-auto text-center ${btn.variant === "primary"
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-white dark:bg-slate-900 text-slate-950 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
                  }`}
              >
                {btn.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex-shrink-0 animate-in fade-in zoom-in-95 duration-700 delay-150 w-full md:w-auto flex justify-center">
          <img
            src={optimizedAvatar}
            alt="Avatar"
            width={288}
            height={288}
            fetchPriority="high"
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
          backgroundImage: optimizedBg
            ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${optimizedBg})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-4xl mx-auto w-full space-y-6 md:space-y-8">
          {topBadgeItems.length > 0 && (
            <div className="inline-flex flex-wrap items-center gap-4 md:gap-6 bg-white/90 backdrop-blur-md px-4 py-2 md:px-6 md:py-3 rounded-xl md:rounded-full shadow-xl max-w-full">
              {topBadgeItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 border-r last:border-0 border-gray-200 pr-4 md:pr-6 last:pr-0"
                >
                  {item.logo && (
                    <img
                      src={item.logo}
                      alt=""
                      width={20}
                      height={20}
                      className="w-4 h-4 md:w-5 md:h-5 rounded-full"
                    />
                  )}
                  <span className="text-gray-900 font-bold text-xs md:text-sm tracking-tight whitespace-nowrap">
                    {item.label}
                  </span>
                  <span
                    className={`text-xs md:text-sm font-black ${item.trend === "down" ? "text-red-500" : "text-emerald-500"}`}
                  >
                    {item.value} {item.trend === "down" ? "↓" : "↑"}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="space-y-4">
            <h1
              className={`${style?.titleSize || "text-4xl md:text-7xl"} font-black ${backgroundImageUrl ? "text-white" : "text-slate-950 dark:text-white"} leading-[1.05] tracking-tight uppercase break-words`}
              style={{ color: style?.titleColor }}
            >
              {heading.split("\n").map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </h1>
            <p
              className={`text-lg md:text-2xl font-bold ${backgroundImageUrl ? "text-white" : "text-slate-900 dark:text-slate-400"} max-w-2xl leading-relaxed break-words`}
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
                className={`px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-black transition-all active:scale-95 w-full md:w-auto text-center ${btn.variant === "primary"
                  ? "bg-white text-gray-900 shadow-xl hover:bg-gray-100"
                  : "bg-white/10 text-white backdrop-blur-sm border border-white/30 hover:bg-white/20"
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
            src={optimizedAvatar}
            alt="Avatar"
            width={256}
            height={256}
            fetchPriority="high"
            className="w-full md:w-64 h-auto md:h-64 rounded-3xl border-8 border-slate-100 dark:border-white/10 shadow-2xl object-cover aspect-square"
          />
        </div>
      </div>
    );
  }
  if (variant === "glassmorphism") {
    return (
      <div
        className={`p-10 bg-gray-200 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 flex flex-col md:flex-row items-center gap-8 md:gap-12
`}
      >
        <div className="flex-1 space-y-4 md:space-y-6 w-full">
          <h1
            className={`${style?.titleSize || "text-4xl md:text-6xl"} font-black tracking-tight leading-none break-words text-slate-950`}
            style={{ color: style?.titleColor }}
          >
            {heading}
          </h1>
          <p
            className="text-lg md:text-2xl font-medium text-slate-900 max-w-2xl break-words"
            style={{ color: style?.subtitleColor }}
          >
            {subheading}
          </p>
        </div>
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
          <img
            src={optimizedAvatar}
            alt="Avatar"
            width={256}
            height={256}
            fetchPriority="high"
            className="w-full md:w-64 h-auto md:h-64 rounded-3xl border-8 border-white/20 shadow-2xl object-cover aspect-square"
          />
        </div>
      </div>
    );
  }

  if (variant === "creative_gradient") {
    // Helper for icons
    const SocialIcon = ({ type, url }: { type: string; url: string }) => {
      let label = type;
      if (url.includes("github")) label = "GH";
      if (url.includes("linkedin")) label = "LI";
      if (url.includes("behance")) label = "Be";
      if (url.includes("twitter")) label = "X";
      if (url.includes("mail")) label = "@";

      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
        >
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
            {label}
          </div>
          <span className="text-sm font-medium">{url.replace(/^https?:\/\/(www\.)?/, '')}</span>
        </a>
      );
    };

    return (
      <div className="relative overflow-hidden py-12 md:py-24">
        {/* Decorative background glow for the whole section */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/5 blur-[120px] rounded-full -z-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24 relative z-10 container mx-auto px-4">
          {/* Content Side */}
          <div className={`flex-1 space-y-8 md:space-y-12 w-full ${alignment === 'center' ? 'text-center flex flex-col items-center' : 'text-left'}`}>

            {/* Gradient Pill Title */}
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-sm opacity-50 rounded-full"></div>
              <h1 className="relative z-10 px-6 py-2 md:px-8 md:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-2xl md:text-5xl font-black text-white uppercase tracking-tight shadow-lg whitespace-nowrap md:whitespace-normal">
                {heading}
              </h1>
            </div>

            {/* Bio / Subheading */}
            <div className={`space-y-6 max-w-xl ${alignment === 'center' ? 'mx-auto' : ''}`}>
              <div className="text-slate-200 text-base md:text-xl leading-relaxed space-y-4 font-medium">
                {subheading.split('\n').map((paragraph, i) => (
                  <p key={i} className={i === 0 ? "text-slate-100" : "text-slate-400"}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-4 pt-4 w-full">
              <h3 className={`text-xl md:text-2xl font-black italic uppercase text-white tracking-widest ${alignment === 'center' ? 'text-center' : ''}`}>Contact</h3>
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${alignment === 'center' ? 'justify-items-center' : ''}`}>
                {ctaButtons.map((btn, idx) => (
                  <SocialIcon key={idx} type="link" url={btn.url} />
                ))}
              </div>
            </div>
          </div>

          {/* Image Side - Creative Shape */}
          <div className="flex-shrink-0 relative w-full max-w-[300px] md:max-w-none md:w-[450px] aspect-[4/5] flex justify-center items-center">
            {/* Abstract Background Lines/Glows */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-purple-500/20 blur-[60px] rounded-full -z-10 animate-pulse"></div>
            <div className="absolute top-4 right-4 md:top-10 md:right-10 w-full h-full border border-white/10 rounded-[60px] md:rounded-[100px] rounded-tr-[30px] md:rounded-tr-[40px] -z-10 rotate-6"></div>

            <img
              src={optimizedAvatar}
              alt="Profile"
              width={450}
              height={562}
              fetchPriority="high"
              className="w-full h-full object-cover rounded-[60px] md:rounded-[100px] rounded-tr-[30px] md:rounded-tr-[40px] shadow-2xl ring-1 ring-white/10 z-10"
            />

            {/* Floating Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full blur-2xl opacity-40"></div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "glassmorphism_vibrant" || variant === "glassmorphism_dark") {
    const isVibrant = variant === "glassmorphism_vibrant";

    return (
      <div className="relative overflow-hidden py-16 md:py-24 px-8 md:px-12 rounded-[2rem] bg-clip-padding backdrop-filter backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-500 hover:shadow-indigo-500/10"
        style={{
          backgroundColor: isVibrant ? 'rgba(99, 102, 241, 0.05)' : 'rgba(15, 23, 42, 0.4)',
          borderColor: isVibrant ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'
        }}>

        {/* Dynamic Background Effects */}
        <div className={`absolute -top-24 -left-24 w-96 h-96 rounded-full blur-[100px] -z-10 animate-pulse ${isVibrant ? 'bg-indigo-500/20' : 'bg-slate-800/30'}`} />
        <div className={`absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[100px] -z-10 animate-pulse delay-700 ${isVibrant ? 'bg-purple-500/20' : 'bg-indigo-900/20'}`} />

        <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 relative z-10 ${alignClass}`}>
          <div className="flex-1 space-y-6 md:space-y-8 w-full">
            <h1 className={`${style?.titleSize || "text-5xl md:text-7xl"} font-black tracking-tighter leading-none break-words ${isVibrant ? 'text-white' : 'text-slate-100'}`}
              style={{ color: style?.titleColor }}>
              {heading}
            </h1>
            <p className={`text-lg md:text-xl font-medium leading-relaxed max-w-2xl break-words ${isVibrant ? 'text-indigo-100/80' : 'text-slate-400'}`}
              style={{ color: style?.subtitleColor }}>
              {subheading}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {ctaButtons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.url}
                  className={`px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95 ${btn.variant === "primary"
                    ? "bg-white text-indigo-900 shadow-xl"
                    : "border border-white/20 text-white hover:bg-white/10"
                    }`}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          </div>
          <div className="flex-shrink-0 relative group">
            <div className={`absolute -inset-1 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${isVibrant ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-white'}`} />
            <img
              src={optimizedAvatar}
              alt="Avatar"
              width={256}
              height={256}
              fetchPriority="high"
              className="relative w-48 h-48 md:w-64 md:h-64 rounded-[2rem] object-cover ring-1 ring-white/20 shadow-2xl transition duration-500 group-hover:scale-[1.02] aspect-square"
            />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "pixel") {
    const pixelFont = "'Press Start 2P', monospace";
    return (
      <div className="relative bg-[#0a0a2e] border-[3px] border-[#00ff41] p-8 md:p-12 overflow-hidden"
        style={{ boxShadow: '0 0 20px rgba(0, 255, 65, 0.15)' }}>
        {/* Corner decorations */}
        <span className="absolute top-2 left-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
        <span className="absolute top-2 right-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
        <span className="absolute bottom-2 left-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>
        <span className="absolute bottom-2 right-3 text-[#00ff41]/40 text-xs select-none" style={{ fontFamily: pixelFont }}>+</span>

        <div className="flex flex-col items-center gap-8 relative z-10">
          {/* Avatar */}
          <div className="relative">
            <div className="w-28 h-28 md:w-36 md:h-36 border-[3px] border-[#00ff41] bg-[#1a1a4e] p-1 shadow-[4px_4px_0px_0px_#00ff41]">
              <img
                src={optimizedAvatar}
                alt="Avatar"
                width={144}
                height={144}
                fetchPriority="high"
                className="w-full h-full object-cover"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          </div>

          {/* Name */}
          <div className="text-center space-y-4">
            <h1
              className="text-lg md:text-2xl text-[#00ff41] uppercase leading-relaxed tracking-wider"
              style={{ fontFamily: pixelFont, color: style?.titleColor || '#00ff41' }}
            >
              {heading}
            </h1>
            <p
              className="text-[10px] md:text-xs text-[#00ff41]/60 uppercase tracking-[0.3em]"
              style={{ fontFamily: pixelFont, color: style?.subtitleColor }}
            >
              {subheading}
            </p>
          </div>

          {/* CTA Buttons */}
          {ctaButtons.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              {ctaButtons.map((btn, idx) => (
                <a
                  key={idx}
                  href={btn.url}
                  className={`px-6 py-3 text-[8px] md:text-[10px] uppercase tracking-widest border-2 border-[#00ff41] transition-all hover:-translate-y-0.5 ${btn.variant === "primary"
                    ? "bg-[#00ff41] text-[#0a0a2e]"
                    : "bg-transparent text-[#00ff41] hover:bg-[#00ff41]/10"
                    }`}
                  style={{ fontFamily: pixelFont }}
                >
                  {btn.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.3) 2px, rgba(0,255,65,0.3) 4px)' }}
        />
      </div>
    );
  }

  if (variant === "newspaper") {
    const serifFont = "'Playfair Display', 'Georgia', serif";
    const bodyFont = "'Lora', 'Georgia', serif";
    return (
      <div className="bg-[#faf7f2] border border-[#2c2c2c] p-8 md:p-12 relative">
        <div className="absolute top-4 left-4 text-[10px] text-[#2c2c2c]/60 font-medium uppercase tracking-widest" style={{ fontFamily: bodyFont }}>
          ESTABLISHED 2024 • EDITION NO. 1
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8">
          <div className="md:col-span-8 space-y-6">
            <h1 className="text-4xl md:text-7xl font-black text-[#1a1a1a] leading-[0.9] uppercase tracking-tighter italic"
              style={{ fontFamily: serifFont, borderBottom: '1px solid #2c2c2c', paddingBottom: '1rem' }}>
              {heading}
            </h1>
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#2c2c2c]" style={{ fontFamily: bodyFont }}>
              <span className="bg-[#1a1a1a] text-[#faf7f2] px-2 py-0.5">LATEST</span>
              <span>{subheading}</span>
            </div>
            <div className="text-base md:text-lg text-[#1a1a1a] leading-relaxed max-w-2xl italic" style={{ fontFamily: bodyFont }}>
              Building the future with rule-governed design and high-end typography.
            </div>
            {ctaButtons.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-4">
                {ctaButtons.map((btn, idx) => (
                  <a
                    key={idx}
                    href={btn.url}
                    className={`px-8 py-3 text-xs uppercase tracking-[0.2em] font-black border border-[#2c2c2c] transition-all ${btn.variant === "primary"
                        ? "bg-[#1a1a1a] text-[#faf7f2]"
                        : "bg-transparent text-[#1a1a1a] hover:bg-[#1a1a1a]/5"
                      }`}
                    style={{ fontFamily: serifFont }}
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="md:col-span-4">
            <div className="aspect-[4/5] border border-[#2c2c2c] p-2 relative">
              <div className="w-full h-full overflow-hidden grayscale contrast-125">
                <img
                  src={optimizedAvatar}
                  alt="Editor"
                  width={300}
                  height={375}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-2 bg-[#faf7f2] border border-[#2c2c2c] px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-[#1a1a1a]">
                EDITORIAL PORTRAIT
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-[#2c2c2c] pt-4 text-[10px] text-[#2c2c2c]/40 font-medium uppercase tracking-[0.3em] text-center">
          © {new Date().getFullYear()} ALL THE CODE THAT'S FIT TO SHIP
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col ${alignClass} text-slate-950 dark:text-white`}
    >
      <img
        src={optimizedAvatar}
        alt="Avatar"
        width={96}
        height={96}
        fetchPriority="high"
        className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-slate-100 dark:border-white/20 shadow-lg mb-4 md:mb-6 object-cover aspect-square"
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
