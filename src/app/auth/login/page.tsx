'use client';

// Import necessary hooks and utilities
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

/**
 * Login Page Component
 * 
 * Terminal-themed login interface for Hack Board
 * Handles user authentication with Supabase and form validation
 */
/**
 * Login form component with search params handling
 */
function LoginForm() {
  // Navigation and UI utilities
  const router = useRouter();
  const { toast } = useToast();
  
  // Form state management
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  
  /**
   * Handle URL parameters for error messages and success states
   */
  useEffect(() => {
    const errorParam = searchParams.get('error');
    const messageParam = searchParams.get('message');
    
    if (errorParam === 'session-expired') {
      setError('⏰ SESSION EXPIRED: Your session has timed out. Please log in again to continue.');
    } else if (messageParam === 'check-email') {
      toast({
        title: "📧 Registration Successful!",
        description: "Please check your email and click the confirmation link to activate your account.",
      });
    }
  }, [searchParams, toast]);

  /**
   * Handle login form submission
   * Validates form data and authenticates user with Supabase
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Basic form validation with terminal-style messages
      if (!email || !password) {
        throw new Error('⚠️ AUTHENTICATION REQUIRED: Both email and password fields must be completed');
      }

      if (password.length < 8) {
        throw new Error('🔒 SECURITY PROTOCOL: Password must contain at least 8 characters for system access');
      }

      // Email format validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new Error('📧 FORMAT ERROR: Please enter a valid email address (example: user@domain.com)');
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
      // Enhanced error handling with user-friendly messages
      let errorMessage = 'SYSTEM ERROR: Unable to process authentication request';
      
      if (error instanceof Error) {
        const msg = error.message.toLowerCase();
        
        // Map Supabase errors to human-readable messages
        if (msg.includes('invalid') && (msg.includes('email') || msg.includes('password') || msg.includes('credentials'))) {
          errorMessage = '🚫 ACCESS DENIED: Invalid email or password. Please check your credentials and try again.';
        } else if (msg.includes('email not confirmed') || msg.includes('signup')) {
          errorMessage = '📧 EMAIL VERIFICATION: Please check your email and click the confirmation link before logging in.';
        } else if (msg.includes('too many') || msg.includes('rate') || msg.includes('limit')) {
          errorMessage = '⏰ RATE LIMIT: Too many login attempts. Please wait a few minutes before trying again.';
        } else if (msg.includes('network') || msg.includes('fetch') || msg.includes('connection')) {
          errorMessage = '🌐 CONNECTION ERROR: Unable to reach authentication server. Please check your internet connection.';
        } else if (error.message.includes('⚠️') || error.message.includes('🔒') || error.message.includes('📧')) {
          // Keep our custom validation messages as-is
          errorMessage = error.message;
        } else if (error.message) {
          errorMessage = `💻 SYSTEM MESSAGE: ${error.message}`;
        }
      }
      
      setError(errorMessage);
      toast({
        title: "🚨 Authentication Failed",
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
              <div className="bg-[#2a1a1a] border border-[#ff0000] rounded p-3 mb-4">
                <div className="text-[#ff0000] text-sm font-mono text-center">
                  <div className="mb-1">┌─ SYSTEM ALERT ─┐</div>
                  <div className="text-left px-2">{error}</div>
                  <div className="mt-1 text-[#888888] text-xs">└─ Check details and retry ─┘</div>
                </div>
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

/**
 * Main Login Page with Suspense wrapper
 */
export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="bg-[#1a1a1a] border border-[#00ff00] rounded-lg p-8 text-center">
          <div className="text-[#00ff00] font-mono">
            <div className="mb-2">┌─ ACCESS TERMINAL ─┐</div>
            <div className="text-sm">🔄 LOADING LOGIN INTERFACE...</div>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
