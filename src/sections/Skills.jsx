import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    title: 'FRONTEND',
    icon: '◈',
    color: 'var(--neon-cyan)',
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript', level: 95 },
      { name: 'TypeScript', level: 80 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Next.js', level: 75 },
    ]
  },
  {
    title: '3D / CREATIVE',
    icon: '⟁',
    color: 'var(--neon-pink)',
    skills: [
      { name: 'Three.js', level: 88 },
      { name: 'WebGL / GLSL', level: 78 },
      { name: 'React Three Fiber', level: 85 },
      { name: 'Blender', level: 70 },
      { name: 'GSAP', level: 92 },
    ]
  },
  {
    title: 'TOOLS & BACKEND',
    icon: '⚙',
    color: 'var(--violet)',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Git & GitHub', level: 90 },
      { name: 'Vite', level: 88 },
      { name: 'Figma', level: 75 },
      { name: 'REST APIs', level: 82 },
    ]
  }
];

function SkillBar({ name, level, color, index }) {
  const barRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      onEnter: () => setVisible(true),
    });

    return () => st.kill();
  }, []);

  return (
    <div className="skill-bar" ref={barRef}>
      <div className="skill-bar__header">
        <span className="skill-bar__name font-display">{name}</span>
        <span className="skill-bar__level font-display" style={{ color }}>{level}%</span>
      </div>
      <div className="skill-bar__track">
        <div
          className="skill-bar__fill"
          style={{
            width: visible ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, transparent)`,
            boxShadow: visible ? `0 0 15px ${color}66, 0 0 30px ${color}33` : 'none',
            transitionDelay: `${index * 0.1}s`,
          }}
        />
        <div className="skill-bar__glow" style={{
          left: visible ? `${level}%` : '0%',
          background: color,
          transitionDelay: `${index * 0.1}s`,
        }} />
      </div>
    </div>
  );
}

function SkillOrb({ skill, index, total, color }) {
  const angle = (index / total) * Math.PI * 2;
  const radius = 120;
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  return (
    <div
      className="skill-orb"
      style={{
        '--orb-x': `${x}px`,
        '--orb-y': `${y}px`,
        '--orb-color': color,
        '--orb-delay': `${index * 0.15}s`,
      }}
    >
      <span className="skill-orb__label font-display">{skill}</span>
    </div>
  );
}

export default function Skills() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.skills__title', {
      opacity: 0,
      y: 80,
      rotateX: -15,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: { trigger: '.skills__title', start: 'top 90%' }
    });

    gsap.from('.skills__category', {
      opacity: 0,
      y: 60,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.skills__grid', start: 'top 85%' }
    });

    gsap.from('.skills__orb-ring', {
      opacity: 0,
      scale: 0.5,
      rotation: -180,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.skills__orb-ring', start: 'top 85%' }
    });
  }, { scope: containerRef });

  const allSkillNames = SKILL_CATEGORIES.flatMap(c => c.skills.map(s => s.name));

  return (
    <section id="skills" className="skills" ref={containerRef}>
      <div className="skills__label font-display">// WHAT I BRING</div>
      <h2 className="skills__title font-display">
        MY <span className="text-gradient">ARSENAL</span>
      </h2>

      {/* Orbiting skill names ring */}
      <div className="skills__orb-ring">
        {allSkillNames.map((name, i) => (
          <SkillOrb
            key={name}
            skill={name}
            index={i}
            total={allSkillNames.length}
            color={SKILL_CATEGORIES[Math.floor(i / 5) % 3].color}
          />
        ))}
        <div className="skills__orb-center font-display">⟁</div>
      </div>

      {/* Skill categories with progress bars */}
      <div className="skills__grid">
        {SKILL_CATEGORIES.map((cat) => (
          <div key={cat.title} className="skills__category glass">
            <div className="skills__category-header">
              <span className="skills__category-icon" style={{ color: cat.color }}>{cat.icon}</span>
              <h3 className="skills__category-title font-display" style={{ color: cat.color }}>{cat.title}</h3>
            </div>
            <div className="skills__bars">
              {cat.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  index={i}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
