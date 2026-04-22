'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Sell() {
  const [title, setTitle] = useState('')
  const [type, setType] = useState('Digital - Instant')
  const [price, setPrice] = useState('')

  const inputStyle = {
    width: '100%',
    padding: '14px',
    borderRadius: '12px',
    border: '2px solid #FED7AA',
    fontSize: '16px',
    marginBottom: '16px',
    backgroundColor: 'white'
  }

  const labelStyle = {
    display: 'block',
    fontWeight: '700',
    color: '#7C2D12',
    fontSize: '14px',
    marginBottom: '6px',
    textAlign: 'left'
  }

  return (
    <main style={{minHeight: '100vh', backgroundColor: '#FFF8F0', padding: '24px'}}>
      <div style={{maxWidth: '400px', margin: '0 auto'}}>
        
        {/* Header */}
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px'}}>
          <Link href="/" style={{fontSize: '14px', fontWeight: '700', color: '#C2410C', textDecoration: 'none'}}>
            ← Home
          </Link>
          <h1 style={{fontSize: '24px', fontWeight: '900', color: '#C2410C'}}>MullaBase</h1>
        </div>

        {/* Title */}
        <h2 style={{fontSize: '32px', fontWeight: '900', color: '#7C2D12', textAlign: 'center', marginBottom: '8px'}}>
          Sell on MullaBase
        </h2>
        <p style={{color: '#C2410C', fontSize: '14px', textAlign: 'center', marginBottom: '24px'}}>
          List your product and keep 100% of sales
        </p>

        {/* M20 Fee Notice */}
        <div style={{backgroundColor: '#DBEAFE', borderLeft: '4px solid #3B82F6', padding: '12px', borderRadius: '0 12px 12px 0', marginBottom: '24px'}}>
          <p style={{fontWeight: '900', color: '#1E3A8A', fontSize: '14px', margin: 0}}>LISTING FEE: M20</p>
          <p style={{color: '#1E40AF', fontSize: '12px', margin: '4px 0 0 0'}}>
            Pay once to advertise → Keep 100% of every sale forever
          </p>
        </div>

        {/* Form */}
        <div style={{backgroundColor: 'white', padding: '24px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
          
          <label style={labelStyle}>Product Title</label>
          <input 
            style={inputStyle}
            placeholder="Money Cake Tutorial"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label style={labelStyle}>Product Type</label>
          <select 
            style={inputStyle}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Digital - Instant</option>
            <option>Physical Product</option>
            <option>Service</option>
            <option>Airtime/Data</option>
          </select>

          <label style={labelStyle}>Price in Points</label>
          <input 
            style={inputStyle}
            placeholder="999 = M9.99"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <p style={{fontSize: '12px', color: '#C2410C', marginTop: '-12px', marginBottom: '16px', textAlign: 'left'}}>
            100 points = M10 | 999 points = M9.99
          </p>

          <label style={labelStyle}>Upload PDF File</label>
          <input 
            style={{...inputStyle, padding: '10px', fontSize: '14px'}}
            type="file"
            accept=".pdf"
          />

          {/* M20 Pay Button */}
          <button style={{
            width: '100%',
            backgroundColor: '#3B82F6',
            color: 'white',
            padding: '16px',
            borderRadius: '12px',
            fontWeight: '900',
            fontSize: '18px',
            border: 'none',
            marginTop: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            Pay M20 & List Product →
          </button>

          <p style={{fontSize: '11px', color: '#9A3412', textAlign: 'center', marginTop: '12px'}}>
            You'll be redirected to pay M20. Product goes live after payment.
          </p>
        </div>

        {/* Example */}
        <div style={{marginTop: '24px', backgroundColor: '#FEF3C7', padding: '12px', borderRadius: '12px'}}>
          <p style={{fontSize: '12px', color: '#92400E', fontWeight: '700', margin: 0}}>
            Example: List "Red Velvet Recipe" for 999 points = M9.99<br/>
            You pay M20 once → Keep all M9.99 from every sale
          </p>
        </div>

        <footer style={{textAlign: 'center', padding: '24px 0', marginTop: '32px'}}>
          <p style={{fontWeight: 'bold', color: '#7C2D12', fontSize: '14px'}}>Lesotho's Pride. Africa's Treasure!</p>
        </footer>

      </div>
    </main>
  )
    }
