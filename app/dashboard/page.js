'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return window.location.href = '/'
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
      setLoading(false)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  if (loading) return <div className="p-4">Loading MullaBase...</div>

  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between">
        <span className="font-bold">MullaBase</span>
        <div className="flex gap-2">
          <span>{profile?.mullapoints || 0} Points</span>
          <a href="/engage" className="border border-black px-2">Engage</a>
          <button onClick={handleLogout} className="border border-black px-2">Logout</button>
        </div>
      </div>
      <div className="grid grid-cols-3 border-b border-black">
        <div className="col-span-1 border-r border-black p-3">
          <h2 className="font-bold mb-2">WELLNESS HUB (Blog)</h2>
          <div className="border border-black p-2 mb-2 text-xs">[Blog posts load here]</div>
          <div className="border border-black p-2">PROMOTE YOUR BUSINESS FOR 1 DAY REACH@M20</div>
        </div>
        <div className="col-span-1 border-r border-black p-3">
          <h2 className="font-bold mb-2">DASHBOARD</h2>
          <button className="w-full border border-black p-2 mb-2">BUY AIRTIME</button>
          <div className="border border-black p-2 text-xs">ADVERTS: Businesses, Jobs, Travel, Health</div>
        </div>
        <div className="col-span-1 p-3 text-xs space-y-1">
          <div className="border border-black p-1 text-center">CONTACT SUPPORT</div>
          <a href="/agent" className="border border-black p-1 text-center block">APPLY FOR MullaBase AGENT</a>
          <div className="border border-black p-1 text-center">VOTE & EARN</div>
          <div className="border border-black p-1 text-center">DONATE</div>
        </div>
      </div>
      <div className="p-2 text-xs flex justify-between">
        <span>Privacy | Terms | Contact Support</span>
        <span>Level {profile?.level || 1} | Born in Lesotho</span>
      </div>
    </main>
  )
    }
