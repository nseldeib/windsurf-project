'use client';

// Import necessary hooks and utilities
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Signup Page Component
 * 
 * Terminal-themed registration interface for Hack Board
 * Handles user registration with Supabase and comprehensive form validation
 */
export default function SignupPage() {
  // Navigation and form state
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle signup form submission
   * Validates form data and creates new user account with Supabase
   */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Enhanced form validation with terminal-style messages
      if (!email || !password) {
        throw new Error('⚠️ REGISTRATION REQUIRED: Both email and password fields must be completed');
      }

      if (password.length < 8) {
        throw new Error('🔒 SECURITY PROTOCOL: Password must contain at least 8 characters for system access');
      }

      // Email format validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new Error('📧 FORMAT ERROR: Please enter a valid email address (example: user@domain.com)');
      }

      // Password strength validation
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
        throw new Error('🔑 SECURITY ENHANCEMENT: Password should contain uppercase, lowercase, and numbers for better protection');
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      // Success - redirect to login with message
      router.push('/auth/login?message=check-email');
    } catch (error) {
      // Enhanced error handling with user-friendly messages
      let errorMessage = 'SYSTEM ERROR: Unable to process registration request';
      
      if (error instanceof Error) {
        const msg = error.message.toLowerCase();
        
        // Map Supabase errors to human-readable messages
        if (msg.includes('already') && msg.includes('registered')) {
          errorMessage = '👤 ACCOUNT EXISTS: This email is already registered. Try logging in or use password recovery.';
        } else if (msg.includes('weak') || msg.includes('password')) {
          errorMessage = '🔒 WEAK PASSWORD: Please create a stronger password with letters, numbers, and symbols.';
        } else if (msg.includes('invalid') && msg.includes('email')) {
          errorMessage = '📧 INVALID EMAIL: Please enter a valid email address that can receive confirmation messages.';
        } else if (msg.includes('rate') || msg.includes('limit') || msg.includes('too many')) {
          errorMessage = '⏰ RATE LIMIT: Too many registration attempts. Please wait a few minutes before trying again.';
        } else if (msg.includes('network') || msg.includes('fetch') || msg.includes('connection')) {
          errorMessage = '🌐 CONNECTION ERROR: Unable to reach registration server. Please check your internet connection.';
        } else if (error.message.includes('⚠️') || error.message.includes('🔒') || error.message.includes('📧') || error.message.includes('🔑')) {
          // Keep our custom validation messages as-is
          errorMessage = error.message;
        } else if (error.message) {
          errorMessage = `💻 SYSTEM MESSAGE: ${error.message}`;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex justify-center items-center">
      <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 py-12">
        {/* Signup Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#ffff00] shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-[#ededed] font-mono mb-2">
                ACCESS TERMINAL
              </h2>
              <p className="text-[#ffff00] font-mono text-sm">$ auth --register</p>
            </div>
            
          <form className="space-y-4" onSubmit={handleSignup}>
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
                className="w-full px-3 py-3 bg-[#2a2a2a] border border-[#ffff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#ffff00]"
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
                className="w-full px-3 py-3 bg-[#2a2a2a] border border-[#ffff00] text-[#ededed] placeholder-[#9a9a9a] rounded font-mono focus:outline-none focus:ring-2 focus:ring-[#ffff00]"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-[#ffff00] text-[#0a0a0a] font-mono font-bold rounded hover:bg-[#cccc00] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? 'INITIALIZING...' : '[CREATE ACCOUNT]'}
            </button>
          </form>
          
          <div className="text-center mt-6">
            <a href="/auth/login" className="text-[#ffff00] hover:text-[#ffffff] font-mono">
              &gt; Already have an account? Login
            </a>
          </div>
          
          <div className="mt-8 text-center">
            <div className="text-[#ffff00] font-mono">
              <span className="text-[#ffff00]">$</span> <span className="text-[#888888]">Ready for input...</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
