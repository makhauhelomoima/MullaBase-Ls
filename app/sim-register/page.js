'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function SimRegister() {
  const [p, setP] = useState(null)
  const [form, setForm] = useState({ full_name: '', id_number: '', phone_number: '', network: 'Vodacom', location: '' })
  const [mySims, setMySims] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return window.location.href = '/'
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      const { data: sims } = await supabase.from('sim_registrations').select('*').eq('user_id', user.id).order('created_at', {ascending: false})
      setP(prof); setMySims(sims||[]); setLoading(false)
    }
    init()
  }, [])

  const submitSim = async () => {
    if (!form.full_name||!form.id_number||!form.phone_number||!form.location) return alert('Fill all fields')
    const { error } = await supabase.from('sim_registrations').insert([{...form, user_id: p.id}])
    if (error) return alert(error.message)
    alert('SIM Registration submitted! You will get 20 points when approved.')
    window.location.reload()
  }

  if (loading) return <div className="p-4">Loading...</div>

  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between">
        <span className="font-bold">SIM REGISTRATION</span>
        <a href="/dashboard" className="border border-black px-2">Back to Dashboard</a>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="border border-black p-3">
          <div className="font-bold mb-2">REGISTER NEW SIM - EARN 20 POINTS</div>
          <input placeholder="Full Name as on ID" value={form.full_name} onChange={e=>setForm({...form, full_name:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"/>
          <input placeholder="ID Number" value={form.id_number} onChange={e=>setForm({...form, id_number:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"/>
          <input placeholder="Phone Number: 58xxxxxx" value={form.phone_number} onChange={e=>setForm({...form, phone_number:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs"/>
          <select value={form.network} onChange={e=>setForm({...form, network:e.target.value})} className="w-full border border-black p-1 mb-1 text-xs">
            <option>Vodacom</option><option>Econet</option><option>Telecom Lesotho</option>
          </select>
          <input placeholder="Location: Maseru" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} className="w-full border border-black p-1 mb-2 text-xs"/>
          <button onClick={submitSim} className="w-full bg-black text-white p-1">SUBMIT REGISTRATION</button>
          <div className="text-xs mt-2">*You get 20 points when admin approves</div>
        </div>
        <div className="border border-black p-3">
          <div className="font-bold mb-2">MY SIM REGISTRATIONS</div>
          {mySims.length === 0 && <div className="text-xs">No SIMs registered yet</div>}
          {mySims.map(s => <div key={s.id} className="border-t border-black pt-1 mt-1 text-xs">
            <div className="font-bold">{s.phone_number} - {s.network}</div>
            <div>Status: {s.status}</div>
            <div>Points: {s.points_awarded}</div>
            <div>{new Date(s.created_at).toLocaleDateString()}</div>
          </div>)}
        </div>
      </div>
    </main>
  )
    }
