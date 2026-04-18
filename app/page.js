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
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{width: '100%', padding: '14px 16px', borderRadius: '10px', border: '2px solid #fed7aa', marginBottom: '12px', fontSize: '16px', boxSizing: 'border-box'}}
                  />
                  <button
                    type="submit"
                    disabled={status === 'Joining...'}
                    style={{width: '100%', backgroundColor: status === 'Joining...'? '#fb923c' : '#ea580c', color: 'white', padding: '14px 24px', borderRadius: '10px', fontWeight: '800', border: 'none', fontSize: '16px', cursor: status === 'Joining...'? 'not-allowed' : 'pointer'}}
                  >
                    {status === 'Joining...'? 'Joining...' : `Claim Your Base + ${currency}2 Free`}
                  </button>
                </form>
              ) : (
                <div>
                  <div style={{backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '10px', marginBottom: '16px', border: '1px solid #bbf7d0'}}>
                    <div style={{fontSize: '12px', color: '#15803d', fontWeight: '700', marginBottom: '4px'}}>YOUR MULLA BALANCE</div>
                    <div style={{fontSize: '28px', fontWeight: '900', color: '#15803d'}}>{userData.points || 0} points</div>
                    <div style={{fontSize: '13px', color: '#16a34a', marginTop: '4px'}}>
                      {userData.points >= 200? `${currency}20 cashout unlocked!` : `${200 - (userData.points || 0)} points to ${currency}20`}
                    </div>
                  </div>

                  {userData.points >= 200 &&!userData.cashout_requested &&!userData.paid && (
                    <div>
                      <select
                        value={payoutMethod}
                        onChange={(e) => setPayoutMethod(e.target.value)}
                        style={{width: '100%', padding: '14px 16px', borderRadius: '10px', border: '2px solid #fed7aa', marginBottom: '12px', fontSize: '16px', boxSizing: 'border-box', backgroundColor: 'white'}}
                      >
                        {PAYOUTS[userData.country_code || 'LS'].methods.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <input
                        type="tel"
                        placeholder={payoutMethod === 'Bank EFT'? 'Account number' : 'Phone number'}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{width: '100%', padding: '14px 16px', borderRadius: '10px', border: '2px solid #fed7aa', marginBottom: '12px', fontSize: '16px', boxSizing: 'border-box'}}
                      />
                      <button
                        onClick={handleCashout}
                        style={{width: '100%', backgroundColor: '#16a34a', color: 'white', padding: '14px 24px', borderRadius: '10px', fontWeight: '800', border: 'none', fontSize: '16px', cursor: 'pointer'}}
                      >
                        Cash Out {currency}20 via {payoutMethod}
                      </button>
                    </div>
                  )}

                  {userData.cashout_requested &&!userData.paid && (
                    <div style={{backgroundColor: '#fef3c7', padding: '12px', borderRadius: '8px', fontSize: '14px', color: '#92400e', fontWeight: '600', textAlign: 'center'}}>
                      Cashout pending. We’ll send {currency}20 via {userData.payout_method} within 24hrs.
                    </div>
                  )}

                  {userData.paid && (
                    <div style={{backgroundColor: '#dcfce7', padding: '12px', borderRadius: '8px', fontSize: '14px', color: '#15803d', fontWeight: '600', textAlign: 'center'}}>
                      Paid! Check your {userData.payout_method}. Earn more to cash out again.
                    </div>
                  )}
                </div>
              )}

              {status && status!== 'Joining...' &&!userData && (
                <p style={{fontSize: '14px', color: status.includes('Welcome') || status.includes('already')? '#16a34a' : '#dc2626', marginTop: '12px', textAlign: 'center', fontWeight: '600'}}>{status}</p>
              )}
              <p style={{fontSize: '12px', color: '#9a3412', marginTop: '10px', textAlign: 'center'}}>Free to join. {currency}20 min cashout. LS, ZA, BW first.</p>
            </div>
          </div>

          <div style={{backgroundColor: 'white', padding: '32px', borderRadius: '20px', border: '2px solid #fed7aa'}}>
            <div style={{fontSize: '16px', fontWeight: '800', color: '#7c2d12', marginBottom: '24px', textAlign: 'center'}}>HOW MULLA FLOWS TO YOU</div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div style={{display: 'flex', gap: '16px', alignItems: 'start'}}>
                <div style={{backgroundColor: '#ffedd5', color: '#c2410c', fontWeight: '900', fontSize: '18px', minWidth: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>1</div>
                <div>
                  <div style={{fontWeight: '700', color: '#7c2d12', marginBottom: '4px'}}>Join + Get {currency}2 Free</div>
                  <div style={{fontSize: '14px', color: '#9a3412'}}>20 bonus points just for signing up. Start earning instantly.</div>
                </div>
              </div>
              <div style={{display: 'flex', gap: '16px', alignItems: 'start'}}>
                <div style={{backgroundColor: '#ffedd5', color: '#c2410c', fontWeight: '900', fontSize: '18px', minWidth: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>2</div>
                <div>
                  <div style={{fontWeight: '700', color: '#7c2d12', marginBottom: '4px'}}>Vote + Shop Partners</div>
                  <div style={{fontSize: '14px', color: '#9a3412'}}>5 pts per vote. 40+ pts per order via Takealot, Pick n Pay, Vodacom.</div>
                </div>
              </div>
              <div style={{display: 'flex', gap: '16px', alignItems: 'start'}}>
                <div style={{backgroundColor: '#ffedd5', color: '#c2410c', fontWeight: '900', fontSize: '18px', minWidth: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>3</div>
                <div>
                  <div style={{fontWeight: '700', color: '#7c2d12', marginBottom: '4px'}}>Cash Out {currency}20 Instantly</div>
                  <div style={{fontSize: '14px', color: '#9a3412'}}>Hit 200 points. Pick M-Pesa, eWallet, or Bank. Paid within 24hrs.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{padding: '36px 24px', textAlign: 'center', fontSize: '14px', color: '#9a3412', backgroundColor: '#fffbeb'}}>
        <p style={{fontWeight: '800', color: '#7c2d12', marginBottom: '16px'}}>2026 MullaBase. Built in Maseru for Africa</p>
        <div style={{display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px', fontSize: '13px'}}>
          <a href="/privacy" style={{color: '#c2410c', textDecoration: 'none', fontWeight: '600'}}>Privacy Policy</a>
          <span style={{color: '#fed7aa'}}>|</span>
          <a href="/terms" style={{color: '#c2410c', textDecoration: 'none', fontWeight: '600'}}>Terms of Service</a>
        </div>
        <p style={{fontSize: '12px', color: '#c2410c', maxWidth: '650px', margin: '0 auto'}}>
          Rewards program. 100 points = {currency}10. Min cashout {currency}20. Not employment or guaranteed income.
        </p>
      </footer>
    </div>
  )
                                                       }
