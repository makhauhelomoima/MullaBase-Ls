'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

// 100 points = 1 unit of base currency. We show equivalents.
const CURRENCY_MAP = {
  LSL: { symbol: 'M', name: 'Maloti', rate: 10 }, // 100pts = M10
  USD: { symbol: '$', name: 'US Dollar', rate: 1 }, // 100pts = $1
  ZAR: { symbol: 'R', name: 'Rand', rate: 18 }, // 100pts = R18
  GBP: { symbol: '£', name: 'Pound', rate: 0.8 }, // 100pts = £0.8
  NGN: { symbol: '₦', name: 'Naira', rate: 1600 }, // 100pts = ₦1600
}

export default function Sell() {
  const [user, setUser] = useState(null)
  const [points, setPoints] = useState(0)
  const [sellerBalance, setSellerBalance] = useState(0)
  const [isSeller, setIsSeller] = useState(false)
  const [myProducts, setMyProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState('')

  // Form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [pointsPrice, setPointsPrice] = useState('')
  const [currency, setCurrency] = useState('LSL')
  const [stock, setStock] = useState('')
  const [category, setCategory] = useState('digital')
  const [fulfillment, setFulfillment] = useState('')

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return window.location.href = '/'
      setUser(data.user)
      loadProfile(data.user.id)
    })
  }, [])

  async function loadProfile(userId) {
    const { data } = await supabase
    .from('profiles')
    .select('points, is_seller, seller_balance')
    .eq('id', userId)
    .single()

    if (data) {
      setPoints(data.points || 0)
      setIsSeller(data.is_seller || false)
      setSellerBalance(data.seller_balance || 0)
    }
    loadMyProducts(userId)
    setLoading(false)
  }

  async function loadMyProducts(userId) {
    const { data } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', userId)
    .order('created_at', { ascending: false })
    setMyProducts(data || [])
  }

  function calcCashValue(pts, curr) {
    const baseCash = pts / 10 // 100pts = 10 base units
    const rate = CURRENCY_MAP[curr].rate
    return (baseCash * rate / 10).toFixed(2)
  }

  function calcSellerEarn(pts, curr) {
    const cash = calcCashValue(pts, curr)
    return (cash * 0.9).toFixed(2) // 90% to seller
  }

  async function createProduct() {
    if (!name ||!pointsPrice ||!stock) return setMsg('Fill all fields')
    if (parseInt(pointsPrice) < 50) return setMsg('Min price 50 points')
    setMsg('Creating...')

    const cashValue = parseFloat(calcCashValue(pointsPrice, currency))

    const { error } = await supabase.from('products').insert({
      seller_id: user.id,
      name,
      description,
      points_price: parseInt(pointsPrice),
      cash_value: cashValue,
      currency: currency,
      stock: parseInt(stock),
      category,
      fulfillment_type: category === 'digital'? 'link' : 'manual',
      fulfillment_value: fulfillment
    })

    if (error) {
      setMsg('Error: ' + error.message)
    } else {
      setMsg('Product listed! You earn 90% per sale.')
      // Mark user as seller if first product
      if (!isSeller) {
        await supabase.from('profiles').update({ is_seller: true }).eq('id', user.id)
        setIsSeller(true)
      }
      // Reset form
      setName(''); setDescription(''); setPointsPrice(''); setStock(''); setFulfillment('')
      loadMyProducts(user.id)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
      <div className="text-[#0066FF] font-bold">Loading Seller Hub...</div>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#FFF9F0] text-black">
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <a href="/" className="text-[#0066FF] text-sm font-bold">← Home</a>
          <div className="text-right">
            <div className="text-xs text-gray-600">{user.email}</div>
            <div className="text-xs text-[#00C851] font-bold">Seller Balance: {CURRENCY_MAP[currency].symbol}{sellerBalance.toFixed(2)}</div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#EA580C] mb-2">Seller Hub</h1>
        <p className="text-sm text-gray-600 mb-4">List products. Earn 90%. Global customers.</p>

        {msg && (
          <div className={`p-3 rounded-lg mb-4 text-sm font-bold text-center ${
            msg.includes('Error')? 'bg-red-100 text-red-700' : 'bg-green-100 text-[#00C851]'
          }`}>
            {msg}
          </div>
        )}

        {/* Create Product Form */}
        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 mb-4">
          <h2 className="font-bold mb-3 text-[#1E293B]">List New Product</h2>
          <div className="space-y-3 text-sm">

            <input
              placeholder="Product Name: RED VELVET - Money Cake Tutorial"
              value={name}
              onChange={e=>setName(e.target.value)}
              className="w-full p-2 rounded border border-gray-300"
            />

            <textarea
              placeholder="Description: Instant PDF download. Make M750 cakes..."
              value={description}
              onChange={e=>setDescription(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 h-20"
            />

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold mb-1">Points Price</label>
                <input
                  type="number"
                  placeholder="500"
                  value={pointsPrice}
                  onChange={e=>setPointsPrice(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Currency</label>
                <select
                  value={currency}
                  onChange={e=>setCurrency(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300"
                >
                  {Object.keys(CURRENCY_MAP).map(c => (
                    <option key={c} value={c}>{c} - {CURRENCY_MAP[c].name}</option>
                  ))}
                </select>
              </div>
            </div>

            {pointsPrice && (
              <div className="bg-[#FFF9F0] p-2 rounded text-xs">
                <div>Buyer pays: <span className="font-bold">{pointsPrice} pts</span></div>
                <div>≈ {CURRENCY_MAP[currency].symbol}{calcCashValue(pointsPrice, currency)} {currency}</div>
                <div className="text-[#00C851]">You earn: <span className="font-bold">{CURRENCY_MAP[currency].symbol}{calcSellerEarn(pointsPrice, currency)} (90%)</span></div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold mb-1">Stock</label>
                <input
                  type="number"
                  placeholder="999 for digital"
                  value={stock}
                  onChange={e=>setStock(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Category</label>
                <select
                  value={category}
                  onChange={e=>setCategory(e.target.value)}
                  className="w-full p-2 rounded border border-gray-300"
                >
                  <option value="digital">Digital - Instant</option>
                  <option value="physical">Physical - Manual</option>
                  <option value="service">Service - Manual</option>
                </select>
              </div>
            </div>

            {category === 'digital' && (
              <input
                placeholder="Fulfillment: Google Drive link or download URL"
                value={fulfillment}
                onChange={e=>setFulfillment(e.target.value)}
                className="w-full p-2 rounded border border-gray-300"
              />
            )}

            <button
              onClick={createProduct}
              className="w-full bg-[#EA580C] text-white p-3 rounded-lg font-bold hover:bg-orange-700"
            >
              List Product Globally
            </button>
          </div>
        </div>

        {/* My Products */}
        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
          <h2 className="font-bold mb-3 text-[#1E293B]">My Listings ({myProducts.length})</h2>
          {myProducts.length === 0? (
            <div className="text-sm text-gray-500 text-center py-4">No products yet. List your first one above.</div>
          ) : (
            <div className="space-y-3">
              {myProducts.map(p => (
                <div key={p.id} className="border border-gray-200 rounded-lg p-3 text-sm">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-bold text-[#1E293B]">{p.name}</div>
                    <div className="text-xs bg-gray-100 px-2 py-1 rounded">{p.currency}</div>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">{p.description?.slice(0,60)}...</div>
                  <div className="flex justify-between text-xs">
                    <div>Price: <span className="font-bold">{p.points_price}pts</span></div>
                    <div>Stock: <span className="font-bold">{p.stock}</span></div>
                    <div className="text-[#00C851]">Earn: <span className="font-bold">{CURRENCY_MAP[p.currency || 'LSL'].symbol}{(p.cash_value * 0.9).toFixed(2)}</span></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <a href="/withdraw" className="text-[#00C851] text-sm font-bold">Withdraw Earnings →</a>
        </div>
      </div>
    </main>
  )
        }
