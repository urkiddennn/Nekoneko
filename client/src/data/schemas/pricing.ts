export const pricing = {
    type: "pricing",
    category: "Content",
    description: "Multi-tier pricing tables.",
    details:
        "Display subscription plans or service tiers with features and pricing.",
    example: {
        id: "pricing-1",
        type: "pricing",
        props: {
            title: "Simple Pricing",
            plans: [
                {
                    name: "Free",
                    price: "$0",
                    features: ["1 Project", "Basic Themes"],
                },
                {
                    name: "Pro",
                    price: "$19",
                    features: ["Unlimited Projects", "Custom CSS"],
                    isPopular: true,
                },
            ],
        },
        styles: { padding: "py-24" },
    },
    props: [
        { name: "title", type: "string", desc: "Section header." },
        {
            name: "plans",
            type: "array",
            desc: "Array of {name, price, features, isPopular}.",
        },
        {
            name: "variant",
            type: '"grid" | "list" | "brutalist" | "outline_minimal" | "glassmorphism" | "connected_line" | "impact" | "creative_gradient" | "pixel" | "newspaper"',
            desc: "Layout style.",
        },
    ],
    variants: [
        {
            name: "Glassmorphism Comparison",
            description: "Backdrop blur tiles for premium service comparison.",
            example: {
                id: "pricing-glass",
                type: "pricing",
                props: {
                    title: "Premium Tiers",
                    variant: "glassmorphism",
                    plans: [
                        { name: "Creator", price: "$12", features: ["10 Sites", "Analytics"] },
                        { name: "Team", price: "$49", features: ["Unlimited Sites", "Collaboration"], isPopular: true },
                    ],
                },
            },
        },
        {
            name: "Comparison Grid",
            description: "Boxed vertical tiers side-by-side.",
            example: {
                id: "pricing-grid",
                type: "pricing",
                props: {
                    title: "Pricing Plans",
                    variant: "grid",
                    plans: [
                        {
                            name: "Basic",
                            price: "$0",
                            features: ["1 Site", "Standard Themes"],
                        },
                        {
                            name: "Pro",
                            price: "$29",
                            features: ["Unlimited Sites", "Custom CSS"],
                            isPopular: true,
                        },
                    ],
                },
            },
        },
        {
            name: "Minimal List",
            description: "Horizontal rows for comparison.",
            example: {
                id: "pricing-list",
                type: "pricing",
                props: {
                    title: "Flexible Options",
                    variant: "list",
                    plans: [
                        {
                            name: "Developer",
                            price: "$10/mo",
                            features: ["API Access", "Webhooks"],
                        },
                        {
                            name: "Enterprise",
                            price: "Custom",
                            features: ["SLA", "Dedicated Support"],
                        },
                    ],
                },
            },
        },
        {
            name: "Connected Line",
            description: "Dark high-end pricing tiers with vertical line accents.",
            example: {
                id: "pricing-connected",
                type: "pricing",
                props: {
                    title: "Membership",
                    variant: "connected_line",
                    plans: [
                        { name: "Starter", price: "$0", features: ["Core Features"] },
                        { name: "Expert", price: "$99", features: ["Unlimited Access", "Priority API"], isPopular: true },
                    ],
                },
            },
        },
        {
            name: "Creative Gradient",
            description: "Vibrant glassmorphic pricing tiles with glow effects.",
            example: {
                id: "pricing-creative",
                type: "pricing",
                props: {
                    title: "Join the Club",
                    variant: "creative_gradient",
                    plans: [
                        { name: "Designer", price: "$12", features: ["Portfolio", "Cloud Storage"] },
                        { name: "Agency", price: "$49", features: ["Client Management", "Custom Branding"], isPopular: true },
                    ],
                },
            },
        },
        {
            name: "Modern Impact",
            description: "Bold monochromatic pricing tiers with high contrast.",
            example: {
                id: "pricing-impact",
                type: "pricing",
                props: {
                    title: "Choose Plan",
                    variant: "impact",
                    plans: [
                        { name: "Standard", price: "$29", features: ["Full Access"] },
                        { name: "Pro", price: "$89", features: ["White Label", "24/7 Support"], isPopular: true },
                    ],
                },
            },
        },
        {
            name: "Pixel",
            description: "Retro 8-bit terminal pricing cards with green-on-navy palette.",
            example: {
                id: "pricing-pixel",
                type: "pricing",
                props: {
                    title: "Select Plan",
                    variant: "pixel",
                    plans: [
                        { name: "Free", price: "$0", features: ["1 Project"] },
                        { name: "Pro", price: "$19", features: ["Unlimited", "Priority"], isPopular: true },
                    ],
                },
            },
        },
        {
            name: "Newspaper",
            description: "Classified-ad style pricing columns with rule dividers.",
            example: {
                id: "pricing-newspaper",
                type: "pricing",
                props: {
                    title: "Classifieds & Subscriptions",
                    variant: "newspaper",
                    plans: [
                        { name: "Weekly", price: "$5", features: ["Full Archives"] },
                        { name: "Annual", price: "$150", features: ["Home Delivery", "Digital Pro"], isPopular: true },
                    ],
                },
            },
        },
    ],
};
