import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Create a Supabase client configured to use the request/response
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
    
    // Session is handled automatically by the middleware client
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
