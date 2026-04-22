'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SellPage() {
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [mulPrice, setMulPrice] = useState('')
  const [usdPrice, setUsdPrice] = useState('')
  const [fulfillment, setFulfillment] = useState('')
  const [file, setFile] = useState(null)
  const [isMullaBase, setIsMullaBase] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  // PUT YOUR SUPABASE USER ID HERE
  const MULLABASE_USER_ID = 'paste-your-user-id-from-supabase-auth'

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/login')
      setUser(user)
    }
    getUser()
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let fileUrl = null
    if (file) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const { data, error: uploadError } = await supabase.storage
       .from('products')
       .upload(fileName, file)
      
      if (uploadError) {
        alert('File upload failed')
        setLoading(false)
        return
      }
      
      const { data: { publicUrl } } = supabase.storage
       .from('products')
       .getPublicUrl(fileName)
      fileUrl = publicUrl
    }

    const { error } = await supabase.from('products').insert({
      title,
      description,
      price: isMullaBase? parseFloat(usdPrice) : parseFloat(mulPrice),
      fulfillment,
      file_url: fileUrl,
      seller_id: user.id,
      is_mullabase_official: isMullaBase && user.id === MULLABASE_USER_ID
    })

    setLoading(false)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Product listed!')
      router.push('/store')
    }
  }

  if (!user) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">List a Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Product Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          className="w-full p-3 border rounded"
          required 
        />
        
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          className="w-full p-3 border rounded h-32"
          required 
        />

        <select 
          value={fulfillment} 
          onChange={e => setFulfillment(e.target.value)}
          className="w-full p-3 border rounded"
          required
        >
          <option value="">Select Fulfillment Type</option>
          <option value="download">Instant Download</option>
          <option value="email">Email Delivery</option>
          <option value="physical">Physical Shipping</option>
        </select>

        {fulfillment === 'download' || fulfillment === 'email'? (
          <input 
            type="file" 
            onChange={e => setFile(e.target.files[0])}
            className="w-full p-3 border rounded"
            required
          />
        ) : null}

        {!isMullaBase? (
          <input 
            type="number" 
            placeholder="Price in MUL" 
            value={mulPrice} 
            onChange={e => setMulPrice(e.target.value)}
            className="w-full p-3 border rounded"
            required 
          />
        ) : (
          <input 
            type="number" 
            step="0.01"
            placeholder="Price in USD" 
            value={usdPrice} 
            onChange={e => setUsdPrice(e.target.value)}
            className="w-full p-3 border rounded"
            required 
          />
        )}

        {user?.id === MULLABASE_USER_ID && (
          <label className="flex items-center gap-3 p-4 border-2 border-green-500 rounded bg-green-50">
            <input 
              type="checkbox" 
              checked={isMullaBase} 
              onChange={e => setIsMullaBase(e.target.checked)}
              className="w-5 h-5"
            />
            <div>
              <div className="font-bold">MullaBase Official Product</div>
              <div className="text-sm text-gray-600">Sell for USD via Paddle. Money goes to your bank.</div>
            </div>
          </label>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-black text-white p-4 rounded font-bold disabled:opacity-50"
        >
          {loading? 'Listing...' : 'List Product'}
        </button>
      </form>
    </div>
  )
         }
