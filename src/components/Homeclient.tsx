'use client'
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation";

const features = [
  {
    num: "01",
    title: "Instant responses",
    desc: "Resolve customer inquiries faster with AI-powered support that never sleeps.",
  },
  {
    num: "02",
    title: "Knowledge base integration",
    desc: "Use your own business knowledge to answer customer questions accurately.",
  },
  {
    num: "03",
    title: "Easy setup",
    desc: "Add support chat to your website in minutes with a single line of code.",
  },
];

function HomeClient({ email }: { email?: string }) {
  const router = useRouter();
 const [loading ,SetLoading]=useState(false)
  const handleLogin = () => {
    SetLoading(true)
    window.location.href = "/api/auth/login";
  };
  
  const firstletter = email?.[0]?.toUpperCase() ?? "";
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        background: "#0a0808",
        color: "#ffffff",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 300,
        overflowX: "hidden",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .home-serif { font-family: 'Instrument Serif', serif; }

        /* Noise grain overlay */
        .noise-overlay {
          position: fixed; inset: 0; z-index: 999; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
        }

        /* Background blobs */
        .blob { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
        .blob-1 { width: 600px; height: 600px; top: -150px; left: -200px; background: radial-gradient(circle, rgba(180,20,35,0.18) 0%, transparent 70%); }
        .blob-2 { width: 500px; height: 500px; bottom: -100px; right: -150px; background: radial-gradient(circle, rgba(180,20,35,0.12) 0%, transparent 70%); }
        .blob-3 { width: 350px; height: 350px; top: 40%; left: 45%; background: radial-gradient(circle, rgba(200,30,30,0.06) 0%, transparent 70%); }

        /* Nav */
        .home-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5%; height: 64px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(10,8,8,0.7);
          backdrop-filter: blur(18px);
        }
        .home-logo {
          font-family: 'Instrument Serif', serif;
          font-size: 1.25rem; letter-spacing: -0.01em; color: #fff;
        }
        .home-logo sup {
          font-family: 'DM Sans', sans-serif; font-size: 0.55rem;
          font-weight: 400; color: rgba(255,255,255,0.35);
          vertical-align: super; letter-spacing: 0.1em;
          text-transform: uppercase; margin-left: 3px;
        }
        .nav-login-btn {
          padding: 0.42rem 1.15rem;
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 4px; color: rgba(255,255,255,0.7);
          font-size: 0.78rem; font-weight: 400;
          cursor: pointer; background: transparent;
          transition: all 0.2s; letter-spacing: 0.03em;
        }
        .nav-login-btn:hover { background: rgba(255,255,255,0.06); color: #fff; border-color: rgba(255,255,255,0.3); }

        /* Avatar popup */
        .avatar-btn {
          width: 36px; height: 36px; border-radius: 50%;
          background: #c0152a; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-weight: 500; font-size: 0.85rem;
          border: none; cursor: pointer; transition: opacity 0.2s;
        }
        .avatar-btn:hover { opacity: 0.85; }

        /* Hero section */
        .hero-section {
          position: relative; z-index: 1;
          min-height: 100vh;
          display: grid; grid-template-columns: 1fr 1fr;
          align-items: center; gap: 0;
          padding: 0 5%; padding-top: 64px;
          max-width: 1360px; margin: 0 auto;
        }
        .hero-left { padding-right: 5%; }

        .hero-tag {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-size: 0.68rem; font-weight: 400; letter-spacing: 0.15em;
          text-transform: uppercase; color: rgba(255,255,255,0.35);
          margin-bottom: 2.2rem;
        }
        .hero-tag-line { width: 28px; height: 1px; background: rgba(255,255,255,0.25); }

        .hero-h1 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(3rem, 5.5vw, 5rem);
          line-height: 1.01; letter-spacing: -0.02em;
          font-weight: 400; margin-bottom: 2rem; color: #fff;
        }
        .hero-h1-em {
          font-style: italic;
          background: linear-gradient(135deg, #e8433a 0%, #ff7a6b 60%, #ffb8a0 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-body {
          font-size: 0.95rem; line-height: 1.8;
          color: rgba(255,255,255,0.38);
          max-width: 400px; margin-bottom: 2.8rem; font-weight: 300;
        }
        .hero-btns { display: flex; gap: 0.9rem; align-items: center; flex-wrap: wrap; }
        .btn-main {
          padding: 0.75rem 1.9rem;
          background: #c0152a; border: none; border-radius: 4px;
          color: #fff; font-size: 0.82rem; font-weight: 400;
          cursor: pointer; letter-spacing: 0.04em;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-main:hover { background: #a0111f; transform: translateY(-1px); }
        .btn-outline {
          padding: 0.75rem 1.9rem; background: transparent;
          border: 1px solid rgba(255,255,255,0.12); border-radius: 4px;
          color: rgba(255,255,255,0.45); font-size: 0.82rem; font-weight: 400;
          cursor: pointer; letter-spacing: 0.04em; transition: all 0.2s;
          text-decoration: none; display: inline-block;
        }
        .btn-outline:hover { border-color: rgba(255,255,255,0.28); color: rgba(255,255,255,0.75); }

        .hero-stats {
          display: flex; gap: 3rem;
          margin-top: 4rem; padding-top: 2.5rem;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .stat-n { font-family: 'Instrument Serif', serif; font-size: 2.2rem; color: #fff; line-height: 1; margin-bottom: 0.3rem; }
        .stat-n-unit { font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: rgba(255,255,255,0.25); font-weight: 300; }
        .stat-l { font-size: 0.67rem; color: rgba(255,255,255,0.25); letter-spacing: 0.1em; text-transform: uppercase; }

        /* Hero right / visual */
        .hero-right {
          position: relative; height: 560px;
          display: flex; align-items: center; justify-content: center;
        }
        .ghost-num {
          position: absolute;
          font-family: 'Instrument Serif', serif;
          font-size: 22rem; color: rgba(255,255,255,0.025);
          line-height: 1; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none; user-select: none; letter-spacing: -0.05em;
        }

        /* Orbs */
        .orb { position: absolute; border-radius: 50%; pointer-events: none; }
        .orb-1 {
          width: 180px; height: 180px; top: 10%; left: 2%;
          background: conic-gradient(from 180deg,#1a0808,#6b0f14,#c0152a,#ff7a6b,#c0152a,#6b0f14,#1a0808);
          filter: blur(1px);
          box-shadow: 0 0 60px rgba(192,21,42,0.25), inset 0 0 40px rgba(0,0,0,0.6);
        }
        .orb-1::after {
          content: ''; position: absolute; inset: 8px; border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, rgba(255,180,160,0.4) 0%, transparent 50%);
        }
        .orb-2 {
          width: 90px; height: 90px; bottom: 12%; right: 5%;
          background: conic-gradient(from 90deg,#0a0808,#3d0a10,#c0152a,#ff9e8f,#c0152a,#3d0a10,#0a0808);
          filter: blur(0.5px);
          box-shadow: 0 0 30px rgba(192,21,42,0.2), inset 0 0 20px rgba(0,0,0,0.6);
        }
        .orb-2::after {
          content: ''; position: absolute; inset: 5px; border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, rgba(255,160,140,0.35) 0%, transparent 50%);
        }

        /* Chat card 3D */
        .chat-wrap {
          position: relative;
          transform: perspective(900px) rotateY(-6deg) rotateX(3deg);
          transition: transform 0.5s ease;
        }
        .chat-wrap:hover { transform: perspective(900px) rotateY(-2deg) rotateX(1deg); }
        .chat-card {
          width: 310px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 1.4rem;
          backdrop-filter: blur(30px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04);
        }
        .card-top-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(192,21,42,0.6), transparent);
          margin: -1.4rem -1.4rem 1.2rem;
          border-radius: 16px 16px 0 0;
        }
        .card-label { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255,255,255,0.2); margin-bottom: 1.1rem; }
        .msg { padding: 0.55rem 0.85rem; border-radius: 10px; font-size: 0.8rem; line-height: 1.55; max-width: 90%; margin-bottom: 0.65rem; }
        .msg-user { background: rgba(192,21,42,0.22); border: 1px solid rgba(192,21,42,0.2); color: rgba(255,255,255,0.75); margin-left: auto; }
        .msg-bot { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.55); }
        .pill-card {
          position: absolute; bottom: -24px; right: -40px;
          background: rgba(18,12,12,0.85);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; padding: 0.7rem 1rem;
          backdrop-filter: blur(20px);
          font-size: 0.72rem; color: rgba(255,255,255,0.45);
          white-space: nowrap; box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .pill-val { font-family: 'Instrument Serif', serif; font-size: 1.3rem; color: #fff; display: block; margin-bottom: 0.1rem; }

        /* Features */
        .features-section {
          position: relative; z-index: 1;
          padding: 8rem 5%;
          max-width: 1360px; margin: 0 auto;
        }
        .section-label {
          font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: rgba(255,255,255,0.25); margin-bottom: 1.2rem;
          display: flex; align-items: center; gap: 0.7rem;
        }
        .section-label::after { content: ''; flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .section-h2 {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(2rem, 3.8vw, 3.4rem);
          font-weight: 400; line-height: 1.1; letter-spacing: -0.02em;
          color: #fff; max-width: 500px; margin-bottom: 5rem;
        }
        .section-h2 em { font-style: italic; color: rgba(255,255,255,0.35); }
        .feat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 1px; background: rgba(255,255,255,0.06); }
        .feat-item {
          background: #0a0808; padding: 2.8rem 2.2rem;
          position: relative; overflow: hidden; transition: background 0.3s;
        }
        .feat-item:hover { background: rgba(255,255,255,0.02); }
        .feat-num-label { font-family: 'Instrument Serif', serif; font-size: 0.75rem; color: rgba(255,255,255,0.2); letter-spacing: 0.08em; margin-bottom: 2.5rem; display: block; }
        .feat-title-main { font-family: 'Instrument Serif', serif; font-size: 1.45rem; font-weight: 400; color: #fff; line-height: 1.2; margin-bottom: 1rem; letter-spacing: -0.01em; }
        .feat-desc-main { font-size: 0.82rem; line-height: 1.75; color: rgba(255,255,255,0.3); font-weight: 300; }

        /* Footer */
        .home-footer {
          position: relative; z-index: 1; text-align: center; padding: 2rem 5%;
          border-top: 1px solid rgba(255,255,255,0.06);
          font-size: 0.75rem; color: rgba(255,255,255,0.18); letter-spacing: 0.04em;
        }

        @media (max-width: 820px) {
          .hero-section { grid-template-columns: 1fr; padding-top: 100px; }
          .hero-right { height: 360px; margin-top: 2rem; }
          .feat-grid { grid-template-columns: 1fr; }
          .hero-stats { gap: 2rem; }
          .ghost-num { font-size: 12rem; }
        }
      `}</style>

      {/* Noise + Blobs */}
      <div className="noise-overlay" />
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* ── NAV ── */}
      <nav className="home-nav">
        <div className="home-logo">
          SupportAI<sup>®</sup>
        </div>

        {email ? (
          <div style={{ position: "relative" }} ref={popupRef}>
            <button className="avatar-btn" onClick={() => setOpen(!open)}>
              {firstletter}
            </button>
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  style={{
                    position: "absolute", right: 0, marginTop: "12px",
                    width: "160px",
                    background: "rgba(18,12,12,0.95)",
                    border: "1px solid rgba(255,255,255,0.10)",
                    borderRadius: "10px", overflow: "hidden",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <button
                    style={{ width: "100%", textAlign: "left", padding: "0.75rem 1rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", background: "transparent", border: "none", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    onClick={() => { setOpen(false); router.push("/Dashboard"); }}
                  >
                    Dashboard
                  </button>
                  <button
                    style={{ width: "100%", textAlign: "left", padding: "0.75rem 1rem", fontSize: "0.82rem", color: "#e8433a", background: "transparent", border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button className="nav-login-btn" onClick={handleLogin} disabled={loading}>
          
            {loading?"Loading...":"Login"}
          </button>
        )}
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-section">
          {/* Left */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-tag">
              <span className="hero-tag-line" />
              AI Customer Support
            </div>

            <h1 className="hero-h1">
              AI Support<br />
              Built for<br />
              <em className="hero-h1-em">Modern</em><br />
              Websites
            </h1>

            <p className="hero-body">
              Add a powerful AI chatbot to your website in minutes.
              Let your customers get instant answers using your own business knowledge.
            </p>

            <div className="hero-btns">
              {email ? (
                <button className="btn-main" onClick={() => router.push("/Dashboard")}>
                  Go to Dashboard
                </button>
              ) : (
                <button className="btn-main" onClick={handleLogin}>
                  Get Started
                </button>
              )}
              <a href="#features" className="btn-outline">Learn More</a>
            </div>

            <div className="hero-stats">
              <div>
                <div className="stat-n">3<span className="stat-n-unit">min</span></div>
                <div className="stat-l">Setup time</div>
              </div>
              <div>
                <div className="stat-n">94<span className="stat-n-unit">%</span></div>
                <div className="stat-l">Resolution rate</div>
              </div>
              <div>
                <div className="stat-n">24<span className="stat-n-unit">/7</span></div>
                <div className="stat-l">Always online</div>
              </div>
            </div>
          </motion.div>

          {/* Right – 3D scene */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="ghost-num">AI</div>

            {/* Floating orbs */}
            <motion.div
              className="orb orb-1"
              animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
            />
            <motion.div
              className="orb orb-2"
              animate={{ y: [0, 14, 0], rotate: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
            />

            {/* Crystal shards */}
            <motion.div
              style={{ position: "absolute", bottom: "20%", left: "6%", width: 55, height: 55 }}
              animate={{ y: [0, -12, 0], rotate: [15, 25, 15] }}
              transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="27,2 52,48 2,48" fill="none" stroke="rgba(192,21,42,0.4)" strokeWidth="1" />
                <polygon points="27,10 44,44 10,44" fill="rgba(192,21,42,0.06)" stroke="rgba(255,150,140,0.2)" strokeWidth="0.5" />
              </svg>
            </motion.div>

            <motion.div
              style={{ position: "absolute", top: "14%", right: "8%", width: 36, height: 36 }}
              animate={{ y: [0, 10, 0], rotate: [-10, 0, -10] }}
              transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="6" width="24" height="24" rx="3" transform="rotate(20 18 18)" fill="rgba(192,21,42,0.05)" stroke="rgba(192,21,42,0.35)" strokeWidth="1" />
                <rect x="10" y="10" width="16" height="16" rx="2" transform="rotate(20 18 18)" fill="rgba(255,120,100,0.08)" stroke="rgba(255,150,140,0.15)" strokeWidth="0.5" />
              </svg>
            </motion.div>

            {/* 3D Chat card */}
            <div className="chat-wrap">
              <div className="chat-card">
                <div className="card-top-line" />
                <div className="card-label">Live Chat Preview</div>
                <div className="msg msg-user">Do you offer cash on delivery?</div>
                <div className="msg msg-bot">Yes, Cash On Delivery is available.</div>
                <div className="msg msg-user">What&apos;s the return window?</div>
                <div className="msg msg-bot">Returns accepted within 30 days of delivery.</div>
              </div>
              <div className="pill-card">
                <span className="pill-val">&lt; 1s</span>
                avg. response time
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="features-section">
        <div className="section-label">Why businesses choose SupportAI</div>
        <h2 className="section-h2">
          Three things that <em>make the difference</em>
        </h2>

        <div className="feat-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feat-item"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <span className="feat-num-label">{f.num}</span>
              <div className="feat-title-main">{f.title}</div>
              <p className="feat-desc-main">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="home-footer">
        &copy; {new Date().getFullYear()} SupportAI. All rights reserved.
      </footer>
    </div>
  );
}

export default HomeClient;