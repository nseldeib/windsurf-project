import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex justify-center">
      <div className="w-full max-w-screen-lg px-4 sm:px-6 lg:px-8 py-12 text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#ededed] font-mono mb-4">
            ┌─ HACK BOARD ─┐
          </h1>
          <p className="text-[#00ff00] font-mono text-lg mb-3">$ system --init</p>
          <div className="text-[#cccccc] font-mono text-lg">
            <div className="mb-2">Terminal Task Management</div>
            <div className="text-[#888888]">Ready for deployment...</div>
          </div>
        </div>
        
        {/* Auth Section */}
        <div className="max-w-md mx-auto">
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-[#00ff00] shadow-2xl">
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-[#ededed] font-mono mb-2">
                ACCESS TERMINAL
              </h2>
              <p className="text-[#00ff00] font-mono text-sm">$ auth --required</p>
            </div>
            
            <div className="space-y-4">
              <Link
                href="/auth/login"
                className="block w-full py-3 px-6 bg-[#00ff00] text-[#0a0a0a] font-mono font-bold text-center rounded hover:bg-[#00cc00] transition-all"
              >
                [LOGIN]
              </Link>
              
              <Link
                href="/auth/signup"
                className="block w-full py-3 px-6 bg-transparent border-2 border-[#ffff00] text-[#ffff00] font-mono font-bold text-center rounded hover:bg-[#ffff00] hover:text-[#0a0a0a] transition-all"
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
