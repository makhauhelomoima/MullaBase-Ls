export default function Pricing() {
  return (
    <div style={{backgroundColor: '#fffbeb', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <header style={{padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1152px', margin: '0 auto'}}>
        <a href="/" style={{color: '#9a3412', fontWeight: '800', fontSize: '22px', textDecoration: 'none'}}>
          Mulla<span style={{color: '#ea580c'}}>Base</span>
        </a>
        <a href="/" style={{fontSize: '14px', color: '#c2410c', textDecoration: 'none', fontWeight: '600'}}>← Back Home</a>
      </header>

      <section style={{padding: '60px 24px', maxWidth: '900px', margin: '0 auto', textAlign: 'center'}}>
        <h1 style={{fontSize: '36px', fontWeight: '900', color: '#7c2d12', marginBottom: '16px'}}>
          Simple Pricing
        </h1>
        <p style={{fontSize: '17px', color: '#9a3412', marginBottom: '48px'}}>
          Free for members. Partners pay per result.
        </p>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', textAlign: 'left'}}>
          <div style={{backgroundColor: 'white', padding: '32px', borderRadius: '20px', border: '2px solid #ea580c'}}>
            <div style={{fontSize: '14px', fontWeight: '800', color: '#ea580c', marginBottom: '8px'}}>FOR MEMBERS</div>
            <div style={{fontSize: '32px', fontWeight: '900', color: '#7c2d12', marginBottom: '8px'}}>Free</div>
            <div style={{fontSize: '16px', color: '#9a3412', marginBottom: '24px'}}>Forever. No catch.</div>
            
            <div style={{fontSize: '14px', color: '#7c2d12', lineHeight: '1.8', marginBottom: '24px'}}>
              ✅ Vote & earn points<br/>
              ✅ Shop partner links<br/>
              ✅ Redeem M-Pesa, airtime, data<br/>
              ✅ Access all countries we support<br/>
              ✅ Min cashout: M10/R10/P10
            </div>
            
            <a 
              href="/"
              style={{display: 'block', width: '100%', backgroundColor: '#ea580c', color: 'white', padding: '14px 24px', borderRadius: '10px', fontWeight: '800', textDecoration: 'none', textAlign: 'center', boxSizing: 'border-box'}}
            >
              Join Free →
            </a>
            <p style={{fontSize: '12px', color: '#9a3412', marginTop: '12px', textAlign: 'center'}}>No credit card required</p>
          </div>

          <div style={{backgroundColor: 'white', padding: '32px', borderRadius: '20px', border: '2px solid #fed7aa'}}>
            <div style={{fontSize: '14px', fontWeight: '800', color: '#c2410c', marginBottom: '8px'}}>FOR BRANDS</div>
            <div style={{fontSize: '32px', fontWeight: '900', color: '#7c2d12', marginBottom: '8px'}}>Pay Per Result</div>
            <div style={{fontSize: '16px', color: '#9a3412', marginBottom: '24px'}}>Performance only.</div>
            
            <div style={{fontSize: '14px', color: '#7c2d12', lineHeight: '1.8', marginBottom: '24px'}}>
              ✅ List your product/service<br/>
              ✅ Members vote & buy<br/>
              ✅ You pay only on sales/actions<br/>
              ✅ Dashboard to track ROI<br/>
              ✅ LS, ZA, BW audiences
            </div>
            
            <a 
              href="mailto:partners@mullabase.com"
              style={{display: 'block', width: '100%', backgroundColor: '#fff7ed', color: '#c2410c', padding: '14px 24px', borderRadius: '10px', fontWeight: '800', textDecoration: 'none', textAlign: 'center', border: '2px solid #fed7aa', boxSizing: 'border-box'}}
            >
              Become a Partner →
            </a>
            <p style={{fontSize: '12px', color: '#9a3412', marginTop: '12px', textAlign: 'center'}}>Email us for custom rates</p>
          </div>
        </div>

        <p style={{fontSize: '12px', color: '#c2410c', marginTop: '40px', maxWidth: '600px', margin: '40px auto 0'}}>
          *Rewards program. Members earn points redeemable for airtime, data, or cash transfers. Point values vary. Not employment or guaranteed income. Brand partnerships subject to approval.
        </p>
      </section>

      <footer style={{padding: '36px 24px', textAlign: 'center', fontSize: '14px', color: '#9a3412', backgroundColor: '#fff7ed'}}>
        <p style={{fontWeight: '800', color: '#7c2d12'}}>© 2026 MullaBase. Built in Maseru 🇱🇸 for Africa 🌍</p>
        <div style={{marginTop: '12px'}}>
          <a href="/terms" style={{color: '#c2410c', textDecoration: 'none', margin: '0 10px', fontWeight: '600'}}>Terms</a>
          <a href="/privacy" style={{color: '#c2410c', textDecoration: 'none', margin: '0 10px', fontWeight: '600'}}>Privacy</a>
          <a href="/rules" style={{color: '#c2410c', textDecoration: 'none', margin: '0 10px', fontWeight: '600'}}>Earning Rules</a>
        </div>
      </footer>
    </div>
  )
    }
