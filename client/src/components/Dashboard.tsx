import React, { useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate } from 'react-router-dom';
import { Plus, Globe, Settings, LogOut } from 'lucide-react';

const Dashboard: React.FC = () => {
    const user = JSON.parse(localStorage.getItem('neko_user') || 'null');
    const navigate = useNavigate();

    if (!user) {
        setTimeout(() => navigate('/login'), 0);
        return null;
    }

    const projects = useQuery(api.config.listProjects, { userId: user._id });
    const createProject = useMutation(api.config.createProject);

    const [isCreating, setIsCreating] = useState(false);
    const [newName, setNewName] = useState('');
    const [newSlug, setNewSlug] = useState('');

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const id = await createProject({
                userId: user._id,
                name: newName,
                slug: newSlug.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            });
            navigate(`/editor/${id}`);
        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('neko_user');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            {/* Nav */}
            <div className="h-16 border-b border-gray-100 flex items-center justify-between px-8 bg-white fixed top-0 w-full z-10">
                <div className="font-black text-xl tracking-tighter">nekoneko</div>
                <div className="flex items-center gap-6">
                    <span className="text-sm font-medium text-gray-500">{user.name}</span>
                    <button onClick={handleLogout} className="text-gray-400 hover:text-gray-900 transition-colors">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

            <main className="pt-32 px-8 max-w-6xl mx-auto">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
                        <p className="text-gray-500 mt-2">Manage and view your static sites.</p>
                    </div>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-gray-900 text-white px-4 py-2 rounded font-bold flex items-center gap-2 hover:bg-black transition-all active:scale-95"
                    >
                        <Plus size={18} />
                        New Project
                    </button>
                </div>

                {projects === undefined ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-50 animate-pulse rounded border border-gray-100" />)}
                    </div>
                ) : projects.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded border border-dashed border-gray-200">
                        <p className="text-gray-400 font-medium">No projects yet. Create your first one!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {projects.map((project: any) => (
                            <div key={project._id} className="group border border-gray-200 rounded p-6 hover:border-gray-900 transition-all flex flex-col justify-between h-48">
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{project.name}</h3>
                                    <p className="text-xs text-gray-400 font-mono">/{project.slug}</p>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate(`/editor/${project._id}`)}
                                        className="flex-1 border border-gray-200 py-1.5 rounded text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <Settings size={14} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => window.open(`/${project.slug}`, '_blank')}
                                        className="flex-1 bg-gray-50 py-1.5 rounded text-xs font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5"
                                    >
                                        <Globe size={14} />
                                        Live
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Create Modal */}
            {isCreating && (
                <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleCreate} className="bg-white w-full max-w-sm p-8 border border-gray-200 rounded shadow-2xl animate-in zoom-in-95 duration-200">
                        <h2 className="text-xl font-bold mb-6">Create New Project</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Project Name</label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => {
                                        setNewName(e.target.value);
                                        setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                                    }}
                                    className="w-full px-3 py-2 border border-gray-200 rounded focus:border-gray-900 outline-none"
                                    placeholder="My Portfolio"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">URL Slug</label>
                                <div className="flex items-center">
                                    <span className="text-gray-300 text-sm mr-1">/</span>
                                    <input
                                        type="text"
                                        value={newSlug}
                                        onChange={(e) => setNewSlug(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-200 rounded focus:border-gray-900 outline-none font-mono text-sm"
                                        placeholder="portfolio-2024"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                            <button type="button" onClick={() => setIsCreating(false)} className="flex-1 py-2 text-gray-500 font-bold hover:text-gray-900">Cancel</button>
                            <button type="submit" className="flex-1 bg-gray-900 text-white py-2 rounded font-bold hover:bg-black">Create</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
