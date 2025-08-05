import { createBrowserClient } from '@supabase/ssr'

// Use valid placeholder URLs for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder.key'

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey)
