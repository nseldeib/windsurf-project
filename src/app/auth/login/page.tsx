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
    <div className="h-screen w-full bg-[#0a0a0a] grid grid-cols-2">
      {/* Left side - Info */}
      <div className="flex items-center justify-center p-16 bg-[#111111]">
        <div className="text-left">
          <h1 className="text-5xl font-bold text-[#ededed] font-mono mb-6 leading-tight">
            ┌─ TERMINAL<br/>
            &nbsp;&nbsp;&nbsp;ACCESS ─┐
          </h1>
          <p className="text-[#00ff00] font-mono text-2xl mb-4">$ auth --login</p>
          <div className="text-[#cccccc] font-mono text-lg">
            <div className="mb-2">Welcome back, operator</div>
            <div className="text-[#888888]">Enter your credentials to access the system</div>
          </div>
        </div>
      </div>
      
      {/* Right side - Login Form */}
      <div className="flex items-center justify-center p-16">
        <div className="w-full max-w-lg">
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#00ff00] shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#ededed] font-mono mb-2">
                LOGIN
              </h2>
              <p className="text-[#00ff00] font-mono">$ accessing system...</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleLogin}>
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
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  className="w-full px-4 py-4 bg-[#2a2a2a] border border-[#00ff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#00ff00] text-lg"
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
                  className="w-full px-4 py-4 bg-[#2a2a2a] border border-[#00ff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#00ff00] text-lg"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-[#00ff00] text-[#0a0a0a] font-mono font-bold rounded hover:bg-[#00cc00] disabled:opacity-50 transition-all transform hover:scale-105 text-lg"
              >
                {isLoading ? 'ACCESSING...' : '[ENTER SYSTEM]'}
              </button>
            </form>

            <div className="text-center mt-6">
              <a href="/auth/signup" className="text-[#00ff00] hover:text-[#ffffff] font-mono">
                &gt; Create new account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
