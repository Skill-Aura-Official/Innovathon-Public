import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { HACKATHON_THEMES as themes } from '../config/hackathonThemes';
import Hero from '../components/Hero';

const THEME_EMOJIS = {
  windy: '🌬️', anime: '🌸', thunderstorm: '⛈️', ice: '❄️',
  hellish: '🔥', ai: '🤖', 'sci-fi': '🚀'
};

void THEME_EMOJIS;

const highlights = [
  { icon: '🎨', title: '7 Immersive Visual Themes', desc: 'Separate from your problem theme! Choose from AI, Sci-Fi, Anime, and more to customize your platform experience.' },
  { icon: '👥', title: 'Team of 3', desc: 'Build your dream team. Find members, assign roles, and collaborate in real-time.' },
  { icon: '🏆', title: 'Expert Judging', desc: 'Industry experts judge on Innovation, Execution, Impact, and Presentation.' },
  { icon: '💳', title: 'Simple Registration', desc: 'Sign up with Google, form your team, and pay ₹300 — all in under 5 minutes.' },
  { icon: '📤', title: 'Easy Submissions', desc: 'Submit your GitHub repo, demo video, and presentation through our platform.' },
  { icon: '📊', title: 'Live Leaderboard', desc: 'Watch scores update in real-time as judges evaluate each project.' }
];

const timeline = [
  { date: 'Registrations Open', label: 'Now', desc: 'Form your team and secure your spot.' },
  { date: 'Opening Ceremony', label: 'Day 1', desc: 'Kick-off, theme reveal, and problem statement briefing.' },
  { date: 'Hacking Begins', label: 'Day 1', desc: '48 hours to build something incredible.' },
  { date: 'Submissions Due', label: 'Day 3', desc: 'Upload your project, demo video, and presentation.' },
  { date: 'Judging & Results', label: 'Day 3', desc: 'Live scoring and winner announcement.' }
];

const sponsorTiers = [
  { tier: 'Title Sponsor', color: '#fbbf24', icon: '👑', desc: 'Premier branding across the platform, opening ceremony spotlight.', price: 'Custom Package' },
  { tier: 'Gold Sponsors', color: '#f4f3f8', icon: '🥇', desc: 'Logo on all pages, social media features, and judge panel access.', price: 'Starting ₹50,000' },
  { tier: 'Silver Sponsors', color: '#9ca3af', icon: '🥈', desc: 'Logo on sponsor page, social media mention, and event swag integration.', price: 'Starting ₹25,000' },
  { tier: 'Community Partners', color: 'var(--theme-c1)', icon: '🤝', desc: 'Cross-promotion, community access, and event-day branding.', price: 'Barter / In-kind' }
];

const faqs = [
  { q:'What is Innovathon?', a:'Innovathon is the inaugural online hackathon organized by Skillaura. A 3-day event where teams build innovative solutions.' },
  { q:'Who can participate?', a:'Any student (undergraduate or postgraduate) from any institution in India can participate. You need a team of exactly 3 members.' },
  { q:'How much does it cost?', a:'The registration fee is ₹300 per team (not per person). Payment is made via Razorpay.' },
  { q:'What do I need to submit?', a:'A GitHub repo link, problem statement, solution description, a video demo, and a presentation/PPT.' },
  { q:'How is judging done?', a:'Expert judges score each project on 4 criteria: Innovation (40), Execution (30), Impact (20), and Presentation (10).' }
];

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <div className="page-with-header">
      {/* ===== HERO ===== */}
      <Hero />

      {/* ===== THEMES ===== */}
      <section className="section section-centered">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
             <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--theme-c1)', textTransform: 'uppercase', letterSpacing: '2px', padding: '6px 12px', borderRadius: '20px', background: 'color-mix(in srgb, var(--theme-c1) 10%, transparent)' }}>The Challenge</span>
          </div>
          <h2 className="section-title">Problem Statement Themes</h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Innovathon features 7 distinct problem domains. Your team will select one of these Hackathon Themes to build your solution around.
            <br/><span style={{ fontSize: '13px', color: 'var(--theme-c2)', marginTop: '8px', display: 'block' }}>Note: This is separate from your Platform Aesthetic (Visual Theme) which customizes your platform experience!</span>
          </p>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'20px' }}>
          {themes.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.08 }} className="glass-card" style={{ padding:0, textAlign:'left', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '160px', width: '100%' }}>
                <img src={t.imageUrl} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,10,30,1), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '12px', left: '20px', fontSize: '32px' }}>{t.emoji}</div>
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize:'18px', fontWeight:800, color:'#f4f3f8', margin:'0 0 8px' }}>{t.name}</h3>
                <p style={{ color:'#9ca3af', fontSize:'14px', lineHeight:1.6, margin:0, flex: 1 }}>{t.desc}</p>
                <div style={{ width:'40px', height:'3px', borderRadius:'3px', background:t.color, marginTop:'20px', boxShadow:`0 0 12px ${t.color}40` }} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:'48px' }}>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>From signup to submission in 5 simple steps.</p>
        </motion.div>
        <div style={{ maxWidth:'500px', margin:'0 auto' }}>
          {[
            { step:'1', title:'Sign Up', desc:'Create your account. Connect Google or use email.' },
            { step:'2', title:'Form Your Team', desc:'Share your invite code or add members directly.' },
            { step:'3', title:'Pick Hackathon Theme', desc:'Choose your problem domain and visual aesthetic.' },
            { step:'4', title:'Pay & Confirm', desc:'₹300 per team via Razorpay. Instant confirmation.' },
            { step:'5', title:'Build & Submit', desc:'Code for 48 hours, then submit your project.' }
          ].map((s, i) => (
            <motion.div key={s.step} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.1 }} className="timeline-item">
              <div style={{ fontSize:'16px', fontWeight:700, color:'#f4f3f8', marginBottom:'4px' }}>{s.title}</div>
              <div style={{ fontSize:'13px', color:'#6b7280', lineHeight:1.5 }}>{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="section section-centered" style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100vw', height: '100%', zIndex: -1, opacity: 0.3, backgroundImage: 'url(/tech_abstract_feature.png)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(4px)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }} />
        
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
             <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--theme-c2)', textTransform: 'uppercase', letterSpacing: '2px', padding: '6px 12px', borderRadius: '20px', background: 'color-mix(in srgb, var(--theme-c2) 10%, transparent)' }}>The Experience</span>
          </div>
          <h2 className="section-title">What Makes Us Different</h2>
          <p className="section-subtitle">Built for a premium, unparalleled hackathon experience.</p>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'20px', position: 'relative', zIndex: 1 }}>
          {highlights.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.06 }} className="glass-strong" style={{ padding:'32px 28px', textAlign:'left', borderRadius: '20px' }}>
              <div style={{ fontSize:'36px', marginBottom:'16px' }}>{f.icon}</div>
              <h3 style={{ fontSize:'18px', fontWeight:800, color:'#f4f3f8', margin:'0 0 12px' }}>{f.title}</h3>
              <p style={{ color:'#9ca3af', fontSize:'14px', lineHeight:1.6, margin:0 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== MINI SCHEDULE ===== */}
      <section className="section section-centered">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <h2 className="section-title">Event Timeline</h2>
          <p className="section-subtitle">3 intense days of innovation.</p>
        </motion.div>
        <div style={{ maxWidth:'500px', margin:'0 auto', textAlign:'left' }}>
          {timeline.map((t, i) => (
            <motion.div key={i} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.08 }} className="timeline-item">
              <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'4px' }}>
                <span style={{ fontSize:'11px', fontWeight:700, color:'var(--theme-c1)', textTransform:'uppercase', letterSpacing:'0.5px', padding:'2px 8px', borderRadius:'6px', background:'color-mix(in srgb, var(--theme-c1) 10%, transparent)' }}>{t.label}</span>
                <span style={{ fontSize:'15px', fontWeight:700, color:'#f4f3f8' }}>{t.date}</span>
              </div>
              <div style={{ fontSize:'13px', color:'#6b7280' }}>{t.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== SPONSORS ===== */}
      <section className="section section-centered">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <h2 className="section-title">Partner With Us</h2>
          <p className="section-subtitle">Reach India's brightest student developers.</p>
        </motion.div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'16px' }}>
          {sponsorTiers.map((s, i) => (
            <motion.div key={s.tier} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.1 }} className="sponsor-card">
              <div style={{ fontSize:'36px', marginBottom:'12px' }}>{s.icon}</div>
              <h3 style={{ fontSize:'18px', fontWeight:700, color:s.color, margin:'0 0 8px' }}>{s.tier}</h3>
              <p style={{ color:'#6b7280', fontSize:'13px', lineHeight:1.6, margin:'0 0 16px' }}>{s.desc}</p>
              <div style={{ fontSize:'14px', fontWeight:700, color:'#9ca3af' }}>{s.price}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section className="section">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ textAlign:'center', marginBottom:'48px' }}>
          <h2 className="section-title">The Hacker Experience</h2>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>Glimpses of innovation, collaboration, and late-night debugging.</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=600'
          ].map((url, i) => (
            <motion.div key={i} initial={{ opacity:0, scale: 0.9 }} whileInView={{ opacity:1, scale: 1 }} viewport={{ once:true }} transition={{ delay: (i % 4) * 0.1 }}>
              <img src={url} alt={`Gallery ${i}`} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section section-centered">
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}>
          <h2 className="section-title">FAQ</h2>
          <p className="section-subtitle">Got questions? We've got answers.</p>
        </motion.div>
        <div style={{ maxWidth:'700px', margin:'0 auto', display:'flex', flexDirection:'column', gap:'10px', textAlign: 'left' }}>
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.03 }} className="faq-item">
              <button className="faq-question" onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}>
                <span>{faq.q}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  style={{ transform: openFaqIndex===i ? 'rotate(180deg)' : 'rotate(0)', transition:'transform 0.3s', flexShrink:0 }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <AnimatePresence>
                {openFaqIndex === i && (
                  <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
                    transition={{ duration:0.25 }} style={{ overflow:'hidden' }}>
                    <div className="faq-answer">{faq.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ padding:'80px 24px', textAlign:'center' }}>
        <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="glass-strong" style={{ maxWidth:'600px', margin:'0 auto', padding:'56px 40px' }}>
          <div style={{ fontSize:'48px', marginBottom:'16px' }}>⚡</div>
          <h2 style={{ fontSize:'28px', fontWeight:800, color:'#f4f3f8', margin:'0 0 12px' }}>Ready to Build Something Amazing?</h2>
          <p style={{ color:'#9ca3af', fontSize:'15px', margin:'0 0 32px', lineHeight:1.6 }}>
            Join the inaugural Innovathon and be part of something new.
            Limited spots available.
          </p>
          <button className="btn-primary" onClick={() => navigate(user ? '/dashboard' : '/register')}
            style={{ fontSize:'16px', padding:'16px 36px' }}>
            {user ? 'Go to Dashboard' : 'Register Now — ₹300/team'}
          </button>
        </motion.div>
      </section>
    </div>
  );
}
