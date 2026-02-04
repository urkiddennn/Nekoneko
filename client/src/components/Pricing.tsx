import React from 'react';

interface PricingTier {
    name: string;
    price: string;
    features: string[];
    isPopular?: boolean;
}

interface PricingProps {
    title: string;
    tiers: PricingTier[];
}

const Pricing: React.FC<PricingProps> = ({ title, tiers }) => {
    return (
        <div>
            <h2 className="text-4xl font-black mb-16 text-center tracking-tighter uppercase italic">{title}</h2>
            <div className="grid grid-cols-3 gap-8">
                {tiers.map((tier, idx) => (
                    <div key={idx} className={`p-10 rounded-[40px] border-2 ${tier.isPopular ? 'bg-indigo-600 border-indigo-600 text-white shadow-2xl' : 'bg-white border-slate-200 text-slate-900'} space-y-8 flex flex-col`}>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] opacity-60 mb-2">{tier.name}</h3>
                            <div className="text-5xl font-black tracking-tighter">{tier.price}</div>
                        </div>
                        <ul className="flex-1 space-y-4">
                            {tier.features.map((f, i) => (
                                <li key={i} className="text-sm font-bold flex items-center gap-3">
                                    <div className={`w-1.5 h-1.5 rounded-full ${tier.isPopular ? 'bg-white' : 'bg-indigo-600'}`}></div>
                                    {f}
                                </li>
                            ))}
                        </ul>
                        <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs ${tier.isPopular ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white'}`}>Get Started</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
