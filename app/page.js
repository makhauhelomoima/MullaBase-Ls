import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF8F0]">
      <div className="max-w-md mx-auto px-4 py-6 text-center">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black text-orange-700">MullaBase</h1>
          <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
            Born in Lesotho. Open to Africa
          </div>
        </div>

        {/* Hero */}
        <h2 className="text-4xl font-black text-orange-900 mb-2">MullaBase</h2>
        <p className="text-orange-700 text-sm">Instant Marketplace | Spend & Earn</p>
        <p className="text-orange-700 text-sm font-bold mt-1">Join & get M10 FREE!</p>

        {/* Button Grid - OG Colors */}
        <div className="grid grid-cols-2 gap-3 mt-6">
          <Link href="/join" className="bg-orange-500 text-white p-4 rounded-xl font-bold text-sm shadow-md">
            Join & get M10 FREE! 🎁
          </Link>
          <Link href="/masterclass" className="bg-orange-500 text-white p-4 rounded-xl font-bold text-sm shadow-md">
            MASTERCLASS ACCOMMODATION<br/>~ Book Now
          </Link>
          
          <Link href="/store" className="bg-red-600 text-white p-4 rounded-xl font-bold text-sm shadow-md">
            MULLABASE STORE<br/>~ Shop Now
          </Link>
          <Link href="/store?cat=templates" className="bg-orange-500 text-white p-4 rounded-xl font-bold text-sm shadow-md">
            Templates
          </Link>
          
          <Link href="/admin" className="bg-orange-500 text-white p-4 rounded-xl font-bold text-sm shadow-md">
            Backend
          </Link>
          <Link href="/store?cat=airtime" className="bg-gray-900 text-white p-4 rounded-xl font-bold text-sm shadow-md">
            Airtime
          </Link>
          
          <Link href="/sim" className="bg-green-600 text-white p-4 rounded-xl font-bold text-sm shadow-md">
            SIM Registration
          </Link>
          <Link href="/sell" className="bg-gray-900 text-white p-4 rounded-xl font-bold text-sm shadow-md col-span-2">
            Sell - Open Your Shop
          </Link>
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-orange-700 text-xs space-y-1">
          <p>Sell on MullaBase & earn | Share = M1 per friend</p>
          <p>100 points = M10/R10/P10 | Withdraw to cash or airtime</p>
        </div>

        {/* Big CTA Button */}
        <Link href="/store">
          <button className="mt-6 w-full bg-orange-500 text-white py-4 rounded-xl font-black text-lg shadow-lg">
            Enter MullaBase Store →
          </button>
        </Link>

        {/* M20 Seller Note */}
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-3 rounded-r-xl text-left">
          <p className="font-black text-blue-900 text-sm">FOR SELLERS</p>
          <p className="text-blue-800 text-xs mt-1">
            Pay <span className="font-bold">M20 to advertise</span> → Keep <span className="font-bold">100% of sales</span> → No commission
          </p>
        </div>

        <footer className="text-center py-6 mt-8">
          <p className="font-bold text-orange-900 text-sm">Lesotho's Pride. Africa's Treasure!</p>
          <p className="text-xs text-orange-600 mt-1">© 2026 MullaBase</p>
        </footer>

      </div>
    </main>
  )
          }
