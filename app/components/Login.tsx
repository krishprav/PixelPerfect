'use client';

import React, { useState } from 'react';
import { Layout } from 'lucide-react';
import { AuthService } from './AuthService';

interface LoginProps {
  onLogin: (user: any) => void;
  switchToRegister: () => void;
  onGoogleLogin: () => void;
}

const Login = ({ onLogin, switchToRegister, onGoogleLogin }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const user = await AuthService.login(email, password);
      AuthService.setCurrentUser(user);
      onLogin(user);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <Layout className="w-8 h-8 text-blue-400 mr-2" />
          <h1 className="text-2xl font-bold text-white">PixelPerfect</h1>
        </div>
        <h2 className="text-xl text-white font-semibold mb-6 text-center">Log in to your account</h2>
        {error && (
          <div className="bg-red-900/50 text-red-200 px-4 py-2 rounded mb-4 text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="w-full bg-gray-700 text-white rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <button
          onClick={onGoogleLogin}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md transition flex items-center justify-center mt-4"
        >
          Sign in with Google
        </button>
        <div className="mt-4 text-center">
          <button className="text-blue-400 text-sm hover:underline" onClick={switchToRegister}>
            Don’t have an account? Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;