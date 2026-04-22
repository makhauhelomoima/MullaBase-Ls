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

  if (loading) return <div className="p-4">Loading...</div>

  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between">
        <span className="font-bold">WELLNESS HUB</span>
        <a href="/dashboard" className="border border-black px-2">Back</a>
      </div>
      <div className="p-4">
        <div className="border border-black p-3 mb-4">
          <div className="font-bold mb-2">WELLNESS ADVISOR</div>
          <div className="text-xs">Professional wellness tips and advice will appear here. Admin posts from /admin panel.</div>
        </div>
        {posts.length === 0 && <div className="text-xs">No wellness posts yet. Check back soon.</div>}
        {posts.map(p => (
          <div key={p.id} className="border border-black p-3 mb-2">
            <div className="font-bold text-[#0066FF]">{p.title}</div>
            <div className="text-xs text-gray-600 mb-1">{new Date(p.created_at).toLocaleDateString()}</div>
            <div className="text-xs">{p.content}</div>
          </div>
        ))}
      </div>
    </main>
  )
      }
