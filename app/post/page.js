'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function PostBlog() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { const init = async () => { const { data: { user } } = await supabase.auth.getUser(); if (!user) return window.location.href = '/'; const { data } = await supabase.from('posts').select('*, profiles(email,name)').order('created_at', {ascending: false}); setPosts(data||[]); setLoading(false) }; init() }, [])
  const handlePost = async () => { if (content.length > 1000) return alert('Max 1000'); if (!content) return alert('Write something'); const { error } = await supabase.from('posts').insert([{ title, content }]); if (error) return alert(error.message); setTitle(''); setContent(''); const { data } = await supabase.from('posts').select('*, profiles(email,name)').order('created_at', {ascending: false}); setPosts(data||[]) }
  if (loading) return <div className="p-4">Loading...</div>
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">ENGAGE BLOG</span><a href="/engage" className="border border-black px-2">Back</a></div>
      <div className="p-4"><div className="border border-black p-3 mb-4"><div className="font-bold mb-2">WRITE NEW POST - 1000 CHARS MAX</div><input placeholder="Title optional" value={title} onChange={e=>setTitle(e.target.value)} className="w-full border border-black p-1 mb-1 text-xs"/><textarea placeholder="Insert text for engagement post. No advertising or link-sharing." value={content} onChange={e=>setContent(e.target.value)} maxLength={1000} className="w-full min-h-32 border border-black p-1 text-xs"/><div className="flex justify-between mt-1 text-xs"><button className="border border-black px-2">Insert Photo</button><span>{content.length}/1000</span></div><button onClick={handlePost} className="w-full bg-black text-white p-1 mt-2">PUBLISH POST</button></div>
        <div className="space-y-2">{posts.map(p => <div key={p.id} className="border border-black p-2"><div className="font-bold">{p.title||'Untitled'}</div><div className="text-xs">{p.profiles?.name||p.profiles?.email} | {new Date(p.created_at).toLocaleDateString()}</div><div className="mt-1">{p.content}</div><div className="flex border-t border-black mt-2 pt-1 text-xs"><button className="flex-1 border-r border-black">REACT</button><button className="flex-1 border-r border-black">COMMENT</button><button className="flex-1 border-r border-black">SHARE</button><button className="flex-1">REPOST</button></div></div>)}</div>
      </div>
    </main>
  )
                                                      }
