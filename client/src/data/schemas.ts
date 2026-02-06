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
  },
  {
    type: "navigation",
    category: "Core",
    description: "Universal header component.",
    details:
      "Top navigation bar that persists across pages. Supports a list of links and an optional CTA button.",
    variants: [
      {
        name: "Default",
        description: "Standard navigation with clear borders and structure.",
        example: {
          id: "nav-1",
          type: "navigation",
          props: {
            links: [{ label: "Dev", url: "#" }],
            showResumeButton: true,
          },
          styles: {
            textColor: "text-slate-950",
            backgroundColor: "bg-white",
            buttonBackgroundColor: "bg-indigo-600",
            borderColor: "border-indigo-600",
          },
        },
      },
      {
        name: "Minimal",
        description: "Clean, borderless look for modern designs.",
        example: {
          id: "nav-min-1",
          type: "navigation_minimal",
          props: {
            links: [
              { label: "Work", url: "#work" },
              { label: "Studio", url: "#studio" },
            ],
            showResumeButton: true,
          },
          styles: {
            textColor: "text-slate-950",
            backgroundColor: "bg-transparent",
            buttonBackgroundColor: "bg-zinc-900",
          },
        },
      },
      {
        name: "Brutalist",
        description: "High-contrast with thick borders and hard shadows.",
        example: {
          id: "nav-brutalist",
          type: "navigation",
          props: {
            links: [
              { label: "Projects", url: "#" },
              { label: "Contact", url: "#" },
            ],
            showResumeButton: true,
            variant: "brutalist",
          },
        },
      },
      {
        name: "Outline Minimal",
        description: "Zero border-radius with thin monochromatic borders.",
        example: {
          id: "nav-outline",
          type: "navigation",
          props: {
            links: [
              { label: "Portfolio", url: "#" },
              { label: "Studio", url: "#" },
            ],
            showResumeButton: true,
            variant: "outline_minimal",
          },
        },
      },
    ],
    props: [
      { name: "links", type: "array", desc: "List of {label, url}." },
      {
        name: "showResumeButton",
        type: "boolean",
        desc: "Toggle resume button.",
      },
      {
        name: "variant",
        type: '"default" | "minimal" | "brutalist" | "outline_minimal"',
        desc: "Visual style.",
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
    type: "theme_toggle",
    category: "Core",
    description: "Dark mode switch.",
    details: "A component to toggle between light and dark modes.",
    example: {
      id: "toggle-1",
      type: "theme_toggle",
      props: {
        variant: "floating",
      },
    },
    props: [
      {
        name: "variant",
        type: '"floating" | "inline" | "minimal"',
        desc: "Visual style.",
      },
    ],
    variants: [
      {
        name: "Floating",
        description: "Fixed position bottom-right toggle.",
        example: {
          id: "toggle-float",
          type: "theme_toggle",
          props: { variant: "floating" },
        },
      },
      {
        name: "Inline",
        description: "Centered inline toggle for headers/footers.",
        example: {
          id: "toggle-inline",
          type: "theme_toggle",
          props: { variant: "inline" },
        },
      },
      {
        name: "Minimal",
        description: "Small circular toggle.",
        example: {
          id: "toggle-min",
          type: "theme_toggle",
          props: { variant: "minimal" },
        },
      },
    ],
  },
  {
    type: "hero",
    category: "Content",
    description: "Impactful section with image/heading.",
    details:
      "Large introductory section usually placed at the top of the page. specifies a main heading, subheading, and an optional avatar image. Now fully responsive with optimized mobile layouts.",
    example: {
      id: "hero-1",
      type: "hero",
      props: {
        heading: "The Future of Web",
        subheading: "Built with JSON",
        avatarUrl: "https://api.dicebear.com/7.x/shapes/svg",
        alignment: "center",
        variant: "split",
        style: { titleColor: "#6366f1", titleSize: "text-8xl" },
      },
      styles: {
        padding: "py-32",
        maxWidth: "max-w-full",
        backgroundColor: "bg-slate-950",
      },
    },
    props: [
      {
        name: "heading",
        type: "string",
        desc: "Main headline text (supports line breaks).",
      },
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
      {
        name: "variant",
        type: '"stack" | "split" | "invest" | "brutalist" | "outline_minimal"',
        desc: "Layout style.",
      },
      {
        name: "backgroundImageUrl",
        type: "url",
        desc: "Background image URL (for invest layout).",
      },
      {
        name: "topBadgeItems",
        type: "array",
        desc: "List of ticker items {label, value, logo, trend}.",
      },
      {
        name: "ctaButtons",
        type: "array",
        desc: "List of {label, url, variant} buttons.",
      },
    ],
    variants: [
      {
        name: "Default (Stack)",
        description: "Image above text.",
        example: {
          id: "hero-stack",
          type: "hero",
          props: {
            heading: "Modern Identity",
            subheading: "Crafting digital experiences.",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg",
            variant: "stack",
          },
        },
      },
      {
        name: "Split",
        description: "Side-by-side layout (stacks on mobile).",
        example: {
          id: "hero-split",
          type: "hero",
          props: {
            heading: "The Future",
            subheading: "Built with passion.",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg",
            variant: "split",
          },
        },
      },
      {
        name: "Invest",
        description: "High-impact layout with background and ticker widgets.",
        example: {
          id: "hero-invest",
          type: "hero",
          props: {
            heading: "INVEST SMARTER,\nGROW FASTER",
            subheading: "Diversify your portfolio with confidence.",
            backgroundImageUrl:
              "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
            variant: "invest",
            topBadgeItems: [
              {
                label: "Meta",
                value: "488.48",
                logo: "https://www.facebook.com/favicon.ico",
                trend: "up",
              },
              {
                label: "Nvidia",
                value: "118.48",
                logo: "https://www.nvidia.com/favicon.ico",
                trend: "up",
              },
            ],
            ctaButtons: [
              { label: "Start trading", url: "#", variant: "primary" },
              { label: "Explore markets", url: "#", variant: "outline" },
            ],
          },
        },
      },
      {
        name: "Brutalist",
        description:
          "Large-scale layout with thick borders and offset shadows.",
        example: {
          id: "hero-brutalist",
          type: "hero",
          props: {
            heading: "BRUTALIST\nDESIGN",
            subheading: "Bold, raw, and uncompromising digital experiences.",
            avatarUrl: "https://api.dicebear.com/7.x/shapes/svg",
            variant: "brutalist",
            ctaButtons: [
              { label: "View Work", url: "#", variant: "primary" },
              { label: "Library", url: "#", variant: "outline" },
            ],
          },
        },
      },
      {
        name: "Outline Minimal",
        description: "High-contrast monochromatic layout with square edges.",
        example: {
          id: "hero-outline",
          type: "hero",
          props: {
            heading: "MODERN\nARCHITECTURE",
            subheading: "PRECISION AND CLARITY IN EVERY PIXEL.",
            avatarUrl: "https://api.dicebear.com/7.x/bottts/svg",
            variant: "outline_minimal",
            ctaButtons: [
              { label: "View Portfolio", url: "#", variant: "primary" },
              { label: "Contact", url: "#", variant: "outline" },
            ],
          },
        },
      },
    ],
  },
  {
    type: "stats_bar",
    category: "Content",
    description: "Numerical metrics and stats.",
    details:
      "A horizontal strip for highlighting key achievements or metrics with big text.",
    example: {
      id: "stats-1",
      type: "stats_bar",
      props: {
        items: [
          { label: "Projects", value: "50+" },
          { label: "Clients", value: "200" },
        ],
      },
      styles: { padding: "py-12" },
    },
    props: [
      {
        name: "items",
        type: "array",
        desc: "List of {label, value, icon} objects.",
      },
    ],
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
      {
        name: "variant",
        type: '"default" | "brutalist" | "outline_minimal"',
        desc: "Visual style.",
      },
    ],
    variants: [
      {
        name: "Brutalist",
        description: "Feature cards with thick borders and hover effects.",
        example: {
          id: "feat-brutalist",
          type: "features",
          props: {
            title: "Core Features",
            variant: "brutalist",
            items: [
              {
                title: "Performance",
                description: "Blazing fast interaction.",
              },
              { title: "Security", description: "Bulletproof architecture." },
            ],
          },
        },
      },
    ],
  },
  {
    type: "skills",
    category: "Content",
    description: "Skills with progress bars.",
    details:
      "Visual representation of technical skills with progress bars/levels.",
    variants: [
      {
        name: "Default",
        description: "Default skill bar.",
        variants: "default",
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
      },
      {
        name: "artistic",
        description: "Artistic skill bar.",
        variants: "artistic",
        example: {
          id: "skills-1",
          type: "skills",
          props: {
            title: "Artistic arsenal",
            barColor: "#6366f1",
            showProgressBar: false,
            showPercentage: false,
            skills: [{ name: "Graphic Design", level: 0, color: "#61dafb" }],
          },
          styles: {
            padding: "py-20",
            maxWidth: "max-w-5xl",
          },
        },
      },
    ],

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
            icon: "Briefcase",
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
        desc: "List of {role, company, period, description, icon}.",
      },
      {
        name: "variant",
        type: '"timeline" | "cards" | "brutalist" | "outline_minimal"',
        desc: "Visual style.",
      },
    ],
    variants: [
      {
        name: "Brutalist Post",
        description: "Interactive card style with bottom action bar.",
        example: {
          id: "exp-brutalist",
          type: "experience",
          props: {
            title: "Project Log",
            variant: "brutalist",
            jobs: [
              {
                role: "Frontend Dev",
                company: "Neko",
                period: "2024",
                description: "Building the next-gen editor.",
                icon: "Layout",
              },
            ],
          },
        },
      },
      {
        name: "Floating Cards",
        description: "Large cards with a sticky sidebar.",
        example: {
          id: "exp-cards",
          type: "experience",
          props: {
            title: "Career Path",
            variant: "cards",
            jobs: [
              {
                role: "Product Designer",
                company: "Linear",
                period: "2022 — Present",
                description: "Designing the future of project management.",
                icon: "Figma",
              },
            ],
          },
        },
      },
      {
        name: "Clean Timeline",
        description: "Minimal vertical timeline design.",
        example: {
          id: "exp-timeline",
          type: "experience",
          props: {
            title: "Professional Timeline",
            variant: "timeline",
            jobs: [
              {
                role: "Software Engineer",
                company: "Vercel",
                period: "2020 — 2022",
                description: "Scaling the edge network.",
                icon: "Zap",
              },
            ],
          },
        },
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
      {
        name: "variant",
        type: '"default" | "brutalist" | "outline_minimal"',
        desc: "Visual style.",
      },
    ],
    variants: [
      {
        name: "Brutalist Pills",
        description: "Thick bordered skill tags.",
        example: {
          id: "skills-pills-brutalist",
          type: "skills_bullets",
          props: {
            title: "Tech Stack",
            variant: "brutalist",
            skills: ["React", "TypeScript", "Tailwind"],
          },
        },
      },
      {
        name: "Outline Minimal",
        description: "Square monochromatic tags.",
        example: {
          id: "skills-outline",
          type: "skills_bullets",
          props: {
            title: "Core Stack",
            variant: "outline_minimal",
            skills: ["SYSTEM", "CORE", "API"],
          },
        },
      },
    ],
  },
  {
    type: "contact_info",
    category: "Connect",
    description: "Social and contact icon links.",
    details:
      "Display a clean row of icon buttons or a high-contrast card for contact information.",
    variants: [
      {
        name: "Default Icons",
        description: "Standard row of icon buttons.",
        example: {
          id: "contact-default",
          type: "contact_info",
          props: {
            title: "Let's connect",
            description: "Available for freelance work.",
            links: [
              { label: "Email", url: "mailto:hello@example.com", icon: "Mail" },
              { label: "GitHub", url: "https://github.com", icon: "Github" },
            ],
            alignment: "center",
            variant: "default",
          },
        },
      },
      {
        name: "High-Contrast Card",
        description: "Bold red card with monospace typography.",
        example: {
          id: "contact-card",
          type: "contact_info",
          props: {
            title: "CONTACT_INFO",
            links: [
              { label: "Email", url: "mailto:hello@example.com", icon: "Mail" },
              { label: "Phone", url: "tel:09669305550", icon: "Phone" },
            ],
            variant: "card",
          },
        },
      },
    ],
    props: [
      { name: "title", type: "string", desc: "Heading text." },
      { name: "description", type: "string", desc: "Secondary text." },
      { name: "links", type: "array", desc: "List of {label, url, icon}." },
      {
        name: "alignment",
        type: '"left" | "center" | "right"',
        desc: "Alignment.",
      },
      { name: "variant", type: '"default" | "card"', desc: "Visual style." },
    ],
  },
  {
    type: "project_details",
    category: "Connect",
    description: "Detailed project showcase card.",
    details:
      "A comprehensive project card highlighting description and tech stack.",
    example: {
      id: "project-1",
      type: "project_details",
      props: {
        title: "Nekoneko Platform",
        description: "A professional minimal site builder.",
        stacks: ["React", "TypeScript", "Convex"],
        link: "https://nekoneko.space",
      },
    },
    props: [
      { name: "title", type: "string", desc: "Project title." },
      { name: "description", type: "string", desc: "Description text." },
      { name: "stacks", type: "array", desc: "Tech stack strings." },
      { name: "link", type: "url", desc: "External link." },
    ],
  },
  {
    type: "pricing",
    category: "Content",
    description: "Multi-tier pricing tables.",
    details:
      "Display subscription plans or service tiers with features and pricing.",
    example: {
      id: "pricing-1",
      type: "pricing",
      props: {
        title: "Simple Pricing",
        plans: [
          {
            name: "Free",
            price: "$0",
            features: ["1 Project", "Basic Themes"],
          },
          {
            name: "Pro",
            price: "$19",
            features: ["Unlimited Projects", "Custom CSS"],
            isPopular: true,
          },
        ],
      },
      styles: { padding: "py-24" },
    },
    props: [
      { name: "title", type: "string", desc: "Section header." },
      {
        name: "plans",
        type: "array",
        desc: "Array of {name, price, features, isPopular}.",
      },
      {
        name: "variant",
        type: '"grid" | "list" | "brutalist" | "outline_minimal"',
        desc: "Layout style.",
      },
    ],
    variants: [
      {
        name: "Comparison Grid",
        description: "Boxed vertical tiers side-by-side.",
        example: {
          id: "pricing-grid",
          type: "pricing",
          props: {
            title: "Pricing Plans",
            variant: "grid",
            plans: [
              {
                name: "Basic",
                price: "$0",
                features: ["1 Site", "Standard Themes"],
              },
              {
                name: "Pro",
                price: "$29",
                features: ["Unlimited Sites", "Custom CSS"],
                isPopular: true,
              },
            ],
          },
        },
      },
      {
        name: "Minimal List",
        description: "Horizontal rows for comparison.",
        example: {
          id: "pricing-list",
          type: "pricing",
          props: {
            title: "Flexible Options",
            variant: "list",
            plans: [
              {
                name: "Developer",
                price: "$10/mo",
                features: ["API Access", "Webhooks"],
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: ["SLA", "Dedicated Support"],
              },
            ],
          },
        },
      },
    ],
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
          {
            title: "Neko App",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
            tags: ["Web", "Design"],
            link: "#",
          },
        ],
      },
      styles: { padding: "py-24" },
    },
    props: [
      { name: "title", type: "string", desc: "Section header." },
      { name: "columns", type: "number", desc: "Column count (2-3)." },
      {
        name: "items",
        type: "array",
        desc: "Array of {title, image, tags, link}.",
      },
    ],
  },
  {
    type: "education",
    category: "Content",
    description: "Academic history timeline.",
    details: "A vertical timeline representing schools and degrees.",
    example: {
      id: "edu-1",
      type: "education",
      props: {
        title: "Education",
        items: [
          {
            school: "Universidad De Manila",
            degree: "Bachelor of Science in Information Technology",
            period: "2018 — 2022",
          },
          {
            school: "Arellano University",
            degree: "Senior High School",
            period: "2016 — 2018",
          },
        ],
      },
    },
    props: [
      { name: "title", type: "string", desc: "Section header." },
      {
        name: "items",
        type: "array",
        desc: "List of {school, degree, period, icon}.",
      },
      {
        name: "variant",
        type: '"timeline" | "brutalist" | "outline_minimal"',
        desc: "Visual style.",
      },
    ],
    variants: [
      {
        name: "Brutalist List",
        description: "Large book-style list cards.",
        example: {
          id: "edu-brutalist",
          type: "education",
          props: {
            title: "Learning Path",
            variant: "brutalist",
            items: [
              {
                school: "Design Academy",
                degree: "Visual Arts",
                period: "2020-2022",
              },
            ],
          },
        },
      },
      {
        name: "Outline Minimal",
        description: "Sharp list with architectural markers.",
        example: {
          id: "edu-outline-min",
          type: "education",
          props: {
            title: "Academic Log",
            variant: "outline_minimal",
            items: [
              {
                school: "University",
                degree: "Computer Science",
                period: "2018-2022",
              },
            ],
          },
        },
      },
    ],
  },
  {
    type: "theme_toggle",
    category: "Utility",
    description: "Switch between dark and light mode.",
    details: "A button that allows visitors to toggle the site's dark mode.",
    example: {
      id: "toggle-1",
      type: "theme_toggle",
      props: {
        variant: "inline",
      },
    },
    props: [
      { name: "variant", type: '"inline" | "floating"', desc: "Visual style." },
    ],
  },
  {
    type: "search_bar",
    category: "Utility",
    description: "Neo-Brutalist search with results.",
    props: [
      { name: "placeholder", type: "string", desc: "Input placeholder." },
      { name: "category", type: "string", desc: "Search category tag." },
      { name: "results", type: "array", desc: "List of {title, stats}." },
    ],
    example: {
      id: "search-1",
      type: "search_bar",
      props: {
        category: "Mathematics",
        results: [
          {
            title: "Calculus, Volume 2 - Gilbert Strang",
            stats: { answers: 12, rating: 4.8, likes: 24 },
          },
        ],
      },
    },
  },
  {
    type: "selection_list",
    category: "Utility",
    description: "Selectable list of cards.",
    props: [
      { name: "title", type: "string", desc: "List title." },
      {
        name: "items",
        type: "array",
        desc: "List of {id, label, icon, description}.",
      },
      { name: "selectedId", type: "string", desc: "ID of selected item." },
    ],
    example: {
      id: "sel-1",
      type: "selection_list",
      props: {
        title: "Subject Category",
        items: [
          { id: "1", label: "High School", icon: "🎨" },
          { id: "2", label: "College", icon: "🎓" },
        ],
        selectedId: "2",
      },
    },
  },
  {
    type: "step_progress",
    category: "Utility",
    description: "Flow stepper with CTA block.",
    props: [
      { name: "title", type: "string", desc: "Top indicator text." },
      { name: "subTitle", type: "string", desc: "Main title text." },
      { name: "currentStep", type: "number", desc: "Active step index." },
    ],
    example: {
      id: "steps-1",
      type: "step_progress",
      props: {
        currentStep: 2,
        subTitle: "Join Now",
      },
    },
  },
];
