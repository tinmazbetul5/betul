import { MEB_QUESTIONS } from '../data/gameQuestions';

export function exportSingleHtmlFile() {
  const questionsJson = JSON.stringify(MEB_QUESTIONS);

  const htmlContent = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cümlenin Ögeleri - 3D LGS Kaçış Odası</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; user-select: none; }
    body {
      background: #020617;
      color: #f8fafc;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      perspective: 1200px;
    }
    .vignette {
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: radial-gradient(ellipse at center, transparent 40%, rgba(2,6,23,0.55) 75%, rgba(2,6,23,0.92) 100%);
      z-index: 5;
    }
    .hud {
      position: relative;
      z-index: 20;
      background: rgba(2,6,23,0.88);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid #1e293b;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .stage-badge {
      background: #f59e0b;
      color: #020617;
      font-weight: 800;
      padding: 5px 12px;
      border-radius: 10px;
      font-size: 13px;
    }
    .score-badge {
      background: #0f172a;
      border: 1px solid rgba(245, 158, 11, 0.5);
      color: #f59e0b;
      font-weight: 800;
      font-family: monospace;
      padding: 6px 14px;
      border-radius: 12px;
      font-size: 14px;
    }
    .timer-ring-wrap {
      position: relative;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .timer-ring-wrap svg {
      transform: rotate(-90deg);
      width: 100%;
      height: 100%;
    }
    .timer-text {
      position: absolute;
      font-family: monospace;
      font-weight: 900;
      font-size: 13px;
      color: #06b6d4;
    }
    .bg-layer {
      position: absolute;
      inset: -40px;
      background-size: cover;
      background-position: center;
      transition: all 0.6s ease-out;
      z-index: 1;
    }
    .particles-layer {
      position: absolute;
      inset: -40px;
      pointer-events: none;
      z-index: 2;
      transition: transform 0.15s ease-out;
    }
    .center-stage {
      position: relative;
      z-index: 10;
      max-width: 860px;
      margin: 0 auto;
      padding: 5px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      transition: transform 0.15s ease-out;
    }
    .speech-bubble {
      background: rgba(15, 23, 42, 0.95);
      border: 2px solid #f59e0b;
      border-radius: 22px;
      padding: 16px 22px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
      width: 100%;
      text-align: left;
      position: relative;
    }
    .speech-bubble::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 60px;
      width: 24px;
      height: 24px;
      background: #0f172a;
      border-right: 2px solid #f59e0b;
      border-bottom: 2px solid #f59e0b;
      transform: rotate(45deg);
    }
    .character-wrap {
      width: 160px;
      height: 180px;
      margin-top: -6px;
      position: relative;
    }
    .character-wrap img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      filter: drop-shadow(0 10px 20px rgba(0,0,0,0.6));
    }
    .buttons-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      width: 100%;
      max-width: 860px;
      margin: 0 auto;
      padding: 0 20px 16px 20px;
      z-index: 20;
    }
    .btn-3d {
      background: #0f172a;
      color: #f8fafc;
      border: 2px solid #334155;
      border-bottom: 4px solid #020617;
      padding: 11px 14px;
      border-radius: 14px;
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      text-align: left;
      transition: all 0.1s;
    }
    .btn-3d:hover {
      border-color: #f59e0b;
      box-shadow: 0 0 15px rgba(245, 158, 11, 0.3);
    }
    .btn-3d:active {
      transform: translateY(2px);
      border-bottom-width: 2px;
    }
    .opt-key {
      background: #1e293b;
      color: #f59e0b;
      font-weight: 900;
      width: 28px;
      height: 28px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .btn-correct {
      background: #10b981 !important;
      border-color: #34d399 !important;
      border-bottom-color: #065f46 !important;
      color: white !important;
      box-shadow: 0 0 20px rgba(16, 185, 129, 0.6) !important;
    }
    .btn-correct .opt-key { background: #059669; color: white; }
    .btn-wrong {
      background: #ef4444 !important;
      border-color: #f87171 !important;
      border-bottom-color: #7f1d1d !important;
      color: white !important;
      animation: shake 0.4s ease-in-out;
    }
    .btn-wrong .opt-key { background: #b91c1c; color: white; }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-8px); }
      40%, 80% { transform: translateX(8px); }
    }
    .feedback-note {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 600;
      border-top: 1px solid rgba(255,255,255,0.1);
      padding-top: 6px;
    }
    .discovery-prompt {
      position: absolute;
      inset: 0;
      z-index: 30;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;
      padding-bottom: 60px;
      background: rgba(2,6,23,0.3);
    }
    .discovery-btn {
      background: rgba(2,6,23,0.92);
      border: 3px solid #f59e0b;
      color: #fff;
      padding: 14px 28px;
      border-radius: 40px;
      font-weight: 900;
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
      transition: all 0.2s;
      animation: bounce 2s infinite;
    }
    .discovery-btn:hover {
      transform: scale(1.05);
      border-color: #fbbf24;
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes confetti-fall {
      0% {
        transform: translateY(-20px) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
        opacity: 1;
      }
      25% {
        transform: translateY(25vh) translateX(15px) rotateX(180deg) rotateY(90deg) rotateZ(45deg);
      }
      50% {
        transform: translateY(50vh) translateX(-15px) rotateX(360deg) rotateY(270deg) rotateZ(180deg);
      }
      75% {
        transform: translateY(75vh) translateX(10px) rotateX(540deg) rotateY(360deg) rotateZ(270deg);
        opacity: 0.95;
      }
      100% {
        transform: translateY(105vh) translateX(-10px) rotateX(720deg) rotateY(540deg) rotateZ(360deg);
        opacity: 0.2;
      }
    }
    .confetti-p {
      position: absolute;
      top: -20px;
      will-change: transform, opacity;
      animation: confetti-fall linear infinite;
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div class="vignette"></div>

  <div class="hud">
    <div style="display:flex; align-items:center; gap:10px;">
      <span class="stage-badge" id="hudStage">1. Grup · Antik Kütüphane</span>
      <span style="font-size:12px; color:#94a3b8;" id="hudProgress">Soru 1 / 15</span>
    </div>
    <div class="timer-ring-wrap">
      <svg viewBox="0 0 44 44">
        <circle cx="22" cy="22" r="18" stroke="#1e293b" stroke-width="4" fill="none"/>
        <circle id="timerProgress" cx="22" cy="22" r="18" stroke="#06b6d4" stroke-width="4" fill="none"
          stroke-dasharray="113.1" stroke-dashoffset="0" stroke-linecap="round"/>
      </svg>
      <span class="timer-text" id="hudTimer">60</span>
    </div>
    <div class="score-badge" id="hudScore">Puan: 0</div>
  </div>

  <div class="bg-layer" id="bgLayer"></div>
  <div class="particles-layer" id="particlesLayer">
    <svg viewBox="0 0 1440 900" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" id="particlesSvg"></svg>
  </div>

  <div class="discovery-prompt" id="discoveryBox">
    <button class="discovery-btn" id="discoveryBtn">
      <span style="font-size:24px;">📖</span>
      <span id="discoveryText">İlk sırrı keşfetmek için kitaba dokun!</span>
    </button>
  </div>

  <div class="center-stage" id="centerBox" style="display:none;">
    <div class="speech-bubble" id="speechBox">
      <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#f59e0b; margin-bottom:4px; font-weight:700;">
        <span>Soru <span id="qNum">1</span> / 15</span>
        <span style="color:#cbd5e1; font-style:italic;">Rehber Aylin: "Şıkkını seç!"</span>
      </div>
      <div style="font-size:15px; font-weight:700; line-height:1.45; color:#fff;" id="questionText">Yükleniyor...</div>
      <div class="feedback-note" id="feedbackText"></div>
    </div>

    <!-- 3D Clay Character -->
    <div class="character-wrap" id="characterBox">
      <img id="charImg" src="./assets/aistudio/image_b4e6452e.png" alt="Aylin">
    </div>
  </div>

  <div class="buttons-grid" id="buttonsGrid" style="display:none;"></div>

  <!-- Results Modal with Festive Confetti -->
  <div id="resultsModal" style="display:none; position:fixed; inset:0; z-index:100; background:rgba(2,6,23,0.92); backdrop-filter:blur(8px); justify-content:center; align-items:center; padding:20px;">
    <div id="confettiContainer" style="position:fixed; inset:0; pointer-events:none; overflow:hidden; z-index:101;"></div>
    <div style="position:relative; z-index:102; background:#0f172a; border:2px solid #f59e0b; border-radius:24px; padding:30px; max-width:600px; width:100%; text-align:center; box-shadow:0 20px 50px rgba(0,0,0,0.8);">
      <div style="font-size:48px; margin-bottom:10px;">🏆</div>
      <h2 style="font-size:24px; font-weight:900; color:#fff; margin-bottom:8px;">TEBRİKLER! GÖREV TAMAMLANDI!</h2>
      <p style="font-size:14px; color:#cbd5e1; margin-bottom:20px;">15 LGS çıkmış sorusunu 3 mekanda başarıyla tamamladınız.</p>
      <div style="display:flex; justify-content:space-around; background:#020617; padding:15px; border-radius:16px; border:1px solid #1e293b; margin-bottom:24px;">
        <div>
          <div style="font-size:12px; color:#94a3b8;">Toplam Puan</div>
          <div id="finalScore" style="font-size:24px; font-weight:900; color:#06b6d4; font-family:monospace;">0 / 1500</div>
        </div>
        <div>
          <div style="font-size:12px; color:#94a3b8;">Başarı Oranı</div>
          <div id="finalPercent" style="font-size:24px; font-weight:900; color:#f59e0b; font-family:monospace;">%0</div>
        </div>
      </div>
      <button onclick="restartGame()" style="background:#f59e0b; border:none; border-bottom:4px solid #b45309; color:#020617; font-weight:900; font-size:15px; padding:12px 30px; border-radius:14px; cursor:pointer; transition:transform 0.15s;">Oyunu Yeniden Başlat</button>
    </div>
  </div>

  <script>
    const questions = ${questionsJson};
    let currentIndex = 0;
    let score = 0;
    let isAnswered = false;
    let isWaitingForDiscovery = true;
    let startTime = Date.now();
    let timerInterval = null;

    // Web Audio Synthesizer
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContextClass();

    function playSuccess() {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const now = audioCtx.currentTime;
      [784, 988, 1175, 1568].forEach((f, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(f, now + i * 0.05);
        gain.gain.setValueAtTime(0.18, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.25);
      });
    }

    function playDonk() {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.22);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
    }

    function playWhistle() {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const now = audioCtx.currentTime;
      const dur = 0.9;
      const master = audioCtx.createGain();
      master.gain.setValueAtTime(0.28, now);
      master.gain.exponentialRampToValueAtTime(0.001, now + dur);
      master.connect(audioCtx.destination);

      [2750, 3050].forEach(f => {
        const osc = audioCtx.createOscillator();
        osc.frequency.setValueAtTime(f, now);
        osc.connect(master);
        osc.start(now);
        osc.stop(now + dur);
      });
    }

    function playDiscoverySound(stage) {
      if (audioCtx.state === 'suspended') audioCtx.resume();
      const now = audioCtx.currentTime;
      const chord = stage === 0 ? [523, 659, 784, 1046] : stage === 1 ? [400, 800, 1200] : [330, 440, 660, 880];
      chord.forEach((f, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(f, now + i * 0.04);
        gain.gain.setValueAtTime(0.12, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.4);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.45);
      });
    }

    // Parallax mouse move
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * -26;
      const y = (e.clientY / window.innerHeight - 0.5) * -16;
      document.getElementById('particlesLayer').style.transform = \`translate3d(\${x}px, \${y}px, 0)\`;
      document.getElementById('centerBox').style.transform = \`perspective(1000px) rotateY(\${x * -0.12}deg) rotateX(\${y * 0.12}deg)\`;
    });

    const stageAssets = [
      { img: './assets/aistudio/B_y_l__K_t_phanede__lk_S_r__3__fea17c18.png', text: 'İlk sırrı keşfetmek için kitaba dokun!', icon: '📖' },
      { img: './assets/aistudio/Merakl__Ka_ifin_Bilim_Laboratuvar__49a8a60c.png', text: 'Yeni ipuçlarını bulmak için büyütece dokun!', icon: '🔍' },
      { img: './assets/aistudio/Uzay__stasyonunda_D_nya_Ke_fi_007874a3.png', text: 'Son keşif için Dünya maketine dokun!', icon: '🌍' }
    ];

    function startTimer() {
      clearInterval(timerInterval);
      startTime = Date.now();
      const circle = document.getElementById('timerProgress');
      const circumference = 113.1;

      timerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = Math.max(0, 60 - elapsed);
        document.getElementById('hudTimer').innerText = remaining;
        circle.style.strokeDashoffset = circumference - (remaining / 60) * circumference;

        if (remaining <= 0) {
          clearInterval(timerInterval);
          handleTimeout();
        }
      }, 250);
    }

    function renderStageGate() {
      isWaitingForDiscovery = true;
      clearInterval(timerInterval);
      const q = questions[currentIndex];
      const stageInfo = stageAssets[q.stageIndex];

      document.getElementById('bgLayer').style.backgroundImage = \`url('\${stageInfo.img}')\`;
      document.getElementById('discoveryBox').style.display = 'flex';
      document.getElementById('centerBox').style.display = 'none';
      document.getElementById('buttonsGrid').style.display = 'none';
      document.getElementById('discoveryBtn').innerHTML = \`<span style="font-size:24px;">\${stageInfo.icon}</span> <span>\${stageInfo.text}</span>\`;

      document.getElementById('discoveryBtn').onclick = () => {
        playDiscoverySound(q.stageIndex);
        document.getElementById('discoveryBox').style.display = 'none';
        document.getElementById('centerBox').style.display = 'flex';
        document.getElementById('buttonsGrid').style.display = 'grid';
        isWaitingForDiscovery = false;
        renderQuestion();
      };
    }

    function renderQuestion() {
      isAnswered = false;
      const q = questions[currentIndex];
      document.getElementById('hudStage').innerText = \`\${q.groupName} · \${q.stageName}\`;
      document.getElementById('hudProgress').innerText = \`Soru \${currentIndex + 1} / 15\`;
      document.getElementById('qNum').innerText = q.id;
      document.getElementById('questionText').innerText = q.questionText;
      document.getElementById('feedbackText').innerText = '';
      document.getElementById('charImg').src = './assets/aistudio/image_b4e6452e.png';

      renderButtons(q);
      renderParticles(q.stageIndex);
      startTimer();
    }

    function renderButtons(q) {
      const grid = document.getElementById('buttonsGrid');
      grid.innerHTML = '';
      q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'btn-3d';
        btn.innerHTML = \`<span class="opt-key">\${opt.key}</span> <span>\${opt.text}</span>\`;
        btn.onclick = () => handleSelect(opt.key, q, btn);
        grid.appendChild(btn);
      });
    }

    function handleTimeout() {
      if (isAnswered) return;
      isAnswered = true;
      playWhistle();
      document.getElementById('charImg').src = './assets/aistudio/image_876bf2de.png';
      document.getElementById('feedbackText').innerHTML = \`<span style="color:#f87171">Süre doldu!</span>\`;

      setTimeout(() => {
        advanceNext();
      }, 2000);
    }

    function handleSelect(chosen, q, clickedBtn) {
      if (isAnswered || isWaitingForDiscovery) return;
      isAnswered = true;
      clearInterval(timerInterval);
      const isCorrect = chosen === q.correctAnswer;

      if (isCorrect) {
        playSuccess();
        clickedBtn.classList.add('btn-correct');
        score += 100;
        document.getElementById('hudScore').innerText = \`Puan: \${score}\`;
        document.getElementById('feedbackText').innerHTML = \`<span style="color:#34d399">Harika, doğru cevap!</span>\`;

        setTimeout(() => {
          advanceNext();
        }, 2000);
      } else {
        playDonk();
        setTimeout(playWhistle, 120);
        document.getElementById('charImg').src = './assets/aistudio/image_876bf2de.png';
        clickedBtn.classList.add('btn-wrong');
        document.getElementById('feedbackText').innerHTML = \`<span style="color:#f87171">Bu kez olmadı, sıradaki soruda yeniden dene!</span>\`;

        setTimeout(() => {
          advanceNext();
        }, 2000);
      }
    }

    function advanceNext() {
      if (currentIndex + 1 < 15) {
        const nextQ = questions[currentIndex + 1];
        const isEnteringNewStage = nextQ.stageIndex !== questions[currentIndex].stageIndex;
        currentIndex++;

        if (isEnteringNewStage) {
          renderStageGate();
        } else {
          renderQuestion();
        }
      } else {
        showResultsModal();
      }
    }

    function createConfetti() {
      const container = document.getElementById('confettiContainer');
      container.innerHTML = '';
      const colors = ['#f59e0b', '#fbbf24', '#10b981', '#34d399', '#06b6d4', '#38bdf8', '#ec4899', '#8b5cf6'];
      for (let i = 0; i < 50; i++) {
        const piece = document.createElement('span');
        piece.className = 'confetti-p';
        const color = colors[i % colors.length];
        const isRibbon = i % 3 === 0;
        const w = isRibbon ? 8 : 10;
        const h = isRibbon ? 16 : 10;
        const dur = (2.2 + ((i * 7) % 25) / 10).toFixed(1);
        const del = (((i * 13) % 35) / 10).toFixed(1);
        piece.style.left = \`\${((i * 19) % 96) + 2}%\`;
        piece.style.width = \`\${w}px\`;
        piece.style.height = \`\${h}px\`;
        piece.style.backgroundColor = color;
        piece.style.borderRadius = i % 5 === 0 ? '50%' : '2px';
        piece.style.animationDuration = \`\${dur}s\`;
        piece.style.animationDelay = \`\${del}s\`;
        piece.style.boxShadow = \`0 0 6px \${color}80\`;
        container.appendChild(piece);
      }
    }

    function showResultsModal() {
      clearInterval(timerInterval);
      document.getElementById('finalScore').innerText = \`\${score} / 1500\`;
      document.getElementById('finalPercent').innerText = \`%\${Math.round((score / 1500) * 100)}\`;
      createConfetti();
      document.getElementById('resultsModal').style.display = 'flex';
      playSuccess();
    }

    function restartGame() {
      document.getElementById('resultsModal').style.display = 'none';
      currentIndex = 0;
      score = 0;
      document.getElementById('hudScore').innerText = 'Puan: 0';
      renderStageGate();
    }

    function renderParticles(stage) {
      const svg = document.getElementById('particlesSvg');
      svg.innerHTML = '';
      const color = stage === 0 ? '#fef08a' : stage === 1 ? '#22d3ee' : '#c084fc';
      for (let i = 0; i < 30; i++) {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', (i * 47) % 1440);
        c.setAttribute('cy', (i * 31) % 900);
        c.setAttribute('r', 1.5 + (i % 3));
        c.setAttribute('fill', color);
        c.setAttribute('opacity', 0.5);
        svg.appendChild(c);
      }
    }

    // Initial load
    renderStageGate();
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Cumlenin_Ogeleri_Interactive_3D_Adventure.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
