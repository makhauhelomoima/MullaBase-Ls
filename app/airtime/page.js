'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function Airtime() {
  const [p, setP] = useState(null)
  const [amt, setAmt] = useState('')
  const [num, setNum] = useState('')
  useEffect(() => { supabase.auth.getUser().then(async ({data:{user}}) => { if (!user) return window.location.href = '/'; const {data} = await supabase.from('profiles').select('*').eq('id', user.id).single(); setP(data) }) }, [])
  const buy = async () => { const a = parseInt(amt); if (!a || a < 5) return alert('Min M5'); if (!num) return alert('Enter number'); if (p.mullapoints < a) return alert('Not enough points'); await supabase.from('profiles').update({ mullapoints: p.mullapoints - a }).eq('id', p.id); await supabase.from('transactions').insert([{ user_id: p.id, type: 'CASHOUT_POINTS', amount: a, method: 'Airtime', reference: `AIRTIME-${num}` }]); alert(`M${a} airtime sent to ${num}`); window.location.reload() }
  if (!p) return <div className="p-4">Loading...</div>
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">BUY AIRTIME</span><a href="/dashboard" className="border border-black px-2">Back</a></div>
      <div className="p-4 max-w-sm mx-auto border border-black">
        <div className="mb-2">Your Points: {p.mullapoints}</div>
        <input type="number" placeholder="Amount M" value={amt} onChange={e=>setAmt(e.target.value)} className="w-full border border-black p-1 mb-1"/>
        <input placeholder="Phone: 58xxxxxx" value={num} onChange={e=>setNum(e.target.value)} className="w-full border border-black p-1 mb-2"/>
        <button onClick={buy} className="w-full bg-black text-white p-1">BUY AIRTIME</button>
        <div className="text-xs mt-2">*Deducts from your points balance</div>
      </div>
    </main>
  )
  }
