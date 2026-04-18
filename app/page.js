"use client"
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Joining...')
    
    // Test: shows immediately if button works
    console.log('Email submitted:', email)
    setStatus('Welcome to the Base! 🎉 Check your email.')
    setEmail('')
    
    // Next: We'll send this to Supabase
  }

  return (
    <div style={{backgroundColor: '#fffbeb', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, sans-serif'}}>
      <header style={{padding: '18px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1152px', margin: '0 auto'}}>
        <div style={{color: '#9a3412', fontWeight: '800', fontSize: '22px'}}>
          Mulla<span style={{color: '#ea580c'}}>Base</span>
        </div>
        <div style={{fontSize: '12px', backgroundColor: '#ffedd5', color: '#c2410c', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', border: '1px solid #fed7aa'}}>
          Born in Lesotho 🇱🇸 Open to Africa
        </div>
      </header>

      <section style={{padding: '60px 24px', maxWidth: '1152px', margin: '0 auto'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center'}}>
          <div>
            <h1 style={{fontSize: '42px', fontWeight: '900', color: '#7c2d12', marginBottom: '20px', lineHeight: '1.1'}}>
              Africa’s Phone.<br/>
              Africa’s Opinions.<br/>
              <span style={{color: '#ea580c'}}>Africa’s Mulla.</span>
            </h1>
            <p style={{fontSize: '17px', color: '#9a3412', marginBottom: '32px', lineHeight: '1.6'}}>
              Tired of “not available in your country”? MullaBase pays users across Africa to vote, shop, and share. 
              Starting in Lesotho, SA & Botswana. No VPN bans. No waiting lists.
            </p>
            
            <div style={{backgroundColor: 'white', padding: '20px', borderRadius: '16px', border: '2px solid #fed7aa', boxShadow: '0 4px 12px rgba(234, 88, 12, 0.1)'}}>
              <div style={{fontSize: '14px', fontWeight: '700', color: '#c2410c', marginBottom: '12px'}}>JOIN 2,000+ AFRICANS EARNING</div>
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
                  style={{width: '100%', backgroundColor: status === 'Joining...' ? '#fb923c' : '#ea580c', color: 'white', padding: '14px 24px', borderRadius: '10px', fontWeight: '800', border: 'none', fontSize: '16px', cursor: status === 'Joining...' ? 'not-allowed' : 'pointer'}}
                >
                  {status === 'Joining...' ? 'Joining...' : 'Claim Your Base →'}
                </button>
              </form>
              {status && status !== 'Joining...' && (
                <p style={{fontSize: '14px', color: '#16a34a', marginTop: '12px', textAlign: 'center', fontWeight: '600'}}>{status}</p>
              )}
              <p style={{fontSize: '12px', color: '#9a3412', marginTop: '10px', textAlign: 'center'}}>Free to join. Available in LS, ZA, BW first.</p>
            </div>
          </div>

          <div style={{backgroundColor: 'white', padding: '32px', borderRadius: '20px', border: '2px solid #fed7aa'}}>
            <div style={{fontSize: '16px', fontWeight: '800', color: '#7c2d12', marginBottom: '24px', textAlign: 'center'}}>HOW MULLA FLOWS TO YOU</div>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
              <div style={{display: 'flex', gap: '16px', alignItems: 'start'}}>
                <div style={{backgroundColor: '#ffedd
