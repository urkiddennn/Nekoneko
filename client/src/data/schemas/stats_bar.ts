export const stats_bar = {
    type: "stats_bar",
    category: "Content",
    description: "Numerical metrics and stats.",
    details:
        "A horizontal strip for highlighting key achievements or metrics with big text.",
    example: {
        id: "stats-1",
        type: "stats_bar",
        props: {
            items: [
                { label: "Projects", value: "50+" },
                { label: "Clients", value: "200" },
            ],
        },
        styles: { padding: "py-12" },
    },
    props: [
        {
            name: "items",
            type: "array",
            desc: "List of {label, value, icon} objects.",
        },
    ],
};
