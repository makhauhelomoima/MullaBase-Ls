'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function BlogPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false })
        
        if (error) throw error
        setBlogs(data || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-black text-amber-500 flex items-center justify-center">
      <div className="text-xl font-bold">Loading Ark Stories...</div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen bg-black text-red-500 flex items-center justify-center">
      <div className="text-xl">Error: {error}</div>
    </div>
  )

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black">
            <span className="text-amber-500">MULLABASE</span> BLOG
          </h1>
          <Link href="/boss-journey" className="border border-zinc-700 px-4 py-2 rounded-xl hover:bg-zinc-900 transition-all text-sm">
            Back to Ark
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center text-zinc-500 py-20">
            <p className="text-xl mb-4">No stories yet.</p>
            <p>First post drops soon. Check WhatsApp Status.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {blogs.map((post) => (
              <article key={post.id} className="border border-zinc-800 rounded-3xl p-6 md:p-8 bg-zinc-950/50 hover:border-amber-500/30 transition-all">
                <h2 className="text-2xl md:text-3xl font-bold text-amber-500 mb-3">{post.title}</h2>
                <p className="text-xs text-zinc-500 mb-4">
                  {new Date(post.created_at).toLocaleDateString('en-GB', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
                <p className="text-zinc-300 leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </article>
            ))}
          </div>
        )}

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
