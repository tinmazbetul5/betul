import React from 'react';
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

interface SpeechBubbleProps {
  questionNumber: number;
  totalQuestions: number;
  questionText: string;
  feedbackText: string | null;
  isCorrect: boolean | null;
  stageName: string;
  groupName: string;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  questionNumber,
  totalQuestions,
  questionText,
  feedbackText,
  isCorrect,
  stageName,
  groupName,
}) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* 3D Claymorphism Speech Bubble Box */}
      <div
        className={`relative rounded-3xl p-4 sm:p-5 transition-all duration-300 shadow-[0_12px_30px_rgba(0,0,0,0.6)] backdrop-blur-md border-2 ${
          isCorrect === true
            ? 'bg-slate-900/95 border-emerald-400 shadow-emerald-500/20'
            : isCorrect === false
            ? 'bg-slate-900/95 border-red-500 shadow-red-500/20'
            : 'bg-slate-900/90 border-amber-400/60 shadow-amber-500/10'
        }`}
      >
        {/* Claymorphism Pointer Tail pointing to the orange-haired girl */}
        <div className="absolute -bottom-3 left-10 sm:left-14 w-6 h-6 bg-slate-900 border-r-2 border-b-2 border-inherit transform rotate-45" />

        {/* Header Ribbon within Bubble */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs font-black text-amber-400 bg-amber-950/80 border border-amber-700/60 px-2.5 py-0.5 rounded-full shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Soru {questionNumber} / {totalQuestions}</span>
            </span>
            <span className="text-xs font-semibold text-slate-300 hidden sm:inline-block">
              {groupName} · {stageName}
            </span>
          </div>

          <span className="text-[11px] sm:text-xs font-medium text-amber-300/90 italic">
            Rehber Aylin: "Şıkkını seç, puanı kap!"
          </span>
        </div>

        {/* Main Question Stem */}
        <div className="py-0.5">
          <h2 className="text-sm sm:text-base lg:text-lg font-bold text-white leading-relaxed text-center sm:text-left">
            {questionText}
          </h2>
        </div>

        {/* Immediate Feedback Note (Shown on answer click / timeout) */}
        {feedbackText && (
          <div
            className={`mt-2 pt-2 border-t flex items-start gap-2 text-xs sm:text-sm font-medium animate-fade-in ${
              isCorrect
                ? 'border-emerald-500/40 text-emerald-300'
                : 'border-red-500/40 text-red-300'
            }`}
          >
            {isCorrect ? (
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0 mt-0.5" />
            )}
            <div className="leading-snug">{feedbackText}</div>
          </div>
        )}
      </div>
    </div>
  );
};
