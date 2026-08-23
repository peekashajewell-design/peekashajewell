'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validate password
    const correctPassword = 'shreyariji1234123';

    if (password === correctPassword) {
      sessionStorage.setItem('admin_token', password);
      toast.success('Login successful!');
      router.push('/admin/dashboard');
    } else {
      toast.error('Incorrect password');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100 px-4">
      <div className="card max-w-md w-full p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
            <FiLock className="w-8 h-8 text-primary-600" />
          </div>
        </div>

        <h1 className="text-3xl font-display font-bold text-center mb-2">Admin Login</h1>
        <p className="text-gray-600 text-center mb-8">
          Enter your password to access the admin panel
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="Enter admin password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
