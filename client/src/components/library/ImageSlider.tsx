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
    variant?: 'minimal' | 'brutalist' | 'glassmorphism' | 'impact' | 'fullscreen';
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
    const isImpact = variant === 'impact';
    const isFullscreen = variant === 'fullscreen';

    if (isImpact) {
        return (
            <div className="relative w-full overflow-hidden">
                <div className="relative aspect-[21/9] min-h-[500px] w-full overflow-hidden bg-slate-950">
                    {images.map((image, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <div
                                key={index}
                                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-out
                                    ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}
                                `}
                            >
                                <img
                                    src={image.url}
                                    alt={image.caption || `Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
                            </div>
                        );
                    })}

                    {/* Counter + Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-12 flex items-end justify-between z-10">
                        <div className="space-y-4">
                            <span className="text-8xl md:text-9xl font-black text-white/10 leading-none tabular-nums">
                                {String(currentIndex + 1).padStart(2, '0')}
                            </span>
                            {images[currentIndex]?.caption && (
                                <p className="text-2xl font-black text-white uppercase tracking-tight">
                                    {images[currentIndex].caption}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center gap-4">
                            <button
                                onClick={prevSlide}
                                className="w-14 h-14 flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-slate-950 transition-all"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="w-14 h-14 flex items-center justify-center border-2 border-white text-white hover:bg-white hover:text-slate-950 transition-all"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                        <div
                            className="h-full bg-[#ff5a5f] transition-all duration-500"
                            style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        );
    }

    if (isFullscreen) {
        return (
            <div className="relative w-full overflow-hidden px-0">
                <div className="relative aspect-video min-h-[500px] w-full overflow-hidden bg-slate-950">
                    {images.map((image, index) => {
                        const isActive = index === currentIndex;
                        return (
                            <div
                                key={index}
                                className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-out
                                    ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                                `}
                            >
                                <img
                                    src={image.url}
                                    alt={image.caption || `Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>
                        );
                    })}

                    {/* Minimal overlay controls */}
                    <div className="absolute inset-0 flex items-center justify-between px-6 z-10 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 flex items-center justify-center bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-all"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 flex items-center justify-center bg-black/30 backdrop-blur-sm text-white rounded-full hover:bg-black/50 transition-all"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Bottom caption + dots */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/60 to-transparent z-10">
                        <div className="flex items-end justify-between">
                            {images[currentIndex]?.caption && (
                                <p className="text-lg font-bold text-white">
                                    {images[currentIndex].caption}
                                </p>
                            )}
                            <div className="flex gap-2">
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-1 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-8 bg-white' : 'w-4 bg-white/40'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

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
