import React from "react";

interface SectionProps {
    items?: any[];
    renderItem?: (item: any, index: number) => React.ReactNode;
    children?: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ items = [], renderItem, children }) => {
    return (
        <div className="w-full">
            {children}
            {items && items.map((item, index) => (
                <React.Fragment key={item.id || index}>
                    {renderItem ? renderItem(item, index) : null}
                </React.Fragment>
            ))}
        </div>
    );
};

export default Section;
