export const connect_with_me = {
    type: "connect_with_me",
    category: "Communication",
    description: "Contact form with decorative vertical line.",
    details: "A contact form component featuring email and message fields, a submit button, and a distinctive decorative vertical line with circle indicators.",
    props: [
        { name: "title", type: "string", desc: "Main heading." },
        { name: "subheading", type: "string", desc: "Optional subheading." },
        { name: "buttonText", type: "string", desc: "CTA button label." },
        { name: "emailPlaceholder", type: "string", desc: "Email field placeholder." },
        { name: "messagePlaceholder", type: "string", desc: "Message field placeholder." },
        { name: "variant", type: '"default" | "brutalist" | "glassmorphism" | "minimal_outline"', desc: "Visual style." },
        { name: "showLineDecoration", type: "boolean", desc: "Toggle the vertical line." }
    ],
    variants: [
        {
            name: "Default",
            description: "Dark high-end theme from design.",
            example: {
                id: "connect-1",
                type: "connect_with_me",
                props: {
                    title: "Connect with me",
                    buttonText: "Stay Connected",
                    emailPlaceholder: "Email",
                    messagePlaceholder: "Message",
                    variant: "default"
                }
            }
        },
        {
            name: "Brutalist",
            description: "Bold borders and hard shadows.",
            example: {
                id: "connect-brutal",
                type: "connect_with_me",
                props: {
                    title: "GET IN TOUCH",
                    buttonText: "SEND MESSAGE",
                    emailPlaceholder: "YOUR EMAIL",
                    messagePlaceholder: "YOUR MESSAGE",
                    variant: "brutalist"
                }
            }
        }
    ],
    example: {
        id: "connect-main",
        type: "connect_with_me",
        props: {
            title: "Connect with me",
            buttonText: "Stay Connected",
            emailPlaceholder: "Email",
            messagePlaceholder: "Message"
        }
    }
};
