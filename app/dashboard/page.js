'use client'
export const dynamic = 'force-dynamic'
import { useEffect, useState } from 'react'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showAgent, setShowAgent] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('sb-oejctbtkqsyxjpgnljac-auth-token')
      if (!token) {
        window.location.href = '/'
        return
      }

      const parsed = JSON.parse(token)
      const userId = parsed?.user?.id

      if (!userId) {
        window.location.href = '/'
        return
      }

      const res = await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${userId}&select=*`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      })

      const data = await res.json()
      if (data[0]) {
        setUser(data[0])
      }
      setLoading(false)
    }
    getUser()
  }, [])

  if (loading) return <div style={{ padding: 40 }}>Loading your Base...</div>
  if (!user) return <div style={{ padding: 40 }}>No user found. <a href="/">Sign up</a></div>

  return (
    <div style={{ padding: 40, fontFamily: 'system-ui', maxWidth: 600, margin: '0 auto' }}>
      <h1>Welcome to Your Base</h1>
      <div style={{ background: '#f9fafb', padding: 20, borderRadius: 8, marginTop: 20 }}>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Mulla Points:</strong> {user.points}</p>
        <p><strong>Admin:</strong> {user.is_admin? 'Yes 👑' : 'No'}</p>
      </div>

      <button
        onClick={() => setShowAgent(!showAgent)}
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #f97316, #ea580c)',
          border: 'none',
          cursor: 'pointer',
          fontSize: 24,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        🤖
      </button>

      {showAgent && (
        <div style={{
          position: 'fixed',
          bottom: 90,
          right: 20,
          width: 320,
          background: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: 12,
          padding: 16,
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
        }}>
          <div style={{fontSize: '16px', color: '#7c2d12', fontWeight: '800', marginBottom: '8px'}}>
            MullaBase Agent
          </div>
          <div style={{fontSize: '13px', color: '#9a3412', marginBottom: '12px', lineHeight: '1.5'}}>
            Welcome {user.email}! You have {user.points} Mulla Points. Start building your empire.
          </div>
          <button
            onClick={() => setShowAgent(false)}
            style={{width: '100%', padding: '8px', background: '#f97316', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer'}}
          >
            Got it
          </button>
        </div>
      )}
    </div>
  )
            }
