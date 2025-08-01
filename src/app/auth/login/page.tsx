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

      // Add email validation
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
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#ededed] font-mono mb-6">
            ┌─ TERMINAL ACCESS ─┐
          </h1>
          <p className="text-[#00ff00] font-mono text-lg mb-4">$ auth --login</p>
          <div className="text-[#cccccc] font-mono text-sm">
            <div>Welcome back, operator</div>
          </div>
        </div>
        
        <div className="max-w-lg mx-auto bg-[#1a1a1a] p-8 rounded-lg border border-[#00ff00] shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-[#ededed] font-mono mb-2">
              LOGIN
            </h2>
            <p className="text-[#00ff00] font-mono text-sm">$ accessing system...</p>
          </div>
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="text-[#ff0000] text-sm mb-4">
                {error}
              </div>
            )}
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
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#00ff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#00ff00] focus:border-[#00ff00]"
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
                  autoComplete="current-password"
                  required
                  minLength={8}
                  className="w-full px-4 py-3 bg-[#2a2a2a] border border-[#00ff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#00ff00] focus:border-[#00ff00]"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-[#00ff00] text-[#0a0a0a] font-mono font-bold rounded hover:bg-[#00cc00] focus:outline-none focus:ring-2 focus:ring-[#00ff00] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#0a0a0a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    ACCESSING...
                  </>
                ) : (
                  '[ENTER SYSTEM]'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <a href="/auth/signup" className="text-[#00ff00] hover:text-[#ffffff] font-mono text-sm transition-colors">
              &gt; Create new account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
