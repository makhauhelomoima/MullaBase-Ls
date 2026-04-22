'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
export default function Careers() {
  const [jobs, setJobs] = useState([])
  useEffect(() => { supabase.from('careers').select('*').order('created_at', {ascending: false}).then(({data}) => setJobs(data||[])) }, [])
  return (
    <main className="min-h-screen bg-white text-black text-sm">
      <div className="border-b border-black p-2 flex justify-between"><span className="font-bold">CAREERS</span><a href="/dashboard" className="border border-black px-2">Back</a></div>
      <div className="p-4 space-y-2">
        {jobs.length === 0 && <div className="border border-black p-4 text-center">No jobs posted yet</div>}
        {jobs.map(j => <div key={j.id} className="border border-black p-2"><div className="font-bold">{j.job_title}</div><div>{j.description}</div><div className="text-xs">Contact: {j.contact} | {j.location}</div></div>)}
      </div>
    </main>
  )
    }
