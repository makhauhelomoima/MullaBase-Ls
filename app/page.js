import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-orange-900">MullaBase</h1>
          <Link 
            href="/join" 
            className="bg-orange-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-orange-700 transition"
          >
            Sign In / Join
          </Link>
        </header>

        {/* Hero Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-orange-100">
          <h2 className="text-5xl font-black text-orange-900 leading-tight">
            Instant Spend &<br/>Earn Marketplace
          </h2>
          
          <div className="bg-orange-600 text-white rounded-2xl p-4 mt-6 text-center">
            <p className="text-lg font-semibold">NEW USERS GET</p>
            <p className="text-4xl font-black">M10 FREE</p>
            <p className="text-sm opacity-90">= 100 Points to Spend Instantly</p>
          </div>

          <p className="text-orange-800 mt-6 text-lg">
            Buy airtime, data, templates. Sell products. Refer friends.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <Link href="/join" className="bg-orange-900 text-white text-center py-4 rounded-xl font-bold hover:bg-black transition">
              Claim M10 Free
            </Link>
            <Link href="/store" className="bg-orange-100 text-orange-900 text-center py-4 rounded-xl font-bold hover:bg-orange-200 transition">
              Browse Store
            </Link>
          </div>
        </section>

        {/* Color Tabs - How It Works */}
        <section className="mb-8">
          <h3 className="text-2xl font-black text-orange-900 mb-4">How MullaBase Pays You:</h3>
          
          <div className="space-y-3">
            {/* For Buyers Tab */}
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-xl">
              <p className="font-black text-green-900">FOR BUYERS</p>
              <p className="text-green-800 text-sm mt-1">
                Sign up → <span className="font-bold">Get M10 FREE</span> → Spend on airtime, data, digital products
              </p>
            </div>

            {/* For Sellers Tab */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
              <p className="font-black text-blue-900">FOR SELLERS</p>
              <p className="text-blue-800 text-sm mt-1">
                Pay <span className="font-bold">M20 to advertise</span> → Keep <span className="font-bold">100% of sales</span> → No commission ever
              </p>
            </div>

            {/* For Referrers Tab */}
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-xl">
              <p className="font-black text-purple-900">FOR REFERRERS</p>
              <p className="text-purple-800 text-sm mt-1">
                Invite friends → <span className="font-bold">Earn M1 each</span> = 10 points → Cash out to Mobile Money
              </p>
            </div>
          </div>
        </section>

        {/* Points Value */}
        <section className="bg-orange-100 rounded-2xl p-6 mb-8">
          <p className="text-center text-orange-900 font-bold">
            100 Points = M10 = R10 = P10
          </p>
          <p className="text-center text-orange-700 text-sm mt-1">
            Cash out to Ecocash, M-Pesa, Airtime anytime
          </p>
        </section>

        {/* Quick Links */}
        <section className="grid grid-cols-2 gap-3 mb-8 text-sm">
          <Link href="/join" className="bg-white border border-orange-200 p-3 rounded-xl text-center font-semibold text-orange-900 hover:bg-orange-50">
            Claim 20 Free Points
          </Link>
          <Link href="/store" className="bg-white border border-orange-200 p-3 rounded-xl text-center font-semibold text-orange-900 hover:bg-orange-50">
            Shop Digital Products
          </Link>
          <Link href="/join" className="bg-white border border-orange-200 p-3 rounded-xl text-center font-semibold text-orange-900 hover:bg-orange-50">
            Start Selling - M20
          </Link>
          <Link href="/store" className="bg-white border border-orange-200 p-3 rounded-xl text-center font-semibold text-orange-900 hover:bg-orange-50">
            Buy Airtime
          </Link>
        </section>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-orange-100">
          <p className="font-bold text-orange-900">Lesotho's Pride. Africa's Treasure!</p>
          <p className="text-xs text-orange-600 mt-2">© 2026 MullaBase | Built for Africa</p>
        </footer>

      </div>
    </main>
  )
    }
