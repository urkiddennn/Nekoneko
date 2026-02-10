export interface Template {
    id: string;
    name: string;
    description: string;
    style: 'Modern' | 'Minimal' | 'Aesthetic' | 'Retro';
    site_settings: any;
    sections: any[];
}

export const TEMPLATES: Template[] = [
    {
        id: 'empty',
        name: 'Empty Canvas',
        description: 'Start with a completely blank canvas and build your vision.',
        style: 'Minimal',
        site_settings: {
            name: 'New Project',
            theme: { primary: '#000000', font: 'Inter', darkMode: false }
        },
        sections: []
    },
    {
        id: 'glassmorphism-premium',
        name: 'Glassmorphism Premium',
        description: 'Translucent layers and vibrant gradients for a high-end digital feel.',
        style: 'Aesthetic',
        site_settings: {
            name: 'Aero Studio',
            theme: { primary: '#6366f1', font: 'Inter', darkMode: true }
        },
        sections: [
            {
                id: 'nav-glass',
                type: 'navigation',
                props: {
                    logo: 'AERO',
                    links: [
                        { label: 'Work', url: '#work' },
                        { label: 'Services', url: '#services' },
                        { label: 'Contact', url: '#contact' }
                    ],
                    showResumeButton: true,
                    variant: 'glassmorphism'
                }
            },
            {
                id: 'hero-glass',
                type: 'hero',
                props: {
                    heading: 'Pure Transparency.',
                    subheading: 'Creating digital clarity through layered glass aesthetics and modern vibrancy.',
                    alignment: 'center',
                    variant: 'glassmorphism_vibrant',
                    avatarUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop',
                    ctaButtons: [
                        { label: 'View Portfolio', url: '#work', variant: 'primary' },
                        { label: 'Get in Touch', url: '#contact', variant: 'outline' }
                    ]
                },
                styles: { padding: 'py-24' }
            },
            {
                id: 'features-glass',
                type: 'features',
                props: {
                    title: 'Our Capabilities',
                    variant: 'glassmorphism',
                    items: [
                        { title: 'Brand Design', description: 'Visual identities that resonate.' },
                        { title: 'Development', description: 'High-performance web solutions.' },
                        { title: 'Strategy', description: 'Data-driven growth plans.' }
                    ]
                }
            },
            {
                id: 'skills-glass',
                type: 'skills',
                props: {
                    title: 'The Stack',
                    variant: 'glassmorphism',
                    skills: [
                        { name: 'React', level: 95 },
                        { name: 'TypeScript', level: 90 },
                        { name: 'Next.js', level: 85 }
                    ]
                }
            }
        ]
    },
    {
        id: 'brutalist-bold',
        name: 'Brutalist Bold',
        description: 'High-impact design with raw aesthetics and bold typography.',
        style: 'Retro',
        site_settings: {
            name: 'RAW',
            theme: { primary: '#f59e0b', font: 'Lexend', darkMode: false }
        },
        sections: [
            {
                id: 'nav-brutal',
                type: 'navigation',
                props: {
                    logo: 'RAW_CORE',
                    links: [
                        { label: 'LOG', url: '#log' },
                        { label: 'LAB', url: '#lab' }
                    ],
                    showResumeButton: true,
                    variant: 'brutalist'
                }
            },
            {
                id: 'hero-brutal',
                type: 'hero',
                props: {
                    heading: 'NO NONSENSE.\nJUST CODE.',
                    subheading: 'WE BUILD RAW DIGITAL EXPERIENCES THAT CUT THROUGH THE NOISE.',
                    alignment: 'left',
                    variant: 'brutalist',
                    avatarUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
                    ctaButtons: [
                        { label: 'DEPLOY NOW', url: '#', variant: 'primary' }
                    ]
                },
                styles: { padding: 'py-20' }
            },
            {
                id: 'features-brutal',
                type: 'features',
                props: {
                    title: 'SERVICES',
                    variant: 'brutalist',
                    items: [
                        { title: 'CORE ARCH', description: 'Solid foundations.' },
                        { title: 'SENSORY UI', description: 'Bold interaction.' }
                    ]
                }
            },
            {
                id: 'skills-brutal',
                type: 'skills',
                props: {
                    title: 'TOOLSET',
                    variant: 'brutalist',
                    skills: ['Rust', 'Zig', 'Go', 'NeoVim']
                }
            }
        ]
    },
    {
        id: 'minimal-refined',
        name: 'Minimal Refined',
        description: 'A clean, sophisticated layout that lets your content speak for itself.',
        style: 'Minimal',
        site_settings: {
            name: 'Zenith',
            theme: { primary: '#000000', font: 'Space Grotesk', darkMode: false }
        },
        sections: [
            {
                id: 'nav-minimal',
                type: 'navigation',
                props: {
                    logo: 'ZENITH',
                    links: [
                        { label: 'About', url: '#about' },
                        { label: 'Contact', url: '#contact' }
                    ],
                    showResumeButton: true,
                    variant: 'outline_minimal'
                }
            },
            {
                id: 'hero-minimal',
                type: 'hero',
                props: {
                    heading: 'Simplicity is\nultimate.',
                    subheading: 'An exercise in restraint and clarity. Designed for those who appreciate the essence of form.',
                    alignment: 'left',
                    variant: 'outline_minimal',
                    avatarUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop',
                    ctaButtons: [
                        { label: 'Begin', url: '#', variant: 'primary' }
                    ]
                },
                styles: { padding: 'py-32' }
            },
            {
                id: 'features-minimal',
                type: 'features',
                props: {
                    title: 'Principles',
                    variant: 'outline_minimal',
                    items: [
                        { title: 'Space', description: 'Allowing room to breathe.' },
                        { title: 'Type', description: 'Legibility as priority.' }
                    ]
                }
            },
            {
                id: 'skills-minimal',
                type: 'skills',
                props: {
                    title: 'Expertise',
                    variant: 'outline_minimal',
                    skills: ['UI/UX', 'Typography', 'Minimalism']
                }
            }
        ]
    },
    {
        id: 'designer-dark',
        name: 'Designer Dark',
        description: 'Elite portfolio design with decorative line work and bold red accents.',
        style: 'Modern',
        site_settings: {
            name: 'amogoe',
            theme: { primary: '#ff5a5f', font: 'Inter', darkMode: true }
        },
        sections: [
            {
                id: 'nav-main',
                type: 'navigation',
                props: {
                    logo: 'amogoe',
                    links: [
                        { label: 'Home', url: '#' },
                        { label: 'Services', url: '#services' },
                        { label: 'About', url: '#about' },
                        { label: 'Skills', url: '#skills' },
                        { label: 'Portfolio', url: '#portfolio' },
                        { label: 'Contact', url: '#contact' }
                    ]
                },
                styles: { backgroundColor: 'bg-[#13131f]', textColor: 'text-white' }
            },
            {
                id: 'hero-main',
                type: 'hero',
                props: {
                    heading: "Hello, I'm\na Front end Developer",
                    subheading: "Fond of creating web application designs and bring them to life using code & develop mobile designs",
                    variant: 'connected_line',
                    ctaButtons: [
                        { label: 'Creator journey', url: '#', variant: 'primary' }
                    ]
                }
            },
            {
                id: 'skills-main',
                type: 'skills',
                props: {
                    title: 'Skill-Set',
                    variant: 'detailed_cards',
                    skills: [
                        { name: 'Git Version Control', icon: 'github' },
                        { name: 'App Design', icon: 'mobile' },
                        { name: 'Book-end Development', icon: 'database' },
                        { name: 'Web Development', icon: 'web' },
                        { name: 'Photography', icon: 'camera' },
                        { name: 'Freelancing', icon: 'freelancing' }
                    ],
                    anchorId: 'services'
                }
            },
            {
                id: 'connect-main',
                type: 'connect_with_me',
                props: {
                    title: 'Connect with me',
                    buttonText: 'Stay Connected',
                    emailPlaceholder: 'Email',
                    messagePlaceholder: 'Message',
                    anchorId: 'contact'
                }
            },
            {
                id: 'footer-main',
                type: 'footer',
                props: {
                    logo: 'AMOGOE.',
                    tagline: 'Crafting premium digital identities through design and code.',
                    variant: 'impact',
                    links: [
                        { label: 'Services', url: '#services' },
                        { label: 'Work', url: '#portfolio' },
                        { label: 'Contact', url: '#contact' }
                    ],
                    socials: [
                        { platform: 'github', url: 'https://github.com' },
                        { platform: 'linkedin', url: 'https://linkedin.com' },
                        { platform: 'twitter', url: 'https://twitter.com' }
                    ]
                }
            }
        ]
    },
    {
        id: 'variant-showcase',
        name: 'Variant Showcase',
        description: 'A comprehensive showcase of all new design variants (Brutalist, Glass, Impact, etc.)',
        style: 'Aesthetic',
        site_settings: {
            name: 'Showcase',
            theme: { primary: '#ff5a5f', font: 'Inter', darkMode: true }
        },
        sections: [
            {
                id: 'nav-showcase',
                type: 'navigation',
                props: {
                    links: [
                        { label: 'Experience', url: '#exp' },
                        { label: 'Pricing', url: '#pricing' },
                        { label: 'FAQ', url: '#faq' }
                    ],
                    showResumeButton: true,
                    variant: 'creative_gradient'
                }
            },
            {
                id: 'exp-showcase',
                type: 'experience',
                props: {
                    title: 'Professional Path',
                    jobs: [
                        { role: 'Senior Designer', company: 'Neko Industries', period: '2022 - Now', description: 'Driving the future of design systems.' }
                    ],
                    variant: 'connected_line'
                }
            },
            {
                id: 'pricing-showcase',
                type: 'pricing',
                props: {
                    title: 'Our Plans',
                    plans: [
                        { name: 'Starter', price: '$0', features: ['Core Features'] },
                        { name: 'Premium', price: '$49', features: ['All Variants', 'Priority Support'], isPopular: true }
                    ],
                    variant: 'creative_gradient'
                }
            },
            {
                id: 'faq-showcase',
                type: 'faq',
                props: {
                    title: 'Common Questions',
                    items: [
                        { question: 'What is this?', answer: 'This is the new variant showcase.' }
                    ],
                    variant: 'glassmorphism'
                }
            },
            {
                id: 'cta-showcase',
                type: 'cta',
                props: {
                    title: 'Ready for the future?',
                    buttonText: 'Get Started Now',
                    variant: 'brutalist'
                }
            }
        ]
    }
];
