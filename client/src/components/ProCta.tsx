import React from "react";

const ProCTA: React.FC = () => {
  return (
    <div className="mt-32 md:p-16 p-2 rounded-2xl bg-[#161616] border border-white/[0.08] text-center space-y-8 overflow-hidden relative">
      {/* Dotted Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.02] pointer-events-none"></div>

      <div className="max-w-2xl mx-auto space-y-6 relative z-10">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-[0.9]">
          Build your digital <br />
          <span className="text-gray-500 italic">presence faster.</span>
        </h2>
        <p className="text-gray-400 font-medium text-lg leading-relaxed">
          Unlock the full potential of Nekoneko with our premium component
          library and advanced design systems.
        </p>
      </div>
      <div className="flex md:flex-row flex-col items-center justify-center gap-4 md:w-auto w-full relative z-10 pt-4">
        <button className="bg-white text-black px-12 py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all active:scale-95 shadow-2xl shadow-white/5">
          Start Building
        </button>
        <button className="bg-[#0b0b0b] text-white border border-white/[0.08] px-12 py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#1a1a1a] transition-all active:scale-95">
          View Templates
        </button>
      </div>
    </div>
  );
};

export default ProCTA;
