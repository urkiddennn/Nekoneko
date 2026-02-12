import React from "react";
import { useSite } from "../../context/useSite";

interface Link {
  label: string;
  url?: string;
  href?: string; // Backward compatibility
}
interface NavigationProps {
  links: Link[];
  showResumeButton: boolean;
  styles?: {
    textColor?: string;
    borderColor?: string;
    backgroundColor?: string;
    buttonBackgroundColor?: string;
  };
  variant?:
  | "default"
  | "minimal"
  | "brutalist"
  | "outline_minimal"
  | "impact"
  | "glassmorphism"
  | "connected_line"
  | "creative_gradient"
  | "pixel"
  | "newspaper";
  padding?: string;
}

// Helper function to determine if a string is a direct CSS color value
const isDirectCssColorValue = (value?: string) =>
  value &&
  (value.startsWith("#") ||
    value.startsWith("rgb") ||
    value.startsWith("hsl") ||
    value.startsWith("var("));

const Navigation: React.FC<NavigationProps> = ({
  links,
  showResumeButton,
  styles,
  variant = "default",
  padding,
}) => {
  const { siteConfig } = useSite();
  const primaryColor = siteConfig.site_settings.theme.primary || "#6366f1";
  const isBrutalist = variant === "brutalist";
  const isOutlineMinimal = variant === "outline_minimal";
  const isImpact = variant === "impact";
  // this is for Glassmorphism
  const isGlassmorphism = variant === "glassmorphism";
  // Determine general text color (class or inline style)
  const navTextColorClass =
    styles?.textColor && !isDirectCssColorValue(styles.textColor)
      ? styles.textColor
      : ""; // Default inheritance or nothing (falls back to parent/default)

  const navTextStyle =
    styles?.textColor && isDirectCssColorValue(styles.textColor)
      ? { color: styles.textColor }
      : {};

  // Default color if nothing specified (applied to nav to cascade)
  const baseColorClass = !styles?.textColor
    ? "text-slate-950 dark:text-white"
    : "";

  // Determine button styles - Button should generally keep its own contrast
  const buttonTextColorClass = "text-white";
  const buttonBackgroundColorClass =
    styles?.buttonBackgroundColor &&
      !isDirectCssColorValue(styles.buttonBackgroundColor)
      ? styles.buttonBackgroundColor
      : "";

  const buttonBackgroundColorStyle: React.CSSProperties =
    styles?.buttonBackgroundColor &&
      isDirectCssColorValue(styles.buttonBackgroundColor)
      ? { backgroundColor: styles.buttonBackgroundColor }
      : !styles?.buttonBackgroundColor
        ? { backgroundColor: primaryColor }
        : {};

  const buttonBorderClass =
    styles?.borderColor && !isDirectCssColorValue(styles.borderColor)
      ? `border ${styles.borderColor}`
      : isBrutalist
        ? "border-[3px] border-slate-950 dark:border-white shadow-[2px_2px_0px_0px_rgba(2,6,23,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
        : isOutlineMinimal
          ? "border border-slate-950 dark:border-white rounded-none"
          : styles?.borderColor
            ? "border"
            : isImpact
              ? "border-none"
              : isGlassmorphism
                ? "bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100"
                : "";

  const buttonBorderStyle =
    styles?.borderColor && isDirectCssColorValue(styles.borderColor)
      ? {
        borderColor: styles.borderColor,
        borderWidth: "1px",
        borderStyle: "solid",
      }
      : {};

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    url?: string,
  ) => {
    // Check if it's an anchor link (starts with # or is just a plain string without / or :)
    if (url && !url.includes(":") && !url.includes("/")) {
      const id = url.startsWith("#") ? url.slice(1) : url;
      const element = document.getElementById(id);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: "smooth" });
        // Update URL hash without reload
        window.history.pushState(null, "", `#${id}`);
        setIsMenuOpen(false);
      }
    }
  };

  // Helper to get the link URL (supports both 'url' and 'href' for backward compatibility)
  const getLinkUrl = (link: Link): string => {
    const linkUrl = link.url || link.href || "#";
    // Normalize anchor links
    if (linkUrl && !linkUrl.includes(":") && !linkUrl.includes("/")) {
      return linkUrl.startsWith("#") ? linkUrl : `#${linkUrl}`;
    }
    return linkUrl;
  };

  if (variant === "pixel") {
    const pixelFont = "'Press Start 2P', monospace";
    return (
      <nav className={`relative bg-[#0a0a2e] border-[3px] px-6 ${padding || 'py-3'} overflow-hidden`}
        style={{ boxShadow: `0 0 20px ${primaryColor}26`, borderColor: primaryColor }}>
        <span className="absolute top-1 left-2 text-[8px] select-none opacity-40" style={{ fontFamily: pixelFont, color: primaryColor }}>+</span>
        <span className="absolute top-1 right-2 text-[8px] select-none opacity-40" style={{ fontFamily: pixelFont, color: primaryColor }}>+</span>
        <div className="flex items-center justify-between">
          <div className="text-xs uppercase tracking-wider" style={{ fontFamily: pixelFont, color: primaryColor }}>Portfolio</div>
          <button className="md:hidden p-2" style={{ color: primaryColor }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>}
            </svg>
          </button>
          <div className="hidden md:flex items-center gap-6">
            {links.map((link, idx) => (
              <a key={idx} href={getLinkUrl(link)} onClick={(e) => handleLinkClick(e, link.url || link.href)}
                className="text-[8px] uppercase tracking-widest transition-colors"
                style={{ fontFamily: pixelFont, color: `${primaryColor}b3` }}>
                {link.label}
              </a>
            ))}
            {showResumeButton && (
              <button className="px-4 py-2 text-[8px] uppercase tracking-widest border-2 bg-transparent transition-all"
                style={{ fontFamily: pixelFont, cursor: 'pointer', backgroundColor: primaryColor, color: '#0a0a2e', borderColor: primaryColor }}>Resume</button>
            )}
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 flex flex-col gap-3">
            {links.map((link, idx) => (
              <a key={idx} href={getLinkUrl(link)} onClick={(e) => handleLinkClick(e, link.url || link.href)}
                className="text-[8px] uppercase tracking-widest block py-1"
                style={{ fontFamily: pixelFont, color: `${primaryColor}b3` }}>{link.label}</a>
            ))}
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, ${primaryColor}4d 2px, ${primaryColor}4d 4px)` }} />
      </nav>
    );
  }

  if (variant === "newspaper") {
    const serifFont = "'Playfair Display', 'Georgia', serif";
    return (
      <nav className={`bg-[#faf7f2] border-y border-[#2c2c2c] px-6 ${padding || 'py-4'}`}>
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl font-black uppercase tracking-tighter text-[#1a1a1a]" style={{ fontFamily: serifFont, borderBottom: '3px double #2c2c2c', paddingBottom: '4px' }}>
            Portfolio
          </div>
          <div className="flex items-center justify-between w-full border-t border-[#2c2c2c] pt-2">
            <div className="hidden md:flex items-center gap-8 mx-auto">
              {links.map((link, idx) => (
                <a key={idx} href={getLinkUrl(link)} onClick={(e) => handleLinkClick(e, link.url || link.href)}
                  className="text-[10px] text-[#1a1a1a] uppercase tracking-[0.2em] font-bold hover:italic transition-all"
                >
                  {link.label}
                </a>
              ))}
              {showResumeButton && (
                <button className="text-[10px] text-[#1a1a1a] uppercase tracking-[0.2em] font-bold border border-[#2c2c2c] px-4 py-1 hover:bg-[#1a1a1a] hover:text-[#faf7f2] transition-colors"
                  style={{ cursor: 'pointer' }}>Resume</button>
              )}
            </div>
            <button className="md:hidden p-2 text-[#1a1a1a]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {isMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>}
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 flex flex-col items-center gap-3 border-t border-[#2c2c2c] mt-2">
            {links.map((link, idx) => (
              <a key={idx} href={getLinkUrl(link)} onClick={(e) => handleLinkClick(e, link.url || link.href)}
                className="text-[10px] text-[#1a1a1a] uppercase tracking-[0.2em] font-bold py-1"
              >{link.label}</a>
            ))}
          </div>
        )}
      </nav>
    );
  }

  return (
    <nav
      className={`relative ${navTextColorClass} ${baseColorClass}
        ${isBrutalist
          ? "border-[3px] border-slate-950 dark:border-white rounded-2xl px-8 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-slate-900"
          : isOutlineMinimal
            ? "border border-slate-950 dark:border-white rounded-none px-6 bg-white dark:bg-slate-950"
            : isGlassmorphism
              ? "bg-gray-200 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100 px-3"
              : variant === "connected_line"
                ? "bg-[#13131f] border-b border-slate-800 px-8 py-4"
                : variant === "creative_gradient"
                  ? "bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-12 py-4 my-4 mx-auto max-w-fit"
                  : ""
        } ${padding || ''}`}
      style={navTextStyle}
    >
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">Portfolio</div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 -mr-2 text-inherit"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link, idx) => {
            const linkUrl = getLinkUrl(link);
            return (
              <a
                key={idx}
                href={linkUrl}
                onClick={(e) => handleLinkClick(e, link.url || link.href)}
                className={`text-sm tracking-widest transition-colors opacity-80 hover:opacity-100 text-inherit ${isImpact || variant === "connected_line" ? "font-black uppercase tracking-[0.2em]" : variant === "creative_gradient" ? "font-bold" : "font-medium"}`}
                style={{}}
                onMouseOver={(e) => e.currentTarget.style.color = primaryColor}
                onMouseOut={(e) => e.currentTarget.style.color = ''}
              >
                {link.label}
              </a>
            );
          })}
          {showResumeButton && (
            <button
              className={`px-4 py-2 text-sm font-semibold transition-colors ${buttonTextColorClass} ${buttonBorderClass} ${buttonBackgroundColorClass} ${isOutlineMinimal || variant === "connected_line" ? "rounded-none uppercase tracking-tighter transition-all hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-black" : isImpact || variant === "creative_gradient" ? "rounded-none uppercase tracking-widest font-black px-8 py-3" : "rounded-lg"}`}
              style={{
                ...buttonBackgroundColorStyle,
                ...buttonBorderStyle,
                cursor: "pointer",
              }}
            >
              Resume
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden pb-6 pt-2 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
          {links.map((link, idx) => {
            const linkUrl = getLinkUrl(link);
            return (
              <a
                key={idx}
                href={linkUrl}
                className="block py-2 text-base font-medium transition-colors text-inherit"
                style={{ color: '' }}
                onMouseOver={(e) => e.currentTarget.style.color = primaryColor}
                onMouseOut={(e) => e.currentTarget.style.color = ''}
                onClick={(e) => handleLinkClick(e, link.url || link.href)}
              >
                {link.label}
              </a>
            );
          })}
          {showResumeButton && (
            <button
              className={`w-full py-3 text-sm font-semibold transition-colors ${buttonTextColorClass} ${buttonBorderClass} ${buttonBackgroundColorClass} ${isOutlineMinimal ? "rounded-none uppercase tracking-tighter" : "rounded-lg"}`}
              style={{
                ...buttonBackgroundColorStyle,
                ...buttonBorderStyle,
                cursor: "pointer",
              }}
            >
              Resume
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
