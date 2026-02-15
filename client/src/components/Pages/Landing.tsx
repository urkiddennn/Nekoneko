import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Box, Zap, Share2, MousePointer2, Cat } from "lucide-react";
import { getUser } from "../../utils/authUtils";
import Footer from "../Footer";
import PremiumFeatures from "../PremiumFeatures";
import NavigationBar from "../NavigationBar";
import HowItWorks from "../HowItWorks";
import { SEO } from "../SEO";
import StatsSection from "../StatsSection";

const Landing: React.FC = () => {
  const user = getUser();

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <SEO
        title="Nekoneko - Build and Deploy Premium Websites Instantly"
        description="Nekoneko is the ultimate platform for building modern, premium websites with ease. Explore our JSON-based editor and instant deployment."
      />
      {/* Minimal Nav */}
      <NavigationBar />
      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Dotted Texture Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap size={14} className="fill-indigo-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              The Next Evolution of Site Building
            </span>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.85] animate-in fade-in slide-in-from-bottom-6 duration-1000">
              Build your digital <br />
              <span className="text-indigo-600 italic">presence</span>{" "}
              <span className="text-gray-400 font-medium">at scale.</span>
            </h1>

            <p className="max-w-xl mx-auto text-gray-400 font-medium leading-relaxed md:text-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              A block-based rendering engine for founders and teams. Zero
              complexity, just clean JSON blocks and instant global deployment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
            <Link
              to={user ? "/dashboard" : "/login"}
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-lg font-black flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-95 shadow-2xl shadow-white/5"
            >
              Get Started for Free
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/docs"
              className="w-full sm:w-auto px-10 py-5 rounded-lg border border-white/[0.08] bg-[#161616] text-white font-black hover:bg-[#1a1a1a] transition-all text-center"
            >
              Core Library
            </Link>
          </div>
        </div>

        {/* Mockup Presentation */}
        <div className="md:mt-32 mt-10 md:max-w-7xl w-full md:mx-auto md:px-4 p-1 animate-in fade-in zoom-in-95 duration-1000 delay-500">
          <div className="relative p-2 bg-white/[0.02] rounded-xl border border-white/[0.06] group shadow-inner">
            <div className="bg-[#161616] border border-white/[0.08] rounded-lg shadow-2xl shadow-black/50 overflow-hidden relative">
              <div className="w-full h-11 bg-[#1a1a1a] border-b border-white/[0.06] text-start md:px-6 px-1 items-center flex gap-2">
                <div className="flex gap-2.5">
                  <div className="h-3 w-3 rounded-full bg-white/[0.03]"></div>
                  <div className="h-3 w-3 rounded-full bg-white/[0.03]"></div>
                  <div className="h-3 w-3 rounded-full bg-white/[0.03]"></div>
                </div>
                <div className="mx-auto flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/[0.04] rounded-lg">
                  <div className="h-2 w-2 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.3)]"></div>
                  <span className="text-[10px] font-mono text-gray-300">
                    preview.nekoneko.space
                  </span>
                </div>
              </div>
              <div className="relative  overflow-hidden group">
                <iframe
                  src="https://player.mux.com/JTSkbtpRMYkOsPpxBd4DlYzzJebJSuq1BS9xV5rdclM?metadata-video-title=hero&video-title=hero&autoplay=true&muted=true&loop=true"
                  style={{ width: "100%", border: "none", aspectRatio: "16/9" }}
                  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-700"></div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <StatsSection />

      {/* How it Works */}
      <HowItWorks />

      {/* Premium Features Section */}
      <PremiumFeatures />

      {/* Features Grid */}
      <section className="py-24 bg-[#0b0b0b] border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="sr-only">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Box size={24} />}
              title="JSON-First Architecture"
              description="Assemble your site with modular, beautifully designed JSON blocks. Logic-driven, zero bloating."
            />
            <FeatureCard
              icon={<Share2 size={24} />}
              title="Edge-Speed Delivery"
              description="Deploy to your own subdomain with one click. Served globally with blazing sub-second latency."
            />
            <FeatureCard
              icon={<MousePointer2 size={24} />}
              title="Integrated Analytics"
              description="Track your performance with our minimal built-in telemetry dashboard. Real-time insights."
            />
          </div>
        </div>
      </section>

      {/* Support Nekoneko */}
      <section className="py-24 bg-[#0b0b0b] border-t border-white/[0.06]">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="w-16 h-16 bg-[#161616] border border-white/[0.08] rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Cat size={32} className="text-white" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black tracking-tight text-white">
              Support the Project
            </h2>
            <p className="text-gray-300 font-medium max-w-md mx-auto leading-relaxed text-lg">
              If Nekoneko helped you build your dream site, consider fueling the
              next update with a coffee!
            </p>
          </div>
          <a
            href="https://buymeacoffee.com/urkidden/nekoneko-support"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black px-10 py-4 rounded-xl font-black hover:bg-gray-200 transition-all active:scale-95 shadow-2xl shadow-white/5"
          >
            <Cat size={20} />
            Buy Nekoneko a coffee
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-[#0b0b0b] border-t border-white/[0.06] overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.85] text-white">
            Ready to build your <br />
            <span className="text-indigo-500 italic">next presence?</span>
          </h2>
          <p className="text-gray-300 font-medium max-w-md mx-auto text-lg leading-relaxed">
            Join creators building the simplest, fastest sites on the web. Free
            to start, forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-white text-black px-12 py-5 rounded-xl font-black hover:bg-gray-200 transition-all active:scale-95 shadow-2xl shadow-white/5"
            >
              Create Your Space
            </Link>
            <a
              href="https://github.com/urkiddennn/Nekoneko"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#161616] border border-white/[0.08] text-white px-12 py-5 rounded-xl font-black hover:bg-[#1a1a1a] transition-all active:scale-95 text-center"
            >
              Contribute
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="space-y-6 group bg-[#161616] p-8 rounded-xl border border-white/[0.04] hover:border-white/[0.1] transition-all duration-300">
    <div className="w-12 h-12 flex items-center justify-center bg-[#1a1a1a] border border-white/[0.08] rounded-xl text-white group-hover:bg-indigo-500 group-hover:border-indigo-500 transition-all duration-500">
      {icon}
    </div>
    <div className="space-y-3">
      <h3 className="font-black text-xl text-white tracking-tight">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed font-medium">
        {description}
      </p>
    </div>
  </div>
);

export default Landing;
