'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return window.location.href = '/'
      setUser(user)
      
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
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
      {/* Top Bar */}
      <div className="border-b border-black p-2 flex justify-between items-center">
        <span className="font-bold">MullaBase</span>
        <div className="flex gap-2">
          <span>{profile?.mullapoints || 0} Points</span>
          <button onClick={handleLogout} className="border border-black px-2">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-3 border-b border-black">
        {/* WELLNESS HUB - Col 1 */}
        <div className="col-span-1 border-r border-black p-3">
          <h2 className="font-bold mb-2">WELLNESS HUB (Blog)</h2>
          <div className="border border-black p-2 mb-2">[Insert Topic] [Insert Date]</div>
          <div className="border border-black p-2 mb-2 min-h-24">
            [Insert Sub-Topic or Intro]<br/>
            [Add Image If available]<br/>
            [Insert text for body max 1000 words]
          </div>
          <div className="border border-black p-2 mb-2">[Insert a brief text to Summarize]</div>
          <div className="flex border-black">
            <div className="flex-1 p-1 border-r border-black">[Insert Author + thumbnail]</div>
            <div className="p-1">FOLLOW REACH</div>
          </div>
          <div className="flex border border-black border-t-0">
            <div className="flex-1 p-1 border-r border-black">Comments</div>
            <div className="p-1 border-r border-black">♡</div>
            <div className="p-1 border-r border-black">SHARE</div>
            <div className="p-1">SUBSCRIBE</div>
          </div>
          <div className="border border-black mt-2 p-2">
            PROMOTE YOUR BUSINESS FOR 1 DAY REACH@M20
          </div>
          <div className="border border-black mt-2 p-2 text-xs">
            *All Businesses promoted Appear here for 1 Day Only then refresh with new promotions
          </div>
        </div>

        {/* DASHBOARD CENTER - Col 2 */}
        <div className="col-span-1 border-r border-black p-3">
          <h2 className="font-bold mb-2">DASHBOARD</h2>
          <button className="w-full border border-black p-2 mb-2 font-bold">BUY AIRTIME</button>
          <div className="border border-black p-2">
            <div className="font-bold mb-1">ADVERTS</div>
            <div className="text-xs mb-2">*Insert Text to Post ONLY PAID ADVERTS FOR:</div>
            <div className="text-xs space-y-1">
              <div>Businesses</div>
              <div>Jobs</div>
              <div>Personal</div>
              <div>Travel</div>
              <div>Accommodation</div>
              <div>Finances</div>
              <div>Spiritual</div>
              <div>Health</div>
              <div className="text-xs mt-1">with contacts max 100 words each</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR - Col 3 */}
        <div className="col-span-1 p-3 space-y-1 text-xs">
          <div className="border border-black p-1 text-center">CONTACT SUPPORT</div>
          <div className="border border-black p-1 text-center">APPLY FOR MullaBase AGENT</div>
          <div className="border border-black p-1 text-center">CAREERS</div>
          <div className="border border-black p-1 text-center">LOST & FOUND</div>
          <div className="border border-black p-1 text-center">VOTE & EARN</div>
          <div className="border border-black p-1 text-center">SURVEY Poll</div>
          <div className="border border-black p-2 text-center">
            DAILY VERSE/Scripture<br/>[Insert Text]
          </div>
          <div className="border border-black p-2 text-center">
            DAILY MOTIVATION<br/>[Insert Text]
          </div>
          <div className="border border-black p-1 text-center">
            DONATE<br/><span className="text-xs">Opens list of charities</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-2 text-xs flex justify-between">
        <span>Privacy | Terms | Contact Support</span>
        <span>Level {profile?.level || 1} | Born in Lesotho</span>
      </div>
    </main>
  )
        }
