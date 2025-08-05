# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (uses Turbopack for faster builds)
- **Build**: `npm run build`
- **Production server**: `npm start`
- **Linting**: `npm run lint`
- **Testing**: Tests use both Node.js built-in test runner (for layout tests) and Vitest (for utility tests)
  - Run specific tests: `node test/dashboardLayout.test.js` or `npx vitest src/lib/utils.test.ts`

## Architecture Overview

This is **Hack Board** - a Next.js 15 terminal-themed kanban board application using the App Router with Supabase for authentication and data management.

### Tech Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Authentication**: Supabase with SSR support
- **Styling**: Tailwind CSS with custom utility functions
- **UI Components**: Radix UI primitives with custom variants using class-variance-authority
- **TypeScript**: Strict mode enabled with path aliases (`@/*` → `./src/*`)

### Key Architecture Patterns

**Authentication & Middleware**:
- Route protection implemented in `src/middleware.ts` with automatic redirects
- Supabase client configuration split between browser (`src/lib/supabase.ts`) and server contexts
- Rate limiting built into middleware (5 requests per hour)

**UI Component System**:
- Shadcn/ui-style components in `src/components/ui/` using class-variance-authority for variants
- Consistent styling with `cn()` utility function (`src/lib/utils.ts`) for class merging
- Toast notifications integrated globally via ToastProvider in root layout

**Layout Strategy**:
- Responsive design prioritizing laptop screen viewing
- Container-based centering with max-width constraints
- Dashboard uses responsive grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### File Organization
- `src/app/` - Next.js App Router pages and layouts
- `src/components/ui/` - Reusable UI components with variant support
- `src/lib/` - Utility functions and external service configurations
- `supabase/migrations/` - Database schema and seed data
- `test/` - Mixed testing approach (Node.js test runner + Vitest)

### Environment Setup
Required environment variables:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Development Notes
- Uses Geist font family (Sans and Mono variants)
- Middleware handles both authentication and rate limiting
- Components follow forwarded ref patterns with proper TypeScript typing
- Testing includes both layout validation and utility function testing