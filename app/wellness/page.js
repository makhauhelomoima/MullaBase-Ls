'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function Wellness() {
  const [p, setP] = useState({ topic: '', sub_topic: '', body: '', summary: '', author: '' })
  const [posts, setPosts] = useState([])
  useEffect(() => { supabase.from('wellness_posts').select('*, profiles(name)').order('created_at', {ascending: false}).then(({data}) => setPosts(data||[])) }, [])
  const submit = async () => { if (!p.topic||!p.body) return alert('Fill topic and body'); if (p.body.length > 1000) return alert('Max 1000'); const { error } = await supabase.from('wellness_posts').insert([p]); if (error) return alert(error.message); window.location.reload() }
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">WELLNESS HUB</span><a href="/dashboard" className="border border-black px-2">Back</a></div>
      <div className="p-4"><div className="border border-black p-3 mb-4
