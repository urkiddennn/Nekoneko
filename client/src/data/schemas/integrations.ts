export const integrations = {
    type: "integrations",
    category: "Marketing",
    description: "Logo grid or tech stack showcase.",
    details:
        "Displays a grid of integrations, technology partners, or alternative tools.",
    variants: [
        {
            name: "Default",
            description: "Simple logo row.",
            example: {
                id: "integrations-1",
                type: "integrations",
                props: {
                    intro: "ALTERNATIVE TO",
                    heading: "Works with everything",
                    subheading: "Seamless integrations with your stack.",
                    variant: "default",
                    items: [
                        { label: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" }
                    ]
                }
            }
        },
        {
            name: "Bento",
            description: "Grid layout with orange accent block, mirroring Oura style.",
            example: {
                id: "integrations-bento",
                type: "integrations",
                props: {
                    intro: "ALTERNATIVE TO",
                    heading: "You don't need multiple API",
                    subheading: "You don't have to reinvent your stack to get great video. We're compatible with your favorite languages and frameworks.",
                    accentLabel: "Use on your favorite frameworks",
                    variant: "bento",
                    items: [
                        { label: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                        { label: "Vue", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
                        { label: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
                        { label: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" }
                    ]
                }
            }
        }
    ],
    common_styles: [
        { name: "padding", type: "spacing", desc: "Vertical padding." },
        { name: "background", type: "color", desc: "Background color." }
    ],
    props: [
        { name: "intro", type: "string", desc: "Top small label (e.g. ALTERNATIVE TO)." },
        { name: "heading", type: "string", desc: "Main headline." },
        { name: "subheading", type: "string", desc: "Secondary text or description." },
        { name: "accentLabel", type: "string", desc: "Text for the accent color block." },
        { name: "competitorLogos", type: "array", desc: "List of competitor logos for the intro row." },
        { name: "alternativeLogos", type: "array", desc: "List of alternative logos for the intro row." },
        { name: "items", type: "array", desc: "List of {label, icon} items." },
        { name: "variant", type: '"default" | "bento"', desc: "Visual style." }
    ]
};
