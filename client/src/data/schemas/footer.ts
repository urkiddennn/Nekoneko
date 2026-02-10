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
        { name: "variant", type: '"default" | "brutalist" | "glassmorphism" | "minimal" | "impact"', desc: "Visual style." }
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
        }
    ]
};
