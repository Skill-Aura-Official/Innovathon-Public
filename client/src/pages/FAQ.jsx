import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q:'What is Innovathon?', a:'Innovathon is the inaugural online hackathon organized by Skillaura. It\'s a 3-day event where teams of 3 build innovative solutions across 4 tracks — Web3, AI/ML, IoT, and Open Innovation.' },
  { q:'Who can participate?', a:'Any student (undergraduate or postgraduate) from any institution in India can participate. You need a team of exactly 3 members.' },
  { q:'How much does it cost?', a:'The registration fee is ₹300 per team (not per person). Payment is made via Razorpay during the registration process.' },
  { q:'Can I participate solo?', a:'No, Innovathon requires teams of exactly 3 members. You can find teammates through our Discord server or by inviting friends who have signed up on the platform.' },
  { q:'How do I form a team?', a:'After signing in with Google, go to the registration wizard. Enter your team name, search for members by their email (they must have an Innovathon account), select your track and theme, then pay.' },
  { q:'What do I need to submit?', a:'You need to submit: (1) A GitHub repository link, (2) A problem statement, (3) A solution description, (4) A video demo (Google Drive link), and (5) A presentation/PPT (Google Drive link).' },
  { q:'How is judging done?', a:'Expert judges score each project on 4 criteria: Innovation (40 pts), Execution (30 pts), Impact (20 pts), and Presentation (10 pts) — totaling 100 points.' },
  { q:'What are the 7 themes?', a:'The themes are visual customizations for your platform experience: Windy, Anime, Thunderstorm, Ice Storm, Hellish, AI, and Sci-Fi. They don\'t affect your project — they change the look and feel of the website.' },
  { q:'Is it fully online?', a:'Yes. Innovathon is 100% online. You can participate from anywhere. All submissions are made through the platform, and judging happens remotely.' },
  { q:'What are the prizes?', a:'Prizes will be announced closer to the event. Follow our socials for updates. Winners will receive cash prizes, certificates, and exclusive merchandise.' },
  { q:'Can I update my submission?', a:'Yes, you can update your submission any time before the deadline. After the deadline, submissions are locked.' },
  { q:'Is there a code of conduct?', a:'Yes. All participants must follow our Code of Conduct. Any form of plagiarism, harassment, or unfair practices will result in disqualification.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="page-with-header">
      <section style={{ padding:'80px 24px 40px', textAlign:'center', maxWidth:'700px', margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <span style={{ display:'inline-block', padding:'6px 16px', borderRadius:'100px', background:'color-mix(in srgb, var(--theme-c1) 10%, transparent)', border:'1px solid rgba(139,77,255,0.2)', fontSize:'12px', fontWeight:600, color:'var(--theme-c1)', marginBottom:'24px' }}>
            FAQ
          </span>
          <h1 className="section-title" style={{ textAlign:'center' }}>Frequently Asked Questions</h1>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>Everything you need to know about Innovathon.</p>
        </motion.div>
      </section>

      <section style={{ padding:'0 24px 80px', maxWidth:'700px', margin:'0 auto' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
              transition={{ delay:i*0.03 }} className="faq-item">
              <button className="faq-question" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span>{faq.q}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  style={{ transform: openIndex===i ? 'rotate(180deg)' : 'rotate(0)', transition:'transform 0.3s', flexShrink:0 }}>
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <AnimatePresence>
                {openIndex === i && (
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
    </div>
  );
}
