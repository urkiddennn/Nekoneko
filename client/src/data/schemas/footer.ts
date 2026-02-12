export const footer = {
    type: "footer",
    category: "Structure",
    description: "Multi-purpose site footer.",
    details: "Universal footer component with support for logos, navigation links, social icons, and copyright information. Features specialized variants like Brutalist and Glassmorphism.",
    props: [
        { name: "logo", type: "string", desc: "Brand name or logo text." },
        { name: "tagline", type: "string", desc: "Short brand descriptor." },
        { name: "copyright", type: "string", desc: "Copyright notice." },
        { name: "links", type: "array", desc: "List of {label, url} navigation links." },
        { name: "socials", type: "array", desc: "List of {platform, url} social links." },
        { name: "padding", type: "string", desc: "Vertical padding (e.g. py-12)." },
        { name: "variant", type: '"default" | "brutalist" | "glassmorphism" | "minimal" | "impact" | "pixel" | "newspaper"', desc: "Visual style." }
    ],
    common_styles: [
        { name: "padding", type: "spacing", desc: "Wrapper padding." },
        { name: "maxWidth", type: "maxWidth", desc: "Content max width." },
        { name: "backgroundColor", type: "color", desc: "Background color." },
    ],
    variants: [
        {
            name: "Impact",
            description: "Large-scale typography with expressive layout.",
            example: {
                id: "footer-impact",
                type: "footer",
                props: {
                    logo: "NEKO.",
                    tagline: "Building the future of the web, one component at a time.",
                    variant: "impact",
                    links: [{ label: "Work", url: "#" }, { label: "About", url: "#" }],
                    socials: [{ platform: "github", url: "#" }, { platform: "twitter", url: "#" }]
                }
            }
        },
        {
            name: "Default",
            description: "Clean grid layout with navigation and social icons.",
            example: {
                id: "footer-default",
                type: "footer",
                props: {
                    logo: "Nekoneko",
                    tagline: "Building the future of the web.",
                    variant: "default",
                    links: [{ label: "Home", url: "#" }, { label: "About", url: "#" }],
                    socials: [{ platform: "github", url: "#" }, { platform: "twitter", url: "#" }]
                }
            }
        },
        {
            name: "Brutalist",
            description: "Hard shadows and thick borders.",
            example: {
                id: "footer-brutalist",
                type: "footer",
                props: {
                    logo: "BRUTAL",
                    variant: "brutalist",
                    links: [{ label: "Projects", url: "#" }, { label: "Contact", url: "#" }],
                    socials: [{ platform: "github", url: "#" }]
                }
            }
        },
        {
            name: "Glassmorphism",
            description: "Frosted glass container with translucent elements.",
            example: {
                id: "footer-glass",
                type: "footer",
                props: {
                    logo: "NEKO.",
                    tagline: "Design meets engineering.",
                    variant: "glassmorphism",
                    links: [{ label: "Work", url: "#" }, { label: "Blog", url: "#" }],
                    socials: [{ platform: "github", url: "#" }, { platform: "linkedin", url: "#" }]
                }
            }
        },
        {
            name: "Minimal",
            description: "Compact horizontal layout with subtle styling.",
            example: {
                id: "footer-minimal",
                type: "footer",
                props: {
                    logo: "neko",
                    tagline: "Less is more.",
                    variant: "minimal",
                    links: [{ label: "Home", url: "#" }],
                    socials: [{ platform: "email", url: "#" }]
                }
            }
        },
        {
            name: "Pixel",
            description: "Retro 8-bit terminal footer with green-on-navy palette.",
            example: {
                id: "footer-pixel",
                type: "footer",
                props: {
                    logo: "NEKO",
                    tagline: "Built with pixels.",
                    variant: "pixel",
                    links: [{ label: "Home", url: "#" }],
                    socials: [{ platform: "github", url: "#" }]
                }
            }
        },
        {
            name: "Newspaper",
            description: "Traditional broadsheet footer with masthead and rule dividers.",
            example: {
                id: "footer-newspaper",
                type: "footer",
                props: {
                    logo: "THE NEKO TIMES",
                    tagline: "ALL THE NEWS THAT'S FIT TO CODE",
                    variant: "newspaper",
                    links: [{ label: "Archives", url: "#" }],
                    socials: [{ platform: "github", url: "#" }]
                }
            }
        }
    ]
};
