import React, { useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoginModal from '../components/LoginModal'

function Features() {
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)
    const [openLogin, setOpenLogin] = useState(false)

    const steps = [
        {
            title: "Create your workspace",
            desc: "Sign in to access your dashboard and start a new project in seconds."
        },
        {
            title: "Describe your site",
            desc: "Enter a clear prompt and let the AI generate a complete layout and structure."
        },
        {
            title: "Refine with AI",
            desc: "Use the chat panel to request changes, new sections, or styling updates."
        },
        {
            title: "Edit code directly",
            desc: "Open the editor to fine tune HTML, CSS, and layout details."
        },
        {
            title: "Preview and deploy",
            desc: "Check the live preview, then deploy and share your site in one click."
        }
    ]

    const features = [
        {
            title: "AI website generation",
            desc: "Generate production ready pages with clean structure and layout."
        },
        {
            title: "Prompt driven updates",
            desc: "Request changes in plain language and keep creative momentum."
        },
        {
            title: "Live preview",
            desc: "See updates instantly as you edit, with a full screen preview option."
        },
        {
            title: "Code editor",
            desc: "Refine details with direct code access when you need precision."
        },
        {
            title: "Responsive by default",
            desc: "Layouts adapt across devices without extra work."
        },
        {
            title: "Deploy and share",
            desc: "Publish in one click and send a live link to your team or clients."
        },
        {
            title: "Project dashboard",
            desc: "Manage all your generated sites from one place."
        },
        {
            title: "Secure accounts",
            desc: "Authenticated access and user profiles keep projects organized."
        }
    ]

    return (
        <div className='relative min-h-screen bg-[#0C0414] text-white overflow-hidden'>
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:ital,wght@0,400..700;1,400..700&display=swap');
          h1{
            font-family: "Ibarra Real Nova", serif;
          }
          p, a, button{
            font-family: 'Inter', sans-serif;
          }
          
          @keyframes shine {
              0% {
                  background-position: 0% 50%;
              }
              50% {
                  background-position: 100% 50%;
              }
              100% {
                  background-position: 0% 50%;
              }
          }
          
          .button-bg {
              background: conic-gradient(from 0deg, #00F5FF, #000, #000, #00F5FF, #000, #000, #000, #00F5FF);
              background-size: 300% 300%;
              animation: shine 6s ease-out infinite;
          }
        `}
            </style>

            <header className='flex flex-col items-center bg-[#0C0414] text-white pb-8'>
                <nav className="flex flex-col items-center w-full">
                    <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
                        <a href="/">
                            <svg width="157" height="40" viewBox="0 0 157 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M47.904 28.28q-1.54 0-2.744-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.82 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.868 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.456.924-3.276.924m-7.196 5.32V14.56h3.08v3.612l-.532 3.276.532 3.248V33.6zm6.692-8.232q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128t.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.868.504 1.988.504M56.95 28V14.56h3.08V28zm3.08-7.476-1.064-.532q0-2.548 1.12-4.116 1.148-1.596 3.444-1.596 1.008 0 1.82.364.812.365 1.512 1.176l-2.016 2.072a2.1 2.1 0 0 0-.812-.56 3 3 0 0 0-1.036-.168q-1.287 0-2.128.812-.84.811-.84 2.548m14.156 7.756q-2.016 0-3.64-.896a7 7 0 0 1-2.548-2.52q-.924-1.596-.924-3.584t.924-3.556a6.87 6.87 0 0 1 2.492-2.52q1.596-.924 3.528-.924 1.876 0 3.304.868a6.05 6.05 0 0 1 2.268 2.38q.84 1.512.84 3.444 0 .336-.056.7a7 7 0 0 1-.112.756H69.23v-2.52h9.436l-1.148 1.008q-.056-1.232-.476-2.072a3 3 0 0 0-1.204-1.288q-.756-.448-1.876-.448-1.176 0-2.044.504a3.43 3.43 0 0 0-1.344 1.428q-.476.896-.476 2.156t.504 2.212 1.428 1.484q.924.504 2.128.504 1.037 0 1.904-.364a4 4 0 0 0 1.512-1.064l1.96 1.988a6.3 6.3 0 0 1-2.38 1.736 7.6 7.6 0 0 1-2.968.588m15.91 0q-1.54 0-2.745-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.821 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.869 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.455.924-3.276.924M82.898 28V7.84h3.08v10.024l-.532 3.248.532 3.276V28zm6.692-2.632q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128.001 1.204.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.87.504 1.988.504m15.067 2.912q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.644.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.976-.28V14.56h3.08V28zm1.54-15.904q-.783 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.813 0 1.316.532t.504 1.316q0 .784-.504 1.316t-1.316.532M120.169 28V7.84h3.08V28zm8.552 0V8.96h3.08V28zm-3.22-10.64v-2.8h9.52v2.8zm17.274 10.92q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.643.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.977-.28V14.56h3.08V28zm1.54-15.904q-.785 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.812 0 1.316.532t.504 1.316-.504 1.316-1.316.532" fill="white" /><path d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3.01 3.01 0 0 0 1.5-2.585" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                        <div className="flex items-center gap-6 text-sm">
                            <a href="/features" className="text-white">Features</a>
                            <a href="/pricing" className="text-zinc-400 hover:text-white">Pricing</a>
                            {userData && (
                                <button onClick={() => navigate("/dashboard")} className="text-zinc-400 hover:text-white transition">Dashboard</button>
                            )}
                        </div>
                        {!userData ? (
                            <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
                                <button className="px-6 py-2.5 text-sm text-white rounded-full font-medium bg-gray-800" onClick={() => setOpenLogin(true)}>
                                    Create account
                                </button>
                            </div>
                        ) : (
                            <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
                                <button className="px-6 py-2.5 text-sm text-white rounded-full font-medium bg-gray-800" onClick={() => navigate("/dashboard")}>
                                    Go to dashboard
                                </button>
                            </div>
                        )}
                    </div>
                </nav>

                <div className="p-px rounded-full bg-linear-to-r from-indigo-900 to-[#5F5F5F] mt-24">
                    <div className="flex flex-wrap items-center justify-center gap-2 p-2 px-4 rounded-full bg-[#0C0414]">
                        <p className="text-sm text-slate-200">How it works</p>
                    </div>
                </div>

                <h1 className="text-4xl md:text-[64px]/[72px] text-center max-w-4xl mt-6 bg-linear-to-r from-[#231233] via-[#F5F5F5] to-[#231233] text-transparent bg-clip-text leading-tight px-4">
                    Everything you need to build with AI
                </h1>
                <p className="text-sm md:text-base bg-linear-to-r from-[#231233] via-[#F5F5F5] to-[#231233] text-transparent bg-clip-text text-center max-w-2xl mt-4 px-4">
                    Learn the workflow, explore the tools, and move from idea to live site in minutes.
                </p>

                <div className='flex gap-3 mt-7'>
                    <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
                        <button className="px-6 py-3 text-xs md:text-sm text-white rounded-full font-medium bg-gray-800" onClick={() => userData ? navigate("/dashboard") : setOpenLogin(true)}>
                            Start Building
                        </button>
                    </div>
                    <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
                        <button className="px-6 py-3 text-xs md:text-sm text-white rounded-full font-medium bg-gray-800" onClick={() => navigate("/pricing")}> 
                            View Pricing
                        </button>
                    </div>
                </div>
            </header>

            <section className='max-w-6xl mx-auto px-6 md:px-10 pt-10 pb-10'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-2xl md:text-3xl font-semibold'>How to use AETHER</h2>
                    <p className='text-sm text-zinc-400 max-w-md'>Follow this simple flow to get to a live website faster.</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.05 }}
                            className='rounded-2xl border border-white/10 bg-white/5 p-6'
                        >
                            <div className='text-xs text-zinc-400 mb-2'>Step {i + 1}</div>
                            <h3 className='text-lg font-semibold mb-2'>{step.title}</h3>
                            <p className='text-sm text-zinc-400'>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className='max-w-6xl mx-auto px-6 md:px-10 py-12'>
                <div className='flex items-center justify-between mb-8'>
                    <h2 className='text-2xl md:text-3xl font-semibold'>All core features</h2>
                    <p className='text-sm text-zinc-400 max-w-md'>Every tool is designed to help you ship faster without losing control.</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.04 }}
                            className='rounded-2xl border border-white/10 bg-white/5 p-6'
                        >
                            <h3 className='text-base font-semibold mb-2'>{feature.title}</h3>
                            <p className='text-sm text-zinc-400'>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className='max-w-6xl mx-auto px-6 md:px-10 py-12'>
                <div className='rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 md:p-12'>
                    <h2 className='text-2xl md:text-3xl font-semibold mb-3'>Tips for great results</h2>
                    <p className='text-sm text-zinc-400 mb-6'>Use these simple guidelines to get higher quality output every time.</p>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <div className='bg-white/5 border border-white/10 rounded-2xl p-5'>
                            <h3 className='text-base font-semibold mb-2'>Be specific</h3>
                            <p className='text-sm text-zinc-400'>Mention style, color theme, sections, and any required functionality.</p>
                        </div>
                        <div className='bg-white/5 border border-white/10 rounded-2xl p-5'>
                            <h3 className='text-base font-semibold mb-2'>Iterate fast</h3>
                            <p className='text-sm text-zinc-400'>Use the AI chat to refine sections instead of starting over.</p>
                        </div>
                        <div className='bg-white/5 border border-white/10 rounded-2xl p-5'>
                            <h3 className='text-base font-semibold mb-2'>Finish in editor</h3>
                            <p className='text-sm text-zinc-400'>Use code edits for precision tweaks and custom additions.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='max-w-5xl mx-auto px-6 md:px-10 pb-20'>
                <div className='rounded-3xl border border-white/10 bg-[#0C0414]/80 p-8 md:p-12 text-center'>
                    <h2 className='text-2xl md:text-3xl font-semibold mb-3'>Ready to build your next site?</h2>
                    <p className='text-sm text-zinc-400 mb-6'>Go from idea to live URL in a few minutes with AI powered tools.</p>
                    <div className='flex flex-col sm:flex-row gap-3 justify-center'>
                        <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
                            <button className="px-6 py-3 text-xs md:text-sm text-white rounded-full font-medium bg-gray-800" onClick={() => userData ? navigate("/dashboard") : setOpenLogin(true)}>
                                Start Building
                            </button>
                        </div>
                        <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
                            <button className="px-6 py-3 text-xs md:text-sm text-white rounded-full font-medium bg-gray-800" onClick={() => navigate("/generate")}>
                                Generate a Website
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {openLogin && <LoginModal setOpenLogin={setOpenLogin} />}
            </AnimatePresence>
        </div>
    )
}

export default Features
