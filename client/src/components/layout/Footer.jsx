import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  'Event': [
    { to: '/about', label: 'About' },
    { to: '/schedule', label: 'Schedule' },
    { to: '/themes', label: 'Themes' },
    { to: '/leaderboard', label: 'Leaderboard' },
  ],
  'Resources': [
    { to: '/faq', label: 'FAQ' },
    { to: '/sponsors', label: 'Sponsors' },
    { to: '/contact', label: 'Contact' },
  ],
  'Legal': [
    { to: '#', label: 'Terms of Service' },
    { to: '#', label: 'Privacy Policy' },
    { to: '#', label: 'Code of Conduct' },
  ]
};

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(255,255,255,0.06)',
      background: 'rgba(15, 10, 30, 0.5)',
      padding: '60px 24px 32px'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px', marginBottom: '48px'
        }}>
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '7px',
                background: 'linear-gradient(135deg, var(--theme-c1), var(--theme-c2))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', color: 'white'
              }}>⚡</div>
              <span style={{
                fontSize: '16px', fontWeight: 800,
                fontFamily: "'Space Grotesk', sans-serif",
                color: '#f4f3f8'
              }}>Innovathon</span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: 1.7, margin: '0 0 16px', maxWidth: '260px' }}>
              The inaugural hackathon by Skillaura. Build, compete, and showcase your skills on a national stage.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Instagram', 'Twitter', 'LinkedIn', 'Discord'].map(social => (
                <a key={social} href="#" style={{
                  width: '34px', height: '34px', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', fontSize: '12px', color: '#6b7280',
                  transition: 'all 0.2s'
                }} title={social}>
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{
                fontSize: '12px', fontWeight: 700, color: '#9ca3af',
                textTransform: 'uppercase', letterSpacing: '1px',
                margin: '0 0 16px'
              }}>{title}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {links.map(link => (
                  <Link key={link.label} to={link.to} style={{
                    color: '#6b7280', fontSize: '14px', textDecoration: 'none',
                    transition: 'color 0.2s'
                  }}
                  onMouseOver={e => e.target.style.color = 'var(--theme-c1)'}
                  onMouseOut={e => e.target.style.color = '#6b7280'}
                  >{link.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '24px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px'
        }}>
          <p style={{ color: '#4b5563', fontSize: '12px', margin: 0 }}>
            © 2026 Skillaura. All rights reserved.
          </p>
          <p style={{ color: '#4b5563', fontSize: '12px', margin: 0 }}>
            Made with 💜 for the community
          </p>
        </div>
      </div>
    </footer>
  );
}
