import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const resend = new Resend(process.env.RESEND_API_KEY)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  const body = await request.text()
  const signature = request.headers.get('paddle-signature')
  
  // 1. Verify it's really Paddle. Skip if testing.
  // For production, add Paddle webhook signature verification here
  
  const event = JSON.parse(body)
  
  // 2. Only run when payment succeeds
  if (event.event_type === 'transaction.completed') {
    const transaction = event.data
    const customerEmail = transaction.customer.email
    const transactionId = transaction.id
    const amount = transaction.details.totals.total
    
    // 3. Save buyer to Supabase
    const { error: dbError } = await supabase
      .from('fortune_leads')
      .insert({
        email: customerEmail,
        paddle_transaction_id: transactionId,
        amount_paid: amount / 100
      })
    
    if (dbError) {
      console.log('Supabase error:', dbError)
    }
    
    // 4. Send PDF via Resend
    try {
      await resend.emails.send({
        from: 'MullaBase Store <noreply@yourverifieddomain.com>',
        to: customerEmail,
        subject: 'Your Fortune Brownies Business Kit is here 🍫',
        html: `
          <h2>Thanks for buying Fortune Brownies!</h2>
          <p>Download your PDF: <a href="https://your-paddle-file-link.com/fortune-brownies.pdf">Click here</a></p>
          <p>What's inside:</p>
          <ul>
            <li>Full recipe + costs</li>
            <li>Business math breakdown</li>
            <li>50 message ideas</li>
            <li>Sales scripts</li>
          </ul>
          <p>Start baking today. If you can use WhatsApp, you can run this.</p>
          <p>MullaBase Store</p>
        `
      })
    } catch (emailError) {
      console.log('Resend error:', emailError)
    }
  }
  
  return NextResponse.json({ received: true })
    }
