'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      router.push('/auth/login');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-[#1a1a1a] p-8 rounded-lg border border-[#3a3a3a] shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#ededed] font-mono">
            ┌─ TERMINAL SIGNUP ─┐
          </h2>
          <p className="mt-2 text-[#ffff00] font-mono text-sm">$ auth --register</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#ffff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#ffff00] focus:border-[#ffff00]"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#ffff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#ffff00] focus:border-[#ffff00]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-[#ff0000] text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-[#ffff00] text-[#0a0a0a] font-mono font-bold rounded hover:bg-[#cccc00] focus:outline-none focus:ring-2 focus:ring-[#ffff00] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] transition-colors"
            >
              Create account
            </button>
          </div>
        </form>
        
        <div className="text-center mt-6">
          <a href="/auth/login" className="text-[#ffff00] hover:text-[#ffffff] font-mono text-sm">
            &gt; Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
}
