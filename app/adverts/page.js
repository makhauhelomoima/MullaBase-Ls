'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function Adverts() {
  const [a, setA] = useState({ category: 'Businesses', text: '', contact: '' })
  const [ads, setAds] = useState([])
  useEffect(() => { supabase.from('adverts').select('*').order('created_at', {ascending: false}).then(({data}) => setAds(data||[])) }, [])
  const submit = async () => { if (!a.text||!a.contact) return alert('Fill text and contact'); if (a.text.length > 100) return alert('Max 100 chars'); const { error } = await supabase.from('adverts').insert([a]); if (error) return alert(error.message); window.location.reload() }
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">PAID ADVERTS</span><a href="/dashboard" className="border border-black px-2">Back</a></div>
      <div className="p-4">
        <div className="border border-black p-3 mb-4">
          <div className="font-bold mb-2">POST PAID ADVERT - 100 CHARS</div>
          <select value={a.category} onChange={e=>setA({...a, category:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs">
            {['Businesses','Jobs','Personal','Travel','Accommodation','Finances','Spiritual','Health'].map(c => <option key={c}>{c}</option>)}
          </select>
          <textarea placeholder="Advert text max 100" value={a.text} onChange={e=>setA({...a, text:e.target.value})} maxLength={100} className="w-full border border-black p-1 mb-1 text-xs"/>
          <div className="text-right text-xs">{a.text.length}/100</div>
          <input placeholder="Contact" value={a.contact} onChange={e=>setA({...a, contact:e.target.value})} className="w-full border border-black p-1 mb-2 text-xs"/>
          <button onClick={submit} className="w-full bg-black text-white p-1">POST ADVERT</button>
        </div>
        <div className="space-y-2">{ads.map(ad => <div key={ad.id} className="border border-black p-2"><div className="font-bold">{ad.category}</div><div>{ad.text}</div><div className="text-xs">Contact: {ad.contact}</div></div>)}</div>
      </div>
    </main>
  )
                                                               }
