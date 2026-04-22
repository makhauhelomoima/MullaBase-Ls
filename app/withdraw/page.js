'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Withdraw() {
  const [user, setUser] = useState(null)
  const [points, setPoints] = useState(0)
  const [amount, setAmount] = useState(100)
  const [method, setMethod] = useState('mpesa')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [history, setHistory] = useState([])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return window.location.href = '/'
      setUser(data.user)
      loadData(data.user.id)
    })
  }, [])

  async function loadData(userId) {
    // Get points from profiles table - you’ll create this later
    // For now hardcode 20 for testing
    setPoints(20)
    
    const { data } = await supabase.from('withdrawals')
      .select('*').eq('user_id', userId).order('created_at', { ascending: false })
    if (data) setHistory(data)
  }

  const cashValue = (amount / 100) * 10 // 100 points = 10
  const canWithdraw = amount >= 100 && amount <= points && phone.length >= 8

  async function handleWithdraw() {
    if (!canWithdraw) return setMsg('Min 100 points. Check phone number.')
    setLoading(true)
    const { error } = await supabase.from('withdrawals').insert({
      user_id: user.id,
      email: user.email,
      amount_points: amount,
      amount_cash: cashValue,
      currency: 'LSL',
      method: method,
      phone: phone,
      status: 'pending'
    })
    if (error) setMsg(error.message)
    else {
      setMsg('Withdrawal requested! We’ll pay in 24 hours.')
      setAmount(100)
      setPhone('')
      loadData(user.id)
    }
    setLoading(false)
  }

  if (!user) return <div className="p-6 text-center">Loading...</div>

  return (
    <main className="min-h-screen bg-[#FFF9F0] text-black">
      <div className="max-w-md mx-auto p-4">
        <a href="/dashboard" className="text-[#0066FF] text-sm">← Back</a>
        <h1 className="text-3xl font-bold text-[#0066FF] my-4">Withdraw Cash</h1>
        
        <div className="bg-white rounded-xl shadow p-5 mb-4">
          <div className="text-center mb-4">
            <div className="text-sm text-gray-600">Your Balance</div>
            <div className="text-4xl font-bold text-[#00C851]">{points} pts</div>
            <div className="text-xs text-gray-500">= M{(points/10).toFixed(2)}</div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold">Points to Withdraw</label>
              <input 
                type="number" 
                value={amount} 
                onChange={e=>setAmount(Number(e.target.value))}
                min="100"
                step="100"
                className="w-full border-2 border-gray-300 p-3 rounded-lg"
              />
              <div className="text-xs text-[#EA580C]">You’ll receive: M{cashValue.toFixed(2)}</div>
            </div>

            <div>
              <label className="text-xs font-bold">Payment Method</label>
              <select value={method} onChange={e=>setMethod(e.target.value)} className="w-full border-2 border-gray-300 p-3 rounded-lg">
                <option value="mpesa">M-Pesa</option>
                <option value="airtime">Airtime</option>
                <option value="bank">Bank Transfer</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold">Phone / Account Number</label>
              <input 
                placeholder="58xxxxxx" 
                value={phone} 
                onChange={e=>setPhone(e.target.value)}
                className="w-full border-2 border-gray-300 p-3 rounded-lg"
              />
            </div>

            <button 
              onClick={handleWithdraw} 
              disabled={!canWithdraw || loading}
              className="w-full bg-[#00C851] text-white p-3 rounded-lg font-bold disabled:bg-gray-400"
            >
              {loading ? 'Processing...' : `Withdraw M${cashValue.toFixed(2)}`}
            </button>
            {msg && <p className="text-xs text-center text-red-600 font-bold">{msg}</p>}
            <p className="text-xs text-center text-gray-500">Min: 100 points. Processed in 24hrs.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="font-bold mb-3">History</h2>
          {history.length === 0 ? <p className="text-xs text-gray-500">No withdrawals yet</p> : 
            history.map(w => (
              <div key={w.id} className="border-b py-2 text-xs flex justify-between">
                <span>M{w.amount_cash} via {w.method}</span>
                <span className={`font-bold ${w.status === 'pending' ? 'text-[#EA580C]' : 'text-[#00C851]'}`}>{w.status}</span>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
  }
