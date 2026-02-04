export const SCHEMAS = [
  {
    type: "site_settings",
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
        name: "margin",
        type: "tailwind",
        desc: 'Spacing outside section (e.g., "my-12").',
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
      {
        name: "textAlign",
        type: '"left" | "center" | "right"',
        desc: "Text alignment for the section container.",
      },
    ],
  },
  {
    type: "navigation",
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
        textColorClass: "text-white",
        backgroundColorClass: "bg-white",
        borderColorClass: "border-indigo-600",
      },
    },
    props: [
      { name: "links", type: "array", desc: "Array of {label, url} objects." },
      {
        name: "showResumeButton",
        type: "boolean",
        desc: 'Shows a "Resume" or primary CTA button.',
      },
      {
        name: "textColor",
        type: "tailwind",
        desc: "Text color for the navigation links.",
      },
      {
        name: "borderColor",
        type: "tailwind",
        desc: "Border color for the navigation container.",
      },
      {
        name: "backgroundColor",
        type: "tailwind",
        desc: "Background color for the navigation container.",
      },
    ],
  },
  {
    type: "hero",
    description: "Impactful section with image/heading.",
    details:
      "Large introductory section usually placed at the top of the page. specifices a main heading, subheading, and an optional avatar image.",
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
    type: "features",
    description: "Grid of unique selling points.",
    details:
      "Displays a grid of feature cards, each with a title and description. Useful for highlighting key product benefits.",
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
        desc: "List of feature objects {title, description}.",
      },
      {
        name: "columns",
        type: "number",
        desc: "Number of columns in the grid (e.g., 2, 3).",
      },
    ],
  },
  {
    type: "skills",
    description: "Skills section.",
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
        desc: "Toggles the visibility of skill level bars.",
      },
      {
        name: "showPercentage",
        type: "boolean",
        desc: "Displays the numeric percentage next to skill names.",
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
        desc: "List of {role, company, period, description} objects.",
      },
    ],
  },
  {
    type: "layout",
    description: "Nested container for horizontal/vertical layouts.",
    details:
      "A structural component that allows nesting other components in rows or columns. Essential for complex page layouts.",
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
      { name: "gap", type: "string", desc: "Inner gap (Tailwind scale 1-12)." },
      {
        name: "padding",
        type: "string",
        desc: "Inner padding (Tailwind scale 1-12).",
      },
    ],
  },
  {
    type: "cta",
    description: "Call to action button focus.",
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
    description: "Skills list with bullets.",
    details:
      "A simplified version of the skills section that displays skills as a collection of bulleted pills.",
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
        desc: "Color for the bullet point indicator.",
      },
      {
        name: "skills",
        type: "array",
        desc: "List of skill names (strings).",
      },
    ],
  },
  {
    type: "contact_info",
    description: "Social and contact icon links.",
    details: "Display a clean row of icon buttons for email, social media, and other contact methods.",
    example: {
      id: "contact-1",
      type: "contact_info",
      props: {
        title: "Let's connect",
        description: "Available for freelance work and collaborations.",
        links: [
          { label: "Email", url: "mailto:hello@example.com", icon: "Mail" },
          { label: "X", url: "https://x.com", icon: "Twitter" },
          { label: "GitHub", url: "https://github.com", icon: "Github" }
        ],
        alignment: "center"
      }
    },
    props: [
      { name: "title", type: "string", desc: "Main heading text." },
      { name: "description", type: "string", desc: "Secondary text." },
      { name: "links", type: "array", desc: "Array of {label, url, icon} objects. Icon names match Lucide icons." },
      { name: "alignment", type: '"left" | "center" | "right"', desc: "Horizontal alignment." }
    ]
  },
  {
    type: "project_details",
    description: "Detailed project showcase card.",
    details: "A comprehensive project card highlighting description, tech stack, and action links.",
    example: {
      id: "project-1",
      type: "project_details",
      props: {
        title: "Nekoneko Platform",
        description: "A professional minimal site builder built with modern tech.",
        stacks: ["React", "TypeScript", "Convex"],
        link: "https://nekoneko.space"
      }
    },
    props: [
      { name: "title", type: "string", desc: "Project title." },
      { name: "description", type: "string", desc: "Detailed project description." },
      { name: "stacks", type: "array", desc: "List of tech stack strings." },
      { name: "link", type: "url", desc: "External visit link." }
    ]
  },
];
