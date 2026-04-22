'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  if (loading) return <div className="p-8">Loading MullaBase...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">MullaBase</h1>
          {user? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <button 
                onClick={handleLogout}
                className="text-sm bg-gray-200 px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded">
              Login
            </Link>
          )}
        </div>

        <div className="bg-white p-8 rounded-lg shadow text-center">
          <h2 className="text-2xl font-bold mb-4">Buy & Sell Digital Products</h2>
          <p className="text-gray-600 mb-6">Lesotho's marketplace for PDFs, templates, and more.</p>
          
          <div className="flex gap-4 justify-center">
            <Link 
              href="/store" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold"
            >
              Browse Store
            </Link>
            <Link 
              href="/sell" 
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
            >
              Start Selling
            </Link>
          </div>
        </div>

        {user && (
          <div className="mt-8 text-center text-sm text-gray-500">
            Welcome back, {user.email}
          </div>
        )}
      </div>
    </div>
  )
    }
