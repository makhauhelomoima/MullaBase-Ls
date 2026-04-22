'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function Verse() {
  const [verse, setVerse] = useState(null)
  useEffect(() => { supabase.from('daily_content').select('*').eq('type','verse').eq('date', new Date().toISOString().split('T')[0]).single().then(({data}) => setVerse(data)) }, [])
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">DAILY VERSE</span><a href="/dashboard" className="border border-black px-2">Back</a></div>
      <div className="p-4"><div className="border border-black p-4 text-center">{verse? verse.content : 'No verse for today yet'}</div></div>
    </main>
  )
    }
