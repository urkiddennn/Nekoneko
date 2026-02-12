import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ArrowLeft, TrendingUp, Users, Clock, Globe } from 'lucide-react';
import Header from '../Header';
import { useAuth } from '../../hooks/useAuth';

const Analytics: React.FC = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const { token, isConvexAuth } = useAuth();

    const stats = useQuery(api.analytics.getStats, (token || isConvexAuth) && projectId ? { token: (token || undefined) as any, projectId: projectId as any } : "skip");
    const project = useQuery(api.config.getProject, { id: projectId as any });

    if (!stats || !project) {
        return (
            <div className="min-h-screen bg-[#0b0b0b] flex items-center justify-center font-sans">
                <div className="flex flex-col items-center gap-4 text-white">
                    <div className="w-12 h-12 border-4 border-white/[0.04] border-t-white rounded-full animate-spin"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Loading Stats...</span>
                </div>
            </div>
        );
    }

    const maxValue = Math.max(...stats.dailyViews, 1);

    return (
        <div className="min-h-screen bg-[#0b0b0b] text-white font-sans">
            <Header />
            <div className="max-w-6xl mx-auto space-y-12 pt-32 pb-12 px-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-3 rounded-xl hover:bg-white/[0.04] text-gray-400 hover:text-white transition-all border border-white/[0.04] hover:border-white/[0.08]"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight text-white">{project.name}</h1>
                            <p className="text-sm font-bold text-gray-500 mt-1">Project Analytics Overview</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        label="Total Views"
                        value={stats.total}
                        icon={<Users size={18} />}
                        color="text-indigo-400"
                    />
                    <StatCard
                        label="Last 24 Hours"
                        value={stats.last24h}
                        icon={<TrendingUp size={18} />}
                        color="text-green-400"
                    />
                    <StatCard
                        label="Last 7 Days"
                        value={stats.last7d}
                        icon={<Clock size={18} />}
                        color="text-amber-400"
                    />
                </div>

                {/* Simple Sparkline Chart */}
                <div className="bg-[#161616] border border-white/[0.08] rounded-xl p-10 shadow-2xl shadow-black/20">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-white">Traffic Trend</h3>
                            <p className="text-xs font-bold text-gray-500">Daily views over the last 7 days</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.02] rounded-full border border-white/[0.04]">
                            <Globe size={12} className="text-indigo-400" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-gray-500">Live Data</span>
                        </div>
                    </div>

                    <div className="h-48 w-full flex gap-2 pt-8">
                        {stats.dailyViews.map((v, i) => (
                            <div key={i} className="flex-1 h-full flex flex-col items-center gap-3 group">
                                <div className="relative w-full flex flex-col items-center flex-1 justify-end">
                                    <div
                                        className="w-full bg-indigo-500/20 border border-indigo-500/30 rounded-t-lg group-hover:bg-indigo-500 group-hover:border-indigo-500 transition-all duration-300 relative"
                                        style={{ height: `${v > 0 ? Math.max((v / maxValue) * 100, 5) : 0}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black rounded text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                                            {v} views
                                        </div>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-tighter ${i === 6 ? 'text-white' : 'text-gray-700'} `}>
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(new Date().getDay() - (6 - i) + 7) % 7]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail List Placeholder */}
                <div className="pt-12 border-t border-white/[0.04] text-center">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-700">Detailed logs coming soon</p>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon, color }: { label: string, value: number, icon: any, color: string }) => (
    <div className="p-8 bg-[#161616] border border-white/[0.08] rounded-xl flex flex-col gap-4 group hover:border-white/[0.2] transition-all">
        <div className={`p-3 rounded-lg bg-white/[0.02] border border-white/[0.04] w-fit group-hover:bg-indigo-500 group-hover:text-white transition-all ${color}`}>
            {icon}
        </div>
        <div>
            <div className="text-4xl font-black tracking-tight text-white">{value}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-500 mt-1">{label}</div>
        </div>
    </div>
);

export default Analytics;
