import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f0a1e',
      gap: '24px'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{
          fontSize: '36px',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 800,
          background: 'linear-gradient(135deg, var(--theme-c1), var(--theme-c2))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0
        }}>
          Innovathon
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="spinner-lg spinner" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5 }}
        style={{
          color: '#9ca3af',
          fontSize: '14px',
          margin: 0
        }}
      >
        Loading your experience...
      </motion.p>
    </div>
  );
}
