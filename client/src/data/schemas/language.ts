export const language = {
    type: "language",
    category: "Content",
    description: "Language proficiency display.",
    details: "Displays languages with abbreviation badges. Supports pixel and default styles.",
    example: {
        id: "lang-1",
        type: "language",
        props: {
            title: "Language",
            languages: [
                { name: "English", code: "EN" },
                { name: "Indonesian", code: "ID" },
            ],
            variant: "default",
        },
    },
    props: [
        { name: "title", type: "string", desc: "Section heading." },
        { name: "languages", type: "array", desc: "Array of {name, code, level?}." },
        { name: "variant", type: '"default" | "pixel"', desc: "Visual style." },
    ],
    variants: [
        {
            name: "Default",
            description: "Clean list with code badges.",
            example: {
                id: "lang-default",
                type: "language",
                props: {
                    title: "Language",
                    languages: [{ name: "English", code: "EN" }],
                    variant: "default",
                },
            },
        },
        {
            name: "Pixel",
            description: "Retro 8-bit pixel art style with green accents.",
            example: {
                id: "lang-pixel",
                type: "language",
                props: {
                    title: "Language",
                    languages: [
                        { name: "Indonesia", code: "IN" },
                        { name: "English", code: "EN" },
                    ],
                    variant: "pixel",
                },
            },
        },
    ],
};
