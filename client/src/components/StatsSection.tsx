import React from "react";
import { Users, Zap, Star } from "lucide-react";

// stats sections
const StatsSection: React.FC = () => {
  return (
    <section className="py-24 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-5 duration-700">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">
            Our results in numbers
          </h2>
          <p className="text-gray-500 font-medium max-w-lg mx-auto">
            Powering modern production sites with speed, reliability, and
            precision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          <StatCard
            icon={Users}
            number="10"
            unit="+"
            title="Active Creators"
            index={0}
          />
          <StatCard
            icon={Zap}
            number="30"
            unit="+"
            title="Sites Deployed"
            index={1}
          />
          <StatCard
            icon={Star}
            number="99"
            unit="%"
            title="Customer Satisfaction"
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
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  number,
  unit,
  title,
  index,
}) => (
  <div
    className="group relative p-8 bg-gray-50/50 rounded border border-gray-100 hover:border-gray-400 hover:bg-white transition-all animate-in fade-in slide-in-from-bottom-8 duration-1000"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <div className="space-y-6">
      <div className="w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded text-gray-600 group-hover:scale-110 transition-all duration-500">
        <Icon size={24} />
      </div>

      <div className="space-y-1">
        <div className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 flex items-baseline gap-1 leading-none">
          {number}
          <span className="text-gray-600/30 group-hover:text-gray-600 transition-colors duration-500">
            {unit}
          </span>
        </div>
        <h3 className="font-black text-lg tracking-tight text-slate-600 group-hover:text-slate-900 transition-colors duration-300">
          {title}
        </h3>
      </div>
    </div>
  </div>
);
