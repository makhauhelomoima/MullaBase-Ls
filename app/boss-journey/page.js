'use client'
import Link from 'next/link'

export default function BossJourneyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-12 md:py-20">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-bold text-amber-500">👑 MULLABASE GLOBAL</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            THE BOSS JOURNEY
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
            The complete playbook to launch and monetize online. Built in Maseru. Sold worldwide. No theory. Real revenue. Real fast.
          </p>
        </div>

        <section className="py-16 bg-zinc-950 rounded-3xl mb-16 border border-zinc-800">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-4">
                <span className="text-sm font-bold text-amber-500">REAL BUILD STORY</span>
              </div>
              <h2 className="text-4xl font-black mb-4">From Maseru Phone to Global Checkout in 7 Days</h2>
              <p className="text-zinc-400">18th - 24th April 2026 | No laptop. No team. Just WhatsApp.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-black text-amber-500 mb-3">THE UP</h3>
                <p className="text-zinc-300 text-sm">18 April 2026. Phone in Maseru, M0 for laptop. No coding background. Just WiFi + WhatsApp.</p>
              </div>
              <div>
                <h3 className="text-xl font-black text-red-500 mb-3">THE DOWNS</h3>
                <p className="text-zinc-300 text-sm">Day 2: Build Failed. Day 3: Paddle rejected me. Day 6: Almost lied about "47-page PDF". Deleted it.</p>
              </div>
              <div>
                <h3 className="text-xl font-black text-green-500 mb-3">THE WIN</h3>
                <p className="text-zinc-300 text-sm">24 April: Live site. Black + gold. Paddle takes USD. 6 real PDFs. All mine. Instant download.</p>
              </div>
            </div>

            <div className="text-center">
              <Link 
                href="/case-study"
                className="text-amber-500 font-bold hover:underline"
              >
                Read Full 7-Day Breakdown + My Exact Errors →
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-zinc-950 rounded-3xl mb-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-black mb-4">Your 7-Day Journey</h2>
            <p className="text-zinc-400 mb-12">From zero to your first lead in just one week</p>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-8">
              {[
                {day: 1, name: 'Setup', desc: 'Create your accounts'},
                {day: 2, name: 'Content', desc: 'Build your guide'},
                {day: 3, name: 'Funnel', desc: 'Set up automation'},
                {day: 4, name: 'Landing', desc: 'Create your page'},
                {day: 5, name: 'Email', desc: 'Automate sequences'},
                {day: 6, name: 'Launch', desc: 'Go live!'},
                {day: 7, name: 'First Lead', desc: 'Celebrate!'}
              ].map((item) => (
                <div key={item.day} className="text-center">
                  <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-2 font-black text-black">
                    {item.day}
                  </div>
                  <p className="font-bold text-sm">{item.name}</p>
                  <p className="text-xs text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-300">I did this 18-24 April 2026 from my phone in Maseru. You can too.</p>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <div className="border border-zinc-800 rounded-3xl p-8 bg-zinc-950/50">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">MullaBase Starter Vault</h2>
              <p className="text-zinc-500 mb-6">Launch your first digital income stream in 7 days</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black">$50</span>
                <span className="text-zinc-500">USD one-time</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              {[
                'AI 101 - Understand AI before everyone else does',
                'AI TOOLS: Cheat Sheet For Beginners - My exact toolkit',
                '5+ Passive Income Ideas for Financial Relief - Built for Lesotho',
                '24 Passive Income Streams - Pick 1 tonight. Tools + steps included',
                'MullaBase Blueprint V1 - My unfiltered notes from building this site',
                'Red Velvet Money Cake Tutorial - Turn M300 into M750',
                '30-day money-back guarantee'
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-green-500 mt-0.5">✓</span>
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

          <div className="border-2 border-amber-500 rounded-3xl p-8 bg-gradient-to-b from-amber-950/30 to-zinc-950/50 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-black text-xs font-black px-4 py-2 rounded-full">
              MOST POPULAR
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">MullaBase Ark - Builder Edition</h2>
              <p className="text-amber-500/80 mb-6">Launch + scale to $5k/month with done-for-you assets</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-black">$100</span>
                <span className="text-zinc-500">USD one-time</span>
              </div>
            </div>
            
            <div className="space-y-4 mb-8">
              {[
                'Everything in Starter Vault - All 6 PDFs above',
                '60-Min 1-on-1 Strategy Call with Mulla - We pick your stream + map 7 days',
                'Personal Review: Send me your first product draft, I record video feedback',
                'Private WhatsApp - Ark Builders: Only buyers. No lurkers. Real wins',
                'MullaBase Blueprint - All Future Updates: Watch me build live',
                '30-day money-back guarantee'
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="text-amber-500 mt-0.5">✓</span>
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

        <div className="mt-20 p-8 bg-zinc-900 rounded-3xl border border-zinc-800">
          <h3 className="text-2xl font-black mb-4 text-center">Trust Box</h3>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="text-center">
              <p className="text-green-500 font-bold mb-2">✅ What you get TODAY</p>
              <p className="text-zinc-400">6 PDFs + 1 Tutorial delivered instantly to email</p>
            </div>
            <div className="text-center">
              <p className="text-red-500 font-bold mb-2">❌ What you DON'T get</p>
              <p className="text-zinc-400">Guaranteed riches, MLM recruiting, fake screenshots</p>
            </div>
            <div className="text-center">
              <p className="text-amber-500 font-bold mb-2">📧 Questions?</p>
              <p className="text-zinc-400">WhatsApp: +26657031600. I reply personally.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-20">
          <p className="text-zinc-600 text-sm mb-2">
            Secure global checkout powered by Paddle • Instant access after payment
          </p>
          <p className="text-zinc-700 text-xs">
            MullaBase. Lesotho's Pride. The World's Treasure!
          </p>
        </div
