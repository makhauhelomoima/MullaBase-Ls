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
    // Get real points from profiles table
    const { data: profile } = await supabase
     .from('profiles')
     .select('points')
     .eq('id', userId)
     .single()

    setPoints(profile?.points || 0)

    // Get withdrawal history
    const { data: withdrawData } = await supabase
     .from('withdrawals')
     .select('*')
     .eq('user_id', userId)
     .order('created_at', { ascending: false })

    if (withdrawData) setHistory(withdrawData)
  }

  const cashValue = (amount / 100) * 10 // 100 points = M10
  const canWithdraw = amount >= 100 && amount <= points && amount % 100 === 0 && phone.length >= 8

  async function handleWithdraw() {
    if (!canWithdraw) {
      if (amount < 100) return setMsg('Minimum 100 points')
      if (amount > points) return setMsg('Not enough points')
      if (amount % 100!== 0) return setMsg('Use multiples of 100: 100, 200, 300...')
      if (phone.length < 8) return setMsg('Enter valid phone number')
      return
    }

    setLoading(true)
    setMsg('')

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

    if (error) {
      setMsg(error.message)
    } else {
      setMsg('Withdrawal requested! We’ll pay within 24 hours.')
      setAmount(100)
      setPhone('')
      loadData(user.id)
    }
    setLoading(false)
  }

  if (!user) return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
      <div className="text-[#0066FF] font-bold">Loading...</div>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#FFF9F0] text-black">
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <a href="/" className="text-[#0066FF] text-sm font-bold">← Home</a>
          <div className="text-xs text-gray-600">{user.email}</div>
        </div>

        <h1 className="text-3xl font-bold text-[#0066FF] mb-4">Withdraw Cash</h1>

        <div className="bg-white rounded-xl shadow-lg p-5 mb-4 border border-gray-200">
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
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-[#00C851] focus:outline-none"
              />
              <div className="text-xs text-[#EA580C] mt-1">
                You’ll receive: M{cashValue.toFixed(2)}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold">Payment Method</label>
              <select
                value={method}
                onChange={e=>setMethod(e.target.value)}
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-[#00C851] focus:outline-none"
              >
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
                className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-[#00C851] focus:outline-none"
              />
            </div>

            <button
              onClick={handleWithdraw}
              disabled={!canWithdraw || loading}
              className="w-full bg-[#00C851] text-white p-3 rounded-lg font-bold disabled:bg-gray-400 hover:bg-green-700"
            >
              {loading? 'Processing...' : `Withdraw M${cashValue.toFixed(2)}`}
            </button>

            {msg && <p className={`text-xs text-center font-bold ${msg.includes('requested')? 'text-[#00C851]' : 'text-red-600'}`}>{msg}</p>}

            <div className="text-xs text-center text-gray-500 space-y-1">
              <p>Min: 100 points | 100 pts = M10</p>
              <p>Processed within 24 hours</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
          <h2 className="font-bold mb-3 text-[#1E293B]">Withdrawal History</h2>
          {history.length === 0? (
            <p className="text-xs text-gray-500 text-center py-4">No withdrawals yet</p>
          ) : (
            <div className="space-y-2">
              {history.map(w => (
                <div key={w.id} className="border-b border-gray-100 pb-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">M{w.amount_cash} via {w.method}</span>
                    <span className={`font-bold px-2 py-1 rounded ${
                      w.status === 'pending'? 'bg-[#EA580C] text-white' :
                      w.status === 'paid'? 'bg-[#00C851] text-white' :
                      'bg-red-600 text-white'
                    }`}>
                      {w.status}
                    </span>
                  </div>
                  <div className="text-gray-500 mt-1">
                    {w.amount_points} pts to {w.phone}
                  </div>
                  <div className="text-gray-400 text-[10px]">
                    {new Date(w.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-3 text-xs text-center text-gray-500 mt-4">
          <a href="/privacy" className="underline">Privacy</a> | <a href="/terms" className="underline">Terms</a>
        </div>
      </div>
    </main>
  )
         }
