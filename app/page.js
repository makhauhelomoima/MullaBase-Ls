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
  const [joinData, setJoinData] = useState({ name: '', email: '', password: '', phone: '', location: 'Lesotho' })
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
    <main className="min-h-screen bg-[#FFF9F0] text-black text-sm">
      <div className="max-w-md mx-auto">
        
        <div className="p-3 flex justify-between items-center bg-white border-b border-gray-200 sticky top-0 z-20">
          <span className="font-bold text-[#0066FF] text-lg">Welcome To</span>
          <div className="relative">
            <button 
              onClick={() => setShowRoleMenu(!showRoleMenu)} 
              className="border-2 border-[#0066FF] px-4 py-1 bg-[#0066FF] text-white hover:bg-blue-700 text-sm font-bold rounded"
            >
              SIGN IN ▾
            </button>
            {showRoleMenu && (
              <div className="absolute right-0 mt-1 bg-white border-2 border-[#0066FF] z-30 w-32 rounded shadow-lg">
                <button onClick={()=>handleLogin('/dashboard')} className="block w-full text-left px-3 py-2 text-xs hover:bg-blue-50">User</button>
                <button onClick={()=>handleLogin('/seller')} className="block w-full text-left px-3 py-2 text-xs hover:bg-blue-50">Seller</button>
                <button onClick={()=>handleLogin('/agent')} className="block w-full text-left px-3 py-2 text-xs hover:bg-blue-50">Agent</button>
                <button onClick={()=>handleLogin('/admin')} className="block w-full text-left px-3 py-2 text-xs bg-black text-white hover:bg-gray-800">Admin</button>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 text-center bg-white">
          <h1 className="text-5xl font-bold text-[#0066FF] mb-2">MullaBase</h1>
          <h2 className="text-lg text-gray-700">Instant Spend & Earn Marketplace.</h2>
        </div>

        <div className="p-4 bg-[#FFF9F0] space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <a href="/store" className="bg-[#DC2626] text-white p-4 rounded-lg text-center font-bold shadow hover:bg-red-700">
              <div>MULLABASE STORE</div>
              <div className="text-xs">~ Shop Now</div>
            </a>
            <a href="/templates" className="bg-[#EA580C] text-white p-4 rounded-lg text-center font-bold shadow hover:bg-orange-700 flex items-center justify-center">
              Templates
            </a>
            <a href="/backend" className="bg-[#EA580C] text-white p-4 rounded-lg text-center font-bold shadow hover:bg-orange-700 flex items-center justify-center">
              Backend
            </a>
            <a href="/airtime" className="bg-[#1E293B] text-white p-4 rounded-lg text-center font-bold shadow hover:bg-slate-800 flex items-center justify-center">
              Airtime
            </a>
          </div>
          
          <a href="/sim-register" className="block bg-[#00C851] text-white p-4 rounded-lg text-center font-bold shadow hover:bg-green-700">
            SIM Registration - EARN 20 POINTS
          </a>
          
          <a href="/seller" className="block bg-[#1E293B] text-white p-4 rounded-lg text-center font-bold shadow hover:bg-slate-800">
            Sell - Open Your Shop
          </a>
        </div>

        <div className="px-6 py-2 text-center text-xs text-[#92400E] bg-[#FFF9F0]">
          <p>Sell on MullaBase & earn | Share = 10 points per friend</p>
          <p>100 points = M10/R10/P10 | Withdraw to cash or airtime</p>
        </div>

        {!showJoinForm ? (
          <div className="p-4 bg-[#FFF9F0]">
            <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
              <h3 className="text-center font-bold text-[#EA580C] mb-4">JOIN 2,000+ AFRICANS EARNING</h3>
              <div className="space-y-3">
                <select value={joinData.location} onChange={e=>setJoinData({...joinData, location:e.target.value})} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-[#EA580C] focus:outline-none">
                  <option>Lesotho</option>
                  <option>South Africa</option>
                  <option>Botswana</option>
                  <option>eSwatini</option>
                </select>
                <input type="email" placeholder="mulla.test@gmail.com" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-[#EA580C] focus:outline-none"/>
                <input type="password" placeholder="Password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-[#EA580C] focus:outline-none"/>
                <button onClick={()=>setShowJoinForm(true)} className="w-full bg-[#EA580C] text-white p-3 rounded-lg hover:bg-orange-700 font-bold">
                  Claim Your Base + M2 Free
                </button>
                {msg && <p className="text-xs text-center text-red-600 font-bold">{msg}</p>}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-[#FFF9F0]">
            <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
              <h3 className="text-center font-bold text-[#00C851] mb-4">CREATE ACCOUNT - GET 20 FREE POINTS</h3>
              <div className="space-y-3">
                <input placeholder="Name" value={joinData.name} onChange={e=>setJoinData({...joinData, name:e.target.value})} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-[#00C851]"/>
                <input type="email" placeholder="Email address" value={joinData.email} onChange={e=>setJoinData({...joinData, email:e.target.value})} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-[#00C851]"/>
                <input type="password" placeholder="Password" value={joinData.password} onChange={e=>setJoinData({...joinData, password:e.target.value})} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-[#00C851]"/>
                <input placeholder="Phone: 58xxxxxx" value={joinData.phone} onChange={e=>setJoinData({...joinData, phone:e.target.value})} className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-[#00C851]"/>
                <button onClick={handleJoin} disabled={loading} className="w-full bg-[#00C851] text-white p-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 font-bold">{loading ? 'Creating...' : 'SUBMIT & CLAIM 20 POINTS'}</button>
                <button onClick={()=>setShowJoinForm(false)} className="w-full border-2 border-gray-300 p-3 rounded-lg hover:bg-gray-100">Back</button>
                {msg && <p className="text-xs text-center text-red-600 font-bold">{msg}</p>}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 bg-[#FFF9F0]">
          <a href="/store" className="block w-full bg-[#EA580C] text-white p-4 rounded-lg text-center font-bold shadow hover:bg-orange-700">
            Enter MullaBase Store →
          </a>
        </div>

        <div className="p-3 text-xs flex justify-between bg-white border-t border-gray-200">
          <span><a href="/privacy" className="underline">Privacy</a> | <a href="/terms" className="underline">Terms</a> | <a href="/contact" className="underline">Contact Support</a></span>
          <span className="text-[#0066FF] font-bold">Born in Lesotho | Open to Africa</span>
        </div>

      </div>
    </main>
  )
}
