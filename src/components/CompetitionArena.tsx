import React, { useState } from 'react';
import { TEAMS_DATA, TeamArena, ElementType, GRAMMAR_HINTS } from '../data/gameData';
import { soundEffects } from '../utils/soundEffects';
import {
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  Trophy,
  HelpCircle,
  Sparkles,
  BookOpen,
  FlaskConical,
  KeyRound,
  RotateCcw
} from 'lucide-react';

interface CompetitionArenaProps {
  isSoundMuted: boolean;
}

export const CompetitionArena: React.FC<CompetitionArenaProps> = ({ isSoundMuted }) => {
  // View mode: 'split' (all 3 teams side-by-side) or team id ('team-1', 'team-2', 'team-3')
  const [selectedView, setSelectedView] = useState<'split' | 'team-1' | 'team-2' | 'team-3'>('split');
  // Team answers state: { [teamId]: { [sentenceId]: selectedElement } }
  const [answers, setAnswers] = useState<Record<string, Record<string, ElementType | ''>>>({
    'team-1': {},
    'team-2': {},
    'team-3': {}
  });

  // Submitted / verified state: { [teamId]: boolean }
  const [teamResults, setTeamResults] = useState<Record<string, { submitted: boolean; score: number; completed: boolean }>>({
    'team-1': { submitted: false, score: 0, completed: false },
    'team-2': { submitted: false, score: 0, completed: false },
    'team-3': { submitted: false, score: 0, completed: false }
  });

  // Modal for grammar hints
  const [showHintsModal, setShowHintsModal] = useState(false);

  // Handle element selection
  const handleSelectElement = (teamId: string, sentenceId: string, element: ElementType) => {
    if (!isSoundMuted) soundEffects.click();
    setAnswers(prev => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        [sentenceId]: element
      }
    }));
  };

  // Verify a team's answers
  const handleVerifyTeam = (team: TeamArena) => {
    const teamAnswers = answers[team.id] || {};
    let correctCount = 0;

    team.sentences.forEach(s => {
      if (teamAnswers[s.id] === s.correctElement) {
        correctCount += 1;
      }
    });

    const isCompleted = correctCount === team.sentences.length;

    setTeamResults(prev => ({
      ...prev,
      [team.id]: {
        submitted: true,
        score: correctCount,
        completed: isCompleted
      }
    }));

    if (!isSoundMuted) {
      if (isCompleted) {
        soundEffects.unlock();
        setTimeout(() => soundEffects.fanfare(), 300);
      } else if (correctCount > 0) {
        soundEffects.correct();
      } else {
        soundEffects.wrong();
      }
    }
  };

  // Reset a team's answers
  const handleResetTeam = (teamId: string) => {
    if (!isSoundMuted) soundEffects.click();
    setAnswers(prev => ({
      ...prev,
      [teamId]: {}
    }));
    setTeamResults(prev => ({
      ...prev,
      [teamId]: { submitted: false, score: 0, completed: false }
    }));
  };

  // Render Arena Icon
  const getArenaIcon = (teamNum: number) => {
    switch (teamNum) {
      case 1:
        return <BookOpen className="w-5 h-5 text-amber-400" />;
      case 2:
        return <FlaskConical className="w-5 h-5 text-cyan-400" />;
      case 3:
        return <KeyRound className="w-5 h-5 text-emerald-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* View Switcher & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800/80">
          <button
            onClick={() => {
              if (!isSoundMuted) soundEffects.click();
              setSelectedView('split');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedView === 'split'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Eşzamanlı 3 Takım Görünümü
          </button>
          <button
            onClick={() => {
              if (!isSoundMuted) soundEffects.click();
              setSelectedView('team-1');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedView === 'team-1'
                ? 'bg-amber-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Takım (Kütüphane)
          </button>
          <button
            onClick={() => {
              if (!isSoundMuted) soundEffects.click();
              setSelectedView('team-2');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedView === 'team-2'
                ? 'bg-cyan-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Takım (Laboratuvar)
          </button>
          <button
            onClick={() => {
              if (!isSoundMuted) soundEffects.click();
              setSelectedView('team-3');
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
              selectedView === 'team-3'
                ? 'bg-emerald-500 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Takım (Mahzen)
          </button>
        </div>

        <button
          onClick={() => {
            if (!isSoundMuted) soundEffects.click();
            setShowHintsModal(true);
          }}
          className="flex items-center justify-center gap-2 text-xs font-medium text-amber-300 hover:text-amber-200 bg-amber-950/40 hover:bg-amber-950/70 border border-amber-800/60 px-3 py-2 rounded-lg transition-colors shrink-0"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Öge Buldurucu Sorular Rehberi</span>
        </button>
      </div>

      {/* Main Display: Split Grid OR Focused View */}
      {selectedView === 'split' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {TEAMS_DATA.map(team => (
            <TeamArenaCard
              key={team.id}
              team={team}
              answers={answers[team.id] || {}}
              result={teamResults[team.id]}
              onSelectElement={handleSelectElement}
              onVerify={() => handleVerifyTeam(team)}
              onReset={() => handleResetTeam(team.id)}
              getArenaIcon={getArenaIcon}
              compact={true}
              onFocus={() => setSelectedView(team.id as 'team-1' | 'team-2' | 'team-3')}
            />
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {TEAMS_DATA.filter(t => t.id === selectedView).map(team => (
            <TeamArenaCard
              key={team.id}
              team={team}
              answers={answers[team.id] || {}}
              result={teamResults[team.id]}
              onSelectElement={handleSelectElement}
              onVerify={() => handleVerifyTeam(team)}
              onReset={() => handleResetTeam(team.id)}
              getArenaIcon={getArenaIcon}
              compact={false}
              onFocus={() => setSelectedView('split')}
            />
          ))}
        </div>
      )}

      {/* Grammar Questions / Cheat Sheet Modal */}
      {showHintsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Cümlenin Ögelerini Buldurucu Sorular</h3>
              </div>
              <button
                onClick={() => setShowHintsModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Cümlenin ögeleri bulunurken ilk adım her zaman <strong className="text-amber-400">Yüklemi</strong> tespit etmektir. Ardından tüm sorular doğrudan yükleme yöneltilir:
            </p>

            <div className="space-y-3 pt-1">
              {GRAMMAR_HINTS.map((hint, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 p-3 rounded-lg space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-amber-300">{hint.element}</span>
                    <span className="text-xs font-mono text-slate-400">{hint.sampleQuestion}</span>
                  </div>
                  <p className="text-xs text-slate-400">{hint.description}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setShowHintsModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium rounded-lg transition-colors"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Internal Sub-component for an Arena Card
interface TeamArenaCardProps {
  team: TeamArena;
  answers: Record<string, ElementType | ''>;
  result: { submitted: boolean; score: number; completed: boolean };
  onSelectElement: (teamId: string, sentenceId: string, element: ElementType) => void;
  onVerify: () => void;
  onReset: () => void;
  getArenaIcon: (teamNum: number) => React.ReactNode;
  compact: boolean;
  onFocus: () => void;
}

const TeamArenaCard: React.FC<TeamArenaCardProps> = ({
  team,
  answers,
  result,
  onSelectElement,
  onVerify,
  onReset,
  getArenaIcon,
  compact,
  onFocus
}) => {
  const answeredCount = team.sentences.filter(s => answers[s.id]).length;
  const isAllAnswered = answeredCount === team.sentences.length;

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border transition-all ${
        result.completed
          ? 'border-emerald-500/70 shadow-lg shadow-emerald-950/30 bg-slate-900/90'
          : 'border-slate-800 bg-slate-900/70 hover:border-slate-700'
      }`}
    >
      {/* Arena Banner Header with Background Image Scrim */}
      <div className="relative h-44 sm:h-52 w-full overflow-hidden">
        <img
          src={team.imagePath}
          alt={team.arenaName}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover brightness-[0.7] contrast-[1.1] transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-lg border border-slate-700/60">
            {getArenaIcon(team.teamNumber)}
            <span className="text-xs font-bold text-white tracking-wide">{team.teamName}</span>
          </div>

          <button
            onClick={onFocus}
            className="text-[11px] font-medium bg-slate-950/80 hover:bg-slate-800 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700/60 transition-colors"
          >
            {compact ? 'Odaklan' : 'Bölünmüş Görünüm'}
          </button>
        </div>

        {/* Bottom Arena Title & Lore */}
        <div className="absolute bottom-3 left-3 right-3">
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>{team.arenaName}</span>
            {result.completed ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                <Unlock className="w-3 h-3" /> ŞİFRE ÇÖZÜLDÜ!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-amber-400/90 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                <Lock className="w-3 h-3" /> KİLİTLİ
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-300/90 line-clamp-1 mt-0.5">{team.lore}</p>
        </div>
      </div>

      {/* Progress & Matching Pool Section */}
      <div className="p-4 space-y-4">
        {/* Shuffled Matching Pool Bar */}
        <div className="bg-slate-950/80 border border-slate-800 p-3 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-300">Eşleştirme Havuzu (5 Seçenek)</span>
            <span className="text-[11px] text-slate-400">Karışık Verilmiştir</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {team.matchingPool.map((element, idx) => {
              const isUsed = Object.values(answers).includes(element);
              return (
                <span
                  key={idx}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium border transition-colors ${
                    isUsed
                      ? 'bg-slate-800/80 text-slate-400 border-slate-700 line-through opacity-70'
                      : 'bg-slate-900 text-amber-300 border-amber-600/40 shadow-xs'
                  }`}
                >
                  {element}
                </span>
              );
            })}
          </div>
        </div>

        {/* Progress status */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>İlerleme: {answeredCount} / {team.sentences.length} Eşleştirildi</span>
          {result.submitted && (
            <span className={`font-semibold ${result.completed ? 'text-emerald-400' : 'text-amber-400'}`}>
              Sonuç: {result.score} / {team.sentences.length} Doğru
            </span>
          )}
        </div>

        {/* 5 Sentences List */}
        <div className="space-y-3">
          {team.sentences.map(sentence => {
            const currentSelected = answers[sentence.id] || '';
            const isCorrect = result.submitted && currentSelected === sentence.correctElement;
            const isWrong = result.submitted && currentSelected && currentSelected !== sentence.correctElement;

            return (
              <div
                key={sentence.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isCorrect
                    ? 'bg-emerald-950/20 border-emerald-600/50'
                    : isWrong
                    ? 'bg-red-950/20 border-red-600/50'
                    : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Sentence Header & Number */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/70 px-1.5 py-0.5 rounded">
                      #{sentence.order}
                    </span>
                    <span className="text-[11px] text-slate-400">Karakter: {sentence.charactersInvolved.join(', ')}</span>
                  </div>

                  {result.submitted && (
                    <div>
                      {isCorrect ? (
                        <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Doğru
                        </span>
                      ) : isWrong ? (
                        <span className="flex items-center gap-1 text-[11px] text-red-400 font-medium">
                          <XCircle className="w-3.5 h-3.5" /> Yanlış
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400">Boş</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Sentence Text with Highlighted Element */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {renderSentenceWithHighlight(sentence.fullSentence, sentence.highlightedText)}
                </p>

                {/* Element Selection Controls */}
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-400">Vurgulanan öge:</span>
                  <select
                    value={currentSelected}
                    onChange={(e) => onSelectElement(team.id, sentence.id, e.target.value as ElementType)}
                    className="bg-slate-900 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500 transition-colors"
                  >
                    <option value="">Seçiniz (Havuzdan)...</option>
                    {team.matchingPool.map((elementOpt, i) => (
                      <option key={i} value={elementOpt}>
                        {elementOpt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Feedback Explanation (shown after submission) */}
                {result.submitted && (
                  <div className="mt-2.5 pt-2 border-t border-slate-800/60 text-xs">
                    <p className="text-slate-400">
                      <strong className="text-slate-300">Soru:</strong> {sentence.questionToFind}
                    </p>
                    <p className={`mt-0.5 ${isCorrect ? 'text-emerald-300/90' : 'text-slate-400'}`}>
                      <strong className="text-slate-300">Doğru Öge:</strong> {sentence.correctElement} — {sentence.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Team Actions & Result Bar */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Temizle</span>
          </button>

          <button
            onClick={onVerify}
            disabled={!isAllAnswered}
            className={`flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-md ${
              isAllAnswered
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 cursor-pointer shadow-amber-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
            }`}
          >
            <KeyRound className="w-4 h-4" />
            <span>Şifreyi Doğrula & Kilidi Aç</span>
          </button>
        </div>

        {/* Victory Banner if Completed */}
        {result.completed && (
          <div className="bg-emerald-950/80 border border-emerald-500/60 p-4 rounded-xl flex items-center gap-3 text-emerald-200 animate-bounce-subtle">
            <Trophy className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <h4 className="font-extrabold text-sm text-white">TEBRİKLER! TÜM ŞİFRELER ÇÖZÜLDÜ!</h4>
              <p className="text-xs text-emerald-300/90 mt-0.5">
                {team.teamName}, {team.arenaName} kapısını başarıyla açtı ve kurtuldu!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper to render sentence with highlighted uppercase element
function renderSentenceWithHighlight(fullSentence: string, highlightedText: string) {
  const parts = fullSentence.split(highlightedText);
  if (parts.length === 1) {
    return <span>{fullSentence}</span>;
  }
  return (
    <>
      <span>{parts[0]}</span>
      <span className="font-extrabold text-amber-400 bg-amber-950/70 border-b-2 border-amber-400 px-1 py-0.5 rounded tracking-wide shadow-sm">
        {highlightedText}
      </span>
      <span>{parts.slice(1).join(highlightedText)}</span>
    </>
  );
}
