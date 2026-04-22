import Link from 'next/link'

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

        {/* BUTTON GRID */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Link href="/join" className="bg-orange-100 text-orange-800 p-4 rounded-xl text-center font-semibold hover:bg-orange-200">
            Claim 20 Free Points
          </Link>
          <Link href="/store" className="bg-orange-100 text-orange-800 p-4 rounded-xl text-center font-semibold hover:bg-orange-200">
            Shop Digital Products
          </Link>
          <Link href="/sell" className="bg-orange-100 text-orange-800 p-4 rounded-xl text-center font-semibold hover:bg-orange-200">
            Start Selling - 0 Fees
          </Link>
          <Link href="/airtime" className="bg-orange-100 text-orange-800 p-4 rounded-xl text-center font-semibold hover:bg-orange-200">
            Buy Airtime
          </Link>
          <Link href="/sim" className="bg-orange-100 text-orange-800 p-4 rounded-xl text-center font-semibold hover:bg-orange-200">
            Register SIM
          </Link>
          <Link href="/templates" className="bg-orange-100 text-orange-800 p-4 rounded-xl text-center font-semibold hover:bg-orange-200">
            Download Templates
          </Link>
        </div>

        {/* VALUE PROP */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 mb-8">
          <h3 className="font-bold text-orange-900 text-lg mb-3">Earn on MullaBase:</h3>
          <ul className="space-y-2 text-orange-800 text-sm">
            <li>• List free → Keep 100%</li>
            <li>• Refer friends → 10 points each</li>
            <li>• 100 points = M10/R10/P10</li>
            <li>• Cash out to Mobile Money or Airtime</li>
          </ul>
        </div>

        {/* CTA BUTTON */}
        <Link 
          href="/store" 
          className="block w-full bg-orange-600 text-white text-center py-4 rounded-xl font-bold text-lg hover:bg-orange-700 mb-8"
        >
          Browse Products →
        </Link>

      </div>

      {/* FOOTER - Full width but text centered */}
      <footer>
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
