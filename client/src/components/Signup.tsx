import React, { useState } from 'react';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Github } from 'lucide-react';
import { setAuthData } from '../utils/authUtils';
import { useAuthActions } from "@convex-dev/auth/react";

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const navigate = useNavigate();
    const signupAction = useAction(api.auth.signup);
    const { signIn } = useAuthActions();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const calculatePasswordStrength = (pwd: string) => {
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (/[A-Z]/.test(pwd)) strength++;
        if (/[a-z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) strength++;
        return strength;
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setPasswordStrength(calculatePasswordStrength(newPassword));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Client-side validation
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if (passwordStrength < 5) {
            setError('Password does not meet strength requirements');
            return;
        }

        setIsLoading(true);
        try {
            const { token, user } = await signupAction({ email, password, name });
            setAuthData({ token, user });
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Error creating account');
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
                        Build your personal <br />
                        <span className="text-gray-400">space in seconds.</span>
                    </h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Start your journey with our modular block system. pick a theme, add your content, and publish instantly.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200" />
                            ))}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Join 10+ creators</span>
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
                        <h1 className="text-2xl font-black tracking-tight">Create Account</h1>
                        <p className="text-sm font-medium text-gray-400">Get started with your free site today.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 px-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-gray-300" size={16} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded focus:border-gray-900 outline-none transition-all font-medium text-sm bg-gray-50/30 focus:bg-white"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>
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
                                    onChange={handlePasswordChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-100 rounded focus:border-gray-900 outline-none transition-all font-medium text-sm bg-gray-50/30 focus:bg-white"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                            {password && (
                                <div className="mt-2 space-y-1">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition-all ${passwordStrength >= level
                                                    ? passwordStrength <= 2
                                                        ? 'bg-red-500'
                                                        : passwordStrength <= 3
                                                            ? 'bg-yellow-500'
                                                            : 'bg-green-500'
                                                    : 'bg-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-400">
                                        {passwordStrength === 0 && 'Enter a password'}
                                        {passwordStrength === 1 && 'Very weak'}
                                        {passwordStrength === 2 && 'Weak'}
                                        {passwordStrength === 3 && 'Fair'}
                                        {passwordStrength === 4 && 'Good'}
                                        {passwordStrength === 5 && 'Strong ✓'}
                                    </p>
                                    {passwordStrength < 5 && (
                                        <p className="text-[10px] text-gray-400">
                                            Needs: 8+ chars, uppercase, lowercase, number, special char
                                        </p>
                                    )}
                                </div>
                            )}
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
                            {isLoading ? 'Creating Account...' : 'Create Account'}
                        </button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
                                <span className="bg-white px-4 text-gray-300">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => signIn("github", { redirectTo: "/dashboard" })}
                            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-200 text-gray-900 py-4 rounded font-bold hover:bg-gray-50 transition-all active:scale-[0.98]"
                        >
                            <Github size={20} />
                            GitHub
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-50 text-center">
                        <p className="text-sm text-gray-400 font-medium">
                            Already have an account? <Link to="/login" className="text-gray-900 font-bold hover:underline underline-offset-4">Log in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
