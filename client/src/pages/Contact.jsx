import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show success. Can integrate with email API later.
    setSubmitted(true);
  };

  return (
    <div className="page-with-header">
      <section style={{ padding:'80px 24px 40px', textAlign:'center', maxWidth:'700px', margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <span style={{ display:'inline-block', padding:'6px 16px', borderRadius:'100px', background:'color-mix(in srgb, var(--theme-c1) 10%, transparent)', border:'1px solid rgba(139,77,255,0.2)', fontSize:'12px', fontWeight:600, color:'var(--theme-c1)', marginBottom:'24px' }}>
            CONTACT US
          </span>
          <h1 className="section-title" style={{ textAlign:'center' }}>Get In Touch</h1>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>Have questions about Innovathon? We'd love to hear from you.</p>
        </motion.div>
      </section>

      <section style={{ padding:'0 24px 80px', maxWidth:'800px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'32px' }}>
          {/* Contact Info */}
          <motion.div initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.1 }}>
            <h2 style={{ fontSize:'20px', fontWeight:700, color:'#f4f3f8', margin:'0 0 24px' }}>Contact Information</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'20px' }}>
              <div className="glass-card" style={{ padding:'20px' }}>
                <div style={{ fontSize:'24px', marginBottom:'8px' }}>📧</div>
                <div style={{ fontSize:'13px', color:'#6b7280', marginBottom:'4px', fontWeight:600 }}>Email</div>
                <a href="mailto:hello@skillaura.com" style={{ color:'var(--theme-c1)', fontSize:'14px', textDecoration:'none' }}>hello@skillaura.com</a>
              </div>
              <div className="glass-card" style={{ padding:'20px' }}>
                <div style={{ fontSize:'24px', marginBottom:'8px' }}>💬</div>
                <div style={{ fontSize:'13px', color:'#6b7280', marginBottom:'4px', fontWeight:600 }}>Discord</div>
                <a href="#" style={{ color:'var(--theme-c1)', fontSize:'14px', textDecoration:'none' }}>Join our Discord server</a>
              </div>
              <div className="glass-card" style={{ padding:'20px' }}>
                <div style={{ fontSize:'24px', marginBottom:'8px' }}>📱</div>
                <div style={{ fontSize:'13px', color:'#6b7280', marginBottom:'4px', fontWeight:600 }}>Social Media</div>
                <div style={{ display:'flex', gap:'12px', marginTop:'8px' }}>
                  {['Instagram', 'Twitter', 'LinkedIn'].map(s => (
                    <a key={s} href="#" style={{ padding:'6px 12px', borderRadius:'8px', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.06)', color:'#9ca3af', fontSize:'12px', textDecoration:'none' }}>{s}</a>
                  ))}
                </div>
              </div>
              <div className="glass-card" style={{ padding:'20px' }}>
                <div style={{ fontSize:'24px', marginBottom:'8px' }}>⏰</div>
                <div style={{ fontSize:'13px', color:'#6b7280', marginBottom:'4px', fontWeight:600 }}>Response Time</div>
                <div style={{ color:'#e2e0e8', fontSize:'14px' }}>We typically respond within 24 hours</div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.2 }}>
            <h2 style={{ fontSize:'20px', fontWeight:700, color:'#f4f3f8', margin:'0 0 24px' }}>Send a Message</h2>
            {submitted ? (
              <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} className="glass-strong" style={{ padding:'48px 32px', textAlign:'center' }}>
                <div style={{ fontSize:'48px', marginBottom:'16px' }}>✅</div>
                <h3 style={{ fontSize:'18px', fontWeight:700, color:'#34d399', margin:'0 0 8px' }}>Message Sent!</h3>
                <p style={{ color:'#9ca3af', fontSize:'14px', margin:'0 0 20px' }}>We'll get back to you as soon as possible.</p>
                <button className="btn-secondary" onClick={() => { setSubmitted(false); setForm({ name:'', email:'', subject:'', message:'' }); }} style={{ fontSize:'13px' }}>Send Another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form glass-strong" style={{ padding:'28px' }}>
                <div>
                  <label style={{ fontSize:'12px', fontWeight:600, color:'#9ca3af', display:'block', marginBottom:'6px' }}>NAME</label>
                  <input type="text" value={form.name} onChange={e => setForm({...form, name:e.target.value})} className="input-field" placeholder="Your name" required />
                </div>
                <div>
                  <label style={{ fontSize:'12px', fontWeight:600, color:'#9ca3af', display:'block', marginBottom:'6px' }}>EMAIL</label>
                  <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} className="input-field" placeholder="you@example.com" required />
                </div>
                <div>
                  <label style={{ fontSize:'12px', fontWeight:600, color:'#9ca3af', display:'block', marginBottom:'6px' }}>SUBJECT</label>
                  <select value={form.subject} onChange={e => setForm({...form, subject:e.target.value})} className="select-field" required>
                    <option value="">Select a topic...</option>
                    <option value="registration">Registration Help</option>
                    <option value="payment">Payment Issue</option>
                    <option value="sponsorship">Sponsorship Inquiry</option>
                    <option value="general">General Question</option>
                    <option value="bug">Report a Bug</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:'12px', fontWeight:600, color:'#9ca3af', display:'block', marginBottom:'6px' }}>MESSAGE</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})} className="input-field" placeholder="Tell us more..." rows={4} style={{ resize:'vertical', minHeight:'100px' }} required />
                </div>
                <button type="submit" className="btn-primary" style={{ width:'100%' }}>Send Message</button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
