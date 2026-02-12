import React from "react";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import { ExternalLink, Sparkles } from "lucide-react";
import LiveSitePreview from "../LiveSitePreview";
import { SEO } from "../SEO";

const Showcase: React.FC = () => {
    const showcaseProjects = [
        {
            id: 1,
            name: "Modern Portfolio",
            slug: "resume",
            description: "Developer portfolio with dark mode",
            tags: ["Portfolio", "Modern"]
        },
        {
            id: 2,
            name: "Richard Banguiz Sample",
            slug: "richardbanguiz",
            description: "Bold design for digital agency",
            tags: ["Simple", "Creative"]
        },
        {
            id: 3,
            name: "Pixel Portfolio",
            slug: "pixels",
            description: "Pixel perfect portfolio",
            tags: ["Pixel", "Minimal"]
        }
    ];

    const getSiteUrl = (slug: string) => {
        const protocol = window.location.protocol;
        const host = window.location.host;
        return `${protocol}//${slug}.${host}`;
    };

    return (
        <div className="min-h-screen bg-[#0b0b0b] text-white font-sans selection:bg-white/10 selection:text-white">
            <SEO
                title="Showcase"
                description="Explore the beautiful websites built with Nekoneko. Get inspired by our community's creations."
            />
            <NavigationBar />
            <main className="pt-32 pb-24 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 rounded-full text-indigo-400 font-bold text-xs tracking-widest uppercase mb-4 border border-indigo-500/20">
                            <Sparkles size={14} />
                            Showcase
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.9] text-white">
                            Built with Nekoneko
                        </h1>
                        <p className="max-w-2xl mx-auto text-gray-400 font-medium leading-relaxed">
                            Discover stunning websites created by our community. Get inspired and start building your own in minutes.
                        </p>
                    </div>

                    {/* Showcase Grid */}
                    <div className="space-y-8">
                        <h2 className="sr-only">Community Portfolios</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {showcaseProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="group relative overflow-hidden rounded-lg border border-white/[0.04] hover:border-white/10 transition-all duration-300 bg-[#111]"
                                >
                                    {/* Site Preview Image */}
                                    <div className="aspect-[4/3] overflow-hidden bg-black/20 relative group-hover:shadow-2xl group-hover:shadow-black/40 transition-all duration-300">
                                        <LiveSitePreview slug={project.slug} name={project.name} />
                                    </div>

                                    {/* Project Info */}
                                    <div className="p-4 space-y-3">
                                        <div className="space-y-1">
                                            <h3 className="font-black text-lg tracking-tight text-white">{project.name}</h3>
                                            <p className="text-gray-400 font-medium text-xs leading-relaxed">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 bg-white/[0.03] text-gray-400 rounded text-[10px] font-bold uppercase tracking-wider border border-white/[0.04]"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* View Button */}
                                        <button
                                            onClick={() => window.open(getSiteUrl(project.slug), "_blank")}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white text-black rounded font-bold text-xs hover:bg-gray-200 transition-all active:scale-95"
                                        >
                                            View Live
                                            <ExternalLink size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20 text-center space-y-4 p-12 bg-white/[0.02] rounded-xl border border-white/[0.04]">
                        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                            Ready to build yours?
                        </h2>
                        <p className="text-gray-400 font-medium max-w-xl mx-auto">
                            Join thousands of creators building beautiful websites with Nekoneko.
                        </p>
                        <button
                            onClick={() => window.location.href = "/signup"}
                            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5"
                        >
                            Get Started for Free
                        </button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Showcase;
