import React, { useState } from 'react';
import { TEAMS_DATA } from '../data/gameData';
import { Printer, Download, CheckSquare } from 'lucide-react';

export const PrintableCardsView: React.FC = () => {
  const [includeAnswerKey, setIncludeAnswerKey] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 py-2">
      {/* Control Banner (hidden on print) */}
      <div className="no-print bg-slate-900/80 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white">Sınıf İçi Dağıtım & Yazdırma Modu (A4)</h2>
          <p className="text-xs text-slate-400 mt-1">
            Her takıma ait 5 cümle ve eşleştirme havuzunu kağıda basıp sınıfa dağıtmak veya PDF olarak kaydetmek için hazır format.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={includeAnswerKey}
              onChange={(e) => setIncludeAnswerKey(e.target.checked)}
              className="rounded bg-slate-800 border-slate-700 text-amber-500 focus:ring-0"
            />
            <span>Cevap Anahtarını da Ekle</span>
          </label>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Yazdır / PDF Kaydet</span>
          </button>
        </div>
      </div>

      {/* Printable Sheet (styled for both screen preview and print paper) */}
      <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-xl space-y-8 font-sans print:p-0 print:shadow-none print:rounded-none">
        {/* Printable Header */}
        <div className="text-center border-b-2 border-slate-900 pb-4">
          <h1 className="text-2xl font-black uppercase tracking-wider text-slate-950">
            8. Sınıf Türkçe — Cümlenin Ögeleri Kaçış Oyunu
          </h1>
          <p className="text-xs text-slate-700 mt-1 font-medium">
            Mekan Kilitlerini Çöz · 3 Takımlı Eşzamanlı Yarışma Kağıdı
          </p>
        </div>

        {/* 3 Teams Cards */}
        {TEAMS_DATA.map((team) => (
          <div
            key={team.id}
            className="border-2 border-slate-800 rounded-xl p-5 space-y-4 print-break-inside-avoid"
          >
            {/* Team Title */}
            <div className="flex items-center justify-between border-b border-slate-400 pb-2">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-tight text-slate-950">
                  {team.teamName} — Mekan: {team.arenaName}
                </h3>
                <p className="text-xs text-slate-600 italic">{team.lore}</p>
              </div>
              <div className="text-right text-xs text-slate-700">
                <span className="font-bold">Grup Üyeleri:</span> ___________________
              </div>
            </div>

            {/* Sentences with Blank Fill Areas */}
            <div className="space-y-3">
              {team.sentences.map((sentence) => (
                <div key={sentence.id} className="text-xs sm:text-sm leading-relaxed space-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <p className="flex-1">
                      <span className="font-bold mr-1">{sentence.order}.</span>
                      {sentence.fullSentence.split(sentence.highlightedText)[0]}
                      <strong className="bg-slate-200 px-1 py-0.5 rounded font-black border border-slate-400">
                        {sentence.highlightedText}
                      </strong>
                      {sentence.fullSentence.split(sentence.highlightedText)[1]}
                    </p>

                    <div className="shrink-0 border-b-2 border-slate-800 min-w-[150px] text-center text-xs pb-0.5 font-bold text-slate-700">
                      [ ........................................ ]
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shuffled Pool Box */}
            <div className="bg-slate-100 border border-slate-300 p-3 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Eşleştirme Havuzu (Seçenekler):
              </span>
              <div className="flex flex-wrap gap-2">
                {team.matchingPool.map((element, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 bg-white border border-slate-400 rounded font-semibold text-slate-900"
                  >
                    {element}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Optional Teacher Answer Key Sheet */}
        {includeAnswerKey && (
          <div className="print-page-break border-2 border-dashed border-slate-600 rounded-xl p-5 space-y-4">
            <div className="border-b-2 border-slate-900 pb-2">
              <h2 className="text-lg font-black uppercase text-slate-900">
                Hakem / Öğretmen Cevap Anahtarı (Kontrol Tablosu)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {TEAMS_DATA.map((team) => (
                <div key={team.id} className="border border-slate-300 rounded p-3 space-y-2">
                  <h4 className="font-bold text-slate-950 uppercase border-b pb-1">
                    {team.teamName} ({team.arenaName})
                  </h4>
                  <ul className="space-y-1.5">
                    {team.sentences.map((s) => (
                      <li key={s.id} className="flex items-start justify-between">
                        <span>
                          <strong>{s.order}.</strong> {s.highlightedText}
                        </span>
                        <strong className="text-slate-900 ml-2 font-mono">
                          › {s.correctElement}
                        </strong>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
