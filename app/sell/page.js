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
  const MULLABASE_USER_ID = '591aa666-c5f5-4104-82ce-a61049b413b5'

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
    if ((category === 'Digital - Instant' || fulfillment.includes('drive')) && file) {
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
    <div className="max-w-2xl mx-auto p-8">
      <Link href="/" className="text-blue-600 mb-4 block">← Home</Link>
      <p className="text-sm mb-2">{user.email}</p>
      
      <h1 className="text-3xl font-bold mb-2">Seller Hub</h1>
      <p className="mb-6 text-gray-600">List products. Earn 90%. Global customers.</p>
      
      <h2 className="text-xl font-bold mb-4">List New Product</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name:</label>
          <input 
            type="text" 
            placeholder="RED VELVET - Mix PDF" 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className="w-full p-3 border rounded"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description:</label>
          <textarea 
            placeholder="Instant PDF download. Make red velvet cake at home." 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            className="w-full p-3 border rounded h-24"
            required 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              className="w-full p-3 border rounded"
            >
              <option>Digital - Instant</option>
              <option>Digital - Email</option>
              <option>Physical - Shipping</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Stock</label>
            <input 
              type="number" 
              placeholder="999 for digital" 
              value={stock} 
              onChange={e => setStock(e.target.value)}
              className="w-full p-3 border rounded"
              required 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fulfillment:</label>
          <input 
            type="text" 
            placeholder="Google Drive link or 'Email after payment'" 
            value={fulfillment} 
            onChange={e => setFulfillment(e.target.value)}
            className="w-full p-3 border rounded"
          />
        </div>

        {category.includes('Digital') && (
          <div>
            <label className="block text-sm font-medium mb-1">Upload File - PDF/ZIP:</label>
            <input 
              type="file" 
              onChange={e => setFile(e.target.files[0])}
              className="w-full p-3 border rounded"
            />
          </div>
        )}

        {user?.id === MULLABASE_USER_ID && (
          <label className="flex items-start gap-3 p-4 border-2 border-green-500 rounded bg-green-50 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isMullaBase} 
              onChange={e => setIsMullaBase(e.target.checked)}
              className="w-5 h-5 mt-1"
            />
            <div>
              <div className="font-bold">MullaBase Official Product</div>
              <div className="text-sm text-gray-700">Sell for USD via Paddle. Money goes directly to your bank. Only you see this.</div>
            </div>
          </label>
        )}

        {!isMullaBase? (
          <div>
            <label className="block text-sm font-medium mb-1">Points Price</label>
            <input 
              type="number" 
              placeholder="500" 
              value={mulPrice} 
              onChange={e => setMulPrice(e.target.value)}
              className="w-full p-3 border rounded"
              required 
            />
            <p className="text-xs text-gray-500 mt-1">Buyers pay with MUL points. You earn MUL.</p>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium mb-1">USD Price</label>
            <input 
              type="number" 
              step="0.01"
              placeholder="5.00" 
              value={usdPrice} 
              onChange={e => setUsdPrice(e.target.value)}
              className="w-full p-3 border rounded"
              required 
            />
            <p className="text-xs text-gray-500 mt-1">Buyers pay USD via Paddle. You get paid to your bank.</p>
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-black text-white p-4 rounded font-bold disabled:opacity-50 hover:bg-gray-800"
        >
          {loading? 'Listing...' : 'List Product Globally'}
        </button>
      </form>

      <div className="mt-8 pt-8 border-t">
        <h2 className="text-xl font-bold mb-2">My Listings (0)</h2>
        <p className="text-gray-600">No products yet. List your first one above.</p>
        <Link href="/withdraw" className="text-blue-600 underline mt-2 block">Withdraw Earnings →</Link>
      </div>
    </div>
  )
    }
