export const education = {
    type: "education",
    category: "Content",
    description: "Academic history timeline.",
    details: "A vertical timeline representing schools and degrees.",
    example: {
        id: "edu-1",
        type: "education",
        props: {
            title: "Education",
            items: [
                {
                    school: "Universidad De Manila",
                    degree: "Bachelor of Science in Information Technology",
                    period: "2018 — 2022",
                },
                {
                    school: "Arellano University",
                    degree: "Senior High School",
                    period: "2016 — 2018",
                },
            ],
        },
    },
    props: [
        { name: "title", type: "string", desc: "Section header." },
        {
            name: "items",
            type: "array",
            desc: "List of {school, degree, period, icon}.",
        },
        {
            name: "variant",
            type: '"timeline" | "brutalist" | "outline_minimal" | "impact" | "glassmorphism" | "connected_line" | "creative_gradient"',
            desc: "Visual style.",
        },
    ],
    variants: [
        {
            name: "Brutalist List",
            description: "Large book-style list cards.",
            example: {
                id: "edu-brutalist",
                type: "education",
                props: {
                    title: "Learning Path",
                    variant: "brutalist",
                    items: [
                        {
                            school: "Design Academy",
                            degree: "Visual Arts",
                            period: "2020-2022",
                        },
                    ],
                },
            },
        },
        {
            name: "Outline Minimal",
            description: "Sharp list with architectural markers.",
            example: {
                id: "edu-outline-min",
                type: "education",
                props: {
                    title: "Academic Log",
                    variant: "outline_minimal",
                    items: [
                        {
                            school: "University",
                            degree: "Computer Science",
                            period: "2018-2022",
                        },
                    ],
                },
            },
        },
        {
            name: "Impact",
            description: "High-contrast academic log with period highlighting.",
            example: {
                id: "edu-impact",
                type: "education",
                props: {
                    title: "Background",
                    variant: "impact",
                    items: [
                        {
                            school: "Design Institute",
                            degree: "Master of Arts",
                            period: "2022 — 2024",
                        },
                    ],
                },
            },
        },
        {
            name: "Glassmorphism",
            description: "Modern glass cards with subtle backdrop blur.",
            example: {
                id: "edu-glass",
                type: "education",
                props: {
                    title: "Academy",
                    variant: "glassmorphism",
                    items: [
                        { school: "Stanford", degree: "Computer Science", period: "2020" },
                    ],
                },
            },
        },
        {
            name: "Connected Line",
            description: "Dark layout with vertical decorative lines.",
            example: {
                id: "edu-connected",
                type: "education",
                props: {
                    title: "Path",
                    variant: "connected_line",
                    items: [
                        { school: "MIT", degree: "Engineering", period: "2022" },
                    ],
                },
            },
        },
        {
            name: "Creative Gradient",
            description: "Vibrant pill-style list with glow effects.",
            example: {
                id: "edu-creative",
                type: "education",
                props: {
                    title: "Studies",
                    variant: "creative_gradient",
                    items: [
                        { school: "RISD", degree: "Arts", period: "2018" },
                    ],
                },
            },
        },
    ],
};
