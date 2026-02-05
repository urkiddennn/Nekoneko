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
        name: 'Empty',
        description: 'Start with a completely blank canvas.',
        style: 'Minimal',
        site_settings: {
            name: 'New Project',
            theme: { primary: '#000000', font: 'Inter', darkMode: false }
        },
        sections: []
    },
    {
        id: 'modern-resume',
        name: 'Modern Resume',
        description: 'A professional and clean layout for your career journey.',
        style: 'Modern',
        site_settings: {
            name: 'John Doe',
            theme: { primary: '#6366f1', font: 'Inter', darkMode: true }
        },
        sections: [
            {
                id: 'nav-1',
                type: 'navigation',
                props: {
                    logo: 'John Doe',
                    links: [
                        { label: 'Experience', href: '#experience' },
                        { label: 'Skills', href: '#skills' },
                        { label: 'Contact', href: '#contact' }
                    ]
                }
            },
            {
                id: 'hero-1',
                type: 'hero',
                props: {
                    heading: 'Passionate Software Engineer',
                    subheading: 'Building impactful digital experiences with modern technologies.',
                    alignment: 'left',
                    layout: 'split',
                    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
                },
                styles: { padding: 'py-24', backgroundColor: 'bg-slate-900' }
            },
            {
                id: 'exp-1',
                type: 'experience',
                props: {
                    title: 'Work Experience',
                    jobs: [
                        {
                            role: 'Senior Developer',
                            company: 'TechCorp',
                            period: '2021 - Present',
                            description: 'Led a team of 5 developers in building a high-scale e-commerce platform.'
                        },
                        {
                            role: 'Full Stack Engineer',
                            company: 'StartUp Inc',
                            period: '2018 - 2021',
                            description: 'Developed and maintained various web applications using React and Node.js.'
                        }
                    ]
                }
            },
            {
                id: 'skills-1',
                type: 'skills_bullets',
                props: {
                    title: 'Technical Skills',
                    skills: ['React', 'TypeScript', 'Node.js', 'Convex', 'Tailwind CSS']
                }
            }
        ]
    },
    {
        id: 'minimal-landing',
        name: 'Minimal Landing',
        description: 'Focus on what matters with this ultra-clean landing page.',
        style: 'Minimal',
        site_settings: {
            name: 'Ultra',
            theme: { primary: '#000000', font: 'Space Grotesk', darkMode: false }
        },
        sections: [
            {
                id: 'nav-2',
                type: 'navigation',
                props: {
                    logo: 'ULTRA',
                    links: [
                        { label: 'Features', href: '#features' },
                        { label: 'Pricing', href: '#pricing' }
                    ]
                }
            },
            {
                id: 'hero-2',
                type: 'hero',
                props: {
                    heading: 'Simplicity redefined.',
                    subheading: 'Less noise, more signal. The perfect platform for your next big idea.',
                    alignment: 'center',
                    layout: 'stack',
                    avatarUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop'
                },
                styles: { padding: 'py-32' }
            },
            {
                id: 'features-1',
                type: 'features',
                props: {
                    title: 'Why choose Ultra?',
                    items: [
                        { title: 'Fast', description: 'Blazing fast performance out of the box.' },
                        { title: 'Secure', description: 'Privacy-focused and secure by default.' }
                    ]
                }
            },
            {
                id: 'cta-1',
                type: 'cta',
                props: {
                    title: 'Ready to start?',
                    buttonText: 'Get Started'
                }
            }
        ]
    },
    {
        id: 'aesthetic-portfolio',
        name: 'Aesthetic Portfolio',
        description: 'Vibrant and creative layout for visual storytelling.',
        style: 'Aesthetic',
        site_settings: {
            name: 'Studio X',
            theme: { primary: '#ec4899', font: 'Outfit', darkMode: true }
        },
        sections: [
            {
                id: 'nav-3',
                type: 'navigation',
                props: {
                    logo: 'STUDIO X',
                    links: []
                }
            },
            {
                id: 'hero-3',
                type: 'hero',
                props: {
                    heading: 'Creating visual magic.',
                    subheading: 'We blend art and code to build digital dreamscapes.',
                    alignment: 'center',
                    layout: 'stack',
                    avatarUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92701?q=80&w=1964&auto=format&fit=crop'
                },
                styles: { padding: 'py-20', backgroundColor: 'bg-pink-50' }
            },
            {
                id: 'projects-1',
                type: 'project_grid',
                props: {
                    title: 'Selected Works',
                    columns: 2,
                    items: [
                        {
                            title: 'Project One',
                            image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
                            tags: ['Identity', 'Print'],
                            link: '#'
                        },
                        {
                            title: 'Project Two',
                            image: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2070&auto=format&fit=crop',
                            tags: ['UI/UX', 'Mobile'],
                            link: '#'
                        }
                    ]
                }
            },
            {
                id: 'stats-1',
                type: 'stats_bar',
                props: {
                    items: [
                        { label: 'Happy Clients', value: '100+' },
                        { label: 'Projects Done', value: '250+' }
                    ]
                }
            }
        ]
    },
    {
        id: 'retro-agency',
        name: 'Retro Agency',
        description: 'Bold, nostalgic, and high-impact agency template.',
        style: 'Retro',
        site_settings: {
            name: 'OLD SCHOOL',
            theme: { primary: '#f59e0b', font: 'Lexend', darkMode: true }
        },
        sections: [
            {
                id: 'nav-4',
                type: 'navigation',
                props: {
                    logo: 'RETRO',
                    links: [
                        { label: 'Work', href: '#work' },
                        { label: 'Pricing', href: '#pricing' }
                    ]
                }
            },
            {
                id: 'hero-4',
                type: 'hero',
                props: {
                    heading: 'OLD SCHOOL VIBES.',
                    subheading: 'MODERN RESULTS. WE BUILD THINGS THE RIGHT WAY.',
                    alignment: 'left',
                    layout: 'split',
                    avatarUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop'
                },
                styles: { padding: 'py-24', backgroundColor: 'bg-amber-100' }
            },
            {
                id: 'pricing-1',
                type: 'pricing',
                props: {
                    title: 'Fair Pricing',
                    plans: [
                        { name: 'Basic', price: '$99', features: ['Consultation', 'Basic Site'] },
                        { name: 'Pro', price: '$299', features: ['Custom Design', 'CMS Integration'] }
                    ]
                }
            }
        ]
    }
];
