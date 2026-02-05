import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useSite } from '../../context/useSite';

interface ThemeToggleProps {
    variant?: 'floating' | 'inline' | 'minimal';
    className?: string; // Add className prop
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = 'floating', className = '' }) => {
    const { siteConfig, updateSiteSettings } = useSite();
    const isDark = siteConfig.site_settings.theme.darkMode;

    const toggleTheme = () => {
        updateSiteSettings("theme.darkMode", !isDark);
    };

    // Determine positioning: default to 'fixed' unless 'absolute' or 'relative' is passed in className
    const positionClass = className.includes('absolute') || className.includes('relative')
        ? ''
        : 'fixed';

    const containerClasses = variant === 'floating'
        ? `${positionClass} bottom-8 right-8 z-[100] ${className}`
        : `flex items-center justify-center py-4 ${className}`;

    if (variant === 'minimal') {
        return (
            <button
                onClick={toggleTheme}
                className={`${positionClass} bottom-8 right-8 z-[100] w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-90 ${className}`}
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        )
    }

    return (
        <div className={containerClasses}>
            <button
                onClick={toggleTheme}
                className="w-14 h-14 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-[1.5rem] shadow-[0_10px_30px_-5px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] transition-all active:scale-95 flex items-center justify-center group pointer-events-auto"
                title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
                <div className="relative w-6 h-6">
                    <Sun
                        className={`absolute inset-0 transition-all duration-500 ${isDark ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100 text-amber-500'}`}
                        size={24}
                    />
                    <Moon
                        className={`absolute inset-0 transition-all duration-500 ${isDark ? 'rotate-0 scale-100 opacity-100 text-indigo-400' : '-rotate-90 scale-0 opacity-0'}`}
                        size={24}
                    />
                </div>
            </button>
        </div>
    );
};

export default ThemeToggle;
