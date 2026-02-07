import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-gray-50/50 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-black tracking-tight">How it Works</h2>
          <p className="text-gray-500 font-medium">
            Three steps to your new corner of the internet.
          </p>
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
            description="Use our modular JSON block system to add text, images, skills, and more. No code needed."
          />
          <StepCard
            number="03"
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
  <div className="relative space-y-4">
    <div className="text-4xl font-black text-gray-100 absolute -top-10 -left-2 select-none group-hover:text-indigo-50 transition-colors">
      {number}
    </div>
    <h3 className="font-black text-xl relative z-10">{title}</h3>
    <p className="text-sm text-gray-500 font-medium leading-relaxed relative z-10">
      {description}
    </p>
  </div>
);
