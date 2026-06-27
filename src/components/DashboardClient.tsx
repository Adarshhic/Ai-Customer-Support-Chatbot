'use client'
import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { useRouter } from 'next/navigation'
import axios from 'axios'

function DashboardClient({ ownerId }: { ownerId: string }) {
  const navigate = useRouter()
  const [businessName, setBusinessName] = useState("")
  const [supportEmail, setSupportEmail] = useState("")
  const [knowledge, setKnowledge] = useState("")
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSettings = async () => {
    setLoading(true)
    try {
      const result = await axios.post("/api/settings", { ownerId, businessName, supportEmail, knowledge })
      console.log(result.data)
      setLoading(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (ownerId) {
      const handleGetDetails = async () => {
        try {
          const result = await axios.post("/api/settings/get", { ownerId })
          setBusinessName(result.data.businessName)
          setSupportEmail(result.data.supportEmail)
          setKnowledge(result.data.knowledge)
        } catch (error) {
          console.log(error)
        }
      }
      handleGetDetails()
    }
  }, [ownerId])

  return (
    <div style={{ background: "#0a0808", minHeight: "100vh", color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        /* noise */
        .dash-noise {
          position: fixed; inset: 0; z-index: 999; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.35;
        }

        /* blobs */
        .dash-blob { position: fixed; border-radius: 50%; filter: blur(90px); pointer-events: none; z-index: 0; }
        .dash-blob-1 { width: 500px; height: 500px; top: -120px; left: -180px; background: radial-gradient(circle, rgba(180,20,35,0.15) 0%, transparent 70%); }
        .dash-blob-2 { width: 400px; height: 400px; bottom: -80px; right: -120px; background: radial-gradient(circle, rgba(180,20,35,0.10) 0%, transparent 70%); }

        /* nav */
        .dash-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 5%; height: 64px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(10,8,8,0.75);
          backdrop-filter: blur(18px);
        }
        .dash-logo {
          font-family: 'Instrument Serif', serif;
          font-size: 1.2rem; letter-spacing: -0.01em; color: #fff;
          cursor: pointer;
        }
        .dash-logo sup {
          font-family: 'DM Sans', sans-serif; font-size: 0.5rem;
          font-weight: 400; color: rgba(255,255,255,0.3);
          vertical-align: super; letter-spacing: 0.1em;
          text-transform: uppercase; margin-left: 3px;
        }
        .dash-embed-btn {
          padding: 0.42rem 1.15rem;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 4px; color: rgba(255,255,255,0.55);
          font-size: 0.78rem; font-weight: 400; letter-spacing: 0.03em;
          cursor: pointer; background: transparent; transition: all 0.2s;
        }
        .dash-embed-btn:hover { background: rgba(255,255,255,0.05); color: #fff; border-color: rgba(255,255,255,0.25); }

        /* main card */
        .dash-card {
          position: relative; z-index: 1;
          width: 100%; max-width: 760px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          backdrop-filter: blur(30px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);
          overflow: hidden;
        }
        .dash-card-top-bar {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(192,21,42,0.55), transparent);
        }
        .dash-card-inner { padding: 2.8rem 3rem; }

        /* card header */
        .dash-card-eyebrow {
          font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase;
          color: rgba(255,255,255,0.25); margin-bottom: 0.6rem;
          display: flex; align-items: center; gap: 0.6rem;
        }
        .dash-card-eyebrow::before { content: ''; width: 20px; height: 1px; background: rgba(255,255,255,0.2); }
        .dash-card-title {
          font-family: 'Instrument Serif', serif;
          font-size: 2rem; font-weight: 400; letter-spacing: -0.02em;
          color: #fff; margin-bottom: 0.4rem;
        }
        .dash-card-sub { font-size: 0.85rem; color: rgba(255,255,255,0.3); margin-bottom: 2.8rem; font-weight: 300; }

        /* divider */
        .dash-divider { height: 1px; background: rgba(255,255,255,0.06); margin: 2.2rem 0; }

        /* section label */
        .dash-section-label {
          font-size: 0.68rem; letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(255,255,255,0.25); margin-bottom: 1.4rem;
        }

        /* inputs */
        .dash-input {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 8px; padding: 0.78rem 1rem;
          font-size: 0.85rem; color: rgba(255,255,255,0.75);
          font-family: 'DM Sans', sans-serif; font-weight: 300;
          outline: none; transition: border-color 0.2s, background 0.2s;
          margin-bottom: 0.85rem;
        }
        .dash-input::placeholder { color: rgba(255,255,255,0.2); }
        .dash-input:focus { border-color: rgba(192,21,42,0.45); background: rgba(255,255,255,0.06); }

        .dash-textarea {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 8px; padding: 0.78rem 1rem;
          font-size: 0.85rem; color: rgba(255,255,255,0.75);
          font-family: 'DM Sans', sans-serif; font-weight: 300;
          outline: none; transition: border-color 0.2s, background 0.2s;
          resize: vertical; min-height: 200px; line-height: 1.7;
        }
        .dash-textarea::placeholder { color: rgba(255,255,255,0.18); }
        .dash-textarea:focus { border-color: rgba(192,21,42,0.45); background: rgba(255,255,255,0.06); }

        /* kb hint */
        .dash-kb-hint {
          font-size: 0.75rem; color: rgba(255,255,255,0.2);
          margin-bottom: 1rem; line-height: 1.6;
        }

        /* save btn */
        .dash-save-btn {
          padding: 0.72rem 2rem;
          background: #c0152a; border: none; border-radius: 4px;
          color: #fff; font-size: 0.82rem; font-weight: 400; letter-spacing: 0.04em;
          cursor: pointer; transition: background 0.2s, transform 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .dash-save-btn:hover:not(:disabled) { background: #a0111f; transform: translateY(-1px); }
        .dash-save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        .dash-saved-msg {
          font-size: 0.8rem; color: rgba(100,220,130,0.85);
          display: flex; align-items: center; gap: 0.4rem; font-weight: 400;
        }

        @media (max-width: 640px) {
          .dash-card-inner { padding: 2rem 1.5rem; }
        }
      `}</style>

      {/* Noise + Blobs */}
      <div className="dash-noise" />
      <div className="dash-blob dash-blob-1" />
      <div className="dash-blob dash-blob-2" />

      {/* ── NAV ── */}
      <motion.nav
        className="dash-nav"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="dash-logo" onClick={() => navigate.push("/")}>
          SupportAI<sup>®</sup>
        </div>
        <button className="dash-embed-btn" onClick={() => navigate.push("/embed")}>
          Embed ChatBot
        </button>
      </motion.nav>

      {/* ── CONTENT ── */}
      <div style={{ display: "flex", justifyContent: "center", padding: "6rem 1.5rem 4rem", position: "relative", zIndex: 1 }}>
        <motion.div
          className="dash-card"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="dash-card-top-bar" />
          <div className="dash-card-inner">

            {/* Header */}
            <div className="dash-card-eyebrow">Configuration</div>
            <h1 className="dash-card-title">ChatBot Settings</h1>
            <p className="dash-card-sub">Manage your AI chatbot knowledge and business details</p>

            {/* Business Details */}
            <div className="dash-section-label">Business Details</div>
            <input
              className="dash-input"
              type="text"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            <input
              className="dash-input"
              type="text"
              placeholder="Support Email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
            />

            <div className="dash-divider" />

            {/* Knowledge Base */}
            <div className="dash-section-label">Knowledge Base</div>
            <p className="dash-kb-hint">
              Add FAQs, policies, delivery info, refunds, and anything your AI should know.
            </p>
            <textarea
              className="dash-textarea"
              placeholder={`Example:\n• Refund policy: 7 days return available\n• Delivery time: 3–5 working days\n• Cash on Delivery available\n• Support hours: Mon–Fri 9am–6pm`}
              value={knowledge}
              onChange={(e) => setKnowledge(e.target.value)}
            />

            <div className="dash-divider" />

            {/* Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
              <motion.button
                className="dash-save-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
                onClick={handleSettings}
              >
                {loading ? "Saving…" : "Save Settings"}
              </motion.button>

              {saved && (
                <motion.span
                  className="dash-saved-msg"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ✓ Settings saved
                </motion.span>
              )}
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DashboardClient