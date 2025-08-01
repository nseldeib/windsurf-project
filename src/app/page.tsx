import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-screen w-full bg-[#0a0a0a] grid grid-cols-2">
      {/* Left side - Hero */}
      <div className="flex items-center justify-center p-16">
        <div className="text-left">
          <h1 className="text-6xl font-bold text-[#ededed] font-mono mb-6 leading-tight">
            ┌─ WINDSURF<br/>
            &nbsp;&nbsp;&nbsp;PROJECT ─┐
          </h1>
          <p className="text-[#00ff00] font-mono text-2xl mb-4">$ system --init</p>
          <div className="text-[#cccccc] font-mono text-lg">
            <div className="mb-2">Terminal Kanban Board</div>
            <div className="text-[#888888]">Ready for deployment...</div>
          </div>
          <div className="mt-8 text-[#00ff00] font-mono">
            <span className="text-[#00ff00]">$</span> <span className="text-[#888888]">Choose your path...</span>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth */}
      <div className="flex items-center justify-center p-16 bg-[#111111]">
        <div className="w-full max-w-md">
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
                className="block w-full py-4 px-6 bg-[#00ff00] text-[#0a0a0a] font-mono font-bold text-center rounded hover:bg-[#00cc00] transition-all transform hover:scale-105"
              >
                [LOGIN]
              </Link>
              
              <Link
                href="/auth/signup"
                className="block w-full py-4 px-6 bg-transparent border-2 border-[#ffff00] text-[#ffff00] font-mono font-bold text-center rounded hover:bg-[#ffff00] hover:text-[#0a0a0a] transition-all"
              >
                [SIGN UP]
              </Link>
            </div>
            
            <div className="mt-8 text-center">
              <div className="text-[#00ff00] font-mono text-sm">
                <span className="text-[#00ff00]">$</span> <span className="text-[#888888]">Ready for input...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
