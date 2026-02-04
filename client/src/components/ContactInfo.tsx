import React from 'react';
import * as Icons from 'lucide-react';

interface Link {
    label: string;
    url: string;
    icon: string;
}

interface ContactInfoProps {
    title?: string;
    description?: string;
    links: Link[];
    alignment?: 'left' | 'center' | 'right';
}

const ContactInfo: React.FC<ContactInfoProps> = ({
    title = "Get in touch",
    description,
    links = [],
    alignment = 'center'
}) => {
    const alignmentClasses = {
        left: 'items-start text-left',
        center: 'items-center text-center',
        right: 'items-end text-right'
    };

    return (
        <div className={`flex flex-col gap-6 w-full ${alignmentClasses[alignment]}`}>
            {title && (
                <h2 className="text-3xl font-black tracking-tighter text-gray-900 leading-none">
                    {title}
                </h2>
            )}
            {description && (
                <p className="text-sm text-gray-500 max-w-lg leading-relaxed">
                    {description}
                </p>
            )}
            <div className="flex flex-wrap gap-3">
                {links.map((link, idx) => {
                    const IconComponent = (Icons as any)[link.icon] || Icons.Link;
                    return (
                        <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white border border-gray-100 p-3 rounded-full text-gray-400 hover:text-gray-900 hover:border-gray-900 transition-all active:scale-95 group shadow-sm hover:shadow-md"
                            title={link.label}
                        >
                            <IconComponent size={20} className="group-hover:rotate-12 transition-transform" />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default ContactInfo;
