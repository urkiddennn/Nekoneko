import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Box, Zap, Share2, MousePointer2 } from 'lucide-react';

const Landing: React.FC = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("neko_user") || "null");

    const handleGetStarted = () => {
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            {/* Minimal Nav */}
            <nav className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md fixed top-0 w-full z-50">
                <div
                    className="font-black text-xl tracking-tighter cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    nekoneko
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
                    >
                        Login
                    </button>
                    <button
                        onClick={handleGetStarted}
                        className="bg-gray-900 text-white px-4 py-2 rounded text-xs font-bold hover:bg-black transition-all active:scale-95"
                    >
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="pt-40 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded text-indigo-600 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <Zap size={14} className="fill-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">The No-Code Era is Here</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        Build your personal <br />
                        <span className="text-gray-400">space in seconds.</span>
                    </h1>

                    <p className="max-w-xl mx-auto text-gray-500 font-medium leading-relaxed md:text-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        A minimal, high-performance site builder for developers and creatives.
                        No bloated editors, just clean blocks and instant deployment.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                        <button
                            onClick={handleGetStarted}
                            className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded font-bold flex items-center justify-center gap-2 hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200"
                        >
                            Start Building Now
                            <ArrowRight size={18} />
                        </button>
                        <button
                            onClick={() => navigate('/docs')}
                            className="w-full sm:w-auto px-8 py-4 rounded border border-gray-100 font-bold hover:bg-gray-50 transition-all"
                        >
                            View Library
                        </button>
                    </div>
                </div>

                {/* Visual Mockup */}
                <div className="mt-24 max-w-5xl mx-auto px-4 animate-in fade-in zoom-in-95 duration-1000 delay-500">
                    <div className="bg-white border border-gray-100 rounded shadow-2xl shadow-gray-200 overflow-hidden group">
                        <img
                            src="/assets/mockup.png"
                            alt="Nekoneko Editor Preview"
                            className="w-full h-auto grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                        />
                    </div>
                </div>
            </main>

            {/* How it Works */}
            <section className="py-24 bg-gray-50/50 border-y border-gray-100">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl font-black tracking-tight">How it Works</h2>
                        <p className="text-gray-500 font-medium">Three steps to your new corner of the internet.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                        <StepCard
                            number="01"
                            title="Pick a Template"
                            description="Start with one of our 4 aesthetic presets: Modern, Minimal, Aesthetic, or Retro."
                        />
                        <StepCard
                            number="02"
                            title="Customize Content"
                            description="Use our modular block system to add text, images, skills, and more. No code needed."
                        />
                        <StepCard
                            number="03"
                            title="Publish Instantly"
                            description="Hit publish and your site is live on your dedicated subdomain in milliseconds."
                        />
                    </div>
                </div>
            </section>

            {/* Template Showcase */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black tracking-tight text-slate-900">Designed for Every Style</h2>
                            <p className="text-gray-500 font-medium max-w-lg">
                                Our templates are crafted with a "minimal-first" philosophy. No clutter, just your work.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <TemplatePreview name="Modern Resume" color="bg-indigo-500" description="A bold, professional layout for developers." />
                        <TemplatePreview name="Minimal Landing" color="bg-slate-900" description="Ultra-clean design with high-focus typography." />
                        <TemplatePreview name="Aesthetic Portfolio" color="bg-pink-500" description="Vibrant and creative for visual storytellers." />
                        <TemplatePreview name="Retro Agency" color="bg-amber-500" description="Nostalgic, high-impact blocky design." />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 bg-gray-50/50 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<Box size={24} />}
                            title="Block-based Editor"
                            description="Assemble your site with modular, beautifully designed blocks. Zero learning curve."
                        />
                        <FeatureCard
                            icon={<Share2 size={24} />}
                            title="Instant Publishing"
                            description="Deploy to your own subdomain with one click. Blazing fast global delivery."
                        />
                        <FeatureCard
                            icon={<MousePointer2 size={24} />}
                            title="Interactive Analytics"
                            description="Track your performance with our minimal built-in analytics dashboard."
                        />
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 bg-white">
                <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Ready to build your <br /> next project?</h2>
                    <p className="text-gray-500 font-medium max-w-md mx-auto">
                        Join creators building the simplest sites on the web. Free to start, forever.
                    </p>
                    <button
                        onClick={handleGetStarted}
                        className="bg-gray-900 text-white px-10 py-4 rounded font-bold hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-100"
                    >
                        Create Your Site
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-100 px-8">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="font-black text-xl tracking-tighter">nekoneko</div>
                    <div className="flex gap-8">
                        <a href="#" className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors">Twitter</a>
                        <a href="#" className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors">GitHub</a>
                        <a href="#" className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors">Privacy</a>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">© 2026 Nekoneko Studio</p>
                </div>
            </footer>
        </div>
    );
};

const TemplatePreview = ({ name, color, description }: { name: string, color: string, description: string }) => (
    <div className="group space-y-4">
        <div className="aspect-[4/3] bg-gray-50 border border-gray-100 rounded overflow-hidden relative">
            <div className={`absolute top-4 left-4 w-3 h-3 rounded-full ${color}`}></div>
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px] opacity-30"></div>
            <div className="h-full flex items-center justify-center">
                <div className="w-1/2 h-1/2 bg-white border border-gray-100 rounded-sm shadow-sm p-4 flex flex-col gap-2 group-hover:scale-105 transition-transform duration-500">
                    <div className={`h-2 w-full rounded-full ${color} opacity-20`}></div>
                    <div className="h-2 w-3/4 bg-gray-50 rounded-full"></div>
                    <div className="h-2 w-1/2 bg-gray-50 rounded-full"></div>
                    <div className="mt-auto h-6 w-full bg-gray-900 rounded-sm"></div>
                </div>
            </div>
        </div>
        <div>
            <h4 className="font-bold text-lg text-slate-900">{name}</h4>
            <p className="text-sm text-gray-500 font-medium">{description}</p>
        </div>
    </div>
);

const StepCard = ({ number, title, description }: { number: string, title: string, description: string }) => (
    <div className="relative space-y-4">
        <div className="text-4xl font-black text-gray-100 absolute -top-10 -left-2 select-none group-hover:text-indigo-50 transition-colors">{number}</div>
        <h3 className="font-black text-xl relative z-10">{title}</h3>
        <p className="text-sm text-gray-500 font-medium leading-relaxed relative z-10">
            {description}
        </p>
    </div>
);

const FeatureCard = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="space-y-4 group">
        <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded text-gray-900 group-hover:scale-110 transition-transform duration-500 shadow-sm shadow-gray-50">
            {icon}
        </div>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed font-medium">
            {description}
        </p>
    </div>
);

export default Landing;
