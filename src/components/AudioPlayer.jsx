import { useState, useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodeRef = useRef(null);
  const barsRef = useRef([]);

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

  // Animate bars when playing
  useEffect(() => {
    if (!isPlaying) return;

    const animateBars = () => {
      barsRef.current.forEach((bar) => {
        if (!bar) return;
        const h = 4 + Math.random() * 16;
        gsap.to(bar, { height: h, duration: 0.15 + Math.random() * 0.1, ease: 'power1.out' });
      });
    };

    const interval = setInterval(animateBars, 180);
    animateBars();

    return () => {
      clearInterval(interval);
      // Reset bars
      barsRef.current.forEach((bar) => {
        if (bar) gsap.to(bar, { height: bar.dataset.default, duration: 0.3 });
      });
    };
  }, [isPlaying]);

  return (
    <button
      className={`audio-toggle glass ${isPlaying ? 'audio-toggle--playing' : 'audio-toggle--paused'}`}
      onClick={toggleAudio}
      aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
      title={isPlaying ? 'Mute' : 'Play ambient audio'}
      style={{ cursor: 'pointer' }}
    >
      <div className="audio-toggle__bars">
        <span ref={el => barsRef.current[0] = el} className="audio-toggle__bar" data-default="8" style={{ height: '8px' }} />
        <span ref={el => barsRef.current[1] = el} className="audio-toggle__bar" data-default="14" style={{ height: '14px' }} />
        <span ref={el => barsRef.current[2] = el} className="audio-toggle__bar" data-default="6" style={{ height: '6px' }} />
        <span ref={el => barsRef.current[3] = el} className="audio-toggle__bar" data-default="12" style={{ height: '12px' }} />
      </div>
    </button>
  );
}
