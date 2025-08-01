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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#ededed] font-mono mb-6">
            ┌─ JOIN THE SYSTEM ─┐
          </h1>
          <p className="text-[#ffff00] font-mono text-lg mb-4">$ auth --register</p>
          <div className="text-[#cccccc] font-mono text-sm">
            <div>Initialize new operator</div>
          </div>
        </div>
        
        <div className="max-w-lg mx-auto bg-[#1a1a1a] p-8 rounded-lg border border-[#ffff00] shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-[#ededed] font-mono mb-2">
              REGISTER
            </h2>
            <p className="text-[#ffff00] font-mono text-sm">$ creating account...</p>
          </div>
          <form className="space-y-6" onSubmit={handleSignup}>
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
                className="w-full py-4 px-6 bg-[#ffff00] text-[#0a0a0a] font-mono font-bold rounded hover:bg-[#cccc00] focus:outline-none focus:ring-2 focus:ring-[#ffff00] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] transition-all duration-200"
              >
                [CREATE ACCOUNT]
              </button>
            </div>
          </form>
          
          <div className="text-center mt-6">
            <a href="/auth/login" className="text-[#ffff00] hover:text-[#ffffff] font-mono text-sm transition-colors">
              &gt; Already have an account? Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
