'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Engage() {
  const [postText, setPostText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return window.location.href = '/'
      setLoading(false)
    }
    checkUser()
  }, [])

  const handlePost = () => {
    if (postText.length > 500) return alert('Max 500 words')
    alert('Post created! Feed backend coming next.')
    setPostText('')
  }

  if (loading) return <div className="p-4">Loading Engage...</div>

  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between">
        <span className="font-bold">MullaBase Engage</span>
        <a href="/dashboard" className="border border-black px-2">Dashboard</a>
      </div>
      <div className="grid grid-cols-3 border-b border-black">
        <div className="col-span-1 border-r border-black p-3">
          <h2 className="font-bold mb-2">POST & ENGAGE</h2>
          <textarea placeholder="Insert text for engagement post. Max 500 words. No ads or links." value={postText} onChange={e=>setPostText(e.target.value)} maxLength={500} className="w-full min-h-24 border border-black p-1 text-xs"/>
          <div className="flex justify-between mt-1 text-xs">
            <button className="border border-black px-2">Insert Photo</button>
            <span>{postText.length}/500</span>
          </div>
          <button onClick={handlePost} className="w-full bg-black text-white p-1 mt-1">POST</button>
          <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
            <div className="border border-black p-2">WEEKLY PICK #1 OF PAID ADVERT</div>
            <div className="border border-black p-2">WEEKLY PICK #2 OF PAID ADVERT</div>
          </div>
        </div>
        <div className="col-span-1 border-r border-black p-3">
          <button className="w-full border border-black p-2 mb-2 font-bold">SWAP 2 OWN</button>
          <div className="border border-black p-2 text-xs">
            <div className="font-bold text-center">FIND A HELP/NANNY</div>
            <div>Free Blog for jobseekers. Name, Jobtitle, Contact & Location only.</div>
          </div>
        </div>
        <div className="col-span-1 p-3">
          <button className="w-full border border-black p-2 mb-2 font-bold">TAP TO CREATE YOUR STORE</button>
          <div className="border border-black p-2 text-xs">OPEN BLOG for All STORE OWNERS to post links.</div>
        </div>
      </div>
    </main>
  )
        }
