import React from 'react';
import { STAGES } from '../data/gameQuestions';
import { Volume2, VolumeX, Sparkles, BookOpen, FlaskConical, Rocket, Download } from 'lucide-react';

interface GameHUDProps {
  currentQuestionIndex: number;
  totalQuestions: number;
  score: number;
  currentStageIndex: number;
  timeLeft: number;
  isSoundMuted: boolean;
  onToggleSound: () => void;
  onSelectStage: (stageIndex: number) => void;
  onExportSingleHtml: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  currentQuestionIndex,
  totalQuestions,
  score,
  currentStageIndex,
  timeLeft,
  isSoundMuted,
  onToggleSound,
  onSelectStage,
  onExportSingleHtml,
}) => {
  const currentStage = STAGES[currentStageIndex];

  // Circular timer progress calculation (60s total)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / 60) * circumference;

  const timerStrokeColor =
    timeLeft <= 10 ? '#ef4444' : timeLeft <= 25 ? '#f59e0b' : '#06b6d4';

  return (
    <header className="relative z-20 w-full px-3 sm:px-6 py-2 bg-slate-950/85 backdrop-blur-md border-b border-slate-800 flex items-center justify-between gap-3 select-none shrink-0 shadow-lg">
      {/* Left: 3-Stage Tabs */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl border border-slate-800">
          {STAGES.map((stage) => {
            const isActive = stage.index === currentStageIndex;
            return (
              <button
                key={stage.index}
                onClick={() => onSelectStage(stage.index)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
                title={`${stage.group}: ${stage.name}`}
              >
                {stage.index === 0 && <BookOpen className="w-3.5 h-3.5" />}
                {stage.index === 1 && <FlaskConical className="w-3.5 h-3.5" />}
                {stage.index === 2 && <Rocket className="w-3.5 h-3.5" />}
                <span className="hidden md:inline">{stage.name}</span>
                <span className="md:hidden">Mekan {stage.index + 1}</span>
              </button>
            );
          })}
        </div>

        <span className="text-xs text-slate-400 hidden lg:inline-block border-l border-slate-800 pl-3 font-medium">
          {currentStage.group}
        </span>
      </div>

      {/* Center: Dairesel 60 Saniyelik Sayaç & Soru Numarası */}
      <div className="flex items-center gap-3 sm:gap-5">
        {/* Dairesel 60s SVG Sayaç */}
        <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Track Circle */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="#1e293b"
              strokeWidth="3.5"
              fill="transparent"
            />
            {/* Animated Countdown Progress Ring */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke={timerStrokeColor}
              strokeWidth="3.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-linear"
            />
          </svg>
          {/* Seconds text in center */}
          <span
            className="absolute font-mono font-black text-xs sm:text-sm tabular-nums"
            style={{ color: timerStrokeColor }}
          >
            {timeLeft}
          </span>
        </div>

        {/* Question Counter Pill */}
        <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-amber-400 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800 shadow-inner">
          <span>Soru {currentQuestionIndex + 1} / {totalQuestions}</span>
        </div>
      </div>

      {/* Right: Score, Download HTML & Sound */}
      <div className="flex items-center gap-2">
        {/* Download Standalone HTML Button */}
        <button
          onClick={onExportSingleHtml}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-semibold transition-colors"
          title="Çevrimdışı çalıştırmak için Tek Dosya HTML Olarak İndir"
        >
          <Download className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline">HTML İndir</span>
        </button>

        {/* Score pill */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-amber-500/40 px-2.5 py-1 rounded-xl shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-mono text-xs text-slate-400 hidden xs:inline">Puan:</span>
          <span className="font-mono text-xs sm:text-sm font-bold text-amber-400 tabular-nums">
            {score}
          </span>
        </div>

        {/* Sound toggle */}
        <button
          onClick={onToggleSound}
          className="p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          title={isSoundMuted ? 'Sesi Aç' : 'Sesi Kapat'}
        >
          {isSoundMuted ? (
            <VolumeX className="w-4 h-4 text-red-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-amber-400" />
          )}
        </button>
      </div>
    </header>
  );
};
