import { motion } from 'framer-motion';

const sponsorTiers = [
  {
    tier: 'Title Sponsor', color: '#fbbf24', icon: '👑',
    desc: 'Premier branding across the platform, opening ceremony spotlight, and exclusive perks.',
    spots: 'Seeking 1 partner', price: 'Custom Package'
  },
  {
    tier: 'Gold Sponsors', color: '#f4f3f8', icon: '🥇',
    desc: 'Logo on all pages, social media features, and judge panel access.',
    spots: 'Seeking 2-3 partners', price: 'Starting ₹50,000'
  },
  {
    tier: 'Silver Sponsors', color: '#9ca3af', icon: '🥈',
    desc: 'Logo on sponsor page, social media mention, and event swag integration.',
    spots: 'Seeking 3-5 partners', price: 'Starting ₹25,000'
  },
  {
    tier: 'Community Partners', color: 'var(--theme-c1)', icon: '🤝',
    desc: 'Cross-promotion, community access, and event-day branding.',
    spots: 'Open', price: 'Barter / In-kind'
  }
];

const perks = [
  '🎯 Direct access to 500+ student developers',
  '📢 Brand visibility across all event communications',
  '🏆 Naming rights for prize categories',
  '📊 Post-event engagement report',
  '🎤 Speaking slot during ceremony',
  '💼 Talent pipeline for recruitment'
];

export default function Sponsors() {
  return (
    <div className="page-with-header">
      <section style={{ padding:'80px 24px 40px', textAlign:'center', maxWidth:'700px', margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <span style={{ display:'inline-block', padding:'6px 16px', borderRadius:'100px', background:'color-mix(in srgb, var(--theme-c1) 10%, transparent)', border:'1px solid rgba(139,77,255,0.2)', fontSize:'12px', fontWeight:600, color:'var(--theme-c1)', marginBottom:'24px' }}>
            SPONSORS
          </span>
          <h1 className="section-title" style={{ textAlign:'center' }}>Partner With Innovathon</h1>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>
            Be part of the inaugural edition. Reach India's brightest student developers and showcase your brand.
          </p>
        </motion.div>
      </section>

      {/* Sponsor Tiers */}
      <section style={{ padding:'0 24px 60px', maxWidth:'900px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'16px' }}>
          {sponsorTiers.map((s, i) => (
            <motion.div key={s.tier} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.1 }} className="sponsor-card">
              <div style={{ fontSize:'36px', marginBottom:'12px' }}>{s.icon}</div>
              <h3 style={{ fontSize:'18px', fontWeight:700, color:s.color, margin:'0 0 8px' }}>{s.tier}</h3>
              <p style={{ color:'#6b7280', fontSize:'13px', lineHeight:1.6, margin:'0 0 16px' }}>{s.desc}</p>
              <div style={{ fontSize:'12px', color:'#4b5563', marginBottom:'4px' }}>{s.spots}</div>
              <div style={{ fontSize:'14px', fontWeight:700, color:'#9ca3af' }}>{s.price}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Sponsor */}
      <section className="section">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:'40px' }}>
          <h2 style={{ fontSize:'24px', fontWeight:800, color:'#f4f3f8', margin:'0 0 12px' }}>Why Sponsor Us?</h2>
          <p style={{ color:'#9ca3af', fontSize:'15px', margin:0 }}>Here's what sponsors get from partnering with Innovathon.</p>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'12px', maxWidth:'700px', margin:'0 auto' }}>
          {perks.map((p, i) => (
            <motion.div key={i} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.05 }} style={{ padding:'16px 20px', borderRadius:'12px', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', fontSize:'14px', color:'#e2e0e8' }}>
              {p}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Past Partners Image Gallery */}
      <section className="section">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:'40px' }}>
          <h2 style={{ fontSize:'24px', fontWeight:800, color:'var(--text)', margin:'0 0 12px' }}>Trusted By The Best</h2>
          <p style={{ color:'var(--muted)', fontSize:'15px', margin:0 }}>We've worked with amazing companies and communities to bring hackathons to life.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1518932945647-7a1c969f8be2?auto=format&fit=crop&q=80&w=600'
          ].map((url, i) => (
            <motion.div key={i} initial={{ opacity:0, scale: 0.9 }} whileInView={{ opacity:1, scale: 1 }} viewport={{ once:true }} transition={{ delay: (i % 4) * 0.1 }}>
              <img src={url} alt={`Partner ${i}`} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'40px 24px 80px', textAlign:'center' }}>
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          className="glass-strong" style={{ maxWidth:'500px', margin:'0 auto', padding:'40px 32px' }}>
          <h2 style={{ fontSize:'20px', fontWeight:800, color:'#f4f3f8', margin:'0 0 12px' }}>Interested in Sponsoring?</h2>
          <p style={{ color:'#9ca3af', fontSize:'14px', margin:'0 0 24px', lineHeight:1.6 }}>
            Reach out to us and we'll send you a detailed sponsorship deck.
          </p>
          <a href="mailto:sponsors@skillaura.com" className="btn-primary" style={{ textDecoration:'none', display:'inline-flex', fontSize:'14px', padding:'12px 28px' }}>
            📧 sponsors@skillaura.com
          </a>
        </motion.div>
      </section>
    </div>
  );
}
