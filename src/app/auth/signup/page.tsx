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
    <div className="h-screen w-full bg-[#0a0a0a] grid grid-cols-2">
      {/* Left side - Info */}
      <div className="flex items-center justify-center p-16 bg-[#111111]">
        <div className="text-left">
          <h1 className="text-5xl font-bold text-[#ededed] font-mono mb-6 leading-tight">
            ┌─ JOIN THE<br/>
            &nbsp;&nbsp;&nbsp;SYSTEM ─┐
          </h1>
          <p className="text-[#ffff00] font-mono text-2xl mb-4">$ auth --register</p>
          <div className="text-[#cccccc] font-mono text-lg">
            <div className="mb-2">Initialize new operator</div>
            <div className="text-[#888888]">Create your account to access the terminal</div>
          </div>
        </div>
      </div>
      
      {/* Right side - Signup Form */}
      <div className="flex items-center justify-center p-16">
        <div className="w-full max-w-lg">
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#ffff00] shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#ededed] font-mono mb-2">
                REGISTER
              </h2>
              <p className="text-[#ffff00] font-mono">$ creating account...</p>
            </div>
            
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
                className="w-full py-4 px-6 bg-[#ffff00] text-[#0a0a0a] font-mono font-bold rounded hover:bg-[#cccc00] transition-all transform hover:scale-105 text-lg"
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
    </div>
  );
}
