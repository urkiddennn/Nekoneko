export const contact_info = {
    type: "contact_info",
    category: "Connect",
    description: "Social and contact icon links.",
    details:
        "Display icon buttons, cards, or high-impact sections for contact information.",
    example: {
        id: "contact-default",
        type: "contact_info",
        props: {
            title: "Let's connect",
            description: "Available for freelance work.",
            links: [
                { label: "Email", url: "mailto:hello@example.com", icon: "Mail" },
                { label: "GitHub", url: "https://github.com", icon: "Github" },
            ],
            alignment: "center",
            variant: "default",
        },
    },
    props: [
        { name: "title", type: "string", desc: "Heading text." },
        { name: "description", type: "string", desc: "Secondary text." },
        { name: "links", type: "array", desc: "List of {label, url, icon}." },
        {
            name: "alignment",
            type: '"left" | "center" | "right"',
            desc: "Alignment.",
        },
        {
            name: "variant",
            type: '"default" | "card" | "impact" | "brutalist" | "glassmorphism" | "connected_line" | "creative_gradient"',
            desc: "Visual style.",
        },
        { name: "email", type: "string", desc: "Contact email." },
        { name: "github", type: "string", desc: "GitHub username." },
        { name: "linkedin", type: "string", desc: "LinkedIn username." },
        { name: "footer_text", type: "string", desc: "Footer disclaimer." },
    ],
    variants: [
        {
            name: "Default Icons",
            description: "Standard row of icon buttons.",
            example: {
                id: "contact-default-var",
                type: "contact_info",
                props: {
                    title: "Let's connect",
                    links: [
                        { label: "Email", url: "mailto:hello@example.com", icon: "Mail" },
                    ],
                    variant: "default",
                },
            },
        },
        {
            name: "High-Contrast Card",
            description: "Bold red card with monospace typography.",
            example: {
                id: "contact-card",
                type: "contact_info",
                props: {
                    title: "CONTACT_INFO",
                    links: [
                        { label: "Email", url: "mailto:hello@example.com", icon: "Mail" },
                    ],
                    variant: "card",
                },
            },
        },
        {
            name: "Impact",
            description: "Large-scale social links with bold typography.",
            example: {
                id: "contact-impact",
                type: "contact_info",
                props: {
                    email: "hello@example.com",
                    github: "example",
                    variant: "impact",
                },
            },
        },
        {
            name: "Glassmorphism",
            description: "Modern glass cards with subtle backdrop blur.",
            example: {
                id: "contact-glass",
                type: "contact_info",
                props: {
                    title: "Join us",
                    links: [{ label: "Discord", url: "#", icon: "MessageCircle" }],
                    variant: "glassmorphism",
                },
            },
        },
        {
            name: "Brutalist",
            description: "Bold monochromatic layout with thick borders.",
            example: {
                id: "contact-brutalist",
                type: "contact_info",
                props: {
                    title: "Connect",
                    links: [{ label: "X / Twitter", url: "#", icon: "Twitter" }],
                    variant: "brutalist",
                },
            },
        },
        {
            name: "Connected Line",
            description: "Minimal layout with vertical line accents.",
            example: {
                id: "contact-connected",
                type: "contact_info",
                props: {
                    title: "Find me",
                    links: [{ label: "LinkedIn", url: "#", icon: "Linkedin" }],
                    variant: "connected_line",
                },
            },
        },
        {
            name: "Creative Gradient",
            description: "Vibrant pill-style links with soft glow effects.",
            example: {
                id: "contact-creative",
                type: "contact_info",
                props: {
                    title: "Say Hello",
                    links: [{ label: "Instagram", url: "#", icon: "Instagram" }],
                    variant: "creative_gradient",
                },
            },
        },
    ],
};
