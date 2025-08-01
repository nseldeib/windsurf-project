import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-[#ededed] font-mono mb-6">
            ┌─ WINDSURF PROJECT ─┐
          </h1>
          <p className="text-[#00ff00] font-mono text-xl md:text-2xl mb-4">$ system --init</p>
          <div className="text-[#cccccc] font-mono text-lg">
            <div className="mb-2">Terminal Kanban Board</div>
            <div className="text-[#888888]">Ready for deployment...</div>
          </div>
        </div>
        
        {/* Auth Section */}
        <div className="max-w-lg mx-auto">
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#00ff00] shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-[#ededed] font-mono mb-2">
                ACCESS TERMINAL
              </h2>
              <p className="text-[#00ff00] font-mono">$ auth --required</p>
            </div>
            
            <div className="space-y-4">
              <Link
                href="/auth/login"
                className="block w-full py-4 px-8 bg-[#00ff00] text-[#0a0a0a] font-mono font-bold text-center rounded hover:bg-[#00cc00] transition-all text-lg"
              >
                [LOGIN]
              </Link>
              
              <Link
                href="/auth/signup"
                className="block w-full py-4 px-8 bg-transparent border-2 border-[#ffff00] text-[#ffff00] font-mono font-bold text-center rounded hover:bg-[#ffff00] hover:text-[#0a0a0a] transition-all text-lg"
              >
                [SIGN UP]
              </Link>
            </div>
            
            <div className="mt-8 text-center">
              <div className="text-[#00ff00] font-mono">
                <span className="text-[#00ff00]">$</span> <span className="text-[#888888]">Ready for input...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
