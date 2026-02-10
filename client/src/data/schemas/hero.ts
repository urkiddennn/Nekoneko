export const hero = {
    type: "hero",
    category: "Content",
    description: "Impactful section with image/heading.",
    details:
        "Large introductory section usually placed at the top of the page. specifies a main heading, subheading, and an optional avatar image. Now fully responsive with optimized mobile layouts.",
    example: {
        id: "hero-1",
        type: "hero",
        props: {
            heading: "The Future of Web",
            subheading: "Built with JSON",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg",
            alignment: "center",
            variant: "split",
            style: { titleColor: "#6366f1", titleSize: "text-8xl" },
        },
        styles: {
            padding: "py-32",
            maxWidth: "max-w-full",
            backgroundColor: "bg-slate-950",
        },
    },
    props: [
        {
            name: "heading",
            type: "string",
            desc: "Main headline text (supports line breaks).",
        },
        {
            name: "subheading",
            type: "string",
            desc: "Secondary descriptive text.",
        },
        {
            name: "avatarUrl",
            type: "url",
            desc: "URL for the profile/avatar image.",
        },
        { name: "alignment", type: '"left" | "center"', desc: "Text alignment." },
        {
            name: "variant",
            type: '"stack" | "split" | "invest" | "brutalist" | "outline_minimal" | "impact" | "glassmorphism" | "glassmorphism_vibrant" | "glassmorphism_dark" | "creative_gradient" | "connected_line" | "pixel"',
            desc: "Layout style.",
        },
        {
            name: "backgroundImageUrl",
            type: "url",
            desc: "Background image URL (for invest layout).",
        },
        {
            name: "topBadgeItems",
            type: "array",
            desc: "List of ticker items {label, value, logo, trend}.",
        },
        {
            name: "ctaButtons",
            type: "array",
            desc: "List of {label, url, variant} buttons.",
        },
        {
            name: "socialLinks",
            type: "array",
            desc: "List of {platform, url} for contact icons (creative_gradient).",
        },
    ],
    variants: [
        {
            name: "Default (Stack)",
            description: "Image above text.",
            example: {
                id: "hero-stack",
                type: "hero",
                props: {
                    heading: "Modern Identity",
                    subheading: "Crafting digital experiences.",
                    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg",
                    variant: "stack",
                },
            },
        },
        {
            name: "Split",
            description: "Side-by-side layout (stacks on mobile).",
            example: {
                id: "hero-split",
                type: "hero",
                props: {
                    heading: "The Future",
                    subheading: "Built with passion.",
                    avatarUrl: "https://api.dicebear.com/7.x/shapes/svg",
                    variant: "split",
                },
            },
        },
        {
            name: "Invest",
            description: "High-impact layout with background and ticker widgets.",
            example: {
                id: "hero-invest",
                type: "hero",
                props: {
                    heading: "INVEST SMARTER,\nGROW FASTER",
                    subheading: "Diversify your portfolio with confidence.",
                    backgroundImageUrl:
                        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
                    variant: "invest",
                    topBadgeItems: [
                        {
                            label: "Meta",
                            value: "488.48",
                            logo: "https://www.facebook.com/favicon.ico",
                            trend: "up",
                        },
                        {
                            label: "Nvidia",
                            value: "118.48",
                            logo: "https://www.nvidia.com/favicon.ico",
                            trend: "up",
                        },
                    ],
                    ctaButtons: [
                        { label: "Start trading", url: "#", variant: "primary" },
                        { label: "Explore markets", url: "#", variant: "outline" },
                    ],
                },
            },
        },
        {
            name: "Brutalist",
            description:
                "Large-scale layout with thick borders and offset shadows.",
            example: {
                id: "hero-brutalist",
                type: "hero",
                props: {
                    heading: "BRUTALIST\nDESIGN",
                    subheading: "Bold, raw, and uncompromising digital experiences.",
                    avatarUrl: "https://api.dicebear.com/7.x/shapes/svg",
                    variant: "brutalist",
                    ctaButtons: [
                        { label: "View Work", url: "#", variant: "primary" },
                        { label: "Library", url: "#", variant: "outline" },
                    ],
                },
            },
        },
        {
            name: "Outline Minimal",
            description: "High-contrast monochromatic layout with square edges.",
            example: {
                id: "hero-outline",
                type: "hero",
                props: {
                    heading: "MODERN\nARCHITECTURE",
                    subheading: "PRECISION AND CLARITY IN EVERY PIXEL.",
                    avatarUrl: "https://api.dicebear.com/7.x/bottts/svg",
                    variant: "outline_minimal",
                    ctaButtons: [
                        { label: "View Portfolio", url: "#", variant: "primary" },
                        { label: "Contact", url: "#", variant: "outline" },
                    ],
                },
            },
        },
        {
            name: "Modern Impact",
            description: "Bold typography with Large Portrait and accent colors.",
            example: {
                id: "hero-impact",
                type: "hero",
                props: {
                    heading: "I'm Jems Kemerun",
                    subheading: "A Product Designer based in Manila.",
                    avatarUrl:
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                    variant: "impact",
                    ctaButtons: [
                        { label: "DOWNLOAD CV", url: "#", variant: "primary" },
                    ],
                    style: { titleColor: "#ef4444" },
                },
            },
        },
        {
            name: "Glassmorphism",
            description: "A subtle blur effect with a subtle shadow.",
            example: {
                id: "hero-glass",
                type: "hero",
                props: {
                    heading: "I'm Jems Kemerun",
                    subheading: "A Product Designer based in Manila.",
                    avatarUrl:
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
                    variant: "glassmorphism",
                    ctaButtons: [
                        { label: "DOWNLOAD CV", url: "#", variant: "primary" },
                    ],
                    style: { titleColor: "#ef4444" },
                },
            },
        },
        {
            name: "Creative Gradient",
            description: "Soft gradients with glassmorphism and rounded aesthetic.",
            example: {
                id: "hero-creative",
                type: "hero",
                props: {
                    heading: "Creative Soul",
                    subheading: "Designing with passion and precision.",
                    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
                    variant: "creative_gradient",
                    socialLinks: [
                        { platform: "github", url: "https://github.com" },
                        { platform: "linkedin", url: "https://linkedin.com" },
                    ],
                },
            },
        },
        {
            name: "Glassmorphism Vibrant",
            description: "Vibrant backdrop blur with animated glows.",
            example: {
                id: "hero-glass-vibrant",
                type: "hero",
                props: {
                    heading: "Vibrant Mind",
                    subheading: "Connecting design with technology through glass.",
                    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vibrant",
                    variant: "glassmorphism_vibrant",
                    ctaButtons: [
                        { label: "GET STARTED", url: "#", variant: "primary" },
                    ],
                },
            },
        },
        {
            name: "Glassmorphism Dark",
            description: "Deep dark glass for high-end aesthetics.",
            example: {
                id: "hero-glass-dark",
                type: "hero",
                props: {
                    heading: "Dark Mode",
                    subheading: "Focus on what matters in the dark.",
                    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dark",
                    variant: "glassmorphism_dark",
                    ctaButtons: [
                        { label: "DISCOVER", url: "#", variant: "outline" },
                    ],
                },
            },
        },
        {
            name: "Connected Line",
            description: "Dark high-end layout with vertical line decorations.",
            example: {
                id: "hero-connected",
                type: "hero",
                props: {
                    heading: "Hello, I'm\na Front end Developer",
                    subheading: "Fond of creating web application designs and bring them to life using code & develop mobile designs",
                    variant: "connected_line",
                    ctaButtons: [
                        { label: "Creator journey", url: "#", variant: "primary" },
                    ],
                },
            },
        },
        {
            name: "Pixel",
            description: "Retro 8-bit pixel art style with green CRT accents.",
            example: {
                id: "hero-pixel",
                type: "hero",
                props: {
                    heading: "JOHN DOE",
                    subheading: "FRONT END DEVELOPER",
                    variant: "pixel",
                    avatarUrl: "https://api.dicebear.com/9.x/pixel-art/svg?seed=pixel",
                    ctaButtons: [
                        { label: "View Portfolio", url: "#", variant: "primary" },
                    ],
                },
            },
        },
    ],
};
