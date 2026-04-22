'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const [balance, setBalance] = useState(20) // Get from Supabase later
  const [referralLink] = useState('mullabase.com/join?ref=f365769f')
  const [phone, setPhone] = useState('+26657031600')
  const [iccid, setIccid] = useState('')

  const copyLink = () => {
    navigator.clipboard.writeText(`https://${referralLink}`)
    alert('Referral link copied! 📋')
  }

  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    marginBottom: '16px'
  }

  const btnStyle = {
    padding: '14px',
    borderRadius: '12px',
    fontWeight: 'bold',
    fontSize: '14px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    marginTop: '8px'
  }

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#FFF8F0', padding: '24px'}}>
      <div style={{maxWidth: '400px', margin: '0 auto'}}>

        {/* Header */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <h1 style={{fontSize: '24px', fontWeight: '900', color: '#C2410C'}}>MullaBase</h1>
          <button style={{
            backgroundColor: '#FED7AA',
            color: '#C2410C',
            padding: '8px 16px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '700',
            border: 'none'
          }}>
            Logout
          </button>
        </div>

        {/* Balance Card - ORANGE */}
        <div style={{...cardStyle, backgroundColor: '#F97316', color: 'white', textAlign: 'center'}}>
          <p style={{fontSize: '14px', opacity: '0.9', margin: 0}}>Your Balance</p>
          <p style={{fontSize: '48px', fontWeight: '900', margin: '8px 0'}}>
            {balance} <span style={{fontSize: '20px'}}>pts</span>
          </p>
          <p style={{fontSize: '14px', opacity: '0.9', margin: 0}}>
            = M{(balance / 10).toFixed(2)}
          </p>
          <p style={{fontSize: '12px', opacity: '0.8', marginTop: '8px'}}>
            100 points = M10
          </p>

          {/* CASHOUT BUTTON */}
          <button
            disabled={balance < 100}
            style={{
             ...btnStyle,
              backgroundColor: balance >= 100? 'white' : '#FED7AA',
              color: balance >= 100? '#F97316' : '#C2410C',
              marginTop: '16px',
              opacity: balance >= 100? 1 : 0.6
            }}
          >
            {balance >= 100? '💰 Cash Out to Mobile Money' : 'Need 100 points to Cash Out'}
          </button>
        </div>

        {/* Referral Card - GREEN */}
        <div style={{...cardStyle, backgroundColor: '#DCFCE7', borderLeft: '4px solid #16A34A'}}>
          <p style={{fontWeight: '900', color: '#14532D', fontSize: '16px', margin: 0}}>
            Earn 10 Points Per Friend
          </p>
          <p style={{fontSize: '12px', color: '#166534', margin: '8px 0'}}>Your Referral Link:</p>
          <div style={{backgroundColor: 'white', padding: '10px', borderRadius: '8px', fontSize: '12px', color: '#166534', wordBreak: 'break-all'}}>
            {referralLink}
          </div>
          <button
            onClick={copyLink}
            style={{...btnStyle, backgroundColor: '#16A34A', color: 'white'}}
          >
            Copy Link
          </button>
        </div>

        {/* Complete Profile Card - BLUE */}
        <div style={{...cardStyle, backgroundColor: '#DBEAFE', borderLeft: '4px solid #3B82F6'}}>
          <p style={{fontWeight: '900', color: '#1E3A8A', fontSize: '16px', margin: 0}}>
            Complete Profile
          </p>
          <p style={{fontSize: '12px', color: '#1E40AF', margin: '8px 0'}}>
            Add phone to enable cashout
          </p>

          <input
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #BFDBFE',
              fontSize: '14px',
              marginBottom: '8px'
            }}
            placeholder="+26657031600"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '2px solid #BFDBFE',
              fontSize: '14px',
              marginBottom: '8px'
            }}
            placeholder="SIM ICCID: 8926600000000000000"
            value={iccid}
            onChange={(e) => setIccid(e.target.value)}
          />

          <button style={{...btnStyle, backgroundColor: '#3B82F6', color: 'white'}}>
            Save Phone + SIM
          </button>
        </div>

        {/* Go to Store Button */}
        <Link href="/store">
          <button style={{...btnStyle, backgroundColor: '#F97316', color: 'white', padding: '16px', fontSize: '16px', fontWeight: '900'}}>
            Go to Store →
          </button>
        </Link>

        <footer style={{textAlign: 'center', padding: '24px 0', marginTop: '24px'}}>
          <p style={{fontWeight: 'bold', color: '#7C2D12', fontSize: '14px'}}>Lesotho's Pride. Africa's Treasure!</p>
        </footer>

      </div>
    </main>
  )
      }
