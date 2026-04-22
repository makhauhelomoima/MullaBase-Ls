'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default function Engage() {
  const [user, setUser] = useState(null)
  const [postText, setPostText] = useState('')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return window.location.href = '/'
      setUser(user)
      setLoading(false)
    }
    checkUser()
  }, [])

  const handlePost = () => {
    if (postText.length > 500) return alert('Max 500 words')
    alert('Post created! Backend coming next.')
    setPostText('')
  }

  if (loading) return <div className="p-4">Loading Engage...</div>

  return (
    <main className="min-h-screen bg-white text-black text-sm">
      {/* Top Bar */}
      <div className="border-b border-black p-2 flex justify-between">
        <span className="font-bold">MullaBase Engage</span>
        <a href="/dashboard" className="border border-black px-2">Dashboard</a>
      </div>

      <div className="grid grid-cols-3 border-b border-black">
        {/* POST & ENGAGE - Col 1 */}
        <div className="col-span-1 border-r border-black p-3">
          <h2 className="font-bold mb-2">POST & ENGAGE</h2>
          <div className="border border-black p-2 mb-2">
            <textarea 
              placeholder="Insert text for an engagement post with maximum 500 words and no advertising or link-sharing. Engage users with sociable topics."
              value={postText}
              onChange={e => setPostText(e.target.value)}
              maxLength={500}
              className="w-full min-h-24 text-xs"
            />
            <div className="flex justify-between mt-1 text-xs">
              <button className="border border-black px-2">Insert Photo</button>
              <span>{postText.length}/500</span>
            </div>
          </div>
          <button onClick={handlePost} className="w-full bg-black text-white p-1 mb-2">POST</button>
          
          <div className="border border-black p-2 mb-1">
            <div className="text-xs mb-1">[Sample Post: Looking for recommendations on reliable data bundles in Maseru]</div>
            <div className="flex border-t border-black pt-1">
              <button className="flex-1 border-r border-black">REACT</button>
              <button className="flex-1 border-r border-black">COMMENT</button>
              <button className="flex-1 border-r border-black">SHARE</button>
              <button className="flex-1">REPOST</button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 mt-2 text-xs">
            <div className="border border-black p-2">WEEKLY PICK #1<br/>OF PAID ADVERT<br/>FOR BUSINESS/SELLER<br/>WITH CONTACTS</div>
            <div className="border border-black p-2">WEEKLY PICK #2<br/>OF PAID ADVERT<br/>FOR BUSINESS/SELLER<br/>WITH CONTACTS</div>
            <div className="border border-black p-2">WEEKLY PICK #3<br/>OF PAID ADVERT<br/>FOR BUSINESS/SELLER<br/>WITH CONTACTS</div>
            <div className="border border-black p-2">WEEKLY PICK #4<br/>OF PAID ADVERT<br/>FOR BUSINESS/SELLER<br/>WITH CONTACTS</div>
          </div>
        </div>

        {/* CENTER - Col 2 */}
        <div className="col-span-1 border-r border-black p-3">
          <div className="border border-black p-2 mb-2 text-center text-xs">Dropbar blog*</div>
          <button className="w-full border border-black p-2 mb-2 font-bold">SWAP 2 OWN</button>
          <div className="border border-black p-2 mb-2">
            <div className="font-bold text-center mb-1">FIND A HELP/NANNY*</div>
            <div className="text-xs">Free Blog for jobseekers looking for new opportunities<br/>Write Name, Jobtitle, Contact & Location, only those specs to be pasted here</div>
          </div>
        </div>

        {/* RIGHT - Col 3 */}
        <div className="col-span-1 p-3">
          <button className="w-full border border-black p-2 mb-2 font-bold">TAP TO CREATE YOUR STORE</button>
          <div className="border border-black p-2 text-xs">
            <div className="font-bold mb-1">OPEN BLOG for All STORE OWNERS</div>
            To
