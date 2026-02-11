export const features = {
    type: "features",
    category: "Content",
    description: "Grid of unique selling points.",
    details:
        "Displays a grid of feature cards. Supports recursive rendering of other components within each card.",
    example: {
        id: "feat-1",
        type: "features",
        props: {
            title: "Why Neko?",
            items: [
                { title: "Fast", description: "Engineered for speed." },
                { title: "Safe", description: "No manual HTML." },
            ],
            columns: 2,
        },
        styles: {
            padding: "py-24",
            backgroundColor: "bg-gray-50",
            textAlign: "center",
        },
    },
    props: [
        { name: "title", type: "string", desc: "Section header." },
        {
            name: "items",
            type: "array",
            desc: "List of feature objects or component definitions.",
        },
        {
            name: "columns",
            type: "number",
            desc: "Number of columns (default: 3).",
        },
        {
            name: "variant",
            type: '"default" | "brutalist" | "outline_minimal" | "glassmorphism" | "connected_line" | "impact" | "creative_gradient" | "pixel" | "newspaper"',
            desc: "Visual style.",
        },
    ],
    variants: [
        {
            name: "Glassmorphism",
            description: "Glassmorphic feature cards with blur and semi-transparent borders.",
            example: {
                id: "feat-glass",
                type: "features",
                props: {
                    title: "Premium Experience",
                    variant: "glassmorphism",
                    items: [
                        { title: "Glass UI", description: "Vibrant backdrop blur." },
                        { title: "Modern", description: "Built for the future." },
                    ],
                },
            },
        },
        {
            name: "Brutalist",
            description: "Feature cards with thick borders and hover effects.",
            example: {
                id: "feat-brutalist",
                type: "features",
                props: {
                    title: "Core Features",
                    variant: "brutalist",
                    items: [
                        {
                            title: "Performance",
                            description: "Blazing fast interaction.",
                        },
                        { title: "Security", description: "Bulletproof architecture." },
                    ],
                },
            },
        },
        {
            name: "Connected Line",
            description: "Dark card style with vertical line accents.",
            example: {
                id: "feat-connected",
                type: "features",
                props: {
                    title: "Expertise",
                    variant: "connected_line",
                    items: [
                        { title: "Design", description: "UI/UX Focus" },
                        { title: "Code", description: "React & Node" },
                    ],
                },
            },
        },
        {
            name: "Creative Gradient",
            description: "Vibrant cards with blur and icon support.",
            example: {
                id: "feat-creative",
                type: "features",
                props: {
                    title: "Process",
                    variant: "creative_gradient",
                    items: [
                        { title: "Discovery", description: "Phase 1" },
                        { title: "Delivery", description: "Phase 2" },
                    ],
                },
            },
        },
        {
            name: "Modern Impact",
            description: "Bold monochromatic cards with high contrast.",
            example: {
                id: "feat-impact",
                type: "features",
                props: {
                    title: "Why Us",
                    variant: "impact",
                    items: [
                        { title: "Quality", description: "Zero Compromise" },
                        { title: "Speed", description: "Market leading" },
                    ],
                },
            },
        },
        {
            name: "Pixel",
            description: "Retro 8-bit terminal cards with green-on-navy palette.",
            example: {
                id: "feat-pixel",
                type: "features",
                props: {
                    title: "Core Systems",
                    variant: "pixel",
                    items: [
                        { title: "Engine", description: "Custom rendering" },
                        { title: "Network", description: "Real-time sync" },
                    ],
                },
            },
        },
        {
            name: "Newspaper",
            description: "Editorial grid with vertical rules separating feature columns.",
            example: {
                id: "feat-newspaper",
                type: "features",
                props: {
                    title: "Special Report",
                    variant: "newspaper",
                    items: [
                        { title: "EDITORIAL", description: "Deep dive into design systems." },
                        { title: "OP-ED", description: "The future of JSON logic." },
                    ],
                },
            },
        },
    ],
};
