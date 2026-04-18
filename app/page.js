"use client"
import { useState, useEffect } from 'react'

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
          points: 20
        })
      })
      if (res.status === 201) {
        const data = await res.json()
        setStatus('Welcome to the Base')
        setEmail('')
        setCount(prev => prev + 1)
        setUserData(data[0])
        localStorage.setItem('mulla_email', email)
      } else if (res.status === 409) {
        setStatus('You are already on the list!')
        setEmail('')
        fetchUser(email)
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
          cashout_requested: true
        })
      })
      if(res.ok) {
        setUserData({...userData, cashout_requested: true, phone: phone, payout_method: payoutMethod})
        alert(`Cashout requested! We will send ${PAYOUTS[country].currency}20 via ${payoutMethod} within 24hrs.`)
      }
    } catch {
      alert('Error. Try again.')
    }
  }

  const currency = userData? PAYOUTS[userData.country_code || 'LS'].currency : PAYOUTS[country].currency

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

      <section style={{padding: '60px 24px', maxWidth: '1152px', margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center'}}>
          <div>
            <h1 style={{fontSize: '42px', fontWeight: '900', color: '#7c2d12', marginBottom: '20px', lineHeight: '1.1'}}>
              Africa's Phone.<br/>
              Africa's Opinions.<br/>
              <span style={{color: '#ea580c'}}>Africa's Mulla.</span>
            </h1>
            <p style={{fontSize: '17px', color: '#9a3412', marginBottom: '32px', lineHeight: '1.6'}}>
              Tired of not available in your country? MullaBase pays users across Africa to vote, shop, and share.
              Starting in Lesotho, SA and Botswana. No VPN bans. No waiting lists.
            </p>

            <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '2px solid #fed7aa', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.1)'}}>
              <div style={{fontSize: '14px', fontWeight: '700', color: '#c2410c', marginBottom: '12px', textAlign: 'center'}}>
                JOIN {count.toLocaleString()}+ AFRICANS EARNING
              </div>

              {!userData? (
                <form onSubmit={handleSubmit}>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{width: '100%', padding: '14px 16px', borderRadius: '10px', border: '2px solid #fed7aa', marginBottom: '12px', fontSize: '16px', boxSizing: 'border-box', backgroundColor: 'white'}}
                  >
                    <option value="LS">Lesotho</option>
                    <option value="ZA">South Africa</option>
                    <option value="BW">Botswana</option>
                  </select>
                  <input
                    type="email"
