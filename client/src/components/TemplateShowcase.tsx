import React from "react";

const TemplateShowcase: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Designed for Every Style
            </h2>
            <p className="text-gray-500 font-medium max-w-lg">
              Our templates are crafted with a "minimal-first" philosophy. No
              clutter, just your work.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TemplatePreview
            name="Modern Resume"
            color="bg-indigo-500"
            description="A bold, professional layout for developers."
          />
          <TemplatePreview
            name="Minimal Landing"
            color="bg-slate-900"
            description="Ultra-clean design with high-focus typography."
          />
          <TemplatePreview
            name="Aesthetic Portfolio"
            color="bg-pink-500"
            description="Vibrant and creative for visual storytellers."
          />
          <TemplatePreview
            name="Retro Agency"
            color="bg-amber-500"
            description="Nostalgic, high-impact blocky design."
          />
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;

const TemplatePreview = ({
  name,
  color,
  description,
}: {
  name: string;
  color: string;
  description: string;
}) => (
  <div className="group space-y-4">
    <div className="aspect-[4/3] bg-gray-50 border border-gray-100 rounded overflow-hidden relative">
      <div
        className={`absolute top-4 left-4 w-3 h-3 rounded-full ${color}`}
      ></div>
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
