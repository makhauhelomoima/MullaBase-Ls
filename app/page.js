"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'

const SUPABASE_URL = 'https://oejctbtkqsyxjpgnljac.supabase.co'
const SUPABASE_KEY = 'sb_publishable_rsHcUSNFJ6CuGc2_zDtvlA_8CCHXhUo'

const PAYOUTS = {
  LS: { name: 'Lesotho', currency: 'M', methods: ['M-Pesa', 'EcoCash'] },
  ZA: { name: 'South Africa', currency: 'R', methods: ['FNB eWallet', 'Capitec Pay', 'Bank EFT'] },
  BW: { name: 'Botswana', currency: 'P', methods: ['Orange Money', 'MyZaka'] }
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('LS')
  const [phone, setPhone] = useState('')
  const [payoutMethod, setPayoutMethod] = useState('M-Pesa')
  const [status, setStatus] = useState('')
  const [count, setCount] = useState(2000)
  const [userData, setUserData] = useState(null)
  const [showJoinForm, setShowJoinForm] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/leads?select=id`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'count=exact'
      }
    }).then(res => {
      const total = res.headers.get('content-range')?.split('/')[1]
      if(total) setCount(2000 + parseInt(total))
    }).catch(() => {})
  }, [])

  useEffect(() => {
    const savedEmail = localStorage.getItem('mulla_email')
    if(savedEmail) fetchUser(savedEmail)

    const urlParams = new URLSearchParams(window.location.search)
    const ref = urlParams.get('ref')
    if(ref) localStorage.setItem('mulla_referrer', ref)
  }, [])

  useEffect(() => {
    setPayoutMethod(PAYOUTS[country].methods[0])
  }, [country])

  const fetchUser = async (userEmail) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?email=eq.${userEmail}&select=*`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      })
      const data = await res.json()
      if(data[0]) {
        setUserData(data[0])
        setCountry(data[0].country_code || 'LS')
      }
    } catch {}
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Joining...')
    const referrer = localStorage.getItem('mulla_referrer')
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          email: email,
          country: PAYOUTS[country].name,
          country_code: country,
          points: 20,
          referral_code: email.split('@')[0].replace(/[^a-z0-9]/gi, '').toLowerCase(),
          referred_by: referrer || null
        })
      })
      if (res.status === 201) {
        const data = await res.json()
        setStatus('Welcome to the Base')
        setEmail('')
        setCount(prev => prev + 1)
        setUserData(data[0])
        setShowJoinForm(false)
        localStorage.setItem('mulla_email', email)
        if(referrer) localStorage.removeItem('mulla_referrer')
      } else if (res.status === 409) {
        setStatus('You are already on the list!')
        setEmail('')
        fetchUser(email)
        setShowJoinForm(false)
        localStorage.setItem('mulla_email', email)
      } else {
        setStatus('Try again in a moment')
      }
    } catch (error) {
      setStatus('Check connection and try again')
    }
  }

  const handleCashout = async () => {
    if(!phone || phone.length < 8) {
      alert(`Enter valid ${payoutMethod} number`)
      return
    }
    if((userData.points || 0) < 200) {
      alert('Need 200 points to cash out')
      return
    }
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?email=eq.${userData.email}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone: phone,
          payout_method: payoutMethod,
          cashout_requested: true,
          points: (userData.points || 0) - 200
        })
      })
      if(res.ok) {
        setUserData({...userData, cashout_requested: true, phone: phone, payout_method: payoutMethod, points: (userData.points || 0) - 200})
        alert(`Cashout requested! We will send ${PAYOUTS[country].currency}20 via ${payoutMethod} within 24hrs. 200 points deducted.`)
      }
    } catch {
      alert('Error. Try again.')
    }
  }

  const handleMasterclassBooking = () => {
    if(!userData) {
      alert('Join MullaBase first to book')
      setShowJoinForm(true)
      return
    }
    const message = `Hi Masterclass! I found you on MullaBase. I want to book accommodation. My email: ${userData.email}. MullaBase ID: ${userData.id}`
    window.open(`https://wa.me/26658421001?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleMullaBaseStore = () => {
    if(!userData) {
      alert('Join MullaBase first to shop')
      setShowJoinForm(true)
      return
    }
    const message = `Hi! I found MullaBase Store on MullaBase. I want to see what you sell. My email: ${userData.email}. MullaBase ID: ${userData.id}`
    window.open(`https://wa.me/26657031600?text=${encodeURIComponent(message)}`, '_blank')
  }

  const addPoints = async (amount, reason) => {
    if(!userData) {
      alert('Join MullaBase first')
      setShowJoinForm(true)
      return
    }
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?email=eq.${userData.email}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          points: (userData.points || 0) + amount
        })
      })
      if(res.ok) {
        setUserData({...userData, points: (userData.points || 0) + amount})
        alert(`+${amount} points! ${reason}`)
      }
    } catch {
      alert('Error. Try again.')
    }
  }

  const copyReferralLink = () => {
    if(!userData) {
      setShowJoinForm(true)
      return
    }
    const link = `https://mulla-base-ls.vercel.app?ref=${userData.referral_code || userData.email.split('@')[0]}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const currency = userData? PAYOUTS[userData.country_code || 'LS'].currency : PAYOUTS[country].currency
  const referralLink = userData? `https://mulla-base-ls.vercel.app?ref=${userData.referral_code || userData.email.split('@')[0]}` : ''

  return (
    <div style={{backgroundColor: '#fffbeb', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <header style={{padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1152px', margin: '0 auto'}}>
        <div style={{color: '#9a3412', fontWeight: '800', fontSize: '22px'}}>
          Mulla<span style={{color: '#ea580c'}}>Base</span>
        </div>
        <div style={{fontSize: '12px', backgroundColor: '#ffedd5', color: '#c2410c', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', border: '1px solid #fed7aa'}}>
          Born in Lesotho. Open to Africa
        </div>
      </header>

      <section style={{padding: '40px 24px', maxWidth: '600px', margin: '0 auto', textAlign: 'center'}}>
        <h1 style={{fontSize: '36px', fontWeight: '900', color: '#7c2d12', marginBottom: '8px'}}>
          MullaBase
        </h1>
        <div style={{fontSize: '16px', color: '#9a3412', marginBottom: '4px'}}>
          Instant Marketplace | Spend & Earn
        </div>
        <div style={{fontSize: '15px', color: '#c2410c', fontWeight: '600', marginBottom: '32px'}}>
          Join & get 20 points FREE!
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '24px'}}>
          <button
            onClick={() => setShowJoinForm(true)}
            style={{backgroundColor: '#f97316', color: 'white', padding: '14px 8px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}
          >
            Join & get 20 points FREE! 🎁
          </button>

          <button
            onClick={handleMasterclassBooking}
            style={{backgroundColor: '#ea580c', color: 'white', padding: '14px 8px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}
          >
            MASTERCLASS ACCOMMODATION<br/>~ Book Now
          </button>

          <button
            onClick={handleMullaBaseStore}
            style={{backgroundColor: '#dc2626', color: 'white', padding: '14px 8px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}
          >
            MULLABASE STORE<br/>~ Shop Now
          </button>

          <button
            onClick={() => window.location.href = '/store'}
            style={{backgroundColor: '#ea580c', color: 'white', padding: '14px 8px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}
          >
            Templates
          </button>

          <button
            onClick={() => addPoints(5, 'Backend check-in')}
            style={{backgroundColor: '#ea580c', color: 'white', padding: '14px 8px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}
          >
            Backend
          </button>

          <button
            onClick={() => window.location.href = '/store?filter=airtime'}
            style={{backgroundColor: '#0f172a', color: 'white', padding: '14px 8px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}
          >
            Airtime
          </button>

          <button
            onClick={() => addPoints(10, 'SIM Registration interest logged')}
            style={{backgroundColor: '#16a34a', color: 'white', padding: '14px 8px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor:
