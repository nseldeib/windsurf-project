import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center laptop-full-width">
      <div className="w-full max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 lg:px-8 py-8 laptop-centered">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#ededed] font-mono mb-6">
            ┌─ WINDSURF PROJECT ─┐
          </h1>
          <p className="text-[#00ff00] font-mono text-lg md:text-xl mb-4">$ system --init</p>
          <div className="text-[#cccccc] font-mono text-sm md:text-base">
            <div>Terminal Kanban Board</div>
            <div className="text-[#888888]">Ready for deployment...</div>
          </div>
        </div>
        
        <div className="max-w-md lg:max-w-lg xl:max-w-xl mx-auto bg-[#1a1a1a] p-8 lg:p-10 rounded-lg border border-[#00ff00] shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold text-[#ededed] font-mono mb-2">
              ACCESS TERMINAL
            </h2>
            <p className="text-[#00ff00] font-mono text-sm">$ auth --required</p>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/auth/login"
              className="block w-full py-4 px-6 bg-[#00ff00] text-[#0a0a0a] font-mono font-bold text-center rounded hover:bg-[#00cc00] focus:outline-none focus:ring-2 focus:ring-[#00ff00] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] transition-all duration-200"
            >
              [LOGIN]
            </Link>
            
            <Link
              href="/auth/signup"
              className="block w-full py-4 px-6 bg-transparent border-2 border-[#ffff00] text-[#ffff00] font-mono font-bold text-center rounded hover:bg-[#ffff00] hover:text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#ffff00] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] transition-all duration-200"
            >
              [SIGN UP]
            </Link>
          </div>
          
          <div className="mt-8 text-center">
            <div className="text-[#00ff00] font-mono text-xs">
              <span className="text-[#00ff00]">$</span> <span className="text-[#888888]">Ready for input...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
