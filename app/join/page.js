'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function JoinPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [iccid, setIccid] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [profile, setProfile] = useState(null)
  const [user, setUser] = useState(null)
  const router = useRouter()

  // Check if user is logged in + fetch profile
  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('points, referral_code, phone, cashout_points')
          .eq('id', user.id)
          .single()
        setProfile(data)
        setPhone(data?.phone || '')
      }
    }
    getProfile()
  }, [])

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) setMessage(error.message)
      else router.push('/store')
    } else {
      // SIGN UP
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) {
        setMessage(error.message)
      } else {
        setMessage('Check your email to confirm signup!')
        // Trigger already created profile with 20 points
      }
    }
    setLoading(false)
  }

  const updatePhone = async () => {
    if (!user) return
    setLoading(true)
    const { error } = await supabase
      .from('profiles')
      .update({ phone, iccid })
      .eq('id', user.id)
    
    if (error) setMessage(error.message)
    else {
      setMessage('Phone + ICCID saved!')
      setProfile({ ...profile, phone })
    }
    setLoading(false)
  }

  const copyReferral = () => {
    const link = `https://mullabase.com/join?ref=${profile.referral_code}`
    navigator.clipboard.writeText(link)
    setMessage('Referral link copied!')
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    router.refresh()
  }

  // If logged in, show dashboard
  if (user && profile) {
    return (
      <div className="min-h-screen bg-orange-50 p-4">
        <div className="max-w-md mx-auto pt-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-orange-900">MullaBase</h1>
            <button onClick={handleLogout} className="text-sm text-orange-700">Logout</button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
            <p className="text-sm text-orange-700 text-center">Your Balance</p>
            <p className="text-5xl font-bold text-orange-900 text-center my-2">
              {profile.points}
            </p>
            <p className="text-xs text-orange-600 text-center">100 points = M10</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg mb-6">
            <p className="text-sm font-semibold text-orange-900 mb-3">Earn 10 Points Per Friend</p>
            <div className="bg-orange-50 p-3 rounded-lg">
              <p className="text-xs text-orange-700">Your Referral Link:</p>
              <p className="text-sm font-mono text-orange-900 break-all">
                mullabase.com/join?ref={profile.referral_code}
              </p>
            </div>
            <button 
              onClick={copyReferral}
              className="mt-3 w-full bg-orange-100 text-orange-900 py-2 rounded-lg font-semibold text-sm"
            >
              Copy Link
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <p className="text-sm font-semibold text-orange-900 mb-3">Complete Profile</p>
            <input
              type="tel"
              placeholder="Phone: +266 5000 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-orange-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="text"
              placeholder="SIM ICCID: 8926600000000000000"
              value={iccid}
              onChange={(e) => setIccid(e.target.value)}
              className="w-full p-3 border border-orange-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              onClick={updatePhone}
              disabled={loading}
              className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Phone + SIM'}
            </button>
          </div>

          {message && (
            <p className="mt-4 text-center text-sm text-orange-700 bg-orange-100 p-2 rounded-lg">
              {message}
            </p>
          )}

          <Link href="/store">
            <button className="mt-6 w-full bg-orange-900 text-white py-4 rounded-xl font-bold">
              Go to Store →
            </button>
          </Link>
        </div>
      </div>
    )
  }

  // If not logged in, show login/signup form
  return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-orange-900 text-center mb-2">
          {isLogin ? 'Welcome Back' : 'Join MullaBase'}
        </h1>
        <p className="text-orange-700 text-center mb-6 text-sm">
          {isLogin ? 'Login to spend your points' : 'Sign up + get 20 points free'}
        </p>

        <form onSubmit={handleAuth}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-orange-200 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-orange-200 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold disabled:opacity-50"
          >
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Sign Up + Get 20 Points'}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-orange-700 bg-orange-100 p-2 rounded-lg">
            {message}
          </p>
        )}

        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-orange-700 text-sm"
        >
          {isLogin ? "Don't have account? Sign up" : 'Already have account? Login'}
        </button>
      </div>
    </div>
  )
        }
