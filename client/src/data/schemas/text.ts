
export const text = {
    type: "text",
    label: "Text",
    category: "Content",
    description: "Versatile text component with various animations.",
    details: "A comprehensive text component supporting standard headings as well as advanced animations like reveals, typing effects, and masking.",
    props: [
        {
            name: "variant",
            type: '"default" | "text_reveal_lens" | "text_type_animation" | "animated_text_reveal" | "image_masked_text" | "ultimate_scroll_text" | "rolling_text"',
            desc: "Animation style.",
        },
        {
            name: "text",
            type: "string",
            desc: "Main text content.",
        },
        {
            name: "subText",
            type: "string",
            desc: "Optional subtitle text.",
        },
        {
            name: "image",
            type: "image",
            desc: "Background image for masked text variant.",
        },
        {
            name: "styles",
            type: "group",
            desc: "Styling options (color, size, alignment).",
        },
    ],
    common_styles: [
        { name: "color", type: "color", desc: "Text color." },
        { name: "fontSize", type: "select", desc: "Font size class." },
        { name: "textAlign", type: "select", desc: "Text alignment class." },
    ],
    variants: [
        {
            name: "Default",
            description: "Standard heading with subtitle.",
            example: {
                id: "text-default",
                type: "text",
                props: {
                    variant: "default",
                    text: "Welcome",
                    subText: "To our amazing site",
                    styles: {
                        color: "#000000",
                        fontSize: "text-6xl",
                        textAlign: "text-center",
                    },
                },
            },
        },
        {
            name: "Reveal Lens",
            description: "Text reveals with a blur effect.",
            example: {
                id: "text-lens",
                type: "text",
                props: {
                    variant: "text_reveal_lens",
                    text: "Focus",
                    styles: { fontSize: "text-8xl", textAlign: "text-center" },
                },
            },
        },
        {
            name: "Typewriter",
            description: "Simulates typing.",
            example: {
                id: "text-type",
                type: "text",
                props: {
                    variant: "text_type_animation",
                    text: "Coding is fun",
                    styles: { fontSize: "text-6xl" },
                },
            },
        },
        {
            name: "Animated Reveal",
            description: "Words stagger in.",
            example: {
                id: "text-reveal",
                type: "text",
                props: {
                    variant: "animated_text_reveal",
                    text: "The future is here",
                    styles: { fontSize: "text-6xl" },
                },
            },
        },
        {
            name: "Image Mask",
            description: "Text clipped to an image.",
            example: {
                id: "text-image-mask",
                type: "text",
                props: {
                    variant: "image_masked_text",
                    text: "NATURE",
                    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2898&auto=format&fit=crop",
                    styles: { fontSize: "text-9xl" },
                },
            },
        },
        {
            name: "Scroll Reveal",
            description: "Animates on scroll.",
            example: {
                id: "text-scroll",
                type: "text",
                props: {
                    variant: "ultimate_scroll_text",
                    text: "Scroll Down",
                    styles: { fontSize: "text-8xl" },
                },
            },
        },
        {
            name: "Rolling",
            description: "Marquee text.",
            example: {
                id: "text-rolling",
                type: "text",
                props: {
                    variant: "rolling_text",
                    text: "Breaking News ",
                    styles: { fontSize: "text-6xl" },
                },
            },
        },
    ],
};
