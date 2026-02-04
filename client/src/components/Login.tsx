import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate, Link } from 'react-router-dom';

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
        <div className="min-h-screen flex items-center justify-center bg-white font-sans text-gray-900">
            <div className="w-full max-w-sm p-8 border border-gray-200 rounded">
                <h1 className="text-xl font-bold mb-6 tracking-tight">Login to nekoneko</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded focus:border-gray-900 outline-none transition-colors"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded focus:border-gray-900 outline-none transition-colors"
                            required
                        />
                    </div>
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-gray-900 text-white py-2 rounded font-bold hover:bg-black transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-400">
                    Don't have an account? <Link to="/signup" className="text-gray-900 font-bold">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
