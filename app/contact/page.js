'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function Contact() {
  const [msg, setMsg] = useState('')
  const send = async () => { if (!msg) return alert('Write message'); await supabase.from('contact_messages').insert([{ message: msg }]); alert('Message sent'); setMsg('') }
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">CONTACT SUPPORT</span><a href="/dashboard" className="border border-black px-2">Back</a></div>
      <div className="p-4 max-w-sm mx-auto border border-black">
        <textarea placeholder="Your message" value={msg} onChange={e=>setMsg(e.target.value)} className="w-full border border-black p-2 min-h-32"/>
        <button onClick={send} className="w-full bg-black text-white p-2 mt-2">SUBMIT</button>
      </div>
    </main>
  )
    }
