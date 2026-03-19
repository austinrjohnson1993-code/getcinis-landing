import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

const CONFIRMATION_TEXT = `Hey — you're in.

We're building Cinis for people who know what they need to do but struggle to start. Early access is open and we'll reach out when your spot is ready.

In the meantime, you can sign in at cinis.app.

— The Cinis team`

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, source } = req.body

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  const supabaseAdmin = getAdminClient()

  const { error } = await supabaseAdmin
    .from('waitlist_signups')
    .insert({ email: email.trim().toLowerCase(), source: source || 'landing' })

  if (error) {
    // Ignore duplicate email errors — treat as success so the UI doesn't leak info
    if (!error.message?.includes('duplicate') && !error.code?.includes('23505')) {
      console.error('[waitlist] insert error:', JSON.stringify(error))
      return res.status(500).json({ error: 'Failed to join waitlist' })
    }
  }

  console.log(`[waitlist] signup: ${email}`)

  // Send confirmation email — non-blocking, failure does not affect response
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Cinis <hello@getcinis.app>',
      to: email.trim().toLowerCase(),
      subject: "You're on the list.",
      text: CONFIRMATION_TEXT,
    })
    console.log(`[waitlist] confirmation email sent: ${email}`)
  } catch (emailErr) {
    console.error('[waitlist] email send failed:', emailErr?.message)
  }

  return res.status(200).json({
    message: "You're on the list! We'll reach out when early access opens."
  })
}
