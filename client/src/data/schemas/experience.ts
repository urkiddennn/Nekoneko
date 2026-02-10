export const experience = {
    type: "experience",
    category: "Content",
    description: "Professional timeline.",
    details: "Timeline view of work history or education.",
    example: {
        id: "exp-1",
        type: "experience",
        props: {
            title: "Work Experience",
            jobs: [
                {
                    role: "Senior Dev",
                    company: "Tech",
                    period: "2020-2024",
                    description: "Focused on React architecture.",
                    icon: "Briefcase",
                },
            ],
        },
        styles: { padding: "py-24", backgroundColor: "bg-slate-50" },
    },
    props: [
        { name: "title", type: "string", desc: "Section header." },
        {
            name: "jobs",
            type: "array",
            desc: "List of {role, company, period, description, icon}.",
        },
        { name: "variant", type: '"timeline" | "cards" | "brutalist" | "outline_minimal" | "impact" | "glassmorphism" | "creative_gradient" | "connected_line" | "pixel"', desc: "Visual style." },
    ],
    variants: [
        {
            name: "Brutalist Post",
            description: "Interactive card style with bottom action bar.",
            example: {
                id: "exp-brutalist",
                type: "experience",
                props: {
                    title: "Project Log",
                    variant: "brutalist",
                    jobs: [
                        {
                            role: "Frontend Dev",
                            company: "Neko",
                            period: "2024",
                            description: "Building the next-gen editor.",
                            icon: "Layout",
                        },
                    ],
                },
            },
        },
        {
            name: "Floating Cards",
            description: "Large cards with a sticky sidebar.",
            example: {
                id: "exp-cards",
                type: "experience",
                props: {
                    title: "Career Path",
                    variant: "cards",
                    jobs: [
                        {
                            role: "Product Designer",
                            company: "Linear",
                            period: "2022 — Present",
                            description: "Designing the future of project management.",
                            icon: "Figma",
                        },
                    ],
                },
            },
        },
        {
            name: "Clean Timeline",
            description: "Minimal vertical timeline design.",
            example: {
                id: "exp-timeline",
                type: "experience",
                props: {
                    title: "Professional Timeline",
                    variant: "timeline",
                    jobs: [
                        {
                            role: "Software Engineer",
                            company: "Vercel",
                            period: "2020 — 2022",
                            description: "Scaling the edge network.",
                            icon: "Zap",
                        },
                    ],
                },
            },
        },
        {
            name: "Glassmorphism",
            description: "High-impact typography with side-by-side period layout.",
            example: {
                id: "exp-glassmorphism",
                type: "experience",
                props: {
                    title: "History",
                    variant: "glassmorphism",
                    jobs: [
                        {
                            role: "Senior Designer",
                            company: "Neko Studio",
                            period: "2024 — PRESENT",
                            description: "Leading the design system for modern web apps.",
                        },
                    ],
                },
            },
        },
        {
            name: "Creative Gradient",
            description: "Dark mode card with rich gradients and backdrop blur.",
            example: {
                id: "exp-creative",
                type: "experience",
                props: {
                    title: "Education & Skills",
                    variant: "creative_gradient",
                    jobs: [
                        {
                            role: "Graphic Design",
                            company: "University of Arts",
                            period: "2018 - 2022",
                            description: "Specialized in digital media and UI/UX functionality.",
                        }
                    ]
                }
            },
        },
        {
            name: "Impact",
            description: "Bold monochromatic layout with vertical dividers.",
            example: {
                id: "exp-impact",
                type: "experience",
                props: {
                    title: "Career",
                    variant: "impact",
                    jobs: [
                        { role: "Design Lead", company: "Apple", period: "2022", description: "Hardware interaction design." },
                    ],
                },
            },
        },
        {
            name: "Connected Line",
            description: "High-end dark layout with vertical line decorations.",
            example: {
                id: "exp-connected",
                type: "experience",
                props: {
                    title: "Experience",
                    variant: "connected_line",
                    jobs: [
                        { role: "Frontend Developer", company: "Google", period: "2023", description: "Search UI team." },
                    ],
                },
            },
        },
        {
            name: "Pixel",
            description: "Retro 8-bit pixel art style with green accents.",
            example: {
                id: "exp-pixel",
                type: "experience",
                props: {
                    title: "Experience",
                    variant: "pixel",
                    jobs: [
                        { role: "Frontend Dev", company: "Neko", period: "2024", description: "Building the next-gen editor." },
                    ],
                },
            },
        },
    ],
};
