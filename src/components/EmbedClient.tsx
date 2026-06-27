'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { motion } from "motion/react"

function EmbedClient({ ownerId }: { ownerId: string }) {
  const navigate = useRouter()
  const [copied, setCopied] = useState(false)

  const embedCode = `<script 
  src="${process.env.NEXT_PUBLIC_APP_URL}/chatBot.js" 
  data-owner-id="${ownerId}">
</script>`

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ background: "#0a0808", minHeight: "100vh", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        .embed-noise {
          position: fixed; inset: 0; z-index: 999; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
        }
        .embed-blob { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
        .embed-blob-1 { width: 500px; height: 500px; top: -120px; left: -180px; background: radial-gradient(circle, rgba(180,20,35,0.15) 0%, transparent 70%); }
        .embed-blob-2 { width: 400px; height: 400px; bottom: -80px; right: -120px; background: radial-gradient(circle, rgba(180,20,35,0.10) 0%, transparent 70%); }

        /* nav */
        .embed-nav {
          position: sticky; top: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5%; height: 64px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(10,8,8,0.75);
          backdrop-filter: blur(18px);
        }
        .embed-logo {
          font-family: 'Instrument Serif', serif;
          font-size: 1.2rem; letter-spacing: -0.01em; color: #fff; cursor: pointer;
        }
        .embed-logo sup {
          font-family: 'DM Sans', sans-serif; font-size: 0.5rem; font-weight: 400;
          color: rgba(255,255,255,0.3); vertical-align: super;
          letter-spacing: 0.1em; text-transform: uppercase; margin-left: 3px;
        }
        .embed-back-btn {
          padding: 0.42rem 1.15rem;
          border: 1px solid rgba(255,255,255,0.12); border-radius: 4px;
          color: rgba(255,255,255,0.55); font-size: 0.78rem; font-weight: 400;
          letter-spacing: 0.03em; cursor: pointer; background: transparent; transition: all 0.2s;
        }
        .embed-back-btn:hover { background: rgba(255,255,255,0.05); color: #fff; border-color: rgba(255,255,255,0.25); }

        /* main card */
        .embed-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 860px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          backdrop-filter: blur(30px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);
          overflow: hidden;
        }
        .embed-card-top-bar {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(192,21,42,0.55), transparent);
        }
        .embed-card-inner { padding: 2.8rem 3rem; }

        .embed-eyebrow {
          font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.25); margin-bottom: 0.6rem;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .embed-eyebrow::before { content: ''; width: 20px; height: 1px; background: rgba(255,255,255,0.2); }
        .embed-title {
          font-family: 'Instrument Serif', serif;
          font-size: 2rem; font-weight: 400; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 0.4rem;
        }
        .embed-sub { font-size: 0.85rem; color: rgba(255,255,255,0.3); margin-bottom: 2.4rem; font-weight: 300; }
        .embed-sub code {
          font-family: 'DM Mono', 'Fira Mono', monospace;
          background: rgba(192,21,42,0.15); border: 1px solid rgba(192,21,42,0.2);
          padding: 0.1em 0.4em; border-radius: 4px;
          color: rgba(255,130,120,0.9); font-size: 0.8rem;
        }

        /* code block */
        .embed-code-wrap {
          position: relative;
          background: rgba(0,0,0,0.45);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px; padding: 1.4rem 1.4rem 1.4rem 1.6rem;
          margin-bottom: 2.4rem;
          overflow: hidden;
        }
        .embed-code-wrap::before {
          content: '';
          position: absolute; top: 0; left: 0; bottom: 0; width: 2px;
          background: linear-gradient(180deg, #c0152a, transparent);
        }
        .embed-code-wrap pre {
          font-family: 'DM Mono', 'Fira Mono', 'Courier New', monospace;
          font-size: 0.8rem; color: rgba(255,255,255,0.55);
          line-height: 1.8; overflow-x: auto; white-space: pre;
        }
        .embed-copy-btn {
          position: absolute; top: 0.85rem; right: 0.85rem;
          padding: 0.35rem 0.85rem;
          background: rgba(192,21,42,0.18); border: 1px solid rgba(192,21,42,0.3);
          border-radius: 4px; color: rgba(255,150,140,0.9);
          font-size: 0.72rem; font-weight: 400; letter-spacing: 0.04em;
          cursor: pointer; transition: all 0.2s;
        }
        .embed-copy-btn:hover { background: rgba(192,21,42,0.3); color: #fff; }
        .embed-copy-btn.copied { background: rgba(60,180,100,0.15); border-color: rgba(60,180,100,0.3); color: rgba(100,220,130,0.85); }

        /* steps */
        .embed-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 2.2rem 0; }
        .embed-section-label {
          font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.25); margin-bottom: 1.2rem;
        }
        .embed-steps { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
        .embed-step {
          display: flex; align-items: center; gap: 1rem;
          font-size: 0.85rem; color: rgba(255,255,255,0.4); font-weight: 300;
        }
        .embed-step-num {
          width: 24px; height: 24px; border-radius: 50%; flex-shrink: 0;
          border: 1px solid rgba(192,21,42,0.35);
          background: rgba(192,21,42,0.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.68rem; color: rgba(255,130,120,0.7); font-weight: 400;
        }

        /* preview */
        .embed-preview-shell {
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; overflow: hidden;
          background: rgba(0,0,0,0.3);
        }
        .embed-browser-bar {
          display: flex; align-items: center; gap: 0.45rem;
          padding: 0 1rem; height: 36px;
          background: rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .browser-dot { width: 9px; height: 9px; border-radius: 50%; }
        .browser-url {
          margin-left: 0.7rem; font-size: 0.68rem;
          color: rgba(255,255,255,0.2); letter-spacing: 0.03em;
        }
        .embed-preview-body {
          position: relative; height: 280px; padding: 1.5rem;
          font-size: 0.78rem; color: rgba(255,255,255,0.1);
          letter-spacing: 0.04em; text-transform: uppercase;
        }

        /* mini chatbot */
        .mini-chat-window {
          position: absolute; bottom: 70px; right: 1.5rem;
          width: 230px;
          background: rgba(14,10,10,0.92);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px; overflow: hidden;
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
          backdrop-filter: blur(20px);
        }
        .mini-chat-header {
          background: #c0152a;
          padding: 0.55rem 0.85rem;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 0.72rem; font-weight: 400; color: rgba(255,255,255,0.9);
          letter-spacing: 0.04em;
        }
        .mini-chat-body { padding: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .mini-bubble { padding: 0.45rem 0.75rem; border-radius: 8px; font-size: 0.72rem; line-height: 1.5; max-width: 85%; }
        .mini-bubble-bot { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); }
        .mini-bubble-user { background: rgba(192,21,42,0.22); border: 1px solid rgba(192,21,42,0.2); color: rgba(255,255,255,0.65); margin-left: auto; }

        .mini-fab {
          position: absolute; bottom: 1.2rem; right: 1.5rem;
          width: 46px; height: 46px; border-radius: 50%;
          background: #c0152a;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          box-shadow: 0 8px 24px rgba(192,21,42,0.4);
          cursor: pointer;
        }

        @media (max-width: 640px) {
          .embed-card-inner { padding: 2rem 1.5rem; }
        }
      `}</style>

      {/* Noise + Blobs */}
      <div className="embed-noise" />
      <div className="embed-blob embed-blob-1" />
      <div className="embed-blob embed-blob-2" />

      {/* ── NAV ── */}
      <nav className="embed-nav">
        <div className="embed-logo" onClick={() => navigate.push("/")}>
          SupportAI<sup>®</sup>
        </div>
        <button className="embed-back-btn" onClick={() => navigate.push("/Dashboard")}>
          ← Back to Dashboard
        </button>
      </nav>

      {/* ── CONTENT ── */}
      <div style={{ display: "flex", justifyContent: "center", padding: "4rem 1.5rem", position: "relative", zIndex: 1 }}>
        <motion.div
          className="embed-card"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="embed-card-top-bar" />
          <div className="embed-card-inner">

            {/* Header */}
            <div className="embed-eyebrow">Integration</div>
            <h1 className="embed-title">Embed ChatBot</h1>
            <p className="embed-sub">
              Copy and paste this snippet before the closing <code>&lt;/body&gt;</code> tag on your website.
            </p>

            {/* Code Block */}
            <div className="embed-code-wrap">
              <pre>{embedCode}</pre>
              <button
                className={`embed-copy-btn${copied ? " copied" : ""}`}
                onClick={copyCode}
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>

            {/* Steps */}
            <div className="embed-section-label">Installation Steps</div>
            <ol className="embed-steps">
              {[
                "Copy the embed script above",
                "Paste it before the closing </body> tag of your site",
                "Save and reload your website — the chatbot appears instantly",
              ].map((step, i) => (
                <li className="embed-step" key={i}>
                  <span className="embed-step-num">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="embed-divider" />

            {/* Live Preview */}
            <div className="embed-section-label">Live Preview</div>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.25)", marginBottom: "1.2rem", fontWeight: 300 }}>
              This is how the chatbot will appear on your website
            </p>

            <div className="embed-preview-shell">
              {/* Browser chrome */}
              <div className="embed-browser-bar">
                <span className="browser-dot" style={{ background: "rgba(255,100,100,0.5)" }} />
                <span className="browser-dot" style={{ background: "rgba(255,190,80,0.5)" }} />
                <span className="browser-dot" style={{ background: "rgba(80,200,120,0.5)" }} />
                <span className="browser-url">your-website.com</span>
              </div>

              {/* Website body */}
              <div className="embed-preview-body">
                Your website content

                {/* Mini chat window */}
                <div className="mini-chat-window">
                  <div className="mini-chat-header">
                    <span>Customer Support</span>
                    <span style={{ opacity: 0.6, fontSize: "0.65rem" }}>✕</span>
                  </div>
                  <div className="mini-chat-body">
                    <div className="mini-bubble mini-bubble-bot">Hi! How can I help you?</div>
                    <div className="mini-bubble mini-bubble-user">What is the return policy?</div>
                  </div>
                </div>

                {/* FAB */}
                <motion.div
                  className="mini-fab"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  🗨️
                </motion.div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default EmbedClient