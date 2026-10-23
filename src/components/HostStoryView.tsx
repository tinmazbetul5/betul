import React, { useState } from 'react';
import { HOST_INTRO, TEAMS_DATA } from '../data/gameData';
import { soundEffects } from '../utils/soundEffects';
import { Volume2, VolumeX, ShieldAlert, Sparkles, Users, Award, BookOpen, FlaskConical, KeyRound } from 'lucide-react';

interface HostStoryViewProps {
  onStartGame: () => void;
  isSoundMuted: boolean;
}

export const HostStoryView: React.FC<HostStoryViewProps> = ({ onStartGame, isSoundMuted }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Web Speech API Turkish voice read-out
  const handleToggleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(HOST_INTRO.speech);
    utterance.lang = 'tr-TR';
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    // Pick Turkish voice if available
    const voices = window.speechSynthesis.getVoices();
    const trVoice = voices.find(v => v.lang.includes('tr'));
    if (trVoice) {
      utterance.voice = trVoice;
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-2">
      {/* Hero Host Announcement Card */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 p-6 md:p-10 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Canlı Sınıf İçi Kaçış Oyunu Modu</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
              {HOST_INTRO.title}
            </h1>
            <p className="text-sm md:text-base text-slate-400 mt-1">
              {HOST_INTRO.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {'speechSynthesis' in (typeof window !== 'undefined' ? window : {}) && (
              <button
                onClick={handleToggleSpeak}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition-colors"
              >
                {isSpeaking ? (
                  <>
                    <VolumeX className="w-4 h-4 text-red-400" />
                    <span>Seslendirmeyi Durdur</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-amber-400" />
                    <span>Sesli Dinle (Türkçe)</span>
                  </>
                )}
              </button>
            )}

            <button
              onClick={() => {
                if (!isSoundMuted) soundEffects.click();
                onStartGame();
              }}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              Yarışmayı Başlat!
            </button>
          </div>
        </div>

        {/* Narrative Speech Text for the Host / Teacher */}
        <div className="mt-6 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-6 relative">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>SUNUCU & ÖĞRETMEN AÇILIŞ METNİ (Sesli Okunacak)</span>
          </div>

          <blockquote className="text-slate-200 text-sm md:text-base leading-relaxed whitespace-pre-line font-medium italic">
            {HOST_INTRO.speech}
          </blockquote>
        </div>

        {/* Rules Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Oyun Kuralları & Dinamikler</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {HOST_INTRO.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold">›</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950/40 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 mb-2">
              <Users className="w-4 h-4" />
              <span>Karakter Kadrosu (8 Kahraman)</span>
            </div>
            <p className="text-xs text-slate-300 mb-2">
              Cümlelerdeki tüm olaylar ve eylemler şu 8 sınıf arkadaşı etrafında dönüyor:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Hun", "Can", "Samed", "Mustafa", "Ece", "Nur", "Doruk", "Elif"].map((name, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-md bg-slate-800/80 text-white font-medium border border-slate-700"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3 Arena Overviews */}
      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Yarışma Mekanları ve Takım Dağılımı</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEAMS_DATA.map(team => (
            <div
              key={team.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div className="h-40 relative">
                <img
                  src={team.imagePath}
                  alt={team.arenaName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover brightness-[0.75]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  {team.teamNumber === 1 && <BookOpen className="w-4 h-4 text-amber-400" />}
                  {team.teamNumber === 2 && <FlaskConical className="w-4 h-4 text-cyan-400" />}
                  {team.teamNumber === 3 && <KeyRound className="w-4 h-4 text-emerald-400" />}
                  <h3 className="font-bold text-white text-base">{team.arenaName}</h3>
                </div>
              </div>

              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-semibold text-amber-400">{team.teamName}</span>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{team.lore}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>5 Şifreli Cümle</span>
                  <span>5 Ögeli Havuz</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
