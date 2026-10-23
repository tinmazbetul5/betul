import React from 'react';

interface StageBackgroundProps {
  theme: 'library' | 'lab' | 'space';
  stageIndex: 0 | 1 | 2;
  parallaxX: number; // -1 to 1
  parallaxY: number; // -1 to 1
  isAnswering: boolean;
}

export const StageBackground: React.FC<StageBackgroundProps> = ({
  theme,
  stageIndex,
  parallaxX,
  parallaxY,
  isAnswering,
}) => {
  // Parallax offsets for depth
  const backX = -parallaxX * 14;
  const backY = -parallaxY * 10;
  const foreX = -parallaxX * 42;
  const foreY = -parallaxY * 28;

  // Individual high-resolution artwork for each world
  const stageImages = [
    '/assets/aistudio/B_y_l__K_t_phanede__lk_S_r__3__fea17c18.png',
    '/assets/aistudio/Merakl__Ka_ifin_Bilim_Laboratuvar__49a8a60c.png',
    '/assets/aistudio/Uzay__stasyonunda_D_nya_Ke_fi_007874a3.png',
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {/* Layer 1 (FAR): Official 3D Scene Artwork */}
      <div
        className="absolute -inset-10 bg-cover bg-center transition-all duration-700 ease-out"
        style={{
          backgroundImage: `url('${stageImages[stageIndex]}')`,
          transform: `translate3d(${backX}px, ${backY}px, 0) scale(1.05)`,
          filter: isAnswering
            ? 'brightness(0.65) contrast(1.1) saturate(1.05)'
            : 'brightness(0.95) contrast(1.05)',
        }}
      />

      {/* Layer 2 (MID): Ambient Depth Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 pointer-events-none ${
          isAnswering ? 'bg-slate-950/45 backdrop-blur-[2px]' : 'bg-transparent'
        }`}
      />

      {/* Layer 3 (FOREGROUND): Floating Thematic Particles */}
      <div
        className="absolute -inset-10 transition-transform duration-150 ease-out pointer-events-none"
        style={{ transform: `translate3d(${foreX}px, ${foreY}px, 0)` }}
      >
        {/* World 1: Golden Dust Particles (Antik Kütüphane) */}
        {theme === 'library' && (
          <svg viewBox="0 0 1440 900" className="w-full h-full">
            {Array.from({ length: 36 }).map((_, i) => (
              <circle
                key={i}
                cx={120 + (i * 47) % 1200}
                cy={80 + (i * 31) % 750}
                r={1.8 + (i % 3) * 1.5}
                fill="#fef08a"
                opacity={0.35 + (i % 5) * 0.12}
                className="animate-pulse"
                style={{ animationDuration: `${2.2 + (i % 3)}s` }}
              />
            ))}
          </svg>
        )}

        {/* World 2: Rising Chemical Bubbles (Bilim Laboratuvarı) */}
        {theme === 'lab' && (
          <svg viewBox="0 0 1440 900" className="w-full h-full">
            {Array.from({ length: 30 }).map((_, i) => (
              <circle
                key={i}
                cx={160 + (i * 53) % 1120}
                cy={150 + (i * 37) % 650}
                r={2.5 + (i % 3) * 2}
                fill={i % 2 === 0 ? '#22d3ee' : '#34d399'}
                opacity={0.4 + (i % 4) * 0.15}
                className="animate-ping"
                style={{ animationDuration: `${2.5 + (i % 3)}s` }}
              />
            ))}
          </svg>
        )}

        {/* World 3: Twinkling Cosmic Stars (Uzay İstasyonu) */}
        {theme === 'space' && (
          <svg viewBox="0 0 1440 900" className="w-full h-full">
            {Array.from({ length: 45 }).map((_, i) => (
              <circle
                key={i}
                cx={(i * 37) % 1440}
                cy={(i * 29) % 750}
                r={(i % 3 === 0 ? 2.5 : 1.5) + (i % 4) * 0.5}
                fill={i % 3 === 0 ? '#c084fc' : '#ffffff'}
                opacity={0.45 + (i % 6) * 0.1}
                className={i % 4 === 0 ? 'animate-ping' : 'animate-pulse'}
                style={{ animationDuration: `${2.5 + (i % 3)}s` }}
              />
            ))}
          </svg>
        )}
      </div>

      {/* Screen Vignette Effect: Darkened edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(2,6,23,0) 45%, rgba(2,6,23,0.5) 75%, rgba(2,6,23,0.92) 100%)',
        }}
      />
    </div>
  );
};
