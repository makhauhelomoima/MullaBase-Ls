'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

export default function Sell() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [products, setProducts] = useState([])
  const [sales, setSales] = useState([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const [form, setForm] = useState({
    name: '',
    description: '',
    cost_points: '',
    cash_value: '',
    stock: '999',
    category: 'digital'
  })

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return window.location.href = '/'
      setUser(data.user)
      loadData(data.user.id)
    })
  }, [])

  async function loadData(userId) {
    const { data: profileData } = await supabase
     .from('profiles')
     .select('points, seller_balance, is_seller')
     .eq('id', userId)
     .single()
    setProfile(profileData)

    const { data: productData } = await supabase
     .from('seller_products')
     .select('*')
     .eq('seller_id', userId)
     .order('created_at', { ascending: false })
    if (productData) setProducts(productData)

    const { data: salesData } = await supabase
     .from('purchases')
     .select('*')
     .eq('seller_id', userId)
     .order('created_at', { ascending: false })
    if (salesData) setSales(salesData)
  }

  async function listProduct(e) {
    e.preventDefault()
    if (!form.name || !form.cost_points || !form.cash_value) {
      return setMsg('Fill name, points, and cash value')
    }

    setLoading(true)
    setMsg('Listing product...')

    const { error } = await supabase
     .from('seller_products')
     .insert({
       seller_id: user.id,
       seller_email: user.email,
       name: form.name,
       description: form.description,
       cost_points: parseInt(form.cost_points),
       cash_value: parseFloat(form.cash_value),
       stock: parseInt(form.stock),
       category: form.category,
       status: 'active'
     })

    if (error) {
      setMsg('Error: ' + error.message)
    } else {
      setMsg('Product listed! Buyers can see it in /store')
      setForm({ name: '', description: '', cost_points: '', cash_value: '', stock: '999', category: 'digital' })
      await supabase.from('profiles').update({ is_seller: true }).eq('id', user.id)
      loadData(user.id)
    }
    setLoading(false)
  }

  async function toggleStatus(product) {
    const newStatus = product.status === 'active' ? 'paused' : 'active'
    await supabase.from('seller_products').update({ status: newStatus }).eq('id', product.id)
    loadData(user.id)
  }

  async function deleteProduct(productId) {
    if (!confirm('Delete this listing? This cannot be undone.')) return
    await supabase.from('seller_products').delete().eq('id', productId)
    loadData(user.id)
  }

  async function withdrawEarnings() {
    if (!profile?.seller_balance || profile.seller_balance < 100) {
      return setMsg('Minimum 100 pts to withdraw earnings')
    }
    window.location.href = '/withdraw'
  }

  if (!user) return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center">
      <div className="text-[#EA580C] font-bold">Loading seller dashboard...</div>
    </div>
  )

  const totalEarnings = sales.reduce((sum, s) => sum + (s.cost_points - s.commission_points), 0)

  return (
    <main className="min-h-screen bg-[#FFF9F0] text-black">
      <div className="max-w-md mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <a href="/store" className="text-[#0066FF] text-sm font-bold">← Store</a>
          <div className="text-right">
            <div className="text-xs text-gray-600">Earnings</div>
            <div className="text-lg font-bold text-[#00C851]">{profile?.seller_balance || 0} pts</div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-[#EA580C] mb-2">Sell on MullaBase</h1>
        <p className="text-sm text-gray-600 mb-4">List products • Earn 90% • We take 10%</p>

        {msg && (
          <div className={`p-3 rounded-lg mb-4 text-sm font-bold text-center ${
            msg.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-[#00C851]'
          }`}>
            {msg}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-xl shadow p-3 border border-gray-200 text-center">
            <div className="text-xs text-gray-600">Total Earned</div>
            <div className="text-2xl font-bold text-[#00C851]">{totalEarnings}</div>
            <div className="text-xs text-gray-500">points</div>
          </div>
          <div className="bg-white rounded-xl shadow p-3 border border-gray-200 text-center">
            <div className="text-xs text-gray-600">Available</div>
            <div className="text-2xl font-bold text-[#1E293B]">{profile?.seller_balance || 0}</div>
            <button onClick={withdrawEarnings} className="text-xs text-[#0066FF] font-bold underline">
              Withdraw
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 mb-4">
          <h2 className="font-bold mb-3 text-[#1E293B]">List New Product</h2>
          <form onSubmit={listProduct} className="space-y-3">
            <input
              type="text"
              placeholder="Product name: M20 Airtime"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full p-2 rounded border border-gray-300 text-sm"
              required
            />
            <input
              type="text"
              placeholder="Description: Airtime for any network"
              value={form.description}
              onChange={(e) => setForm({...form, description: e.target.value})}
              className="w-full p-2 rounded border border-gray-300 text-sm"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                placeholder="Points: 200"
                value={form.cost_points}
                onChange={(e) => setForm({...form, cost_points: e.target.value})}
                className="w-full p-2 rounded border border-gray-300 text-sm"
                required
              />
              <input
                type="number"
                placeholder="Cash: 20"
                value={form.cash_value}
                onChange={(e) => setForm({...form, cash_value: e.target.value})}
                className="w-full p-2 rounded border border-gray-300 text-sm"
                required
              />
              <input
                type="number"
                placeholder="Stock: 999"
                value={form.stock}
                onChange={(e) => setForm({...form, stock: e.target.value})}
                className="w-full p-2 rounded border border-gray-300 text-sm"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#EA580C] text-white p-2 rounded-lg font-bold text-sm disabled:bg-gray-400"
            >
              {loading ? 'Listing...' : 'List Product'}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">100 points = M10. You get 90%, platform gets 10%.</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200 mb-4">
          <h2 className="font-bold mb-3 text-[#1E293B]">My Listings</h2>
          {products.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-4">No products listed yet</p>
          ) : (
            <div className="space-y-2">
              {products.map(p => (
                <div key={p.id} className="border border-gray-100 rounded p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-sm">{p.name}</div>
                      <div className="text-xs text-gray-600">{p.cost_points} pts • M{p.cash_value} • Stock: {p.stock}</div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${
                      p.status === 'active' ? 'bg-[#00C851] text-white' : 'bg-gray-400 text-white'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleStatus(p)}
                      className="flex-1 bg-[#0066FF] text-white text-xs p-1 rounded font-bold"
                    >
                      {p.status === 'active' ? 'Pause' : 'Activate'}
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="flex-1 bg-[#DC2626] text-white text-xs p-1 rounded font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-200">
          <h2 className="font-bold mb-3 text-[#1E293B]">Recent Sales</h2>
          {sales.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-4">No sales yet</p>
          ) : (
            <div className="space-y-2">
              {sales.map(s => (
                <div key={s.id} className="border-b border-gray-100 pb-2 text-xs">
                  <div className="flex justify-between">
                    <span className="font-bold">{s.product_name}</span>
                    <span className="text-[#00C851] font-bold">+{s.cost_points - s.commission_points} pts</span>
                  </div>
                  <div className="text-gray-500">
                    To: {s.email} • {new Date(s.created_at).toLocaleDateString()}
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
