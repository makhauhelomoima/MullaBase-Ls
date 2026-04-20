'use client'
import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_ANON_KEY')

export default function Home() {
  const [joined, setJoined] = useState(false)
  
  const handleJoin = async () => {
    const userPhone = prompt("Enter your WhatsApp number for points:");
    if (!userPhone) return;
    
    // Add user + 20 points
    await supabase.from('users').insert([{ 
      phone: userPhone, 
      points: 20,
      joined_at: new Date()
    }])
    
    setJoined(true)
    alert("Welcome! 20 points added. Check your balance.")
  }

  // ... rest of your buttons, but replace JOIN button with:
  // <button onClick={handleJoin} className={btn} style={{background: '#25D366'}}>Join - Get 20 Points</button>
    }
