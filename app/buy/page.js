'use client'
import Script from 'next/script'

export default function BuyPage() {
  const handleCheckout = () => {
    window.Paddle.Checkout.open({
      items: [{ 
        priceId: 'pri_01kq101fq3xgw5bh6nbmq4t4kc', 
        quantity: 1 
      }],
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        successUrl: 'https://mulla-base-ls.vercel.app/thank-you'
      }
    });
  }

  return (
    <>
      <Script 
        src="https://cdn.paddle.com/paddle/v2/paddle.js" 
        strategy="lazyOnload"
        onLoad={() => {
          Paddle.Environment.set('sandbox');
          Paddle.Initialize({ 
            token: 'test_ea6d938b9d58e244aeeadd95041' 
          });
        }} 
      />
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center border border-yellow-400/30 rounded-2xl p-8">
          <h1 className="text-4xl font-bold mb-4">Fortune Brownies Business Kit</h1>
          <p className="text-xl text-gray-300 mb-2">Turn $5 into $500+</p>
          <p className="text-5xl font-bold text-yellow-400 mb-8">$5.00</p>
          <button 
            onClick={handleCheckout}
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black px-8 py-4 text-xl font-bold rounded-lg shadow-lg transition"
          >
            Buy Instant Access
          </button>
          <p className="text-gray-500 mt-4 text-sm">Secure checkout by Paddle • Instant email delivery</p>
        </div>
      </div>
    </>
  )
}
