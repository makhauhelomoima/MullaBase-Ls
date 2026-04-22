'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Motivation() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchQuotes = async () => {
      const { data } = await supabase.from('motivations').select('*').order('created_at', {ascending: false})
      setQuotes(data || [])
      setLoading(false)
    }
    fetchQuotes()
  }, [])

  if (loading) return <div className="p-4">Loading...</div>

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white text-black text-sm">
      <div className="border-b-2 border-[#00C851] p-2 flex justify-between bg-white">
        <span className="font-bold text-[#00C851]">DAILY MOTIVATION</span>
        <a href="/dashboard" className="border border-black px-2 hover:bg-gray-100">Back</a>
      </div>
      <div className="p-4">
        {quotes.map(q => (
          <div key={q.id} className="border-2 border-green-200 p-4 mb-4 bg-white">
            <div className="font-bold text-[#00C851] text-lg mb-2">{q.title}</div>
            <div className="text-sm leading-relaxed mb-3">{q.content}</div>
            <div className="text-xs text-gray-600 italic text-right">— {q.verse_ref}</div>
          </div>
        ))}
      </div>
    </main>
  )
        }
