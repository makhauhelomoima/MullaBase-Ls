'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// YOUR ADMIN EMAIL - ALREADY SET
const ADMIN_EMAIL = 'makhauhelomoima@gmail.com'

export default function Admin() {
  const [user, setUser] = useState(null)
  const [withdrawals, setWithdrawals] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return window.location.href = '/'
      if (data.user.email !== ADMIN_EMAIL) return window.location.href = '/'
      setUser(data.user)
      loadWithdrawals()
    })
  }, [])

  async function loadWithdrawals() {
    setLoading(true)
    setMsg('')
    const { data, error } = await supabase
     .from('withdrawals')
     .select('*')
     .order('created_at', { ascending: false })
    
    if (error) setMsg('Error loading: ' + error.message)
    if (data) setWithdrawals(data)
    setLoading(false)
  }

  async function approveWithdraw(w) {
    if (!confirm(`Pay M${w.amount_cash} to ${w.phone} via ${w.method}? This will deduct ${w.amount_points} points from ${w.email}.`)) return
    
    setMsg('Processing payment...')

    // 1. Check current points
    const { data: profile, error: profileError } = await supabase
     .from('profiles')
     .select('points')
     .eq('id', w.user_id)
     .single()

    if (profileError) return setMsg('Error finding user: ' + profileError.message)
    if (!profile || profile.points < w.amount_points) {
      return setMsg(`Error: User only has ${profile?.points || 0} points, needs ${w.amount_points}`)
    }

    // 2. Deduct points
    const { error: pointsError } = await supabase
     .from('profiles')
     .update({ points: profile.points - w.amount_points })
     .eq('id', w.user_id)

    if (pointsError) return setMsg('Error deducting points: ' + pointsError.message)

    // 3. Mark withdrawal as paid
    const { error: statusError } = await supabase
     .from('withdrawals')
     .update({ status: 'paid' })
     .eq('id', w.id)

    if (statusError) return setMsg('Error updating status: ' + statusError.message)

    setMsg(`Paid M${w.amount_cash} to ${w.phone}. ${w.amount_points} points deducted from ${w.email}.`)
    loadWithdrawals()
  }

  async function rejectWithdraw(w) {
    if (!confirm(`Reject withdrawal of M${w.amount_cash} to ${w.phone}? No points will be deducted.`)) return
    
    const { error } = await supabase
     .from('withdrawals')
     .update({ status: 'rejected' })
     .eq('id', w.id)

    if (error) return setMsg('Error: ' + error.message)
    setMsg(`Rejected withdrawal for ${w.email}. No points deducted.`)
    loadWithdrawals()
  }

  if (!user) return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
      <div className="text-[#DC2626] font-bold">Checking admin access...</div>
    </div>
  )

  if (user.email !== ADMIN_EMAIL) return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
      <div className="text-center">
        <div className="text-[#DC2626] font-bold text-2xl mb-2">Access Denied</div>
        <div className="text-sm text-gray-600">Only makhauhelomoima@gmail.com can access this page</div>
        <a href="/" className="text-[#0066FF] underline text-sm mt-4 inline-block">← Go Home</a>
      </div>
    </div>
  )

  const pending = withdrawals.filter(w => w.status === 'pending')
  const totalPending = pending.reduce((sum, w) => sum + w.amount_cash, 0)
  const totalPaid = withdrawals.filter(w => w.status === 'paid').reduce((sum, w) => sum + w.amount_cash, 0)

  return (
    <main className="min-h-screen bg-[#FFF9F0] text-black">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-[#DC2626]">MullaBase Admin</h1>
          <div className="text-right">
            <div className="text-xs text-gray-600">{user.email}</div>
            <a href="/" className="text-[#0066FF] text-sm font-bold">← Home</a>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 border border-gray-200 text-center">
            <div className="text-xs text-gray-600">Pending</div>
            <div className="text-3xl font-bold text-[#EA580C]">{pending.length}</div>
            <div className="text-xs text-[#EA580C]">M{totalPending.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 border border-gray-200 text-center">
            <div className="text-xs text-gray-600">Total Paid Out</div>
            <div className="text-3xl font-bold text-[#00C851]">M{totalPaid.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 border border-gray-200 text-center">
            <div className="text-xs text-gray-600">Total Requests</div>
            <div className="text-3xl font-bold text-[#1E293B]">{withdrawals.length}</div>
          </div>
        </div>

        {msg && (
          <div className={`p-3 rounded-lg mb-4 text-sm font-bold text-center ${
            msg.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-[#00C851]'
          }`}>
            {msg}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-[#1E293B]">Withdrawal Requests</h2>
            <button onClick={loadWithdrawals} className="text-xs text-[#0066FF] font-bold">Refresh</button>
          </div>
          
          {loading ? (
            <p className="text-center text-gray-500 py-8">Loading...</p>
          ) : withdrawals.length === 0 ? (
            <p className="text-center text-gray-500 py-8">No withdrawal requests yet</p>
          ) : (
            <div className="space-y-3">
              {withdrawals.map(w => (
                <div key={w.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-lg text-[#1E293B]">M{w.amount_cash}</div>
                      <div className="text-xs text-gray-600">{w.amount_points} points via {w.method.toUpperCase()}</div>
                    </div>
                    <span className={`font-bold px-3 py-1 rounded text-xs ${
                      w.status === 'pending' ? 'bg-[#EA580C] text-white' :
                      w.status === 'paid' ? 'bg-[#00C851] text-white' :
                      'bg-gray-600 text-white'
                    }`}>
                      {w.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="text-sm space-y-1 mb-3 bg-gray-50 p-2 rounded">
                    <div><span className="font-bold">Pay to:</span> {w.phone}</div>
                    <div><span className="font-bold">User:</span> {w.email}</div>
                    <div><span className="font-bold">Requested:</span> {new Date(w.created_at).toLocaleString()}</div>
                  </div>

                  {w.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => approveWithdraw(w)}
                        className="flex-1 bg-[#00C851] text-white p-2 rounded-lg font-bold text-sm hover:bg-green-700"
                      >
                        Mark as Paid
                      </button>
                      <button
                        onClick={() => rejectWithdraw(w)}
                        className="flex-1 bg-[#DC2626] text-white p-2 rounded-lg font-bold text-sm hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-xs text-gray-700">
          <div className="font-bold mb-2 text-[#EA580C]">Admin Workflow:</div>
          <ol className="list-decimal list-inside space-y-1">
            <li>User requests withdrawal → Shows here as PENDING</li>
            <li>You send money manually via M-Pesa/Airtime to the phone number shown</li>
            <li>Click "Mark as Paid" → System deducts points + changes status to PAID</li>
            <li>User sees "PAID" in their /withdraw history</li>
            <li>If fraud: Click "Reject" → No points deducted, status = REJECTED</li>
          </ol>
        </div>
      </div>
    </main>
  )
  }
