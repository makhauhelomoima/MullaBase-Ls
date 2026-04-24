export default function FortuneBrownies() {
  return (
    <main style={{
      fontFamily: 'system-ui, sans-serif',
      backgroundColor: '#0a0a0a',
      color: '#f5f5f5',
      minHeight: '100vh',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          Fortune Brownies 🍫
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: '#a3a3a3', marginBottom: '30px' }}>
          The $5 Business Kit That Prints Money
        </p>

        <div style={{
          backgroundColor: '#171717',
          padding: '30px',
          borderRadius: '12px',
          marginBottom: '30px',
          border: '1px solid #262626'
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>What You Get:</h2>
          <ul style={{ textAlign: 'left', lineHeight: '1.8' }}>
            <li>✅ Profitable brownie recipe with exact costs</li>
            <li>✅ 50 fortune messages that work for any business</li>
            <li>✅ Pricing math: How $5 turns into $500</li>
            <li>✅ Sales script for markets + WhatsApp</li>
            <li>✅ PDF download instantly after purchase</li>
          </ul>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>$5</p>
          <p style={{ color: '#737373' }}>One-time payment. Instant access.</p>
        </div>

        <a 
          href="https://pay.paddle.io/hsp/test_YOUR_CHECKOUT_LINK"
          style={{
            display: 'inline-block',
            backgroundColor: '#22c55e',
            color: '#000',
            padding: '16px 32px',
            borderRadius: '8px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            textDecoration: 'none'
          }}
        >
          Buy Now - Get PDF Instantly
        </a>

        <p style={{ fontSize: '0.9rem', color: '#525252', marginTop: '40px' }}>
          MullaBase. Lesotho's Pride. The World's Treasure!
        </p>
        
      </div>
    </main>
  )
        }
