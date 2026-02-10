export const theme_toggle = {
    type: "theme_toggle",
    category: "Core",
    description: "Dark mode switch.",
    details: "A component to toggle between light and dark modes.",
    example: {
        id: "toggle-1",
        type: "theme_toggle",
        props: {
            variant: "floating",
        },
    },
    props: [
        {
            name: "variant",
            type: '"floating" | "inline" | "minimal"',
            desc: "Visual style.",
        },
    ],
    variants: [
        {
            name: "Floating",
            description: "Fixed position bottom-right toggle.",
            example: {
                id: "toggle-float",
                type: "theme_toggle",
                props: { variant: "floating" },
            },
        },
        {
            name: "Inline",
            description: "Centered inline toggle for headers/footers.",
            example: {
                id: "toggle-inline",
                type: "theme_toggle",
                props: { variant: "inline" },
            },
        },
        {
            name: "Minimal",
            description: "Small circular toggle.",
            example: {
                id: "toggle-min",
                type: "theme_toggle",
                props: { variant: "minimal" },
            },
        },
    ],
};
