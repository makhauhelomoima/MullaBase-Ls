'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Wellness() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase.from('wellness_posts').select('*').order('created_at', {ascending: false})
      setPosts(data || [])
      setLoading(false)
    }
    fetchPosts()
  }, [])

  // Demo posts so page never looks empty
  const demoPosts = [
    {id: 'demo1', title: 'Hydration Hack: Start Your Day Right', content: 'Drink 500ml of water within 30min of waking up. Your brain is 75% water and needs fuel after 8 hours. Add lemon for vitamin C. MullaBase tip: Track it daily for 7 days to earn 5 points.', created_at: new Date().toISOString()},
    {id: 'demo2', title: 'Stress Less: 2-Minute Breathing', content: 'Inhale 4 sec, hold 4 sec, exhale 6 sec. Repeat 5x. This activates your parasympathetic nervous system. Use before big decisions or SIM registration drives.', created_at: new Date().toISOString()},
    {id: 'demo3', title: 'Movement Matters: Lesotho Walks', content: '15min walk after meals improves digestion and mood. Maseru to Thaba Bosiu = 2 hours = 500+ calories. Invite a friend and earn referral points when they join MullaBase.', created_at: new Date().toISOString()}
  ]

  const displayPosts = posts.length > 0 ? posts : demoPosts

  if (loading) return <div className="p-4">Loading...</div>

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-black text-sm">
      <div className="border-b-2 border-[#0066FF] p-2 flex justify-between bg-white">
        <span className="font-bold text-[#0066FF]">WELLNESS HUB</span>
        <a href="/dashboard" className="border border-black px-2 hover:bg-gray-100">Back to Dashboard</a>
      </div>
      
      <div className="p-4">
        <div className="border-2 border-[#00C851] p-3 mb-4 bg-green-50">
          <div className="font-bold mb-2 text-[#00C851]">WELLNESS ADVISOR</div>
          <div className="text-xs">Professional wellness tips from certified advisors. Complete weekly wellness actions to earn MullaPoints. Admin posts from /admin panel appear here.</div>
        </div>

        {displayPosts.map(p => (
          <div key={p.id} className="border border-gray-300 p-3 mb-3 bg-white hover:shadow-md">
            <div className="font-bold text-[#0066FF]">{p.title}</div>
            <div className="text-xs text-gray-500 mb-2">{new Date(p.created_at).toLocaleDateString()}</div>
            <div className="text-xs leading-relaxed">{p.content}</div>
          </div>
        ))}

        <div className="border border-dashed border-gray-400 p-3 mt-4 text-center text-xs text-gray-600">
          More wellness content coming soon. Admins can add posts from /admin → Wellness tab.
        </div>
      </div>
    </main>
  )
    }
