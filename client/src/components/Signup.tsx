import React, { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useNavigate, Link } from 'react-router-dom';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const signupMutation = useMutation(api.auth.signup);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userId = await signupMutation({ email, password, name });
            localStorage.setItem('neko_user', JSON.stringify({ _id: userId, email, name }));
            navigate('/dashboard');
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white font-sans text-gray-900">
            <div className="w-full max-w-sm p-8 border border-gray-200 rounded">
                <h1 className="text-xl font-bold mb-6 tracking-tight">Create an account</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 rounded focus:border-gray-900 outline-none transition-colors"
                            required
                        />
                    </div>
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
                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-2 rounded font-bold hover:bg-black transition-colors"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-6 text-center text-sm text-gray-400">
                    Already have an account? <Link to="/login" className="text-gray-900 font-bold">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
