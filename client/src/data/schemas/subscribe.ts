export const subscribe = {
    type: "subscribe",
    category: "Marketing",
    description: "Multi-variant subscription component.",
    details: "Allows users to subscribe to newsletters or updates. Integration with the messages system ensures you never miss a lead.",
    example: {
        id: "subscribe-1",
        type: "subscribe",
        props: {
            title: "Join Our Community",
            description: "Subscribe to get the latest updates and exclusive content.",
            buttonText: "Subscribe",
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
        { name: "buttonText", type: "string", desc: "Submit button text." },
        { name: "variant", type: '"default" | "newspaper" | "pixel" | "glassmorphism"', desc: "Visual style." }
    ],
    variants: [
        {
            name: "Default",
            description: "Clean, modern signup box.",
            example: {
                id: "subscribe-default",
                type: "subscribe",
                props: { variant: "default" }
            }
        },
        {
            name: "Newspaper",
            description: "Editorial style with rule dividers.",
            example: {
                id: "subscribe-newspaper",
                type: "subscribe",
                props: { variant: "newspaper" }
            }
        },
        {
            name: "Pixel",
            description: "Retro computer terminal style.",
            example: {
                id: "subscribe-pixel",
                type: "subscribe",
                props: { variant: "pixel" }
            }
        },
        {
            name: "Glassmorphism",
            description: "Soft blur and transparent gradients.",
            example: {
                id: "subscribe-glass",
                type: "subscribe",
                props: { variant: "glassmorphism" }
            }
        }
    ]
};
