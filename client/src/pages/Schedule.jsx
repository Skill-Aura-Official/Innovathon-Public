import { motion } from 'framer-motion';

const schedule = [
  { day:'Pre-Event', events: [
    { time:'Ongoing', title:'Registrations Open', desc:'Form your team, pick a track, and pay the registration fee.', tag:'Registration' },
    { time:'1 Week Before', title:'Discord Server Opens', desc:'Join the community, find teammates, and ask questions.', tag:'Community' },
  ]},
  { day:'Day 1 — Kick-off', events: [
    { time:'10:00 AM', title:'Opening Ceremony', desc:'Welcome address by Skillaura team and event overview.', tag:'Ceremony' },
    { time:'10:30 AM', title:'Problem Statements Released', desc:'Detailed problem briefs for each track are shared.', tag:'Important' },
    { time:'11:00 AM', title:'Hacking Begins! 🚀', desc:'48-hour countdown starts. Start building your project.', tag:'Build' },
    { time:'4:00 PM', title:'Mentor Office Hours', desc:'Get guidance from mentors on your approach.', tag:'Support' },
  ]},
  { day:'Day 2 — Build', events: [
    { time:'All Day', title:'Build Sprint Continues', desc:'Keep coding, testing, and iterating on your solution.', tag:'Build' },
    { time:'11:00 AM', title:'Mid-Hackathon Check-in', desc:'Optional progress update and Q&A session.', tag:'Support' },
    { time:'3:00 PM', title:'Workshop: Pitching Your Project', desc:'Tips on how to present your project effectively.', tag:'Workshop' },
  ]},
  { day:'Day 3 — Submit & Judge', events: [
    { time:'11:00 AM', title:'Submission Deadline ⏰', desc:'All projects must be submitted by this time. No extensions.', tag:'Important' },
    { time:'12:00 PM', title:'Judging Begins', desc:'Expert panel reviews all submissions across 4 criteria.', tag:'Judging' },
    { time:'4:00 PM', title:'Results & Closing Ceremony 🏆', desc:'Winners announced, prizes distributed, and closing remarks.', tag:'Ceremony' },
  ]}
];

const TAG_COLORS = {
  Registration:'var(--theme-c1)', Community:'var(--theme-c2)', Ceremony:'#fbbf24',
  Important:'#fb7185', Build:'#34d399', Support:'#a78bfa', Workshop:'#f472b6', Judging:'var(--theme-c2)'
};

export default function Schedule() {
  return (
    <div className="page-with-header">
      <section style={{ padding:'80px 24px 40px', textAlign:'center', maxWidth:'700px', margin:'0 auto' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <span style={{ display:'inline-block', padding:'6px 16px', borderRadius:'100px', background:'color-mix(in srgb, var(--theme-c1) 10%, transparent)', border:'1px solid rgba(139,77,255,0.2)', fontSize:'12px', fontWeight:600, color:'var(--theme-c1)', marginBottom:'24px' }}>
            EVENT SCHEDULE
          </span>
          <h1 className="section-title" style={{ textAlign:'center' }}>3 Days of Innovation</h1>
          <p className="section-subtitle" style={{ margin:'0 auto' }}>Here's what to expect during the hackathon. All times are in IST.</p>
        </motion.div>
      </section>

      <section style={{ padding:'0 24px 80px', maxWidth:'1000px', margin:'0 auto' }}>
        {schedule.map((day, di) => {
          const images = [
            'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&q=80&w=600',
            'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=600'
          ];
          
          return (
          <motion.div key={day.day} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ delay:di*0.1 }} style={{ marginBottom:'64px' }}>
            <h2 style={{ fontSize:'24px', fontWeight:800, color:'var(--text)', margin:'0 0 24px', display:'flex', alignItems:'center', gap:'12px' }}>
              <span style={{ width:'12px', height:'12px', borderRadius:'50%', background:'var(--theme-c1)', boxShadow:'0 0 16px rgba(139,77,255,0.6)' }} />
              {day.day}
            </h2>
            <div style={{ display:'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap:'32px', alignItems: 'center' }}>
              {/* Image */}
              <div style={{ order: di % 2 === 0 ? 1 : 2 }}>
                 <img src={images[di]} alt={day.day} style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }} />
              </div>
              
              {/* Events */}
              <div style={{ display:'flex', flexDirection:'column', gap:'16px', order: di % 2 === 0 ? 2 : 1 }}>
                {day.events.map((e, i) => (
                  <motion.div key={i} initial={{ opacity:0, x:-10 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                    transition={{ delay:i*0.05 }} className="glass-card" style={{ padding:'20px 24px', display:'flex', gap:'16px', alignItems:'flex-start' }}>
                    <div style={{ fontSize:'13px', fontWeight:700, color:'var(--muted)', minWidth:'80px', paddingTop:'2px' }}>{e.time}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'10px', marginBottom:'4px', flexWrap:'wrap' }}>
                        <span style={{ fontSize:'16px', fontWeight:700, color:'var(--text)' }}>{e.title}</span>
                        <span style={{ padding:'2px 8px', borderRadius:'6px', fontSize:'10px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.5px',
                          background:`${TAG_COLORS[e.tag]||'var(--theme-c1)'}15`, color:TAG_COLORS[e.tag]||'var(--theme-c1)' }}>{e.tag}</span>
                      </div>
                      <p style={{ color:'var(--muted)', fontSize:'14px', lineHeight:1.5, margin:0 }}>{e.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )})}
      </section>
    </div>
  );
}
