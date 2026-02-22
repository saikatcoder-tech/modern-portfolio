import { useState, useEffect, useRef } from "react";

const codeLines = [
  "> initializing secure channel...",
  "> encryption: AES-256-GCM ✓",
  "> protocol: QUANTUM_MESH v3.2",
  "> status: awaiting_input",
];

function TypingLine({ text, delay }: { text: string; delay: number }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 20);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <div
      className="mono-text text-[11px]"
      style={{ color: "rgba(0,229,255,0.6)" }}
    >
      {displayed}
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Signal transmitted! (Demo only)");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-6"
    >
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-20">
          <p
            className="text-xs tracking-[0.35em] uppercase mb-4"
            style={{ color: "#00e5ff" }}
          >
            SIGNAL TRANSMISSION
          </p>

          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{
              background: "linear-gradient(90deg, #a855f7 0%, #d946ef 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Contact
          </h2>
        </div>

        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{
            background: "rgba(8,14,28,0.8)",
            border: "1px solid rgba(0,229,255,0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: "14px",
            boxShadow: "0 0 40px rgba(0,229,255,0.08)",
          }}
        >
          {/* Terminal Header */}
          <div
            style={{
              borderBottom: "1px solid rgba(0,229,255,0.12)",
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "hsl(0 80% 55%)" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "hsl(45 100% 55%)", marginLeft: 6 }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "hsl(140 70% 45%)", marginLeft: 6 }} />

            <span
              className="mono-text text-[10px] ml-3"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              ~/transmission_terminal
            </span>

            <span
              className="mono-text text-[10px] ml-auto"
              style={{ color: "rgba(0,229,255,0.4)" }}
            >
              bash
            </span>
          </div>

          {/* Boot Sequence */}
          <div
            className="px-6 pt-4 pb-3 space-y-1"
            style={{ borderBottom: "1px solid rgba(0,229,255,0.08)" }}
          >
            {visible &&
              codeLines.map((line, i) => (
                <TypingLine key={i} text={line} delay={i * 600} />
              ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">

            {/* NAME */}
            <div>
              <label
                className="mono-text text-[10px] block mb-2"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <span style={{ color: "#00e5ff" }}>$</span> set IDENTIFIER
              </label>
              <input
                type="text"
                placeholder=">> enter_name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-md bg-[#0b1224] outline-none"
                style={{
                  border: "1px solid rgba(0,229,255,0.15)",
                  color: "#e6f7ff",
                }}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                className="mono-text text-[10px] block mb-2"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <span style={{ color: "#00e5ff" }}>$</span> set FREQUENCY
              </label>
              <input
                type="email"
                placeholder=">> your@signal.freq"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-md bg-[#0b1224] outline-none"
                style={{
                  border: "1px solid rgba(0,229,255,0.15)",
                  color: "#e6f7ff",
                }}
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label
                className="mono-text text-[10px] block mb-2"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                <span style={{ color: "#00e5ff" }}>$</span> compose TRANSMISSION
              </label>
              <textarea
                rows={5}
                placeholder=">> begin_message..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-md resize-none bg-[#0b1224] outline-none"
                style={{
                  border: "1px solid rgba(0,229,255,0.15)",
                  color: "#e6f7ff",
                  fontFamily: "'Share Tech Mono', monospace",
                }}
              />
            </div>

            {/* BUTTON */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="flex-1 py-4 rounded-md font-mono text-sm tracking-wider transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(0,229,255,0.2), rgba(168,85,247,0.3))",
                  border: "1px solid rgba(0,229,255,0.4)",
                  color: "#00e5ff",
                }}
              >
                $ TRANSMIT --force
              </button>

              <div
                className="mono-text text-[9px]"
                style={{ color: "rgba(0,229,255,0.5)" }}
              >
                <div>LATENCY: 12ms</div>
                <div>UPLINK: ACTIVE</div>
              </div>
            </div>
          </form>

          {/* Bottom Status */}
          <div
            className="px-6 py-3 flex justify-between text-[9px]"
            style={{
              borderTop: "1px solid rgba(0,229,255,0.08)",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            <span>CONNECTION: ENCRYPTED</span>
            <span>PACKETS: 0/0</span>
            <span>█████████░ 90%</span>
          </div>
        </div>
      </div>
    </section>
  );
}