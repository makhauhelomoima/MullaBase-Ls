'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Home() {
  const [user, setUser] = useState(null)
  const [points, setPoints] = useState(0)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authMsg, setAuthMsg] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user)
        loadPoints(data.user.id)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user)
        loadPoints(session.user.id)
      } else {
        setUser(null)
        setPoints(0)
      }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function loadPoints(userId) {
    const { data } = await supabase
     .from('profiles')
     .select('points')
     .eq('id', userId)
     .single()
    setPoints(data?.points || 0)
  }

  async function signUp() {
    if (!email || !password) return setAuthMsg('Enter email and password')
    setAuthMsg('Creating account...')
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setAuthMsg('Error: ' + error.message)
    else setAuthMsg('Check your email to confirm')
  }

  async function signIn() {
    if (!email || !password) return setAuthMsg('Enter email and password')
    setAuthMsg('Signing in...')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setAuthMsg('Error: ' + error.message)
    else setAuthMsg('')
  }

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
      <div className="text-[#0066FF] font-bold">Loading MullaBase...</div>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#FFF9F0] text-black">
      <div className="max-w-md mx-auto p-4">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-[#0066FF]">MullaBase</h1>
            <p className="text-xs text-gray-600">Earn. Trade. Cash out.</p>
          </div>
          {user && (
            <div className="text-right">
              <div className="text-xs text-gray-600">{user.email}</div>
              <div className="text-lg font-bold text-[#00C851]">{points} pts</div>
            </div>
          )}
        </div>

        {!user ? (
          /* Auth Form */
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 mb-6">
            <h2 className="font-bold mb-3 text-[#1E293B] text-center">Join MullaBase</h2>
            
            {authMsg && (
              <div className={`p-2 rounded mb-3 text-sm text-center font-bold ${
                authMsg.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-[#0066FF]'
              }`}>
                {authMsg}
              </div>
            )}
            
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded border border-gray-300 text-sm"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded border border-gray-300 text-sm"
              />
              <button
                onClick={signIn}
                className="w-full bg-[#0066FF] text-white p-3 rounded-lg font-bold"
              >
                Sign In
              </button>
              <button
                onClick={signUp}
                className="w-full bg-[#00C851] text-white p-3 rounded-lg font-bold"
              >
                Create Account
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Economy Buttons - THE CORE LOOP */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <a href="/earn" className="bg-[#0066FF] text-white p-4 rounded-xl font-bold text-center shadow-lg hover:bg-blue-700">
                <div className="text-2xl mb-1">🎁</div>
                <div className="text-sm">Earn</div>
                <div className="text-xs opacity-80">Daily + Offers</div>
              </a>
              
              <a href="/store" className="bg-[#DC2626] text-white p-4 rounded-xl font-bold text-center shadow-lg hover:bg-red-700">
                <div className="text-2xl mb-1">🛒</div>
                <div className="text-sm">Store</div>
                <div className="text-xs opacity-80">Buy from sellers</div>
              </a>
              
              <a href="/sell" className="bg-[#EA580C] text-white p-4 rounded-xl font-bold text-center shadow-lg hover:bg-orange-700">
                <div className="text-2xl mb-1">💰</div>
                <div className="text-sm">Sell</div>
                <div className="text-xs opacity-80">Earn 90%</div>
              </a>
              
              <a href="/withdraw" className="bg-[#00C851] text-white p-4 rounded-xl font-bold text-center shadow-lg hover:bg-green-700">
                <div className="text-2xl mb-1">💸</div>
                <div className="text-sm">Withdraw</div>
                <div className="text-xs opacity-80">Cash out</div>
              </a>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 mb-4">
              <h2 className="font-bold mb-3 text-[#1E293B]">Your Balance</h2>
              <div className="text-center py-4">
                <div className="text-5xl font-bold text-[#00C851] mb-2">{points}</div>
                <div className="text-sm text-gray-600">Points Available</div>
                <div className="text-xs text-gray-500 mt-1">100 pts = M10</div>
              </div>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 mb-4">
              <h2 className="font-bold mb-3 text-[#1E293B]">How MullaBase Works</h2>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="text-[#0066FF] font-bold">1.</div>
                  <div><span className="font-bold">Earn:</span> Claim daily rewards, complete offers, refer friends</div>
                </div>
                <div className="flex gap-3">
                  <div className="text-[#DC2626] font-bold">2.</div>
                  <div><span className="font-bold">Spend:</span> Buy airtime, data, products in the Store</div>
                </div>
                <div className="flex gap-3">
                  <div className="text-[#EA580C] font-bold">3.</div>
                  <div><span className="font-bold">Sell:</span> List your own products, earn 90% per sale</div>
                </div>
                <div className="flex gap-3">
                  <div className="text-[#00C851] font-bold">4.</div>
                  <div><span className="font-bold">Cash Out:</span> Withdraw earnings via EFT or Mpesa</div>
                </div>
              </div>
            </div>

            {/* Sign Out */}
            <button
              onClick={signOut}
              className="w-full bg-gray-200 text-gray-700 p-2 rounded-lg text-sm font-bold"
            >
              Sign Out
            </button>
          </>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-xs text-gray-500">
          MullaBase © 2026 • Exodus 14:14
        </div>
      </div>
    </main>
  )
                    }
