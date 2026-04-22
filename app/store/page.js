'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Store() {
  const [user, setUser] = useState(null)
  const [points, setPoints] = useState(0)
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return window.location.href = '/'
      setUser(data.user)
      loadData(data.user.id)
    })
  }, [])

  async function loadData(userId) {
    const { data: profile } = await supabase
     .from('profiles')
     .select('points')
     .eq('id', userId)
     .single()
    setPoints(profile?.points || 0)

    const { data: productData } = await supabase
     .from('seller_products')
     .select('*')
     .eq('status', 'active')
     .order('created_at', { ascending: false })
    if (productData) setProducts(productData)

    const { data: purchaseData } = await supabase
     .from('purchases')
     .select('*')
     .eq('user_id', userId)
     .order('created_at', { ascending: false })
    if (purchaseData) setPurchases(purchaseData)
  }

  async function buyProduct(product) {
    if (points < product.cost_points) {
      return setMsg(`Not enough points. You need ${product.cost_points} pts`)
    }
    if (product.seller_id === user.id) {
      return setMsg('You cannot buy your own product')
    }
    if (!confirm(`Buy ${product.name} for ${product.cost_points} points from ${product.seller_email}?`)) return

    setLoading(true)
    setMsg('Processing purchase...')

    const commission = Math.floor(product.cost_points * 0.1)
    const sellerEarnings = product.cost_points - commission

    const { error: buyerError } = await supabase
     .from('profiles')
     .update({ points: points - product.cost_points })
     .eq('id', user.id)

    if (buyerError) {
      setMsg('Error: ' + buyerError.message)
      setLoading(false)
      return
    }

    const { data: sellerProfile } = await supabase
     .from('profiles')
     .select('seller_balance')
     .eq('id', product.seller_id)
     .single()

    await supabase
     .from('profiles')
     .update({ seller_balance: (sellerProfile?.seller_balance || 0) + sellerEarnings })
     .eq('id', product.seller_id)

    const { error: purchaseError } = await supabase
     .from('purchases')
     .insert({
       user_id: user.id,
       email: user.email,
       seller_id: product.seller_id,
       seller_email: product.seller_email,
       product_id: product.id,
       product_name: product.name,
       cost_points: product.cost_points,
       commission_points: commission,
       cash_value: product.cash_value,
       status: 'completed',
       type: product.category
     })

    if (purchaseError) {
      setMsg('Error logging purchase: ' + purchaseError.message)
    } else {
      setMsg(`Success! You bought ${product.name}. Seller will fulfill order.`)
      loadData(user.id)
    }
    setLoading(false)
  }

  if (!user) return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
      <div className="text-[#0066FF] font-bold">Loading marketplace...</div>
    </div>
  )

  return (
    <main className="min-h-screen bg-[#FFF9F0] text-black">
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <a href="/" className="text-[#0066FF] text-sm font-bold">← Home</a>
          <div className="text-right">
            <div className="text-xs text-gray-600">{user.email}</div>
            <div className="text-lg font-bold text-[#00C851]">{points} pts</div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-[#DC2626]">Marketplace</h1>
          <a href="/sell" className="bg-[#EA580C] text-white px-3 py-1 rounded-lg text-xs font-bold">+ Sell</a>
        </div>
        <p className="text-sm text-gray-600 mb-4">Buy from sellers • 10% platform fee</p>

        {msg && (
          <div className={`p-3 rounded-lg mb-4 text-sm font-bold text-center ${
            msg.includes('Error') || msg.includes('Not enough') || msg.includes('cannot') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-[#00C851]'
          }`}>
            {msg}
          </div>
        )}

        <div className="space-y-3 mb-6">
          {products.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
              No products yet. Be the first to <a href="/sell" className="text-[#0066FF] underline">sell something</a>!
            </div>
          ) : products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-bold text-[#1E293B]">{product.name}</div>
                  <div className="text-xs text-gray-600">{product.description}</div>
                  <div className="text-xs text-gray-400 mt-1">Sold by: {product.seller_email}</div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-[#EA580C]">{product.cost_points}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
              
              <button
                onClick={() => buyProduct(product)}
                disabled={loading || points < product.cost_points || product.seller_id === user.id}
                className="w-full bg-[#DC2626] text-white p-2 rounded-lg font-bold text-sm disabled:bg-gray-400 hover:bg-red-700 mt-2"
              >
                {loading ? 'Processing...' : 
                 product.seller_id === user.id ? 'Your listing' :
                 points < product.cost_points ? 'Not enough points' : 
                 `Buy for ${product.cost_points} pts`}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
          <h2 className="font-bold mb-3 text-[#1E293B]">Your Purchases</h2>
          {purchases.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-4">No purchases yet</p>
          ) : (
            <div className="space-y-2">
              {purchases.map(p => (
                <div key={p.id} className="border-b border-gray-100 pb-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">{p.product_name}</span>
                    <span className="text-[#EA580C] font-bold">-{p.cost_points} pts</span>
                  </div>
                  <div className="text-gray-500">
                    From: {p.seller_email} • {new Date(p.created_at).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
