'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

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
      <div className="border-b border-black p-2 flex justify-between text-sm">
        <span>Welcome To</span>
        <button onClick={handleLogin} className="border border-black px-3 py-1">SIGN IN USER</button>
      </div>
      <div className="border-b border-black p-4">
        <h1 className="text-6xl">MullaBase</h1>
        <h2 className="text-xl mt-2">Instant Spend & Earn Marketplace.</h2>
      </div>
      <div className="border-b border-black p-2 text-center font-bold">SIM REGISTRATION</div>
      <div className="p-4 max-w-sm mx-auto space-y-2">
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full border border-black p-2"/>
        <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full border border-black p-2"/>
        <button onClick={handleJoin} disabled={loading} className="w-full bg-black text-white p-2">Join MullaBase</button>
        {msg && <p className="text-xs text-center">{msg}</p>}
      </div>
      <div className="p-2 text-xs">Born in Lesotho, Open to Africa</div>
    </main>
  )
}
