import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Box, Zap, Share2, MousePointer2, Cat } from "lucide-react";
import { getUser } from "../../utils/authUtils";
import Footer from "../Footer";
import TemplateShowcase from "../TemplateShowcase";
import NavigationBar from "../NavigationBar";
import HowItWorks from "../HowItWorks";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleGetStarted = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Minimal Nav */}
      <NavigationBar />
      {/* Hero Section */}
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded text-indigo-600 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap size={14} className="fill-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              The No-Code Era is Here
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] animate-in fade-in slide-in-from-bottom-6 duration-1000">
            Build your personal <br />
            <span className="text-gray-400">space in seconds.</span>
          </h1>

          <p className="max-w-xl mx-auto text-gray-500 font-medium leading-relaxed md:text-lg animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
            A minimal, high-performance site builder for developers and
            creatives. No bloated editors, just clean JSON blocks and instant
            deployment.
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
              onClick={() => navigate("/docs")}
              className="w-full sm:w-auto px-8 py-4 rounded border border-gray-100 font-bold hover:bg-gray-50 transition-all"
            >
              View Library
            </button>
          </div>
        </div>
        {/* Visual Mockup */}
        {/*<div className="css-mb">
          <div className="mb-display-position">
            <div className="mb-display bg-gray-900">
              <div className="mb-screen-position">
                <div className="mb-screen w-full h-full bg-cover bg-center">
                  <img
                    src="/assets/mockup.png"
                    alt="example image"
                    className="w-full h-full bg-cover bg-center"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mb-body"></div>
          <div className="mb-bottom-cover"></div>
        </div>*/}
        <div className="mt-24 max-w-5xl mx-auto px-4 animate-in fade-in zoom-in-95 duration-1000 delay-500 ">
          <div className="bg-white border border-gray-100 rounded-lg shadow-2xl shadow-gray-200 overflow-hidden group">
            <div className="w-full h-12 bg-slate-950 text-start px-5 items-center flex gap-2">
              <div className=" h-3 w-3 rounded-full bg-red-500"></div>
              <div className=" h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className=" h-3 w-3 rounded-full bg-green-500"></div>
            </div>
            <img
              src="/assets/mockup.png"
              alt="Nekoneko Editor Preview"
              className="w-full h-auto grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </main>

      {/* How it Works */}
      <HowItWorks />

      {/* Template Showcase */}

      <TemplateShowcase />
      {/* Features Grid */}
      <section className="py-24 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Box size={24} />}
              title="JSON Block-based Editor"
              description="Assemble your site with modular, beautifully designed JSON blocks. Zero learning curve."
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

      {/* Support Nekoneko */}
      <section className="py-12 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto items-center flex justify-center flex-col px-8 text-center space-y-5">
          <Cat size={40} />
          <h2 className="text-3xl font-black tracking-tight">
            Support Nekoneko
          </h2>
          <p className="text-gray-500 font-medium max-w-md mx-auto">
            If Nekoneko helped you build your dream site, consider fueling the
            next update with a coffee!
          </p>
          <a
            onClick={handleGetStarted}
            href="https://buymeacoffee.com/urkidden/nekoneko-support"
            className="bg-gray-900 text-white flex justify-center items-center gap-3 px-5 py-2 rounded font-bold hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-100"
          >
            <Cat size={20} />
            Buy Nekoneko a coffee
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-8 ">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Ready to build your <br /> next project?
          </h2>
          <p className="text-gray-500 font-medium max-w-md mx-auto">
            Join creators building the simplest sites on the web. Free to start,
            forever.
          </p>

          <button
            onClick={handleGetStarted}
            className="bg-gray-900 text-white px-10 py-4 rounded font-bold hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-100"
          >
            Create Your Site
          </button>
          <button className="mr-0 md:ml-3 bg-gray-900 text-white px-10 py-4 rounded font-bold hover:bg-black transition-all active:scale-95 shadow-xl shadow-gray-100">
            Contribute
          </button>
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
