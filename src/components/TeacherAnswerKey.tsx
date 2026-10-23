import React, { useState } from 'react';
import { TEAMS_DATA, ElementType } from '../data/gameData';
import { CheckCheck, Copy, Check, Eye, EyeOff, Filter, BookOpen, FlaskConical, KeyRound } from 'lucide-react';

export const TeacherAnswerKey: React.FC = () => {
  const [filterElement, setFilterElement] = useState<string>('all');
  const [showAllExplanations, setShowAllExplanations] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  // Filter elements list
  const uniqueElements: ElementType[] = [
    'Yüklem',
    'Gerçek Özne',
    'Belirtili Nesne',
    'Belirtisiz Nesne',
    'Dolaylı Tümleç',
    'Zarf Tümleci',
    'Ara Söz'
  ];

  // Copy full structured answer key text
  const handleCopyKey = () => {
    let text = `CÜMLENİN ÖGELERİ YARIŞMASI - ÖĞRETMEN HAKEM CEVAP ANAHTARI\n============================================================\n\n`;

    TEAMS_DATA.forEach(team => {
      text += `--- ${team.teamName.toUpperCase()} (${team.arenaName.toUpperCase()}) ---\n`;
      text += `Eşleştirme Havuzu: ${team.matchingPool.join(' · ')}\n\n`;

      team.sentences.forEach(s => {
        text += `Cümle ${s.order}: ${s.fullSentence}\n`;
        text += `  • Vurgulanan Kısım: "${s.highlightedText}"\n`;
        text += `  • Doğru Öge: ${s.correctElement}\n`;
        text += `  • Buldurucu Soru: ${s.questionToFind}\n`;
        text += `  • Gramer Açıklaması: ${s.explanation}\n\n`;
      });
      text += `\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTeamIcon = (teamNum: number) => {
    switch (teamNum) {
      case 1:
        return <BookOpen className="w-4 h-4 text-amber-400" />;
      case 2:
        return <FlaskConical className="w-4 h-4 text-cyan-400" />;
      case 3:
        return <KeyRound className="w-4 h-4 text-emerald-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 py-2">
      {/* Top Banner & Control Bar */}
      <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-1">
            <CheckCheck className="w-4 h-4" />
            <span>HAKEM & ÖĞRETMEN KONTROL MASASI</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white">Öğretmen Cevap Anahtarı (15 Cümlenin Analizi)</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Tüm takımların cümleleri, sorulan soruları, doğru ögeleri ve LGS müfredat gerekçeleri.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowAllExplanations(!showAllExplanations)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition-colors"
          >
            {showAllExplanations ? (
              <>
                <EyeOff className="w-3.5 h-3.5" />
                <span>Açıklamaları Daralt</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Açıklamaları Genişlet</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopyKey}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg transition-colors shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Metin Olarak Kopyala</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="flex items-center gap-1 text-slate-400 shrink-0 font-medium">
          <Filter className="w-3.5 h-3.5" /> Öge Filtresi:
        </span>
        <button
          onClick={() => setFilterElement('all')}
          className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
            filterElement === 'all'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
          }`}
        >
          Tüm Ögeler (15)
        </button>
        {uniqueElements.map((el, i) => (
          <button
            key={i}
            onClick={() => setFilterElement(el)}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              filterElement === el
                ? 'bg-amber-500 text-slate-950 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {el}
          </button>
        ))}
      </div>

      {/* Team by Team Breakdown Cards */}
      <div className="space-y-6">
        {TEAMS_DATA.map(team => {
          const visibleSentences = team.sentences.filter(
            s => filterElement === 'all' || s.correctElement === filterElement
          );

          if (visibleSentences.length === 0) return null;

          return (
            <div
              key={team.id}
              className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-lg"
            >
              {/* Team Section Header */}
              <div className="px-6 py-4 bg-slate-950/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  {getTeamIcon(team.teamNumber)}
                  <h3 className="font-bold text-white text-base">
                    {team.teamName} — <span className="text-amber-400">{team.arenaName}</span>
                  </h3>
                </div>
                <div className="text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Eşleştirme Havuzu: </span>
                  {team.matchingPool.join(' · ')}
                </div>
              </div>

              {/* Sentences Table / List */}
              <div className="divide-y divide-slate-800/80">
                {visibleSentences.map(sentence => (
                  <div key={sentence.id} className="p-5 hover:bg-slate-800/30 transition-colors space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/70 border border-amber-800/60 px-2 py-0.5 rounded">
                          Cümle {sentence.order}
                        </span>
                        <span className="text-xs text-slate-400">
                          Karakterler: <span className="text-slate-200">{sentence.charactersInvolved.join(', ')}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">Doğru Öge:</span>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-600/50">
                          {sentence.correctElement}
                        </span>
                      </div>
                    </div>

                    {/* Sentence with highlight */}
                    <p className="text-sm text-slate-200 leading-relaxed font-normal">
                      {sentence.fullSentence.split(sentence.highlightedText)[0]}
                      <span className="font-extrabold text-amber-400 bg-amber-950/70 px-1 py-0.5 rounded border border-amber-600/40">
                        {sentence.highlightedText}
                      </span>
                      {sentence.fullSentence.split(sentence.highlightedText)[1]}
                    </p>

                    {/* Question and Pedagogical Justification */}
                    {showAllExplanations && (
                      <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-950/40 p-3 rounded-lg border border-slate-800/60">
                        <div>
                          <span className="font-semibold text-slate-300 block mb-0.5">Buldurucu Soru:</span>
                          <span className="text-amber-300/90 font-mono">{sentence.questionToFind}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-300 block mb-0.5">LGS Gramer İzahı:</span>
                          <span className="text-slate-300">{sentence.explanation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
