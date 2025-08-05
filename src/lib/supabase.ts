/**
 * Supabase Client Configuration
 * 
 * Browser client setup for Hack Board authentication and data management
 * Uses environment variables with fallback placeholders for development
 */

import { createBrowserClient } from '@supabase/ssr'

// Supabase configuration with development fallbacks
// These placeholders allow the app to run without throwing errors during development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder.key'

/**
 * Supabase browser client instance
 * 
 * Configured for client-side operations including:
 * - User authentication (login/logout/signup)
 * - Real-time subscriptions 
 * - Database operations from the browser
 */
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
