'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Dashboard() {
  const [profile, setProfile] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [cashoutAmount, setCashoutAmount] = useState('')
  const [cashoutMethod, setCashoutMethod] = useState('Mpesa')

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return window.location.href = '/'
      const { data: p } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      const { data: t } = await supabase.from('transactions').select('*').eq('user_id', user.id).order('created_at', {ascending: false}).limit(5)
      setProfile(p); setTransactions(t||[])
    }
    init()
  }, [])

  const handleCashout = async () => {
    const amount = parseInt(cashoutAmount)
    if (!amount || amount < 100) return alert('Min 100 points to cashout')
    const { data, error } = await supabase.rpc('cashout_points', { p_amount: amount, p_method: cashoutMethod })
    if (error) return alert(error.message)
    if (data.success) {
      alert(`Success! ${amount} points sent via ${cashoutMethod}. New balance: ${data.new_balance}`)
      window.location.reload()
    } else {
      alert(data.error)
    }
  }

  if (!profile) return <div className="p-4">Loading...</div>

  return (
    <main className="min-h-screen bg-white text-black text-xs">
      <div className="border-b border-black p-2 flex justify-between">
        <span className="font-bold">MullaBase</span>
        <a href="/engage" className="border border-black px-2">Engage</a>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="border border-black p-3">
          <div className="font-bold mb-2">MY PROFILE</div>
          <div>Name: {profile.name}</div>
          <div>Points: {profile.mullapoints}</div>
          <div>Referral Code: {profile.referral_code}</div>
          <div>Referral Link: mullabase.app/join?ref={profile.referral_code}</div>
          <div>Total Cashed Out: {profile.total_cashouts} pts</div>
        </div>
        <div className="border border-black p-3">
          <div className="font-bold mb-2">CASHOUT POINTS</div>
          <input type="number" placeholder="Amount min 100" value={cashoutAmount} onChange={e=>setCashoutAmount(e.target.value)} className="w-full border border-black p-1 mb-1"/>
          <select value={cashoutMethod} onChange={e=>setCashoutMethod(e.target.value)} className="w-full border border-black p-1 mb-1">
            <option>Mpesa</option><option>E-Wallet</option><option>Airtime</option>
          </select>
          <button onClick={handleCashout} className="w-full bg-black text-white p-1">CASHOUT NOW</button>
          <div className="mt-2 text-">*Proof: Check transactions below</div>
        </div>
        <div className="col-span-2 border border-black p-3">
          <div className="font-bold mb-2">TRANSACTION HISTORY - PROOF OF PAYOUTS</div>
          {transactions.map(t => (
            <div key={t.id} className="border-t border-black pt-1 mt-1">
              {t.type} | {t.amount} pts | {t.method} | {t.status} | {new Date(t.created_at).toLocaleDateString()}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
