'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export default function Home() {
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [showRoleMenu, setShowRoleMenu] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [joinData, setJoinData] = useState({ name: '', email: '', password: '', phone: '', location: '' })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const handleLogin = async (rolePath) => {
    if (!supabase) return setMsg('Setup error: Add Supabase keys in Vercel')
    if (!loginEmail || !loginPassword) return setMsg('Enter email and password first')
    setLoading(true)
    setShowRoleMenu(false)
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword })
    if (error) setMsg(error.message)
    else window.location.href = rolePath
    setLoading(false)
  }

  const handleJoin = async () => {
    if (!supabase) return setMsg('Setup error: Add Supabase keys in Vercel')
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
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-black">
      <div className="border-b-2 border-[#0066FF] p-2 flex justify-between items-center bg-white">
        <span className="font-bold text-[#0066FF]">Welcome To</span>
        <div className="relative">
          <button 
            onClick={() => setShowRoleMenu(!showRoleMenu)} 
            className="border-2 border-[#0066FF] px-3 py-1 bg-[#0066FF] text-white hover:bg-blue-700 text-sm font-bold"
          >
            SIGN IN ▾
          </button>
          {showRoleMenu && (
            <div className="absolute right-0 mt-1 bg-white border-2 border-[#0066FF] z-10 w-32">
              <button onClick={()=>handleLogin('/dashboard')} className="block w-full text-left px-3 py-2 text-xs hover:bg-blue-50">User</button>
              <button onClick={()=>handleLogin('/seller')} className="block w-full text-left px-3 py-2 text-xs hover:bg-blue-50">Seller</button>
              <button onClick={()=>handleLogin('/agent')} className="block w-full text-left px-3 py-2 text-xs hover:bg-blue-50">Agent</button>
              <button onClick={()=>handleLogin('/admin')} className="block w-full text-left px-3 py-2 text-xs bg-black text-white hover:bg-gray-800">Admin</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-b-2 border-[#0066FF] p-4 flex justify-between items-center bg-white">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#0066FF]">MullaBase</h1>
          <h2 className="text-lg md:text-xl mt-2 text-gray-700">Instant Spend & Earn Marketplace.</h2>
        </div>
        <div className="border-2 border-[#0066FF] w-24 h-20 md:w-32 md:h-24 flex items-center justify-center text-xs text-center bg-blue-50 text-[#0066FF]">Cart & Gifts & Parcels</div>
      </div>
      
      <a href="/sim-register" className="block border-b-4 border-[#00C851] p-3 text-center font-bold bg-[#00C851] text-white hover:bg-green-600 text-sm">
        SIM REGISTRATION - CLICK HERE TO REGISTER & EARN 20 POINTS
      </a>
      
      <div className="border-b border-gray-300 p-4 text-sm bg-white leading-relaxed">
        Your gateway to flexible Market access on the go. Start your affiliate journey with MullaBase's Fulfillment Agent Affiliation program, earn passive income as you balance your work-live experience. Spend, refer, sell, swap, vote or take part to Earn points that you can Cashout via <span className="text-[#00C851] font-bold">Mpesa/E-Wallet</span> or Buy Airtime.
      </div>
      
      <div className="border-b border-gray-300 p-2 text-center bg-yellow-50 text-xs font-bold">DAILY PICKS ADVERTS BLOG x1</div>
      
      {!showJoinForm? (
        <div className="border-b border-gray-300 p-4 bg-white">
          <h3 className="text-2xl mb-4 text-center font-bold text-[#0066FF]">JOIN & Grab 20 FREE Points</h3>
          <div className="max-w-sm mx-auto space-y-2">
            <input type="email" placeholder="Email for quick login" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} className="w-full border-2 border-gray-300 p-2 focus:border-[#0066FF] focus:outline-none"/>
            <input type="password" placeholder="Password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} className="w-full border-2 border-gray-300 p-2 focus:border-[#0066FF] focus:outline-none"/>
            <button onClick={()=>setShowJoinForm(true)} className="w-full bg-[#0066FF] text-white p-3 hover:bg-blue-700 font-bold">Join MullaBase - Get 20 Points</button>
            {msg && <p className="text-xs text-center text-red-600 font-bold">{msg}</p>}
          </div>
        </div>
      ) : (
        <div className="border-b border-gray-300 p-4 bg-white">
          <h3 className="text-2xl mb-4 text-center font-bold text-[#0066FF]">CREATE ACCOUNT - GET 20 FREE POINTS</h3>
          <div className="max-w-sm mx-auto space-y-2">
            <input placeholder="Name" value={joinData.name} onChange={e=>setJoinData({...joinData, name:e.target.value})} className="w-full border-2 border-gray-300 p-2 focus:border-[#0066FF]"/>
            <input type="email" placeholder="Email address" value={joinData.email} onChange={e=>setJoinData({...joinData, email:e.target.value})} className="w-full border-2 border-gray-300 p-2 focus:border-[#0066FF]"/>
            <input type="password" placeholder="Password" value={joinData.password} onChange={e=>setJoinData({...joinData, password:e.target.value})} className="w-full border-2 border-gray-300 p-2 focus:border-[#0066FF]"/>
            <input placeholder="Phone: 58xxxxxx" value={joinData.phone} onChange={e=>setJoinData({...joinData, phone:e.target.value})} className="w-full border-2 border-gray-300 p-2 focus:border-[#0066FF]"/>
            <input placeholder="Location: Maseru" value={joinData.location} onChange={e=>setJoinData({...joinData, location:e.target.value})} className="w-full border-2 border-gray-300 p-2 focus:border-[#0066FF]"/>
            <button onClick={handleJoin} disabled={loading} className="w-full bg-[#00C851] text-white p-3 hover:bg-green-700 disabled:bg-gray-400 font-bold">{loading ? 'Creating...' : 'SUBMIT & CLAIM 20 POINTS'}</button>
            <button onClick={()=>setShowJoinForm(false)} className="w-full border-2 border-gray-300 p-2 hover:bg-gray-100">Back to Login</button>
            {msg && <p className="text-xs text-center text-red-600 font-bold">{msg}</p>}
          </div>
        </div>
      )}
      
      <div className="border-b border-gray-300 p-2 text-center bg-yellow-50 text-xs font-bold">DAILY PICKS ADVERTS BLOG x1</div>
      <div className="p-3 text-xs flex justify-between bg-gray-100">
        <span><a href="/privacy" className="underline">Privacy</a> | <a href="/terms" className="underline">Terms</a> | <a href="/contact" className="underline">Contact Support</a></span>
        <span className="text-[#0066FF] font-bold">Born in Lesotho | Open to Africa</span>
      </div>
    </main>
  )
    }
