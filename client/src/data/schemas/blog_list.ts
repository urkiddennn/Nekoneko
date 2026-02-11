export const blog_list = {
    type: "blog_list",
    category: "Blog",
    description: "Grid or list of blog post previews.",
    details: "Displays a collection of posts with thumbnails, titles, and summaries.",
    example: {
        id: "blog-list-1",
        type: "blog_list",
        props: {
            title: "Recent Articles",
            posts: [
                {
                    title: "Getting Started with React",
                    summary: "Learn the basics of the most popular UI library.",
                    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
                    date: "Feb 10, 2026",
                    author: "Jems",
                    slug: "getting-started-react"
                },
                {
                    title: "Vite vs Webpack",
                    summary: "Why Vite is the future of frontend tooling.",
                    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
                    date: "Feb 08, 2026",
                    author: "Neko",
                    slug: "vite-vs-webpack"
                }
            ],
            variant: "grid"
        },
        styles: {
            padding: "py-24"
        }
    },
    props: [
        { name: "title", type: "string", desc: "Section title." },
        { name: "posts", type: "array", desc: "List of posts: {title, summary, image, date, author, slug}." },
        { name: "variant", type: '"grid" | "list" | "newspaper_columns" | "pixel_list" | "brutalist_cards"', desc: "Visual style." }
    ],
    variants: [
        {
            name: "Modern Grid",
            description: "Standard card grid layout.",
            example: {
                id: "blog-list-grid",
                type: "blog_list",
                props: { variant: "grid" }
            }
        },
        {
            name: "Clean List",
            description: "Simple vertical list of summaries.",
            example: {
                id: "blog-list-list",
                type: "blog_list",
                props: { variant: "list" }
            }
        },
        {
            name: "Newspaper Columns",
            description: "Tight editorial columns with rule dividers.",
            example: {
                id: "blog-list-newspaper",
                type: "blog_list",
                props: { variant: "newspaper_columns" }
            }
        },
        {
            name: "Pixel List",
            description: "Retro list with monospaced text and borders.",
            example: {
                id: "blog-list-pixel",
                type: "blog_list",
                props: { variant: "pixel_list" }
            }
        },
        {
            name: "Brutalist Cards",
            description: "Heavy shadows and bold typography.",
            example: {
                id: "blog-list-brutalist",
                type: "blog_list",
                props: { variant: "brutalist_cards" }
            }
        }
    ]
};
