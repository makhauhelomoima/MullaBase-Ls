'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function Survey() {
  const [polls, setPolls] = useState([])
  useEffect(() => { supabase.from('polls').select('*').eq('active', true).then(({data}) => setPolls(data||[])) }, [])
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">SURVEY POLL</span><a href="/dashboard" className="border border-black px-2">Back</a></div>
      <div className="p-4 space-y-2">
        {polls.map(p => <div key={p.id} className="border border-black p-3"><div className="font-bold">{p.question}</div><div className="text-xs">Go to Vote & Earn to participate</div></div>)}
      </div>
    </main>
  )
    }
