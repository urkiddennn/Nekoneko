import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-[#0b0b0b] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/[0.08] rounded-lg text-indigo-400">
            <span className="text-[10px] font-black uppercase tracking-widest">Workflow</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white">How it Works</h2>
          <p className="text-gray-400 font-medium max-w-lg mx-auto">
            Three steps to your new corner of the internet. Zero complexity, just your vision.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative items-start">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[22px] left-[10%] right-[10%] h-px bg-white/[0.05] pointer-events-none"></div>

          <StepCard
            number="1"
            title="Pick a Template"
            description="Start with one of our aesthetic presets: Modern, Minimal, Aesthetic, or Retro."
          />
          <StepCard
            number="2"
            title="Customize Content"
            description="Use our modular JSON block system to add text, images, skills, and more. No code needed."
          />
          <StepCard
            number="3"
            title="Publish Instantly"
            description="Hit publish and your site is live on your dedicated subdomain in milliseconds."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

const StepCard = ({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) => (
  <div className="relative space-y-6 text-center md:text-left flex flex-col items-center md:items-start group">
    <div className="w-11 h-11 flex items-center justify-center bg-[#161616] border border-indigo-500/30 text-indigo-400 rounded-full font-black text-lg shadow-xl shadow-black/50 z-10 group-hover:bg-indigo-500 group-hover:text-white group-hover:border-indigo-500 transition-all duration-500">
      {number}
    </div>
    <div className="space-y-2">
      <h3 className="font-black text-xl text-white">{title}</h3>
      <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-[280px]">
        {description}
      </p>
    </div>
  </div>
);
