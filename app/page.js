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
    
    // Check if email exists
    const { data: existing } = await supabase.from('leads').select('id').eq('email', email).single()
    
    if (existing) {
      // Login existing user
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (!error) alert('Check your email for login link!')
    } else {
      // Create new user
      const { error } = await supabase.auth.signInWithOtp({ email })
      if (!error) {
        await supabase.from('leads').insert({ email, points: 20, referred_by: ref || null })
        alert('Check your email! You got 20 points FREE!')
        // Reward referrer
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

  const copyLink = () =>
