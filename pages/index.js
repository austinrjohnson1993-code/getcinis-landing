import { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const CinisMark = () => (
  <svg width="32" height="32" viewBox="0 0 64 64" fill="none">
    <polygon points="32,2 56,15 56,43 32,56 8,43 8,15" fill="none" stroke="#FF6644" strokeWidth="1.1" opacity="0.45"/>
    <polygon points="32,4 54,16 54,42 32,54 10,42 10,16" fill="#FF6644"/>
    <polygon points="32,7 51,18 51,40 32,52 13,40 13,18" fill="#120704"/>
    <polygon points="32,14 46,22 46,40 32,48 18,40 18,22" fill="#5A1005"/>
    <polygon points="32,20 42,26 42,40 32,45 22,40 22,26" fill="#A82010"/>
    <polygon points="32,26 38,29 38,40 32,43 26,40 26,29" fill="#E8321A"/>
    <polygon points="32,29 45,40 40,43 32,47 24,43 19,40" fill="#FF6644" opacity="0.92"/>
    <polygon points="32,33 41,40 38,42 32,45 26,42 23,40" fill="#FFD0C0" opacity="0.76"/>
    <polygon points="32,36 37,40 36,41 32,43 28,41 27,40" fill="#FFF0EB" opacity="0.60"/>
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
        <title>Cinis — Where start meets finished.</title>
        <meta property="og:title" content="Cinis — Where start meets finished." />
        <meta name="description" content="An AI coaching partner that learns your patterns, knows your pace, and reaches out before you fall behind." />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.page}>
        {/* Navigation */}
        <nav className={styles.nav}>
          <a href="#" className={styles.logo}>
            <CinisMark />
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 600, letterSpacing: "0.16em", color: "#F0EAD6" }}>Cinis</span>
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
              Most apps wait for you<br />to remember them.
              <br />
              <span className={styles.accentText}>Cinis remembers you.</span>
            </h1>
            <p className={styles.subhead}>
              An external executive function that learns your patterns, knows your pace, and reaches out before you fall behind. Built for brains with an execution gap. Works for everyone.
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
            <h2 className={styles.problemHeading}>You already know what you need to do.</h2>
            <div className={styles.problemText}>
              <p>The problem isn't knowledge. It's not motivation either. It's the gap between knowing and starting — and it's wider for some brains than others.</p>
              <p>You've tried the apps. The lists. The systems. They all work until they don't. Because they wait for you to show up. And some days, you can't.</p>
              <p>Cinis doesn't wait. It reaches out. It remembers what you told it last week. It notices when you've gone quiet. It's not a tool — it's a presence.</p>
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

        {/* Social Proof / Why Cinis */}
        <section className={`${styles.socialProof} ${styles.fadeInOnScroll}`}>
          <h2 className={styles.sectionHeading}>Built for the way your brain actually works.</h2>
          <div className={styles.statGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>13 questions</div>
              <div className={styles.statLabel}>Your coach knows you before you send a single message</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>6 coaching voices</div>
              <div className={styles.statLabel}>Find the tone that actually moves you</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>3-layer memory</div>
              <div className={styles.statLabel}>Your coach remembers yesterday, last week, and who you are</div>
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
          <p className={styles.footerMission}>Cinis is built for people with execution gaps — anyone who's ever stared at a task and couldn't begin. You're not broken. You just need a different kind of support.</p>
          <p className={styles.footerMission}>From ashes, momentum.</p>
        </footer>
      </div>
    </>
  )
}
