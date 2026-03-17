import { motion } from "framer-motion";
import { Code, Layers, Zap } from "lucide-react";
import GlassCard from "./GlassCard";

const About = () => {
  const stats = [
    { label: "Internship", value: "1", icon: Zap },
    { label: "Projects Built", value: "3+", icon: Layers },
    { label: "Lines of Code", value: "50K+", icon: Code },
  ];

  return (
    <div id="about" className="relative z-10 mt-10 lg:mt-40">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-15 md:gap-24 items-center">

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
              className="font-display text-4xl md:text-5xl font-bold mb-6 leading-[1.4]"
              style={{
                background: "linear-gradient(90deg, #38bdf8 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Building The Future
            </h2>

            <div className="space-y-6 text-gray-400 leading-relaxed text-md lg:text-lg">
              <p>
                I’m a full-stack developer focused on building modern web applications and real-world SaaS products. I enjoy turning ideas into functional, scalable systems using clean code and practical architecture
              </p>
              <p>
                I’ve worked with the MERN stack and have hands-on experience building secure APIs, integrating payments, and developing AI-powered features. Recently, I built an AI SaaS platform that generates complete system architecture from simple ideas.
              </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                >
                  <GlassCard className="p-4 lg:p-6 text-center border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />

                    <div className="font-display text-xl md:text-3xl font-bold text-white">
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
                  → Full-Stack Developer & Modern UI Designer
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
                    "React, Three.js, Next.js, Tailwind CSS"
                  </span>,
                </div>

                <div className="pl-6">
                  <span className="text-cyan-400">"backend"</span>:{" "}
                  <span className="text-purple-400">
                    "Node.js, Express.js"
                  </span>,
                </div>

                <div className="pl-6">
                  <span className="text-cyan-400">"database"</span>:{" "}
                  <span className="text-purple-400">
                    "Mongo DB, SQL"
                  </span>,
                </div>

                <div className="pl-6">
                  <span className="text-cyan-400">"tools"</span>:{" "}
                  <span className="text-purple-400">
                    "Git, Vercel, Render"
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