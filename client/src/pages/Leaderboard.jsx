import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Placeholder data — will be replaced with API calls when scoring backend is built
const MOCK_TEAMS = [
  { rank: 1, name: 'Team Quantum', track: 'AI/ML', score: 92.5, members: 3 },
  { rank: 2, name: 'ByteForce', track: 'Web3', score: 89.0, members: 3 },
  { rank: 3, name: 'NeuralNexus', track: 'AI/ML', score: 87.3, members: 3 },
  { rank: 4, name: 'CodeCrafters', track: 'IoT', score: 85.1, members: 3 },
  { rank: 5, name: 'PixelPioneers', track: 'Other', score: 83.7, members: 3 },
  { rank: 6, name: 'DataDynamos', track: 'AI/ML', score: 81.2, members: 3 },
  { rank: 7, name: 'HackHeroes', track: 'Web3', score: 79.8, members: 3 },
  { rank: 8, name: 'TechTitans', track: 'IoT', score: 77.4, members: 3 },
];

const TRACK_COLORS = {
  'Web3': 'var(--theme-c1)',
  'AI/ML': 'var(--theme-c2)',
  'IoT': '#f472b6',
  'Other': '#fbbf24'
};

const RANK_MEDALS = {
  1: '🥇',
  2: '🥈',
  3: '🥉'
};

export default function Leaderboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const filteredTeams = filter === 'all'
    ? MOCK_TEAMS
    : MOCK_TEAMS.filter(t => t.track === filter);

  return (
    <div className="page-with-header" style={{ padding: '88px 24px 24px', maxWidth: '900px', margin: '0 auto' }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <button
            onClick={() => navigate(-1)}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              fontSize: '13px',
              cursor: 'pointer',
              marginBottom: '8px',
              fontFamily: 'inherit'
            }}
          >
            ← Back
          </button>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#f4f3f8', margin: 0 }}>
            🏆 Leaderboard
          </h1>
        </div>

        {/* Track filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['all', 'Web3', 'AI/ML', 'IoT', 'Other'].map(track => (
            <button
              key={track}
              onClick={() => setFilter(track)}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
                background: filter === track
                  ? 'rgba(139, 77, 255, 0.15)'
                  : 'rgba(255, 255, 255, 0.04)',
                color: filter === track ? 'var(--theme-c1)' : '#6b7280',
                ...(filter === track && {
                  boxShadow: '0 0 12px rgba(139, 77, 255, 0.2)'
                })
              }}
            >
              {track === 'all' ? 'All Tracks' : track}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      {filter === 'all' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginBottom: '40px'
          }}
        >
          {MOCK_TEAMS.slice(0, 3).map((team, i) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="glass-card"
              style={{
                padding: '28px 20px',
                textAlign: 'center',
                order: i === 0 ? 1 : i === 1 ? 0 : 2,
                ...(i === 0 && {
                  background: 'linear-gradient(135deg, rgba(139, 77, 255, 0.1), rgba(6, 214, 224, 0.05))',
                  border: '1px solid rgba(139, 77, 255, 0.2)',
                  transform: 'scale(1.05)'
                })
              }}
            >
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>
                {RANK_MEDALS[team.rank]}
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 700,
                color: '#f4f3f8',
                marginBottom: '4px'
              }}>
                {team.name}
              </div>
              <div style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: '6px',
                background: `${TRACK_COLORS[team.track]}15`,
                color: TRACK_COLORS[team.track],
                fontSize: '11px',
                fontWeight: 600,
                marginBottom: '12px'
              }}>
                {team.track}
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: 800,
                fontFamily: "'Space Grotesk', sans-serif",
                color: i === 0 ? '#fbbf24' : '#f4f3f8'
              }}>
                {team.score}
              </div>
              <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>points</div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Full Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="glass"
        style={{ overflow: 'hidden' }}
      >
        {/* Table Header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60px 1fr 120px 100px',
          padding: '14px 20px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          fontSize: '11px',
          fontWeight: 700,
          color: '#6b7280',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          <div>Rank</div>
          <div>Team</div>
          <div>Track</div>
          <div style={{ textAlign: 'right' }}>Score</div>
        </div>

        {/* Rows */}
        {filteredTeams.map((team, i) => (
          <motion.div
            key={team.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i }}
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr 120px 100px',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.03)',
              alignItems: 'center',
              transition: 'background 0.2s',
              cursor: 'default'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{
              fontSize: '16px',
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              color: team.rank <= 3 ? '#fbbf24' : '#6b7280'
            }}>
              {RANK_MEDALS[team.rank] || `#${team.rank}`}
            </div>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 600, color: '#f4f3f8' }}>
                {team.name}
              </div>
              <div style={{ fontSize: '12px', color: '#4b5563' }}>
                {team.members} members
              </div>
            </div>
            <div>
              <span style={{
                padding: '4px 10px',
                borderRadius: '6px',
                background: `${TRACK_COLORS[team.track]}10`,
                color: TRACK_COLORS[team.track],
                fontSize: '12px',
                fontWeight: 600
              }}>
                {team.track}
              </span>
            </div>
            <div style={{
              textAlign: 'right',
              fontSize: '18px',
              fontWeight: 700,
              fontFamily: "'Space Grotesk', sans-serif",
              color: '#f4f3f8'
            }}>
              {team.score}
            </div>
          </motion.div>
        ))}

        {filteredTeams.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
            No teams in this track yet.
          </div>
        )}
      </motion.div>

      {/* Note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          textAlign: 'center',
          color: '#4b5563',
          fontSize: '12px',
          marginTop: '24px'
        }}
      >
        Scores are updated in real-time as judges submit their evaluations.
      </motion.p>
    </div>
  );
}
