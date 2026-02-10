export const search_bar = {
    type: "search_bar",
    category: "Utility",
    description: "Neo-Brutalist search with results.",
    props: [
        { name: "placeholder", type: "string", desc: "Input placeholder." },
        { name: "category", type: "string", desc: "Search category tag." },
        { name: "results", type: "array", desc: "List of {title, stats}." },
    ],
    example: {
        id: "search-1",
        type: "search_bar",
        props: {
            category: "Mathematics",
            results: [
                {
                    title: "Calculus, Volume 2 - Gilbert Strang",
                    stats: { answers: 12, rating: 4.8, likes: 24 },
                },
            ],
        },
    },
};
