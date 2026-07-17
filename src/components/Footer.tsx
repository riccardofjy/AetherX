export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#020509', borderTop: '1px solid rgba(240,244,255,0.05)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 32px 32px' }}>
        {/* Top row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center', gap: '24px', marginBottom: '32px',
        }} className="footer-top">

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '8px',
              background: 'linear-gradient(135deg, #0AFFD9 0%, #6D43FF 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '11px', color: '#03070F' }}>AX</span>
            </div>
            <div>
              <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '15px', color: '#F0F4FF', letterSpacing: '-0.03em' }}>
                AetherX
              </span>
              <span style={{ color: '#3D4F6B', fontSize: '12px', fontFamily: 'DM Sans', marginLeft: '6px' }}>Pte. Ltd.</span>
            </div>
          </div>

          {/* Center nav */}
          <nav style={{ display: 'flex', gap: '4px' }}>
            {[
              { zh: 'Home', href: '#home' },
              { zh: 'Service', href: '#services' },
              { zh: 'Advantages', href: '#why-us' },
              { zh: 'Contact', href: '#contact' },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: 'DM Sans', fontSize: '13px', color: '#3D4F6B',
                  textDecoration: 'none', padding: '6px 12px', borderRadius: '6px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#7B8BAA')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#3D4F6B')}
              >
                {l.zh}
              </a>
            ))}
          </nav>

          {/* Right — contact */}
          <div style={{ textAlign: 'right' }}>
            <a
              href="mailto:contact@aetherx.co"
              style={{
                fontFamily: 'DM Sans', fontSize: '13px', color: '#3D4F6B',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#0AFFD9')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#3D4F6B')}
            >
              contact@aetherx.co
            </a>
          </div>
        </div>

        <div className="divider" />

        {/* Bottom row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: '24px', flexWrap: 'wrap', gap: '12px',
        }}>
          <p className="f-label" style={{ color: '#1E293B' }}>
            © {new Date().getFullYear()} AetherX Pte. Ltd. · Registered in Singapore · All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            {['Privacy', 'Terms of service'].map((t) => (
              <a
                key={t}
                href="#"
                className="f-label"
                style={{ color: '#1E293B', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#3D4F6B')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#1E293B')}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .footer-top { grid-template-columns: 1fr !important; text-align: center; }
          .footer-top > div:last-child { text-align: center !important; }
        }
      `}</style>
    </footer>
  )
}
