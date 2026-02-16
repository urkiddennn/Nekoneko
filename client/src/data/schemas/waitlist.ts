export const waitlist = {
    type: "waitlist",
    category: "Marketing",
    description: "High-conversion waitlist landing pages.",
    details: "Capture early interest with a dedicated waitlist page. Features email collection, multiple layouts, and style variants.",
    example: {
        id: "waitlist-1",
        type: "waitlist",
        props: {
            title: "Coming Soon",
            description: "We are building something amazing. Join the waitlist to get early access.",
            buttonText: "Join Waitlist",
            variant: "default"
        },
        styles: {
            padding: "py-0",
        }
    },
    props: [
        { name: "title", type: "string", desc: "Main headline." },
        { name: "description", type: "string", desc: "Subheading or value prop." },
        { name: "successMessage", type: "string", desc: "Message shown after signup." },
        { name: "buttonText", type: "string", desc: "Button label." },
        { name: "placeholderText", type: "string", desc: "Input placeholder." },
        { name: "backgroundImage", type: "image", desc: "Background image URL." },
        {
            name: "variant",
            type: '"default" | "split_left" | "split_right" | "minimal" | "glassmorphism" | "pixel" | "newspaper" | "brutalist" | "gradient" | "glow" | "bento"',
            desc: "Layout and style variant."
        }
    ],
    variants: [
        {
            name: "Default",
            description: "Clean, centered layout with subtle background.",
            example: {
                id: "waitlist-default",
                type: "waitlist",
                props: { variant: "default" }
            }
        },
        {
            name: "Split Left",
            description: "Image on left, form on right.",
            example: {
                id: "waitlist-split-left",
                type: "waitlist",
                props: { variant: "split_left", backgroundImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80" }
            }
        },
        {
            name: "Split Right",
            description: "Image on right, form on left.",
            example: {
                id: "waitlist-split-right",
                type: "waitlist",
                props: { variant: "split_right", backgroundImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80" }
            }
        },
        {
            name: "Minimal",
            description: "Ultra-clean, focus purely on the input.",
            example: {
                id: "waitlist-minimal",
                type: "waitlist",
                props: { variant: "minimal" }
            }
        },
        {
            name: "Glassmorphism",
            description: "Modern frosted glass aesthetic.",
            example: {
                id: "waitlist-glass",
                type: "waitlist",
                props: { variant: "glassmorphism", backgroundImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80" }
            }
        },
        {
            name: "Pixel",
            description: "Retro 8-bit hacker style.",
            example: {
                id: "waitlist-pixel",
                type: "waitlist",
                props: { variant: "pixel" }
            }
        },
        {
            name: "Newspaper",
            description: "Editorial style type and layout.",
            example: {
                id: "waitlist-newspaper",
                type: "waitlist",
                props: { variant: "newspaper" }
            }
        },
        {
            name: "Brutalist",
            description: "High contrast, bold borders, neo-brutalist.",
            example: {
                id: "waitlist-brutalist",
                type: "waitlist",
                props: { variant: "brutalist" }
            }
        },
        {
            name: "Gradient",
            description: "Rich animated gradient background.",
            example: {
                id: "waitlist-gradient",
                type: "waitlist",
                props: { variant: "gradient" }
            }
        },
        {
            name: "Glow",
            description: "Dark mode with neon glow effects.",
            example: {
                id: "waitlist-glow",
                type: "waitlist",
                props: { variant: "glow" }
            }
        },
        {
            name: "Bento",
            description: "Oura-style beige grid layout.",
            example: {
                id: "waitlist-bento",
                type: "waitlist",
                props: {
                    variant: "bento",
                    title: "Join the Waitlist",
                    description: "Get early access to our platform. We're launching soon.",
                    buttonText: "Sign Up Now"
                }
            }
        }
    ]
};
