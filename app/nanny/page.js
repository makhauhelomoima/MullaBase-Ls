'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function Nanny() {
  const [n, setN] = useState({ name: '', job_title: '', contact: '', location: '' })
  const [helpers, setHelpers] = useState([])
  useEffect(() => { supabase.from('careers').select('*').eq('job_title','Nanny').or('job_title.eq.Helper').then(({data}) => setHelpers(data||[])) }, [])
  const submit = async () => { if (!n.name||!n.contact) return alert('Fill name and contact'); const { error } = await supabase.from('careers').insert([{...n, job_title: 'Helper/Nanny' }]); if (error) return alert(error.message); window.location.reload() }
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">FIND HELP/NANNY</span><a href="/engage" className="border border-black px-2">Back</a></div>
      <div className="p-4">
        <div className="border border-black p-3 mb-4">
          <div className="font-bold mb-2">POST YOUR PROFILE</div>
          <input placeholder="Name" value={n.name} onChange={e=>setN({...n, name:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"/>
          <input placeholder="Job: Nanny/Helper/Cleaner" value={n.job_title} onChange={e=>setN({...n, job_title:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"/>
          <input placeholder="Contact" value={n.contact} onChange={e=>setN({...n, contact:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"/>
          <input placeholder="Location" value={n.location} onChange={e=>setN({...n, location:e.target.value})} className="w-full border border-black p-1 mb-2 text-xs"/>
          <button onClick={submit} className="w-full bg-black text-white p-1">POST PROFILE</button>
        </div>
        <div className="space-y-2">{helpers.map(h => <div key={h.id} className="border border-black p-2"><div className="font-bold">{h.name} - {h.job_title}</div><div className="text-xs">Contact: {h.contact} | {h.location}</div></div>)}</div>
      </div>
    </main>
  )
    }
