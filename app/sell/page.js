'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SellPage() {
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Digital - Instant')
  const [stock, setStock] = useState('999')
  const [fulfillment, setFulfillment] = useState('')
  const [mulPrice, setMulPrice] = useState('')
  const [usdPrice, setUsdPrice] = useState('')
  const [file, setFile] = useState(null)
  const [isMullaBase, setIsMullaBase] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // CHANGE THIS: Get your ID from Supabase → Authentication → Users → Copy your UUID
  const MULLABASE_USER_ID = '591aaf66-c5f5-4704-83ce-4d1049b413b5'

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
    if (category === 'Digital - Instant' && fulfillment.includes('drive') && file) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${user.id}-${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
       .from('products')
       .upload(fileName, file)

      if (uploadError) {
        alert('File upload failed: ' + uploadError.message)
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
      category,
      stock: parseInt(stock),
      price: isMullaBase? parseFloat(usdPrice) : parseFloat(mulPrice),
      fulfillment: fileUrl || fulfillment,
      file_url: fileUrl,
      seller_id: user.id,
      is_mullabase_official: isMullaBase && user.id === MULLABASE_USER_ID
    })

    setLoading(false)
    if (error) {
      alert('Error: ' + error.message)
    } else {
      alert('Product listed successfully!')
      router.push('/store')
    }
  }

  if (!user) return <div className="p-8">Loading...</div>

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Link href="/" className="text-blue-600 mb-4 block">← Home</Link>
      <h1 className="text-2xl font-bold mb-6">Sell on MullaBase</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Product Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required 
        />
        
        <textarea 
          placeholder="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded h-24"
          required 
        />

        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option>Digital - Instant</option>
          <option>Digital - Manual</option>
          <option>Physical - Delivery</option>
          <option>Physical - Pickup</option>
        </select>

        <input 
          type="number" 
          placeholder="Stock" 
          value={stock} 
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 border rounded"
          required 
        />

        {category === 'Digital - Instant'? (
          <div>
            <label className="block text-sm mb-1">Upload PDF File</label>
            <input 
              type="file" 
              accept=".pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-2 border rounded"
              required 
            />
          </div>
        ) : (
          <input 
            type="text" 
            placeholder="Fulfillment Instructions or Drive Link" 
            value={fulfillment} 
            onChange={(e) => setFulfillment(e.target.value)}
            className="w-full p-2 border rounded"
            required 
          />
        )}

        {user.id === MULLABASE_USER_ID && (
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={isMullaBase} 
                onChange={(e) => setIsMullaBase(e.target.checked)}
              />
              <span className="font-bold text-green-700">MullaBase Official - List in USD $</span>
            </label>
          </div>
        )}

        {isMullaBase && user.id === MULLABASE_USER_ID? (
          <input 
            type="number" 
            step="0.01"
            placeholder="Price in USD $" 
            value={usdPrice} 
            onChange={(e) => setUsdPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required 
          />
        ) : (
          <input 
            type="number" 
            step="0.01"
            placeholder="Price in MUL" 
            value={mulPrice} 
            onChange={(e) => setMulPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required 
          />
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded font-bold disabled:bg-gray-400"
        >
          {loading? 'Listing...' : 'List Product'}
        </button>
      </form>
    </div>
  )
    }
