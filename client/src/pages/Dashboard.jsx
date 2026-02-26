import { ArrowLeft, Check, Rocket, Share2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../App'
function Dashboard() {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [websites, setWebsites] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [copiedId, setCopiedId] = useState(null)
    const handleDeploy = async (id) => {
        try {
            const result = await axios.get(`${serverUrl}/api/website/deploy/${id}`, { withCredentials: true })
            window.open(`${result.data.url}`, "_blank")
            setWebsites((prev) =>
        prev.map((w) =>
          w._id === id
            ? { ...w, deployed: true, deployUrl: result.data.url }
            : w
        )
      );
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const handleGetAllWebsites = async () => {
            setLoading(true)
            try {

                const result = await axios.get(`${serverUrl}/api/website/get-all`, { withCredentials: true })
                setWebsites(result.data || [])
                setLoading(false)
            } catch (error) {
                console.log(error)
                setError(error.response.data.message)
                setLoading(false)
            }
        }
        handleGetAllWebsites()
    }, [])

    const handleCopy = async (site) => {
        await navigator.clipboard.writeText(site.deployUrl)
        setCopiedId(site._id)
        setTimeout(() => setCopiedId(null), 2000)
    }

    return (
        <div className='min-h-screen bg-[#0C0414] text-white overflow-hidden'>
            <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:ital,wght@0,400..700;1,400..700&display=swap');
          h1, h2, h3{
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
            <div className='sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10'>
                <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
                    <div className='flex items-center gap-4'>
                        <button className='p-2 rounded-lg hover:bg-white/10 transition' onClick={() => navigate("/")}><ArrowLeft size={20} /></button>
                        <h1 className='text-xl font-semibold'>Dashboard</h1>
                    </div>
                    <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
                      <button className='px-6 py-2.5 rounded-full text-sm text-white font-semibold bg-gray-800' onClick={() => navigate("/generate")}>
                          + New Website
                      </button>
                    </div>
                </div>
            </div>
            <div className='max-w-7xl mx-auto px-6 py-12'>
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <p className='text-sm text-zinc-400 mb-2'>Welcome Back</p>
                    <h2 className='text-4xl md:text-5xl font-bold bg-linear-to-r from-[#F5F5F5] to-[#F5F5F5] text-transparent bg-clip-text'>{userData.name}</h2>
                </motion.div>

                {loading && (
                    <div className="mt-24 text-center text-zinc-400">Loading Your Websites...</div>
                )}

                {error && !loading && (
                    <div className="mt-24 text-center text-red-400">{error}</div>
                )}

                {websites?.length == 0 && (
                    <div className="mt-24 text-center text-zinc-400">You have no websites</div>
                )}

                {!loading && !error && websites?.length > 0 && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                        {websites.map((w, i) => {

                            const copied = copiedId === w._id

                            return <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ y: -6 }}
                               
                                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col"
                            >
                                <div className='relative h-44 bg-black cursor-pointer'  onClick={()=>navigate(`/editor/${w._id}`)}>
                                    <iframe srcDoc={w.latestCode} className='absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white' />
                                    <div className='absolute inset-0 bg-black/30' />
                                </div>

                                <div className='p-5 flex flex-col gap-4 flex-1'>
                                    <h3 className='text-base font-semibold line-clamp-2'>{w.title}</h3>
                                    <p className='text-xs text-zinc-400'>Last Updated {""}
                                        {new Date(w.updatedAt).toLocaleDateString()}
                                    </p>

                                    {!w.deployed ? (
                                        <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100 mt-auto">
                                          <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-gray-800 text-white w-full"
                                              onClick={() => handleDeploy(w._id)}

                                          ><Rocket size={18} /> Deploy</button>
                                        </div>
                                    ) : (<motion.button
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleCopy(w)}
                                        className={`
                          mt-auto flex items-center justify-center gap-2
                          px-4 py-2 rounded-lg text-sm font-medium
                          transition-all
                          ${copied
                                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                                : "bg-white/10 hover:bg-white/20 border border-white/10"
                                            }
                        `}
                                    >
                                        { copied?(
                                            <>
                                            <Check size={14}/>
                                            Link Copied
                                            </>
                                        ):
                                        <>
                                        <Share2 size={14}/>
                                        Share Link
                                        </>
                                        }
                                    </motion.button>)}

                                </div>

                            </motion.div>
                        })}

                    </div>
                )}


            </div>
        </div>
    )
}

export default Dashboard
