'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Home() {
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [joinData, setJoinData] = useState({ name: '', email: '', password: '', phone: '', location: '' })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const handleLogin = async (rolePath) => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword })
    if (error) setMsg(error.message)
    else window.location.href = rolePath
    setLoading(false)
  }

  const handleJoin = async () => {
    if (!joinData.name ||!joinData.email ||!joinData.password ||!joinData.phone ||!joinData.location) {
      return setMsg('Fill all fields')
    }
    setLoading(true)
    const { error } = await supabase.auth.signUp({ 
      email: joinData.email, password: joinData.password,
      options: { data: { name: joinData.name, phone: joinData.phone, location: joinData.location } }
    })
    if (error) setMsg(error.message)
    else { setMsg('Account created! You got 20 FREE Points.'); setTimeout(() => window.location.href = '/dashboard', 2000) }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="border-b border-black p-2 flex justify-between items-center text-sm">
        <span>Welcome To</span>
        <div className="flex gap-2">
          <button onClick={()=>handleLogin('/dashboard')} className="border border-black px-3 py-1">SIGNIN USER</button>
          <button onClick={()=>handleLogin('/seller')} className="border border-black px-3 py-1">Sign In Seller</button>
          <button onClick={()=>handleLogin('/agent')} className="border border-black px-3 py-1">Sign In Agent</button>
          <button onClick={()=>handleLogin('/admin')} className="border border-black px-3 py-1">Admin</button>
        </div>
      </div>
      <div className="border-b border-black p-4 flex justify-between items-center">
        <div><h1 className="text-6xl">MullaBase</h1><h2 className="text-xl mt-2">Instant Spend & Earn Marketplace.</h2></div>
        <div className="border border-black w-32 h-24 flex items-center justify-center text-xs text-center">Image of a Cart & Gifts & Parcels</div>
      </div>
      <div className="border-b border-black p-2 text-center font-bold">SIM REGISTRATION</div>
      <div className="border-b border-black p-4 text-sm"><p>Your gateway to flexible Market access on the go. Start your affiliate journey with MullaBase's Fulfillment Agent Affiliation program, earn passive income as you balance your work-live experience. Spend, refer, sell, swap, vote or take part to Earn points that you can Cashout via Mpesa/E-Wallet or Buy Airtime.</p></div>
      <div className="border-b border-black p-2 text-center">DAILY PICKS ADVERTS BLOG x1</div>
      {!showJoinForm? (
        <div className="border-b border-black p-4">
          <h3 className="text-2xl mb-4 text-center">JOIN & Grab 20 FREE Points</h3>
          <div className="max-w-sm mx-auto space-y-2">
            <input type="email" placeholder="Email for quick login" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} className="w-full border border-black p-2"/>
            <input type="password" placeholder="Password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} className="w-full border border-black p-2"/>
            <button onClick={()=>setShowJoinForm(true)} className="w-full bg-black text-white p-2">Join MullaBase - Get 20 Points</button>
            {msg && <p className="text-xs text-center">{msg}</p>}
          </div>
        </div>
      ) : (
        <div className="border-b border-black p-4">
          <h3 className="text-2xl mb-4 text-center">CREATE ACCOUNT - GET 20 FREE POINTS</h3>
          <div className="max-w-sm mx-auto space-y-2">
            <input placeholder="Name" value={joinData.name} onChange={e=>setJoinData({...joinData, name:e.target.value})} className="w-full border border-black p-2"/>
            <input type="email" placeholder="Email address" value={joinData.email} onChange={e=>setJoinData({...joinData, email:e.target.value})} className="w-full border border-black p-2"/>
            <input type="password" placeholder="Password" value={joinData.password} onChange={e=>setJoinData({...joinData, password:e.target.value})} className="w-full border border-black p-2"/>
            <input placeholder="Phone Number: 58xxxxxx" value={joinData.phone} onChange={e=>setJoinData({...joinData, phone:e.target.value})} className="w-full border border-black p-2"/>
            <input placeholder="Location: Maseru" value={joinData.location} onChange={e=>setJoinData({...joinData, location:e.target.value})} className="w-full border border-black p-2"/>
            <button onClick={handleJoin} disabled={loading} className="w-full bg-black text-white p-2">SUBMIT & CLAIM 20 POINTS</button>
            <button onClick={()=>setShowJoinForm(false)} className="w-full border border-black p-2">Back to Login</button>
            {msg && <p className="text-xs text-center">{msg}</p>}
          </div>
        </div>
      )}
      <div className="border-b border-black p-2 text-center">DAILY PICKS ADVERTS BLOG x1</div>
      <div className="p-2 text-xs flex justify-between"><span>Privacy | Terms | Contact Support</span><span>Born in Lesotho | Open to Africa</span></div>
    </main>
  )
      }
