import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const CinisMark = () => (
  <svg width="36" height="36" viewBox="0 0 64 64" fill="none">
    <polygon points="32,3 55,16 55,42 32,55 9,42 9,16" fill="none" stroke="#FF6644" strokeWidth="1.5" opacity="0.4"/>
    <polygon points="32,5 53,17 53,41 32,53 11,41 11,17" fill="#FF6644" opacity="0.55"/>
    <polygon points="32,7 51,18 51,40 32,52 13,40 13,18" fill="#1A0A05"/>
    <polygon points="32,13 46,21 46,40 32,47 18,40 18,21" fill="#6B1506"/>
    <polygon points="32,18 42,24 42,40 32,45 22,40 22,24" fill="#B82510"/>
    <polygon points="32,23 38,27 38,40 32,43 26,40 26,27" fill="#E8321A"/>
    <path d="M20,40 Q20,32 32,30 Q44,32 44,40 L39,43 L32,46 L25,43 Z" fill="#FF6644" opacity="0.9"/>
    <path d="M24,40 Q24,35 32,33 Q40,35 40,40 L38,42 L32,44 L26,42 Z" fill="#FFD0C0" opacity="0.75"/>
    <path d="M27,40 Q27,37 32,36 Q37,37 37,40 L36,41 L32,42 L28,41 Z" fill="#FFF0EB" opacity="0.6"/>
  </svg>
)

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible)
        }
      })
    }, { threshold: 0.1 })

    const elements = document.querySelectorAll(`.${styles.fadeInOnScroll}`)
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

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
        <section className={`${styles.problem} ${styles.fadeInOnScroll}`}>
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
        <section className={`${styles.howWorks} ${styles.fadeInOnScroll}`}>
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
        <section className={`${styles.waitlistSection} ${styles.fadeInOnScroll}`} id="waitlist">
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
