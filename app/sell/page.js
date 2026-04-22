'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function SellPage() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return alert('Login first')

    const { error } = await supabase.from('products').insert({
      seller_id: user.id,
      title: formData.get('title'),
      price: Number(formData.get('price')),
      cover_url: formData.get('cover_url'),
      pdf_url: formData.get('pdf_url'),
      category: formData.get('category'),
      currency: formData.get('currency') || 'LSL',
      fulfillment: formData.get('fulfillment'),
      auto_deliver: formData.get('auto_deliver') === 'on',
      is_active: true
    })

    setLoading(false)
    if (error) return alert(error.message)
    alert('Listed! 🔥')
    e.target.reset()
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-3">
      <h1 className="text-2xl font-bold">List Digital Product</h1>
      
      <input name="title" placeholder="RED VELVET Tutorial" required className="w-full p-2 rounded bg-black/20 border border-white/10" />
      <input name="price" type="number" placeholder="500" required className="w-full p-2 rounded bg-black/20 border border-white/10" />
      <input name="cover_url" type="url" placeholder="Cover image URL" required className="w-full p-2 rounded bg-black/20 border border-white/10" />
      <input name="pdf_url" type="url" placeholder="PDF preview URL" className="w-full p-2 rounded bg-black/20 border border-white/10" />
      <input name="category" placeholder="Tutorials" required className="w-full p-2 rounded bg-black/20 border border-white/10" />
      
      <div className="border-t border-white/10 pt-3">
        <label className="block text-sm mb-1">Google Drive PDF Link *</label>
        <input 
          name="fulfillment" 
          type="url"
          placeholder="https://drive.google.com/file/d/..." 
          required
          className="w-full p-2 rounded bg-black/20 border border-white/10" 
        />
      </div>

      <div className="flex items-center gap-2">
        <input name="auto_deliver" type="checkbox" defaultChecked className="rounded" />
        <label className="text-sm">Auto-email PDF to buyer instantly</label>
      </div>

      <button disabled={loading} className="w-full p-3 bg-white text-black rounded font-bold">
        {loading ? 'Listing...' : 'List Product'}
      </button>
    </form>
  )
      }
