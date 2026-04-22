'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Agent() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return window.location.href = '/'
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
      setLoading(false)
    }
    init()
  }, [])

  if (loading) return <div className="p-4">Loading Agent HQ...</div>

  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between">
        <span className="font-bold">MullaBase AGENT HQ</span>
        <div className="flex gap-2">
          <span>{profile?.mullapoints || 0} Points</span>
          <a href="/dashboard" className="border border-black px-2">User View</a>
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 gap-2">
        <button className="border border-black p-3">VIEW SIMs FULFILLED #</button>
        <button className="border border-black p-3">PAYOUTS & STATUS</button>
        <button className="border border-black p-3">VIEW POINTS & CASHOUT</button>
        <button className="border border-black p-3">SIM REGISTRATION TOOL</button>
        <div className="col-span-2 border border-black p-3 text-xs">
          <div className="font-bold">Agent Commission: 10 Points per SIM</div>
          <div>Cashout via Mpesa/E-Wallet when you hit 500 points</div>
        </div>
      </div>
    </main>
  )
    }
