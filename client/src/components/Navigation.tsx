import React from 'react';

interface Link {
    label: string;
    url: string;
}

interface NavigationProps {
    links: Link[];
    showResumeButton: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ links, showResumeButton }) => {
    return (
        <nav className="flex items-center justify-between py-4">
            <div className="text-xl font-bold text-gray-800">Portfolio</div>
            <div className="flex items-center gap-6">
                {links.map((link, idx) => (
                    <a key={idx} href={link.url} className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                        {link.label}
                    </a>
                ))}
                {showResumeButton && (
                    <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-lg hover:bg-indigo-700 transition-colors">
                        Resume
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
