import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center px-6 overflow-hidden" style={{ minHeight: '100svh' }}>

      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-8"
      >
        <div className="px-6 py-2 rounded-full border border-cyan-400/40 bg-cyan-400/5 backdrop-blur-md">
          <span className="text-cyan-400 tracking-[0.25em] text-sm font-semibold">
            SYSTEM.INITIALIZED
          </span>
        </div>
      </motion.div>

      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="text-center leading-tight"
      >
        <div className="text-white text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-wide"
          style={{
            textShadow:
              "0 0 20px rgba(0,255,255,0.25)"
          }}
        >
          ENTER THE
        </div>

        <div
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mt-2"
          style={{
            background:
              "linear-gradient(90deg, #8EF9FF 0%, #B36BFF 50%, #FF3CF7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow:
              "0 0 25px rgba(255,0,255,0.4)"
          }}
        >
          NEURAL NET
        </div>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="mt-8 text-gray-400 text-center max-w-2xl text-lg md:text-xl"
      >
        Fullstack Architect & Creative Developer. Bridging the gap between
        robust backend systems and highly immersive 3D frontend experiences.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-12 flex flex-col sm:flex-row gap-6"
      >
        <button
          className="px-8 py-4 border border-cyan-400/50 text-cyan-300 font-semibold tracking-wider rounded-md bg-cyan-400/5 backdrop-blur-md transition-all duration-300 hover:bg-cyan-400/10 hover:shadow-[0_0_25px_rgba(0,255,255,0.3)]"
        >
          ACCESS ARCHIVES
        </button>

        <button
          className="px-8 py-4 border border-gray-500/40 text-white font-semibold tracking-wider rounded-md transition-all duration-300 hover:border-pink-400 hover:shadow-[0_0_25px_rgba(255,0,255,0.3)]"
        >
          ESTABLISH LINK
        </button>
      </motion.div>

      {/* Left System Text */}
      <div className="absolute bottom-10 left-10 hidden md:block text-xs text-cyan-400/60 font-mono space-y-1">
        <div>COORD: 45.928.11</div>
        <div>STATUS: ONLINE</div>
        <div>UPLINK: SECURE</div>
      </div>

      {/* Right Vertical Bars */}
      <div className="absolute right-10 top-1/2 hidden md:flex flex-col gap-3 opacity-40">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-0.5 h-10 bg-cyan-400"
            style={{ opacity: 1 - i * 0.15 }}
          />
        ))}
      </div>
    </section>
  );
}