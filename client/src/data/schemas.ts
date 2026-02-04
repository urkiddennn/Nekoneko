export const SCHEMAS = [
    {
        type: 'site_settings',
        description: 'Global site identity and styling.',
        details: 'Configuration for the overall site appearance, including the brand name, favicon, primary color theme, and SEO metadata.',
        example: {
            "site_settings": {
                "name": "Neko Brand",
                "favicon": "https://example.com/favicon.ico",
                "theme": { "primary": "#6366f1", "font": "Inter", "darkMode": true },
                "seo": { "title": "Home", "description": "Welcome" }
            },
            "sections": []
        },
        props: [
            { name: 'name', type: 'string', desc: 'Brand name displayed in the header.' },
            { name: 'theme.primary', type: 'hex', desc: 'Primary brand color.' },
            { name: 'theme.darkMode', type: 'boolean', desc: 'Toggle dark mode.' },
            { name: 'seo.title', type: 'string', desc: 'Page title for browser tab.' },
        ]
    },
    {
        type: 'navigation',
        description: 'Universal header component.',
        details: 'Top navigation bar that persists across pages. Supports a list of links and an optional CTA button.',
        example: {
            "id": "nav-1",
            "type": "navigation",
            "props": {
                "links": [{ "label": "Dev", "url": "#" }],
                "showResumeButton": true
            }
        },
        props: [
            { name: 'links', type: 'array', desc: 'Array of {label, url} objects.' },
            { name: 'showResumeButton', type: 'boolean', desc: 'Shows a "Resume" or primary CTA button.' },
        ]
    },
    {
        type: 'hero',
        description: 'Impactful section with image/heading.',
        details: 'Large introductory section usually placed at the top of the page. specifices a main heading, subheading, and an optional avatar image.',
        example: {
            "id": "hero-1",
            "type": "hero",
            "props": {
                "heading": "The Future of Web",
                "subheading": "Built with JSON",
                "avatarUrl": "https://api.dicebear.com/7.x/shapes/svg",
                "alignment": "center",
                "layout": "split",
                "bg": { "type": "color", "value": "#07090e" },
                "style": {
                    "titleColor": "#6366f1",
                    "titleSize": "text-8xl"
                }
            }
        },
        props: [
            { name: 'heading', type: 'string', desc: 'Main headline text.' },
            { name: 'subheading', type: 'string', desc: 'Secondary descriptive text.' },
            { name: 'avatarUrl', type: 'url', desc: 'URL for the profile/avatar image.' },
            { name: 'alignment', type: '"left" | "center"', desc: 'Text alignment.' },
            { name: 'layout', type: '"stack" | "split"', desc: 'Layout style.' },
            { name: 'style.titleColor', type: 'hex', desc: 'Custom title color.' },
            { name: 'style.subtitleColor', type: 'hex', desc: 'Custom subtitle color.' },
            { name: 'style.titleSize', type: 'string', desc: 'Tailwind class (e.g. text-7xl).' },
        ]
    },
    {
        type: 'features',
        description: 'Grid of unique selling points.',
        details: 'Displays a grid of feature cards, each with a title and description. Useful for highlighting key product benefits.',
        example: {
            "id": "feat-1",
            "type": "features",
            "props": {
                "title": "Why Neko?",
                "items": [
                    { "title": "Fast", "description": "Engineered for speed." },
                    { "title": "Safe", "description": "No manual HTML." }
                ],
                "columns": 2
            }
        },
        props: [
            { name: 'title', type: 'string', desc: 'Section header.' },
            { name: 'items', type: 'array', desc: 'List of feature objects {title, description}.' },
            { name: 'columns', type: 'number', desc: 'Number of columns in the grid (e.g., 2, 3).' },
        ]
    },
    {
        type: 'skills',
        description: 'Skills section.',
        details: 'Visual representation of technical skills with progress bars/levels.',
        example: {
            "id": "skills-1",
            "type": "skills",
            "props": {
                "title": "Technical Arsenal",
                "barColor": "#6366f1",
                "skills": [
                    { "name": "React", "level": 90, "color": "#61dafb" },
                    { "name": "TypeScript", "level": 85, "color": "#3178c6" },
                    { "name": "Tailwind", "level": 95 }
                ]
            }
        },
        props: [
            { name: 'title', type: 'string', desc: 'Section header.' },
            { name: 'barColor', type: 'hex', desc: 'Default color for all skill bars.' },
            { name: 'skills', type: 'array', desc: 'List of skills {name, level, color}. Level is 0-100.' },
        ]
    },
    {
        type: 'experience',
        description: 'Professional timeline.',
        details: 'Timeline view of work history or education.',
        example: {
            "id": "exp-1",
            "type": "experience",
            "props": {
                "title": "Work Experience",
                "jobs": [
                    {
                        "role": "Senior Developer",
                        "company": "Tech Corp",
                        "period": "2020 - Present",
                        "description": "Leading frontend architecture."
                    }
                ]
            }
        },
        props: [
            { name: 'title', type: 'string', desc: 'Section header.' },
            { name: 'jobs', type: 'array', desc: 'List of job objects.' },
        ]
    },
    {
        type: 'pricing',
        description: 'Compare plans/tiers side-by-side.',
        details: 'Pricing table to compare different subscription tiers.',
        example: {
            "id": "price-1",
            "type": "pricing",
            "props": {
                "title": "Flexible Pricing",
                "tiers": [
                    { "name": "Free", "price": "$0", "features": ["1 Site", "JSON Export"] },
                    { "name": "Pro", "price": "$12", "features": ["Unlimited Sites"], "isPopular": true }
                ]
            }
        },
        props: [
            { name: 'title', type: 'string', desc: 'Section header.' },
            { name: 'tiers', type: 'array', desc: 'List of pricing tiers.' },
        ]
    },
    {
        type: 'layout',
        description: 'Nested container for horizontal/vertical layouts.',
        details: 'A structural component that allows nesting other components in rows or columns. Essential for complex page layouts.',
        example: {
            "id": "layout-1",
            "type": "layout",
            "props": {
                "direction": "row",
                "gap": "8",
                "padding": "10",
                "items": [
                    {
                        "id": "sub-cta-1",
                        "type": "cta",
                        "props": { "title": "Left Option", "buttonText": "Go Left" }
                    },
                    {
                        "id": "sub-cta-2",
                        "type": "cta",
                        "props": { "title": "Right Option", "buttonText": "Go Right" }
                    }
                ]
            }
        },
        props: [
            { name: 'direction', type: '"row" | "col"', desc: 'Flex direction.' },
            { name: 'items', type: 'array', desc: 'Array of child component objects.' },
            { name: 'gap', type: 'string', desc: 'Tailwind gap class (e.g., "4", "8").' },
            { name: 'padding', type: 'string', desc: 'Tailwind padding class (e.g., "4").' },
        ]
    },
    {
        type: 'cta',
        description: 'Call to action button focus.',
        details: 'Simple section focused on a single call to action.',
        example: {
            "id": "cta-1",
            "type": "cta",
            "props": {
                "title": "Ready to build?",
                "buttonText": "Start Exporting"
            }
        },
        props: [
            { name: 'title', type: 'string', desc: 'Direct message/Primary text.' },
            { name: 'buttonText', type: 'string', desc: 'Text for the button.' },
        ]
    },
    {
        type: 'image',
        description: 'Responsive image with caption.',
        details: 'Renders a single responsive image with optional caption and alt text.',
        example: {
            "id": "img-1",
            "type": "image",
            "props": {
                "src": "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
                "alt": "Cyberpunk styling",
                "caption": "Neon lights in the rain."
            }
        },
        props: [
            { name: 'src', type: 'url', desc: 'Wrapper image URL.' },
            { name: 'alt', type: 'string', desc: 'Accessibility text description.' },
            { name: 'caption', type: 'string', desc: 'Optional text displayed below image.' },
        ]
    }
];
