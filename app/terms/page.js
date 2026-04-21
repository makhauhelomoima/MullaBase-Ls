'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'

export default function Terms() {
  return (
    <div style={{backgroundColor: '#fffbeb', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <div style={{maxWidth: '800px', margin: '0 auto'}}>
        <Link href="/" style={{color: '#c2410c', fontWeight: '700', fontSize: '14px', textDecoration: 'none', marginBottom: '24px', display: 'inline-block'}}>
          ← Back to MullaBase
        </Link>
        <h1 style={{fontSize: '32px', fontWeight: '900', color: '#7c2d12', marginBottom: '24px'}}>Terms of Service</h1>
        <div style={{backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '2px solid #fed7aa', lineHeight: '1.7', color: '#7c2d12'}}>
          <p style={{marginBottom: '16px'}}>1. 1 point = M0.10. 200 points minimum for cashout.</p>
          <p style={{marginBottom: '16px'}}>2. Self-referrals and fake signups will result in account ban.</p>
          <p style={{marginBottom: '16px'}}>3. Payouts processed within 48hrs to verified M-Pesa/EcoCash numbers.</p>
          <p>4. MullaBase reserves right to update terms.</p>
        </div>
      </div>
    </div>
  )
                  }
