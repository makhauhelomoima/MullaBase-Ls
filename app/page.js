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

  const buttonStyle = {
    backgroundColor: '#ea580c',
    color: 'white',
    padding: '14px 8px',
    borderRadius: '8px',
    fontWeight: '700',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer'
  }

  const ctaButton = {
    backgroundColor: '#ea580c',
    color: 'white',
    padding: '14px 24px',
    borderRadius: '8px',
    fontWeight: '900',
    fontSize: '16px',
    border: 'none',
    cursor: 'pointer'
  }

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
            <button 
              onClick={() => setShowJoin(true)} 
              style={{
                width: '100%', 
                backgroundColor: '#ea580c', 
                color: 'white', 
                padding: '16px', 
                borderRadius: '8px', 
                fontWeight: '900', 
                fontSize: '18px', 
                border: 'none', 
                cursor: 'pointer'
              }}
            >
              Join & get 20 points FREE!
  </
