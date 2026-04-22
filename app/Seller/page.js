'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Seller() {
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

  const buyBoost = () => alert('Boost purchased! Expires in 24h. Backend wire-up next.')

  if (loading) return <div className="p-4">Loading Seller HQ...</div>

  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between">
        <span className="font-bold">MullaBase SELLER HQ</span>
        <div className="flex gap-2">
          <span>{profile?.mullapoints || 0} Points</span>
          <a href="/dashboard" className="border border-black px-2">User View</a>
        </div>
      </div>
      <div className="p-4 grid grid-cols-2 gap-2">
        <button className="border border-black p-3">MANAGE STORE PERFORMANCE</button>
        <button className="border border-black p-3">VIEW REFERRALS & REFERRAL LINK</button>
        <button className="border border-black p-3">CASHOUT VIA Mpesa/E-WALLET</button>
        <button className="border border-black p-3">VIEW POINTS ACCUMULATED</button>
        <div className="col-span-2 border border-black p-3">
          <div className="font-bold mb-1">PROMOTE YOUR BUSINESS FOR 1 DAY REACH @ M20</div>
          <div className="text-xs">*All Businesses promoted appear on Wellness Hub for 1 Day Only then refresh with new promotions</div>
          <button onClick={buyBoost} className="w-full bg-black text-white mt-2 p-1">BUY 1-DAY BOOST M20</button>
        </div>
      </div>
    </main>
  )
            }
