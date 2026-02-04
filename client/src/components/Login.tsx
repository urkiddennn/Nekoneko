import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Lock } from 'lucide-react';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginMutation = useMutation(api.auth.login);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        try {
            const user = await loginMutation({ email, password });
            localStorage.setItem('neko_user', JSON.stringify(user));
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Invalid email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans text-gray-900">
            {/* Left Side: Branding & Info */}
            <div className="hidden md:flex flex-1 bg-gray-50 border-r border-gray-100 flex-col p-16 justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
                <div className="relative z-10">
                    <div
                        className="font-black text-3xl tracking-tighter cursor-pointer flex items-center gap-2"
                        onClick={() => navigate('/')}
                    >
                        <div className="w-8 h-8 bg-gray-900 rounded-sm flex items-center justify-center">
                            <span className="text-white text-xs">n</span>
                        </div>
                        nekoneko
                    </div>
                </div>

                <div className="relative z-10 space-y-6 max-w-sm">
                    <h2 className="text-4xl font-black tracking-tight leading-[1.1]">
                        The simplest way to <br />
                        <span className="text-gray-400">share your work.</span>
                    </h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Join thousands of creators who use nekoneko to build minimal, high-performance personal sites in seconds.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                            ))}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Trusted by 10+ creators</span>
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">© 2026 Nekoneko Studio</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 flex items-center justify-center px-8 py-12 relative">
                <div className="w-full max-w-sm">
                    {/* Back Link Mobile */}
                    <button
                        onClick={() => navigate('/')}
                        className="md:hidden flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors mb-12 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Back</span>
                    </button>

                    <div className="mb-10 block md:hidden">
                        <div className="font-black text-2xl tracking-tighter">nekoneko</div>
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-2xl font-black tracking-tight">Login</h1>
                        <p className="text-sm font-medium text-gray-400">Welcome back to your workspace.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gray-300" size={16} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded focus:border-gray-900 outline-none transition-all font-medium text-sm bg-gray-50/30 focus:bg-white"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-gray-300" size={16} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded focus:border-gray-900 outline-none transition-all font-medium text-sm bg-gray-50/30 focus:bg-white"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded text-red-600 text-[10px] font-bold uppercase tracking-wider text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-gray-900 text-white py-4 rounded font-bold hover:bg-black transition-all active:scale-[0.98] shadow-lg shadow-gray-100 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                        <p className="text-sm text-gray-400 font-medium">
                            No account? <Link to="/signup" className="text-gray-900 font-bold hover:underline underline-offset-4">Create one for free</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
