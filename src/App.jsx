import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowUpRight, Phone, Menu, X, Bot, CalendarCheck,
  ShieldCheck, Clock, CheckCircle2, Mail, MapPin,
  Activity, RefreshCw, Settings, ChevronRight,
  PhoneCall, FileText, BarChart3, CreditCard, Star, Zap,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const NAV_LINKS = [
  { label: 'Problem',  href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Process',  href: '#process' },
  { label: 'Includes', href: '#included' },
  { label: 'FAQ',      href: '#faq' },
]

const SERVICES = [
  { icon: PhoneCall,    title: '24/7 Inbound Call Answering', text: 'Every call answered, every time. No voicemail, no missed leads, no "leave a message."' },
  { icon: FileText,     title: 'Lead Qualification on the Call', text: 'Project type, timeline, budget range — captured and logged before you ever speak to them.' },
  { icon: CalendarCheck,title: 'Estimate Booking', text: 'The agent drops the estimate straight into your calendar with all project details attached.' },
  { icon: RefreshCw,    title: 'Quote Follow-Up Automation', text: 'Automated follow-up on every estimate that goes cold — without you touching anything.' },
  { icon: Star,         title: 'After-Hours Coverage', text: 'Nearly half of all inbound calls come outside business hours. Every one gets answered.' },
  { icon: BarChart3,    title: 'Monthly Optimization', text: 'We review call performance every month and update the agent so it keeps getting better.' },
]

// ─── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ end, suffix = '', prefix = '', duration = 2000 }) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const startTs = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - startTs) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(Math.round(end * eased))
          if (t < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.4 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])

  return <span ref={ref} className="tabular-nums">{prefix}{value}{suffix}</span>
}

// ─── SignatureAnim — Falling sparks (construction/AI) ─────────────────────────
function SignatureAnim() {
  const STATUSES = ['Incoming call…', 'Lead captured', 'Response sent', 'Estimate booked', 'Follow-up queued']
  const [statusIdx, setStatusIdx] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setStatusIdx(i => (i + 1) % STATUSES.length), 2400)
    return () => clearInterval(id)
  }, [])

  const sparks = [
    { left: '15%', delay: '0s',    dur: '1.9s', size: 6 },
    { left: '28%', delay: '0.35s', dur: '2.2s', size: 4 },
    { left: '44%', delay: '0.7s',  dur: '1.7s', size: 7 },
    { left: '58%', delay: '1.0s',  dur: '2.0s', size: 5 },
    { left: '72%', delay: '0.5s',  dur: '1.85s',size: 6 },
    { left: '85%', delay: '1.3s',  dur: '2.1s', size: 4 },
    { left: '36%', delay: '1.6s',  dur: '1.75s',size: 5 },
  ]

  return (
    <div className="relative h-44 rounded-3xl overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a0e06 0%, #120a00 50%, #1a0800 100%)' }}>
      <style>{`
        @keyframes spark-fall {
          0%   { transform: translate(-50%, -10px) rotate(0deg); opacity: 0; }
          10%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translate(-50%, 100px) rotate(180deg); opacity: 0; }
        }
        @keyframes spark-ripple {
          0%   { transform: translateX(-50%) scale(0.4); opacity: 0.8; }
          80%  { transform: translateX(-50%) scale(3.2); opacity: 0; }
          100% { transform: translateX(-50%) scale(3.2); opacity: 0; }
        }
        @keyframes spark-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Atmospheric blobs */}
      <div className="absolute top-3 left-6 w-20 h-16 rounded-full bg-primary/20 blur-xl" />
      <div className="absolute top-2 right-8 w-14 h-14 rounded-full bg-amber-500/10 blur-xl" />
      <div className="absolute bottom-5 left-1/2 w-28 h-10 rounded-full bg-primary/10 blur-2xl" />

      {/* Source element — phone handset SVG */}
      <svg className="absolute top-3 left-1/2 -translate-x-1/2" width="110" height="26" viewBox="0 0 110 26">
        <rect x="8" y="8" width="94" height="10" rx="5" fill="none" stroke="#E07B39" strokeWidth="1.5" opacity="0.6" />
        {[18, 30, 44, 58, 72, 88].map((x, i) => (
          <circle key={i} cx={x} cy="13" r="2.5" fill="#E07B39" opacity="0.55" />
        ))}
        {[18, 30, 44, 58, 72, 88].map((x, i) => (
          <line key={i} x1={x} y1="20" x2={x} y2="26" stroke="#F09A60" strokeWidth="1.5" opacity="0.4" />
        ))}
      </svg>

      {/* Falling sparks */}
      {sparks.map((d, i) => (
        <div key={i} className="absolute" style={{
          left: d.left, top: '28px',
          width: d.size, height: d.size,
          borderRadius: i % 3 === 0 ? '2px' : '50%',
          background: i % 2 === 0 ? '#E07B39' : '#F09A60',
          animation: `spark-fall ${d.dur} ${d.delay} ease-in infinite`,
          boxShadow: `0 0 8px ${i % 2 === 0 ? '#E07B39' : '#F09A60'}`,
          transform: 'translate(-50%, -10px)',
        }} />
      ))}

      {/* Surface line */}
      <svg className="absolute bottom-10 left-0" width="100%" height="10" viewBox="0 0 400 10" preserveAspectRatio="none">
        <path d="M0,5 Q50,2 100,5 T200,5 T300,5 T400,5" fill="none" stroke="#E07B39" strokeWidth="1" opacity="0.3" />
      </svg>

      {/* Ripples */}
      {[20, 50, 80].map((left, i) => (
        <div key={i} className="absolute bottom-9" style={{
          left: `${left}%`,
          width: '16px', height: '6px',
          borderRadius: '50%',
          border: '1px solid #E07B39',
          animation: `spark-ripple 2.1s ${i * 0.65}s ease-out infinite`,
          opacity: 0.6,
        }} />
      ))}

      {/* Header strip */}
      <div className="absolute top-0 left-0 right-0 px-4 py-2 flex items-center justify-between">
        <span className="font-mono text-[9px] uppercase tracking-widest text-primary/80">AI Call Pipeline</span>
        <span className="font-mono text-[9px] text-primary/70">Live</span>
      </div>

      {/* Footer strip */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-2 flex items-center gap-2 bg-black/40">
        <div className="w-1.5 h-1.5 rounded-full bg-primary ring-pulse flex-shrink-0" />
        <span className="font-mono text-[9px] text-white/70" style={{ animation: 'spark-fadein 0.4s ease' }} key={statusIdx}>
          {STATUSES[statusIdx]}
        </span>
      </div>
    </div>
  )
}

// ─── Lead Flow Shuffler ───────────────────────────────────────────────────────
function LeadFlowShuffler() {
  const cards = [
    { label: 'Incoming Call', color: '#E07B39', icon: '📞', text: 'Sarah M. — Kitchen remodel · just now' },
    { label: 'Lead Qualified', color: '#F09A60', icon: '✅', text: 'Budget $15K · Timeline 6 weeks · Confirmed' },
    { label: 'Estimate Booked', color: '#22C55E', icon: '📅', text: 'Thursday 10am on your calendar' },
  ]
  const [front, setFront] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setFront(f => (f + 1) % 3), 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-44 rounded-3xl overflow-hidden bg-surface flex items-center justify-center">
      {cards.map((c, i) => {
        const offset = (i - front + 3) % 3
        const zIndex = 3 - offset
        const scale = offset === 0 ? 1 : offset === 1 ? 0.94 : 0.88
        const opacity = offset === 0 ? 1 : offset === 1 ? 0.65 : 0.4
        const blur = offset === 0 ? 0 : offset === 1 ? 1 : 3
        const translateY = offset === 0 ? 0 : offset === 1 ? 8 : 16
        return (
          <div key={i} className="absolute inset-4 rounded-2xl p-4 flex flex-col justify-between border border-divider"
            style={{
              background: `linear-gradient(135deg, ${c.color}18, ${c.color}06)`,
              borderColor: `${c.color}25`,
              zIndex,
              transform: `scale(${scale}) translateY(${translateY}px)`,
              opacity,
              filter: `blur(${blur}px)`,
              transition: 'all 0.55s cubic-bezier(0.25,0.46,0.45,0.94)',
            }}>
            <div className="flex items-center gap-2">
              <span className="text-base">{c.icon}</span>
              <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: c.color }}>{c.label}</span>
            </div>
            <p className="font-body text-xs text-muted leading-relaxed">{c.text}</p>
          </div>
        )
      })}
    </div>
  )
}

// ─── AI Scheduler ─────────────────────────────────────────────────────────────
function AIScheduler() {
  const [step, setStep] = useState(0)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const slots = [9, 11, 14]
  const targetDay = 3
  const targetSlot = 0

  useEffect(() => {
    let idx = 0
    const id = setInterval(() => {
      idx = (idx + 1) % 5
      setStep(idx)
    }, 1300)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative h-44 rounded-3xl overflow-hidden bg-surface p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-[9px] uppercase tracking-widest text-primary/80">Estimate Scheduler</span>
        {step >= 3 && <span className="font-mono text-[9px] text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Booked</span>}
      </div>
      <div className="grid grid-cols-5 gap-1 flex-1">
        {days.map((day, di) => (
          <div key={di} className="flex flex-col gap-1">
            <span className="font-mono text-[8px] text-center text-muted uppercase">{day}</span>
            {slots.map((slot, si) => {
              const isTarget = di === targetDay && si === targetSlot
              const isCursor = step >= 1 && isTarget
              const isBooked = step >= 3 && isTarget
              return (
                <div key={si}
                  className="rounded-lg h-7 flex items-center justify-center text-[8px] font-mono transition-all duration-300"
                  style={{
                    background: isBooked ? '#E07B39' : isCursor ? 'rgba(224,123,57,0.25)' : 'rgba(255,255,255,0.04)',
                    border: isCursor ? '1px solid #E07B39' : '1px solid rgba(255,255,255,0.06)',
                    color: isBooked ? '#0C0C0E' : '#777',
                    transform: isCursor && step === 2 ? 'scale(1.1)' : 'scale(1)',
                  }}>
                  {isBooked ? '✓' : `${slot}am`}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      {step >= 3 && (
        <div className="text-[9px] font-mono text-primary text-center animate-pulse">
          Estimate confirmed — Thu 9am
        </div>
      )}
    </div>
  )
}

// ─── Missed Call Card ─────────────────────────────────────────────────────────
function MissedCallCard() {
  return (
    <div className="rounded-2xl bg-surface border border-divider p-6 shadow-xl shadow-black/40 max-w-sm w-full">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
        <span className="font-mono text-[10px] text-red-400 uppercase tracking-wider">Missed Call</span>
        <span className="font-mono text-[10px] text-muted ml-auto">2 mins ago</span>
      </div>
      {/* Caller */}
      <p className="font-body font-semibold text-ink text-base mb-1">Sarah M.</p>
      <p className="font-body text-sm text-muted mb-5">Kitchen remodel · 1,200 sq ft</p>
      {/* Divider */}
      <div className="h-px bg-divider mb-5" />
      {/* Resolved rows */}
      <div className="flex flex-col gap-3 mb-5">
        {['AI Agent answered', 'Lead qualified', 'Estimate booked'].map((item, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-green-500/15 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="h-2.5 w-2.5 text-green-400" strokeWidth={2.5} />
            </div>
            <span className="font-mono text-[10px] text-green-400 uppercase tracking-wide">{item}</span>
          </div>
        ))}
      </div>
      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full">
        <div className="w-1.5 h-1.5 rounded-full bg-green-400 ring-pulse" />
        Handled automatically
      </span>
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-lg shadow-black/30' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 sm:px-10 h-16 flex items-center justify-between">
          <a href="#home" className="font-display font-bold text-xl tracking-wide text-ink lift-on-hover">
            CORNERSTONE GROWTH
          </a>
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href}
                className="font-body text-sm text-muted hover:text-ink lift-on-hover transition-colors duration-200">
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="#book-call"
              className="hidden sm:inline-flex magnetic-btn items-center gap-1.5 bg-primary text-deep text-sm font-semibold px-5 py-2.5 rounded-sm shadow-lg shadow-primary/20 tracking-wide uppercase">
              Book a Call <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            </a>
            <button onClick={() => setOpen(true)} className="lg:hidden p-2 text-muted hover:text-ink transition-colors" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-deep/97 backdrop-blur-2xl flex flex-col p-6">
          <div className="flex items-center justify-between mb-12">
            <span className="font-display font-bold text-lg text-ink">CORNERSTONE GROWTH</span>
            <button onClick={() => setOpen(false)} className="p-2 text-muted hover:text-ink">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-7">
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)}
                className="font-display text-3xl font-bold text-ink/80 hover:text-primary transition-colors">
                {l.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto">
            <a href="#book-call" onClick={() => setOpen(false)}
              className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-6 py-4 rounded-sm w-full justify-center shadow-lg shadow-primary/20 uppercase tracking-wide">
              Book a Call <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.7, delay: 0.2, ease: 'power3.out' })
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1,   delay: 0.4, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 50, opacity: 0, duration: 1.1, delay: 0.55,ease: 'power3.out' })
      gsap.from('.hero-line-3', { y: 50, opacity: 0, duration: 1.1, delay: 0.65,ease: 'power3.out' })
      gsap.from('.hero-sub',    { y: 24, opacity: 0, duration: 0.8, delay: 0.85,ease: 'power3.out' })
      gsap.from('.hero-cta',    { y: 20, opacity: 0, duration: 0.7, delay: 1.0, ease: 'power3.out' })
      gsap.from('.hero-card',   { x: 30, opacity: 0, duration: 0.9, delay: 1.1, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-background">
      {/* Grid bg */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Top gradient fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent" />

      {/* Floating particles */}
      <div className="absolute top-32 right-16 w-2 h-2 rounded-full bg-primary/60 animate-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-48 right-32 w-1.5 h-1.5 rounded-full bg-primary/40 animate-float" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-24 right-52 w-1 h-1 rounded-full bg-primary-light/50 animate-float" style={{ animationDelay: '3s' }} />
      <div className="absolute top-64 right-20 w-2.5 h-2.5 rounded-full bg-primary/30 animate-float" style={{ animationDelay: '0.8s' }} />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pt-28 pb-20 min-h-[100dvh] flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left */}
        <div className="flex-1">
          <span className="hero-eyebrow font-mono text-[10px] uppercase tracking-[0.25em] text-primary block mb-6">
            The Contractor Growth System
          </span>
          <h1 className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-ink tracking-tight leading-[0.95] mb-8">
            <span className="hero-line-1 block">Your Phone Rings.</span>
            <span className="hero-line-2 block">You're On a Job Site.</span>
            <span className="hero-line-3 block text-primary">That Lead Just Called<br className="hidden sm:block" /> Your Competitor.</span>
          </h1>
          <p className="hero-sub font-body text-base sm:text-lg text-muted leading-relaxed max-w-lg mb-10">
            We build AI voice agents trained specifically for contractors — so every call gets answered, every lead gets qualified, and every estimate gets followed up. 24/7.
          </p>
          <div className="hero-cta flex flex-col sm:flex-row gap-3 items-start">
            <a href="#book-call"
              className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep px-7 py-4 rounded-sm font-semibold shadow-lg shadow-primary/25 text-sm uppercase tracking-wide">
              Book a Free Strategy Call <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </div>
          <p className="font-body text-sm text-muted mt-4">20 minutes. No pitch. We'll show you exactly what you're losing.</p>
        </div>

        {/* Right — missed call card */}
        <div className="hero-card flex-shrink-0">
          <MissedCallCard />
        </div>
      </div>
    </section>
  )
}

// ─── Features ─────────────────────────────────────────────────────────────────
function Features() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section id="features" ref={ref} className="py-24 sm:py-32 bg-background border-t border-divider">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Platform</p>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-ink max-w-2xl">
            What the system does <span className="font-serif italic font-medium text-primary-light">while you work.</span>
          </h2>
          <p className="mt-4 text-muted text-base sm:text-lg max-w-xl leading-relaxed">
            Three modules working in parallel — so no lead falls through the cracks while you're on site.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="feature-card rounded-2xl bg-surface border border-divider p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Lead Flow</p>
            <h3 className="font-display text-xl font-black text-ink mb-4 tracking-tight">From ring to booked</h3>
            <LeadFlowShuffler />
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Every call triggers an instant response sequence. The AI qualifies, responds, and books — without any human intervention.
            </p>
          </div>

          <div className="feature-card rounded-2xl bg-surface border border-divider p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">AI Pipeline</p>
            <h3 className="font-display text-xl font-black text-ink mb-4 tracking-tight">Live automation</h3>
            <SignatureAnim />
            <p className="mt-4 text-sm text-muted leading-relaxed">
              Real-time processing of every call, lead, and follow-up — running in parallel across everything in your pipeline.
            </p>
          </div>

          <div className="feature-card rounded-2xl bg-surface border border-divider p-6 sm:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2">Scheduling</p>
            <h3 className="font-display text-xl font-black text-ink mb-4 tracking-tight">Estimates booked instantly</h3>
            <AIScheduler />
            <p className="mt-4 text-sm text-muted leading-relaxed">
              The agent finds the next open slot and books the estimate in real time — no phone tag, no back-and-forth.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Pillars ──────────────────────────────────────────────────────────────────
function Pillars() {
  const pillars = [
    {
      eyebrow: 'The core problem',
      stat: <><CountUp end={40} suffix="–50%" /></>,
      desc: 'Of inbound calls go to voicemail at the average GC company. Every missed call is a job going to whoever answered faster.',
    },
    {
      eyebrow: 'Response window',
      stat: <><CountUp end={5} suffix=" min" /></>,
      desc: "That's how long a homeowner waits before calling the next contractor on Google. Speed of answer is the only differentiator.",
    },
    {
      eyebrow: 'Time to live',
      stat: '5–7 days',
      desc: 'From your first strategy call to a fully live AI voice agent running in your business. No dev work required on your end.',
    },
  ]

  return (
    <section className="relative py-24 sm:py-32 bg-background overflow-hidden border-t border-divider">
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="relative max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-divider">
          {pillars.map((p, i) => (
            <div key={i} className="px-8 py-10 lg:py-0 text-center lg:text-left first:pl-0 last:pr-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">{p.eyebrow}</p>
              <div className="font-display font-black text-5xl sm:text-6xl gradient-text mb-2 leading-none">
                {p.stat}
              </div>
              <div className="relative overflow-hidden h-px my-4">
                <div className="h-px bg-gradient-to-r from-primary/60 via-primary-light/30 to-transparent"
                  style={{ animation: 'pillar-sweep 3s ease-in-out infinite' }} />
              </div>
              <style>{`@keyframes pillar-sweep { 0%{transform:translateX(-100%)} 50%{transform:translateX(100%)} 100%{transform:translateX(100%)} }`}</style>
              <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Problem ──────────────────────────────────────────────────────────────────
function Problem() {
  return (
    <section id="problem" className="py-24 sm:py-32 bg-surface border-t border-b border-divider">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">The Reality</p>
            <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-ink mb-8">
              You Can't Answer Calls While Managing a Crew. That's Not a Flaw — It's Just the Job.
            </h2>
            <div className="flex flex-col gap-6">
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                You're on a slab at 7am. On a roof at 2pm. Managing a crew at 4. Your phone rings and you can't pick up. That homeowner calls the next contractor on Google.
              </p>
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                It's not a sales problem. It's a structural one. The contractors winning in your market aren't better than you — they just have a system that answers when they can't.
              </p>
              <p className="text-base sm:text-lg font-semibold text-ink leading-relaxed">
                That's what we build.
              </p>
            </div>
          </div>

          {/* Visual timeline */}
          <div className="rounded-2xl bg-background border border-divider p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-6">A typical Tuesday</p>
            <div className="flex flex-col gap-0">
              {[
                { time: '7:04am', text: "You're on a slab. Phone buzzes — unknown number. Can't pick up.", color: 'text-muted' },
                { time: '7:05am', text: 'Homeowner hangs up. No voicemail. Calls the next result on Google.', color: 'text-red-400' },
                { time: '7:06am', text: 'Your competitor picks up. Estimate scheduled for Thursday.', color: 'text-red-400' },
                { time: '11:30am', text: 'You call back. Goes to voicemail. They never return your call.', color: 'text-muted' },
                { time: 'With CG', text: 'Call answered instantly. Lead qualified. Estimate on your calendar.', color: 'text-primary' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex gap-4 py-4">
                    <span className={`font-mono text-[10px] min-w-[52px] pt-0.5 ${i === 4 ? 'text-primary' : 'text-muted'}`}>{item.time}</span>
                    <span className={`text-sm leading-relaxed ${item.color}`}>{item.text}</span>
                  </div>
                  {i < 4 && <div className="ml-[52px] h-px bg-divider" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Solution ─────────────────────────────────────────────────────────────────
function Solution() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.sol-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 36, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const cards = [
    {
      icon: <PhoneCall className="h-6 w-6 text-primary" strokeWidth={2.2} />,
      title: 'Never Miss a Call',
      text: 'Answers every inbound call instantly — day, night, weekends. Qualifies the lead, gets their project details, and books the estimate directly on your calendar.',
    },
    {
      icon: <RefreshCw className="h-6 w-6 text-primary" strokeWidth={2.2} />,
      title: 'Follows Up on Dead Quotes',
      text: 'Sent out 10 estimates last month? Only heard back from 4? The agent follows up automatically on every quote that goes cold — without you touching anything.',
    },
    {
      icon: <Settings className="h-6 w-6 text-primary" strokeWidth={2.2} />,
      title: 'Trained on Your Business',
      text: 'Not a generic bot. Trained on your service area, your project types, and how you want to talk to homeowners. It sounds like your business — because it is.',
    },
  ]

  return (
    <section id="solution" ref={ref} className="py-24 sm:py-32 bg-background border-t border-divider">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">What We Build</p>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-ink max-w-3xl">
            A 24/7 Voice Agent That Runs Your Phone Like a Full-Time Receptionist.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-divider rounded-2xl overflow-hidden border border-divider">
          {cards.map((c, i) => (
            <div key={i} className="sol-card bg-surface p-8 sm:p-10 hover:bg-background transition-colors duration-300 group">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {c.icon}
              </div>
              <h3 className="font-display font-black text-xl sm:text-2xl text-ink tracking-tight mb-3">{c.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Protocol (How It Works) ──────────────────────────────────────────────────
function Protocol() {
  const cardsRef = useRef([])

  useEffect(() => {
    if (prefersReducedMotion) return
    cardsRef.current.slice(0, 3).forEach(card => {
      if (!card) return
      gsap.to(card, {
        scrollTrigger: { trigger: card, start: 'top top+=100', end: '+=500', scrub: 1 },
        scale: 0.93, filter: 'blur(5px) saturate(0.6)', opacity: 0.45, ease: 'none',
      })
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  const steps = [
    {
      num: '01',
      eyebrow: 'Discovery',
      title: 'We learn your business',
      body: "Your call flow, your project types, your service area, and how you handle leads. One 20-minute call. That's it.",
      bullets: ['Service area and project types', 'How you qualify leads today', 'Your calendar and booking process'],
    },
    {
      num: '02',
      eyebrow: 'Build',
      title: 'We build and train the agent',
      body: 'Trained on your business — your voice, your tone, your process. Done in 5–7 business days. Not a generic template.',
      bullets: ['Custom response scripts in your voice', 'Trained on your specific project types', 'Integrated with your calendar'],
    },
    {
      num: '03',
      eyebrow: 'Test',
      title: 'You test it yourself',
      body: "Call the number. Pretend you're a homeowner. Tell us what to change. We don't go live until you're completely satisfied.",
      bullets: ['You call it yourself before launch', 'Unlimited revisions pre-launch', "We don't flip the switch until you approve"],
    },
    {
      num: '04',
      eyebrow: 'Live 24/7',
      title: 'Your number is covered',
      body: 'Around the clock. We manage it, monitor it, and optimize it every month. You focus on the job site.',
      bullets: ['24/7 inbound call coverage', 'Monthly performance review', 'Changes handled within 24 hours'],
    },
  ]

  return (
    <section id="process" className="relative bg-background border-t border-divider">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 pt-24 pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">The Process</p>
        <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-ink max-w-2xl">
          Live in 5–7 Days. Zero Tech Knowledge Required.
        </h2>
      </div>

      <div className="relative" style={{ minHeight: '400vh' }}>
        {steps.map((s, i) => (
          <div key={i} ref={el => cardsRef.current[i] = el}
            className="sticky top-24 mx-auto max-w-6xl px-6 sm:px-10 pb-8"
            style={{ zIndex: i + 1 }}>
            <div className="rounded-2xl bg-surface border border-divider overflow-hidden shadow-2xl shadow-black/30">
              <div className="p-8 sm:p-12 lg:p-14">
                <div className="flex items-center gap-4 mb-8">
                  <span className="font-display font-black text-5xl gradient-text leading-none">{s.num}</span>
                  <div className="h-px flex-1 bg-divider" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{s.eyebrow}</span>
                </div>
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <div>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-ink tracking-tight mb-4">{s.title}</h3>
                    <p className="text-muted leading-relaxed text-base sm:text-lg">{s.body}</p>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {s.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <ChevronRight className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                        <span className="text-sm text-muted leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── ServicesGrid (Included) ──────────────────────────────────────────────────
function ServicesGrid() {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const included = [
    { icon: PhoneCall,    title: '24/7 Inbound Call Answering', text: 'Every call answered, every time. No voicemail.' },
    { icon: FileText,     title: 'Lead Qualification',          text: 'Project type, timeline, budget — captured before you ever speak to them.' },
    { icon: CalendarCheck,title: 'Estimate Booking',            text: 'Drops straight into your calendar with all the details.' },
    { icon: RefreshCw,    title: 'Quote Follow-Up',             text: 'Automated follow-up on every estimate that goes cold.' },
    { icon: Star,         title: 'After-Hours Coverage',        text: 'Nearly half of all inbound calls come after hours. All answered.' },
    { icon: Zap,          title: 'SMS Confirmation',            text: 'Homeowner gets a text confirmation after booking. Automatic.' },
    { icon: Settings,     title: 'Monthly Optimization',        text: 'We review call performance and update the agent every month.' },
    { icon: CreditCard,   title: 'Integrates With Your Setup',  text: 'Works with Jobber, BuilderTrend, Google Calendar, and more.' },
  ]

  return (
    <section id="included" ref={ref} className="bg-deep text-white py-24 sm:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 mb-14">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">The System</p>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white max-w-2xl">
            Everything You Need. <span className="text-primary">Nothing You Don't.</span>
          </h2>
          <a href="#book-call"
            className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep px-6 py-3 rounded-sm font-semibold text-sm shadow-lg shadow-primary/20 flex-shrink-0 uppercase tracking-wide">
            Get Started <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.06]">
          {included.map((s, i) => {
            const Icon = s.icon
            return (
              <div key={i} className="svc-tile bg-deep p-7 hover:bg-white/[0.03] transition-colors duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={2.2} />
                </div>
                <h3 className="font-display font-black text-base text-white tracking-tight mb-2">{s.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{s.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── TrustSignals ─────────────────────────────────────────────────────────────
function TrustSignals() {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ref.current?.querySelectorAll('.trust-badge').forEach((el, i) => {
          el.style.transition = `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s`
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        })
        obs.disconnect()
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const badges = [
    {
      icon: Clock,
      title: '20-minute strategy call',
      sub: "We'll look at your call volume, your current setup, and tell you honestly if this makes sense for you. If it doesn't, we'll say that.",
    },
    {
      icon: ShieldCheck,
      title: 'You own everything',
      sub: 'Your phone number, your call data, your agent. We build it — you own it. No lock-in, no strings.',
    },
    {
      icon: Zap,
      title: 'Live in 5–7 days',
      sub: "From your first call to a fully deployed agent running in your business. No IT team, no dev work, no downtime.",
    },
  ]

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-background border-t border-divider">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-14">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Why Cornerstone Growth</p>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink">
            Built for Contractors. <span className="font-serif italic font-medium text-muted">Not for everyone.</span>
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {badges.map((b, i) => {
            const Icon = b.icon
            return (
              <div key={i} className="trust-badge rounded-2xl bg-surface border border-divider p-8 hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                style={{ opacity: 0, transform: 'translateY(24px)' }}>
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="h-5 w-5 text-primary" strokeWidth={2.2} />
                </div>
                <h3 className="font-display font-black text-xl text-ink tracking-tight mb-3">{b.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{b.sub}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null)
  const items = [
    {
      q: 'Will it sound robotic?',
      a: "No — and that's the most common question we get. We spend days training the agent on your specific business before it ever goes live. You test it yourself before we flip the switch. If it doesn't sound right, we keep working.",
    },
    {
      q: 'What if I already have someone answering phones?',
      a: "Great — this doesn't replace them. It handles overflow, after-hours, and the calls they miss. Think of it as backup coverage that's always on.",
    },
    {
      q: 'How does it connect to my calendar?',
      a: 'It integrates directly with Google Calendar, Calendly, or whatever booking system you use. Estimates get booked in real time — you wake up with appointments already on the calendar.',
    },
    {
      q: "What if I want to make changes after it's live?",
      a: "That's what the monthly retainer covers. You call us, we update it. Most changes are handled within 24 hours.",
    },
    {
      q: 'How do I know this will work for my business?',
      a: "That's exactly what the strategy call is for. We'll look at your current setup, your call volume, and your project types — and tell you honestly if this makes sense for you. If it doesn't, we'll tell you that too.",
    },
  ]

  return (
    <section id="faq" className="py-24 sm:py-32 bg-surface border-t border-divider">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Questions</p>
            <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-ink mb-6">
              Things Contractors Want to Know First.
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              No sales deck, no case studies from industries you don't work in. Just honest answers.
            </p>
            <a href="#book-call"
              className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep px-6 py-3.5 rounded-sm font-semibold text-sm shadow-lg shadow-primary/20 uppercase tracking-wide">
              Still have questions? Book a call <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="flex flex-col divide-y divide-divider border border-divider rounded-2xl overflow-hidden">
            {items.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:bg-background transition-colors duration-200">
                  <span className="font-body font-semibold text-ink text-sm leading-relaxed">{item.q}</span>
                  <div className={`w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 border transition-all duration-200 ${open === i ? 'bg-primary border-primary' : 'border-divider'}`}>
                    <span className="block w-2.5 h-px bg-current relative"
                      style={{ color: open === i ? '#0C0C0E' : '#777' }}>
                      <span className={`absolute inset-0 w-px h-2.5 bg-current left-1/2 -translate-x-1/2 -top-[5px] transition-transform duration-200 ${open === i ? 'scale-y-0' : 'scale-y-100'}`} />
                    </span>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-60' : 'max-h-0'}`}>
                  <p className="px-6 pb-6 text-sm text-muted leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ContactForm / Final CTA ──────────────────────────────────────────────────
function ContactForm() {
  const [status, setStatus] = useState('idle')
  const onSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => setStatus('sent'), 1200)
  }

  return (
    <section id="book-call" className="py-24 sm:py-32 lg:py-40 bg-background border-t border-divider">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* CTA Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">The Next Step</p>
          <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-ink mb-6">
            Have a 20-Minute Call That's Actually Worth Your Time.
          </h2>
          <p className="text-muted text-base sm:text-lg leading-relaxed">
            We'll look at your current setup, how you're handling inbound leads, and where you're losing jobs. Then we'll tell you honestly whether this is a fit.
          </p>
        </div>

        {/* Trust row */}
        <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-10 mb-16">
          {[
            { icon: '🕐', strong: '20 minutes', label: '— working session, not a pitch' },
            { icon: '✓', strong: 'You own everything', label: '— your number, your data, your agent' },
            { icon: '⚡', strong: 'Live in 5–7 days', label: '— from call to deployed' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-surface border border-divider flex items-center justify-center text-base flex-shrink-0">
                {item.icon}
              </div>
              <span className="text-sm text-muted"><span className="text-ink font-semibold">{item.strong}</span>{item.label}</span>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-4 mb-10">
              {[
                { icon: Mail,   label: 'Email',    value: 'hello@cornerstonegrowth.ai', href: 'mailto:hello@cornerstonegrowth.ai' },
                { icon: MapPin, label: 'Location', value: 'Remote — serving contractors nationwide', href: null },
              ].map((c, i) => {
                const Icon = c.icon
                const inner = (
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" strokeWidth={2.2} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">{c.label}</p>
                      <p className="text-sm font-medium text-ink mt-0.5">{c.value}</p>
                    </div>
                  </div>
                )
                return c.href ? <a key={i} href={c.href} className="lift-on-hover">{inner}</a> : <div key={i}>{inner}</div>
              })}
            </div>
            <div className="p-5 rounded-2xl border border-divider bg-surface">
              <div className="flex items-center gap-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={2.2} />
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">No pressure</span>
              </div>
              <p className="text-xs text-muted leading-relaxed">No contracts to sign on the call. No commitment. Just the conversation.</p>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-7">
            {status === 'sent' ? (
              <div className="rounded-2xl bg-surface border border-divider p-12 flex flex-col items-center justify-center text-center min-h-[440px]">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-8 w-8 text-primary" strokeWidth={2} />
                </div>
                <h3 className="font-display font-black text-2xl text-ink mb-3 tracking-tight">We'll be in touch.</h3>
                <p className="text-muted max-w-sm leading-relaxed text-sm">
                  Expect an email within one business day to schedule your free strategy call.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rounded-2xl bg-surface border border-divider p-8 sm:p-10">
                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  {[
                    { id: 'name',    label: 'Full Name',      type: 'text',  placeholder: 'John Smith' },
                    { id: 'email',   label: 'Email Address',  type: 'email', placeholder: 'john@smithconstruction.com' },
                    { id: 'phone',   label: 'Phone Number',   type: 'tel',   placeholder: '(555) 000-0000' },
                    { id: 'company', label: 'Company Name',   type: 'text',  placeholder: 'Smith General Contracting' },
                  ].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted mb-2">{f.label}</label>
                      <input id={f.id} type={f.type} placeholder={f.placeholder} required
                        className="w-full bg-background border border-divider rounded-lg px-4 py-3 text-sm text-ink placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all" />
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.15em] text-muted mb-2">Tell us about your business</label>
                  <textarea id="message" rows={4}
                    placeholder="How many calls do you miss per week? What CRM do you use? What's your biggest bottleneck?"
                    className="w-full bg-background border border-divider rounded-lg px-4 py-3 text-sm text-ink placeholder:text-muted/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none" />
                </div>

                <button type="submit" disabled={status === 'sending'}
                  className="magnetic-btn w-full inline-flex items-center justify-center gap-2 bg-primary text-deep py-4 rounded-sm font-semibold shadow-lg shadow-primary/20 disabled:opacity-60 transition-opacity uppercase tracking-wide text-sm">
                  {status === 'sending' ? (
                    <><Activity className="h-4 w-4 animate-pulse" strokeWidth={2.4} /> Sending…</>
                  ) : (
                    <>Book Your Free Strategy Call <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} /></>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-deep text-white py-14 sm:py-18 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="font-display font-black text-xl text-white tracking-wide mb-3">CORNERSTONE GROWTH</div>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-5">
              Built for contractors who don't have time to miss calls.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary ring-pulse" />
              <span className="font-mono text-[10px] text-white/40">All systems operational</span>
            </div>
          </div>

          {/* System */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30 mb-4">System</p>
            <ul className="flex flex-col gap-3">
              {['24/7 Call Answering', 'Lead Qualification', 'Estimate Booking', 'Quote Follow-Up', 'Monthly Optimization'].map(s => (
                <li key={s}>
                  <a href="#included" className="text-sm text-white/50 hover:text-white lift-on-hover transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30 mb-4">Company</p>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'How It Works', href: '#process' },
                { label: 'Book a Call',  href: '#book-call' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map(l => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-white/50 hover:text-white lift-on-hover transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] text-white/25">© 2025 Cornerstone Growth. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="font-mono text-[10px] text-white/25 hover:text-white/60 transition-colors lift-on-hover">Privacy</Link>
            <Link to="/terms"   className="font-mono text-[10px] text-white/25 hover:text-white/60 transition-colors lift-on-hover">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pillars />
        <Problem />
        <Solution />
        <Protocol />
        <ServicesGrid />
        <TrustSignals />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}
