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
            type: '"card" | "grid" | "impact"',
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
    ],
};
