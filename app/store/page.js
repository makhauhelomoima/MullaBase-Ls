'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function StorePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) console.error('Store error:', error)
      else setProducts(data || [])
      setLoading(false)
    }
    fetchProducts()
  }, [])

  if (loading) return <div className="p-8 text-center">Loading MullaBase Store...</div>

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-white shadow-sm">
        <Link href="/" className="text-2xl font-bold text-[#B45309]">MullaBase</Link>
        <Link href="/sell" className="bg-[#B45309] text-white px-4 py-2 rounded text-sm font-bold">
          + Sell Item
        </Link>
      </div>

      {/* Products */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold text-[#1E293B] mb-4">MullaBase Store</h1>
        
        {products.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg mb-2">No products yet</p>
            <p className="text-sm mb-4">Be the first to sell on MullaBase</p>
            <Link href="/sell" className="bg-[#B45309] text-white px-6 py-3 rounded font-bold">
              List Your First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow p-3">
                {product.image_url && (
                  <img 
                    src={product.image_url} 
                    alt={product.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                <h3 className="font-bold text-sm text-[#1E293B] truncate">{product.name}</h3>
                <p className="text-[#B45309] font-bold">
                  {product.currency === 'USD' ? '$' : 'M'}{product.price}
                </p>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                  {product.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center p-4 text-sm text-[#B45309] italic bg-white">
        *Lesotho's pride. Africa's Treasure!*
      </div>
    </div>
  )
    }
