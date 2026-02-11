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
        { name: "variant", type: '"default" | "brutalist" | "glassmorphism" | "minimal_outline" | "pixel" | "newspaper"', desc: "Visual style." },
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
        },
        {
            name: "Glassmorphism",
            description: "Frosted glass with backdrop blur and translucent inputs.",
            example: {
                id: "connect-glass",
                type: "connect_with_me",
                props: {
                    title: "Let's Connect",
                    subheading: "Drop me a message anytime.",
                    buttonText: "SEND",
                    emailPlaceholder: "your@email.com",
                    messagePlaceholder: "What's on your mind?",
                    variant: "glassmorphism"
                }
            }
        },
        {
            name: "Minimal Outline",
            description: "Clean underline inputs with monochrome palette.",
            example: {
                id: "connect-outline",
                type: "connect_with_me",
                props: {
                    title: "SAY HELLO",
                    buttonText: "SUBMIT",
                    emailPlaceholder: "Email address",
                    messagePlaceholder: "Your message",
                    variant: "minimal_outline"
                }
            }
        },
        {
            name: "Pixel",
            description: "Retro 8-bit terminal contact form with green-on-navy palette.",
            example: {
                id: "connect-pixel",
                type: "connect_with_me",
                props: {
                    title: "TRANSMIT MSG",
                    buttonText: "SEND",
                    emailPlaceholder: "email@addr",
                    messagePlaceholder: "Enter message...",
                    variant: "pixel"
                }
            }
        },
        {
            name: "Newspaper",
            description: "Editorial letter-style contact form with serif labels.",
            example: {
                id: "connect-newspaper",
                type: "connect_with_me",
                props: {
                    title: "Letter to the Editor",
                    buttonText: "SEND LETTER",
                    emailPlaceholder: "Return Address",
                    messagePlaceholder: "Dear Editor...",
                    variant: "newspaper"
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
