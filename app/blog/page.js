'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase.from('blog_posts').select('*').order('created_at', {ascending: false})
      setBlogs(data || [])
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  const demoBlogs = [
    {id: 'demo1', title: 'How SIM Registration Earns You Passive Income', content: 'Every SIM you register on MullaBase = 20 points. 50 SIMs/month = 1000 points = M200 airtime or cashout. Learn how agents in Maseru are scaling this. Step 1: Verify ID. Step 2: Submit. Step 3: Get paid.', created_at: new Date().toISOString()},
    {id: 'demo2', title: 'From Notebook to Nation: The MullaBase Story', content: 'Started with 24 hand-drawn tabs in a notebook at 05:00am. Now serving Lesotho with AI-powered marketplace. Your vision + discipline + code = impact. Keep building.', created_at: new Date().toISOString()},
    {id: 'demo3', title: 'Why Mpesa + E-Wallet Cashouts Change Everything', content: 'Traditional banking takes 3 days. MullaBase cashout = instant to Mpesa/E-Wallet. Spend your points same day. This is financial freedom for Lesotho youth and hustlers.', created_at: new Date().toISOString()}
  ]

  const displayBlogs = blogs.length > 0? blogs : demoBlogs

  if (loading) return <div className="p-4">Loading...</div>

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white text-black text-sm">
      <div className="border-b-2 border-orange-500 p-2 flex justify-between bg-white">
        <span className="font-bold text-orange-500">DAILY PICKS BLOG</span>
        <a href="/dashboard" className="border border-black px-2 hover:bg-gray-100">Back</a>
      </div>
      <div className="p-4">
        {displayBlogs.map(b => (
          <div key={b.id} className="border border-orange-200 p-3 mb-3 bg-white hover:shadow-md">
            <div className="font-bold text-orange-600 mb-1">{b.title}</div>
            <div className="text-xs text-gray-500 mb-2">{new Date(b.created_at).toLocaleDateString()}</div>
            <div className="text-xs leading-relaxed">{b.content}</div>
          </div>
        ))}
      </div>
    </main>
  )
  }
