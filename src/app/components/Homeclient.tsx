'use client'
import React from "react";
import { motion } from "motion/react"  

function HomeClient({email}:{email:string}){
    const handleLogin=()=>{
        window.location.href="/api/auth/login"
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
                </div>
            </motion.div>
        </div>
    )  
}

export default HomeClient