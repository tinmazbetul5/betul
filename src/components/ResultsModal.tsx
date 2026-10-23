import React from 'react';
import { MEB_QUESTIONS, STAGES } from '../data/gameQuestions';
import { Trophy, RotateCcw, CheckCircle2, XCircle, Award, BookOpen, FlaskConical, Rocket } from 'lucide-react';

interface ResultsModalProps {
  score: number;
  userAnswers: Record<number, { selected: string; isCorrect: boolean }>;
  onRestart: () => void;
}

export const ResultsModal: React.FC<ResultsModalProps> = ({
  score,
  userAnswers,
  onRestart,
}) => {
  const totalQuestions = MEB_QUESTIONS.length;
  const correctCount = Object.values(userAnswers).filter(a => a.isCorrect).length;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Group performance stats
  const stageStats = STAGES.map(stage => {
    const stageQuestions = MEB_QUESTIONS.filter(q => q.stageIndex === stage.index);
    const stageCorrect = stageQuestions.filter(q => userAnswers[q.id]?.isCorrect).length;
    return {
      stage,
      total: stageQuestions.length,
      correct: stageCorrect,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-slate-900 border-2 border-amber-500/50 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-auto">
        {/* Victory Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-amber-500/20 border border-amber-400/50 rounded-2xl mb-1 shadow-lg shadow-amber-500/20">
            <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            TEBRİKLER! LGS KAÇIŞ GÖREVİ TAMAMLANDI!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Unutulmuş Antik Kütüphane, Gizli Bilim Laboratuvarı ve Uzay Kontrol İstasyonu'ndaki 15 MEB çıkmış sorusunu başarıyla tamamladınız!
          </p>
        </div>

        {/* Total Score & Rating Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/70 p-4 rounded-2xl border border-slate-800 text-center">
          <div>
            <span className="text-xs text-slate-400 block font-medium">Toplam Doğru</span>
            <span className="text-2xl font-black text-emerald-400 font-mono">
              {correctCount} / {totalQuestions}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Başarı Yüzdesi</span>
            <span className="text-2xl font-black text-amber-400 font-mono">
              %{percentage}
            </span>
          </div>
          <div>
            <span className="text-xs text-slate-400 block font-medium">Kazanılan Puan</span>
            <span className="text-2xl font-black text-cyan-400 font-mono">
              {score} / 1500
            </span>
          </div>
        </div>

        {/* 3 Gruplu Mekan Başarı Tablosu */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Mekan ve Grup Bazlı Başarı Karnesi</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stageStats.map(({ stage, correct, total }) => (
              <div
                key={stage.index}
                className="bg-slate-950/60 border border-slate-800 p-3.5 rounded-xl space-y-2"
              >
                <div className="flex items-center gap-2">
                  {stage.index === 0 && <BookOpen className="w-4 h-4 text-amber-400" />}
                  {stage.index === 1 && <FlaskConical className="w-4 h-4 text-cyan-400" />}
                  {stage.index === 2 && <Rocket className="w-4 h-4 text-purple-400" />}
                  <span className="text-xs font-bold text-white">{stage.name}</span>
                </div>
                <div className="text-[11px] text-slate-400">{stage.group}</div>
                <div className="flex items-center justify-between text-xs font-bold pt-1.5 border-t border-slate-800">
                  <span className="text-slate-300">Skor:</span>
                  <span className="text-amber-400 font-mono font-extrabold">
                    {correct} / {total} Doğru
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 15 Sorunun İncelemesi */}
        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Soruların Cevap Anahtarı ve Çözümleri:
          </span>
          {MEB_QUESTIONS.map((q) => {
            const answer = userAnswers[q.id];
            const isCorrect = answer?.isCorrect;

            return (
              <div
                key={q.id}
                className="p-3 bg-slate-950/50 rounded-xl border border-slate-800/80 text-xs space-y-1"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 font-bold text-slate-200">
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                    <span>Soru {q.id}: {q.questionText}</span>
                  </div>

                  <span className="font-mono font-extrabold px-2 py-0.5 rounded bg-amber-950 border border-amber-600 text-amber-300">
                    Cevap: {q.correctAnswer}
                  </span>
                </div>

                <p className="text-slate-400 text-[11px] pl-6 leading-relaxed">
                  {q.explanation}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="flex justify-center pt-2">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-9 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl border-b-4 border-amber-700 shadow-xl shadow-amber-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Oyunu Yeniden Başlat</span>
          </button>
        </div>
      </div>
    </div>
  );
};
