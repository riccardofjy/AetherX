import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCountUp } from '../hooks/useCountUp'
import TextScramble from './TextScramble'

const advantages = [
  {
    num: '01', icon: '🇸🇬',
    title: '新加坡总部，全球交付',
    sub: 'Singapore Hub · Global Delivery',
    desc: '总部位于新加坡核心金融区，拥有国际化技术视野与严谨的合规流程，服务覆盖亚洲、非洲及欧美市场。',
    points: ['新加坡 PDPA 数据合规', 'MAS 监管合规框架', '亚洲 · 非洲 · 欧美多市场'],
    accent: '#0AFFD9',
  },
  {
    num: '02', icon: '🔒',
    title: '高安全性与高并发支持',
    sub: 'Enterprise Security · High Concurrency',
    desc: '系统采用企业级安全加密，具备高并发流量、多币种实时结算与跨境数据保护的实战架构经验。',
    points: ['企业级 AES-256 加密', '高并发弹性架构', '多币种实时结算引擎'],
    accent: '#6D43FF',
  },
  {
    num: '03', icon: '💻',
    title: '透明交付，源码无忧',
    sub: 'Transparent Delivery · Full Ownership',
    desc: 'Agile 敏捷开发，里程碑式透明交付。项目结束后交付完整不加密定制源码与详尽技术文档。',
    points: ['Agile 敏捷开发模式', '100% 源码完整交付', '详尽技术文档随附'],
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
            <p className="f-label" style={{ color: '#6D43FF' }}>02 · Why Us · 为何选择我们</p>
          </div>
          <TextScramble
            text="为什么全球客户选择 AetherX"
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

          <StatCounter target={5} suffix="+" label="年行业经验" sublabel="Years of Experience" />
          <StatCounter target={50} suffix="+" label="成功交付项目" sublabel="Delivered Projects" />
          <StatCounter target={12} suffix="+" label="覆盖服务国家" sublabel="Countries Served" />
          <StatCounter target={100} suffix="%" label="源码归属客户" sublabel="Full Code Ownership" />
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
