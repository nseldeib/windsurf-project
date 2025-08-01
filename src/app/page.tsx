import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-[#1a1a1a] p-8 rounded-lg border border-[#3a3a3a]">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#ededed]">
            Welcome to Windsurf Project
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div>
            <Link
              href="/auth/login"
              className="group relative w-full flex justify-center py-2 px-4 border border-[#3a3a3a] text-sm font-medium rounded-md text-[#ededed] bg-[#2a2a2a] hover:bg-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6a6a6a]"
            >
              Login
            </Link>
          </div>
          <div>
            <Link
              href="/auth/signup"
              className="group relative w-full flex justify-center py-2 px-4 border border-[#3a3a3a] text-sm font-medium rounded-md text-[#ededed] bg-[#2a2a2a] hover:bg-[#3a3a3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6a6a6a]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
