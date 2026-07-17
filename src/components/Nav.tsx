import { useState, useEffect } from 'react'
import TextScramble from './TextScramble'

const navLinks = [
  { zh: '首页', href: '#home' },
  { zh: '服务', href: '#services' },
  { zh: '技术优势', href: '#why-us' },
  { zh: '联系我们', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = ['home', 'services', 'why-us', 'contact']
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(`#${e.target.id}`)
        })
      },
      { threshold: 0.4 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: '64px', display: 'flex', alignItems: 'center',
        backgroundColor: scrolled ? 'rgba(3,7,15,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(28px) saturate(1.5)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(240,244,255,0.06)' : '1px solid transparent',
        transition: 'background-color 0.5s, border-color 0.5s, backdrop-filter 0.5s',
      }}
    >
      <div style={{
        width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 32px',
        display: 'grid', gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center', gap: '24px',
      }}>
        {/* Logo */}
        <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #0AFFD9 0%, #6D43FF 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 18px rgba(10,255,217,0.3)',
            flexShrink: 0, transition: 'box-shadow 0.3s',
          }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(10,255,217,0.55)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 18px rgba(10,255,217,0.3)' }}
          >
            <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '12px', color: '#03070F', letterSpacing: '-0.5px' }}>AX</span>
          </div>
          <TextScramble
            text="AetherX"
            style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '17px', color: '#F0F4FF', letterSpacing: '-0.03em' }}
          />
        </a>

        {/* Center nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="hidden md:flex">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  position: 'relative',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '14px', fontWeight: 500,
                  color: isActive ? '#F0F4FF' : '#7B8BAA',
                  textDecoration: 'none', padding: '6px 14px', borderRadius: '8px',
                  transition: 'color 0.2s, background-color 0.2s',
                  backgroundColor: isActive ? 'rgba(10,255,217,0.07)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLElement).style.color = '#F0F4FF'
                    ;(e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(240,244,255,0.05)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    ;(e.currentTarget as HTMLElement).style.color = '#7B8BAA'
                    ;(e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'
                  }
                }}
              >
                {link.zh}
                {isActive && (
                  <span style={{
                    position: 'absolute', bottom: '2px', left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px', height: '4px', borderRadius: '50%',
                    backgroundColor: '#0AFFD9',
                    boxShadow: '0 0 8px #0AFFD9',
                    display: 'block',
                  }} />
                )}
              </a>
            )
          })}
        </nav>

        {/* Right — CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
          <a href="#contact" className="btn-cta hidden md:inline-flex" style={{ padding: '9px 18px', fontSize: '13px' }}>
            免费咨询
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
            style={{ background: 'transparent', border: 'none', padding: '8px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ display: 'block', width: '20px', height: '1.5px', backgroundColor: '#F0F4FF', borderRadius: '2px', transition: 'opacity 0.2s', opacity: open && i === 1 ? 0 : 1 }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'absolute', top: '64px', left: 0, right: 0,
          backgroundColor: 'rgba(7,15,30,0.98)', backdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(240,244,255,0.06)',
          padding: '16px 32px 24px',
          display: 'flex', flexDirection: 'column', gap: '4px',
          animation: 'fade-up 0.2s ease both',
        }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}
              style={{ fontFamily: 'DM Sans', fontSize: '15px', fontWeight: 500, color: activeSection === link.href ? '#0AFFD9' : '#7B8BAA', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid rgba(240,244,255,0.05)' }}>
              {link.zh}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="btn-cta" style={{ marginTop: '12px', justifyContent: 'center' }}>免费咨询</a>
        </div>
      )}
    </header>
  )
}
