export const layout = {
    type: "layout",
    category: "Layout",
    description: "Structural nested container.",
    details: "A structural component that allows nesting other components in rows or columns.",
    example: {
        id: "layout-1",
        type: "layout",
        props: {
            direction: "row",
            gap: "8",
            padding: "10",
            items: [
                {
                    id: "sub-cta-1",
                    type: "cta",
                    props: { title: "Left Option", buttonText: "Go Left" },
                },
                {
                    id: "sub-cta-2",
                    type: "cta",
                    props: { title: "Right Option", buttonText: "Go Right" },
                },
            ],
        },
        styles: { maxWidth: "max-w-7xl", padding: "py-10" },
    },
    props: [
        { name: "direction", type: '"row" | "col"', desc: "Flex direction." },
        {
            name: "items",
            type: "array",
            desc: "Array of child component objects.",
        },
        { name: "gap", type: "string", desc: "Inner gap (1-12)." },
        {
            name: "padding",
            type: "string",
            desc: "Inner padding (1-12).",
        },
    ],
};
