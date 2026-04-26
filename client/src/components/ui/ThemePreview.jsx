export default function ThemePreview({ config }) {
  const colors = config?.colors || ['#06b6d4', '#a855f7', '#3b82f6'];

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: `
          radial-gradient(circle at 20% 25%, ${colors[0]}99, transparent 34%),
          radial-gradient(circle at 78% 30%, ${colors[1]}88, transparent 30%),
          radial-gradient(circle at 48% 82%, ${colors[2] || colors[0]}77, transparent 36%),
          linear-gradient(135deg, rgba(2, 6, 23, 0.95), rgba(15, 23, 42, 0.6))
        `,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-40%',
          backgroundImage: `linear-gradient(90deg, transparent, ${colors[0]}55, transparent)`,
          transform: 'rotate(-18deg)',
          animation: 'sharedPreviewSweep 3.2s linear infinite',
        }}
      />
    </div>
  );
}
