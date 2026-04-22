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
