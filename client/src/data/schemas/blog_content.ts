export const blog_content = {
    type: "blog_content",
    category: "Blog",
    description: "The main article body component.",
    details: "Renders the full text of a blog post with support for rich content.",
    example: {
        id: "blog-content-1",
        type: "blog_content",
        props: {
            title: "Breaking Down the Architecture",
            content: "Modern software architecture requires a careful balance of flexibility and performance. In this article, we explore how to build resilient systems using JSON-driven components...",
            author: "Neko Dev",
            date: "Feb 11, 2026",
            tags: ["Architecture", "Frontend", "JSON"],
            variant: "editorial"
        },
        styles: {
            padding: "py-24",
            maxWidth: "max-w-4xl"
        }
    },
    props: [
        { name: "title", type: "string", desc: "Main article title." },
        { name: "content", type: "string", desc: "Main content text (HTML/Markdown support)." },
        { name: "author", type: "string", desc: "Author name." },
        { name: "date", type: "string", desc: "Publication date." },
        { name: "tags", type: "array", desc: "List of string tags." },
        { name: "image", type: "url", desc: "Body image or caption image." },
        { name: "variant", type: '"editorial" | "newspaper_article" | "minimal" | "pixel_reader"', desc: "Visual style." }
    ],
    variants: [
        {
            name: "Editorial",
            description: "High-end layout with focus on readability.",
            example: {
                id: "blog-content-editorial",
                type: "blog_content",
                props: { variant: "editorial" }
            }
        },
        {
            name: "Newspaper Article",
            description: "Serif typography and multiple columns.",
            example: {
                id: "blog-content-newspaper",
                type: "blog_content",
                props: { variant: "newspaper_article" }
            }
        },
        {
            name: "Minimal",
            description: "Bare-bones distraction-free reading experience.",
            example: {
                id: "blog-content-minimal",
                type: "blog_content",
                props: { variant: "minimal" }
            }
        },
        {
            name: "Pixel Reader",
            description: "Retro terminal-style reading interface.",
            example: {
                id: "blog-content-pixel",
                type: "blog_content",
                props: { variant: "pixel_reader" }
            }
        }
    ]
};
