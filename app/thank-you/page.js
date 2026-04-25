import Link from 'next/link'

export default function ThankYou() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center border border-green-400/30 rounded-2xl p-8">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold mb-4 text-green-400">Payment Successful</h1>
        <p className="text-xl text-gray-300 mb-6">
          Your Fortune Brownies Business Kit is on the way.
        </p>
        <div className="bg-gray-900 rounded-lg p-6 mb-8 text-left">
          <h2 className="font-bold text-yellow-400 mb-3">Next steps:</h2>
          <ul className="space-y-2 text-gray-300">
            <li>1. Check your email for download link</li>
            <li>2. Join the MullaBase WhatsApp group</li>
            <li>3. Start with the "First $100" guide</li>
          </ul>
        </div>
        <Link 
          href="/"
          className="inline-block bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-3 font-bold rounded-lg"
        >
          Back to MullaBase
        </Link>
        <p className="text-gray-600 mt-6 text-xs">
          Order ID: check your email • Support: makhauhelo@mullabase.com
        </p>
      </div>
    </div>
  )
  }
