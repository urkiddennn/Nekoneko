import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react';

interface SliderImage {
    url: string;
    caption?: string;
}

interface ImageSliderProps {
    images?: SliderImage[];
    transitionType?: 'slide' | 'fade';
    autoPlay?: boolean;
    interval?: number;
    variant?: 'minimal' | 'brutalist' | 'glassmorphism';
}

const DEFAULT_IMAGES = [
    { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", caption: "Premium Architectural Design" },
    { url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80", caption: "Advanced Engineering" },
    { url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80", caption: "Modern Workspace" }
];

const ImageSlider: React.FC<ImageSliderProps> = ({
    images: propImages,
    transitionType = 'slide',
    autoPlay = true,
    interval = 5000,
    variant = 'minimal'
}) => {
    const images = propImages && propImages.length > 0 ? propImages : DEFAULT_IMAGES;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    console.log("ImageSlider Render:", { imagesCount: images.length, variant, transitionType });

    const nextSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        setTimeout(() => setIsAnimating(false), 500);
    }, [images.length, isAnimating]);

    const prevSlide = useCallback(() => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        setTimeout(() => setIsAnimating(false), 500);
    }, [images.length, isAnimating]);

    useEffect(() => {
        if (autoPlay && images.length > 1) {
            const timer = setInterval(nextSlide, interval);
            return () => clearInterval(timer);
        }
    }, [autoPlay, interval, nextSlide, images.length]);

    const isBrutalist = variant === 'brutalist';
    const isGlass = variant === 'glassmorphism';

    return (
        <div className={`relative w-full group overflow-hidden ${isBrutalist ? 'border-[3px] border-slate-950 shadow-[8px_8px_0px_0px_rgba(2,6,23,1)]' : 'rounded-[2rem]'}`}>
            {/* Slides */}
            <div className="relative aspect-video min-h-[400px] w-full overflow-hidden bg-slate-200">
                {images.map((image, index) => {
                    const isActive = index === currentIndex;
                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out
                                ${transitionType === 'fade'
                                    ? (isActive ? 'opacity-100' : 'opacity-0 pointer-events-none')
                                    : (isActive ? 'translate-x-0' : index < currentIndex ? '-translate-x-full' : 'translate-x-full')
                                }
                            `}
                        >
                            <img
                                src={image.url}
                                alt={image.caption || `Slide ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            {image.caption && (
                                <div className={`absolute bottom-0 left-0 right-0 p-8 ${isGlass ? 'bg-black/20 backdrop-blur-md' : 'bg-gradient-to-t from-black/60 to-transparent'}`}>
                                    <p className="text-white font-bold text-xl drop-shadow-sm uppercase tracking-tight italic">
                                        {image.caption}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Controls */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prevSlide}
                        className={`absolute left-4 top-1/2 -translate-y-1/2 p-3 transition-all opacity-0 group-hover:opacity-100
                            ${isBrutalist
                                ? 'bg-white border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:translate-x-1'
                                : isGlass
                                    ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
                                    : 'bg-white/90 rounded-full shadow-lg hover:bg-white'
                            }
                        `}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 transition-all opacity-0 group-hover:opacity-100
                            ${isBrutalist
                                ? 'bg-white border-2 border-slate-950 shadow-[4px_4px_0px_0px_rgba(2,6,23,1)] hover:-translate-x-1'
                                : isGlass
                                    ? 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
                                    : 'bg-white/90 rounded-full shadow-lg hover:bg-white'
                            }
                        `}
                    >
                        <ChevronRight size={24} />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`transition-all duration-300 ${index === currentIndex ? 'scale-125' : 'scale-100 opacity-50'}`}
                            >
                                <Circle
                                    size={10}
                                    fill={index === currentIndex ? (isGlass ? 'white' : '#6366f1') : 'transparent'}
                                    className={isGlass ? 'text-white' : 'text-slate-400'}
                                />
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageSlider;
