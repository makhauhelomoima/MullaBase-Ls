'use client'
import { useState } from 'react'
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
  const router = useRouter()

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setMessage(error.message)
      else router.push('/store')
    } else {
      // SIGN UP
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setMessage(error.message)
      } else {
        // Update profile with phone + sim after signup
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ phone, sim_iccid: iccid })
          .eq('id', data.user.id)
        
        if (profileError) setMessage('Account created but SIM save failed: ' + profileError.message)
        else {
          setMessage('Account created! Check email to confirm. You got 20 points FREE.')
          setTimeout(() => router.push('/store'), 2000)
        }
      }
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      <div className="p-4">
        <Link href="/" className="text-[#B45309] font-bold">← MullaBase</Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <div className="flex mb-6">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 font-bold ${isLogin? 'text-[#B45309] border-b-2 border-[#B45309]' : 'text-gray-400'}`}
            >
              SIGN-IN
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 font-bold ${!isLogin? 'text-[#B45309] border-b-2 border-[#B45309]' : 'text-gray-400'}`}
            >
              CREATE ACCOUNT
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded"
              required 
            />
            
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded"
              required 
            />

            {!isLogin && (
              <>
                <input 
                  type="tel" 
                  placeholder="Phone: +266 5xxx xxxx" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border rounded"
                  required 
                />
                <input 
                  type="text" 
                  placeholder="SIM ICCID: 8927..." 
                  value={iccid} 
                  onChange={(e) => setIccid(e.target.value)}
                  className="w-full p-3 border rounded"
                  required 
                />
                <p className="text-xs text-gray-500">SIM Registration = 20 points FREE</p>
              </>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#B45309] text-white py-3 rounded font-bold disabled:bg-gray-400"
            >
              {loading? 'Loading...' : isLogin? 'SIGN-IN' : 'CREATE ACCOUNT + GET 20 POINTS'}
            </button>

            {message && <p className="text-sm text-center text-red-600">{message}</p>}
          </form>

          <div className="text-center mt-6 text-sm text-gray-500">
            *Lesotho's pride. Africa's Treasure!*
          </div>
        </div>
      </div>
    </div>
  )
  }
