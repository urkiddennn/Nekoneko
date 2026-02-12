import React from 'react';
import { Layers, Zap, Shield, Cpu, ArrowRight, Share2, Globe, Database } from 'lucide-react';

const PremiumFeatures: React.FC = () => {
    return (
        <div className="bg-[#0b0b0b] text-white">
            {/* Section 1: Craft and Deploy */}
            <section className="py-24 md:py-32 overflow-hidden border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <div className="flex-1 space-y-8 max-w-2xl text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-lg text-indigo-400">
                                <span className="text-[10px] font-black uppercase tracking-widest">Design and Scale</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9] text-white">
                                Grow big <br />
                                <span className="text-gray-400 font-medium italic">without the bloat.</span>
                            </h2>

                            <p className="text-lg text-gray-400 font-medium leading-relaxed">
                                Take your vision from a single block to a global presence. Nekoneko handles the complexity of infrastructure so you can focus on your brand.
                            </p>

                            <div className="flex items-center justify-center lg:justify-start gap-2 text-white font-bold group cursor-pointer hover:text-indigo-400 transition-colors">
                                <span>Explore the library</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </div>

                            <div className="pt-8 space-y-8 text-left">
                                <FeatureItem
                                    icon={<Layers className="text-indigo-400" size={20} />}
                                    title="Handle more load and traffic"
                                    description="Scale your site components or add complex layouts with automatic load balancing across our global edge."
                                />
                                <FeatureItem
                                    icon={<Zap className="text-indigo-400" size={20} />}
                                    title="Reach users faster globally"
                                    description="Your site is served from the nearest edge location, ensuring sub-second load times for every visitor."
                                />
                            </div>
                        </div>

                        <div className="flex-1 relative w-full max-w-xl">
                            <div className="aspect-square bg-white/[0.02] rounded-xl p-8 border border-white/[0.06] flex items-center justify-center">
                                <div className="space-y-4 w-full">
                                    <StatusCard
                                        icon={<Cpu size={20} className="text-green-500" />}
                                        title="component_hero"
                                        status="Online"
                                        className="translate-x-4 opacity-40 scale-95"
                                    />
                                    <StatusCard
                                        icon={<Cpu size={20} className="text-green-500" />}
                                        title="site_engine"
                                        status="Online"
                                        active={true}
                                    />
                                    <StatusCard
                                        icon={<Cpu size={20} className="text-green-500" />}
                                        title="analytics_aggregator"
                                        status="Online"
                                        className="-translate-x-4 opacity-40 scale-95"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2: JSON and Infrastructure */}
            <section className="py-24 md:py-32 overflow-hidden bg-[#0b0b0b]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24">
                        <div className="flex-1 space-y-8 max-w-2xl text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-lg text-indigo-400">
                                <span className="text-[10px] font-black uppercase tracking-widest">Data Architecture</span>
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9] text-white">
                                Instant persistence. <br />
                                <span className="text-gray-400 font-medium italic">Zero config.</span>
                            </h2>

                            <p className="text-lg text-gray-400 font-medium leading-relaxed">
                                Private connections, secure endpoints, and real-time synchronization live from the moment you hit save.
                            </p>

                            <div className="flex items-center justify-center lg:justify-start gap-2 text-white font-bold group cursor-pointer hover:text-indigo-400 transition-colors">
                                <span>Read the docs</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </div>

                            <div className="pt-8 space-y-8 text-left">
                                <FeatureItem
                                    icon={<Shield className="text-indigo-400" size={20} />}
                                    title="Private, fast connections by default"
                                    description="Encrypted internal data layer ensures your site configuration is secure and never exposed."
                                />
                                <FeatureItem
                                    icon={<Share2 className="text-indigo-400" size={20} />}
                                    title="Protocol detection built-in"
                                    description="Our JSON-RPC layer automatically handles data synchronization and conflict resolution."
                                />
                            </div>
                        </div>

                        <div className="flex-1 relative w-full max-w-xl">
                            <div className="aspect-square bg-white/[0.02] rounded-xl p-8 border border-white/[0.06] flex flex-col justify-center gap-4">
                                <div className="bg-[#161616] border border-white/[0.08] p-6 rounded-lg space-y-4 shadow-xl shadow-black/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                                        <span className="font-bold text-white text-sm">convex-data-sync</span>
                                    </div>
                                    <div className="text-[10px] font-mono text-gray-400">
                                        api-prod.nekoneko.app
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-green-500 font-black uppercase tracking-wider">
                                        <Zap size={10} className="fill-green-500" /> Online
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 self-center">
                                    <div className="flex-1 h-px w-8 bg-white/[0.04]"></div>
                                    <div className="px-3 py-1 bg-[#1a1a1a] border border-white/[0.06] rounded-full text-[9px] font-mono text-gray-400">
                                        TCP:5432 | Private | Encrypted | &lt;1ms
                                    </div>
                                    <div className="flex-1 h-px w-8 bg-white/[0.04]"></div>
                                </div>

                                <div className="bg-[#161616] border border-white/[0.08] p-6 rounded-lg flex items-center justify-between shadow-xl shadow-black/20">
                                    <div className="flex items-center gap-4">
                                        <Database className="text-gray-400" size={18} />
                                        <span className="font-bold text-white text-sm">projects_db</span>
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-mono italic">
                                        Synced 2s ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Alternatives footer */}
            <div className="pb-24 pt-12 flex flex-col items-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Alternative to</span>
                <div className="flex items-center gap-8 md:gap-12">
                    <Globe size={24} className="text-gray-400" />
                    <div className="font-black italic text-xl text-white">framer</div>
                    <div className="font-black text-xl text-white">webflow</div>
                    <div className="font-black italic text-xl uppercase text-white">wix</div>
                </div>
            </div>
        </div>
    );
};

const FeatureItem = ({ icon, title, description }: { icon: any, title: string, description: string }) => (
    <div className="flex gap-4">
        <div className="mt-1">{icon}</div>
        <div className="space-y-1">
            <h4 className="font-bold text-white">{title}</h4>
            <p className="text-sm text-gray-400 leading-relaxed font-medium">{description}</p>
        </div>
    </div>
);

const StatusCard = ({ icon, title, status, active = false, className = "" }: { icon: any, title: string, status: string, active?: boolean, className?: string }) => (
    <div className={`p-6 rounded-lg border transition-all duration-700 ${active ? 'bg-[#1a1a1a] border-white/[0.1] z-10 scale-105 shadow-2xl shadow-black/50' : 'bg-white/[0.02] border-white/[0.04] opacity-40'} ${className}`}>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-md ${active ? 'bg-indigo-500/10 text-indigo-400' : 'bg-transparent text-gray-400'}`}>
                    {icon}
                </div>
                <span className="font-black text-sm tracking-tight text-white">{title}</span>
            </div>
            <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${active ? 'text-green-500' : 'text-gray-400'}`}>
                <Zap size={10} className={active ? "fill-green-500" : ""} />
                {status}
            </div>
        </div>
    </div>
);

export default PremiumFeatures;
