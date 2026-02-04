export const SCHEMAS = [
  {
    type: "site_settings",
    category: "Core",
    description: "Global site identity and styling.",
    details:
      "Configuration for the overall site appearance, including the brand name, favicon, primary color theme, and SEO metadata.",
    example: {
      site_settings: {
        name: "Neko Brand",
        favicon: "https://example.com/favicon.ico",
        theme: { primary: "#6366f1", font: "Inter", darkMode: true },
        seo: { title: "Home", description: "Welcome" },
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
  },
  {
    type: "navigation",
    category: "Core",
    description: "Universal header component.",
    details:
      "Top navigation bar that persists across pages. Supports a list of links and an optional CTA button.",
    example: {
      id: "nav-1",
      type: "navigation",
      props: {
        links: [{ label: "Dev", url: "#" }],
        showResumeButton: true,
      },
      styles: {
        textColor: "text-white",
        backgroundColor: "bg-white",
        borderColor: "border-indigo-600",
      },
    },
    props: [
      { name: "links", type: "array", desc: "Array of {label, url} objects." },
      {
        name: "showResumeButton",
        type: "boolean",
        desc: 'Shows a "Resume" or primary CTA button.',
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
  },
  {
    type: "hero",
    category: "Content",
    description: "Impactful section with image/heading.",
    details:
      "Large introductory section usually placed at the top of the page. specifies a main heading, subheading, and an optional avatar image.",
    example: {
      id: "hero-1",
      type: "hero",
      props: {
        heading: "The Future of Web",
        subheading: "Built with JSON",
        avatarUrl: "https://api.dicebear.com/7.x/shapes/svg",
        alignment: "center",
        layout: "split",
        style: { titleColor: "#6366f1", titleSize: "text-8xl" },
      },
      styles: {
        padding: "py-32",
        maxWidth: "max-w-full",
        backgroundColor: "bg-slate-950",
      },
    },
    props: [
      { name: "heading", type: "string", desc: "Main headline text." },
      {
        name: "subheading",
        type: "string",
        desc: "Secondary descriptive text.",
      },
      {
        name: "avatarUrl",
        type: "url",
        desc: "URL for the profile/avatar image.",
      },
      { name: "alignment", type: '"left" | "center"', desc: "Text alignment." },
      { name: "layout", type: '"stack" | "split"', desc: "Layout style." },
    ],
  },
  {
    type: "stats_bar",
    category: "Content",
    description: "Numerical metrics and stats.",
    details: "A horizontal strip for highlighting key achievements or metrics with big text.",
    example: {
      id: "stats-1",
      type: "stats_bar",
      props: {
        items: [
          { label: "Projects", value: "50+" },
          { label: "Clients", value: "200" }
        ]
      },
      styles: { padding: "py-12" }
    },
    props: [
      { name: "items", type: "array", desc: "List of {label, value} objects." }
    ]
  },
  {
    type: "features",
    category: "Content",
    description: "Grid of unique selling points.",
    details:
      "Displays a grid of feature cards. Supports recursive rendering of other components within each card.",
    example: {
      id: "feat-1",
      type: "features",
      props: {
        title: "Why Neko?",
        items: [
          { title: "Fast", description: "Engineered for speed." },
          { title: "Safe", description: "No manual HTML." },
        ],
        columns: 2,
      },
      styles: {
        padding: "py-24",
        backgroundColor: "bg-gray-50",
        textAlign: "center",
      },
    },
    props: [
      { name: "title", type: "string", desc: "Section header." },
      {
        name: "items",
        type: "array",
        desc: "List of feature objects or component definitions.",
      },
      {
        name: "columns",
        type: "number",
        desc: "Number of columns (default: 3).",
      },
    ],
  },
  {
    type: "skills",
    category: "Content",
    description: "Skills with progress bars.",
    details:
      "Visual representation of technical skills with progress bars/levels.",
    example: {
      id: "skills-1",
      type: "skills",
      props: {
        title: "Technical Arsenal",
        barColor: "#6366f1",
        showProgressBar: true,
        showPercentage: true,
        skills: [{ name: "React", level: 90, color: "#61dafb" }],
      },
      styles: {
        padding: "py-20",
        maxWidth: "max-w-5xl",
      },
    },
    props: [
      { name: "title", type: "string", desc: "Section header." },
      {
        name: "showProgressBar",
        type: "boolean",
        desc: "Toggle level bars.",
      },
      {
        name: "showPercentage",
        type: "boolean",
        desc: "Show numeric percentage.",
      },
      {
        name: "skills",
        type: "array",
        desc: "List of skills {name, level, color}.",
      },
    ],
  },
  {
    type: "experience",
    category: "Content",
    description: "Professional timeline.",
    details: "Timeline view of work history or education.",
    example: {
      id: "exp-1",
      type: "experience",
      props: {
        title: "Work Experience",
        jobs: [
          {
            role: "Senior Dev",
            company: "Tech",
            period: "2020-2024",
            description: "Focused on React architecture.",
          },
        ],
      },
      styles: { padding: "py-24", backgroundColor: "bg-slate-50" },
    },
    props: [
      { name: "title", type: "string", desc: "Section header." },
      {
        name: "jobs",
        type: "array",
        desc: "List of {role, company, period, description}.",
      },
    ],
  },
  {
    type: "layout",
    category: "Layout",
    description: "Structural nested container.",
    details:
      "A structural component that allows nesting other components in rows or columns.",
    example: {
      id: "layout-1",
      type: "layout",
      props: {
        direction: "row",
        gap: "8",
        padding: "10",
        items: [
          {
            id: "sub-cta-1",
            type: "cta",
            props: { title: "Left Option", buttonText: "Go Left" },
          },
          {
            id: "sub-cta-2",
            type: "cta",
            props: { title: "Right Option", buttonText: "Go Right" },
          },
        ],
      },
      styles: { maxWidth: "max-w-7xl", padding: "py-10" },
    },
    props: [
      { name: "direction", type: '"row" | "col"', desc: "Flex direction." },
      {
        name: "items",
        type: "array",
        desc: "Array of child component objects.",
      },
      { name: "gap", type: "string", desc: "Inner gap (1-12)." },
      {
        name: "padding",
        type: "string",
        desc: "Inner padding (1-12).",
      },
    ],
  },
  {
    type: "cta",
    category: "Content",
    description: "Call to action focus.",
    details: "Simple section focused on a single call to action.",
    example: {
      id: "cta-1",
      type: "cta",
      props: { title: "Ready?", buttonText: "Start" },
      styles: {
        padding: "py-32",
        textAlign: "center",
        backgroundColor: "bg-indigo-600",
      },
    },
    props: [
      { name: "title", type: "string", desc: "Direct message." },
      { name: "buttonText", type: "string", desc: "Text for the button." },
    ],
  },
  {
    type: "image",
    category: "Content",
    description: "Responsive image with caption.",
    details:
      "Renders a single responsive image with optional caption and alt text.",
    example: {
      id: "img-1",
      type: "image",
      props: {
        src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
        alt: "Abstract",
        caption: "Design inspiration.",
      },
      styles: { padding: "py-20", maxWidth: "max-w-4xl" },
    },
    props: [
      { name: "src", type: "url", desc: "Image URL." },
      { name: "alt", type: "string", desc: "Accessibility text." },
      { name: "caption", type: "string", desc: "Optional text below image." },
    ],
  },
  {
    type: "skills_bullets",
    category: "Content",
    description: "Skills list with bullets.",
    details:
      "A simplified version of the skills section using pills/bullet points.",
    example: {
      id: "skills-bullets-1",
      type: "skills_bullets",
      props: {
        title: "Stack & Tools",
        bulletColor: "#6366f1",
        skills: ["VS Code", "GitHub", "Figma"],
      },
      styles: {
        padding: "py-20",
        maxWidth: "max-w-5xl",
      },
    },
    props: [
      { name: "title", type: "string", desc: "Section header." },
      {
        name: "bulletColor",
        type: "hex",
        desc: "Active/Icon color.",
      },
      {
        name: "textColor",
        type: "tailwind|hex",
        desc: "Text color (e.g., text-white or #fff).",
      },
      {
        name: "borderColor",
        type: "tailwind|hex",
        desc: "Border color (e.g., border-white or #fff).",
      },
      {
        name: "backgroundColor",
        type: "tailwind|hex",
        desc: "Background (e.g., bg-black or #000).",
      },
      {
        name: "skills",
        type: "array",
        desc: "List of skill names.",
      },
    ],
  },
  {
    type: "contact_info",
    category: "Connect",
    description: "Social and contact icon links.",
    details: "Display a clean row of icon buttons for email and social media.",
    example: {
      id: "contact-1",
      type: "contact_info",
      props: {
        title: "Let's connect",
        description: "Available for freelance work.",
        links: [
          { label: "Email", url: "mailto:hello@example.com", icon: "Mail" },
          { label: "GitHub", url: "https://github.com", icon: "Github" }
        ],
        alignment: "center"
      }
    },
    props: [
      { name: "title", type: "string", desc: "Heading text." },
      { name: "description", type: "string", desc: "Secondary text." },
      { name: "links", type: "array", desc: "List of {label, url, icon}." },
      { name: "alignment", type: '"left" | "center" | "right"', desc: "Alignment." }
    ]
  },
  {
    type: "project_details",
    category: "Connect",
    description: "Detailed project showcase card.",
    details: "A comprehensive project card highlighting description and tech stack.",
    example: {
      id: "project-1",
      type: "project_details",
      props: {
        title: "Nekoneko Platform",
        description: "A professional minimal site builder.",
        stacks: ["React", "TypeScript", "Convex"],
        link: "https://nekoneko.space"
      }
    },
    props: [
      { name: "title", type: "string", desc: "Project title." },
      { name: "description", type: "string", desc: "Description text." },
      { name: "stacks", type: "array", desc: "Tech stack strings." },
      { name: "link", type: "url", desc: "External link." }
    ]
  },
  {
    type: "pricing",
    category: "Content",
    description: "Multi-tier pricing tables.",
    details: "Display subscription plans or service tiers with features and pricing.",
    example: {
      id: "pricing-1",
      type: "pricing",
      props: {
        title: "Simple Pricing",
        plans: [
          { name: "Free", price: "$0", features: ["1 Project", "Basic Themes"] },
          { name: "Pro", price: "$19", features: ["Unlimited Projects", "Custom CSS"], isPopular: true }
        ]
      },
      styles: { padding: "py-24" }
    },
    props: [
      { name: "title", type: "string", desc: "Section header." },
      { name: "plans", type: "array", desc: "Array of {name, price, features, isPopular}." }
    ]
  },
  {
    type: "project_grid",
    category: "Content",
    description: "Visual portfolio grid.",
    details: "Showcase projects with large preview images and category tags.",
    example: {
      id: "pgrid-1",
      type: "project_grid",
      props: {
        title: "Selected Works",
        columns: 2,
        items: [
          { title: "Neko App", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c", tags: ["Web", "Design"], link: "#" }
        ]
      },
      styles: { padding: "py-24" }
    },
    props: [
      { name: "title", type: "string", desc: "Section header." },
      { name: "columns", type: "number", desc: "Column count (2-3)." },
      { name: "items", type: "array", desc: "Array of {title, image, tags, link}." }
    ]
  },
];
