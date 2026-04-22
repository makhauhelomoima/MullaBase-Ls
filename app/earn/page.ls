'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Earn() {
  const [user, setUser] = useState(null)
  const [points, setPoints] = useState(0)
  const [streak, setStreak] = useState(0)
  const [lastClaim, setLastClaim] = useState(null)
  const [canClaim, setCanClaim] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return window.location.href = '/'
      setUser(data.user)
      loadProfile(data.user.id)
    })
  }, [])

  useEffect(() => {
    if (!lastClaim || canClaim) return
    const timer = setInterval(() => {
      const last = new Date(lastClaim)
      const next = new Date(last.getTime() + 24 * 60 * 60 * 1000)
      const now = new Date()
      const diff = next - now
      
      if (diff <= 0) {
        setCanClaim(true)
        setTimeLeft('')
        clearInterval(timer)
      } else {
        const h = Math.floor(diff / 1000 / 60 / 60)
        const m = Math.floor((diff / 1000 / 60) % 60)
        const s = Math.floor((diff / 1000) % 60)
        setTimeLeft(`${h}h ${m}m ${s}s`)
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [lastClaim, canClaim])

  async function loadProfile(userId) {
    const { data } = await supabase
     .from('profiles')
     .select('points, last_daily_claim, daily_streak')
     .eq('id', userId)
     .single()
    
    if (data) {
      setPoints(data.points || 0)
      setStreak(data.daily_streak || 0)
      setLastClaim(data.last_daily_claim)
      
      if (!data.last_daily_claim) {
        setCanClaim(true)
      } else {
        const last = new Date(data.last_daily_claim)
        const now = new Date()
        const hours = (now - last) / 1000 / 60 / 60
        setCanClaim(hours >= 24)
      }
    }
  }

  async function claimDaily() {
    if (!canClaim) return setMsg('Come back when timer hits 0')
    setLoading(true)
    
    const reward = 50 // 50 points = M5 daily
    let newStreak = 1
    
    // Check if streak continues
    if (lastClaim) {
      const last = new Date(lastClaim)
      const now = new Date()
      const hours = (now - last) / 1000 / 60 / 60
      if (hours < 48) newStreak = streak + 1 // claimed within 48hrs = streak continues
    }
    
    const { error } = await supabase
     .from('profiles')
     .update({ 
       points: points + reward,
       last_daily_claim: new Date().toISOString(),
       daily_streak: newStreak
     })
     .eq('id', user.id)

    if (error) {
      setMsg('Error: ' + error.message)
    } else {
      setMsg(`+${reward} points! Streak: ${newStreak} days`)
      setPoints(points + reward)
      setStreak(newStreak)
      setCanClaim(false)
      setLastClaim(new Date().toISOString())
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
          <div className="text-right">
            <div className="text-xs text-gray-600">{user.email}</div>
            <div className="text-lg font-bold text-[#00C851]">{points} pts</div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#0066FF] mb-2">Earn Points</h1>
        <p className="text-sm text-gray-600 mb-4">Daily rewards • Offers • Referrals</p>

        {msg && (
          <div className={`p-3 rounded-lg mb-4 text-sm font-bold text-center ${
            msg.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-[#00C851]'
          }`}>
            {msg}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-[#1E293B]">Daily Check-in</h2>
            <div className="text-xs font-bold text-[#EA580C]">🔥 {streak} day streak</div>
          </div>
          
          <div className="text-center py-4">
            <div className="text-5xl mb-2">🎁</div>
            <div className="text-2xl font-bold text-[#00C851] mb-1">+50 Points</div>
            <div className="text-xs text-gray-500 mb-4">= M5 free every 24hrs</div>
            
            {!canClaim && timeLeft && (
              <div className="text-sm text-gray-600 mb-3">
                Next claim in: <span className="font-bold text-[#DC2626]">{timeLeft}</span>
              </div>
            )}
            
            <button
              onClick={claimDaily}
              disabled={!canClaim || loading}
              className="w-full bg-[#0066FF] text-white p-3 rounded-lg font-bold disabled:bg-gray-400 hover:bg-blue-700"
            >
              {loading ? 'Claiming...' : canClaim ? 'Claim Daily Reward' : 'Claimed Today'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
          <h2 className="font-bold mb-3 text-[#1E293B]">More Ways to Earn</h2>
          <div className="space-y-2 text-sm">
            <a href="/offers" className="block p-3 bg-[#FFF9F0] rounded-lg font-bold text-[#EA580C] border border-orange-100">
              📋 Complete Offers → 100-500 pts each
            </a>
            <a href="/refer" className="block p-3 bg-[#FFF9F0] rounded-lg font-bold text-[#EA580C] border border-orange-100">
              👥 Refer Friends → 100 pts per signup
            </a>
            <a href="/store" className="block p-3 bg-[#FFF9F0] rounded-lg font-bold text-[#DC2626] border border-red-100">
              🛒 Spend in Store → Buy airtime, data, more
            </a>
            <a href="/sell" className="block p-3 bg-[#FFF9F0] rounded-lg font-bold text-[#EA580C] border border-orange-100">
              💰 Sell Products → Earn 90% per sale
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
