import { useEffect, useRef, useState } from 'react'
import { useMousePosition } from '../hooks/useMousePosition'
import TextScramble from './TextScramble'

const TYPING_LINES = ['With cutting-edge technologies, drive your digital future', 'Empowering Digital Futures', 'Global Full-Stack Custom Development ']

function useTypingEffect(lines: string[], speed = 55, pause = 1800) {
  const [text, setText] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'erasing'>('typing')
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const target = lines[lineIdx]
    let timer: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (charIdx < target.length) {
        timer = setTimeout(() => {
          setText(target.slice(0, charIdx + 1))
          setCharIdx(charIdx + 1)
        }, speed)
      } else {
        timer = setTimeout(() => setPhase('pausing'), pause)
      }
    } else if (phase === 'pausing') {
      timer = setTimeout(() => setPhase('erasing'), pause)
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setText(target.slice(0, charIdx - 1))
          setCharIdx(charIdx - 1)
        }, speed / 2)
      } else {
        setLineIdx((lineIdx + 1) % lines.length)
        setPhase('typing')
      }
    }
    return () => clearTimeout(timer)
  }, [phase, charIdx, lineIdx, lines, speed, pause])

  return text
}

export default function Hero() {
  const mouse = useMousePosition()
  const sectionRef = useRef<HTMLElement>(null)
  const typedText = useTypingEffect(TYPING_LINES)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Parallax offset from mouse
  const parallax = {
    slow:   { x: (mouse.x - window.innerWidth / 2) * 0.012, y: (mouse.y - window.innerHeight / 2) * 0.012 },
    medium: { x: (mouse.x - window.innerWidth / 2) * 0.025, y: (mouse.y - window.innerHeight / 2) * 0.025 },
    fast:   { x: (mouse.x - window.innerWidth / 2) * 0.045, y: (mouse.y - window.innerHeight / 2) * 0.045 },
  }

  // Interactive particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let mx = -999, my = -999

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)

    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; alpha: number }> = []
    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.4,
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        // Attract slightly to mouse
        const dx = mx - p.x, dy = my - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150 && dist > 0) {
          p.vx += (dx / dist) * 0.03
          p.vy += (dy / dist) * 0.03
        }
        // Dampen
        p.vx *= 0.98; p.vy *= 0.98

        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(10,255,217,${p.alpha})`
        ctx.fill()
      })

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(10,255,217,${0.1 * (1 - d / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        backgroundColor: '#03070F', overflow: 'hidden', paddingTop: '80px',
      }}
    >
      {/* Animated grid */}
      <div className="grid-lines" style={{ position: 'absolute', inset: 0, opacity: 0.55, pointerEvents: 'none' }} />

      {/* Scan line */}
      <div className="scan-line" />

      {/* Parallax orbs */}
      <div style={{
        position: 'absolute', top: '8%', left: '50%',
        width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(10,255,217,0.055) 0%, transparent 60%)',
        transform: `translate(${parallax.slow.x}px, ${parallax.slow.y}px)`,
        transition: 'transform 0.08s linear',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '5%', left: '20%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(109,67,255,0.07) 0%, transparent 60%)',
        transform: `translate(${parallax.medium.x * -1}px, ${parallax.medium.y * -1}px)`,
        transition: 'transform 0.12s linear',
        pointerEvents: 'none',
      }} />

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />

      {/* Content */}
      <div
        style={{
          position: 'relative', zIndex: 10, maxWidth: '1200px', margin: '0 auto',
          padding: '0 32px', display: 'grid',
          gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', width: '100%',
        }}
        className="hero-grid"
      >
        {/* Left */}
        <div>
          {/* Status badge */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '100px',
              border: '1px solid rgba(10,255,217,0.2)',
              backgroundColor: 'rgba(10,255,217,0.05)',
              marginBottom: '36px',
              animation: 'fade-up 0.6s 0.1s cubic-bezier(0.22,1,0.36,1) both',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#0AFFD9', animation: 'pulse-dot 2s ease infinite' }} />
            <span className="f-label" style={{ color: '#0AFFD9' }}>Singapore Registered</span>
          </div>

          {/* Typing headline */}
          <div style={{ marginBottom: '28px', animation: 'fade-up 0.6s 0.2s cubic-bezier(0.22,1,0.36,1) both' }}>
            <h1 className="f-display" style={{ fontSize: 'clamp(2.6rem, 5vw, 4.4rem)', color: '#F0F4FF', marginBottom: '12px' }}>
              <span
                style={{
                  background: 'linear-gradient(100deg, #0AFFD9 0%, #6D43FF 50%, #0AFFD9 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  animation: 'shimmer-text 5s linear infinite',
                  display: 'block', minHeight: '1.1em',
                }}
                className="typing-cursor"
              >
                {typedText}
              </span>
            </h1>
            <h2 className="f-display" style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4rem)', color: '#F0F4FF' }}>
              Customized Software Solutions
            </h2>
          </div>

          {/* Sub */}
          <p className="f-body" style={{
            fontSize: '16px', lineHeight: '1.8', color: '#7B8BAA', maxWidth: '440px',
            marginBottom: '44px', animation: 'fade-up 0.6s 0.35s cubic-bezier(0.22,1,0.36,1) both',
          }}>
            AetherX provides high-quality custom software, mobile applications, and game development for global enterprises.
            From concept to implementation, we are the most trusted long-term technology partner.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', animation: 'fade-up 0.6s 0.45s cubic-bezier(0.22,1,0.36,1) both' }}>
            <a href="#contact" className="btn-cta">
              Unlock your free technical solution
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
            <a href="#services" className="btn-ghost">Our service scope</a>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', gap: '0', marginTop: '56px', paddingTop: '32px',
            borderTop: '1px solid rgba(240,244,255,0.07)',
            animation: 'fade-up 0.6s 0.55s cubic-bezier(0.22,1,0.36,1) both',
          }}>
            {[{ n: '50+', label: 'Delivery project' }, { n: '12+', label: 'Served countries' }, { n: '24h', label: 'Quick response' }].map((s, i) => (
              <div key={s.label} style={{
                flex: 1,
                paddingRight: i < 2 ? '24px' : 0, marginRight: i < 2 ? '24px' : 0,
                borderRight: i < 2 ? '1px solid rgba(240,244,255,0.07)' : 'none',
              }}>
                <TextScramble
                  text={s.n}
                  className="f-display"
                  style={{ fontSize: '2rem', color: '#0AFFD9', display: 'block' }}
                />
                <div className="f-label" style={{ color: '#3D4F6B', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Dashboard card with parallax */}
        <div
          className="hidden md:block"
          style={{
            position: 'relative',
            transform: `translate(${parallax.fast.x}px, ${parallax.fast.y}px)`,
            transition: 'transform 0.06s linear',
          }}
        >
          <div style={{
            borderRadius: '20px', border: '1px solid rgba(240,244,255,0.08)',
            backgroundColor: '#0C1A30', padding: '28px',
            position: 'relative', overflow: 'hidden',
            animation: 'fade-left 0.8s 0.3s cubic-bezier(0.22,1,0.36,1) both',
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'radial-gradient(circle at top right, rgba(10,255,217,0.08), transparent 70%)', pointerEvents: 'none' }} />

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <div className="f-label" style={{ color: '#3D4F6B', marginBottom: '4px' }}>Active Projects</div>
                <div className="f-display" style={{ fontSize: '2.4rem', color: '#F0F4FF' }}>24</div>
              </div>
              <div style={{ padding: '8px 14px', borderRadius: '8px', backgroundColor: 'rgba(10,255,217,0.1)', border: '1px solid rgba(10,255,217,0.2)' }}>
                <span className="f-label" style={{ color: '#0AFFD9' }}>↑ 12% MoM</span>
              </div>
            </div>

            {/* Progress bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
              {[
                { label: 'Web Development', pct: 92, color: '#0AFFD9' },
                { label: 'Mobile Apps', pct: 78, color: '#6D43FF' },
                { label: 'Game Projects', pct: 65, color: '#00C4A8' },
              ].map((item) => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#7B8BAA' }}>{item.label}</span>
                    <span className="f-label" style={{ color: item.color }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: '4px', borderRadius: '2px', backgroundColor: 'rgba(240,244,255,0.06)' }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, borderRadius: '2px', background: `linear-gradient(90deg,${item.color}88,${item.color})`, boxShadow: `0 0 8px ${item.color}44`, transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)' }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="divider" style={{ marginBottom: '20px' }} />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                {['#0AFFD9', '#6D43FF', '#F0A500', '#FF4D6D', '#00C4A8'].map((c, i) => (
                  <div key={i} style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: c + '33', border: `2px solid ${c}55`, marginLeft: i > 0 ? '-8px' : '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '10px', color: c }}>
                      {['SG', 'MY', 'AU', 'AE', 'GB'][i]}
                    </span>
                  </div>
                ))}
              </div>
              <span style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#3D4F6B' }}>12+ countries</span>
            </div>
          </div>

          {/* Floating mini cards */}
          <div style={{
            position: 'absolute', top: '-24px', right: '-24px',
            borderRadius: '14px', border: '1px solid rgba(240,244,255,0.08)',
            backgroundColor: '#0C1A30', padding: '14px 18px',
            animation: 'float-y 5s ease-in-out infinite',
          }}>
            <div className="f-label" style={{ color: '#3D4F6B', marginBottom: '4px' }}>Response Time</div>
            <div className="f-heading" style={{ fontSize: '1.3rem', color: '#0AFFD9' }}>{'< 24h'}</div>
          </div>

          <div style={{
            position: 'absolute', bottom: '-20px', left: '-20px',
            borderRadius: '14px', border: '1px solid rgba(109,67,255,0.2)',
            backgroundColor: '#0C1A30', padding: '14px 18px',
            animation: 'float-y 7s 1.5s ease-in-out infinite',
          }}>
            <div className="f-label" style={{ color: '#3D4F6B', marginBottom: '4px' }}>Source Code</div>
            <div className="f-heading" style={{ fontSize: '1.3rem', color: '#6D43FF' }}>100% Yours</div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, #03070F, transparent)', pointerEvents: 'none' }} />
    </section>
  )
}
