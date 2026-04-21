'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const SUPABASE_URL = 'https://oejctbtkqsyxjpgnljac.supabase.co'
const SUPABASE_KEY = 'sb_publishable_rsHcUSNFJ6CuGc2_zDtvlA_8CCHXhUo'

const PAYOUTS = {
  LS: { name: 'Lesotho', currency: 'M', methods: ['M-Pesa', 'EcoCash'] },
  ZA: { name: 'South Africa', currency: 'R', methods: ['FNB eWallet', 'Capitec Pay', 'Bank EFT'] },
  BW: { name: 'Botswana', currency: 'P', methods: ['Orange Money', 'MyZaka'] }
}

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [referrals, setReferrals] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const savedEmail = localStorage.getItem('mulla_email')
    if(savedEmail) {
      fetchDashboard(savedEmail)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchDashboard = async (userEmail) => {
    try {
      const userRes = await fetch(`${SUPABASE_URL}/rest/v1/leads?email=eq.${userEmail}&select=*`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      })
      const userArray = await userRes.json()
      const user = userArray[0]
      setUserData(user)

      if(user) {
        const refRes = await fetch(`${SUPABASE_URL}/rest/v1/leads?referred_by=eq.${user.referral_code}&select=email,created_at,points`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        })
        const refData = await refRes.json()
        setReferrals(refData || [])

        const ordersRes = await fetch(`${SUPABASE_URL}/rest/v1/products?user_email=eq.${userEmail}&select=*`, {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        })
        const ordersData = await ordersRes.json()
        setOrders(ordersData || [])
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  const applyAsAgent = async (userEmail) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?email=eq.${userEmail}`, {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          agent_status: 'pending',
          agent_applied_at: new Date().toISOString()
        })
      })
      if(res.ok) {
        setUserData({...userData, agent_status: 'pending'})
        alert('Agent application submitted! We review in 24hrs. Check dashboard for update.')
      }
    } catch {
      alert('Error. Try again.')
    }
  }

  const copyReferralLink = () => {
    const link = `https://mulla-base-ls.vercel.app?ref=${userData.referral_code}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if(loading) {
    return (
      <div style={{backgroundColor: '#fffbeb', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{color: '#c2410c', fontSize: '18px', fontWeight: '700'}}>Loading your Base...</div>
      </div>
    )
  }

  if(!userData) {
    return (
      <div style={{backgroundColor: '#fffbeb', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'}}>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: '20px', color: '#7c2d12', fontWeight: '800', marginBottom: '16px'}}>Join MullaBase First</div>
          <Link href="/" style={{backgroundColor: '#ea580c', color: 'white', padding: '14px 24px', borderRadius: '10px', fontWeight: '800', textDecoration: 'none', display: 'inline-block'}}>
            Go to Homepage
          </Link>
        </div>
      </div>
    )
  }

  const currency = PAYOUTS[userData.country_code || 'LS'].currency
  const referralLink = `https://mulla-base-ls.vercel.app?ref=${userData.referral_code}`

  return (
    <div style={{backgroundColor: '#fffbeb', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <header style={{padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1152px', margin: '0 auto'}}>
        <Link href="/" style={{color: '#9a3412', fontWeight: '800', fontSize: '22px', textDecoration: 'none'}}>
          Mulla<span style={{color: '#ea580c'}}>Base</span>
        </Link>
        <Link href="/store" style={{fontSize: '14px', backgroundColor: '#ffedd5', color: '#c2410c', padding: '8px 16px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none'}}>
          Store →
        </Link>
      </header>

      <section style={{padding: '24px', maxWidth: '600px', margin: '0 auto'}}>
        <h1 style={{fontSize: '28px', fontWeight: '900', color: '#7c2d12', marginBottom: '8px'}}>
          Your Base
        </h1>
        <div style={{fontSize: '14px', color: '#9a3412', marginBottom: '24px'}}>
          {userData.email}
        </div>

        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '2px solid #fed7aa', marginBottom: '16px'}}>
          <div style={{backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '10px', border: '1px solid #bbf7d0'}}>
            <div style={{fontSize: '12px', color: '#15803d', fontWeight: '700', marginBottom: '4px'}}>MULLA BALANCE</div>
            <div style={{fontSize: '32px', fontWeight: '900', color: '#15803d'}}>{userData
