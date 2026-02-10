export const image_slider = {
    type: "image_slider",
    category: "Media",
    description: "High-end image carousel.",
    details: "A smooth image slider with support for captions, auto-play, and multiple transition effects.",
    example: {
        id: "slider-1",
        type: "image_slider",
        props: {
            images: [
                { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", caption: "Deep Work" },
                { url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80", caption: "Modern Architecture" },
                { url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80", caption: "Studio Space" },
            ],
            transitionType: "slide",
            autoPlay: true,
            interval: 5000,
            variant: "minimal",
        },
        styles: { padding: "py-12", borderRadius: "rounded-[32px]" },
    },
    props: [
        { name: "images", type: "array", desc: "List of {url, caption} images." },
        { name: "transitionType", type: '"slide" | "fade"', desc: "Swipe or cross-fade." },
        { name: "autoPlay", type: "boolean", desc: "Enable auto-cycling." },
        { name: "interval", type: "number", desc: "Ms between slides." },
        { name: "variant", type: '"minimal" | "brutalist" | "glassmorphism"', desc: "Design aesthetic." },
    ],
    variants: [
        {
            name: "Minimal",
            description: "Thin lines and clean typography.",
            example: {
                id: "slider-minimal",
                type: "image_slider",
                props: { variant: "minimal", transitionType: "slide", autoPlay: true },
            },
        },
        {
            name: "Brutalist",
            description: "Bold borders and high-impact shadows.",
            example: {
                id: "slider-brutalist",
                type: "image_slider",
                props: { variant: "brutalist", transitionType: "slide" },
            },
        },
        {
            name: "Glassmorphism",
            description: "Translucent controls and modern blur effects.",
            example: {
                id: "slider-glass",
                type: "image_slider",
                props: { variant: "glassmorphism", transitionType: "fade" },
            },
        },
    ],
};
