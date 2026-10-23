/**
 * Web Audio API synthesizer for 100% offline, zero-dependency game sound effects.
 * Includes interactive object sounds (book, lens, globe), referee whistle,
 * cheerful success ("yeee"), and mistake thud ("donk").
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const soundEffects = {
  // Click feedback
  click: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.03);
    } catch {
      // autoplay block
    }
  },

  // 1. Dünya: Büyülü Kitap Açılma Sesi (Harp / Sparkle Shimmer)
  bookOpen: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = now + idx * 0.045;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.12, t + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.36);
      });
    } catch {
      // ignore
    }
  },

  // 2. Dünya: Büyüteç Keşif Sesi (Sci-Fi Bubble Glass Ping)
  lensDiscover: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.3);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.33);
    } catch {
      // ignore
    }
  },

  // 3. Dünya: Dünya Maketi Aktivasyon Sesi (Cosmic Orbital Resonance)
  globeActivate: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const chord = [329.63, 440, 659.25, 880, 1318.51];
      chord.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.03);
        gain.gain.setValueAtTime(0.1, now + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.03 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.03);
        osc.stop(now + i * 0.03 + 0.65);
      });
    } catch {
      // ignore
    }
  },

  // Neşeli, ince ve yükselen başarı sesi ("yeee")
  correct: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const freqs = [783.99, 987.77, 1174.66, 1567.98];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.06;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.linearRampToValueAtTime(freq * 1.05, startTime + 0.18);

        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      });
    } catch {
      // ignore
    }
  },

  // Kalın, tok bir hata sesi ("donk")
  wrong: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.24);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(220, now);
      osc2.frequency.exponentialRampToValueAtTime(60, now + 0.14);

      gain2.gain.setValueAtTime(0.25, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.15);
    } catch {
      // ignore
    }
  },

  // Keskin ve tiz HAKEM DÜDÜĞÜ (Dual-tone frequency beating + 26Hz pea flutter)
  whistle: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const duration = 0.9;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, now);
      masterGain.gain.linearRampToValueAtTime(0.28, now + 0.04);
      masterGain.gain.setValueAtTime(0.28, now + duration - 0.15);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      masterGain.connect(ctx.destination);

      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(26, now);
      lfoGain.gain.setValueAtTime(0.08, now);
      lfo.connect(lfoGain.gain);

      const freqs = [2750, 3050];
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        lfo.connect(osc.frequency);
        osc.connect(masterGain);
        osc.start(now);
        osc.stop(now + duration);
      });

      lfo.start(now);
      lfo.stop(now + duration);
    } catch {
      // ignore
    }
  },

  // Stage / Object Unlock Sound
  unlock: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      notes.forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + i * 0.05);
        gain.gain.setValueAtTime(0.12, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.5);
      });
    } catch {
      // ignore
    }
  },

  // Final Victory Fanfare
  fanfare: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const melody = [
        { f: 523.25, t: 0.0, d: 0.12 },
        { f: 659.25, t: 0.12, d: 0.12 },
        { f: 783.99, t: 0.24, d: 0.15 },
        { f: 1046.5, t: 0.42, d: 0.45 },
      ];
      melody.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, now + note.t);
        gain.gain.setValueAtTime(0.2, now + note.t);
        gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + note.t);
        osc.stop(now + note.t + note.d);
      });
    } catch {
      // ignore
    }
  },
};
