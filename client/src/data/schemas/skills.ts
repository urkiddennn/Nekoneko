export const skills = {
    type: "skills",
    category: "Content",
    description: "Skills with progress bars.",
    details:
        "Visual representation of technical skills with progress bars/levels.",

    props: [
        { name: "title", type: "string", desc: "Section header." },
        {
            name: "showProgressBar",
            type: "boolean",
            desc: "Toggle level bars.",
        },
        {
            name: "showPercentage",
            type: "boolean",
            desc: "Show numeric percentage.",
        },
        {
            name: "skills",
            type: "array",
            desc: "List of skills {name, level, color, icon}.",
        },
        {
            name: "variant",
            type: '"default" | "artistic" | "impact" | "bullets" | "brutalist" | "outline_minimal" | "glassmorphism" | "creative_gradient" | "detailed_cards" | "pixel" | "newspaper"',
            desc: "Visual style.",
        },
        { name: "barColor", type: "hex", desc: "Main progress color." },
        { name: "bulletColor", type: "hex", desc: "Bullet/Icon color." },
        { name: "textColor", type: "tailwind|hex", desc: "Text color." },
        { name: "borderColor", type: "tailwind|hex", desc: "Border color." },
        {
            name: "backgroundColor",
            type: "tailwind|hex",
            desc: "Background color.",
        },
    ],
    variants: [
        {
            name: "Artistic",
            description: "Artistic skills display with prominent skill names.",
            example: {
                id: "skills-2",
                type: "skills",
                props: {
                    title: "Creative Tools",
                    variant: "artistic",
                    skills: [
                        { name: "Graphic Design", level: 100, color: "#f97316" },
                        { name: "Photography", level: 100, color: "#0ea5e9" },
                    ],
                },
            },
        },
        {
            name: "Impact",
            description: "Bold monochromatic skill pills with accent highlights.",
            example: {
                id: "skills-impact",
                type: "skills",
                props: {
                    title: "Expertise",
                    variant: "impact",
                    skills: [
                        { name: "React", level: 100, color: "#6366f1" },
                        { name: "Design", level: 100, color: "#ec4899" },
                    ],
                },
            },
        },
        {
            name: "Glassmorphism",
            description: "Modern glassmorphism tags",
            example: {
                id: "skills-glassmorphism",
                type: "skills",
                props: {
                    title: "Core Stack",
                    variant: "glassmorphism",
                    skills: ["SYSTEM", "CORE", "API"],
                },
            },
        },
        {
            name: "Brutalist Pills",
            description: "Thick bordered skill tags.",
            example: {
                id: "skills-pills-brutalist",
                type: "skills",
                props: {
                    title: "Tech Stack",
                    variant: "brutalist",
                    skills: ["React", "TypeScript", "Tailwind"],
                },
            },
        },
        {
            name: "Outline Minimal",
            description: "Square monochromatic tags.",
            example: {
                id: "skills-outline",
                type: "skills",
                props: {
                    title: "Core Stack",
                    variant: "outline_minimal",
                    skills: ["SYSTEM", "CORE", "API"],
                },
            },
        },
        {
            name: "Creative Gradient",
            description: "Glassmorphic cards with icon support.",
            example: {
                id: "skills-creative",
                type: "skills",
                props: {
                    title: "My Toolkit",
                    variant: "creative_gradient",
                    skills: [
                        { name: "React", level: 90, icon: "React" },
                        { name: "TypeScript", level: 85, icon: "TS" },
                    ],
                },
            },
        },
        {
            name: "Pixel",
            description: "Retro 8-bit pixel art style with segmented progress bars.",
            example: {
                id: "skills-pixel",
                type: "skills",
                props: {
                    title: "Skills",
                    variant: "pixel",
                    skills: [
                        { name: "React", level: 90 },
                        { name: "TypeScript", level: 85 },
                    ],
                },
            },
        },
        {
            name: "Newspaper",
            description: "Typographic skill list with column rules and serif emphasis.",
            example: {
                id: "skills-newspaper",
                type: "skills",
                props: {
                    title: "TECHNICAL EXPERTISE",
                    variant: "newspaper",
                    skills: ["Editorial Design", "Typography", "React Architecture", "System Design"],
                },
            },
        },
    ],
};
