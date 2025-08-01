import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto bg-[#1a1a1a] p-8 rounded-lg border border-[#00ff00] shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#ededed] font-mono mb-2">
            ┌─ WINDSURF PROJECT ─┐
          </h2>
          <p className="text-[#00ff00] font-mono text-sm">$ system --init</p>
          <div className="mt-4 text-[#cccccc] font-mono text-sm">
            <div>Terminal Kanban Board</div>
            <div className="text-[#888888]">Ready for deployment...</div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/auth/login"
            className="block w-full py-3 px-6 bg-[#00ff00] text-[#0a0a0a] font-mono font-bold text-center rounded hover:bg-[#00cc00] focus:outline-none focus:ring-2 focus:ring-[#00ff00] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] transition-colors"
          >
            [LOGIN]
          </Link>
          
          <Link
            href="/auth/signup"
            className="block w-full py-3 px-6 bg-[#ffff00] text-[#0a0a0a] font-mono font-bold text-center rounded hover:bg-[#cccc00] focus:outline-none focus:ring-2 focus:ring-[#ffff00] focus:ring-offset-2 focus:ring-offset-[#1a1a1a] transition-colors"
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
  );
}
