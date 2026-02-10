export const site_settings = {
    type: "site_settings",
    category: "Core",
    description: "Global site identity and styling.",
    details:
        "Configuration for the overall site appearance, including the brand name, favicon, primary color theme, and SEO metadata.",
    example: {
        site_settings: {
            name: "Neko Brand",
            favicon: "https://example.com/favicon.ico",
            theme: {
                primary: "#6366f1",
                font: "Inter",
                darkMode: true,
                showThemeToggle: true,
            },
            seo: { title: "Home", description: "Welcome" },
            layout: {
                paddingTop: "24",
                paddingBottom: "24",
            },
        },
        sections: [],
    },
    props: [
        {
            name: "name",
            type: "string",
            desc: "Brand name displayed in the header.",
        },
        { name: "theme.primary", type: "hex", desc: "Primary brand color." },
        { name: "theme.darkMode", type: "boolean", desc: "Toggle dark mode." },
        {
            name: "theme.showThemeToggle",
            type: "boolean",
            desc: "Show floating theme toggle.",
        },
        { name: "theme.font", type: "string", desc: "Global font family." },
        {
            name: "layout.padding",
            type: "tailwind",
            desc: "Global layout padding.",
        },
        {
            name: "seo.title",
            type: "string",
            desc: "Page title for browser tab.",
        },
    ],
    common_styles: [
        {
            name: "padding",
            type: "tailwind",
            desc: 'Spacing around section (e.g., "py-24").',
        },
        {
            name: "backgroundColor",
            type: "tailwind",
            desc: 'Section background (e.g., "bg-slate-50").',
        },
        {
            name: "maxWidth",
            type: "tailwind",
            desc: 'Horizontal constraint (e.g., "max-w-4xl").',
        },
    ],
};
