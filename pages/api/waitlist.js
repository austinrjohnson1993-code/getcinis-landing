import { createClient } from '@supabase/supabase-js'

// TODO: Send a real transactional confirmation email using Resend (resend.com).
// Steps when ready:
//   1. npm install resend
//   2. Add RESEND_API_KEY to Vercel env vars
//   3. Import Resend and call resend.emails.send({ from, to, subject, html }) after the DB insert
//   4. Update the success message back to reference the email if needed

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  )
}

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

  return res.status(200).json({
    message: "You're on the list! We'll reach out when early access opens."
  })
}
