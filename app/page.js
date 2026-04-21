'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [user, setUser] = useState(null)
  const [points, setPoints] = useState(0)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [showJoin, setShowJoin] = useState(false)
  const [email, setEmail] = useState('')
  const [joinLoading, setJoinLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkUser()
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkUser()
    })
    return () => authListener?.subscription?.unsubscribe()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    if (user) {
      const { data } = await supabase.from('leads').select('points').eq('email', user.email).single()
      setPoints(data?.points || 0)
    }
    setLoading(false)
  }

  const handleJoin = async () => {
    if (!email) return
    setJoinLoading(true)
    const ref = new URLSearchParams(window.location.search).get('ref')
    const { data: existing } = await supabase.from('leads').select('id').eq('email', email).single()
    if (existing) {
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (!error) alert('Check your email for login link!')
    } else {
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (!error) {
        await supabase.from('leads').insert({ email, points: 20, referred_by: ref || null })
        alert('Check your email! You got 20 points FREE!')
        if (ref) {
          await supabase.rpc('increment', { row_id: ref, table_name: 'leads', column_name: 'points', x: 10 })
        }
      }
    }
    setJoinLoading(false)
    setShowJoin(false)
  }

  const addPoints = async (amount, action) => {
    if (!user) return setShowJoin(true)
    const newPoints = points + amount
    setPoints(newPoints)
    await supabase.from('leads').update({ points: newPoints }).eq('email', user.email)
    alert(`+${amount} points! ${action}`)
  }

  const handleCashOut = async () => {
    if (points < 200) return alert('Need 200 points to cash out M20')
    const phone = prompt('Enter M-Pesa/EFT number for M20 payout:')
    if (!phone) return
    await supabase.from('leads').update({ points: points - 200 }).eq('email', user.email)
    await supabase.from('payouts').insert({ email: user.email, amount: 20, phone, status: 'pending' })
    setPoints(points - 200)
    alert('Cashout requested! M20 sent within 24hrs')
  }

  const copyLink = () => {
    const link = `https://mulla-base-ls.vercel.app?ref=${user?.id || 'guest'}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const openWhatsApp = (number, message) => {
    if (!user) return setShowJoin(true)
    const text = encodeURIComponent(`${message}\n\nMy MullaBase ID: ${user.id}\nEmail: ${user.email}`)
    window.open(`https://wa.me/${number}?text=${text}`, '_blank')
  }

  if (loading) return <div style={{padding: '40px', textAlign: 'center', backgroundColor: '#fffbeb', minHeight: '100vh'}}>Loading MullaBase...</div>

  return (
    <div style={{backgroundColor: '#fffbeb', minHeight: '100vh', padding: '24px 16px', fontFamily: 'system-ui'}}>
      <div style={{maxWidth: '480px', margin: '0 auto'}}>
        <div style={{textAlign: 'center', marginBottom: '24px'}}>
          <h1 style={{fontSize: '32px', fontWeight: '900', color: '#7c2d12', margin: '0'}}>MullaBase</h1>
          <p style={{color: '#9a3412', fontSize: '16px', margin: '4px 0 0'}}>Instant Marketplace | Spend & Earn</p>
          <p style={{color: '#b45309', fontSize: '14px', margin: '8px 0 0'}}>Join 2000+ Africans earning M10/R10/P10</p>
        </div>
        {!user ? (
          <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
            <button onClick={() => setShowJoin(true)} style={{width: '100%', backgroundColor: '#ea580c', color: 'white', padding: '16px', borderRadius: '8px', fontWeight: '900', fontSize: '18px', border: 'none', cursor: 'pointer'}}>Join & get 20 points FREE!</button>
            <p style={{textAlign: 'center', fontSize: '12px', color: '#9a3412', marginTop: '8px'}}>No password. Magic link to your email.</p>
          </div>
        ) : (
          <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
              <span style={{color: '#7c2d12', fontWeight: '700'}}>Your Points</span>
              <span style={{fontSize: '28px', fontWeight: '900', color: '#ea580c'}}>{points}</span>
            </div>
            <div style={{backgroundColor: '#f3f4f6', height: '8px', borderRadius: '4px', marginBottom: '12px'}}>
              <div style={{backgroundColor: '#ea580c', height: '8px', borderRadius: '4px', width: `${Math.min(points/2, 100)}%`}}></div>
            </div>
            <p style={{fontSize: '12px', color: '#9a3412', marginBottom: '12px'}}>100 points = M10/R10/P10. Cash out at 200pts.</p>
            {points >= 200 && (
              <button onClick={handleCashOut} style={{width: '100%', backgroundColor: '#16a34a', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: '700', border: 'none', cursor: 'pointer'}}>Cash Out M20 Now</button>
            )}
            <button onClick={() => router.push('/dashboard')} style={{width: '100%', backgroundColor: '#7c2d12', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: '700', border: 'none', cursor: 'pointer', marginTop: '8px'}}>View Full Dashboard →</button>
          </div>
        )}
        <div style={{marginBottom: '20px'}}>
          <button onClick={() => openWhatsApp('26658421001', 'Hi! I want MASTERCLASS ACCOMMODATION.')} style={{width: '100%', backgroundColor: '#ea580c', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: '900', fontSize: '16px', border: 'none', marginBottom: '12px', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>MASTERCLASS ACCOMMODATION ~ Book Now</button>
          <button onClick={() => openWhatsApp('26657031600', 'Hi! I want to buy from MULLABASE STORE.')} style={{width: '100%', backgroundColor: '#dc2626', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: '900', fontSize: '16px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>MULLABASE STORE ~ Shop Now</button>
        </div>
        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
          <h2 style={{fontSize: '18px', fontWeight: '800', color: '#7c2d12', marginBottom: '12px'}}>Earn Points Now</h2>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px'}}>
            <button onClick={() => router.push('/store')} style={{backgroundColor: '#ea580c', color: 'white', padding: '14px 8px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}>Templates</button>
            <button onClick={() => addPoints(5, 'Backend services viewed')} style={{backgroundColor: '#7c3aed', color: 'white', padding: '14px 8px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}>Backend</button>
            <button onClick={() => router.push('/store?filter=airtime')} style={{backgroundColor: '#0ea5e9', color: 'white', padding: '14px 8px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}>Airtime</button>
            <button onClick={() => addPoints(10, 'SIM Registration interest logged')} style={{backgroundColor: '#16a34a', color: 'white', padding: '14px 8px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}>SIM Registration</button>
          </div>
          <button onClick={() => router.push('/store?tab=sell')} style={{width: '100%', backgroundColor: '#dc2626', color: 'white', padding: '14px 8px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer', marginTop: '12px'}}>Sell - Open Your Shop</button>
        </div>
        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '12px', marginBottom: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
          <h2 style={{fontSize: '18px', fontWeight: '800', color: '#7c2d12', marginBottom: '8px'}}>Refer & Earn</h2>
          <p style={{fontSize: '14px', color: '#9a3412', marginBottom: '12px'}}>Get 10 points per friend who joins</p>
          <button onClick={copyLink} style={{width: '100%', backgroundColor: copied ? '#16a34a' : '#ea580c', color: 'white', padding: '14px', borderRadius: '8px', fontWeight: '700', border: 'none', cursor: 'pointer'}}>{copied ? 'Copied!' : 'Copy Link'}</button>
        </div>
        <div style={{backgroundColor: '#7c2d12', padding: '20px', borderRadius: '12px', textAlign: 'center'}}>
          <h2 style={{fontSize: '20px', fontWeight: '900', color: 'white', marginBottom: '8px'}}>Ready to sell on MullaBase?</h2>
          <button onClick={() => router.push('/store')} style={{backgroundColor: '#ea580c', color: 'white', padding: '14px 24px', borderRadius: '8px', fontWeight: '900', fontSize: '
