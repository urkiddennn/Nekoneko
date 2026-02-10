export const navigation = {
    type: "navigation",
    category: "Core",
    description: "Universal header component.",
    details:
        "Top navigation bar that persists across pages. Supports a list of links and an optional CTA button.",
    variants: [
        {
            name: "Default",
            description: "Standard navigation with clear borders and structure.",
            example: {
                id: "nav-1",
                type: "navigation",
                props: {
                    links: [{ label: "Dev", url: "#" }],
                    showResumeButton: true,
                },
                styles: {
                    textColor: "text-slate-950",
                    backgroundColor: "bg-white",
                    buttonBackgroundColor: "bg-indigo-600",
                    borderColor: "border-indigo-600",
                },
            },
        },
        {
            name: "Minimal",
            description: "Clean, borderless look for modern designs.",
            example: {
                id: "nav-min-1",
                type: "navigation_minimal",
                props: {
                    links: [
                        { label: "Work", url: "#work" },
                        { label: "Studio", url: "#studio" },
                    ],
                    showResumeButton: true,
                },
                styles: {
                    textColor: "text-slate-950",
                    backgroundColor: "bg-transparent",
                    buttonBackgroundColor: "bg-zinc-900",
                },
            },
        },
        {
            name: "Brutalist",
            description: "High-contrast with thick borders and hard shadows.",
            example: {
                id: "nav-brutalist",
                type: "navigation",
                props: {
                    links: [
                        { label: "Projects", url: "#" },
                        { label: "Contact", url: "#" },
                    ],
                    showResumeButton: true,
                    variant: "brutalist",
                },
            },
        },
        {
            name: "Outline Minimal",
            description: "Zero border-radius with thin monochromatic borders.",
            example: {
                id: "nav-outline",
                type: "navigation",
                props: {
                    links: [
                        { label: "Portfolio", url: "#" },
                        { label: "Studio", url: "#" },
                    ],
                    showResumeButton: true,
                    variant: "outline_minimal",
                },
            },
        },
        {
            name: "Impact",
            description: "Bold uppercase links with high-contrast buttons.",
            example: {
                id: "nav-impact",
                type: "navigation",
                props: {
                    links: [
                        { label: "Works", url: "#" },
                        { label: "Contact", url: "#" },
                    ],
                    showResumeButton: true,
                    variant: "impact",
                },
            },
        },
        {
            name: "Glassmorphism",
            description:
                "Glasmorphism is design for modern adn futuristic website.",
            example: {
                id: "nav-glassmorphism",
                type: "navigation",
                props: {
                    links: [
                        { label: "Works", url: "#" },
                        { label: "Contact", url: "#" },
                    ],
                    showResumeButton: true,
                    variant: "glassmorphism",
                },
            },
        },
        {
            name: "Creative Gradient",
            description: "Modern gradient pill design with blur effects.",
            example: {
                id: "nav-creative",
                type: "navigation",
                props: {
                    links: [
                        { label: "Design", url: "#" },
                        { label: "Connect", url: "#" },
                    ],
                    showResumeButton: true,
                    variant: "creative_gradient",
                },
            },
        },
        {
            name: "Connected Line",
            description: "High-end design with minimal vertical line accents.",
            example: {
                id: "nav-connected",
                type: "navigation",
                props: {
                    links: [
                        { label: "Work", url: "#" },
                        { label: "Contact", url: "#" },
                    ],
                    showResumeButton: true,
                    variant: "connected_line",
                },
            },
        },
        {
            name: "Pixel",
            description: "Retro 8-bit terminal aesthetic with green-on-navy palette.",
            example: {
                id: "nav-pixel",
                type: "navigation",
                props: {
                    links: [
                        { label: "Work", url: "#" },
                        { label: "Contact", url: "#" },
                    ],
                    showResumeButton: true,
                    variant: "pixel",
                },
            },
        },
    ],
    props: [
        { name: "links", type: "array", desc: "List of {label, url}." },
        {
            name: "showResumeButton",
            type: "boolean",
            desc: "Toggle resume button.",
        },
        {
            name: "variant",
            type: '"default" | "minimal" | "brutalist" | "outline_minimal" | "impact" | "glassmorphism" | "connected_line" | "creative_gradient" | "pixel"',
            desc: "Visual style.",
        },
    ],
    common_styles: [
        {
            name: "textColor",
            type: "tailwind",
            desc: "Text color for the navigation links.",
        },
        {
            name: "backgroundColor",
            type: "tailwind",
            desc: "Background color for the container.",
        },
        {
            name: "borderColor",
            type: "tailwind",
            desc: "Border color for the container.",
        },
    ],
};
