import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const CinisMark = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="18,2 32,10 32,26 18,34 4,26 4,10" fill="#E8321A" opacity="0.15" stroke="#E8321A" strokeWidth="1.5"/>
    <polygon points="18,7 27,12 27,24 18,29 9,24 9,12" fill="#E8321A" opacity="0.3"/>
    <polygon points="18,12 23,15 23,21 18,24 13,21 13,15" fill="#E8321A"/>
  </svg>
)

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleWaitlist = async (e) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (res.ok) {
        setSubmitted(true)
        setEmail('')
        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const scrollToWaitlist = (e) => {
    e.preventDefault()
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>Cinis — AI that remembers you</title>
        <meta name="description" content="An AI coaching partner that learns your patterns, knows your pace, and reaches out before you fall behind." />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.page}>
        {/* Navigation */}
        <nav className={styles.nav}>
          <a href="#" className={styles.logo}>
            <CinisMark />
            <span>Cinis</span>
          </a>
          <div className={styles.navLinks}>
            <a href="https://cinis.app/login">Sign in</a>
            <button onClick={scrollToWaitlist} className={styles.navCta}>Get early access</button>
          </div>
        </nav>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <div className={styles.label}>NOW IN EARLY ACCESS</div>
            <h1 className={styles.headline}>
              Most productivity apps wait for you<br />to remember them.
              <br />
              <span className={styles.accentText}>Cinis remembers you.</span>
            </h1>
            <p className={styles.subhead}>
              An AI coaching partner that learns your patterns, knows your pace, and reaches out before you fall behind. Built for ADHD brains. Works for everyone.
            </p>
            <form onSubmit={handleWaitlist} className={styles.heroForm}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <button type="submit" disabled={loading} className={styles.heroCta}>
                {loading ? 'Sending...' : 'Get early access'}
              </button>
            </form>
            <p className={styles.microCopy}>Free to start. No credit card.</p>
          </div>
        </section>

        {/* Problem Section */}
        <section className={styles.problem}>
          <div className={styles.problemContent}>
            <h2 className={styles.problemHeading}>You already know what to do.</h2>
            <div className={styles.problemText}>
              <p>You've tried the apps. Set up the systems. Bought the planners. Each one started with genuine hope. Each one sits unopened now — not because you failed, but because they assumed the wrong problem.</p>
              <p>The gap between knowing what to do and actually doing it isn't organizational. It's neurological. No system fixes that. But the right relationship can.</p>
              <p>Cinis is built on one idea: a partner that knows you changes everything. It watches your patterns, learns your pace, and reaches out with exactly what you need at exactly the right moment. Not another thing to remember. Something that remembers you.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className={styles.howWorks}>
          <h2 className={styles.sectionHeading}>Three things that change everything</h2>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <h3>It learns you</h3>
              <p>13 questions on day one build a coaching profile shaped entirely around who you are. Every interaction makes it smarter about what drives you, what stops you, and what actually works.</p>
            </div>
            <div className={styles.feature}>
              <h3>It reaches out</h3>
              <p>Morning check-ins. Evening wrap-ups. Nudges exactly when you're about to drift. You don't open Cinis. Cinis opens the conversation. It shows up for you before you have to remember it exists.</p>
            </div>
            <div className={styles.feature}>
              <h3>It remembers</h3>
              <p>Patterns. Avoidances. Wins. Momentum. The longer you use Cinis, the more intelligent it becomes about what you need. It doesn't start fresh every day. It builds on everything it knows about you.</p>
            </div>
          </div>
        </section>

        {/* Waitlist CTA */}
        <section className={styles.waitlistSection} id="waitlist">
          <div className={styles.waitlistContent}>
            <h2 className={styles.waitlistHeading}>Ready for a partner that actually shows up?</h2>
            <p className={styles.waitlistSubhead}>Join the early access list. Free. No credit card required.</p>
            <form onSubmit={handleWaitlist} className={styles.waitlistForm}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              <button type="submit" disabled={loading} className={styles.waitlistCta}>
                {loading ? 'Sending...' : 'Get early access'}
              </button>
            </form>
            {submitted && <p className={styles.successMessage}>✓ Check your email</p>}
            <p className={styles.waitlistMicro}>Free to start. No credit card.</p>
          </div>
        </section>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>Cinis · Early Access 2026</p>
        </footer>
      </div>
    </>
  )
}
