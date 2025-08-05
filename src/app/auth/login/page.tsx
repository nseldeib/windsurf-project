'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      if (password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        router.push('/dashboard');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex justify-center items-center">
      <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 py-12">
        {/* Login Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#00ff00] shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-[#ededed] font-mono mb-2">
                ACCESS TERMINAL
              </h2>
              <p className="text-[#00ff00] font-mono text-sm">$ auth --login</p>
            </div>
            
          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="text-[#ff0000] text-sm mb-4 text-center">
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
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                className="w-full px-3 py-3 bg-[#2a2a2a] border border-[#00ff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#00ff00]"
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
                autoComplete="current-password"
                required
                minLength={8}
                className="w-full px-3 py-3 bg-[#2a2a2a] border border-[#00ff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#00ff00]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-[#00ff00] text-[#0a0a0a] font-mono font-bold rounded hover:bg-[#00cc00] disabled:opacity-50 transition-all"
            >
              {isLoading ? 'ACCESSING...' : '[ENTER SYSTEM]'}
            </button>
          </form>

          <div className="text-center mt-6">
            <a href="/auth/signup" className="text-[#00ff00] hover:text-[#ffffff] font-mono">
              &gt; Create new account
            </a>
          </div>
          
          <div className="mt-8 text-center">
            <div className="text-[#00ff00] font-mono">
              <span className="text-[#00ff00]">$</span> <span className="text-[#888888]">Ready for input...</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
