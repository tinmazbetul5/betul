import React from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface HeaderProps {
  activeTab: 'arena' | 'host' | 'teacher' | 'print';
  setActiveTab: (tab: 'arena' | 'host' | 'teacher' | 'print') => void;
  timerSeconds: number;
  isTimerRunning: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  isSoundMuted: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  timerSeconds,
  isTimerRunning,
  onToggleTimer,
  onResetTimer,
  isSoundMuted,
  onToggleSound
}) => {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-4 md:px-8 py-3 transition-colors no-print">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('arena');
            }}
            className="text-lg md:text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
          >
            Cümlenin Ögeleri
          </a>
          <span className="hidden sm:inline-block text-xs font-mono text-amber-400/90 bg-amber-950/60 border border-amber-800/50 px-2 py-0.5 rounded">
            LGS 8. Sınıf
          </span>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('arena')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 px-2 rounded-md ${
              activeTab === 'arena'
                ? 'text-white font-semibold bg-slate-800/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Yarışma Arenası
          </button>
          <button
            onClick={() => setActiveTab('host')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 px-2 rounded-md ${
              activeTab === 'host'
                ? 'text-white font-semibold bg-slate-800/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sunucu & Hikaye
          </button>
          <button
            onClick={() => setActiveTab('teacher')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 px-2 rounded-md ${
              activeTab === 'teacher'
                ? 'text-white font-semibold bg-slate-800/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Öğretmen Cevap Anahtarı
          </button>
          <button
            onClick={() => setActiveTab('print')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 px-2 rounded-md ${
              activeTab === 'print'
                ? 'text-white font-semibold bg-slate-800/80 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Yazdır & Dağıt
          </button>
        </nav>

        {/* Zone 3: Primary Action / Timer & Sound */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleSound}
            title={isSoundMuted ? 'Sesi Aç' : 'Sesi Kapat'}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors"
          >
            {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
          </button>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg shadow-inner">
            <span className="font-mono text-sm sm:text-base font-semibold tracking-wider text-amber-400 tabular-nums">
              {formatTime(timerSeconds)}
            </span>
            <button
              onClick={onToggleTimer}
              title={isTimerRunning ? 'Zamanlayıcıyı Durdur' : 'Zamanlayıcıyı Başlat'}
              className="text-slate-300 hover:text-white p-1 rounded transition-colors"
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onResetTimer}
              title="Sıfırla"
              className="text-slate-400 hover:text-slate-200 p-1 rounded transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
