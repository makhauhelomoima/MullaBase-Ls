import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // use service role for writes
)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  const { product_id, buyer_id } = await req.json()

  // 1. Get product + seller
  const { data: product } = await supabase
    .from('products')
    .select('*, profiles:seller_id(email)')
    .eq('id', product_id)
    .single()

  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

  // 2. Get buyer
  const { data: buyer } = await supabase
    .from('profiles')
    .select('id, email, points')
    .eq('id', buyer_id)
    .single()

  // 3. Check points
  if (buyer.points < product.price) {
    return NextResponse.json({ error: 'Insufficient points' }, { status: 400 })
  }

  // 4. Deduct buyer, credit seller 90%
  const sellerCut = Math.floor(product.price * 0.9)
  
  await supabase.from('profiles').update({ points: buyer.points - product.price }).eq('id', buyer_id)
  await supabase.rpc('increment_points', { user_id: product.seller_id, amount: sellerCut })

  // 5. Record purchase
  await supabase.from('purchases').insert({
    product_id,
    buyer_id,
    seller_id: product.seller_id,
    price_paid: product.price
  })

  // 6. Auto-email if enabled
  if (product.auto_deliver && product.fulfillment) {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: buyer.email,
      subject: `Your ${product.title} is ready 📦`,
      html: `
        <h2>Thanks for your purchase!</h2>
        <p>Here’s your download link for <b>${product.title}</b>:</p>
        <a href="${product.fulfillment}">Download PDF</a>
        <p>This link will work forever. Save it.</p>
        <br>
        <p>- MullaBase</p>
      `
    })
  }

  return NextResponse.json({ success: true, delivered: product.auto_deliver })
    }
