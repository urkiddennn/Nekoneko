export const blog_hero = {
    type: "blog_hero",
    category: "Blog",
    description: "Header for blog posts or featured articles.",
    details: "Typically used at the top of a blog page or as a header for an article. Includes metadata like author and date.",
    example: {
        id: "blog-hero-1",
        type: "blog_hero",
        props: {
            title: "The Art of Modern Web Design",
            subtitle: "Exploration of visual aesthetics in 2024.",
            author: "Neko Dev",
            date: "Feb 11, 2026",
            category: "Design",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
            variant: "default"
        },
        styles: {
            padding: "py-24",
            backgroundColor: "bg-white dark:bg-slate-950"
        }
    },
    props: [
        { name: "title", type: "string", desc: "Main article title." },
        { name: "subtitle", type: "string", desc: "Short sub-headline or description." },
        { name: "author", type: "string", desc: "Author name." },
        { name: "date", type: "string", desc: "Publication date." },
        { name: "category", type: "string", desc: "Article category." },
        { name: "image", type: "url", desc: "Featured image URL." },
        { name: "variant", type: '"default" | "newspaper" | "pixel" | "brutalist" | "glassmorphism"', desc: "Visual style." }
    ],
    variants: [
        {
            name: "Default",
            description: "Modern, clean centered layout.",
            example: {
                id: "blog-hero-default",
                type: "blog_hero",
                props: {
                    title: "Modern Web Trends",
                    subtitle: "What is coming in 2024.",
                    variant: "default"
                }
            }
        },
        {
            name: "Newspaper",
            description: "Classic editorial style with serif typography.",
            example: {
                id: "blog-hero-newspaper",
                type: "blog_hero",
                props: {
                    title: "Editorial: The Pixel Era",
                    subtitle: "A deep dive into retro aesthetics.",
                    variant: "newspaper"
                }
            }
        },
        {
            name: "Pixel",
            description: "Retro 8-bit style with scanlines.",
            example: {
                id: "blog-hero-pixel",
                type: "blog_hero",
                props: {
                    title: "PLAYER 1: START",
                    subtitle: "Entering the world of digital art.",
                    variant: "pixel"
                }
            }
        },
        {
            name: "Brutalist",
            description: "Raw, industrial look with heavy borders.",
            example: {
                id: "blog-hero-brutalist",
                type: "blog_hero",
                props: {
                    title: "RAW ARCHITECTURE",
                    subtitle: "Bypassing the polish for pure data.",
                    variant: "brutalist"
                }
            }
        },
        {
            name: "Glassmorphism",
            description: "Soft blur and transparent layers.",
            example: {
                id: "blog-hero-glass",
                type: "blog_hero",
                props: {
                    title: "Transparent Future",
                    subtitle: "Layers of clarity in software.",
                    variant: "glassmorphism"
                }
            }
        }
    ]
};
