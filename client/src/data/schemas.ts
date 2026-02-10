
export const SCHEMAS = [
  {
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
  },
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
      {
        name: "Impact",
        description: "Bold uppercase links with high-contrast buttons.",
        example: {
          id: "nav-impact",
          type: "navigation",
          props: {
            links: [
              { label: "Works", url: "#" },
              { label: "Contact", url: "#" },
            ],
            showResumeButton: true,
            variant: "impact",
          },
        },
      },
      {
        name: "Glassmorphism",
        description:
          "Glasmorphism is design for modern adn futuristic website.",
        example: {
          id: "nav-glassmorphism",
          type: "navigation",
          props: {
            links: [
              { label: "Works", url: "#" },
              { label: "Contact", url: "#" },
            ],
            showResumeButton: true,
            variant: "glassmorphism",
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
        type: '"default" | "minimal" | "brutalist" | "outline_minimal" | "impact"',
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
        type: '"stack" | "split" | "invest" | "brutalist" | "outline_minimal" | "impact" | "glassmorphism" | "glassmorphism_vibrant" | "glassmorphism_dark" | "creative_gradient"',
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
      {
        name: "socialLinks",
        type: "array",
        desc: "List of {platform, url} for contact icons (creative_gradient).",
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
      {
        name: "Modern Impact",
        description: "Bold typography with Large Portrait and accent colors.",
        example: {
          id: "hero-impact",
          type: "hero",
          props: {
            heading: "I'm Jems Kemerun",
            subheading: "A Product Designer based in Manila.",
            avatarUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            variant: "impact",
            ctaButtons: [
              { label: "DOWNLOAD CV", url: "#", variant: "primary" },
            ],
            style: { titleColor: "#ef4444" },
          },
        },
      },
      {
        name: "Glassmorphism",
        description: "A subtle blur effect with a subtle shadow.",
        example: {
          id: "hero-glass",
          type: "hero",
          props: {
            heading: "I'm Jems Kemerun",
            subheading: "A Product Designer based in Manila.",
            avatarUrl:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
            variant: "glassmorphism",
            ctaButtons: [
              { label: "DOWNLOAD CV", url: "#", variant: "primary" },
            ],
            style: { titleColor: "#ef4444" },
          },
        },
      },
      {
        name: "Creative Gradient",
        description: "Soft gradients with glassmorphism and rounded aesthetic.",
        example: {
          id: "hero-creative",
          type: "hero",
          props: {
            heading: "Creative Soul",
            subheading: "Designing with passion and precision.",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
            variant: "creative_gradient",
            socialLinks: [
              { platform: "github", url: "https://github.com" },
              { platform: "linkedin", url: "https://linkedin.com" },
            ],
          },
        },
      },
      {
        name: "Glassmorphism Vibrant",
        description: "Vibrant backdrop blur with animated glows.",
        example: {
          id: "hero-glass-vibrant",
          type: "hero",
          props: {
            heading: "Vibrant Mind",
            subheading: "Connecting design with technology through glass.",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vibrant",
            variant: "glassmorphism_vibrant",
            ctaButtons: [
              { label: "GET STARTED", url: "#", variant: "primary" },
            ],
          },
        },
      },
      {
        name: "Glassmorphism Dark",
        description: "Deep dark glass for high-end aesthetics.",
        example: {
          id: "hero-glass-dark",
          type: "hero",
          props: {
            heading: "Dark Mode",
            subheading: "Focus on what matters in the dark.",
            avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dark",
            variant: "glassmorphism_dark",
            ctaButtons: [
              { label: "DISCOVER", url: "#", variant: "outline" },
            ],
          },
        },
      },
    ],
  },
  {
    type: "image_slider",
    category: "Media",
    description: "High-end image carousel.",
    details: "A smooth image slider with support for captions, auto-play, and multiple transition effects.",
    example: {
      id: "slider-1",
      type: "image_slider",
      props: {
        images: [
          { url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80", caption: "Deep Work" },
          { url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80", caption: "Modern Architecture" },
          { url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80", caption: "Studio Space" },
        ],
        transitionType: "slide",
        autoPlay: true,
        interval: 5000,
        variant: "minimal",
      },
      styles: { padding: "py-12", borderRadius: "rounded-[32px]" },
    },
    props: [
      { name: "images", type: "array", desc: "List of {url, caption} images." },
      { name: "transitionType", type: '"slide" | "fade"', desc: "Swipe or cross-fade." },
      { name: "autoPlay", type: "boolean", desc: "Enable auto-cycling." },
      { name: "interval", type: "number", desc: "Ms between slides." },
      { name: "variant", type: '"minimal" | "brutalist" | "glassmorphism"', desc: "Design aesthetic." },
    ],
    variants: [
      {
        name: "Minimal",
        description: "Thin lines and clean typography.",
        example: {
          id: "slider-minimal",
          type: "image_slider",
          props: { variant: "minimal", transitionType: "slide", autoPlay: true },
        },
      },
      {
        name: "Brutalist",
        description: "Bold borders and high-impact shadows.",
        example: {
          id: "slider-brutalist",
          type: "image_slider",
          props: { variant: "brutalist", transitionType: "slide" },
        },
      },
      {
        name: "Glassmorphism",
        description: "Translucent controls and modern blur effects.",
        example: {
          id: "slider-glass",
          type: "image_slider",
          props: { variant: "glassmorphism", transitionType: "fade" },
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
        type: '"default" | "brutalist" | "outline_minimal" | "glassmorphism"',
        desc: "Visual style.",
      },
    ],
    variants: [
      {
        name: "Glassmorphism",
        description: "Glassmorphic feature cards with blur and semi-transparent borders.",
        example: {
          id: "feat-glass",
          type: "features",
          props: {
            title: "Premium Experience",
            variant: "glassmorphism",
            items: [
              { title: "Glass UI", description: "Vibrant backdrop blur." },
              { title: "Modern", description: "Built for the future." },
            ],
          },
        },
      },
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
        desc: "List of skills {name, level, color, icon}.",
      },
      {
        name: "variant",
        type: '"default" | "artistic" | "impact" | "bullets" | "brutalist" | "outline_minimal" | "glassmorphism" | "creative_gradient"',
        desc: "Visual style.",
      },
      { name: "barColor", type: "hex", desc: "Main progress color." },
      { name: "bulletColor", type: "hex", desc: "Bullet/Icon color." },
      { name: "textColor", type: "tailwind|hex", desc: "Text color." },
      { name: "borderColor", type: "tailwind|hex", desc: "Border color." },
      {
        name: "backgroundColor",
        type: "tailwind|hex",
        desc: "Background color.",
      },
    ],
    variants: [
      {
        name: "Artistic",
        description: "Artistic skills display with prominent skill names.",
        example: {
          id: "skills-2",
          type: "skills",
          props: {
            title: "Creative Tools",
            variant: "artistic",
            skills: [
              { name: "Graphic Design", level: 100, color: "#f97316" },
              { name: "Photography", level: 100, color: "#0ea5e9" },
            ],
          },
        },
      },
      {
        name: "Impact",
        description: "Bold monochromatic skill pills with accent highlights.",
        example: {
          id: "skills-impact",
          type: "skills",
          props: {
            title: "Expertise",
            variant: "impact",
            skills: [
              { name: "React", level: 100, color: "#6366f1" },
              { name: "Design", level: 100, color: "#ec4899" },
            ],
          },
        },
      },
      {
        name: "Glassmorphism",
        description: "Modern glassmorphism tags",
        example: {
          id: "skills-glassmorphism",
          type: "skills",
          props: {
            title: "Core Stack",
            variant: "glassmorphism",
            skills: ["SYSTEM", "CORE", "API"],
          },
        },
      },
      {
        name: "Brutalist Pills",
        description: "Thick bordered skill tags.",
        example: {
          id: "skills-pills-brutalist",
          type: "skills",
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
          type: "skills",
          props: {
            title: "Core Stack",
            variant: "outline_minimal",
            skills: ["SYSTEM", "CORE", "API"],
          },
        },
      },
      {
        name: "Creative Gradient",
        description: "Glassmorphic cards with icon support.",
        example: {
          id: "skills-creative",
          type: "skills",
          props: {
            title: "My Toolkit",
            variant: "creative_gradient",
            skills: [
              { name: "React", level: 90, icon: "React" },
              { name: "TypeScript", level: 85, icon: "TS" },
            ],
          },
        },
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
      { name: "variant", type: '"timeline" | "cards" | "brutalist" | "outline_minimal" | "impact" | "glassmorphism" | "creative_gradient"', desc: "Visual style." },
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
      {
        name: "Glassmorphism",
        description: "High-impact typography with side-by-side period layout.",
        example: {
          id: "exp-glassmorphism",
          type: "experience",
          props: {
            title: "History",
            variant: "glassmorphism",
            jobs: [
              {
                role: "Senior Designer",
                company: "Neko Studio",
                period: "2024 — PRESENT",
                description: "Leading the design system for modern web apps.",
              },
            ],
          },
        },
      },
      {
        name: "Creative Gradient",
        description: "Dark mode card with rich gradients and backdrop blur.",
        example: {
          id: "exp-creative",
          type: "experience",
          props: {
            title: "Education & Skills",
            variant: "creative_gradient",
            jobs: [
              {
                role: "Graphic Design",
                company: "University of Arts",
                period: "2018 - 2022",
                description: "Specialized in digital media and UI/UX functionality.",
              }
            ]
          }
        },
      },
    ],
  },
  {
    type: "faq",
    category: "Content",
    description: "Frequently Asked Questions.",
    details: "Display a list of questions and answers in various formats like accordions or grids.",
    example: {
      id: "faq-1",
      type: "faq",
      props: {
        title: "Questions & Answers",
        description: "Everything you need to know about our service.",
        variant: "accordion",
        items: [
          {
            question: "How does it work?",
            answer: "Nekoneko uses a design-system-first architecture to turn JSON into beautiful UI.",
          },
          {
            question: "Is it really free?",
            answer: "We have a generous free tier for individuals and a pro plan for agencies.",
          },
        ],
      },
      styles: { padding: "py-24", backgroundColor: "bg-white" },
    },
    props: [
      { name: "title", type: "string", desc: "Section header." },
      { name: "description", type: "string", desc: "Brief intro text." },
      {
        name: "items",
        type: "array",
        desc: "List of {question, answer}.",
      },
      { name: "variant", type: '"accordion" | "grid" | "minimal_cards" | "brutalist" | "glassmorphism"', desc: "Visual style." },
    ],
    variants: [
      {
        name: "Accordion",
        description: "Interactive collapsible list.",
        example: {
          id: "faq-accordion",
          type: "faq",
          props: {
            title: "General FAQ",
            variant: "accordion",
            items: [
              { question: "Can I export my site?", answer: "Yes, you can export to high-quality code or host with us." },
              { question: "Is support included?", answer: "24/7 priority support is available on our Pro plan." },
            ],
          },
        },
      },
      {
        name: "Grid Layout",
        description: "Static multi-column grid.",
        example: {
          id: "faq-grid",
          type: "faq",
          props: {
            title: "Help Center",
            variant: "grid",
            items: [
              { question: "Payment Methods", answer: "We accept all major credit cards and wire transfers." },
              { question: "Refund Policy", answer: "14-day money-back guarantee, no questions asked." },
            ],
          },
        },
      },
      {
        name: "Brutalist",
        description: "Bold borders and high contrast.",
        example: {
          id: "faq-brutalist",
          type: "faq",
          props: {
            title: "The Fine Print",
            variant: "brutalist",
            items: [
              { question: "Terms of Service", answer: "Read our full terms on the legal page." },
              { question: "Privacy Mode", answer: "Your data is encrypted and never sold." },
            ],
          },
        },
      },
      {
        name: "Glassmorphism",
        description: "Modern, translucent aesthetic.",
        example: {
          id: "faq-glassmorphism",
          type: "faq",
          props: {
            title: "Modern Q&A",
            variant: "glassmorphism",
            items: [
              { question: "Is it fast?", answer: "Optimized for speed with built-in asset management." },
              { question: "Collaboration?", answer: "Real-time editing with your entire team." },
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
    details: "A structural component that allows nesting other components in rows or columns.",
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
    type: "contact_info",
    category: "Connect",
    description: "Social and contact icon links.",
    details:
      "Display icon buttons, cards, or high-impact sections for contact information.",
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
    props: [
      { name: "title", type: "string", desc: "Heading text." },
      { name: "description", type: "string", desc: "Secondary text." },
      { name: "links", type: "array", desc: "List of {label, url, icon}." },
      {
        name: "alignment",
        type: '"left" | "center" | "right"',
        desc: "Alignment.",
      },
      {
        name: "variant",
        type: '"default" | "card" | "impact"',
        desc: "Visual style.",
      },
      { name: "email", type: "string", desc: "Contact email." },
      { name: "github", type: "string", desc: "GitHub username." },
      { name: "linkedin", type: "string", desc: "LinkedIn username." },
      { name: "footer_text", type: "string", desc: "Footer disclaimer." },
    ],
    variants: [
      {
        name: "Default Icons",
        description: "Standard row of icon buttons.",
        example: {
          id: "contact-default-var",
          type: "contact_info",
          props: {
            title: "Let's connect",
            links: [
              { label: "Email", url: "mailto:hello@example.com", icon: "Mail" },
            ],
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
            ],
            variant: "card",
          },
        },
      },
      {
        name: "Impact",
        description: "Large-scale social links with bold typography.",
        example: {
          id: "contact-impact",
          type: "contact_info",
          props: {
            email: "hello@example.com",
            github: "example",
            variant: "impact",
          },
        },
      },
    ],
  },

  {
    type: "project_details",
    category: "Connect",
    description: "Project card or portfolio grid.",
    details:
      "A comprehensive project display supporting single cards or full grids.",
    example: {
      id: "project-1",
      type: "project_details",
      props: {
        title: "Nekoneko Platform",
        description: "A professional minimal site builder.",
        stacks: ["React", "TypeScript", "Convex"],
        link: "https://nekoneko.space",
        variant: "card",
      },
    },
    props: [
      { name: "title", type: "string", desc: "Project title." },
      { name: "description", type: "string", desc: "Description text." },
      { name: "stacks", type: "array", desc: "Tech stack strings." },
      { name: "link", type: "url", desc: "External link." },
      {
        name: "items",
        type: "array",
        desc: "Array of projects {title, image, tags, link}.",
      },
      { name: "columns", type: "number", desc: "Column count." },
      {
        name: "variant",
        type: '"card" | "grid" | "impact"',
        desc: "Visual style.",
      },
    ],
    variants: [
      {
        name: "Portfolio Grid",
        description: "Standard grid of projects.",
        example: {
          id: "project-grid-var",
          type: "project_details",
          props: {
            title: "Works",
            variant: "grid",
            items: [
              { title: "Project A", image: "", tags: ["Web"], link: "#" },
            ],
          },
        },
      },
      {
        name: "Impact Gallery",
        description: "High-impact portfolio showcase.",
        example: {
          id: "project-impact",
          type: "project_details",
          props: {
            variant: "impact",
            items: [
              { title: "Modern Design", image: "", tags: ["2024"], link: "#" },
            ],
          },
        },
      },
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
        type: '"grid" | "list" | "brutalist" | "outline_minimal" | "glassmorphism"',
        desc: "Layout style.",
      },
    ],
    variants: [
      {
        name: "Glassmorphism Comparison",
        description: "Backdrop blur tiles for premium service comparison.",
        example: {
          id: "pricing-glass",
          type: "pricing",
          props: {
            title: "Premium Tiers",
            variant: "glassmorphism",
            plans: [
              { name: "Creator", price: "$12", features: ["10 Sites", "Analytics"] },
              { name: "Team", price: "$49", features: ["Unlimited Sites", "Collaboration"], isPopular: true },
            ],
          },
        },
      },
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
        type: '"timeline" | "brutalist" | "outline_minimal" | "impact"',
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
      {
        name: "Impact",
        description: "High-contrast academic log with period highlighting.",
        example: {
          id: "edu-impact",
          type: "education",
          props: {
            title: "Background",
            variant: "impact",
            items: [
              {
                school: "Design Institute",
                degree: "Master of Arts",
                period: "2022 — 2024",
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
  {
    type: "section",
    category: "Layout",
    description: "Generic container with anchor support.",
    details:
      "A simple wrapper component that allows grouping items or creating a named anchor point for navigation via the anchorId prop.",
    props: [
      {
        name: "anchorId",
        type: "string",
        desc: "ID attribute for navigation links (e.g., 'about').",
      },
      {
        name: "items",
        type: "array",
        desc: "List of nested component definitions.",
      },
    ],
    example: {
      id: "sec-1",
      type: "section",
      props: {
        anchorId: "about-me",
        items: [
          { id: "inner-hero", type: "hero", props: { heading: "Inner Hero" } },
        ],
      },
      styles: { padding: "py-0" },
    },
  },
];
