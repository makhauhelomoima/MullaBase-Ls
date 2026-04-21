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

  const btn = {
    backgroundColor: '#ea580c',
    color: 'white',
    padding: '14px 8px',
    borderRadius: '8px',
    fontWeight: '700',
    border: 'none',
    fontSize: '14px',
    cursor: 'pointer'
  }

  const mainBtn = {
    width: '100%',
    backgroundColor: '#ea580c',
    color: 'white',
    padding: '16px',
    borderRadius: '8px',
    fontWeight: '900',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer'
  }

  const greenBtn = {
    width: '100%',
    backgroundColor: '#16a34a',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer'
  }

  const darkBtn = {
    width: '100%',
    backgroundColor: '#7c2d12',
    color: 'white',
    padding: '12px',
    borderRadius: '8px',
    fontWeight: '700',
    border: 'none',
    cursor: 'pointer',
    marginTop: '8px'
  }

  useEffect(() => {
    checkUser()
    const { data: authListener } = 
      supabase.auth.onAuthStateChange(() => {
        checkUser()
      })
    return () => 
      authListener?.subscription?.unsubscribe()
  }, [])

  const checkUser = async () => {
    const { data: { user } } = 
      await supabase.auth.getUser()
    setUser(user)
    if (user) {
      const { data } = await supabase
        .from('leads')
        .select('points')
        .eq('email', user.email)
        .single()
      setPoints(data?.points || 0)
    }
    setLoading(false)
  }

  const handleJoin = async () => {
    if (!email) return
    setJoinLoading(true)
    const ref = new URLSearchParams(
      window.location.search
    ).get('ref')
    const { data: existing } = await supabase
      .from('leads')
      .select('id')
      .eq('email', email)
      .single()
    if (existing) {
      const { error } = await supabase.auth
        .signInWithOtp({ email })
      if (!error) alert('Check your email!')
    } else {
      const { error } = await supabase.auth
        .signInWithOtp({ email })
      if (!error) {
        await supabase.from('leads').insert({
          email,
          points: 20,
          referred_by: ref || null
        })
        alert('Check email! 20 points FREE!')
        if (ref) {
          await supabase.rpc('increment', {
            row_id: ref,
            table_name: 'leads',
            column_name: 'points',
            x: 10
          })
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
    await supabase.from('leads')
      .update({ points: newPoints })
      .eq('email', user.email)
    alert(`+${amount} points! ${action}`)
  }

  const handleCashOut
