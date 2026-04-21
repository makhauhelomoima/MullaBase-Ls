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
            <div style={{fontSize: '32px', fontWeight: '900', color: '#15803d'}}>{userData.points || 0} points</div>
            <div style={{fontSize: '13px', color: '#16a34a', marginTop: '4px'}}>
              = {currency}{Math.floor((userData.points || 0) / 10)}
            </div>
          </div>
        </div>

        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '2px solid #fed7aa', marginBottom: '16px'}}>
          <div style={{fontSize: '16px', color: '#7c2d12', fontWeight: '800', marginBottom: '12px'}}>Referral HQ</div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px'}}>
            <div style={{backgroundColor: '#ffedd5', padding: '12px', borderRadius: '8px', textAlign: 'center'}}>
              <div style={{fontSize: '24px', fontWeight: '900', color: '#c2410c'}}>{referrals.length}</div>
              <div style={{fontSize: '12px', color: '#9a3412', fontWeight: '600'}}>Friends Joined</div>
            </div>
            <div style={{backgroundColor: '#ffedd5', padding: '12px', borderRadius: '8px', textAlign: 'center'}}>
              <div style={{fontSize: '24px', fontWeight: '900', color: '#c2410c'}}>{referrals.length * 10}</div>
              <div style={{fontSize: '12px', color: '#9a3412', fontWeight: '600'}}>Points Earned</div>
            </div>
          </div>
          <div style={{fontSize: '12px', color: '#c2410c', fontWeight: '700', marginBottom: '8px'}}>YOUR LINK</div>
          <div style={{fontSize: '13px', color: '#7c2d12', marginBottom: '12px', wordBreak: 'break-all', backgroundColor: '#ffedd5', padding: '8px', borderRadius: '6px'}}>
            {referralLink}
          </div>
          <button
            onClick={copyReferralLink}
            style={{width: '100%', backgroundColor: copied? '#16a34a' : '#ea580c', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}
          >
            {copied? 'Copied!' : 'Copy Link - 10pts per friend'}
          </button>
        </div>

        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '2px solid #fed7aa', marginBottom: '16px'}}>
          <div style={{fontSize: '16px', color: '#7c2d12', fontWeight: '800', marginBottom: '8px'}}>
            MullaBase Agent
          </div>
          <div style={{fontSize: '13px', color: '#9a3412', marginBottom: '12px', lineHeight: '1.5'}}>
            Register SIM cards, onboard stores, earn {currency}10 per action. Build your team.
          </div>
          
          {userData.agent_status === 'approved' ? (
            <div>
              <div style={{backgroundColor: '#dcfce7', padding: '12px', borderRadius: '8px', marginBottom: '12px'}}>
                <div style={{fontSize: '14px', color: '#15803d', fontWeight: '700'}}>Agent Active</div>
                <div style={{fontSize: '12px', color: '#15803d'}}>Agent ID: MB-{userData.id}</div>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '12px'}}>
                <div style={{backgroundColor: '#ffedd5', padding: '12px', borderRadius: '8px', textAlign: 'center'}}>
                  <div style={{fontSize: '20px', fontWeight: '900', color: '#c2410c'}}>{userData.sims_registered || 0}</div>
                  <div style={{fontSize: '11px', color: '#9a3412', fontWeight: '600'}}>SIMs Registered</div>
                </div>
                <div style={{backgroundColor: '#ffedd5', padding: '12px', borderRadius: '8px', textAlign: 'center'}}>
                  <div style={{fontSize: '20px', fontWeight: '900', color: '#c2410c'}}>{userData.stores_onboarded || 0}</div>
                  <div style={{fontSize: '11px', color: '#9a3412', fontWeight: '600'}}>Stores Onboarded</div>
                </div>
              </div>
              <button
                onClick={() => alert('SIM Registration form: Coming next update!')}
                style={{width: '100%', backgroundColor: '#16a34a', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer', marginBottom: '8px'}}
              >
                Register New SIM +100pts
              </button>
              <button
                onClick={() => alert('Store Onboard form: Coming next update!')}
                style={{width: '100%', backgroundColor: '#dc2626', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}
              >
                Onboard Store +150pts
              </button>
            </div>
          ) : userData.agent_status === 'pending' ? (
            <div style={{backgroundColor: '#fef3c7', padding: '12px', borderRadius: '8px'}}>
              <div style={{fontSize: '14px', color: '#92400e', fontWeight: '700'}}>Application Pending</div>
              <div style={{fontSize: '12px', color: '#92400e'}}>We review in 24hrs. You will earn {currency}50 signup bonus.</div>
            </div>
          ) : (
            <div>
              <div style={{fontSize: '12px', color: '#c2410c', fontWeight: '600', marginBottom: '8px'}}>AGENT BENEFITS:</div>
              <div style={{fontSize: '13px', color: '#7c2d12', marginBottom: '12px', lineHeight: '1.6'}}>
                - {currency}10 per SIM registered<br/>
                - {currency}15 per store onboarded<br/>
                - {currency}50 signup bonus<br/>
                - Leaderboards + prizes
              </div>
              <button
                onClick={() => applyAsAgent(userData.email)}
                style={{width: '100%', backgroundColor: '#ea580c', color: 'white', padding: '12px', borderRadius: '8px', fontWeight: '700', border: 'none', fontSize: '14px', cursor: 'pointer'}}
              >
                Apply to be Agent
              </button>
            </div>
          )}
        </div>

        <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '2px solid #fed7aa', marginBottom: '16px'}}>
          <div style={{fontSize: '16px', color: '#7c2d12', fontWeight: '800', marginBottom: '12px'}}>Your Store</div>
          {orders.length === 0? (
            <div>
              <div style={{fontSize: '14px', color: '#9a3412', marginBottom: '12px'}}>No products yet</div>
              <Link href="/store?tab=sell" style={{backgroundColor: '#dc2626', color: 'white', padding: '12px 20px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', display: 'inline-block', fontSize: '14px'}}>
                List Your First Product
              </Link>
            </div>
          ) : (
            <div>
              <div style={{fontSize: '14px', color: '#9a3412', marginBottom: '8px'}}>{orders.length} Products Listed</div>
              {orders.slice(0, 3).map((order, i) => (
                <div key={i} style={{fontSize: '13px', color: '#7c2d12', padding: '8px', backgroundColor: '#ffedd5', borderRadius: '6px', marginBottom: '6px'}}>
                  {order.name} - {order.points}pts
                </div>
              ))}
            </div>
          )}
        </div>

        {userData.cashout_requested && (
          <div style={{backgroundColor: '#fef3c7', padding: '16px', borderRadius: '12px', border: '2px solid #fcd34d', marginBottom: '16px'}}>
            <div style={{fontSize: '14px', color: '#92400e', fontWeight: '700', marginBottom: '4px'}}>Cashout Pending</div>
            <div style={{fontSize: '13px', color: '#92400e'}}>
              {currency}20 via {userData.payout_method} to {userData.phone}
            </div>
          </div>
        )}

        <Link href="/" style={{backgroundColor: '#fffbeb', color: '#c2410c', padding: '12px 24px', borderRadius: '10px', fontWeight: '700', textDecoration: 'none', display: 'block', textAlign: 'center', border: '2px solid #fed7aa', fontSize: '14px', boxSizing: 'border-box'}}>
          ← Back to MullaBase
        </Link>
      </section>
    </div>
  )
    }
