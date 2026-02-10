export const image = {
    type: "image",
    category: "Content",
    description: "Responsive image with caption.",
    details:
        "Renders a single responsive image with optional caption and alt text.",
    example: {
        id: "img-1",
        type: "image",
        props: {
            src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
            alt: "Abstract",
            caption: "Design inspiration.",
        },
        styles: { padding: "py-20", maxWidth: "max-w-4xl" },
    },
    props: [
        { name: "src", type: "url", desc: "Image URL." },
        { name: "alt", type: "string", desc: "Accessibility text." },
        { name: "caption", type: "string", desc: "Optional text below image." },
    ],
};
