'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Agent() {
  const [profile, setProfile] = useState(null)
  const [sim, setSim] = useState({ customer_name: '', customer_phone: '', sim_number: '' })

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return window.location.href = '/'
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
    }
    init()
  }, [])

  const registerSim = async () => {
    if (!sim.customer_name || !sim.customer_phone || !sim.sim_number) return alert('Fill all fields')
    await supabase.from('sim_fulfillments').insert([{ ...sim, agent_id: profile.id }])
    await supabase.from('profiles').update({ sims_fulfilled: profile.sims_fulfilled + 1 }).eq('id', profile.id)
    alert('SIM registered. 10 points earned when approved.')
    window.location.reload()
  }

  if (!profile) return <div className="p-4">Loading...</div>

  return (
    <main className="min-h-screen bg-white text-black text-xs">
      <div className="border-b border-black p-2 flex justify-between">
        <span className="font-bold">AGENT HQ</span>
        <a href="/dashboard" className="border border-black px-2">User View</a>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="border border-black p-3">
          <div className="font-bold mb-2">MY AGENT STATS</div>
          <div>Name: {profile.name}</div>
          <div>Phone: {profile.phone}</div>
          <div>Location: {profile.location}</div>
          <div>Points: {profile.mullapoints}</div>
          <div>SIMs Fulfilled: {profile.sims_fulfilled}</div>
          <div>Payouts: M{profile.total_payouts}</div>
        </div>
        <div className="border border-black p-3">
          <div className="font-bold mb-2">REGISTER SIM</div>
          <input placeholder="Customer Name" value={sim.customer_name} onChange={e=>setSim({...sim, customer_name:e.target.value})} className="w-full border border-black p-1 mb-1"/>
          <input placeholder="Customer Phone" value={sim.customer_phone} onChange={e=>setSim({...sim, customer_phone:e.target.value})} className="w-full border border-black p-1 mb-1"/>
          <input placeholder="SIM Number" value={sim.sim_number} onChange={e=>setSim({...sim, sim_number:e.target.value})} className="w-full border border-black p-1 mb-1"/>
          <button onClick={registerSim} className="w-full bg-black text-white p-1">SUBMIT & EARN 10 POINTS</button>
        </div>
      </div>
    </main>
  )
      }
