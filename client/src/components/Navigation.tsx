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
  };
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
}) => {
  // Determine text color classes and inline styles for the "Portfolio" text and links
  const portfolioTextColorClass =
    styles?.textColor && !isDirectCssColorValue(styles.textColor)
      ? styles.textColor
      : "text-gray-800";
  const portfolioTextStyle =
    styles?.textColor && isDirectCssColorValue(styles.textColor)
      ? { color: styles.textColor }
      : {};

  const linkTextColorClass =
    styles?.textColor && !isDirectCssColorValue(styles.textColor)
      ? styles.textColor
      : "text-gray-600";
  const linkTextStyle =
    styles?.textColor && isDirectCssColorValue(styles.textColor)
      ? { color: styles.textColor }
      : {};

  // Determine button styles
  const buttonTextColorClass =
    styles?.textColor && !isDirectCssColorValue(styles.textColor)
      ? styles.textColor
      : "text-white";
  const buttonTextColorStyle =
    styles?.textColor && isDirectCssColorValue(styles.textColor)
      ? { color: styles.textColor }
      : {};

  const buttonBackgroundColorClass =
    styles?.backgroundColor && !isDirectCssColorValue(styles.backgroundColor)
      ? styles.backgroundColor
      : "bg-indigo-600 hover:bg-indigo-700";
  const buttonBackgroundColorStyle =
    styles?.backgroundColor && isDirectCssColorValue(styles.backgroundColor)
      ? { backgroundColor: styles.backgroundColor }
      : {};

  const buttonBorderClass =
    styles?.borderColor && !isDirectCssColorValue(styles.borderColor)
      ? `border ${styles.borderColor}` // Apply Tailwind border class
      : styles?.borderColor // If it's a direct CSS color, just add 'border' class to establish border properties
        ? "border"
        : "";
  const buttonBorderStyle =
    styles?.borderColor && isDirectCssColorValue(styles.borderColor)
      ? {
          borderColor: styles.borderColor,
          borderWidth: "1px",
          borderStyle: "solid",
        } // Apply direct CSS border properties
      : {};

  return (
    <nav className="flex items-center justify-between py-4">
      <div
        className={`text-xl font-bold ${portfolioTextColorClass}`}
        style={portfolioTextStyle}
      >
        Portfolio
      </div>
      <div className="flex items-center gap-6">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.url}
            className={`text-sm font-medium transition-colors ${linkTextColorClass} hover:text-indigo-600`}
            style={linkTextStyle}
          >
            {link.label}
          </a>
        ))}
        {showResumeButton && (
          <button
            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${buttonTextColorClass} ${buttonBorderClass} ${buttonBackgroundColorClass}`}
            style={{
              ...buttonTextColorStyle,
              ...buttonBackgroundColorStyle,
              ...buttonBorderStyle,
            }}
          >
            Resume
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
