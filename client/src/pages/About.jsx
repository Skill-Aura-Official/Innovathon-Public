import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const values = [
  { icon:'🎯', title:'Innovation First', desc:'We believe the best ideas come from fresh thinking. No templates, no shortcuts — just raw creativity.' },
  { icon:'🤝', title:'Collaboration', desc:'Three minds are better than one. Innovathon is designed around teamwork and shared problem-solving.' },
  { icon:'📚', title:'Learning', desc:'Whether you win or not, you\'ll walk away with new skills, connections, and real project experience.' },
  { icon:'🌍', title:'Impact', desc:'We encourage solutions that solve real-world problems — not just tech demos.' }
];

const judges = [
  { name: 'To Be Announced', role: 'Industry Expert', avatar: '👤' },
  { name: 'To Be Announced', role: 'Tech Lead', avatar: '👤' },
  { name: 'To Be Announced', role: 'Startup Founder', avatar: '👤' },
];

void judges;

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="page-with-header">
      {/* Hero */}
      <section style={{ padding:'80px 24px 60px', textAlign:'center', maxWidth:'750px', margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <span style={{ display:'inline-block', padding:'6px 16px', borderRadius:'100px', background:'color-mix(in srgb, var(--theme-c1) 10%, transparent)', border:'1px solid rgba(139,77,255,0.2)', fontSize:'12px', fontWeight:600, color:'var(--theme-c1)', marginBottom:'24px', letterSpacing:'0.5px' }}>
            ABOUT THE EVENT
          </span>
          <h1 style={{ fontSize:'clamp(32px, 6vw, 52px)', fontWeight:900, color:'#f4f3f8', margin:'0 0 20px', lineHeight:1.1 }}>
            The First Ever <span className="gradient-text">Innovathon</span>
          </h1>
          <p style={{ color:'#9ca3af', fontSize:'17px', lineHeight:1.8, margin:0 }}>
            Innovathon is the inaugural hackathon organized by <strong style={{ color:'var(--theme-c1)' }}>Skillaura</strong> — 
            a 3-day online event where student teams of 3 come together to build innovative solutions 
            across Web3, AI/ML, IoT, and Open Innovation tracks. We're starting something new, 
            and you're invited to be part of the very first edition.
          </p>
        </motion.div>
      </section>

      {/* What is Innovathon */}
      <section className="section">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'32px', alignItems: 'center' }}>
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <h2 style={{ fontSize:'28px', fontWeight:800, color:'var(--text)', margin:'0 0 16px' }}>Why Innovathon?</h2>
            <p style={{ color:'var(--muted)', fontSize:'16px', lineHeight:1.8, margin:'0 0 16px' }}>
              Most hackathons focus on speed. We focus on <strong style={{ color:'var(--text)' }}>quality</strong>. 
              With 48 hours to build, expert judging across 4 criteria, and a platform designed for 
              the best possible experience — Innovathon is built to bring out your best work.
            </p>
            <p style={{ color:'var(--muted)', fontSize:'16px', lineHeight:1.8, margin:'0 0 24px' }}>
              We've designed 7 unique visual themes to make your hackathon experience truly immersive. 
              From the neon grids of Sci-Fi to the cherry blossoms of Anime — choose the vibe that 
              fuels your creativity.
            </p>
            <div className="glass-strong" style={{ padding:'24px', display:'flex', flexDirection:'column', gap:'16px' }}>
              <div><div style={{ fontSize:'11px', color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'4px' }}>Format</div><div style={{ color:'var(--text)', fontSize:'16px', fontWeight:600 }}>Online • 3 Days • 48hr Build Time</div></div>
              <div><div style={{ fontSize:'11px', color:'var(--muted)', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'4px' }}>Organized By</div><div style={{ color:'var(--theme-c1)', fontSize:'16px', fontWeight:600 }}>Skillaura</div></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000" alt="Hackathon Teams Working" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }} />
            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '100px', height: '100px', background: 'var(--theme-c1)', filter: 'blur(50px)', opacity: 0.5, zIndex: -1 }} />
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'var(--theme-c2)', filter: 'blur(50px)', opacity: 0.5, zIndex: -1 }} />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-centered">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <h2 className="section-title">What We Stand For</h2>
          <p className="section-subtitle">The principles that drive Innovathon.</p>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'16px' }}>
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.08 }} className="glass-card" style={{ padding:'28px 24px', textAlign:'left' }}>
              <div style={{ fontSize:'32px', marginBottom:'12px' }}>{v.icon}</div>
              <h3 style={{ fontSize:'16px', fontWeight:700, color:'#f4f3f8', margin:'0 0 8px' }}>{v.title}</h3>
              <p style={{ color:'#6b7280', fontSize:'13px', lineHeight:1.6, margin:0 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Judging Criteria */}
      <section className="section">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:'48px' }}>
          <h2 className="section-title">Judging Criteria</h2>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>Projects are scored across 4 dimensions (100 points total).</p>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'16px', maxWidth:'900px', margin:'0 auto' }}>
          {[
            { label:'Innovation', points:40, color:'var(--theme-c1)', desc:'Originality and creativity of the solution.' },
            { label:'Execution', points:30, color:'var(--theme-c2)', desc:'Code quality, functionality, and completeness.' },
            { label:'Impact', points:20, color:'#34d399', desc:'Real-world applicability and potential scale.' },
            { label:'Presentation', points:10, color:'#fbbf24', desc:'Clarity of demo, pitch, and documentation.' }
          ].map((c, i) => (
            <motion.div key={c.label} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.1 }} className="glass-card" style={{ padding:'24px', textAlign:'center' }}>
              <div style={{ fontSize:'36px', fontWeight:900, fontFamily:"'Space Grotesk',sans-serif", color:c.color, marginBottom:'8px' }}>{c.points}</div>
              <div style={{ fontSize:'11px', color:'#6b7280', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'6px' }}>Points</div>
              <h3 style={{ fontSize:'16px', fontWeight:700, color:'#f4f3f8', margin:'0 0 8px' }}>{c.label}</h3>
              <p style={{ color:'#6b7280', fontSize:'12px', lineHeight:1.5, margin:0 }}>{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* The Culture Gallery */}
      <section className="section">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:'48px' }}>
          <h2 className="section-title">The Innovathon Culture</h2>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>Building the future, together.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
          {[
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600'
          ].map((url, i) => (
            <motion.div key={i} initial={{ opacity:0, scale: 0.9 }} whileInView={{ opacity:1, scale: 1 }} viewport={{ once:true }} transition={{ delay: (i % 4) * 0.1 }}>
              <img src={url} alt={`Culture ${i}`} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'60px 24px 80px', textAlign:'center' }}>
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}>
          <h2 style={{ fontSize:'24px', fontWeight:800, color:'#f4f3f8', margin:'0 0 16px' }}>Be Part of History</h2>
          <p style={{ color:'#9ca3af', fontSize:'15px', margin:'0 0 28px' }}>The first ever Innovathon starts soon. Don't miss it.</p>
          <button className="btn-primary" onClick={() => navigate('/login')} style={{ fontSize:'15px', padding:'14px 32px' }}>Register Your Team</button>
        </motion.div>
      </section>
    </div>
  );
}
