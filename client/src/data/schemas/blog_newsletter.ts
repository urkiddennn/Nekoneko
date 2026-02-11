export const blog_newsletter = {
    type: "blog_newsletter",
    category: "Blog",
    description: "Specialized newsletter signup for blogs.",
    details: "A focused call-to-action for gathering email subscriptions.",
    example: {
        id: "blog-newsletter-1",
        type: "blog_newsletter",
        props: {
            title: "Stay Updated",
            description: "Get the latest articles delivered straight to your inbox.",
            button_text: "Subscribe",
            variant: "default"
        },
        styles: {
            padding: "py-16",
            backgroundColor: "bg-indigo-600"
        }
    },
    props: [
        { name: "title", type: "string", desc: "Header text." },
        { name: "description", type: "string", desc: "Description text." },
        { name: "button_text", type: "string", desc: "Submit button text." },
        { name: "variant", type: '"default" | "newspaper" | "pixel" | "glassmorphism"', desc: "Visual style." }
    ],
    variants: [
        {
            name: "Default",
            description: "Clean, modern signup box.",
            example: {
                id: "blog-newsletter-default",
                type: "blog_newsletter",
                props: { variant: "default" }
            }
        },
        {
            name: "Newspaper",
            description: "Editorial style with rule dividers.",
            example: {
                id: "blog-newsletter-newspaper",
                type: "blog_newsletter",
                props: { variant: "newspaper" }
            }
        },
        {
            name: "Pixel",
            description: "Retro computer terminal style.",
            example: {
                id: "blog-newsletter-pixel",
                type: "blog_newsletter",
                props: { variant: "pixel" }
            }
        },
        {
            name: "Glassmorphism",
            description: "Soft blur and transparent gradients.",
            example: {
                id: "blog-newsletter-glass",
                type: "blog_newsletter",
                props: { variant: "glassmorphism" }
            }
        }
    ]
};
