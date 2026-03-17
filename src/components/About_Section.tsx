import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";

const nodes = [
  { id: 1, label: "Creative", x: 20, y: 25, desc: "Pushing boundaries of digital art and interactive experiences." },
  { id: 2, label: "Full-Stack", x: 75, y: 20, desc: "Building end-to-end solutions from database to pixel-perfect UI." },
  { id: 3, label: "Innovator", x: 50, y: 55, desc: "Always exploring emerging tech and unconventional approaches." },
  { id: 4, label: "Problem Solver", x: 15, y: 70, desc: "Turning complex challenges into elegant, efficient systems." },
  { id: 5, label: "Team Player", x: 80, y: 65, desc: "Thriving in collaborative, fast-paced environments." },
  { id: 6, label: "Visionary", x: 45, y: 85, desc: "Designing with the future in mind, not just today." },
];

const connections = [
  [0, 1], [0, 2], [1, 2], [2, 3], [2, 4], [3, 5], [4, 5], [0, 3], [1, 4],
];

const AboutSection = () => {
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  

  return (
    <section className="section-container" id="about" ref={sectionRef}>
      <div className="mt-20 relative z-10 w-full max-w-6xl mx-auto">

        {/* Title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-display text-xs tracking-[0.35em] uppercase text-cyan-400 mb-3">
            Neural Core
          </p>

          <h2
            className="font-display text-4xl md:text-5xl font-bold"
            style={{
              background: "linear-gradient(90deg, #a855f7 0%, #d946ef 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            About Me
          </h2>
        </motion.div>

        <motion.div
          className="relative -mt-10 md:-mt-20 w-full aspect-video max-h-130"
          style={{ y: parallaxY }}
        >

          {/* SVG Connections */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {connections.map(([a, b], i) => (
              <motion.line
                key={i}
                x1={nodes[a].x}
                y1={nodes[a].y}
                x2={nodes[b].x}
                y2={nodes[b].y}
                stroke="#00eaff"
                strokeOpacity={0.22}
                strokeWidth={0.28}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: i * 0.1 }}
              />
            ))}
          </svg>

          {/* Nodes */}
          {nodes.map((node, i) => {
            const isLeft = node.x < 30;
            const isRight = node.x > 70;
          
          return (
            
            <motion.div
              key={node.id}
              className="absolute cursor-pointer -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
          
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.25, rotate: 4 }}
              onMouseEnter={() => setActive(node.id)}
              onMouseLeave={() => setActive(null)}
            >
              {/* Outer subtle ring */}
              <div className="absolute inset-0 -m-4 rounded-full border border-cyan-400/20 animate-pulse-glow" />

              {/* Core dot */}
              <div
                className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
                  active === node.id
                    ? "bg-cyan-300 neon-glow scale-150"
                    : "bg-cyan-400/70"
                }`}
              />

              {/* Label */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap font-display text-[0.65rem] md:text-xs tracking-wider transition-all duration-300 ${
                  active === node.id
                    ? "text-cyan-300 neon-text"
                    : "text-slate-400"
                }`}
              >
                {node.label}
              </div>

              {/* Tooltip */}
              {active === node.id && (
                <motion.div
                   className={`absolute bottom-full mb-8
                    ${isLeft ? "left-0 -translate-x-10" : ""}
                    ${isRight ? "right-0 translate-x-10" : ""}
                    ${!isLeft && !isRight ? "left-1/2 -translate-x-1/2" : ""}
                    max-w-[90vw] w-max
                    px-3 py-5
                    glass-panel-accent text-center
                    border border-cyan-400/20 backdrop-blur-xl`}
                >
                  <p className="font-body text-xs md:text-sm text-slate-300 leading-relaxed">
                    {node.desc}
                  </p>
                </motion.div>
              )}
            </motion.div>
          )})}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;