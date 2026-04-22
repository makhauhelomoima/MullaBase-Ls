'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Works with both eyJ... and sb_... keys
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export default function Home() {
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [joinData, setJoinData] = useState({ name: '', email: '', password: '', phone: '', location: '' })
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const handleLogin = async (rolePath) => {
    if (!supabase) return setMsg('Setup error: Add Supabase keys in Vercel Environment Variables')
    if (!loginEmail || !loginPassword) return setMsg('Enter email and password first')
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword })
    if (error) setMsg(error.message)
    else window.location.href = rolePath
    setLoading(false)
  }

  const handleJoin = async () => {
    if (!supabase) return setMsg('Setup error: Add Supabase keys in Vercel Environment Variables')
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
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-black">
      <div className="border-b border-black p-2 flex justify-between items-center text-sm bg-white">
        <span className="font-bold text-[#0066FF]">Welcome To</span>
        <div className="flex gap-1 flex-wrap justify-end">
          <button onClick={()=>handleLogin('/sim-register')} className="border border-black px-2 py-1 bg-[#00C851] text-white hover:bg-green-700 text-xs">SIM REGISTRATION</button>
          <button onClick={()=>handleLogin('/dashboard')} className="border border-black px-2
