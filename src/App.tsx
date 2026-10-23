import React, { useState, useEffect, useRef } from 'react';
import { MEB_QUESTIONS, STAGES } from './data/gameQuestions';
import { StageBackground } from './components/StageBackground';
import { OrangeHairGirl, CharacterMood } from './components/OrangeHairGirl';
import { SpeechBubble } from './components/SpeechBubble';
import { ElementButtons } from './components/ElementButtons';
import { GameHUD } from './components/GameHUD';
import { ResultsModal } from './components/ResultsModal';
import { InteractiveObjectPrompt } from './components/InteractiveObjectPrompt';
import { soundEffects } from './utils/soundEffects';
import { exportSingleHtmlFile } from './utils/exportSingleHtml';

export default function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [characterMood, setCharacterMood] = useState<CharacterMood>('neutral');
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [userAnswers, setUserAnswers] = useState<
    Record<number, { selected: string; isCorrect: boolean }>
  >({});

  // Stage discovery interactive gate: Wait for player to touch the book / lens / globe before questions start
  const [isWaitingForObjectClick, setIsWaitingForObjectClick] = useState<boolean>(true);

  // 3D Parallax Mouse Tracking (-1 to 1)
  const [parallax, setParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const currentQuestion = MEB_QUESTIONS[currentQuestionIndex];
  const currentStage = STAGES[currentQuestion.stageIndex];

  // High precision timer with Date.now()
  const startTimeRef = useRef<number>(Date.now());
  const autoNextTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mouse move handler for 3D depth parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;
    setParallax({ x, y });
  };

  // Reset question state & restart 60-second countdown when question changes
  useEffect(() => {
    setSelectedKey(null);
    setIsAnswered(false);
    setFeedbackText(null);
    setIsCorrect(null);
    setCharacterMood('neutral');

    if (!isWaitingForObjectClick) {
      startTimeRef.current = Date.now();
      setTimeLeft(60);
    }

    if (autoNextTimeoutRef.current) {
      clearTimeout(autoNextTimeoutRef.current);
      autoNextTimeoutRef.current = null;
    }
  }, [currentQuestionIndex, isWaitingForObjectClick]);

  // High-precision Date.now() based 60s timer
  useEffect(() => {
    if (isAnswered || showResults || isWaitingForObjectClick) return;

    startTimeRef.current = Date.now();
    setTimeLeft(60);

    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      const remaining = Math.max(0, 60 - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(timer);
        handleTimeOut();
      }
    }, 250);

    return () => clearInterval(timer);
  }, [isAnswered, showResults, isWaitingForObjectClick, currentQuestionIndex]);

  // When player clicks the interactive object (Book, Lens, Globe)
  const handleUnlockStage = () => {
    setIsWaitingForObjectClick(false);
    startTimeRef.current = Date.now();
    setTimeLeft(60);
  };

  // Trigger when 60 seconds run out
  const handleTimeOut = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setIsCorrect(false);
    setCharacterMood('whistle'); // Puffed cheeks with referee whistle

    if (!isSoundMuted) {
      soundEffects.whistle(); // Keskin hakem düdüğü
    }

    setFeedbackText("Süre doldu!");

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selected: 'Süre Doldu',
        isCorrect: false,
      },
    }));

    // Otomatik 2 saniye sonra bir sonraki soruya geçiş
    autoNextTimeoutRef.current = setTimeout(() => {
      advanceNextQuestion();
    }, 2000);
  };

  // Handle choice selection (A, B, C, D)
  const handleSelectChoice = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered || isWaitingForObjectClick) return;

    setSelectedKey(key);
    setIsAnswered(true);

    const correct = key === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      if (!isSoundMuted) soundEffects.correct(); // Neşeli tiz "yeee"
      setScore((prev) => prev + 100);
      setCharacterMood('happy');
      setFeedbackText("Harika, doğru cevap!");

      // Otomatik 2.0 saniye sonra kesintisiz sonraki soruya geçiş
      autoNextTimeoutRef.current = setTimeout(() => {
        advanceNextQuestion();
      }, 2000);
    } else {
      if (!isSoundMuted) {
        soundEffects.wrong(); // Kalın "donk"
        setTimeout(() => soundEffects.whistle(), 120); // Hakem düdüğü
      }
      setCharacterMood('wrong'); // 2. ve 3. görseller ile hakem düdüğü animasyonu
      setFeedbackText("Bu kez olmadı, sıradaki soruda yeniden dene!");

      // Otomatik 2.0 saniye sonra kesintisiz sonraki soruya geçiş
      autoNextTimeoutRef.current = setTimeout(() => {
        advanceNextQuestion();
      }, 2000);
    }

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selected: key,
        isCorrect: correct,
      },
    }));
  };

  // Advance to next question or trigger next world discovery gate
  const advanceNextQuestion = () => {
    if (currentQuestionIndex + 1 < MEB_QUESTIONS.length) {
      const nextQ = MEB_QUESTIONS[currentQuestionIndex + 1];
      const isEnteringNewStage = nextQ.stageIndex !== currentQuestion.stageIndex;

      if (isEnteringNewStage) {
        // Close question card, wait for player to touch the new world object
        setIsWaitingForObjectClick(true);
      }
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      if (!isSoundMuted) soundEffects.fanfare();
      setCharacterMood('celebrating');
      setShowResults(true);
    }
  };

  // Jump to specific stage
  const handleSelectStage = (stageIdx: number) => {
    if (!isSoundMuted) soundEffects.click();
    const firstQ = MEB_QUESTIONS.findIndex((q) => q.stageIndex === stageIdx);
    if (firstQ !== -1) {
      setIsWaitingForObjectClick(true);
      setCurrentQuestionIndex(firstQ);
    }
  };

  // Restart game
  const handleRestart = () => {
    if (!isSoundMuted) soundEffects.click();
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedKey(null);
    setIsAnswered(false);
    setFeedbackText(null);
    setIsCorrect(null);
    setCharacterMood('neutral');
    setUserAnswers({});
    setIsWaitingForObjectClick(true);
    setShowResults(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative w-screen h-screen overflow-hidden select-none bg-slate-950 text-slate-100 flex flex-col justify-between font-sans perspective-[1200px]"
    >
      {/* 1. Dynamic 3D Parallax Stage Backdrop */}
      <StageBackground
        theme={currentStage.theme}
        stageIndex={currentQuestion.stageIndex}
        parallaxX={parallax.x}
        parallaxY={parallax.y}
        isAnswering={!isWaitingForObjectClick}
      />

      {/* 2. Top Game HUD Bar with 60s Circular Countdown */}
      <GameHUD
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={MEB_QUESTIONS.length}
        score={score}
        currentStageIndex={currentQuestion.stageIndex}
        timeLeft={timeLeft}
        isSoundMuted={isSoundMuted}
        onToggleSound={() => setIsSoundMuted(!isSoundMuted)}
        onSelectStage={handleSelectStage}
        onExportSingleHtml={exportSingleHtmlFile}
      />

      {/* 3. Interactive World Discovery Prompt (Shown when entering a new stage) */}
      {isWaitingForObjectClick && (
        <InteractiveObjectPrompt
          stageIndex={currentQuestion.stageIndex}
          onUnlockStage={handleUnlockStage}
          isSoundMuted={isSoundMuted}
        />
      )}

      {/* 4. Center Stage: 3D Claymorphism Character & Speech Bubble (Active during questioning) */}
      {!isWaitingForObjectClick && (
        <main
          className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center gap-2 sm:gap-3 transition-transform duration-200 ease-out"
          style={{
            transform: `perspective(1000px) rotateY(${parallax.x * 2}deg) rotateX(${-parallax.y * 2}deg)`,
          }}
        >
          {/* 3D Speech Bubble with Question Stem & Auto Feedback */}
          <SpeechBubble
            questionNumber={currentQuestion.id}
            totalQuestions={MEB_QUESTIONS.length}
            questionText={currentQuestion.questionText}
            feedbackText={feedbackText}
            isCorrect={isCorrect}
            stageName={currentStage.name}
            groupName={currentStage.group}
          />

          {/* 3D Character Illustration (Whistle animations on wrong/timeout) */}
          <div className="flex items-center justify-center -mt-1 sm:-mt-2">
            <OrangeHairGirl mood={characterMood} />
          </div>
        </main>
      )}

      {/* 5. Bottom Controls: 4 Options (A, B, C, D) Always Visible & Unclipped */}
      {!isWaitingForObjectClick && (
        <footer className="relative z-10 w-full px-3 sm:px-6 pb-3 sm:pb-4">
          <ElementButtons
            options={currentQuestion.options}
            selectedKey={selectedKey}
            correctAnswer={currentQuestion.correctAnswer}
            isAnswered={isAnswered}
            onSelect={handleSelectChoice}
          />
        </footer>
      )}

      {/* 6. Results Modal when 15 questions complete */}
      {showResults && (
        <ResultsModal
          score={score}
          userAnswers={userAnswers}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}
