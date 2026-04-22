'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function SwapBlog() {
  const [s, setS] = useState({ item_name: '', description: '', wants_to_swap_for: '', contact: '', location: '' })
  const [swaps, setSwaps] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { const init = async () => { const { data: { user } } = await supabase.auth.getUser(); if (!user) return window.location.href = '/'; const { data } = await supabase.from('swaps').select('*').eq('status','open').order('created_at', {ascending: false}); setSwaps(data||[]); setLoading(false) }; init() }, [])
  const submit = async () => { if (!s.item_name||!s.description||!s.wants_to_swap_for||!s.contact) return alert('Fill all except location'); if (s.description.length > 150) return alert('Max 150'); const { error } = await supabase.from('swaps').insert([s]); if (error) return alert(error.message); setS({ item_name: '', description: '', wants_to_swap_for: '', contact: '', location: '' }); const { data } = await supabase.from('swaps').select('*').eq('status','open').order('created_at', {ascending: false}); setSwaps(data||[]) }
  if (loading) return <div className="p-4">Loading...</div>
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">SWAP 2 OWN BLOG</span><a href="/engage" className="border border-black px-2">Back</a></div>
      <div className="p-4"><div className="border border-black p-3 mb-4"><div className="font-bold mb-2">POST ITEM TO SWAP - 150 CHARS</div><input placeholder="Item: iPhone 12" value={s.item_name} onChange={e=>setS({...s, item_name:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"/><textarea placeholder="Description max 150" value={s.description} onChange={e=>setS({...s, description:e.target.value})} maxLength={150} className="w-full border border-black p-1 mb-1 text-xs"/><div className="text-right text-xs">{s.description.length}/150</div><input placeholder="Want: Samsung S22" value={s.wants_to_swap_for} onChange={e=>setS({...s, wants_to_swap_for:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"/><input placeholder="Contact: WhatsApp 58xxxxxx" value={s.contact} onChange={e=>setS({...s, contact:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"/><input placeholder="Location: Maseru" value={s.location} onChange={e=>setS({...s, location:e.target.value})} className="w-full border border-black p-1 mb-2 text-xs"/><button onClick={submit} className="w-full bg-black text-white p-1">POST SWAP ITEM</button></div>
        <div className="space-y-2">{swaps.map(sw => <div key={sw.id} className="border border-black p-2"><div className="font-bold">{sw.item_name}</div><div className="text-xs">Wants: {sw.wants_to_swap_for}</div><div className="my-1">{sw.description}</div><div className="text-xs">Contact: {sw.contact} | {sw.location}</div></div>)}</div>
      </div>
    </main>
  )
    }
