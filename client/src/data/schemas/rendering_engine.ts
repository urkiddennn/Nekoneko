export const rendering_engine = {
    type: "rendering_engine",
    category: "Guides",
    description: "How the SectionRenderer turns JSON into live components.",
    documentation: {
        sections: [
            {
                title: "The Rendering Pipeline",
                content: "The SectionRenderer is the heart of Nekoneko. It receives an array of section objects and converts each one into a live React component. The pipeline works in three stages:\n\n1. Registry Lookup — Each section's `type` is matched to a React component in the `componentRegistry`.\n2. Lazy Loading — Components are loaded on-demand using React.lazy, keeping the initial bundle small.\n3. Prop Injection — The section's `props` and `styles` are passed directly to the matched component."
            },
            {
                title: "How It Works (Flowchart)",
                content: "Here's the step-by-step flow when a page renders:\n\n┌──────────────────┐\n│   SiteConfig     │  ← Your JSON\n│   { sections }   │\n└───────┬──────────┘\n        │\n        ▼\n┌──────────────────┐\n│ SectionRenderer  │  ← Maps over sections array\n└───────┬──────────┘\n        │\n   For each section:\n        │\n        ▼\n┌──────────────────┐\n│ componentRegistry│  ← Lookup: type → Component\n│ \"hero\" → Hero    │\n│ \"features\" → ... │\n└───────┬──────────┘\n        │\n        ▼\n┌──────────────────┐\n│  React.lazy()    │  ← Code-split loading\n└───────┬──────────┘\n        │\n        ▼\n┌──────────────────┐\n│ <Component       │  ← Final render\n│   {...props}     │\n│   styles={...}   │\n│ />               │\n└──────────────────┘\n\nEach component is independent — it receives its own props and styles, rendered in the order defined by the sections array."
            },
            {
                title: "The Component Registry",
                content: "The registry is a simple map of string keys to lazy-loaded React components. When you add a new component to Nekoneko, you register it here:\n\n1. Create the component in `src/components/library/`\n2. Add a lazy import in `SectionRenderer.tsx`\n3. Map the type string to the import\n\nThe type string in your JSON must exactly match the registry key. For example, `\"type\": \"hero\"` maps to the Hero component, `\"type\": \"features\"` maps to Features, etc.",
                code: `// Inside SectionRenderer.tsx
const componentRegistry: Record<string, React.LazyExoticComponent<any>> = {
  hero: lazy(() => import("./library/Hero")),
  features: lazy(() => import("./library/Features")),
  navigation: lazy(() => import("./library/Navigation")),
  footer: lazy(() => import("./library/Footer")),
  // ... more components
};`
            },
            {
                title: "Layout Sections",
                content: "The `layout` type is special — it supports nested sections. A layout section has a `children` array in its props, where each child is itself a section object. The SectionRenderer handles this recursively, rendering child sections inside the layout container.\n\nThis allows you to create multi-column grids, split views, or any container pattern while keeping the JSON structure flat and readable.",
                code: `{
  "id": "layout-1",
  "type": "layout",
  "props": {
    "columns": 2,
    "gap": "2rem",
    "children": [
      {
        "id": "child-1",
        "type": "features",
        "props": { "heading": "Left Column" }
      },
      {
        "id": "child-2",
        "type": "cta",
        "props": { "heading": "Right Column" }
      }
    ]
  }
}`
            },
            {
                title: "Styles & Theming",
                content: "Each section can have a `styles` object that controls its visual container:\n\n• `padding` — Tailwind padding classes (e.g. `py-16 px-4`)\n• `margin` — Tailwind margin classes\n• `backgroundColor` — Tailwind background or hex color\n• `maxWidth` — Container width constraint\n• `borderRadius` — Corner rounding\n• `textAlign` — Text alignment (left, center, right)\n\nThese styles wrap the component and don't interfere with the component's internal design. The theme's `primary` color and `font` are also inherited automatically by all components."
            }
        ]
    }
};
