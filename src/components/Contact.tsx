import { useState, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import TextScramble from './TextScramble'

const BUDGET = ['< $5,000', '$5k – $20k', '$20k – $80k', '$80k+', 'Not yet confirmed']

const inputBase: React.CSSProperties = {
  width: '100%',
  backgroundColor: 'rgba(240,244,255,0.03)',
  border: '1px solid rgba(240,244,255,0.09)',
  borderRadius: '10px',
  padding: '13px 16px',
  color: '#F0F4FF',
  fontFamily: 'DM Sans, sans-serif',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.25s, box-shadow 0.25s',
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'Geist Mono', fontSize: '11px', letterSpacing: '0.1em', color: '#3D4F6B', marginBottom: '8px', textTransform: 'uppercase' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', req: '', budget: '' })
  const [done, setDone] = useState(false)
  const leftRef = useScrollReveal<HTMLDivElement>()
  const rightRef = useScrollReveal<HTMLDivElement>()
  const formCardRef = useRef<HTMLDivElement>(null)
  const spotRef = useRef<HTMLDivElement>(null)

  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); setDone(true) }

  const focusIn = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(10,255,217,0.35)'
    e.target.style.boxShadow = '0 0 0 3px rgba(10,255,217,0.06)'
  }
  const focusOut = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = 'rgba(240,244,255,0.09)'
    e.target.style.boxShadow = 'none'
  }

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = formCardRef.current
    if (!el || !spotRef.current) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    spotRef.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(10,255,217,0.07), transparent 70%)`
    spotRef.current.style.opacity = '1'
  }
  const onCardLeave = () => {
    if (spotRef.current) spotRef.current.style.opacity = '0'
  }

  return (
    <section id="contact" style={{ backgroundColor: '#03070F', padding: '120px 0', position: 'relative' }}>
      <div className="divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px', alignItems: 'start' }} className="contact-grid">

          {/* Left */}
          <div ref={leftRef} className="reveal-left">
            <div className="section-label-line" style={{ marginBottom: '16px' }}>
              <p className="f-label" style={{ color: '#0AFFD9' }}>03 · Contact · Contact Us</p>
            </div>
            <TextScramble
              text="Leave your tech questions"
              tag="h2"
              className="f-heading"
              style={{ fontSize: 'clamp(2rem, 3vw, 2.6rem)', color: '#F0F4FF', marginBottom: '20px' }}
            />
            <p className="f-body" style={{ fontSize: '15px', lineHeight: '1.8', color: '#7B8BAA', marginBottom: '48px' }}>
              Whether you have specific requirements or just initial ideas, our technical experts will be able to assist you within{' '}
              <span style={{ color: '#0AFFD9', fontWeight: 600 }}>24 hours</span>
              {' '}to provide free tech consultant.
            </p>

            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {[
                { label: 'Company Registration Name', value: 'AetherX Pte. Ltd.', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><polyline points="9,22 9,12 15,12 15,22" /></svg> },
                { label: 'Office Address', value: '10 Anson Road #19-14, International Plaza, Singapore 079903', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg> },
                { label: 'E-mail', value: 'contact@aetherx.co', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg> },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '16px', borderRadius: '12px', backgroundColor: '#0C1A30', border: '1px solid rgba(240,244,255,0.06)', transition: 'border-color 0.25s, transform 0.25s' }}
                  onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(10,255,217,0.18)'; el.style.transform = 'translateX(4px)' }}
                  onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(240,244,255,0.06)'; el.style.transform = 'none' }}
                >
                  <div className="icon-box" style={{ backgroundColor: 'rgba(10,255,217,0.06)', border: '1px solid rgba(10,255,217,0.14)', color: '#0AFFD9', flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="f-label" style={{ color: '#3D4F6B', marginBottom: '4px' }}>{item.label}</div>
                    <div style={{ fontFamily: 'DM Sans', fontSize: '14px', color: '#94A3C0', lineHeight: 1.5 }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="f-label" style={{ color: '#3D4F6B', marginBottom: '12px' }}>Communicate in time</p>
              <div style={{ display: 'flex', gap: '10px' }}>
                {[
                  { label: 'WhatsApp', color: '#25D366', bg: 'rgba(37,211,102,0.1)', border: 'rgba(37,211,102,0.25)' },
                  { label: 'Telegram', color: '#2AABEE', bg: 'rgba(42,171,238,0.1)', border: 'rgba(42,171,238,0.25)' },
                ].map((btn) => (
                  <a key={btn.label} href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '10px', backgroundColor: btn.bg, border: `1px solid ${btn.border}`, color: btn.color, fontFamily: 'Manrope', fontWeight: 600, fontSize: '13px', textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = `0 8px 20px ${btn.bg}` }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = 'none'; el.style.boxShadow = 'none' }}
                  >
                    {btn.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form with spotlight */}
          <div ref={rightRef} className="reveal-right">
            <div
              ref={formCardRef}
              onMouseMove={onCardMove}
              onMouseLeave={onCardLeave}
              style={{ borderRadius: '20px', backgroundColor: '#0C1A30', border: '1px solid rgba(240,244,255,0.07)', padding: '40px', position: 'relative', overflow: 'hidden' }}
            >
              {/* Spotlight overlay */}
              <div ref={spotRef} style={{ position: 'absolute', inset: 0, opacity: 0, pointerEvents: 'none', transition: 'opacity 0.3s', zIndex: 1 }} />

              <div style={{ position: 'relative', zIndex: 2 }}>
                {done ? (
                  <div style={{ textAlign: 'center', padding: '60px 0' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'rgba(10,255,217,0.08)', border: '1px solid rgba(10,255,217,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0AFFD9" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    </div>
                    <h3 className="f-heading" style={{ fontSize: '1.4rem', color: '#F0F4FF', marginBottom: '10px' }}>Message sent</h3>
                    <p style={{ fontFamily: 'DM Sans', fontSize: '14px', color: '#7B8BAA' }}>We will contact you in 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-row">
                      <Field label="  Name *">
                        <input required placeholder="Name " value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputBase} onFocus={focusIn} onBlur={focusOut} />
                      </Field>
                      <Field label="   Email *">
                        <input required type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputBase} onFocus={focusIn} onBlur={focusOut} />
                      </Field>
                    </div>

                    <Field label="    Company">
                      <input placeholder="   Name（Optional）" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} style={inputBase} onFocus={focusIn} onBlur={focusOut} />
                    </Field>

                    <Field label="Your requirement Project Brief *">
                      <textarea required rows={4} placeholder="Please describe your project requirements, target users, core functions, etc." value={form.req} onChange={(e) => setForm({ ...form, req: e.target.value })} style={{ ...inputBase, resize: 'vertical', minHeight: '100px' }}
                        onFocus={focusIn as React.FocusEventHandler<HTMLTextAreaElement>}
                        onBlur={focusOut as React.FocusEventHandler<HTMLTextAreaElement>}
                      />
                    </Field>

                    <Field label="Budget range">
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {BUDGET.map((b) => (
                          <button type="button" key={b} onClick={() => setForm({ ...form, budget: b })}
                            style={{ padding: '8px 14px', borderRadius: '8px', fontFamily: 'DM Sans', fontSize: '13px', cursor: 'none', backgroundColor: form.budget === b ? 'rgba(10,255,217,0.1)' : 'transparent', border: form.budget === b ? '1px solid rgba(10,255,217,0.35)' : '1px solid rgba(240,244,255,0.09)', color: form.budget === b ? '#0AFFD9' : '#7B8BAA', transition: 'all 0.2s' }}>
                            {b}
                          </button>
                        ))}
                      </div>
                    </Field>

                    <button type="submit" className="btn-cta" style={{ width: '100%', justifyContent: 'center', marginTop: '8px', fontSize: '14px', padding: '15px' }}>
                      Submit your requirements and obtain a free plan.
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                    <p style={{ fontFamily: 'DM Sans', fontSize: '12px', color: '#3D4F6B', textAlign: 'center' }}>
                      Your information will be kept strictly confidential. · 24 hours response
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
