import Link from 'next/link'

export const metadata = {
  title: 'MullaBase Store - Digital Assets Built in Maseru',
  description: 'Instant download. AI guides, passive income playbooks, money cake tutorial. Built in Lesotho, sold worldwide.',
}

const products = [
  {
    id: 1,
    name: 'AI 101 - Understand AI Before Everyone Else',
    desc: 'The plain-English guide to what AI actually is. No hype. Just clarity for beginners in Lesotho.',
    price: 15,
    paddle_link: 'https://mullabase-ls.vercel.app/checkout?price_id=YOUR_AI101_PRICE_ID',
    pages: '12 pages',
    badge: 'STARTER'
  },
  {
    id: 2,
    name: 'AI TOOLS: Cheat Sheet For Beginners',
    desc: 'My exact toolkit. ChatGPT prompts, free image generators, voice tools. All tested on phone.',
    price: 20,
    paddle_link: 'https://mullabase-ls.vercel.app/checkout?price_id=YOUR_TOOLS_PRICE_ID',
    pages: '8 pages',
    badge: 'MOST USED'
  },
  {
    id: 3,
    name: '5+ Passive Income Ideas for Financial Relief',
    desc: 'Built specifically for Lesotho. Low data, M-Pesa friendly, zero laptop needed.',
    price: 25,
    paddle_link: 'https://mullabase-ls.vercel.app/checkout?price_id=YOUR_5IDEAS_PRICE_ID',
    pages: '15 pages',
    badge: 'LESOTHO FIRST'
  },
  {
    id: 4,
    name: '24 Passive Income Streams',
    desc: 'Pick 1 tonight. Each stream has tools, steps, and earning timeline. No MLM. No recruiting.',
    price: 35,
    paddle_link: 'https://mullabase-ls.vercel.app/checkout?price_id=YOUR_24STREAMS_PRICE_ID',
    pages: '31 pages',
    badge: 'COMPLETE'
  },
  {
    id: 5,
    name: 'MullaBase Blueprint V1',
    desc: 'My unfiltered notes from building this exact site. Screenshots of errors. How I fixed Paddle.',
    price: 40,
    paddle_link: 'https://mullabase-ls.vercel.app/checkout?price_id=YOUR_BLUEPRINT_PRICE_ID',
    pages: '22 pages',
    badge: 'BEHIND SCENES'
  },
  {
    id: 6,
    name: 'Red Velvet Money Cake Tutorial',
    desc: 'Turn M300 ingredients into M750 sales. Step-by-step photos. Pricing sheet included.',
    price: 30,
    paddle_link: 'https://mullabase-ls.vercel.app/checkout?price_id=YOUR_CAKE_PRICE_ID',
    pages: '18 pages',
    badge: 'REAL MONEY'
  }
]

export default function StorePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        
        <div className="text-center mb-16">
          <Link href="/" className="text-amber-500 text-sm font-bold hover:underline mb-6 inline-block">
            ← Back to Home
          </Link>
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-bold text-amber-500">INSTANT DOWNLOAD</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            MULLABASE STORE
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            All assets built in Maseru. Delivered to your email in 60 seconds. No waiting. No manual email.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {products.map((product) => (
            <div key={product.id} className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950/50 hover:border-amber-500/50 transition-all duration-200 flex flex-col">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-amber-500/10 text-amber-500 text-xs font-black px-3 py-1 rounded-full">
                    {product.badge}
                  </span>
                  <span className="text-zinc-500 text-sm">{product.pages}</span>
                </div>
                
                <h3 className="text-xl font-black mb-3 leading-tight">{product.name}</h3>
                <p className="text-zinc-400 text-sm mb-6">{product.desc}</p>
              </div>

              <div className="mt-auto">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-black">${product.price}</span>
                  <span className="text-zinc-500">USD</span>
                </div>
                
                <Link 
                  href={product.paddle_link}
                  className="block w-full bg-white text-black text-center font-bold py-3 rounded-xl hover:bg-zinc-200 transition-all"
                >
                  Get Instant Access
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 border border-amber-500/30 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-black mb-4">Want Everything + My 1-on-1 Help?</h3>
          <p className="text-zinc-400 mb-6">Get all 6 PDFs + 60-min strategy call + private WhatsApp group</p>
          <Link 
            href="/boss-journey"
            className="inline-block bg-amber-500 text-black font-black px-8 py-4 rounded-xl hover:bg-amber-400 transition-all"
          >
            Get Ark Builder Edition - $100 →
          </Link>
          <p className="text-zinc-600 text-sm mt-4">Save $65 vs buying separately</p>
        </div>

        <div className="mt-16 p-8 bg-zinc-900 rounded-3xl border border-zinc-800">
          <h3 className="text-2xl font-black mb-6 text-center">How Delivery Works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-500 font-black">1</span>
              </div>
              <p className="font-bold mb-2">Pay Securely</p>
              <p className="text-zinc-400">Paddle checkout. Cards + PayPal. USD from 200+ countries.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-amber-500 font-black">2</span>
              </div>
              <p className="font-bold mb-2">Get Email Instantly</p>
              <p className="text-zinc-400">Google Drive link sent to your email in under 60 seconds.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-500 font-black">3</span>
              </div>
              <p className="font-bold mb-2">Download & Start</p>
              <p className="text-zinc-400">PDFs work on phone. WhatsApp me if stuck: +26657031600</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-zinc-600 text-sm mb-2">
            30-day money-back guarantee on all products • Built in Maseru
          </p>
          <p className="text-zinc-700 text-xs">
            MullaBase. Lesotho's Pride. The World's Treasure!
          </p>
        </div>
        
      </div>
    </main>
  )
    }
