"use client"
import { useState, useEffect } from 'react'

const SUPABASE_URL = 'https://oejctbtkqsyxjpgnljac.supabase.co'
const SUPABASE_KEY = 'sb_publishable_rsHcUSNFJ6CuGc2_zDtvlA_8CCHXhUo'

const PAYOUTS = {
  LS: { name: 'Lesotho', currency: 'M', methods: ['M-Pesa', 'EcoCash'] },
  ZA: { name: 'South Africa', currency: 'R', methods: ['FNB eWallet', 'Capitec Pay', 'Bank EFT'] },
  BW: { name: 'Botswana', currency: 'P', methods: ['Orange Money', 'MyZaka'] }
}

export default function Home() {
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('LS')
  const [phone, setPhone] = useState('')
  const [payoutMethod, setPayoutMethod] = useState('M-Pesa')
  const [status, setStatus] = useState('')
  const [count, setCount] = useState(2000)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/leads?select=id`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'count=exact'
      }
    }).then(res => {
      const total = res.headers.get('content-range')?.split('/')[1]
      if(total) setCount(2000 + parseInt(total))
    }).catch(() => {})
  }, [])

  useEffect(() => {
    const savedEmail = localStorage.getItem('mulla_email')
    if(savedEmail) fetchUser(savedEmail)
  }, [])

  useEffect(() => {
    setPayoutMethod(PAYOUTS[country].methods[0])
  }, [country])

  const fetchUser = async (userEmail) => {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/leads?email=eq.${userEmail}&select=*`, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      })
      const data = await res.json()
      if(data[0]) {
        setUserData(data[0])
        setCountry(data[0].country_code || 'LS')
}
