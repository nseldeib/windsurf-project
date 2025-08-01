import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/ssr';
import { createBrowserClient } from '@supabase/ssr';

// Create a Supabase client instance
const supabase = createClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
});

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Get session from Supabase client
  const { data: { session } } = await supabase.auth.getSession();
  
  // Add rate limiting
  const rateLimit = request.cookies.get('rateLimit')?.value || '0';
  const currentRate = parseInt(rateLimit);
  
  if (currentRate >= 5) {
    return new NextResponse('Too many requests', { status: 429 });
  }
  
  // Check if the user is trying to access a protected route
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    // Add session refresh
    const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();
    if (refreshedSession) {
      await supabase.auth.setSession(refreshedSession);
    }
  }
  
  // Update rate limit cookie
  response.cookies.set('rateLimit', (currentRate + 1).toString(), {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 3600, // 1 hour
  });
  
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/dashboard'],
};
