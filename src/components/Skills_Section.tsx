import { useEffect, useRef, useState } from "react";

const skills = [
  { name: "React", orbit: 1, angle: 30, speed: 25, level: 95 },
  { name: "TypeScript", orbit: 2, angle: 120, speed: 35, level: 90 },
  { name: "Three.js", orbit: 1, angle: 180, speed: 25, level: 85 },
  { name: "Node.js", orbit: 2, angle: 250, speed: 35, level: 92 },
  { name: "Tailwind", orbit: 3, angle: 60, speed: 45, level: 88 },
  { name: "Javascript", orbit: 2, angle: 0, speed: 35, level: 80 },
  { name: "Java", orbit: 3, angle: 210, speed: 45, level: 75 },
  { name: "MongoDB", orbit: 3, angle: 130, speed: 45, level: 82 },
  { name: "SQL", orbit: 3, angle: 330, speed: 45, level: 82 },
];

const isMobile = window.innerWidth < 768;
const orbitRadii = isMobile ? [60, 120, 170] : [120, 200, 280];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let id: number;
    const animate = () => {
      setTime(Date.now() / 1000);
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen pt-32 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-cyan-400 text-xs tracking-[0.35em] uppercase mb-4">
            ORBITAL SYSTEM
          </p>

          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              background: "linear-gradient(90deg, #a855f7 0%, #d946ef 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Skills
          </h2>
        </div>

        <div
          className={`relative mx-auto transition-opacity duration-1000 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{
            width: Math.min(600, window.innerWidth - 48),
            height: Math.min(600, window.innerWidth - 48),
          }}
        >
          {/* Pulsing Center Sun */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full"
            style={{
              background: "#00e5ff",
              animation: "sunPulse 3s ease-in-out infinite",
            }}
          />

          {/* Orbit Rings */}
          {orbitRadii.map((r, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: r * 2,
                height: r * 2,
                marginLeft: -r,
                marginTop: -r,
                border: "1px solid rgba(0,229,255,0.15)",
              }}
            />
          ))}

          {/* Skills */}
          {skills.map((skill) => {
            const containerSize = Math.min(600, window.innerWidth - 48);
            const radius = orbitRadii[skill.orbit - 1];
            const angle = (skill.angle + time * (360 / skill.speed)) * (Math.PI / 180);
            const x = containerSize / 2 + Math.cos(angle) * radius;
            const y = containerSize / 2 + Math.sin(angle) * radius;

            return (
              <div
                key={skill.name}
                className="absolute group cursor-pointer"
                style={{
                  left: x,
                  top: y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  className={`relative rounded-lg ${isMobile ? 'px-2 py-1' : 'px-6 py-3'} bg-[rgba(10,18,32,0.75)]
                             backdrop-blur-xl
                             border border-cyan-400/20
                             transition-all duration-300
                             group-hover:border-cyan-400/60
                             group-hover:shadow-[0_0_20px_rgba(0,229,255,0.5)]
                             group-hover:-translate-y-1 flex`}
                             
                >
                  <span className={`tracking-wider text-cyan-300 group-hover:text-white transition-colors ${isMobile ? 'text-[9px]' : 'text-xs'}`}>
                    {skill.name}
                  </span>

                  {/* Percentage Tooltip */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 -top-10
                               opacity-0 group-hover:opacity-100
                               transition-all duration-300"
                  >
                    <div className="px-3 py-1 rounded-md
                                    bg-[rgba(10,18,32,0.85)]
                                    border border-cyan-400/30
                                    text-xs text-cyan-300
                                    backdrop-blur-xl
                                    shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                      {skill.level}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}