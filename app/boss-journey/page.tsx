'use client'
import Link from 'next/link'
import { Check, Crown } from 'lucide-react'

export default function BossJourneyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <Crown className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-bold text-amber-500">MULLABASE EXCLUSIVE</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            THE BOSS JOURNEY
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            The complete playbook to launch and monetize in Lesotho. No theory. Real revenue. Real fast.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Starter Tier */}
          <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950/50 backdrop-blur">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Boss Journey Starter</h2>
              <p className="text-zinc-500 mb-6">For solo founders starting from zero</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black">$50</span>
                <span className="text-zinc-500">USD one-time</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              {[
                'Full Boss Journey playbook PDF',
                'Lesotho business registration guide', 
                'Ecocash + M-Pesa payment setups',
                'Lifetime access + all future updates',
                'Private Telegram founder group'
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-zinc-300">{item}</span>
                </div>
              ))}
            </div>

            <Link 
              href="https://mullabase-ls.vercel.app/checkout?price_id=pri_01kpy1ya82a8fm7hny6wpaqjgx"
              className="block w-full bg-white text-black text-center font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all duration-200"
            >
              Get Starter Access
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="border-2 border-amber-500 rounded-3xl p-8 bg-gradient-to-b from-amber-950/30 to-zinc-950/50 backdrop-blur relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-black px-4 py-2 rounded-full">
              MOST POPULAR
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Boss Journey Pro</h2>
              <p className="text-amber-500/80 mb-6">For serious bosses scaling fast</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black">$100</span>
                <span className="text-zinc-500">USD one-time</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              {[
                'Everything in Starter tier',
                '60-min 1-on-1 strategy call with Mulla',
                'Done-for-you legal templates LAA ready',
                'Priority WhatsApp support',
                'All future Boss products included free'
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                  <span className="text-zinc-200">{item}</span>
                </div>
              ))}
            </div>

            <Link 
              href="https://mullabase-ls.vercel.app/checkout?price_id=pri_01kpy23kqap4g833fhzxvxf2fn"
              className="block w-full bg-amber-500 text-black text-center font-bold py-4 rounded-xl hover:bg-amber-400 transition-all duration-200 shadow-lg shadow-amber-500/20"
            >
              Get Pro Access
            </Link>
          </div>

        </div>

        {/* Trust Footer */}
        <div className="text-center mt-20">
          <p className="text-zinc-600 text-sm mb-2">
            Secure checkout powered by Paddle • Instant access after payment
          </p>
          <p className="text-zinc-700 text-xs">
            MullaBase. Lesotho's Pride. Africa's Treasure!
          </p>
        </div>
        
      </div>
    </main>
  )
        }
