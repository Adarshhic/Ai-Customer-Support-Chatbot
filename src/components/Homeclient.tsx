'use client'
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "motion/react"
import { useRouter } from "next/navigation";

const features = [
  {
    title: "Instant responses",
    desc: "Resolve customer inquiries faster with AI-powered support."
  },
  {
    title: "Knowledge base integration",
    desc: "Use your own business knowledge to answer customer questions."
  },
  {
    title: "Easy setup",
    desc: "Add support chat to your website in minutes."
  }
];

function HomeClient({ email }: { email?: string }) {
    const router = useRouter()

    const handleLogin = () => {
        window.location.href = "/api/auth/login"
    }


    const firstletter = email?.[0]?.toUpperCase() ?? ""
    const [open, setOpen] = useState(false)
    const popupRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node))
                setOpen(false)
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [])
 
        const handleLogout=async ()=>{
        try {
            const result=await axios.get("/api/auth/logout")
            window.location.href = "/"
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen overflow-x-hidden" style={{
            background: 'linear-gradient(135deg, #c0152a 0%, #8b0a1a 50%, #4a0510 100%)',
            color: '#FFFFFF',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
        }}>
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b"
                style={{ backgroundColor: 'rgba(254, 46, 75, 0.15)', borderColor: 'rgba(255, 255, 255, 0.15)' }}
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div
                        className="text-lg tracking-tight"
                        style={{
                            color: '#FFFFFF',
                            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                            fontWeight: 600
                        }}
                    >
                        Support <span style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 400 }}>AI</span>
                    </div>
                    {email ? (
                        <div className="relative" ref={popupRef}>
                            <button
                                className="w-10 h-10 rounded-full bg-black text-white
                                 flex items-center justify-center
                                  font-semibold hover:scale-105 transition"
                                onClick={() => setOpen(!open)}
                            >
                                {firstletter}
                            </button>
                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        className="absolute right-0 mt-3 w-44 bg-white rounded-xl
                                          shadow-xl border
                                           border-zinc-300 overflow-hidden"
                                    >
                                        <button
                                            className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-100"
                                            onClick={() => {
                                                setOpen(false)
                                                router.push("/Dashboard")
                                            }}
                                        >
                                            Dashboard
                                        </button>
                                        <button
                                            className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-zinc-100"
                                            onClick={handleLogout}
                                        >
                                            Logout
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <button
                            className="px-5 py-2 rounded-full text-sm transition disabled:opacity-60 flex items-center gap-2"
                            style={{
                                backgroundColor: '#0F0E0E',
                                color: '#FFFFFF',
                                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                                fontWeight: 500
                            }}
                            onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#161316')}
                            onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#0F0E0E')}
                            onClick={handleLogin}
                        >
                            Login
                        </button>
                    )}
                </div>
            </motion.div>

            <section className="pt-36 pb-28 px-6">
                <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center'>
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <h1 className='text-4xl md:text-5xl font-semibold leading-tight'>
                            AI Customer Support <br />
                            Built for Modern Websites
                        </h1>
                        <p className='mt-6 text-lg text-zinc-600 max-w-xl'>
                            Add a powerful AI chatbot to your website in minutes.
                            Let your customers get instant answers using your own business knowledge.
                        </p>
                        <div className='mt-10 flex gap-4'>
                            {email ? (
                                <button
                                    className='px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60'
                                    onClick={() => router.push("/Dashboard")}
                                >
                                    Go to Dashboard
                                </button>
                            ) : (
                                <button
                                    className='px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60'
                                    onClick={handleLogin}
                                >
                                    Get Started
                                </button>
                            )}

                            <a href='#feature' className='px-7 py-3 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition'>
                                Learn More
                            </a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="relative"
                    >
                        <div className='rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6'>
                            <div className='text-sm text-zinc-500 mb-3'>Live Chat Preview</div>
                            <div className='space-y-3'>
                                <div className='bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit'>
                                    Do you offer cash on delivery?
                                </div>
                                <div className='bg-zinc-100 rounded-lg px-4 py-2 text-sm w-fit'>
                                    yes, Cash On Delivery is available.
                                </div>
                            </div>
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="absolute -bottom-6 -right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl"
                            >
                                🗨️
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section id='feature' className="bg-zinc-50 py-28 px-6 border-t border-zinc-200">
                <div className='max-w-6xl mx-auto'>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5 }}
                        className='text-3xl font-semibold text-center'
                    >
                        Why Businesses Choose SupportAI
                    </motion.h2>

                    <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-10'>
                        {features.map((f, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: false }}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-zinc-200"
                            >
                                <h1 className='text-lg font-medium'>{f.title}</h1>
                                <p className='mt-3 text-zinc-600 text-sm'>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className='py-10 text-center text-sm text-zinc-500'>
                &copy; {new Date().getFullYear()} SupportAI. All rights reserved.
            </footer>
        </div>
    )
}

export default HomeClient