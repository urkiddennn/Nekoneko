import React, { useState } from 'react';
import { useAction } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, User, Mail, Lock, Github, Check, AlertCircle } from 'lucide-react';
import { useAuthActions } from "@convex-dev/auth/react";

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState<'credentials' | 'verification'>('credentials');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { signIn } = useAuthActions();
    const navigate = useNavigate();
    const signupAction = useAction(api.auth.signup);
    const verifySignup = useAction(api.auth.verifySignup);

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

    const handleSignupSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Please enter your full name');
            return;
        }

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
            // Step 1: Initiate signup (stores in unverified_users)
            await signupAction({ email, password, name });
            setStep('verification');
        } catch (err: any) {
            setError(err.message || 'Error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCodeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!code.trim()) {
            setError('Please enter the verification code');
            return;
        }

        setIsLoading(true);
        try {
            // Step 2: Verify OTP (creates user in 'users' table)
            await verifySignup({ email, otp: code });

            // Step 3: Log in with the newly created account
            await signIn("password", { email, password, flow: "signIn" });
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Invalid verification code');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-[#0b0b0b] font-sans text-white">
            {/* Left Side: Branding & Info */}
            <div className="hidden md:flex flex-1 bg-[#111] border-r border-white/[0.04] flex-col p-16 justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]"></div>
                <div className="relative z-10">
                    <div
                        className="font-black text-3xl tracking-tighter cursor-pointer flex items-center gap-2 text-white"
                        onClick={() => navigate('/')}
                    >
                        <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                            <span className="text-black text-xs">n</span>
                        </div>
                        nekoneko
                    </div>
                </div>

                <div className="relative z-10 space-y-6 max-w-sm">
                    <h2 className="text-3xl font-black tracking-tight leading-[1.1] text-white">
                        Build your personal <br />
                        <span className="text-gray-700">space in seconds.</span>
                    </h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Start your journey with our modular block system. pick a theme, add your content, and publish instantly.
                    </p>
                    <div className="flex items-center gap-4 pt-4">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-black bg-white/[0.04]" />
                            ))}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">Join 10+ creators</span>
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-800">© 2026 Nekoneko Studio</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="flex-1 flex items-center justify-center px-8 py-12 relative">
                <div className="w-full max-w-sm">
                    {/* Back Link Mobile */}
                    <button
                        onClick={() => navigate('/')}
                        className="md:hidden flex items-center gap-2 text-gray-600 hover:text-white transition-colors mb-12 group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-widest">Back</span>
                    </button>

                    <div className="mb-10 block md:hidden">
                        <div className="font-black text-2xl tracking-tighter text-white">nekoneko</div>
                    </div>

                    <div className="space-y-1">
                        <h1 className="text-xl font-black tracking-tight text-white">
                            {step === 'verification' ? 'Verify Email' : 'Create Account'}
                        </h1>
                        <p className="text-sm font-medium text-gray-500">
                            {step === 'verification'
                                ? `We sent a code to ${email}`
                                : 'Start building your professional site today.'}
                        </p>
                    </div>

                    <form
                        onSubmit={
                            step === 'credentials' ? handleSignupSubmit : handleCodeSubmit
                        }
                        className="mt-10 space-y-6"
                    >
                        {step === 'credentials' && (
                            <>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2 px-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 text-gray-700" size={16} />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-white/[0.08] rounded-lg focus:border-indigo-500 outline-none transition-all font-medium text-sm bg-[#111] focus:bg-[#111] text-white placeholder:text-gray-800"
                                            placeholder="John Doe"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2 px-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 text-gray-700" size={16} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-white/[0.08] rounded-lg focus:border-indigo-500 outline-none transition-all font-medium text-sm bg-[#111] focus:bg-[#111] text-white placeholder:text-gray-800"
                                            placeholder="name@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2 px-1">Password</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 text-gray-700" size={16} />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={handlePasswordChange}
                                            className="w-full pl-10 pr-4 py-3 border border-white/[0.08] rounded-lg focus:border-indigo-500 outline-none transition-all font-medium text-sm bg-[#111] focus:bg-[#111] text-white placeholder:text-gray-800"
                                            placeholder="••••••••"
                                            required
                                        />
                                    </div>

                                    {/* Password Strength Indicator */}
                                    <div className="mt-4 space-y-3">
                                        <div className="flex gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full transition-all duration-500 ${i < passwordStrength
                                                        ? passwordStrength <= 2 ? 'bg-red-500' : passwordStrength <= 4 ? 'bg-amber-500' : 'bg-emerald-500'
                                                        : 'bg-white/[0.04]'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                                            <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${password.length >= 8 ? 'text-emerald-500' : 'text-gray-800'}`}>
                                                {password.length >= 8 ? <Check size={10} /> : <div className="w-2.5 h-2.5" />}
                                                8+ Characters
                                            </div>
                                            <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${/[A-Z]/.test(password) ? 'text-emerald-500' : 'text-gray-800'}`}>
                                                {/[A-Z]/.test(password) ? <Check size={10} /> : <div className="w-2.5 h-2.5" />}
                                                Uppercase
                                            </div>
                                            <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${/[0-9]/.test(password) ? 'text-emerald-500' : 'text-gray-800'}`}>
                                                {/[0-9]/.test(password) ? <Check size={10} /> : <div className="w-2.5 h-2.5" />}
                                                Number
                                            </div>
                                            <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${/[!@#$%^&*()]/.test(password) ? 'text-emerald-500' : 'text-gray-800'}`}>
                                                {/[!@#$%^&*()]/.test(password) ? <Check size={10} /> : <div className="w-2.5 h-2.5" />}
                                                Special
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {step === 'verification' && (
                            <div className="space-y-6">
                                <div className="p-4 bg-white/[0.02] border border-white/[0.04] rounded-lg flex items-start gap-3">
                                    <AlertCircle className="text-gray-600 shrink-0" size={18} />
                                    <p className="text-xs font-medium text-gray-500 leading-relaxed">
                                        We've sent a 6-digit verification code to <span className="text-white font-bold">{email}</span>. Please enter it below to complete your registration.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-600 mb-2 px-1">Verification Code</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 text-gray-700" size={16} />
                                        <input
                                            type="text"
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                            className="w-full pl-10 pr-4 py-3 border border-white/[0.08] rounded-lg focus:border-indigo-500 outline-none transition-all font-medium bg-[#111] focus:bg-[#111] text-center tracking-[0.5em] font-mono text-lg text-white placeholder:text-gray-800"
                                            placeholder="••••••"
                                            maxLength={6}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setStep('credentials')}
                                        className="mt-2 text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-widest transition-colors"
                                    >
                                        Edit Details
                                    </button>
                                </div>
                            </div>
                        )}

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-[10px] font-bold uppercase tracking-wider text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full bg-white text-black py-4 rounded-lg font-bold hover:bg-gray-200 transition-all active:scale-[0.98] shadow-xl shadow-white/5 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Processing...' :
                                step === 'credentials' ? 'Create Account' : 'Verify & Continue'}
                        </button>

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/[0.04]"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
                                <span className="bg-[#0b0b0b] px-4 text-gray-700">Or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => signIn("github", { redirectTo: "/dashboard" })}
                            className="w-full flex items-center justify-center gap-3 bg-white/[0.02] border border-white/[0.08] text-white py-4 rounded-lg font-bold hover:bg-white/[0.04] transition-all active:scale-[0.98] shadow-sm"
                        >
                            <Github size={20} />
                            GitHub
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/[0.04] text-center">
                        <p className="text-sm text-gray-500 font-medium">
                            Already have an account? <Link to="/login" className="text-white font-bold hover:underline underline-offset-4">Sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
