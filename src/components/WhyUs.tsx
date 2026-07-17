import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCountUp } from '../hooks/useCountUp'
import TextScramble from './TextScramble'

const advantages = [
  {
    num: '01', icon: '🇸🇬',
    title: 'Base in Singapore, Global Delivery.',
    sub: 'Singapore Hub · Global Delivery',
    desc: 'Headquartered in the core financial district of Singapore, with an international technological perspective and rigorous compliance processes, serving markets across Asia, Africa, and Europe and America.',
    points: ['Singapore PDPA Data Compliance', 'MAS Regulatory Compliance Framework', 'Asia · Africa · Multi-market in Europe and America'],
    accent: '#0AFFD9',
  },
  {
    num: '02', icon: '🔒',
    title: 'High Security and High Concurrency Support',
    sub: 'Enterprise Security · High Concurrency',
    desc: 'The system employs enterprise-level security encryption, with practical architectural experience in handling high-concurrency traffic, multi-currency real-time settlement, and cross-border data protection.',
    points: ['Enterprise-level AES-256 Encryption.', 'High Concurrency Elastic Architecture', 'Multi-Currency Real-Time Settlement Engine'],
    accent: '#6D43FF',
  },
  {
    num: '03', icon: '💻',
    title: 'Transparent Delivery, Worry-Free Source Code',
    sub: 'Transparent Delivery · Full Ownership',
    desc: 'Agile development with milestone-based transparent delivery. Upon project completion, we deliver the complete unencrypted custom source code along with detailed technical documentation.',
    points: ['Agile delivery', '100% source code delivery', 'Detail tech documents'],
    accent: '#0AFFD9',
  },
]

function StatCounter({ target, suffix = '', label, sublabel }: { target: number; suffix?: string; label: string; sublabel: string }) {
  const { value, ref } = useCountUp(target, 1600)
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} style={{ textAlign: 'center' }}>
      <div className="f-display" style={{ fontSize: '2.6rem', color: '#0AFFD9', marginBottom: '8px' }}>
        {value}{suffix}
      </div>
      <div style={{ fontFamily: 'DM Sans', fontSize: '14px', color: '#F0F4FF', marginBottom: '4px', fontWeight: 600 }}>{label}</div>
      <div className="f-label" style={{ color: '#3D4F6B' }}>{sublabel}</div>
    </div>
  )
}

export default function WhyUs() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const statsRef = useScrollReveal<HTMLDivElement>()
  const rowRefs = [
    useScrollReveal<HTMLDivElement>(),
    useScrollReveal<HTMLDivElement>(),
    useScrollReveal<HTMLDivElement>(),
  ]

  return (
    <section id="why-us" style={{ backgroundColor: '#03070F', padding: '120px 0', position: 'relative' }}>
      <div className="divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div ref={headerRef} className="reveal" style={{ marginBottom: '72px' }}>
          <div className="section-label-line">
            <p className="f-label" style={{ color: '#6D43FF' }}>02 · Why Us · Why us</p>
          </div>
          <TextScramble
            text="Why global clients choose AetherX"
            tag="h2"
            className="f-heading"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', color: '#F0F4FF', maxWidth: '520px' }}
          />
        </div>

        {/* Rows */}
        {advantages.map((adv, i) => (
          <div key={i}>
            <div
              ref={rowRefs[i]}
              className={i % 2 === 0 ? 'reveal-left' : 'reveal-right'}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1fr 1fr',
                gap: '48px', alignItems: 'start',
                padding: '48px 0',
              }}
            >
              {/* Number */}
              <div>
                <span className="f-display" style={{ fontSize: '3.5rem', color: 'rgba(240,244,255,0.04)', lineHeight: 1, userSelect: 'none' }}>
                  {adv.num}
                </span>
              </div>

              {/* Left — title + desc */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div
                    className="icon-box"
                    style={{
                      backgroundColor: i % 2 === 0 ? 'rgba(10,255,217,0.07)' : 'rgba(109,67,255,0.08)',
                      border: `1px solid ${i % 2 === 0 ? 'rgba(10,255,217,0.18)' : 'rgba(109,67,255,0.2)'}`,
                      fontSize: '20px',
                    }}
                  >
                    {adv.icon}
                  </div>
                  <div>
                    <TextScramble text={adv.title} tag="h3" className="f-heading" style={{ fontSize: '1.3rem', color: '#F0F4FF', marginBottom: '2px' }} />
                    <p className="f-label" style={{ color: adv.accent }}>{adv.sub}</p>
                  </div>
                </div>
                <p className="f-body" style={{ fontSize: '15px', lineHeight: '1.8', color: '#7B8BAA', maxWidth: '380px' }}>
                  {adv.desc}
                </p>
              </div>

              {/* Right — checklist items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '6px' }}>
                {adv.points.map((pt, pi) => (
                  <div
                    key={pt}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '14px 18px', borderRadius: '10px',
                      backgroundColor: '#0C1A30', border: '1px solid rgba(240,244,255,0.06)',
                      transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
                      transitionDelay: `${pi * 60}ms`,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = `${adv.accent}33`
                      el.style.transform = 'translateX(4px)'
                      el.style.boxShadow = `0 0 20px ${adv.accent}0A`
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = 'rgba(240,244,255,0.06)'
                      el.style.transform = 'none'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: adv.accent, boxShadow: `0 0 8px ${adv.accent}88`, flexShrink: 0 }} />
                    <span style={{ fontFamily: 'DM Sans', fontSize: '14px', color: '#94A3C0' }}>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
            {i < advantages.length - 1 && <div className="divider" />}
          </div>
        ))}

        {/* Stats bar with count-up */}
        <div
          ref={statsRef}
          className="reveal stats-bar"
          style={{
            marginTop: '72px', borderRadius: '20px',
            border: '1px solid rgba(240,244,255,0.07)',
            background: 'linear-gradient(135deg, #0C1A30 0%, #0D1F38 100%)',
            padding: '48px 56px',
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px', position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '300px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(10,255,217,0.4), transparent)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(10,255,217,0.03), transparent 60%)', pointerEvents: 'none' }} />

          <StatCounter target={5} suffix="+" label=" " sublabel="Years of Experience" />
          <StatCounter target={50} suffix="+" label="成功Delivery project" sublabel="Delivered Projects" />
          <StatCounter target={12} suffix="+" label="覆盖Served countries" sublabel="Countries Served" />
          <StatCounter target={100} suffix="%" label="  " sublabel="Full Code Ownership" />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .advantage-row { grid-template-columns: 48px 1fr !important; gap: 24px !important; }
          .advantage-row > div:last-child { grid-column: 2; }
          .stats-bar { grid-template-columns: repeat(2,1fr) !important; padding: 32px !important; }
        }
      `}</style>
    </section>
  )
}
