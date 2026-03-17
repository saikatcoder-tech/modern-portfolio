import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Rocket, Github } from "lucide-react";

import type { MouseEvent } from "react";

import projectQuantum from "../assets/project-ocula.png";
import projectCommerce from "../assets/project-emailgenerator.png";
import projectEngine from "../assets/project-modernPortfolio.png";
import projectSynapse from "../assets/project-calculator.png";

const projects = [
  {
    id: 1,
    title: "AI System Architecture Generator",
    desc: "Generates complete system architecture from simple ideas",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    color: "190 100% 50%",
    image: projectQuantum,
    link: "https://aiocula.vercel.app",
    github: "https://github.com/saikatcoder-tech/ocula"
    
  },
  {
    id: 2,
    title: "Neon Calculator",
    desc: "Neon cyberpunk calculator with sleek interactive UI",
    tech: ["HTML", "CSS", "Javascript"],
    color: "280 100% 60%",
    image: projectSynapse,
    link: "https://ivaan-calculator.vercel.app/",
    github: "https://github.com/saikatcoder-tech/CodeAlpha_Calculator"
  },
  {
    id: 3,
    title: "Portfolio Website",
    desc: "Modern cyberpunk portfolio with immersive space UI",
    tech: ["React.js", "Tailwind CSS", "Typescript", "Three.js"],
    color: "320 100% 55%",
    image: projectEngine,
    link: "https://ivaanportfolio.vercel.app/",
    github: "https://github.com/saikatcoder-tech/modern-portfolio"

  },
  {
    id: 4,
    title: "AI Email Generator",
    desc: "AI-powered tool for instant professional email writing.",
    tech: ["HTML", "CSS", "JS"],
    color: "220 100% 60%",
    image: projectCommerce,
    link: "https://aiemailcraft.vercel.app/",
    github: "https://github.com/saikatcoder-tech/AI-Email-Writer"
  },
];

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouse = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

const ProjectsSection = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen py-32 px-6" id="projects">
      <div className="relative z-10 w-full max-w-6xl mx-auto">

        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-cyan-400 text-xs tracking-[0.35em] uppercase mb-4">
            Dimension Portals
          </p>

          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              background: "linear-gradient(90deg, #a855f7 0%, #d946ef 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Projects
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <TiltCard className="group relative cursor-pointer">

                <div
                  className="h-full rounded-xl overflow-hidden backdrop-blur-xl border border-white/5 transition-all duration-500"
                  style={{
                    background: "rgba(8, 14, 28, 0.75)",
                  }}
                  onMouseEnter={() => setActiveId(project.id)}
                  onMouseLeave={() => setActiveId(null)}
                >

                  {/* IMAGE */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-125"
                    />

                    <div
                      className="absolute inset-0 opacity-30 pointer-events-none"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.05) 2px, rgba(0,229,255,0.05) 4px)",
                      }}
                    />

                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                      style={{ backgroundColor: `hsl(${project.color})` }}
                    />

                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#0b1224] to-transparent" />

                    <div
                      className="absolute top-1/3 left-0 right-0 h-px opacity-0 group-hover:opacity-80 transition-all duration-200"
                      style={{
                        backgroundColor: `hsl(${project.color})`,
                        boxShadow: `0 0 8px hsl(${project.color})`,
                      }}
                    />

                  
                    <motion.div
  initial={false}
  animate={{
    opacity: activeId === project.id ? 1 : 0,
    y: activeId === project.id ? 0 : 20,
  }}
  transition={{ duration: 0.25, ease: "easeOut" }}
  className="absolute inset-0 flex items-center justify-center gap-6 pointer-events-none"
>
  {/* 🚀 LIVE */}
  <a
    href={project.link}
    target="_blank"
    rel="noopener noreferrer"
    className="pointer-events-auto group relative flex items-center gap-2 px-4 py-2
    text-xs tracking-wide uppercase text-cyan-300
    border border-cyan-400/30 rounded-full
    bg-[#0b1224]/80 backdrop-blur-md
    transition-all duration-300 hover:scale-105 hover:border-cyan-400"
  >
    <Rocket size={14} />
    <span>Launch</span>

    {/* glow */}
    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
    transition duration-300 blur-md bg-cyan-400/20" />
  </a>

  {/* 🧠 CODE */}
  <a
    href={project.github}
    target="_blank"
    rel="noopener noreferrer"
    className="pointer-events-auto group relative flex items-center gap-2 px-4 py-2
    text-xs tracking-wide uppercase text-purple-300
    border border-purple-400/30 rounded-full
    bg-[#0b1224]/80 backdrop-blur-md
    transition-all duration-300 hover:scale-105 hover:border-purple-400"
  >
    <Github size={14} />
    <span>Source</span>

    {/* glow */}
    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 
    transition duration-300 blur-md bg-purple-400/20" />
  </a>
</motion.div>



                  </div>

                  {/* CONTENT */}
                  <div className="p-6 pt-5 relative">

                    <div
                      className="absolute top-0 left-0 right-0 h-px transition-all duration-500"
                      style={{
                        background:
                          activeId === project.id
                            ? `linear-gradient(90deg, transparent, hsl(${project.color}), transparent)`
                            : "transparent",
                      }}
                    />

                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: `hsl(${project.color})`,
                          boxShadow: `0 0 10px hsl(${project.color})`,
                        }}
                      />
                      <span className="text-[10px] tracking-[0.3em] uppercase text-cyan-300/70">
                        Portal {String(project.id).padStart(2, "0")}
                      </span>
                    </div>

                    <h3
                      className="text-xl font-bold mb-2 transition-all duration-300"
                      style={{
                        color:
                          activeId === project.id
                            ? `hsl(${project.color})`
                            : "#e5f3ff",
                        textShadow:
                          activeId === project.id
                            ? `0 0 20px hsl(${project.color} / 0.5)`
                            : "none",
                      }}
                    >
                      {project.title}
                    </h3>

                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[9px] tracking-wider uppercase px-3 py-1 rounded-full border transition-all duration-300"
                          style={{
                            borderColor: "rgba(255,255,255,0.08)",
                            color: "#8fb8ff",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                  </div>
                </div>

              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;