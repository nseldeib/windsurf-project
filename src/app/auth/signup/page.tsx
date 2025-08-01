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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#ededed] font-mono mb-4">
            ┌─ TERMINAL SIGNUP ─┐
          </h1>
          <p className="text-[#ffff00] font-mono mb-2">$ auth --register</p>
          <div className="text-[#cccccc] font-mono text-sm">
            <div>Initialize new operator</div>
          </div>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#ffff00] shadow-lg">
          <form className="space-y-4" onSubmit={handleSignup}>
            {error && (
              <div className="text-[#ff0000] text-sm text-center">
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
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#ffff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#ffff00]"
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
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#ffff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#ffff00]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-[#ffff00] text-[#0a0a0a] font-mono font-bold rounded hover:bg-[#cccc00] transition-colors"
            >
              [CREATE ACCOUNT]
            </button>
          </form>
          
          <div className="text-center mt-4">
            <a href="/auth/login" className="text-[#ffff00] hover:text-[#ffffff] font-mono text-sm">
              &gt; Already have an account? Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
