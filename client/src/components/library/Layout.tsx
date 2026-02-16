import React from "react";

interface LayoutProps {
  direction: "row" | "col";
  gap: string;
  padding: string;
  items: any[];
  renderItem?: (item: any, index: number) => React.ReactNode;
  variant?: 'default' | 'bento';
}

const Layout: React.FC<LayoutProps> = ({
  direction = "col",
  gap = "",
  padding = "0",
  items = [],
  renderItem,
  variant = 'default',
}) => {
  const directionClass = direction === "row" ? "flex-row" : "flex-col";

  // Safety check for recursive rendering
  if (!items || !Array.isArray(items)) return null;

  if (variant === 'bento') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-12 gap-0 w-full`}>
        {items.map((item, index) => {
          // Calculate col span based on item props or default to full width
          // This logic might need to be more sophisticated based on content type
          // For now, we'll assume the rendering engine or parent passes explicit col spans if needed
          // or we default to a smart layout

          // Simple heuristic: If 3 items, 4 cols each. If 2 items, 6 cols each.
          let colSpan = "md:col-span-12";
          if (items.length === 2) colSpan = "md:col-span-6";
          if (items.length === 3) colSpan = "md:col-span-4";
          if (items.length === 4) colSpan = "md:col-span-3";

          // Override if item has a preferred span (this would require updating schemas too, 
          // but for now we can infer or hardcode for specific types like 'nav' or 'footer' to be full width)

          return (
            <div
              key={item.id || index}
              className={`${colSpan} relative border-b border-r border-[#2c2c2c] border-dashed p-${padding}`}
              style={{ borderColor: 'rgba(0,0,0,0.2)' }}
            >
              {/* Grid Crosses for Bento feel */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 text-[#2c2c2c] pointer-events-none z-10 opacity-20">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0V24M0 12H24" stroke="currentColor" strokeWidth="2" /></svg>
              </div>

              {renderItem ? renderItem(item, index) : null}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className={`flex ${directionClass} gap-${gap} p-${padding} w-full flex-wrap md:flex-nowrap`}
    >
      {items.map((item, index) => (
        <div
          key={item.id || index}
          className={direction === "row" ? "flex-1" : "w-full"}
        >
          {renderItem ? renderItem(item, index) : null}
        </div>
      ))}
    </div>
  );
};

export default Layout;
