'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false })
      
      setBlogs(data || [])
      setLoading(false)
    }
    fetchBlogs()
  }, [])

  const demoBlogs = [
    {
      id: 'demo1',
      title: 'How SIM Registration Earns You Passive Income',
      content: 'Every SIM you register on MullaBase = 20 points. 50 SIMs/month = 1000 points = M200 airtime or cashout. Learn how agents in Maseru are scaling this. Step 1: Verify ID. Step 2: Submit. Step 3: Get paid.',
      created_at: new Date().toISOString()
    },
    {
      id: 'demo2',
      title: 'From Notebook to Nation: The MullaBase Story',
      content: 'Started with 24 hand-drawn tabs in a notebook at 05:02am. Now serving Lesotho with AI-powered marketplace. Your vision + discipline + code = impact. Keep building.',
      created_at: new Date().toISOString()
    },
    {
      id: 'demo3',
      title: 'Why Mpesa + E-Wallet Cashouts Change Everything',
      content: 'Traditional banking takes 3 days. MullaBase cashout = instant to Mpesa/E-Wallet. Spend your money the same day. This is financial freedom for Lesotho youth and hustlers.',
      created_at: new Date().toISOString()
    }
  ]

  const displayBlogs = blogs.length > 0 ? blogs : demoBlogs

  if (loading) return <div className="min-h-screen bg-black text-amber-500 flex items-center justify-center">Loading...</div>

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black">
            <span className="text-amber-500">MULLABASE</span> BLOG
          </h1>
          <Link href="/boss-journey" className="border border-zinc-700 px-4 py-2 rounded-xl hover:bg-zinc-900 transition-all">
            Back
          </Link>
        </div>

        <div className="space-y-8">
          {displayBlogs.map((b) => (
            <article key={b.id} className="border border-zinc-800 rounded-3xl p-6 md:p-8 bg-zinc-950/50 hover:border-amber-500/30 transition-all">
              <h2 className="text-2xl md:text-3xl font-bold text-amber-500 mb-3">{b.title}</h2>
              <p className="text-xs text-zinc-500 mb-4">
                {new Date(b.created_at).toLocaleDateString('en-GB', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </p>
              <p className="text-zinc-300 leading-relaxed">{b.content}</p>
            </article>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-zinc-600 text-sm mb-2">
            Real stories from Maseru. Built on phone. Scaled worldwide.
          </p>
          <p className="text-zinc-700 text-xs">
            MullaBase. Lesotho's Pride. The World's Treasure!
          </p>
        </div>

      </div>
    </main>
  )
  }
