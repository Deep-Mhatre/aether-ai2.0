import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import LoginModal from '../components/LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { Coins } from "lucide-react"
import { serverUrl } from '../App'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
function Home() {

    const highlights = [
        "AI Generated Code",
        "Fully Responsive Layouts",
        "Production Ready Output",
    ]

    const [openLogin, setOpenLogin] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const { userData } = useSelector(state => state.user)
    const [openProfile, setOpenProfile] = useState(false)
    const [websites, setWebsites] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleLogOut = async () => {
        console.log("logout click")
        try {
            await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            dispatch(setUserData(null))
            setOpenProfile(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (!userData) return;
        const handleGetAllWebsites = async () => {

            try {

                const result = await axios.get(`${serverUrl}/api/website/get-all`, { withCredentials: true })
                setWebsites(result.data || [])

            } catch (error) {
                console.log(error)

            }
        }
        handleGetAllWebsites()
    }, [userData])
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
            <header className='flex flex-col items-center bg-[#0C0414] text-white pb-4 md:pb-0'>

        <nav className="flex flex-col items-center w-full" >
          <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
            <a href="/">
              <svg width="157" height="40" viewBox="0 0 157 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M47.904 28.28q-1.54 0-2.744-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.82 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.868 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.456.924-3.276.924m-7.196 5.32V14.56h3.08v3.612l-.532 3.276.532 3.248V33.6zm6.692-8.232q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128t.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.868.504 1.988.504M56.95 28V14.56h3.08V28zm3.08-7.476-1.064-.532q0-2.548 1.12-4.116 1.148-1.596 3.444-1.596 1.008 0 1.82.364.812.365 1.512 1.176l-2.016 2.072a2.1 2.1 0 0 0-.812-.56 3 3 0 0 0-1.036-.168q-1.287 0-2.128.812-.84.811-.84 2.548m14.156 7.756q-2.016 0-3.64-.896a7 7 0 0 1-2.548-2.52q-.924-1.596-.924-3.584t.924-3.556a6.87 6.87 0 0 1 2.492-2.52q1.596-.924 3.528-.924 1.876 0 3.304.868a6.05 6.05 0 0 1 2.268 2.38q.84 1.512.84 3.444 0 .336-.056.7a7 7 0 0 1-.112.756H69.23v-2.52h9.436l-1.148 1.008q-.056-1.232-.476-2.072a3 3 0 0 0-1.204-1.288q-.756-.448-1.876-.448-1.176 0-2.044.504a3.43 3.43 0 0 0-1.344 1.428q-.476.896-.476 2.156t.504 2.212 1.428 1.484q.924.504 2.128.504 1.037 0 1.904-.364a4 4 0 0 0 1.512-1.064l1.96 1.988a6.3 6.3 0 0 1-2.38 1.736 7.6 7.6 0 0 1-2.968.588m15.91 0q-1.54 0-2.745-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.821 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.869 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.455.924-3.276.924M82.898 28V7.84h3.08v10.024l-.532 3.248.532 3.276V28zm6.692-2.632q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128.001 1.204.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.87.504 1.988.504m15.067 2.912q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.644.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.976-.28V14.56h3.08V28zm1.54-15.904q-.783 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.813 0 1.316.532t.504 1.316q0 .784-.504 1.316t-1.316.532M120.169 28V7.84h3.08V28zm8.552 0V8.96h3.08V28zm-3.22-10.64v-2.8h9.52v2.8zm17.274 10.92q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.643.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.977-.28V14.56h3.08V28zm1.54-15.904q-.785 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.812 0 1.316.532t.504 1.316-.504 1.316-1.316.532" fill="white" /><path d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </a>
            <div id="menu" className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} max-md:fixed max-md:top-0 max-md:z-50 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-black/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm`}>
              <a href="/features" onClick={() => setMobileOpen(false)} className="hover:text-white/80">Features</a>
              <a href="/pricing" onClick={() => setMobileOpen(false)} className="hover:text-white/80">Pricing</a>

              <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-md aspect-square font-medium transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            {!userData ? (
              <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
                <button className="px-6 py-2.5 text-sm text-white rounded-full font-medium bg-gray-800" onClick={() => setOpenLogin(true)}>
                  Create account
                </button>
              </div>
            ) : (
              <div className='relative hidden md:block'>
                <button className='flex items-center' onClick={() => setOpenProfile(!openProfile)}>
                  <img src={userData?.avatar || `https://ui-avatars.com/api/?name=${userData.name}`} alt="" referrerPolicy='no-referrer' className='w-9 h-9 rounded-full border border-white/20 object-cover' />
                </button>
                <AnimatePresence>
                  {openProfile && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-60 z-50 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
                      >
                        <div className='px-4 py-3 border-b border-white/10'>
                          <p className='text-sm font-medium truncate'>{userData.name}</p>
                          <p className='text-xs text-zinc-500 truncate'>{userData.email}</p>
                        </div>

                        <button className='w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5'>
                          <Coins size={14} className='text-yellow-400' />
                          <span className='text-zinc-300'>Credits</span>
                          <span>{userData.credits}</span>
                          <span className='font-semibold'>+</span>
                        </button>

                        <button className='w-full px-4 py-3 text-left text-sm hover:bg-white/5' onClick={() => navigate("/dashboard")}>Dashboard</button>
                        <button className='w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5' onClick={handleLogOut}>Logout</button>

                      </motion.div>
                    </>

                  )}

                </AnimatePresence>

              </div>
            )}

            <button id="open-menu" onClick={() => setMobileOpen(true)}
              className="md:hidden bg-gray-900 hover:bg-gray-800 text-gray-50 p-2 rounded-md aspect-square font-medium transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" />
              </svg>
            </button>
          </div>
        </nav>

        <div className="p-px rounded-full bg-linear-to-r from-indigo-900 to-[#5F5F5F] mt-32">
          <div className="flex flex-wrap items-center justify-center gap-2 p-2 px-4 rounded-full bg-[#0C0414]">
            <p className="text-sm text-slate-200">⚡ AI-Powered Website Generator</p>
          </div>
        </div>

        <h1 className="text-4xl md:text-[66px]/[72px] text-center max-w-4xl mt-6 bg-linear-to-r from-[#231233] via-[#F5F5F5] to-[#231233] text-transparent bg-clip-text leading-tight px-4">
          Design, Build & Launch Websites with AI in Minutes
        </h1>
        <p className="text-sm md:text-base bg-linear-to-r from-[#231233] via-[#F5F5F5] to-[#231233] text-transparent bg-clip-text text-center max-w-lg mt-4 px-4">
          Create production-ready websites and UI components instantly with AI-generated layouts, code and design systems.
        </p>

        <div className='flex gap-3 mt-7'>
          <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
            <button className="px-6 py-3 text-xs md:text-sm text-white rounded-full font-medium bg-gray-800" onClick={() => setOpenLogin(true)}>
              Get Started
            </button>
          </div>
          <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
            <button className="px-6 py-3 text-xs md:text-sm text-white rounded-full font-medium bg-gray-800" onClick={() => userData? navigate("/dashboard"):setOpenLogin(true)}>
              {userData ? "Explore Dashboard" : "Explore templates"}
            </button>
          </div>
        </div>

        <div className="relative mt-12 w-full max-w-5xl px-4">
          <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-4/5 md:w-[600px] lg:w-[800px] h-28 bg-[#D043FF] blur-[60px] opacity-100 z-0"></div>
          <img className="relative z-10 max-h-64 md:max-h-80 w-full object-cover object-top" src="https://assets.prebuiltui.com/images/components/hero-section/hero-dashImage1.png" alt="" />
        </div>
      </header>
            {!userData && <section className='max-w-7xl mx-auto px-6 pb-32'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                    {highlights.map((h, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="rounded-2xl bg-white/5 border border-white/10 p-8"
                        >
                            <h1 className='text-xl font-semibold mb-3'>{h}</h1>
                            <p className='text-sm text-zinc-400'>
                                GenWeb.ai builds real websites — clean code,
                                animations, responsiveness and scalable structure.
                            </p>

                        </motion.div>
                    ))}
                </div>
            </section>}


            {userData && websites?.length > 0 && (
                <section className='max-w-7xl mx-auto px-6 pb-32'>
                    <h3 className='text-2xl font-semibold mb-6'>Your Websites</h3>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {websites.slice(0, 3).map((w, i) => (
                            <motion.div
                                key={w._id}
                                whileHover={{ y: -6 }}
                                onClick={() => navigate(`/editor/${w._id}`)}
                                className="cursor-pointer rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                            >
                                <div className='h-40 bg-black'>
                                    <iframe
                                        srcDoc={w.latestCode}
                                        className='w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white'
                                    />
                                </div>
                                <div className='p-4'>
                                    <h3 className='text-base font-semibold line-clamp-2'>{w.title}</h3>
                                    <p className='text-xs text-zinc-400'>Last Updated {""}
                                        {new Date(w.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>


                            </motion.div>
                        ))}

                    </div>
                </section>

            )}



            <footer className='border-t border-white/10 py-10 text-center text-sm text-zinc-500'>
                &copy; {new Date().getFullYear()} GenWeb.ai
            </footer>

            {openLogin && <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />}

        </div>
    )
}

export default Home