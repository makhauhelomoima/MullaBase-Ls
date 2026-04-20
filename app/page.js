'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

// REPLACE THESE 2 LINES WITH YOURS
const supabase = createClient(
  'htts://oejctbtkqsyxjpgnljac.supabase.co', // 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lamN0YnRrcXN5eGpwZ25samFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0OTM1OTcsImV4cCI6MjA5MjA2OTU5N30.sKOGvegp3vecFcqwgoQ-Jl8fc1rnirTlWixI2A4I9BY' // eyJhbGciOi...
)

export default function Home() {
  const [joined, setJoined] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleJoin = async () => {
    setLoading(true)
    const userPhone = prompt("Enter your WhatsApp number to get 20 points:");
    if (!userPhone) {
      setLoading(false)
      return
    }
    
    const { error } = await supabase.from('users').insert([{ 
      phone: userPhone, 
      points: 20,
      joined_at: new Date()
    }])
    
    if(error) {
      alert("Error or number already joined. Try again.")
    } else {
      setJoined(true)
      alert("Welcome to MullaBase! 20 points added.")
    }
    setLoading(false)
  }

  const btn = "block w-full p-4 my-2 rounded-lg font-bold text-white no-underline text-center"

  return (
    <main style={{
      fontFamily: 'Arial, sans-serif', 
      textAlign: 'center', 
      padding: '20px', 
      maxWidth: '600px', 
      margin: 'auto', 
      background: '#FFF4E6', 
      minHeight: '100vh'
    }}>
      <h1 style={{fontSize: '32px', marginBottom: '10px'}}>MULLABASE HQ 🔥</h1>
      <p style={{margin: '8px 0 24px'}}>Instant marketplace. Spend & Earn.</p>
      <p>Join & get 20 points free</p>

      {joined ? (
        <div className={btn} style={{background: '#25D366', opacity: 0.7}}>
          Joined ✅ Check your balance
        </div>
      ) : (
        <button 
          onClick={handleJoin} 
          disabled={loading}
          className={btn} 
          style={{background: '#25D366', border: 'none', cursor: 'pointer'}}
        >
          {loading ? 'Joining...' : 'Join - Get 20 Points'}
        </button>
      )}
      
      <a className={btn} style={{background: '#FF6B00'}} href="/products/day-rest">Day Rest - 50 Points</a>
      <a className={btn} style={{background: '#000000'}} href="/products/night-rest">Night Rest - 150 Points</a>
      <a className={btn} style={{background: '#FF6B00'}} href="/products/backend">Backend - 500 Points</a>
      <a className={btn} style={{background: '#000000'}} href="/products/templates">Templates - 30 Points</a>
      <a className={btn} style={{background: '#25D366'}} href="/airtime">Airtime - Any Points</a>
      <a className={btn} style={{background: '#FF6B00'}} href="/products/sim-reg">SIM Registration - 25 Points</a>
      <a className={btn} style={{background: '#000000'}} href="/sell">SELL - Open Your Shop</a>

      <div style={{marginTop: '32px', fontSize: '14px', color: '#333'}}>
        Sell on MullaBase & earn | Share = 10 points per friend<br/>
        100 points = M10/R10/P10 | Withdraw to cash or airtime
      </div>
    </main>
  )
}
