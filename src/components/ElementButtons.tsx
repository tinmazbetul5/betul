import React from 'react';
import { Check, X } from 'lucide-react';

interface OptionItem {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

interface ElementButtonsProps {
  options: OptionItem[];
  selectedKey: 'A' | 'B' | 'C' | 'D' | null;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  isAnswered: boolean;
  onSelect: (key: 'A' | 'B' | 'C' | 'D') => void;
}

export const ElementButtons: React.FC<ElementButtonsProps> = ({
  options,
  selectedKey,
  correctAnswer,
  isAnswered,
  onSelect,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 4 Options Grid (A, B, C, D) Always 100% visible, fully responsive, zero scroll clipping */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
        {options.map((opt) => {
          const isSelected = selectedKey === opt.key;
          const isThisCorrect = opt.key === correctAnswer;

          // 3D tactile button styles
          let base3D =
            'relative bg-slate-900/95 text-slate-100 border-2 border-slate-700/80 border-b-4 border-b-slate-950 active:border-b-2 active:translate-y-1 hover:border-amber-400 hover:shadow-[0_0_15px_rgba(251,191,36,0.25)]';
          let statusBadge = (
            <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-800 border border-slate-600 font-black text-amber-400 flex items-center justify-center text-xs sm:text-sm shadow-inner">
              {opt.key}
            </span>
          );
          let shakeClass = '';

          if (isAnswered) {
            if (isThisCorrect) {
              base3D =
                'bg-emerald-600/95 text-white border-2 border-emerald-400 border-b-4 border-b-emerald-900 shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-[1.01]';
              statusBadge = (
                <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-700 border border-emerald-300 font-bold text-white flex items-center justify-center">
                  <Check className="w-4 h-4 text-white animate-bounce" />
                </span>
              );
            } else if (isSelected && !isThisCorrect) {
              base3D =
                'bg-red-600/95 text-white border-2 border-red-400 border-b-4 border-b-red-950 shadow-[0_0_20px_rgba(239,68,68,0.5)]';
              shakeClass = 'animate-shake';
              statusBadge = (
                <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-red-700 border border-red-300 font-bold text-white flex items-center justify-center">
                  <X className="w-4 h-4 text-white" />
                </span>
              );
            } else {
              base3D = 'bg-slate-950/60 text-slate-500 border-slate-800 opacity-40';
              statusBadge = (
                <span className="shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-900 border border-slate-800 font-bold text-slate-600 flex items-center justify-center text-xs">
                  {opt.key}
                </span>
              );
            }
          }

          return (
            <button
              key={opt.key}
              disabled={isAnswered}
              onClick={() => onSelect(opt.key)}
              className={`flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-2xl text-left transition-all duration-150 select-none cursor-pointer ${base3D} ${shakeClass}`}
            >
              {statusBadge}
              <span className="text-xs sm:text-sm font-semibold leading-snug flex-1">
                {opt.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
