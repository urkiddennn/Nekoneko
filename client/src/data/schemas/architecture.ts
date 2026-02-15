export const architecture = {
    type: "architecture",
    category: "Guides",
    description: "Understand the internal architecture of Nekoneko — from JSON to pixels.",
    documentation: {
        sections: [
            {
                title: "Overview",
                content: "Nekoneko follows a JSON-driven architecture. Your entire website is defined as a single JSON object called SiteConfig. This object flows through a unidirectional pipeline: from the Editor → through validation → into the rendering engine → and finally onto the screen as a fully functional website."
            },
            {
                title: "The Data Pipeline",
                content: "The system follows a strict flow:\n\n1. SiteConfig JSON → The single source of truth for your entire site.\n2. Convex Backend → Persists, validates, and syncs the config in real-time.\n3. SiteContext → A React context that provides the config to all components.\n4. SectionRenderer → Maps each section's `type` to a React component from the registry.\n5. Rendered Output → The final website, live in the browser.\n\nThis means editing your JSON is editing your site — there is no separate 'build' step."
            },
            {
                title: "JSON-RPC & Data Flow",
                content: "Nekoneko uses Convex as its backend, which operates on a reactive, real-time model similar to JSON-RPC:\n\n• Mutations — Write operations (save config, publish to community, etc.) are defined as Convex mutations. They validate input, authenticate users, and persist data.\n• Queries — Read operations (load config, list community resources) are reactive. When data changes on the server, all connected clients update automatically.\n• Real-time Sync — Because Convex queries are subscriptions under the hood, any change to the database instantly propagates to all open editors and live sites.\n\nThis means when you save in the Editor, your live site updates within milliseconds — no deploy step, no webhooks, no polling."
            },
            {
                title: "The SiteConfig Object",
                content: "Every Nekoneko site is a single JSON object with two top-level keys:\n\n• `site_settings` — Global configuration: name, theme (colors, fonts, dark mode), SEO metadata, and layout settings.\n• `sections` — An ordered array of section objects, each with an `id`, `type`, `props`, and optional `styles`.\n\nThe `type` field is the key — it maps to a registered component in the rendering engine. The `props` are passed directly to that component. The `styles` are applied as wrapper CSS.",
                code: `{
  "site_settings": {
    "name": "My Portfolio",
    "theme": {
      "primary": "#6366f1",
      "font": "Inter",
      "darkMode": true,
      "showThemeToggle": true
    },
    "seo": {
      "title": "Home | Portfolio",
      "description": "A creative portfolio built with Nekoneko"
    }
  },
  "sections": [
    {
      "id": "hero-1",
      "type": "hero",
      "props": {
        "heading": "Hello World",
        "variant": "glassmorphism"
      },
      "styles": {
        "padding": "py-32"
      }
    }
  ]
}`
            },
            {
                title: "Authentication Flow",
                content: "All mutations use the `verifyUser` function which supports two authentication strategies:\n\n1. Convex Auth Sessions — If the user is logged in via @convex-dev/auth (GitHub, credentials), the session is verified automatically.\n2. JWT Token Fallback — For API access, a JWT token can be passed manually.\n\nThis dual approach allows both the web app and potential external tools to interact with the backend securely."
            }
        ]
    }
};
