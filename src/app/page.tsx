import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-[#ededed] font-mono mb-4">
            ┌─ WINDSURF PROJECT ─┐
          </h1>
          <p className="text-[#00ff00] font-mono text-lg mb-2">$ system --init</p>
          <div className="text-[#cccccc] font-mono text-sm">
            <div>Terminal Kanban Board</div>
            <div className="text-[#888888]">Ready for deployment...</div>
          </div>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#00ff00] shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-[#ededed] font-mono mb-2">
              ACCESS TERMINAL
            </h2>
            <p className="text-[#00ff00] font-mono text-sm">$ auth --required</p>
          </div>
          
          <div className="space-y-3">
            <Link
              href="/auth/login"
              className="block w-full py-3 px-6 bg-[#00ff00] text-[#0a0a0a] font-mono font-bold text-center rounded hover:bg-[#00cc00] transition-colors"
            >
              [LOGIN]
            </Link>
            
            <Link
              href="/auth/signup"
              className="block w-full py-3 px-6 bg-transparent border-2 border-[#ffff00] text-[#ffff00] font-mono font-bold text-center rounded hover:bg-[#ffff00] hover:text-[#0a0a0a] transition-colors"
            >
              [SIGN UP]
            </Link>
          </div>
          
          <div className="mt-6 text-center">
            <div className="text-[#00ff00] font-mono text-xs">
              <span className="text-[#00ff00]">$</span> <span className="text-[#888888]">Ready for input...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
