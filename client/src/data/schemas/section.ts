export const section = {
    type: "section",
    category: "Layout",
    description: "Generic container with anchor support.",
    details:
        "A simple wrapper component that allows grouping items or creating a named anchor point for navigation via the anchorId prop.",
    props: [
        {
            name: "anchorId",
            type: "string",
            desc: "ID attribute for navigation links (e.g., 'about').",
        },
        {
            name: "items",
            type: "array",
            desc: "List of nested component definitions.",
        },
    ],
    example: {
        id: "sec-1",
        type: "section",
        props: {
            anchorId: "about-me",
            items: [
                { id: "inner-hero", type: "hero", props: { heading: "Inner Hero" } },
            ],
        },
        styles: { padding: "py-0" },
    },
};
