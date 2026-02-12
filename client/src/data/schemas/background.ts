
export const background = {
    type: "background",
    label: "Background",
    category: "Layout",
    description: "A versatile background component with multiple animated variants including polka dots, gradients, space themes, and more.",
    example: {
        id: "background-1",
        type: "background",
        props: {
            variant: "animated_polka",
            children: {
                id: "hero-bg-demo",
                type: "hero",
                props: {
                    title: "Background Demo",
                    subtitle: "This content sits on top of the background.",
                    alignment: "center"
                }
            }
        },
        styles: {
            height: "400px"
        }
    },
    variants: [
        {
            name: "Animated Polka",
            description: "A playful, moving polka dot pattern.",
            example: {
                id: "bg-polka",
                type: "background",
                props: { variant: "animated_polka" },
                styles: { height: "400px" }
            }
        },
        {
            name: "Animated Gradient",
            description: "A soft, shifting color gradient.",
            example: {
                id: "bg-gradient",
                type: "background",
                props: { variant: "animated_gradient" },
                styles: { height: "400px" }
            }
        },
        {
            name: "Deep Space",
            description: "A star field animation with twinkling effects.",
            example: {
                id: "bg-space",
                type: "background",
                props: { variant: "deep_space" },
                styles: { height: "400px" }
            }
        },
        {
            name: "Silk Flow",
            description: "A smooth, wave-like animation resembling flowing silk.",
            example: {
                id: "bg-silk",
                type: "background",
                props: { variant: "silk_flow" },
                styles: { height: "400px" }
            }
        },
        {
            name: "Dot Field",
            description: "A grid of dots that reacts to mouse movement.",
            example: {
                id: "bg-dots",
                type: "background",
                props: { variant: "dot_field" },
                styles: { height: "400px" }
            }
        },
        {
            name: "Fractal Glass",
            description: "A frosted glass effect with moving geometric shapes.",
            example: {
                id: "bg-glass",
                type: "background",
                props: { variant: "fractal_glass" },
                styles: { height: "400px" }
            }
        },
        {
            name: "Gradient Circles",
            description: "Large, blurry colored circles drifting slowly.",
            example: {
                id: "bg-circles",
                type: "background",
                props: { variant: "gradient_circles" },
                styles: { height: "400px" }
            }
        },
        {
            name: "Plasma",
            description: "A fluid, organic movement of colors.",
            example: {
                id: "bg-plasma",
                type: "background",
                props: { variant: "plasma" },
                styles: { height: "400px" }
            }
        },
        {
            name: "Background Grid",
            description: "A retro-style grid layout.",
            example: {
                id: "bg-grid",
                type: "background",
                props: { variant: "background_grid" },
                styles: { height: "400px" }
            }
        },
        {
            name: "Aurora",
            description: "An effect simulating the northern lights.",
            example: {
                id: "bg-aurora",
                type: "background",
                props: { variant: "aurora" },
                styles: { height: "400px" }
            }
        },
        {
            name: "Spotlight",
            description: "A dark background with a moving spotlight effect that follows the cursor.",
            example: {
                id: "bg-spotlight",
                type: "background",
                props: { variant: "spotlight" },
                styles: { height: "400px" }
            }
        }
    ],
    props: [
        {
            name: "variant",
            type: "select",
            label: "Variant",
            options: [
                { label: "Animated Polka", value: "animated_polka" },
                { label: "Animated Gradient", value: "animated_gradient" },
                { label: "Deep Space", value: "deep_space" },
                { label: "Silk Flow", value: "silk_flow" },
                { label: "Dot Field", value: "dot_field" },
                { label: "Spotlight", value: "spotlight" },
                { label: "Fractal Glass", value: "fractal_glass" },
                { label: "Gradient Circles", value: "gradient_circles" },
                { label: "Plasma", value: "plasma" },
                { label: "Background Grid", value: "background_grid" },
                { label: "Aurora", value: "aurora" },
            ],
            defaultValue: "animated_polka",
            desc: "Select the visual style of the background.",
        },
        {
            name: "anchorId",
            type: "text",
            label: "Anchor ID",
            desc: "Unique ID for navigation links (e.g., 'my-section').",
        },
        {
            name: "alignHorizontal",
            type: "select",
            label: "Horizontal Alignment",
            options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
            ],
            defaultValue: "center",
            desc: "Horizontal alignment of the content.",
        },
        {
            name: "alignVertical",
            type: "select",
            label: "Vertical Alignment",
            options: [
                { label: "Top", value: "top" },
                { label: "Center", value: "center" },
                { label: "Bottom", value: "bottom" },
            ],
            defaultValue: "center",
            desc: "Vertical alignment of the content.",
        },
        {
            name: "children",
            type: "slot",
            label: "Content",
            desc: "The content to handle inside the background.",
        },
        {
            name: "color1",
            type: "color",
            label: "Primary Color",
            desc: "Main accent color for the background effect.",
        },
        {
            name: "color2",
            type: "color",
            label: "Secondary Color",
            desc: "Secondary accent color.",
        },
        {
            name: "color3",
            type: "color",
            label: "Tertiary Color",
            desc: "Tertiary accent color.",
        },
    ],
    styles: [
        {
            name: "height",
            type: "text",
            label: "Height (e.g., 500px, 100vh)",
        },
        {
            name: "padding",
            type: "text",
            label: "Padding",
        }
    ]
};
