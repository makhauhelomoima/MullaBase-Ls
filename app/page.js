export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Centered container - max 480px for mobile feel */}
      <div className="max-w-md mx-auto px-4">
        
        {/* HEADER - Sign in top right */}
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-orange-700">MullaBase</h1>
          <Link 
            href="/join" 
            className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-orange-700"
          >
            Sign In / Join
          </Link>
        </div>

        {/* HERO */}
        <div className="text-center mt-4 mb-8">
          <h2 className="text-4xl font-bold text-orange-900">MullaBase</h2>
          <p className="text-orange-700 mt-2 text-lg">
            Instant Spend & Earn Marketplace
          </p>
          <p className="text-orange-600 font-semibold mt-1">
            Claim 20 points FREE → Spend now
          </p>
        </div>

        {/* YOUR BUTTON GRID - stays centered automatically */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {/* ... all your Link buttons here ... */}
        </div>

        {/* VALUE PROP - already centered */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 mb-8">
          {/* ... your Earn on MullaBase section ... */}
        </div>

        {/* CTA BUTTON */}
        <Link 
          href="/store" 
          className="block w-full bg-orange-600 text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-orange-700"
        >
          Browse Products →
        </Link>

      </div>

      {/* FOOTER - Full width but text centered */}
      <footer className="mt-12">
        <div className="bg-orange-50 border-t border-orange-200 py-4 text-center">
          <p className="text-orange-800 font-semibold text-sm">
            Lesotho's Pride. Africa's Treasure!
          </p>
          <p className="text-orange-600 text-xs mt-1">
            © 2026 MullaBase | Built for Africa
          </p>
        </div>
      </footer>
    </main>
  )
              }
