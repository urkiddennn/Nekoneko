import React from "react";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import { ExternalLink, Sparkles } from "lucide-react";
import LiveSitePreview from "../LiveSitePreview";

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
            name: "Creative Agency",
            slug: "richardbanguiz",
            description: "Bold design for digital agency",
            tags: ["Agency", "Creative"]
        },
        {
            id: 3,
            name: "Minimal Landing",
            slug: "ultra-app",
            description: "Clean SaaS landing page",
            tags: ["SaaS", "Minimal"]
        }
    ];

    const getSiteUrl = (slug: string) => {
        const protocol = window.location.protocol;
        const host = window.location.host;
        return `${protocol}//${slug}.${host}`;
    };

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
            <NavigationBar />
            <main className="pt-32 pb-24 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-600 font-bold text-xs tracking-widest uppercase mb-4">
                            <Sparkles size={14} />
                            Showcase
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[0.9]">
                            Built with Nekoneko
                        </h1>
                        <p className="max-w-2xl mx-auto text-gray-500 font-medium leading-relaxed">
                            Discover stunning websites created by our community. Get inspired and start building your own in minutes.
                        </p>
                    </div>

                    {/* Showcase Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {showcaseProjects.map((project) => (
                            <div
                                key={project.id}
                                className="group relative overflow-hidden rounded-lg border border-gray-200 hover:border-gray-900 transition-all duration-300 bg-white"
                            >
                                {/* Site Preview Image */}
                                <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative group-hover:shadow-lg transition-all duration-300">
                                    <LiveSitePreview slug={project.slug} name={project.name} />
                                </div>

                                {/* Project Info */}
                                <div className="p-4 space-y-3">
                                    <div className="space-y-1">
                                        <h3 className="font-black text-lg tracking-tight">{project.name}</h3>
                                        <p className="text-gray-500 font-medium text-xs leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wider"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* View Button */}
                                    <button
                                        onClick={() => window.open(getSiteUrl(project.slug), "_blank")}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded font-bold text-xs hover:bg-black transition-all active:scale-95"
                                    >
                                        View Live
                                        <ExternalLink size={12} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="mt-20 text-center space-y-4 p-10 bg-gray-50 rounded-xl border border-gray-100">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                            Ready to build yours?
                        </h2>
                        <p className="text-gray-500 font-medium max-w-xl mx-auto">
                            Join thousands of creators building beautiful websites with Nekoneko.
                        </p>
                        <button
                            onClick={() => window.location.href = "/signup"}
                            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-black transition-all active:scale-95"
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
