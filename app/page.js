'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY
        },
        body: JSON.stringify({ email, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.msg || 'Try again in a moment.')
        setLoading(false)
        return
      }

      const userId = data.user?.id
      if (userId) {
        await fetch(`${SUPABASE_URL}/rest/v1/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            id: userId,
            email: email,
            points: 1000,
            is_admin: false
          })
        })
      }

      window.location.href = '/dashboard'
    } catch (err) {
      setMessage('Network error. Try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: 40, fontFamily: 'system-ui', maxWidth: 400, margin: '0 auto' }}>
      <h1>Join MullaBase</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: 10, margin: '10px 0' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: 10, margin: '10px 0' }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', padding: 12, background: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          {loading? 'Creating Base...' : 'Join MullaBase'}
        </button>
      </form>
      {message && <p style={{ color: 'red', marginTop: 10 }}>{message}</p>}
    </div>
  )
    }
