'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Adverts() {
  const [ads, setAds] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAds = async () => {
      const { data } = await supabase.from('adverts').select('*').order('created_at', {ascending: false})
      setAds(data || [])
      setLoading(false)
    }
    fetchAds()
  }, [])

  const demoAds = [
    {id: 'demo1', title: 'Become a MullaBase Agent Today', description: 'Earn commission on every SIM registration, airtime sale, and product delivery. Work from anywhere in Lesotho. Sign up at /agent. First 100 agents get bonus 500 points.', image_url: '', created_at: new Date().toISOString()},
    {id: 'demo2', title: 'Sell on MullaBase Marketplace', description: 'List your products for FREE. We handle payments, you handle fulfillment. Fashion, electronics, food - all welcome. Sellers keep 95%. Apply at /seller.', image_url: '', created_at: new Date().toISOString()},
    {id: 'demo3', title: 'Daily Motivation: Keep Building', description: 'Your 24 tabs started as notebook sketches. Now they are code. Tomorrow they are revenue. Stay consistent. MullaBase grows because you don’t quit.', image_url: '', created_at: new Date().toISOString()}
  ]

  const displayAds = ads.length > 0? ads : demoAds

  if (loading) return <div className="p-4">Loading...</div>

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-black text-sm">
      <div className="border-b-2 border-yellow-500 p-2 flex justify-between bg-white">
        <span className="font-bold text-yellow-600">DAILY PICKS ADVERTS</span>
        <a href="/dashboard" className="border border-black px-2 hover:bg-gray-100">Back</a>
      </div>
      <div className="p-4 grid grid-cols-1 gap-3">
        {displayAds.map(ad => (
          <div key={ad.id} className="border-2 border-yellow-400 p-3 bg-yellow-50 hover:bg-yellow-100">
            <div className="font-bold text-yellow-700 mb-1">{ad.title}</div>
            <div className="text-xs">{ad.description}</div>
            <div className="text-xs text-gray-500 mt-2">{new Date(ad.created_at).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </main>
  )
        }
