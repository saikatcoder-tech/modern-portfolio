import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const navItems = [
  { label: "HOME", href: "#hero" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];

const CyberNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("HOME");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      setScrolled(window.scrollY > heroHeight * 0.1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (label: string, href: string) => {
    setActive(label);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* 🔥 Neon Progress Line */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-cyan-400 origin-left z-50"
      />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled ? "glass-nav py-3" : "py-6"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          <div className="neon-text font-bold tracking-widest text-lg">
            {"<DEV/>"}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleClick(item.label, item.href)}
                className={`relative px-4 py-2 text-xs tracking-wider transition-all duration-300 ${
                  active === item.label
                    ? "text-cyan-400"
                    : "text-gray-400 hover:text-cyan-300"
                }`}
              >
                {active === item.label && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md border border-cyan-400/40"
                    style={{
                      boxShadow:
                        "0 0 10px rgba(0,255,255,0.3), inset 0 0 8px rgba(0,255,255,0.15)",
                    }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          <button className="px-5 py-2 rounded-md border border-cyan-400/40 text-cyan-400 text-xs tracking-wider hover:bg-cyan-400/10 transition">
            RESUME
          </button>
        </div>
      </motion.nav>
    </>
  );
};

export default CyberNav;