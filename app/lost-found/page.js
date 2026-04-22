'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function LostFound() {
  const [lf, setLf] = useState({ type: 'Lost', item: '', description: '', contact: '', location: '' })
  const [items, setItems] = useState([])
  useEffect(() => { supabase.from('lost_found').select('*').order('created_at', {ascending: false}).then(({data}) => setItems(data||[])) }, [])
  const submit = async () => { if (!lf.item||!lf.contact) return alert('Fill item and contact'); const { error } = await supabase.from('lost_found').insert([lf]); if (error) return alert(error.message); window.location.reload() }
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">LOST & FOUND</span><a href="/dashboard" className="border border-black px-2">Back</a></div>
      <div className="p-4">
        <div className="border border-black p-3 mb-4">
          <div className="font-bold mb-2">POST LOST/FOUND ITEM</div>
          <select value={lf.type} onChange={e=>setLf({...lf, type:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"><option>Lost</option><option>Found</option></select>
          <input placeholder="Item" value={lf.item} onChange={e=>setLf({...lf, item:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"/>
          <input placeholder="Description" value={lf.description} onChange={e=>setLf({...lf, description:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"/>
          <input placeholder="Contact" value={lf.contact} onChange={e=>setLf({...lf, contact:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"/>
          <input placeholder="Location" value={lf.location} onChange={e=>setLf({...lf, location:e.target.value})} className="w-full border border-black p-1 mb-2 text-xs"/>
          <button onClick={submit} className="w-full bg-black text-white p-1">POST</button>
        </div>
        <div className="space-y-2">{items.map(i => <div key={i.id} className="border border-black p-2"><div className="font-bold">[{i.type}] {i.item}</div><div>{i.description}</div><div className="text-xs">Contact: {i.contact} | {i.location}</div></div>)}</div>
      </div>
    </main>
  )
            }
