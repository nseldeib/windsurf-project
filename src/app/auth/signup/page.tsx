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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-[#ededed] font-mono mb-4">
            ┌─ TERMINAL SIGNUP ─┐
          </h1>
          <p className="text-[#ffff00] font-mono text-xl mb-2">$ auth --register</p>
          <div className="text-[#cccccc] font-mono">
            <div>Initialize new operator</div>
          </div>
        </div>
        
        {/* Signup Form */}
        <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#ffff00] shadow-2xl">
          <form className="space-y-6" onSubmit={handleSignup}>
            {error && (
              <div className="text-[#ff0000] text-sm text-center mb-4">
                {error}
              </div>
            )}
            
            <div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-4 bg-[#2a2a2a] border border-[#ffff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#ffff00] text-lg"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-4 py-4 bg-[#2a2a2a] border border-[#ffff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#ffff00] text-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 px-8 bg-[#ffff00] text-[#0a0a0a] font-mono font-bold rounded hover:bg-[#cccc00] transition-all text-lg"
            >
              [CREATE ACCOUNT]
            </button>
          </form>
          
          <div className="text-center mt-6">
            <a href="/auth/login" className="text-[#ffff00] hover:text-[#ffffff] font-mono">
              &gt; Already have an account? Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
