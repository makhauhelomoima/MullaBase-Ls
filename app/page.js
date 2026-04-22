'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const handleJoin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setMsg(error.message)
    else window.location.href = '/dashboard'
    setLoading(false)
  }

  const handleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMsg(error.message)
    else window.location.href = '/dashboard'
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="border-b border-black p-2 flex justify-between items-center text-sm">
        <span>Welcome To</span>
        <div className="flex gap-2">
          <button onClick={handleLogin} className="border border-black px-3 py-1">SIGN IN USER</button>
          <a href="/seller" className="border border-black px-3 py-1">Sign In Seller</a>
          <a href="/agent" className="border border-black px-3 py-1">Apply For MullaBase Agent</a>
        </div>
      </div>
      <div className="border-b border-black p-4">
        <h1 className="text-6xl">MullaBase</h1>
        <h2 className="text-xl mt-2">Instant Spend & Earn Marketplace.</h2>
      </div>
      <div className="border-b border-black p-2 text-center font-bold">SIM REGISTRATION</div>
      <div className="border-b border-black p-4 text-sm">
        <p>Your gateway to flexible Market access on the go. Start your affiliate journey with MullaBase&apos;s Fulfillment Agent Affiliation program, earn passive income as you balance your work-live experience. Spend, refer, sell, swap, vote or take part to Earn points that you can Cashout via Mpesa/E-Wallet or Buy Airtime.</p>
      </div>
      <div className="border-b border-black p-4">
        <h3 className="text-2xl mb-4 text-center">JOIN & Grab 20 FREE Points</h3>
        <div className="max-w-sm mx-auto space-y-2">
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border border-black p-2"/>
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border border-black p-2"/>
          <button onClick={handleJoin} disabled={loading} className="w-full bg-black text-white p-2">Join MullaBase</button>
          {msg && <p className="text-xs text-center">{msg}</p>}
        </div>
      </div>
      <div className="p-2 text-xs flex justify-between">
        <span>Privacy | Terms | Contact Support</span>
        <span>Born in Lesotho, Open to Africa</span>
      </div>
    </main>
  )
    }
