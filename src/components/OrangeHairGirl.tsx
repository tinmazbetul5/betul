import React, { useState, useEffect } from 'react';

export type CharacterMood = 'neutral' | 'happy' | 'wrong' | 'whistle' | 'celebrating';

interface OrangeHairGirlProps {
  mood: CharacterMood;
  className?: string;
}

export const OrangeHairGirl: React.FC<OrangeHairGirlProps> = ({
  mood,
  className = "w-44 h-48 sm:w-56 sm:h-60"
}) => {
  // Toggle between whistle frame 1 and whistle frame 2 for animated whistle blowing
  const [whistleFrame, setWhistleFrame] = useState<0 | 1>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (mood === 'wrong' || mood === 'whistle') {
      interval = setInterval(() => {
        setWhistleFrame((prev) => (prev === 0 ? 1 : 0));
      }, 220);
    } else {
      setWhistleFrame(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mood]);

  // Determine current active image
  let activeSrc = '/assets/aistudio/image_b4e6452e.png';
  let animationClass = '';

  if (mood === 'wrong' || mood === 'whistle') {
    activeSrc =
      whistleFrame === 0
        ? '/assets/aistudio/image_876bf2de.png'
        : '/assets/aistudio/image_1d3ad34f.png';
    animationClass = 'animate-shake scale-105';
  } else if (mood === 'happy') {
    animationClass = 'animate-bounce scale-105';
  } else if (mood === 'celebrating') {
    animationClass = 'scale-110';
  }

  return (
    <div
      className={`relative select-none pointer-events-none transition-all duration-300 drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] ${animationClass} ${className}`}
    >
      {/* 3D Claymorphism Character Image */}
      <img
        src={activeSrc}
        alt="3D Turuncu Saçlı Hakem Kız - Aylin"
        className="w-full h-full object-contain filter drop-shadow-[0_10px_15px_rgba(234,88,12,0.35)]"
        onError={(e) => {
          // If asset fails to load, gracefully fallback to inline claymorphism SVG
          e.currentTarget.style.display = 'none';
          const fallback = e.currentTarget.parentElement?.querySelector('.clay-svg-fallback');
          if (fallback) (fallback as HTMLElement).style.display = 'block';
        }}
      />

      {/* Whistle blowing wind puffs indicator */}
      {(mood === 'wrong' || mood === 'whistle') && (
        <div className="absolute top-1/3 -left-4 sm:-left-8 flex items-center gap-1 animate-pulse">
          <span className="text-xl sm:text-2xl">💨</span>
          <span className="font-mono text-xs font-black text-red-400 bg-red-950/80 px-2 py-0.5 rounded-full border border-red-500 shadow-lg">
            DÜÜÜT!
          </span>
        </div>
      )}

      {/* SVG Claymorphism Fallback Container */}
      <div className="clay-svg-fallback hidden w-full h-full">
        <svg viewBox="0 0 240 320" className="w-full h-full">
          <defs>
            <radialGradient id="claySkin" cx="40%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="70%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.4" />
            </radialGradient>
            <radialGradient id="clayHair" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#fdba74" />
              <stop offset="45%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#9a3412" />
            </radialGradient>
            <filter id="clayShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>
          <ellipse cx="120" cy="130" rx="50" ry="52" fill="url(#claySkin)" filter="url(#clayShadow)" />
          <path d="M60 110 C30 130 10 180 25 240 C35 210 50 180 75 160 Z" fill="url(#clayHair)" />
          <path d="M180 110 C210 130 230 180 215 240 C205 210 190 180 165 160 Z" fill="url(#clayHair)" />
          <ellipse cx="98" cy="128" rx="8" ry="10" fill="#0f172a" />
          <ellipse cx="142" cy="128" rx="8" ry="10" fill="#0f172a" />
          <circle cx="95" cy="124" r="3" fill="#fff" />
          <circle cx="139" cy="124" r="3" fill="#fff" />
          <path d="M72 120 C65 95 80 65 120 65 C160 65 175 95 168 120 Z" fill="url(#clayHair)" />
        </svg>
      </div>
    </div>
  );
};
