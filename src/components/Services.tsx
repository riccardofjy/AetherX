import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import TextScramble from './TextScramble'

const ICON_SIZE = 22
const IconCode = () => <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
const IconMobile = () => <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
const IconGlobe = () => <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" /></svg>
const IconGame = () => <svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 12h.01M8 12h.01M10 10v4M17 10v.01M15 12v.01" /></svg>

const services = [
  { icon: <IconCode />, title: '', sub: 'Custom Software Development', desc: 'Tailor-made enterprise-level management systems (ERP, CRM, inventory management, cross-border settlement), supporting multi-currency and compliance architecture design.', tags: ['ERP / CRM', 'FinTech', 'Multi-currency Settlement'], accent: '#0AFFD9', featured: true },
  { icon: <IconMobile />, title: 'Mobile App Development', sub: 'Mobile App Development', desc: 'Native and cross-platform (Flutter / React Native) app development for iOS & Android, with an emphasis on exceptional UX/UI design.', tags: ['iOS & Android', 'Flutter', 'React Native'], accent: '#6D43FF', featured: false },
  { icon: <IconGlobe />, title: 'Premium Web Development', sub: 'Premium Web Development', desc: 'Corporate websites, cross-border e-commerce, and Web 3.0 applications, featuring fast loading, full responsiveness, and SEO optimization.', tags: ['Web3', 'E-commerce platform', 'SEO'], accent: '#0AFFD9', featured: false },
  { icon: <IconGame />, title: 'Game Development & Operations', sub: 'Game Development & Operations', desc: '2D/3D mobile games and H5 web games, providing full lifecycle services: planning, art, development, and maintenance.', tags: ['2D / 3D', 'H5 game', 'End-to-end journey'], accent: '#6D43FF', featured: false },
]

// 3D tilt card
function TiltCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const rx = e.clientX - rect.left
    const ry = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((ry - cy) / cy) * -7
    const rotY = ((rx - cx) / cx) * 7
    el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`
    if (spotRef.current) {
      spotRef.current.style.opacity = '1'
      spotRef.current.style.background = `radial-gradient(200px circle at ${rx}px ${ry}px, rgba(10,255,217,0.1), transparent 70%)`
    }
  }
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)'
    if (spotRef.current) spotRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        ...style,
        transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.3s, box-shadow 0.3s',
        willChange: 'transform',
        position: 'relative',
      }}
    >
      {/* Spotlight overlay */}
      <div
        ref={spotRef}
        style={{
          position: 'absolute', inset: 0, borderRadius: 'inherit',
          opacity: 0, pointerEvents: 'none', transition: 'opacity 0.3s',
          zIndex: 2,
        }}
      />
      {children}
    </div>
  )
}

export default function Services() {
  const headerRef = useScrollReveal()
  const featuredRef = useScrollReveal<HTMLDivElement>()
  const gridRef = useScrollReveal<HTMLDivElement>()
  const featured = services[0]
  const rest = services.slice(1)

  return (
    <section id="services" style={{ backgroundColor: '#03070F', padding: '120px 0', position: 'relative' }}>
      <div className="divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div ref={headerRef} className="reveal" style={{ marginBottom: '64px' }}>
          <div className="section-label-line">
            <p className="f-label" style={{ color: '#0AFFD9' }}>01 · Services · SCOPE</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'end' }} className="section-header-grid">
            <TextScramble
              text="What we can offer"
              tag="h2"
              className="f-heading"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#F0F4FF' }}
            />
            <p className="f-body" style={{ color: '#7B8BAA', fontSize: '15px', lineHeight: '1.7', maxWidth: '400px' }}>
              From the underlying architecture to the user interface, AetherX fully covers every critical aspect of your digital transformation.
            </p>
          </div>
        </div>

        {/* Featured card */}
        <div ref={featuredRef} className="reveal" style={{ marginBottom: '20px' }}>
          <TiltCard
            style={{
              borderRadius: '20px',
              border: '1px solid rgba(10,255,217,0.15)',
              backgroundColor: '#0C1A30',
              padding: '40px 44px',
              overflow: 'hidden',
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center',
            }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle at top right, rgba(10,255,217,0.06), transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
            <div style={{ position: 'relative', zIndex: 3 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                <div className="icon-box" style={{ backgroundColor: 'rgba(10,255,217,0.08)', border: '1px solid rgba(10,255,217,0.2)', color: '#0AFFD9' }}>
                  {featured.icon}
                </div>
                <span className="f-label" style={{ color: '#0AFFD9' }}>Featured Service</span>
              </div>
              <TextScramble text={featured.title} tag="h3" className="f-heading" style={{ fontSize: '1.6rem', color: '#F0F4FF', marginBottom: '6px' }} />
              <p style={{ fontFamily: 'DM Sans', fontSize: '13px', color: '#3D4F6B', marginBottom: '20px' }}>{featured.sub}</p>
              <p className="f-body" style={{ fontSize: '15px', lineHeight: '1.75', color: '#7B8BAA' }}>{featured.desc}</p>
            </div>
            <div style={{ position: 'relative', zIndex: 3 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                {featured.tags.map((t) => (
                  <span key={t} className="tag" style={{ backgroundColor: 'rgba(10,255,217,0.07)', border: '1px solid rgba(10,255,217,0.18)', color: '#0AFFD9' }}>{t}</span>
                ))}
              </div>
              <a href="#contact" className="btn-cta" style={{ fontSize: '13px', padding: '11px 24px' }}>
                Learn more
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </a>
            </div>
          </TiltCard>
        </div>

        {/* 3-col cards */}
        <div
          ref={gridRef}
          className="reveal-stagger"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
        >
          {rest.map((svc, i) => (
            <TiltCard
              key={i}
              style={{
                borderRadius: '16px',
                border: '1px solid rgba(240,244,255,0.07)',
                backgroundColor: '#0C1A30',
                padding: '32px',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div
                  className="icon-box"
                  style={{
                    backgroundColor: i % 2 === 0 ? 'rgba(10,255,217,0.07)' : 'rgba(109,67,255,0.08)',
                    border: `1px solid ${i % 2 === 0 ? 'rgba(10,255,217,0.18)' : 'rgba(109,67,255,0.2)'}`,
                    color: i % 2 === 0 ? '#0AFFD9' : '#8B6BFF',
                    marginBottom: '24px',
                  }}
                >
                  {svc.icon}
                </div>
                <TextScramble text={svc.title} tag="h3" className="f-heading" style={{ fontSize: '1.15rem', color: '#F0F4FF', marginBottom: '4px' }} />
                <p style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#3D4F6B', marginBottom: '16px' }}>{svc.sub}</p>
                <p className="f-body" style={{ fontSize: '14px', lineHeight: '1.75', color: '#7B8BAA', flex: 1, marginBottom: '24px' }}>{svc.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {svc.tags.map((t) => (
                    <span key={t} className="tag" style={{
                      backgroundColor: i % 2 === 0 ? 'rgba(10,255,217,0.06)' : 'rgba(109,67,255,0.07)',
                      border: `1px solid ${i % 2 === 0 ? 'rgba(10,255,217,0.15)' : 'rgba(109,67,255,0.18)'}`,
                      color: i % 2 === 0 ? '#0AFFD9' : '#8B6BFF',
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <style>{`.services-grid { grid-template-columns: repeat(3,1fr); }`}</style>
    </section>
  )
}
