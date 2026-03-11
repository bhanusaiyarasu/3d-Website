import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoReel() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Create a procedural "demo reel" video using canvas animation
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx2d = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;

    // Generate frames for scroll-bound animation
    const totalFrames = 120;
    const frames = [];

    for (let f = 0; f < totalFrames; f++) {
      const progress = f / totalFrames;
      frames.push(progress);
    }

    const drawFrame = (progress) => {
      const w = canvas.width;
      const h = canvas.height;

      // Background gradient shifts with progress
      const hue1 = 220 + progress * 140;
      const hue2 = 280 + progress * 80;
      const gradient = ctx2d.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, `hsl(${hue1}, 70%, 8%)`);
      gradient.addColorStop(1, `hsl(${hue2}, 60%, 12%)`);
      ctx2d.fillStyle = gradient;
      ctx2d.fillRect(0, 0, w, h);

      // Grid lines
      ctx2d.strokeStyle = `hsla(${hue1}, 100%, 60%, 0.08)`;
      ctx2d.lineWidth = 1;
      const gridSize = 40;
      const offsetY = (progress * 200) % gridSize;
      for (let y = -gridSize + offsetY; y < h; y += gridSize) {
        ctx2d.beginPath();
        ctx2d.moveTo(0, y);
        ctx2d.lineTo(w, y);
        ctx2d.stroke();
      }
      const offsetX = (progress * 100) % gridSize;
      for (let x = -gridSize + offsetX; x < w; x += gridSize) {
        ctx2d.beginPath();
        ctx2d.moveTo(x, 0);
        ctx2d.lineTo(x, h);
        ctx2d.stroke();
      }

      // Floating geometric shapes
      const shapeCount = 6;
      for (let i = 0; i < shapeCount; i++) {
        const t = progress * Math.PI * 4 + i * 1.2;
        const x = w * 0.5 + Math.sin(t + i) * (w * 0.3);
        const y = h * 0.5 + Math.cos(t * 0.7 + i * 2) * (h * 0.25);
        const size = 20 + Math.sin(t) * 15;

        ctx2d.save();
        ctx2d.translate(x, y);
        ctx2d.rotate(t * 0.5);

        const colors = ['#00f0ff', '#ff2d7b', '#a855f7', '#ffb7c5', '#fbbf24', '#00f0ff'];
        ctx2d.strokeStyle = colors[i % colors.length];
        ctx2d.lineWidth = 2;
        ctx2d.globalAlpha = 0.6;

        if (i % 3 === 0) {
          ctx2d.strokeRect(-size / 2, -size / 2, size, size);
        } else if (i % 3 === 1) {
          ctx2d.beginPath();
          ctx2d.arc(0, 0, size / 2, 0, Math.PI * 2);
          ctx2d.stroke();
        } else {
          ctx2d.beginPath();
          for (let p = 0; p < 3; p++) {
            const angle = (p / 3) * Math.PI * 2 - Math.PI / 2;
            const px = Math.cos(angle) * size / 2;
            const py = Math.sin(angle) * size / 2;
            p === 0 ? ctx2d.moveTo(px, py) : ctx2d.lineTo(px, py);
          }
          ctx2d.closePath();
          ctx2d.stroke();
        }

        ctx2d.restore();
      }

      // Center text
      ctx2d.globalAlpha = 1;
      ctx2d.fillStyle = '#ffffff';
      ctx2d.font = `bold ${36 + progress * 10}px Orbitron, sans-serif`;
      ctx2d.textAlign = 'center';
      ctx2d.textBaseline = 'middle';

      const texts = ['CREATIVE', 'DEVELOPER', 'DESIGNER', 'DREAMER'];
      const textIndex = Math.floor(progress * texts.length) % texts.length;
      const textOpacity = Math.sin(progress * Math.PI * texts.length) * 0.5 + 0.5;
      ctx2d.globalAlpha = textOpacity;
      ctx2d.fillText(texts[textIndex], w / 2, h / 2);

      // Scanline effect
      ctx2d.globalAlpha = 0.03;
      ctx2d.fillStyle = '#000';
      for (let sy = 0; sy < h; sy += 4) {
        ctx2d.fillRect(0, sy, w, 2);
      }
      ctx2d.globalAlpha = 1;
    };

    // Initial draw
    drawFrame(0);

    // ScrollTrigger to scrub through frames
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      onUpdate: (self) => {
        drawFrame(self.progress);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  return (
    <section id="video-reel" className="video-reel" ref={sectionRef}>
      <div className="video-reel__sticky">
        <canvas
          ref={canvasRef}
          className="video-reel__video"
          style={{ width: '85%', maxWidth: '1100px' }}
        />
        <span className="video-reel__label">↕ SCROLL TO SCRUB</span>
      </div>
    </section>
  );
}
