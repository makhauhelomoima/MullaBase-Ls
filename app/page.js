import Link from 'next/link'

export default function Home() {
  const btnStyle = {
    padding: '16px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '14px',
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
  }

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#FFF8F0', padding: '24px'}}>
      <div style={{maxWidth: '400px', margin: '0 auto', textAlign: 'center'}}>
        
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h1 style={{fontSize: '24px', fontWeight: '900', color: '#C2410C'}}>MullaBase</h1>
          <div style={{backgroundColor: '#FFEDD5', color: '#C2410C', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: '600'}}>
            Born in Lesotho. Open to Africa
          </div>
        </div>

        <h2 style={{fontSize: '36px', fontWeight: '900', color: '#7C2D12', marginBottom: '8px'}}>MullaBase</h2>
        <p style={{color: '#C2410C', fontSize: '14px'}}>Instant Marketplace | Spend & Earn</p>
        <p style={{color: '#C2410C', fontSize: '14px', fontWeight: 'bold', marginTop: '4px'}}>Join & get 20 points FREE!</p>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '24px'}}>
          <Link href="/join" style={{...btnStyle, backgroundColor: '#F97316'}}>
            Join & get 20 points FREE! 🎁
          </Link>
          <Link href="/masterclass" style={{...btnStyle, backgroundColor: '#F97316'}}>
            MASTERCLASS ACCOMMODATION<br/>~ Book Now
          </Link>
          
          <Link href="/store" style={{...btnStyle, backgroundColor: '#DC2626'}}>
            MULLABASE STORE<br/>~ Shop Now
          </Link>
          <Link href="/store?cat=templates" style={{...btnStyle, backgroundColor: '#F97316'}}>
            Templates
          </Link>
          
          <Link href="/admin" style={{...btnStyle, backgroundColor: '#F97316'}}>
            Backend
          </Link>
          <Link href="/store?cat=airtime" style={{...btnStyle, backgroundColor: '#111827'}}>
            Airtime
          </Link>
          
          <Link href="/sim" style={{...btnStyle, backgroundColor: '#16A34A'}}>
            SIM Registration
          </Link>
          <Link href="/sell" style={{...btnStyle, backgroundColor: '#111827', gridColumn: 'span 2'}}>
            Sell - Open Your Shop
          </Link>
        </div>

        <div style={{marginTop: '32px', color: '#C2410C', fontSize: '12px'}}>
          <p>Sell on MullaBase & earn | Share = 10 points per friend</p>
          <p>100 points = M10/R10/P10 | Withdraw to cash or airtime</p>
        </div>

        <Link href="/store">
          <button style={{marginTop: '24px', width: '100%', backgroundColor: '#F97316', color: 'white', padding: '16px', borderRadius: '12px', fontWeight: '900', fontSize: '18px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.1)'}}>
            Enter MullaBase Store →
          </button>
        </Link>

        <div style={{marginTop: '32px', backgroundColor: '#EFF6FF', borderLeft: '4px solid #3B82F6', padding: '12px', borderRadius: '0 12px 12px 0', textAlign: 'left'}}>
          <p style={{fontWeight: '900', color: '#1E3A8A', fontSize: '14px'}}>FOR SELLERS</p>
          <p style={{color: '#1E40AF', fontSize: '12px', marginTop: '4px'}}>
            Pay <span style={{fontWeight: 'bold'}}>M20 to advertise</span> → Keep <span style={{fontWeight: 'bold'}}>100% of sales</span> → No commission
          </p>
        </div>

        <footer style={{textAlign: 'center', padding: '24px 0', marginTop: '32px'}}>
          <p style={{fontWeight: 'bold', color: '#7C2D12', fontSize: '14px'}}>Lesotho's Pride. Africa's Treasure!</p>
          <p style={{fontSize: '12px', color: '#C2410C', marginTop: '4px'}}>© 2026 MullaBase</p>
        </footer>

      </div>
    </main>
  )
  }
