import { useState, useRef, useCallback, useEffect } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);

  // Create a lo-fi ambient drone using Web Audio API
  const initAudio = useCallback(() => {
    if (audioContextRef.current) return audioContextRef.current;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Create a reverb-like effect
    const convolver = ctx.createConvolver();
    const reverbLength = ctx.sampleRate * 2;
    const reverbBuffer = ctx.createBuffer(2, reverbLength, ctx.sampleRate);
    for (let ch = 0; ch < 2; ch++) {
      const data = reverbBuffer.getChannelData(ch);
      for (let i = 0; i < reverbLength; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / reverbLength, 2.5);
      }
    }
    convolver.buffer = reverbBuffer;

    // Ambient pad - multiple detuned oscillators
    const notes = [130.81, 164.81, 196.00, 246.94]; // C3, E3, G3, B3
    const oscs = [];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      osc.detune.value = (Math.random() - 0.5) * 15;

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.06;

      // Add slow LFO modulation
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1 + i * 0.05;
      lfoGain.gain.value = 3;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      osc.connect(oscGain);
      oscGain.connect(convolver);
      oscGain.connect(masterGain);
      osc.start();

      oscs.push({ osc, lfo });
    });

    // Sub bass drone
    const subOsc = ctx.createOscillator();
    subOsc.type = 'sine';
    subOsc.frequency.value = 65.41; // C2
    const subGain = ctx.createGain();
    subGain.gain.value = 0.04;
    subOsc.connect(subGain);
    subGain.connect(masterGain);
    subOsc.start();
    oscs.push({ osc: subOsc });

    // Connect reverb
    const reverbGain = ctx.createGain();
    reverbGain.gain.value = 0.3;
    convolver.connect(reverbGain);
    reverbGain.connect(masterGain);

    // Noise layer for texture
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 4, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseData.length; i++) {
      noiseData[i] = (Math.random() * 2 - 1) * 0.008;
    }
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 800;

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(masterGain);
    noiseSource.start();

    oscillatorsRef.current = oscs;
    return ctx;
  }, []);

  const toggleAudio = useCallback(() => {
    const ctx = initAudio();

    if (isPlaying) {
      // Fade out
      gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);
      setIsPlaying(false);
    } else {
      if (ctx.state === 'suspended') ctx.resume();
      gainNodeRef.current.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 1);
      setIsPlaying(true);
    }
  }, [isPlaying, initAudio]);

  // Play click sound effect
  useEffect(() => {
    const playClick = () => {
      if (!audioContextRef.current) return;
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = 800 + Math.random() * 400;
      gain.gain.value = 0.04;
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    };

    const interactives = document.querySelectorAll('a, button, .project-card');
    interactives.forEach((el) => el.addEventListener('click', playClick));
    return () => interactives.forEach((el) => el.removeEventListener('click', playClick));
  }, []);

  return (
    <button
      className={`audio-toggle glass ${isPlaying ? 'audio-toggle--playing' : 'audio-toggle--paused'}`}
      onClick={toggleAudio}
      aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
      title={isPlaying ? 'Mute' : 'Play ambient audio'}
    >
      <div className="audio-toggle__bars">
        <span className="audio-toggle__bar" style={{ height: '8px' }} />
        <span className="audio-toggle__bar" style={{ height: '14px' }} />
        <span className="audio-toggle__bar" style={{ height: '6px' }} />
        <span className="audio-toggle__bar" style={{ height: '12px' }} />
      </div>
    </button>
  );
}
