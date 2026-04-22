'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function Vote() {
  const [polls, setPolls] = useState([])
  const [userId, setUserId] = useState(null)
  useEffect(() => { supabase.auth.getUser().then(({data:{user}}) => { if (!user) return window.location.href = '/'; setUserId(user.id); supabase.from('polls').select('*').eq('active', true).then(({data}) => setPolls(data||[])) }) }, [])
  const vote = async (pollId, choice) => { const { error } = await supabase.from('votes').insert([{ poll_id: pollId, user_id: userId, choice }]); if (error) return alert('Already voted'); await supabase.from('profiles').update({ mullapoints: supabase.rpc('increment', { x: 5 }) }).eq('id', userId); alert('Voted! +5 points'); window.location.reload() }
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">VOTE & EARN</span><a href="/dashboard" className="border border-black px-2">Back</a></div>
      <div className="p-4 space-y-2">
        {polls.length === 0 && <div className="border border-black p-4 text-center">No active polls</div>}
        {polls.map(p => <div key={p.id} className="border border-black p-3"><div className="font-bold mb-2">{p.question}</div><div className="grid grid-cols-2 gap-1">{[p.option_a,p.option_b,p.option_c,p.option_d].filter(Boolean).map(o => <button key={o} onClick={()=>vote(p.id,o)} className="border border-black p-2 hover:bg-gray-100">{o}</button>)}</div><div className="text-xs mt-1">Reward: {p.reward_points} points</div></div>)}
      </div>
    </main>
  )
                                                                                                   }
