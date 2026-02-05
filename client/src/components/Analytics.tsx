import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { ArrowLeft, TrendingUp, Users, Clock, Globe } from 'lucide-react';
import Header from './Header';
import { getToken } from '../utils/authUtils';

const Analytics: React.FC = () => {
    const { projectId } = useParams();
    const navigate = useNavigate();
    const token = getToken() || "";
    const stats = useQuery(api.analytics.getStats, token && projectId ? { token, projectId: projectId as any } : "skip");
    const project = useQuery(api.config.getProject, { id: projectId as any });

    if (!stats || !project) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center font-sans">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-slate-100 border-t-slate-900 rounded-full animate-spin"></div>
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">Loading Stats...</span>
                </div>
            </div>
        );
    }

    const maxValue = Math.max(...stats.dailyViews, 1);

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            <Header />
            <div className="max-w-4xl mx-auto space-y-12 pt-32 pb-12 px-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-3 rounded-xl hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all border border-transparent hover:border-slate-100"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">{project.name}</h1>
                            <p className="text-sm font-bold text-slate-400 mt-1">Project Analytics Overview</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        label="Total Views"
                        value={stats.total}
                        icon={<Users size={18} />}
                        color="text-indigo-600"
                    />
                    <StatCard
                        label="Last 24 Hours"
                        value={stats.last24h}
                        icon={<TrendingUp size={18} />}
                        color="text-emerald-500"
                    />
                    <StatCard
                        label="Last 7 Days"
                        value={stats.last7d}
                        icon={<Clock size={18} />}
                        color="text-amber-500"
                    />
                </div>

                {/* Simple Sparkline Chart */}
                <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm shadow-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Traffic Trend</h3>
                            <p className="text-xs font-bold text-slate-400">Daily views over the last 7 days</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
                            <Globe size={12} className="text-slate-400" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">Live Data</span>
                        </div>
                    </div>

                    <div className="h-48 w-full flex gap-2 pt-8">
                        {stats.dailyViews.map((v, i) => (
                            <div key={i} className="flex-1 h-full flex flex-col items-center gap-3 group">
                                <div className="relative w-full flex flex-col items-center flex-1 justify-end">
                                    <div
                                        className="w-full bg-indigo-500/10 border border-indigo-500/20 rounded-t-lg group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all duration-300 relative"
                                        style={{ height: `${v > 0 ? Math.max((v / maxValue) * 100, 5) : 0}% ` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white rounded text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                                            {v} views
                                        </div>
                                    </div>
                                </div>
                                <span className={`text - [10px] font - black uppercase tracking - tighter ${i === 6 ? 'text-slate-900' : 'text-slate-300'} `}>
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(new Date().getDay() - (6 - i) + 7) % 7]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail List Placeholder */}
                <div className="pt-12 border-t border-slate-50 text-center">
                    <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-300">Detailed logs coming soon</p>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ label, value, icon, color }: { label: string, value: number, icon: any, color: string }) => (
    <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm shadow-gray-100 flex flex-col gap-4 group hover:border-slate-900 transition-all">
        <div className={`p - 3 rounded - xl bg - slate - 50 w - fit group - hover: bg - slate - 900 group - hover: text - white transition - all ${color} `}>
            {icon}
        </div>
        <div>
            <div className="text-4xl font-black tracking-tight text-slate-900">{value}</div>
            <div className="text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 mt-1">{label}</div>
        </div>
    </div>
);

export default Analytics;
