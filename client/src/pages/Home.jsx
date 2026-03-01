import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
import LoginModal from '../components/LoginModal'
import { useDispatch, useSelector } from 'react-redux'
import { Coins } from "lucide-react"
import { serverUrl } from '../App'
import axios from 'axios'
import { setUserData } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'
import aetherLogo from '../assets/AetherAI Final logo .png'
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
              <img src={aetherLogo} alt="AetherAI logo" className="w-32 md:w-30 lg:w-48 object-contain" />
            </a>
            <div className="hidden md:flex flex-1 items-center justify-center">
              <div className="flex items-center gap-8 text-sm">
                <a href="/features" className="hover:text-white/80">Features</a>
                <a href="/pricing" className="hover:text-white/80">Pricing</a>
                <a href="/community" className="hover:text-white/80">Community</a>
              </div>
            </div>
            <div id="menu" className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} max-md:fixed max-md:top-0 max-md:z-50 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-black/50 max-md:backdrop-blur max-md:flex-col max-md:justify-center md:hidden flex items-center gap-8 text-sm`}>
              <a href="/features" onClick={() => setMobileOpen(false)} className="hover:text-white/80">Features</a>
              <a href="/pricing" onClick={() => setMobileOpen(false)} className="hover:text-white/80">Pricing</a>
              <a href="/community" onClick={() => setMobileOpen(false)} className="hover:text-white/80">Community</a>

              <button id="close-menu" onClick={() => setMobileOpen(false)} className="md:hidden bg-gray-900 hover:bg-gray-800 text-white p-2 rounded-md aspect-square font-medium transition">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                </svg>
              </button>
            </div>
            {!userData ? (
              <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100 hidden md:block">
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
                <section className='max-w-7xl mx-auto px-6 pb-32 mt-16'>
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
                &copy; {new Date().getFullYear()} Aether AI
            </footer>

            {openLogin && <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />}

        </div>
    )
}

export default Home

