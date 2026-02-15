export const icons_guide = {
    type: "icons_guide",
    category: "Guides",
    description: "How to use icons throughout your Nekoneko site.",
    documentation: {
        sections: [
            {
                title: "Icon System Overview",
                content: "Nekoneko uses the Lucide icon library — a clean, consistent set of 1400+ open-source icons. Icons can be used in several components including Navigation, Features, Skills, ConnectWithMe, and Footer.\n\nAll icon names follow the kebab-case format (e.g. `arrow-right`, `github`, `mail`). The component internally maps these strings to the corresponding Lucide React component."
            },
            {
                title: "Using the Icon Browser",
                content: "The Editor has a built-in Icon Browser extension:\n\n1. Open the Editor for any project.\n2. Click the Extensions icon (grid) in the left sidebar.\n3. Under 'Optional', toggle on 'Icon Browser'.\n4. A new icon (Shapes) appears in the sidebar — click it.\n5. Search for any icon by name.\n6. Click an icon to copy its kebab-case name to your clipboard.\n7. Paste the icon name into your component's JSON props.\n\nThe icon name you copy is ready to use directly in your JSON configuration."
            },
            {
                title: "Icons in Navigation",
                content: "Navigation links can have icons next to labels. Use the `icon` field in each link object:",
                code: `{
  "type": "navigation",
  "props": {
    "links": [
      { "label": "Home", "url": "/", "icon": "home" },
      { "label": "Projects", "url": "#projects", "icon": "folder" },
      { "label": "Contact", "url": "#contact", "icon": "mail" }
    ]
  }
}`
            },
            {
                title: "Icons in Features",
                content: "Feature items can display icons to visually represent each feature:",
                code: `{
  "type": "features",
  "props": {
    "heading": "What We Offer",
    "features": [
      {
        "title": "Fast Performance",
        "description": "Lightning-fast loading times",
        "icon": "zap"
      },
      {
        "title": "Secure",
        "description": "Enterprise-grade security",
        "icon": "shield"
      },
      {
        "title": "Analytics",
        "description": "Real-time insights",
        "icon": "bar-chart-3"
      }
    ]
  }
}`
            },
            {
                title: "Icons in Skills",
                content: "The Skills component uses icons to represent technologies and tools. Just use the technology name — common tech icons are mapped automatically:",
                code: `{
  "type": "skills",
  "props": {
    "heading": "Tech Stack",
    "skills": [
      { "name": "React", "level": 95, "icon": "code" },
      { "name": "Node.js", "level": 85, "icon": "server" },
      { "name": "Design", "level": 80, "icon": "palette" }
    ]
  }
}`
            },
            {
                title: "Icons in ConnectWithMe",
                content: "Social media links in ConnectWithMe automatically resolve icon names for popular platforms (github, twitter, linkedin, etc). You can also use custom icons:",
                code: `{
  "type": "connect_with_me",
  "props": {
    "heading": "Let's Connect",
    "links": [
      { "platform": "GitHub", "url": "https://github.com/you", "icon": "github" },
      { "platform": "Twitter", "url": "https://twitter.com/you", "icon": "twitter" },
      { "platform": "Email", "url": "mailto:you@email.com", "icon": "mail" }
    ]
  }
}`
            },
            {
                title: "Common Icon Names",
                content: "Here are some frequently used icon names for quick reference:\n\n• Navigation: `home`, `menu`, `x`, `arrow-left`, `arrow-right`, `external-link`\n• Social: `github`, `twitter`, `linkedin`, `youtube`, `instagram`, `globe`\n• Actions: `download`, `upload`, `copy`, `share-2`, `search`, `settings`\n• Content: `file-text`, `image`, `video`, `music`, `book-open`, `folder`\n• Status: `check`, `x`, `alert-triangle`, `info`, `bell`, `star`\n• Tech: `code`, `terminal`, `database`, `server`, `cpu`, `wifi`\n• Design: `palette`, `pen-tool`, `layers`, `layout`, `grid`, `eye`\n\nFor the full list, use the Icon Browser extension in the Editor."
            }
        ]
    }
};
