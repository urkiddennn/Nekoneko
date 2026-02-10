export const project_details = {
    type: "project_details",
    category: "Connect",
    description: "Project card or portfolio grid.",
    details:
        "A comprehensive project display supporting single cards or full grids.",
    example: {
        id: "project-1",
        type: "project_details",
        props: {
            title: "Nekoneko Platform",
            description: "A professional minimal site builder.",
            stacks: ["React", "TypeScript", "Convex"],
            link: "https://nekoneko.space",
            variant: "card",
        },
    },
    props: [
        { name: "title", type: "string", desc: "Project title." },
        { name: "description", type: "string", desc: "Description text." },
        { name: "stacks", type: "array", desc: "Tech stack strings." },
        { name: "link", type: "url", desc: "External link." },
        {
            name: "items",
            type: "array",
            desc: "Array of projects {title, image, tags, link}.",
        },
        { name: "columns", type: "number", desc: "Column count." },
        {
            name: "variant",
            type: '"card" | "grid" | "impact" | "brutalist" | "glassmorphism" | "pixel"',
            desc: "Visual style.",
        },
    ],
    variants: [
        {
            name: "Portfolio Grid",
            description: "Standard grid of projects.",
            example: {
                id: "project-grid-var",
                type: "project_details",
                props: {
                    title: "Works",
                    variant: "grid",
                    items: [
                        { title: "Project A", image: "", tags: ["Web"], link: "#" },
                    ],
                },
            },
        },
        {
            name: "Impact Gallery",
            description: "High-impact portfolio showcase.",
            example: {
                id: "project-impact",
                type: "project_details",
                props: {
                    variant: "impact",
                    items: [
                        { title: "Modern Design", image: "", tags: ["2024"], link: "#" },
                    ],
                },
            },
        },
        {
            name: "Brutalist",
            description: "Thick borders and offset shadows with uppercase type.",
            example: {
                id: "project-brutalist",
                type: "project_details",
                props: {
                    variant: "brutalist",
                    items: [
                        { title: "Raw Design", image: "", tags: ["Brutalist"], link: "#" },
                    ],
                },
            },
        },
        {
            name: "Glassmorphism",
            description: "Translucent cards with backdrop blur and soft borders.",
            example: {
                id: "project-glass",
                type: "project_details",
                props: {
                    variant: "glassmorphism",
                    items: [
                        { title: "Glass Project", image: "", tags: ["Design"], link: "#" },
                    ],
                },
            },
        },
        {
            name: "Pixel",
            description: "Retro 8-bit terminal project cards with green-on-navy palette.",
            example: {
                id: "project-pixel",
                type: "project_details",
                props: {
                    variant: "pixel",
                    items: [
                        { title: "Retro App", image: "", tags: ["Pixel"], link: "#" },
                    ],
                },
            },
        },
    ],
};
