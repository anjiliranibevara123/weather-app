// Procedural Web Audio API Soundscape Synthesizer
// Generates ambient weather sound effects programmatically without external MP3 assets!

class SoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.rainNode = null;
    this.windNode = null;
    this.isPlaying = false;
    this.currentSound = 'off';
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.15;
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playRain() {
    this.stop();
    this.init();
    this.currentSound = 'rain';
    this.isPlaying = true;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;

    whiteNoise.connect(filter);
    filter.connect(this.masterGain);

    whiteNoise.start();
    this.rainNode = whiteNoise;
  }

  playWind() {
    this.stop();
    this.init();
    this.currentSound = 'wind';
    this.isPlaying = true;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 400;
    filter.Q.value = 3;

    // LFO to modulate wind frequency slowly
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.2; // 0.2 Hz slow breeze modulation

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.value = 250;

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    whiteNoise.connect(filter);
    filter.connect(this.masterGain);

    lfo.start();
    whiteNoise.start();
    this.windNode = whiteNoise;
  }

  playSunnyChimes() {
    this.stop();
    this.init();
    this.currentSound = 'sun';
    this.isPlaying = true;

    const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 pentatonic
    let idx = 0;

    this.chimeInterval = setInterval(() => {
      if (!this.isPlaying || this.currentSound !== 'sun') return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.value = freqs[idx % freqs.length];
      idx++;

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 2.5);
    }, 1800);
  }

  stop() {
    if (this.chimeInterval) {
      clearInterval(this.chimeInterval);
      this.chimeInterval = null;
    }
    if (this.rainNode) {
      try { this.rainNode.stop(); } catch (e) {}
      this.rainNode = null;
    }
    if (this.windNode) {
      try { this.windNode.stop(); } catch (e) {}
      this.windNode = null;
    }
    this.isPlaying = false;
    this.currentSound = 'off';
  }

  toggle(type) {
    if (this.currentSound === type && this.isPlaying) {
      this.stop();
      return 'off';
    }
    if (type === 'rain') this.playRain();
    else if (type === 'wind') this.playWind();
    else if (type === 'sun') this.playSunnyChimes();
    return this.currentSound;
  }
}

export const soundEngine = new SoundscapeEngine();
