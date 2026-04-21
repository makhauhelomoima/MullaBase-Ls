'use client'
export const dynamic = 'force-dynamic'
import Link from 'next/link'

export default function Privacy() {
  return (
    <div style={{backgroundColor: '#fffbeb', minHeight: '100vh', padding: '40px 24px', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <div style={{maxWidth: '800px', margin: '0 auto'}}>
        <Link href="/" style={{color: '#c2410c', fontWeight: '700', fontSize: '14px', textDecoration: 'none', marginBottom: '24px', display: 'inline-block'}}>
          ← Back to MullaBase
        </Link>
        <h1 style={{fontSize: '32px', fontWeight: '900', color: '#7c2d12', marginBottom: '24px'}}>Privacy Policy</h1>
        <div style={{backgroundColor: 'white', padding: '24px', borderRadius: '16px', border: '2px solid #fed7aa', lineHeight: '1.7', color: '#7c2d12'}}>
          <p style={{marginBottom: '16px'}}>MullaBase collects your email and referral data to run the points and cashout system.</p>
          <p style={{marginBottom: '16px'}}>We never sell your data. Phone numbers are only used for M-Pesa/EcoCash payouts.</p>
          <p>Contact: support@mullabase.co.ls</p>
        </div>
      </div>
    </div>
  )
}
