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
  const MULLABASE_USER_ID = 'paste-your-supabase-user-id-here'

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

    const {
