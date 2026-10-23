import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface InteractiveObjectPromptProps {
  stageIndex: 0 | 1 | 2;
  onUnlockStage: () => void;
  isSoundMuted: boolean;
}

export const InteractiveObjectPrompt: React.FC<InteractiveObjectPromptProps> = ({
  stageIndex,
  onUnlockStage,
  isSoundMuted,
}) => {
  const [isActivating, setIsActivating] = useState(false);

  const stageData = [
    {
      title: '1. Dünya: Antik Kütüphane',
      promptText: 'İlk sırrı keşfetmek için kitaba dokun!',
      iconText: '📖',
      color: 'amber',
      accentBorder: 'border-amber-400',
      badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-600',
      btnBg: 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950',
      soundFn: () => soundEffects.bookOpen(),
    },
    {
      title: '2. Dünya: Bilim Laboratuvarı',
      promptText: 'Yeni ipuçlarını bulmak için büyütece dokun!',
      iconText: '🔍',
      color: 'cyan',
      accentBorder: 'border-cyan-400',
      badgeBg: 'bg-cyan-950/80 text-cyan-300 border-cyan-600',
      btnBg: 'bg-gradient-to-r from-cyan-500 via-teal-500 to-cyan-600 text-slate-950',
      soundFn: () => soundEffects.lensDiscover(),
    },
    {
      title: '3. Dünya: Uzay İstasyonu',
      promptText: 'Son keşif için Dünya maketine dokun!',
      iconText: '🌍',
      color: 'purple',
      accentBorder: 'border-purple-400',
      badgeBg: 'bg-purple-950/80 text-purple-300 border-purple-600',
      btnBg: 'bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white',
      soundFn: () => soundEffects.globeActivate(),
    },
  ][stageIndex];

  const handleClick = () => {
    if (isActivating) return;
    setIsActivating(true);
    if (!isSoundMuted) stageData.soundFn();

    // Trigger visual activation sparkle then start questions
    setTimeout(() => {
      onUnlockStage();
    }, 600);
  };

  return (
    <div className="absolute inset-0 z-30 flex flex-col items-center justify-end pb-12 sm:pb-16 px-4 animate-fade-in pointer-events-auto">
      {/* Interactive Object Floating Trigger */}
      <div className="flex flex-col items-center gap-4 text-center max-w-lg mx-auto">
        {/* Pulsing Object Icon / Button */}
        <button
          onClick={handleClick}
          className={`relative group p-4 sm:p-5 rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-[0_15px_35px_rgba(0,0,0,0.8)] border-4 ${
            stageData.accentBorder
          } ${isActivating ? 'scale-125 animate-ping' : 'animate-bounce'}`}
          style={{ animationDuration: '2.2s' }}
          title={stageData.promptText}
        >
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-2 rounded-3xl bg-amber-400/30 blur-lg group-hover:bg-amber-400/60 transition-colors" />

          {/* Icon Surface */}
          <div className="relative z-10 flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-slate-950/90 rounded-2xl border border-white/20">
            <span className="text-4xl sm:text-5xl select-none filter drop-shadow">
              {stageData.iconText}
            </span>
          </div>

          {/* Sparkle indicators */}
          <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
        </button>

        {/* Prompt Speech Pill (Directly matching user's artwork prompts) */}
        <button
          onClick={handleClick}
          className={`group flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border-2 ${
            stageData.accentBorder
          } bg-slate-950/90 hover:bg-slate-900 shadow-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer`}
        >
          <span className="text-2xl sm:text-3xl">{stageData.iconText}</span>
          <span className="text-sm sm:text-base font-black tracking-wide text-white group-hover:text-amber-300 transition-colors">
            {stageData.promptText}
          </span>
        </button>
      </div>
    </div>
  );
};
