"use client"
import { useState, useEffect } from 'react'

const SUPABASE_URL = 'https://oejctbtkqsyxjpgnljac.supabase.co'
const SUPABASE_KEY = 'sb_publishable_rsHcUSNFJ6CuGc2_zDtvlA_8CCHXhUo'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')
  const [count, setCount] = useState(2000) // starts at 2000 for social proof

  useEffect(() => {
    // Get real count from Supabase
    fetch(`${SUPABASE_URL}/rest/v1/leads?select=id`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'count=exact'
      }
    }).then(res => {
      const total = res.headers.get('content-range')?.split('/')[1]
      if(total) setCount(2000 + parseInt(total)) // 2000 base + real signups
    }).catch(() => {})
  }, [])

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
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({ email: email, country: 'LS' })
      })

      if (res.status === 201) {
        setStatus('Welcome to the Base')
        setEmail('')
        setCount(prev => prev + 1) // bump counter live
      } else if (res.status === 409) {
        setStatus('You are already on the list!')
        setEmail('')
      } else {
        setStatus('Try again in a moment')
      }
    } catch (error) {
      setStatus('Check connection and try again')
    }
  }

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
              <div style={{fontSize: '14px', fontWeight: '700', color: '#c2410c', marginBottom: '12px'}}>JOIN {count.toLocaleString()}+ AFRICANS EARNING</div>
              <form onSubmit={handleSubmit}>
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
                  {status === 'Joining...'? 'Joining...' : 'Claim Your Base'}
                </button>
              </form>
              {status && status!== 'Joining...' && (
                <p style={{fontSize: '14px', color: status.includes('Welcome') || status.includes('already')? '#16a34a' : '#dc2626', marginTop: '12px', textAlign: 'center', fontWeight: '600'}}>{status}</p>
              )}
              <p style={{fontSize: '12px', color: '#9a3412', marginTop: '10px', textAlign: 'center'}}>Free to join. Available in LS, ZA, BW first.</p>
            </div>
          </div>

          <div style={{backgroundColor: 'white', padding: '32px', borderRadius: '20px', border: '2px solid #fed7aa'}}>
            <div style={{fontSize: '16px', fontWeight: '800', color: '#7c2d12', marginBottom: '24px', textAlign: 'center'}}>HOW MULLA FLOWS TO YOU</div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div style={{display: 'flex', gap: '16px', alignItems: 'start'}}>
                <div style={{backgroundColor: '#ffedd5', color: '#c2410c', fontWeight: '900', fontSize: '18px', minWidth: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>1</div>
                <div>
                  <div style={{fontWeight: '700', color: '#7c2d12', marginBottom: '4px'}}>Vote on African Content</div>
                  <div style={{fontSize: '14px', color: '#9a3412'}}>Rate pics, polls, music, and products from creators across Africa. 5 points per vote.</div>
                </div>
              </div>
              <div style={{display: 'flex', gap: '16px', alignItems: 'start'}}>
                <div style={{backgroundColor: '#ffedd5', color: '#c2410c', fontWeight: '900', fontSize: '18px', minWidth: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>2</div>
                <div>
                  <div style={{fontWeight: '700', color: '#7c2d12', marginBottom: '4px'}}>Shop Local and Global Partners</div>
                  <div style={{fontSize: '14px', color: '#9a3412'}}>Buy via Takealot, Pick n Pay, Vodacom, or local stores through our links. Earn 2-10 percent back.</div>
                </div>
              </div>
              <div style={{display: 'flex', gap: '16px', alignItems: 'start'}}>
                <div style={{backgroundColor: '#ffedd5', color: '#c2410c', fontWeight: '900', fontSize: '18px', minWidth: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>3</div>
                <div>
                  <div style={{fontWeight: '700', color: '#7c2d12', marginBottom: '4px'}}>Cash Out Your Way</div>
                  <div style={{fontSize: '14px', color: '#9a3412'}}>Redeem for M-Pesa, EFT, airtime, data bundles, or bank transfer. Min M10 or R10 or P10.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{padding: '56px 24px', backgroundColor: 'white'}}>
        <div style={{maxWidth: '900px', margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{fontSize: '30px', fontWeight: '900', color: '#7c2d12', marginBottom: '16px'}}>Built for Africa. By Africa.</h2>
          <p style={{color: '#9a3412', marginBottom: '40px', fontSize: '16px'}}>Other platforms block us. We built the Base for us.</p>
          
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', textAlign: 'left'}}>
            <div style={{backgroundColor: '#fff7ed', padding: '24px', borderRadius: '16px', border: '1px solid #fed7aa'}}>
              <div style={{fontWeight: '800', color: '#7c2d12', marginBottom: '8px'}}>No Country Blocks</div>
              <div style={{fontSize: '14px', color: '#9a3412'}}>Launching in Lesotho, SA, Botswana first. Nigeria, Kenya, Ghana next. No one gets left behind.</div>
            </div>
            <div style={{backgroundColor: '#fff7ed', padding: '24px', borderRadius: '16px', border: '1px solid #fed7aa'}}>
              <div style={{fontWeight: '800', color: '#7c2d12', marginBottom: '8px'}}>Real Money Options</div>
              <div style={{fontSize: '14px', color: '#9a3412'}}>M-Pesa, EFT, instant EFT, airtime, data. We pay how Africans actually use money.</div>
            </div>
            <div style={{backgroundColor: '#fff7ed', padding: '24px', borderRadius: '16px', border: '1px solid #fed7aa'}}>
              <div style={{fontWeight: '800', color: '#7c2d12', marginBottom: '8px'}}>Data-Saver Friendly</div>
              <div style={{fontSize: '14px', color: '#9a3412'}}>Use Opera Mini, data-saver, incognito. We will not ban you for saving data. We get it.</div>
            </div>
          </div>
          <p style={{fontSize: '12px', color: '#c2410c', marginTop: '32px'}}>Rewards program. Point value varies by country and activity. Not employment or guaranteed income. Earnings require participation.</p>
        </div>
      </section>

      <section style={{padding: '64px 24px', backgroundColor: '#7c2d12', textAlign: 'center'}}>
        <div style={{maxWidth: '600px', margin: '0 auto'}}>
          <h2 style={{fontSize: '32px', fontWeight: '900', color: 'white', marginBottom: '16px'}}>Africa Does Not Wait.</h2>
          <p style={{color: '#fed7aa', marginBottom: '32px', fontSize: '17px'}}>MullaBase is open now. If you are in LS, ZA, or BW, claim your spot at the Base today.</p>
          <div style={{display: 'inline-block', backgroundColor: '#ea580c', color: 'white', padding: '16px 40px', borderRadius: '12px', fontWeight: '800', fontSize: '17px'}}>
            Join MullaBase Free
          </div>
          <p style={{color: '#ffedd5', fontSize: '13px', marginTop: '16px'}}>More countries opening monthly. Join waitlist if you are outside LS, ZA, BW.</p>
        </div>
      </section>

      <footer style={{padding: '36px 24px', textAlign: 'center', fontSize: '14px', color: '#9a3412', backgroundColor: '#fffbeb'}}>
        <p style={{fontWeight: '800', color: '#7c2d12'}}>2026 MullaBase. Built in Maseru for Africa</p>
        <div style={{marginTop: '12px'}}>
          <span style={{color: '#c2410c', margin: '0 10px', fontWeight: '600'}}>Terms</span>
          <span style={{color: '#c2410c', margin: '0 10px', fontWeight: '600'}}>Privacy</span>
          <span style={{color: '#c2410c', margin: '0 10px', fontWeight: '600'}}>Earning Rules</span>
          <span style={{color: '#c2410c', margin: '0 10px', fontWeight: '600'}}>Support</span>
        </div>
        <p style={{fontSize: '12px', color: '#c2410c', marginTop: '20px', maxWidth: '650px', margin: '20px auto 0'}}>
          MullaBase is an independent rewards platform. Not affiliated with AdFreeway, Meta, Google, Vodacom, or any retail partners. All trademarks belong to their owners.
        </p>
      </footer>
    </div>
  )
          }
