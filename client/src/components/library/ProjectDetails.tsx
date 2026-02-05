import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ProjectDetailsProps {
    title: string;
    description: string;
    stacks?: string[];
    link?: string;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({
    title = "Project Title",
    description = "This is a detailed description of the project.",
    stacks = [],
    link
}) => {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
            <div className="flex-1">
                <h3 className="text-2xl font-black tracking-tighter text-gray-900 group-hover:text-black transition-colors mb-3 leading-none">
                    {title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {description}
                </p>
                {stacks.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                        {stacks.map((stack, idx) => (
                            <span
                                key={idx}
                                className="px-2.5 py-1 bg-gray-50 border border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400 rounded-md"
                            >
                                {stack}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            {link && (
                <div className="pt-6 border-t border-gray-50">
                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-900 hover:text-black transition-colors group/link"
                    >
                        Visit Link
                        <ExternalLink size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
