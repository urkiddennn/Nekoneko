export const faq = {
    type: "faq",
    category: "Content",
    description: "Frequently Asked Questions.",
    details: "Display a list of questions and answers in various formats like accordions or grids.",
    example: {
        id: "faq-1",
        type: "faq",
        props: {
            title: "Questions & Answers",
            description: "Everything you need to know about our service.",
            variant: "accordion",
            items: [
                {
                    question: "How does it work?",
                    answer: "Nekoneko uses a design-system-first architecture to turn JSON into beautiful UI.",
                },
                {
                    question: "Is it really free?",
                    answer: "We have a generous free tier for individuals and a pro plan for agencies.",
                },
            ],
        },
        styles: { padding: "py-24", backgroundColor: "bg-white" },
    },
    props: [
        { name: "title", type: "string", desc: "Section header." },
        { name: "description", type: "string", desc: "Brief intro text." },
        {
            name: "items",
            type: "array",
            desc: "List of {question, answer}.",
        },
        { name: "variant", type: '"accordion" | "grid" | "minimal_cards" | "brutalist" | "glassmorphism" | "connected_line" | "impact" | "creative_gradient"', desc: "Visual style." },
    ],
    variants: [
        {
            name: "Accordion",
            description: "Interactive collapsible list.",
            example: {
                id: "faq-accordion",
                type: "faq",
                props: {
                    title: "General FAQ",
                    variant: "accordion",
                    items: [
                        { question: "Can I export my site?", answer: "Yes, you can export to high-quality code or host with us." },
                        { question: "Is support included?", answer: "24/7 priority support is available on our Pro plan." },
                    ],
                },
            },
        },
        {
            name: "Grid Layout",
            description: "Static multi-column grid.",
            example: {
                id: "faq-grid",
                type: "faq",
                props: {
                    title: "Help Center",
                    variant: "grid",
                    items: [
                        { question: "Payment Methods", answer: "We accept all major credit cards and wire transfers." },
                        { question: "Refund Policy", answer: "14-day money-back guarantee, no questions asked." },
                    ],
                },
            },
        },
        {
            name: "Brutalist",
            description: "Bold borders and high contrast.",
            example: {
                id: "faq-brutalist",
                type: "faq",
                props: {
                    title: "The Fine Print",
                    variant: "brutalist",
                    items: [
                        { question: "Terms of Service", answer: "Read our full terms on the legal page." },
                        { question: "Privacy Mode", answer: "Your data is encrypted and never sold." },
                    ],
                },
            },
        },
        {
            name: "Glassmorphism",
            description: "Modern, translucent aesthetic.",
            example: {
                id: "faq-glassmorphism",
                type: "faq",
                props: {
                    title: "Modern Q&A",
                    variant: "glassmorphism",
                    items: [
                        { question: "Is it fast?", answer: "Optimized for speed with built-in asset management." },
                        {
                            question: "Collaboration?", answer: "Real-time editing with your entire team.",
                        },
                    ],
                },
            },
        },
        {
            name: "Connected Line",
            description: "Dark accordion with vertical line decorative accents.",
            example: {
                id: "faq-connected",
                type: "faq",
                props: {
                    title: "Expert Q&A",
                    variant: "connected_line",
                    items: [
                        { question: "Custom Integration?", answer: "Our API allows for seamless custom integrations." },
                        { question: "White Labeling?", answer: "Fully supported on our Enterprise plans." },
                    ],
                },
            },
        },
        {
            name: "Creative Gradient",
            description: "Vibrant glassmorphic accordion with glow effects.",
            example: {
                id: "faq-creative",
                type: "faq",
                props: {
                    title: "Support Hub",
                    variant: "creative_gradient",
                    items: [
                        { question: "How to start?", answer: "Simply create a JSON config and upload." },
                        { question: "Can I host?", answer: "One-click hosting is included with all plans." },
                    ],
                },
            },
        },
        {
            name: "Modern Impact",
            description: "Bold monochromatic accordion with high contrast buttons.",
            example: {
                id: "faq-impact",
                type: "faq",
                props: {
                    title: "FAQs",
                    variant: "impact",
                    items: [
                        { question: "Is it secure?", answer: "Bank-level encryption for all user data." },
                        { question: "Open Source?", answer: "The core rendering engine is open source." },
                    ],
                },
            },
        },
    ],
};
