import React from 'react';

interface ImageComponentProps {
    src: string;
    alt?: string;
    caption?: string;
    className?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt = 'Image', caption }) => {
    return (
        <div className="flex flex-col items-center">
            <img
                src={src}
                alt={alt}
                className="max-w-full h-auto rounded-2xl shadow-lg border border-white/10"
                loading="lazy"
            />
            {caption && (
                <p className="mt-3 text-sm text-slate-400 font-medium italic text-center max-w-lg">
                    {caption}
                </p>
            )}
        </div>
    );
};

export default ImageComponent;
