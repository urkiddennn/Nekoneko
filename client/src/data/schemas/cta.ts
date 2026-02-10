export const cta = {
    type: "cta",
    category: "Content",
    description: "Call to action focus.",
    details: "Simple section focused on a single call to action.",
    example: {
        id: "cta-1",
        type: "cta",
        props: { title: "Ready?", buttonText: "Start" },
        styles: {
            padding: "py-32",
            textAlign: "center",
            backgroundColor: "bg-indigo-600",
        },
    },
    props: [
        { name: "title", type: "string", desc: "Direct message." },
        { name: "buttonText", type: "string", desc: "Text for the button." },
        { name: "variant", type: '"default" | "brutalist" | "glassmorphism" | "connected_line" | "impact" | "creative_gradient"', desc: "Visual style." },
    ],
    variants: [
        {
            name: "Modern Impact",
            description: "Bold monochromatic CTA with heavy uppercase typography.",
            example: {
                id: "cta-impact",
                type: "cta",
                props: { title: "READY TO WORK?", buttonText: "SAY HELLO", variant: "impact" },
            },
        },
        {
            name: "Glassmorphism",
            description: "Translucent backdrop with soft blur and minimal borders.",
            example: {
                id: "cta-glass",
                type: "cta",
                props: { title: "Start Your Journey", buttonText: "Get Started", variant: "glassmorphism" },
            },
        },
        {
            name: "Brutalist",
            description: "High-contrast with thick borders and offset shadows.",
            example: {
                id: "cta-brutalist",
                type: "cta",
                props: { title: "GET ACCESS", buttonText: "JOIN NOW", variant: "brutalist" },
            },
        },
        {
            name: "Creative Gradient",
            description: "Modern gradient aesthetic with glassmorphism.",
            example: {
                id: "cta-creative",
                type: "cta",
                props: { title: "Unlock Creativity", buttonText: "Explore", variant: "creative_gradient" },
            },
        },
        {
            name: "Connected Line",
            description: "Minimalist dark layout with vertical line accents.",
            example: {
                id: "cta-connected",
                type: "cta",
                props: { title: "Let's Connect", buttonText: "Contact Us", variant: "connected_line" },
            },
        },
    ],
};
