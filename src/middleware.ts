import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

/**
 * Middleware for Hack Board authentication and rate limiting
 * Handles session verification and protects dashboard routes
 */
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return new NextResponse(
        JSON.stringify({ 
          error: 'CONFIGURATION ERROR: Authentication service unavailable. Please contact system administrator.' 
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create a Supabase client configured to use the request/response
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      }
    );
    
    // Get session from Supabase client with timeout handling
    const { data: { session }, error: sessionError } = await Promise.race([
      supabase.auth.getSession(),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Session check timeout')), 5000)
      ) as Promise<never>
    ]);
    
    if (sessionError) {
      console.error('Session verification failed:', sessionError);
      // Allow through but redirect to login if accessing protected route
    }
  
  // Add rate limiting
  const rateLimit = request.cookies.get('rateLimit')?.value || '0';
  const currentRate = parseInt(rateLimit);
  
  if (currentRate >= 5) {
    return new NextResponse(
      JSON.stringify({ 
        error: '⏰ RATE LIMIT EXCEEDED: Too many requests from your location. Please wait before trying again.',
        retryAfter: '1 hour',
        message: 'System protection activated. Access temporarily restricted.'
      }),
      { 
        status: 429, 
        headers: { 
          'Content-Type': 'application/json',
          'Retry-After': '3600'
        } 
      }
    );
  }
  
  // Check if the user is trying to access a protected route
  const { pathname } = request.nextUrl;
  
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    // Session is handled automatically by the middleware client
  }
  
  // Update rate limit cookie
  response.cookies.set('rateLimit', (currentRate + 1).toString(), {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 3600, // 1 hour
  });
  
    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    
    // For protected dashboard routes, redirect to login on any error
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.redirect(new URL('/auth/login?error=session-expired', request.url));
    }
    
    // For other routes, allow through with warning
    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/dashboard'],
};
