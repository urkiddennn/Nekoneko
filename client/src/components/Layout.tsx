import React from 'react';

interface LayoutProps {
    direction: 'row' | 'col';
    gap: string;
    padding: string;
    items: any[];
    renderItem?: (item: any, index: number) => React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ direction = 'col', gap = '4', padding = '4', items = [], renderItem }) => {
    const directionClass = direction === 'row' ? 'flex-row' : 'flex-col';

    // Safety check for recursive rendering
    if (!items || !Array.isArray(items)) return null;

    return (
        <div className={`flex ${directionClass} gap-${gap} p-${padding} w-full`}>
            {items.map((item, index) => (
                <div key={item.id || index} className={direction === 'row' ? 'flex-1' : 'w-full'}>
                    {renderItem ? renderItem(item, index) : null}
                </div>
            ))}
        </div>
    );
};

export default Layout;
