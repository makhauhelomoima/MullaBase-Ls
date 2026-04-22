'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function Motivation() {
  const [mot, setMot] = useState(null)
  useEffect(() => { supabase.from('daily_content').select('*').eq('type','motivation').eq('date', new Date().toISOString().split('T')[0]).single().then(({data}) => setMot(data)) }, [])
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">DAILY MOTIVATION</span><a href="/dashboard" className="border border-black px-2">Back</a></div>
      <div className="p-4"><div className="border border-black p-4 text-center">{mot? mot.content : 'No motivation for today yet'}</div></div>
    </main>
  )
    }
