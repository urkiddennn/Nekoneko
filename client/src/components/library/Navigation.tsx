import React from "react";

interface Link {
  label: string;
  url: string;
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
  variant?: "default" | "minimal" | "brutalist" | "outline_minimal";
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
}) => {
  const isBrutalist = variant === "brutalist";
  const isOutlineMinimal = variant === "outline_minimal";
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
  const baseColorClass = !styles?.textColor ? "text-slate-950 dark:text-white" : "";

  // Determine button styles - Button should generally keep its own contrast
  const buttonTextColorClass = "text-white";

  // Allow user to override button background
  const buttonBackgroundColorClass =
    styles?.buttonBackgroundColor && !isDirectCssColorValue(styles.buttonBackgroundColor)
      ? styles.buttonBackgroundColor
      : !styles?.buttonBackgroundColor ? "bg-indigo-600 hover:bg-indigo-700" : "";

  const buttonBackgroundColorStyle =
    styles?.buttonBackgroundColor && isDirectCssColorValue(styles.buttonBackgroundColor)
      ? { backgroundColor: styles.buttonBackgroundColor }
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

  return (
    <nav
      className={`relative ${navTextColorClass} ${baseColorClass} 
        ${isBrutalist ? "border-[3px] border-slate-950 dark:border-white rounded-2xl px-8 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-slate-900"
          : isOutlineMinimal ? "border border-slate-950 dark:border-white rounded-none px-6 bg-white dark:bg-slate-950"
            : ""}`}
      style={navTextStyle}
    >
      <div className="flex items-center justify-between py-4">
        <div className="text-xl font-bold">
          Portfolio
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 -mr-2 text-inherit"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              className="text-sm font-medium transition-colors hover:text-indigo-600 opacity-80 hover:opacity-100 text-inherit"
            >
              {link.label}
            </a>
          ))}
          {showResumeButton && (
            <button
              className={`px-4 py-2 text-sm font-semibold transition-colors ${buttonTextColorClass} ${buttonBorderClass} ${buttonBackgroundColorClass} ${isOutlineMinimal ? 'rounded-none uppercase tracking-tighter transition-all hover:bg-slate-950 hover:text-white dark:hover:bg-white dark:hover:text-black' : 'rounded-lg'}`}
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
          {links.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              className="block py-2 text-base font-medium transition-colors hover:text-indigo-600 text-inherit"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {showResumeButton && (
            <button
              className={`w-full py-3 text-sm font-semibold transition-colors ${buttonTextColorClass} ${buttonBorderClass} ${buttonBackgroundColorClass} ${isOutlineMinimal ? 'rounded-none uppercase tracking-tighter' : 'rounded-lg'}`}
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
