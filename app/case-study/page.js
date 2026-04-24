import Link from 'next/link'

export const metadata = {
  title: 'Case Study: 7 Days From Maseru to Global - MullaBase',
  description: 'How I launched MullaBase from my phone in 7 days. Zero to global payments. No laptop. No team.',
}

export default function CaseStudyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        
        <Link href="/boss-journey" className="text-amber-500 text-sm font-bold hover:underline mb-8 inline-block">
          ← Back to Boss Journey
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-bold text-amber-500">MINI CASE STUDY</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
            How I Launched MullaBase from My Phone in Maseru in 7 Days
          </h1>
          <p className="text-zinc-400 text-lg">
            18th - 24th April 2026 | Zero to Global Payments | No laptop. No team.
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-2xl font-black text-amber-500">THE UP</h2>
          <p>18 April 2026. I had an idea, a phone in Maseru, and M0 for a laptop. No coding background. No team. Just WiFi and WhatsApp.</p>

          <h2 className="text-2xl font-black text-amber-500 mt-12">THE DOWNS</h2>
          <ul className="space-y-3">
            <li><strong>Day 1:</strong> GitHub scared me. "Repository" sounded like surgery.</li>
            <li><strong>Day 2:</strong> Vercel kept saying "Build Failed". I thought I broke the internet.</li>
            <li><strong>Day 3:</strong> Paddle rejected my first app. Reason: "Unclear product". I almost quit.</li>
            <li><strong>Day 4:</strong> My page looked like a 1999 Nokia text file. No CSS. My cousin laughed.</li>
            <li><strong>Day 5:</strong> Users said "Lesotho? Is this real?" Scam trauma is real here.</li>
            <li><strong>Day 6:</strong> I had 6 real PDFs but wrote "47-page blueprint" in my copy. Felt like a liar. Deleted it.</li>
          </ul>

          <h2 className="text-2xl font-black text-amber-500 mt-12">THE WIN</h2>
          <p>24 April 2026. <code>mullabase-ls.vercel.app/boss-journey</code> is LIVE. Black + gold design. Paddle checkout takes USD from 200+ countries. Real assets: AI 101, 24 Passive Income Streams, Red Velvet Money Cake Tutorial. All mine. All instant download.</p>

          <h2 className="text-2xl font-black text-amber-500 mt-12">THE PROOF</h2>
          <p>I built this between loadshedding, on WhatsApp, using only my phone in Maseru. If I can do it from here, you can do it from anywhere.</p>

          <h2 className="text-2xl font-black text-amber-500 mt-12">THE LESSON</h2>
          <p>The Ark isn't a "secret system". The Ark is:</p>
          <ol className="space-y-2">
            <li><strong>Ship ugly, fix live</strong> - My Day 4 site was trash. I fixed it Day 7.</li>
            <li><strong>Sell what exists</strong> - Your "MullaBase Blueprint V1" beats a fake "47-page PDF".</li>
            <li><strong>Trust > Hype</strong> - Lesotho knows push-push. We show M-Pesa screenshots, not Lambos.</li>
          </ol>

          <div className="bg-zinc-900 border border-amber-500/30 rounded-2xl p-8 my-12">
            <h3 className="text-2xl font-black mb-4">Your 7-Day Journey Map</h3>
            <div className="space-y-4 text-base">
              <p><strong>Day 1: Setup</strong> - GitHub + Vercel + Paddle accounts</p>
              <p><strong>Day 2: Content</strong> - Audit your folder. Write 5-page PDF</p>
              <p><strong>Day 3: Funnel</strong> - Google Drive link → Paddle product</p>
              <p><strong>Day 4: Landing</strong> - page.js + globals.css. Black + gold</p>
              <p><strong>Day 5: Email</strong> - Gmail template: "Thanks + Download + WhatsApp"</p>
              <p><strong>Day 6: Launch</strong> - WhatsApp Status + FB Groups. No "buy now" energy</p>
              <p><strong>Day 7: First Lead</strong> - Screenshot sale. Post proof. Blur name</p>
            </div>
          </div>

          <p className="text-xl font-bold">Today you get the exact 7-day map I used. No theory. My screen recordings.</p>
        </div>

        <div className="mt-16 text-center bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
          <h3 className="text-2xl font-black mb-4">Get The Full Playbook</h3>
          <p className="text-zinc-400 mb-6">All 6 PDFs + my 1-on-1 help to launch yours in 7 days</p>
          <Link 
            href="/boss-journey"
            className="inline-block bg-amber-500 text-black font-black px-8 py-4 rounded-xl hover:bg-amber-400 transition-all"
          >
            Get Boss Journey $50/$100 →
          </Link>
          <p className="text-zinc-600 text-sm mt-4">Instant download. 30-day guarantee.</p>
        </div>

      </div>
    </main>
  )
    }
