import React from "react";
import { Users, Zap, Star } from "lucide-react";

// stats sections
const StatsSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0b0b0b] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="sr-only">Platform Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <StatCard
            icon={Users}
            number="10"
            unit="+"
            title="Active Creators"
            description="Founders building the next wave of aesthetic web spaces."
            index={0}
          />
          <StatCard
            icon={Zap}
            number="30"
            unit="+"
            title="Sites Deployed"
            description="Instantly published sites served with sub-second performance."
            index={1}
          />
          <StatCard
            icon={Star}
            number="99"
            unit="%"
            title="Uptime Guarantee"
            description="Global edge infrastructure ensuring your presence is always live."
            index={2}
          />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

interface StatCardProps {
  icon: any;
  number: string;
  unit: string;
  title: string;
  description: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  number,
  unit,
  title,
  description,
  index,
}) => (
  <div
    className="group relative space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 flex items-center justify-center bg-[#161616] border border-white/[0.08] text-indigo-400 rounded-lg group-hover:bg-indigo-500 group-hover:text-white group-hover:scale-110 transition-all duration-500">
        <Icon size={20} />
      </div>
      <div className="h-px flex-1 bg-white/[0.04]"></div>
    </div>

    <div className="space-y-2">
      <div className="text-5xl font-black tracking-tighter text-white flex items-baseline gap-1 leading-none">
        {number}
        <span className="text-indigo-500 italic">
          {unit}
        </span>
      </div>
      <h3 className="font-black text-lg tracking-tight text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-400 font-medium leading-relaxed max-w-[240px]">
        {description}
      </p>
    </div>
  </div>
);
