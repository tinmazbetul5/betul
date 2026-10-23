import React, { useMemo } from 'react';

interface ConfettiPiece {
  id: number;
  left: string;
  width: number;
  height: number;
  backgroundColor: string;
  borderRadius: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
}

const COLORS = [
  '#f59e0b', // amber / gold
  '#fbbf24', // bright gold
  '#10b981', // emerald
  '#34d399', // mint green
  '#06b6d4', // cyan
  '#38bdf8', // sky blue
  '#ec4899', // pink
  '#f43f5e', // rose
  '#8b5cf6', // purple
  '#a855f7', // violet
  '#e2e8f0', // silver / white
];

export const ConfettiEffect: React.FC<{ count?: number }> = ({ count = 50 }) => {
  // Generate deterministic confetti pieces on initial mount
  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const color = COLORS[i % COLORS.length];
      const isCircle = i % 5 === 0;
      const isRibbon = i % 3 === 0;
      const width = isRibbon ? 8 : isCircle ? 9 : 10;
      const height = isRibbon ? 16 : isCircle ? 9 : 10;
      const borderRadius = isCircle ? '50%' : isRibbon ? '2px' : '3px';
      
      // Spread across the entire width 0% - 98%
      const left = `${((i * 19) % 96) + 2}%`;
      const duration = (2.2 + ((i * 7) % 25) / 10).toFixed(1); // 2.2s - 4.6s
      const delay = (((i * 13) % 35) / 10).toFixed(1); // 0s - 3.4s
      const opacity = 0.85 + ((i % 3) * 0.05);

      return {
        id: i,
        left,
        width,
        height,
        backgroundColor: color,
        borderRadius,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity,
      };
    });
  }, [count]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none overflow-hidden z-40"
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-particle"
          style={{
            left: piece.left,
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            backgroundColor: piece.backgroundColor,
            borderRadius: piece.borderRadius,
            animationDuration: piece.animationDuration,
            animationDelay: piece.animationDelay,
            opacity: piece.opacity,
            boxShadow: `0 0 6px ${piece.backgroundColor}80`,
          }}
        />
      ))}
    </div>
  );
};
