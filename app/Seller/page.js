'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Seller() {
  const [profile, setProfile] = useState(null)
  const [saleAmount, setSaleAmount] = useState('')
  const [withdrawAmount, setWithdrawAmount] = useState('')

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return window.location.href = '/'
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
      setProfile(data)
    }
    init()
  }, [])

  const recordSale = async () => {
    const amount = parseInt(saleAmount)
    if (!amount) return
    await supabase.from('profiles').update({ store_cash_in: profile.store_cash_in + amount }).eq('id', profile.id)
    await supabase.from('transactions').insert([{ user_id: profile.id, type: 'STORE_SALE', amount, reference: 'SALE' }])
    alert('Sale recorded')
    window.location.reload()
  }

  const withdrawSalary = async () => {
    const amount = parseInt(withdrawAmount)
    if (!amount || amount > profile.store_cash_in - profile.store_cash_out) return alert('Not enough store balance')
    await supabase.from('profiles').update({ 
      store_cash_out: profile.store_cash_out + amount,
      store_payouts: profile.store_payouts + amount 
    }).eq('id', profile.id)
    await supabase.from('transactions').insert([{ user_id: profile.id, type: 'STORE_WITHDRAW', amount, reference: 'SALARY' }])
    alert('Salary withdrawn from YOUR store')
    window.location.reload()
  }

  if (!profile) return <div className="p-4">Loading...</div>

  return (
    <main className="min-h-screen bg-white text-black text-xs">
      <div className="border-b border-black p-2 flex justify-between">
        <span className="font-bold">SELLER HQ</span>
        <a href="/dashboard" className="border border-black px-2">User View</a>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="border border-black p-3">
          <div className="font-bold mb-2">MY STORE LEDGER</div>
          <div>CASH IN (Sales): M{profile.store_cash_in}</div>
          <div>CASH OUT: M{profile.store_cash_out}</div>
          <div className="font-bold">BALANCE: M{profile.store_cash_in - profile.store_cash_out}</div>
          <div>PAYOUT (Salary): M{profile.store_payouts}</div>
          <div className="mt-2 text-">*If you sell zero, you earn zero. You manage your business.</div>
        </div>
        <div className="border border-black p-3">
          <div className="font-bold mb-2">RECORD SALE</div>
          <input type="number" placeholder="Sale amount M" value={saleAmount} onChange={e=>setSaleAmount(e.target.value)} className="w-full border border-black p-1 mb-1"/>
          <button onClick={recordSale} className="w-full bg-black text-white p-1 mb-2">ADD CASH IN</button>
          <div className="font-bold mb-1">WITHDRAW SALARY</div>
          <input type="number" placeholder="Amount M" value={withdrawAmount} onChange={e=>setWithdrawAmount(e.target.value)} className="w-full border border-black p-1 mb-1"/>
          <button onClick={withdrawSalary} className="w-full bg-black text-white p-1">PAYOUT FROM STORE</button>
        </div>
        <div className="col-span-2 border border-black p-3">
          <div>Points: {profile.mullapoints} | Referral: {profile.referral_code}</div>
        </div>
      </div>
    </main>
  )
      }
