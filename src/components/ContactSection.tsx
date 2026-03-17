import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { Rocket } from "lucide-react";

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
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<"success" | "error" | null>(null);

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

  // ✅ FIXED HANDLE SUBMIT
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setStatus("> transmitting...");

    emailjs
      .send(
        "service_gvh6yq",      // 🔴 replace
        "template_8dx6xbn",     // 🔴 replace
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "-AysFJ5BXQWqFG48c"       // 🔴 replace
      )
      .then(() => {
        setLoading(false);
        setStatus("> transmission_successful ✓");

        setPopupType("success");
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          setPopupType(null);
        }, 3000);

        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setLoading(false);
        setStatus("> transmission_failed ✗");

        setPopupType("error");
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
          setPopupType(null);
        }, 3000);
      });
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

            <span className="mono-text text-[10px] ml-3" style={{ color: "rgba(255,255,255,0.5)" }}>
              ~/transmission_terminal
            </span>

            <span className="mono-text text-[10px] ml-auto" style={{ color: "rgba(0,229,255,0.4)" }}>
              bash
            </span>
          </div>

          {/* Boot Sequence */}
          <div className="px-6 pt-4 pb-3 space-y-1" style={{ borderBottom: "1px solid rgba(0,229,255,0.08)" }}>
            {visible &&
              codeLines.map((line, i) => (
                <TypingLine key={i} text={line} delay={i * 600} />
              ))}
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">

            {/* NAME */}
            <div>
              <label className="mono-text text-[10px] block mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span style={{ color: "#00e5ff" }}>$</span> set IDENTIFIER
              </label>
              <input
                type="text"
                placeholder=">> enter_name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-md bg-[#0b1224] outline-none"
                style={{ border: "1px solid rgba(0,229,255,0.15)", color: "#e6f7ff" }}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mono-text text-[10px] block mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
                <span style={{ color: "#00e5ff" }}>$</span> set FREQUENCY
              </label>
              <input
                type="email"
                placeholder=">> your@signal.freq"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-md bg-[#0b1224] outline-none"
                style={{ border: "1px solid rgba(0,229,255,0.15)", color: "#e6f7ff" }}
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="mono-text text-[10px] block mb-2" style={{ color: "rgba(255,255,255,0.6)" }}>
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
                disabled={loading}
                className="flex-1 py-4 rounded-md font-mono text-sm tracking-wider transition-all duration-300 cursor-pointer"
                style={{
                  background: "linear-gradient(90deg, rgba(0,229,255,0.2), rgba(168,85,247,0.3))",
                  border: "1px solid rgba(0,229,255,0.4)",
                  color: "#00e5ff",
                  opacity: loading ? 0.6 : 1,
                }}
              >
                {loading ? ">> TRANSMITTING..." : "$ TRANSMIT --force"}
              </button>

              <div className="mono-text text-[9px]" style={{ color: "rgba(0,229,255,0.5)" }}>
                <div>LATENCY: 12ms</div>
                <div>UPLINK: ACTIVE</div>
              </div>
            </div>

            {/* STATUS */}
            {status && (
              <div className="mono-text text-[10px]" style={{ color: "#00e5ff" }}>
                {status}
              </div>
            )}

            {/* LOADING SPINNER */}
            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                <span className="mono-text text-[10px]" style={{ color: "#00e5ff" }}>
                  encrypting & sending...
                </span>
              </div>
            )}
          </form>

          {/* Bottom Status */}
          <div className="px-6 py-3 flex justify-between text-[9px]" style={{
            borderTop: "1px solid rgba(0,229,255,0.08)",
            color: "rgba(255,255,255,0.3)",
          }}>
            <span>CONNECTION: ENCRYPTED</span>
            <span>PACKETS: 0/0</span>
            <span>█████████░ 90%</span>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className="px-6 py-4 rounded-md font-mono text-sm flex items-center gap-3 animate-slideIn glitch"
            style={{
              background: "rgba(8,14,28,0.95)",
              border:
                popupType === "success"
                  ? "1px solid rgba(0,229,255,0.4)"
                  : "1px solid rgba(255,80,80,0.4)",
              color: popupType === "success" ? "#00e5ff" : "#ff4d4d",
              boxShadow:
                popupType === "success"
                  ? "0 0 20px rgba(0,229,255,0.3)"
                  : "0 0 20px rgba(255,80,80,0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            {popupType === "success" ? (
              <>
                <Rocket size={18} />
                <span>SIGNAL TRANSMITTED</span>
              </>
            ) : (
              <>
                <span>⚠</span>
                <span>TRANSMISSION FAILED</span>
              </>
            )}
          </div>
        </div>
      )}

    </section>
  );
}