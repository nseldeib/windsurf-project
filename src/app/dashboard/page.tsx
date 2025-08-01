'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!_event) {
        router.push('/auth/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth/login');
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-[#1a1a1a] overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 border-b border-[#3a3a3a]">
            <h1 className="text-2xl font-bold mb-4 text-[#ededed]">Welcome to your Dashboard</h1>
            <div className="mb-4">
              <p className="text-[#ededed]">
                You are logged in as: {session.user.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-[#ff0000] hover:bg-[#cc0000] text-[#ededed] font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
