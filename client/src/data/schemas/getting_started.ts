export const getting_started = {
    type: "getting_started",
    category: "Guides",
    description: "Learn how to build beautiful websites with Nekoneko.",
    documentation: {
        sections: [
            {
                title: "The Vision",
                content: "Nekoneko is more than just a website builder; it's a design-system-first architecture that bridges the gap between structured data and high-end visual design. Our mission is to allow anyone to create websites that look like they were custom-coded by a top-tier design agency, all through a simple, declarative JSON interface."
            },
            {
                title: "Core Architecture: Data to UI",
                content: "Nekoneko follows a unidirectional flow where your site remains a single source of truth—the `SiteConfig` object. \n\n1. The JSON Schema: Everything from typography to the layout of a single button is defined in a JSON object.\n2. The Context Layer: The `SiteContext` manages this state globally, handling live updates as you edit.\n3. The Rendering Engine: Our `SectionRenderer` takes this data and dynamically instantiates React components from our internal library, mapping JSON 'types' to functional modules."
            },
            {
                title: "Understanding Sections",
                content: "A Nekoneko site is a vertical stack of Sections. Each section is an independent module designed with a specific purpose (Hero, Features, Experience). \n\nSections are governed by two distinct data points:\n- Props: Control 'what' the section displays (text, image URLs, button links).\n- Styles: Control 'how' it looks (padding, background colors, alignment, max-width).\n\nThis separation allows you to swap content without breaking the layout, or completely reskin a section while keeping the information intact."
            },
            {
                title: "Design Variants",
                content: "Most sections come with built-in Variants. A variant isn't just a different style—it's often a completely different sub-layout that fits the same data schema. For example, a `hero` might have a `split` variant for side-by-side content or a `glassmorphism` variant for a modern, futuristic aesthetic. This allows for infinite creative combinations while maintaining strict design consistency."
            },
            {
                title: "The Styling System",
                content: "We use a Tailwind-compatible styling engine. This means you can use standard Utility Classes or our curated design tokens. Our engine sanitizes and applies these classes to the wrapper and inner containers of every section, ensuring responsiveness and dark mode compatibility are handled automatically."
            },
            {
                title: "Example Configuration",
                content: "Here is how a complete site is structured. Notice how the `site_settings` define the global identity, while the `sections` array defines the page flow.",
                code: `// The Blueprint of your Website
{
  "site_settings": {
    "name": "Nova Portfolio",
    "theme": {
      "primary": "#6366f1",
      "font": "Inter",
      "darkMode": true
    },
    "seo": {
      "title": "Home | Nova",
      "description": "Creative Portfolio"
    }
  },
  "sections": [
    {
      "id": "nav-1",
      "type": "navigation",
      "props": { "links": [{ "label": "Work", "url": "#" }], "showResumeButton": true },
      "styles": { "backgroundColor": "bg-white/10", "textColor": "text-white" }
    },
    {
      "id": "hero-1",
      "type": "hero",
      "props": {
        "heading": "Designing the Future",
        "subheading": "One JSON at a time.",
        "variant": "glassmorphism"
      },
      "styles": { "padding": "py-32" }
    }
  ]
}`
            }
        ]
    }
};
