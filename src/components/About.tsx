import { motion } from "framer-motion";
import React from "react";
import { Code, Layers, Zap } from "lucide-react";
import GlassCard from "./GlassCard";

const About = () => {
  const stats = [
    { label: "Years Experience", value: "5+", icon: Zap },
    { label: "Projects Shipped", value: "30+", icon: Layers },
    { label: "Lines of Code", value: "500K+", icon: Code },
  ];

  return (
    <div id="about" className="relative z-10 py-40">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-24 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="font-mono text-xs tracking-[0.35em] text-cyan-400 mb-4">
              // ABOUT ME
            </div>

            <h2
              className="font-display text-4xl md:text-5xl font-bold mb-8"
              style={{
                background: "linear-gradient(90deg, #38bdf8 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Building The Future
            </h2>

            <div className="space-y-6 text-gray-400 leading-relaxed text-lg">
              <p>
                I'm a full-stack developer who thrives at the bleeding edge of web technology.
                With 5+ years of experience, I specialize in creating immersive digital
                experiences that push boundaries.
              </p>
              <p>
                From interactive 3D visualizations to AI-powered applications,
                I bring ideas to life with clean code and pixel-perfect execution.
                Every project is an opportunity to innovate.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                >
                  <GlassCard className="p-6 text-center border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />

                    <div className="font-display text-3xl font-bold text-white">
                      {stat.value}
                    </div>

                    <div className="font-mono text-xs tracking-wider text-gray-500 mt-2">
                      {stat.label}
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE TERMINAL */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <GlassCard className="p-0 border border-cyan-500/20 backdrop-blur-xl overflow-hidden">

              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-6 py-4 border-b border-cyan-500/10">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-400/70" />
                <div className="w-3 h-3 rounded-full bg-cyan-400/70" />
                <span className="font-mono text-xs text-gray-500 ml-3">
                  terminal.exe
                </span>
              </div>

              {/* Terminal Body */}
              <div className="p-8 font-mono text-sm leading-8">

                <div className="text-gray-400">
                  <span className="text-cyan-400">$</span> whoami
                </div>

                <div className="text-white mb-6">
                  → Full-Stack Developer & Creative Technologist
                </div>

                <div className="text-gray-400">
                  <span className="text-cyan-400">$</span> cat skills.json
                </div>

                <div className="text-white">
                  {"{"}
                </div>

                <div className="pl-6">
                  <span className="text-cyan-400">"frontend"</span>:{" "}
                  <span className="text-purple-400">
                    "React, Three.js, GSAP"
                  </span>,
                </div>

                <div className="pl-6">
                  <span className="text-cyan-400">"backend"</span>:{" "}
                  <span className="text-purple-400">
                    "Node, Python, Rust"
                  </span>,
                </div>

                <div className="pl-6">
                  <span className="text-cyan-400">"passion"</span>:{" "}
                  <span className="text-purple-400">
                    "Making the impossible real"
                  </span>
                </div>

                <div className="text-white">
                  {"}"}
                </div>

                <div className="mt-8 text-gray-400">
                  <span className="text-cyan-400">$</span> echo $STATUS
                </div>

                <div className="flex items-center gap-2 text-white">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Available for hire
                </div>

                <div className="mt-6 text-cyan-400">
                  $ <span className="border-cyan-400">_</span>
                  <span className=" text-cyan-400 cursor-blink">|</span>
                </div>

              </div>
            </GlassCard>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default About;