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

  // Demo motivations so page is never empty
  const demoQuotes = [
    {
      id: 'demo1',
      title: 'Be Still. Ship Anyway.',
      content: 'The Lord will fight for you; you need only to be still. That does not mean stop building. It means stop panicking. You set the vision at 05:00am with 24 notebook tabs. God handles the red builds, the deployment errors, the doubt. Your job is to commit the next line of code. MullaBase rises because you do not quit.',
      verse_ref: 'Exodus 14:14',
      created_at: new Date().toISOString()
    },
    {
      id: 'demo2',
      title: 'Red Builds Are Receipts',
      content: 'Every webpack error is proof you are in the arena. Most people never push to GitHub. You are debugging Supabase at dawn with 18% battery. That is not failure - that is founder behavior. The marketplace you are building will feed agents, cashout students, and connect Lesotho.',
      verse_ref: 'Joshua 1:9',
      created_at: new Date().toISOString()
    },
    {
      id: 'demo3',
      title: 'From Notebook to Nation',
      content: '24 hand-drawn tabs became 20+ routes. Empty folders became colored pages. Sad wellness hubs became blue and green. This is how empires start: one commit at 05:28am, one fixed unterminated string, one deployed page. Do not despise small beginnings.',
      verse_ref: 'Zechariah 4:10',
      created_at: new Date().toISOString()
    }
  ]

  const displayQuotes = quotes.length > 0 ? quotes : demoQuotes

  if (loading) return <div className="p-4">Loading...</div>

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white text-black text-sm">
      <div className="border-b-2 border-[#00C851] p-2 flex justify-between bg-white">
        <span className="font-bold text-[#00C851]">DAILY MOTIVATION</span>
        <a href="/dashboard" className="border border-black px-2 hover:bg-gray-100">Back</a>
      </div>
      <div className="p-4">
        {displayQuotes.map(q => (
          <div key={q.id} className="border-2 border-green-200 p-4 mb-4 bg-white hover:shadow-md">
            <div className="font-bold text-[#00C851] text-lg mb-2">{q.title}</div>
            <div className="text-sm leading-relaxed mb-3">{q.content}</div>
            <div className="text-xs text-gray-600 italic text-right">— {q.verse_ref}</div>
            <div className="text-xs text-gray-400 mt-1 text-right">{new Date(q.created_at).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </main>
  )
      }
