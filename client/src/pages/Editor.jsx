import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import { useState } from 'react'
import { ArrowLeft, Code, Code2, MessageCircle, MessageSquare, Monitor, Rocket, Send, X } from 'lucide-react'
import { useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'

import Editor from '@monaco-editor/react';
function WebsiteEditor() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [website, setWebsite] = useState(null)
    const [error, setError] = useState("")
    const [code, setCode] = useState("")
    const [messages, setMessages] = useState([])
    const [prompt, setPrompt] = useState("")
    const iframeRef = useRef(null)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [thinkingIndex, setThinkingIndex] = useState(0)
    const [showCode, setShowCode] = useState(false)
    const [showFullPreview, setShowFullPreview] = useState(false)
    const [showChat, setShowChat] = useState(false)
    const thinkingSteps = [
        "Understanding your request…",
        "Planning layout changes…",
        "Improving responsiveness…",
        "Applying animations…",
        "Finalizing update…",
    ]
    const handleUpdate = async () => {
        if (!prompt) return
        setUpdateLoading(true)
        const text = prompt
        setPrompt("")
        setMessages((m) => [...m, { role: "user", content: prompt }])
        try {
            const result = await axios.post(`${serverUrl}/api/website/update/${id}`, { prompt: text }, { withCredentials: true })
            console.log(result)
            setUpdateLoading(false)
            setMessages((m) => [...m, { role: "ai", content: result.data.message }])
            setCode(result.data.code)
        } catch (error) {
            setUpdateLoading(false)
            console.log(error)
        }
    }

    const handleDeploy = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/deploy/${website._id}`, { withCredentials: true })
                window.open(`${result.data.url}`, "_blank")
               
            } catch (error) {
                console.log(error)
            }
        }


    useEffect(() => {
        if (!updateLoading) return;
        const i = setInterval(() => {
            setThinkingIndex((i) => (i + 1) % thinkingSteps.length)
        }, 1200)

        return () => clearInterval(i)
    }, [updateLoading])

    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(`${serverUrl}/api/website/get-by-id/${id}`, { withCredentials: true })
                setWebsite(result.data)
                setCode(result.data.latestCode)
                setMessages(result.data.conversation)
            } catch (error) {
                console.log(error)
                setError(error.response.data.message)
            }
        }
        handleGetWebsite()
    }, [id])


    useEffect(() => {
        if (!iframeRef.current || !code) return;
        const blob = new Blob([code], { type: "text/html" })
        const url = URL.createObjectURL(blob)
        iframeRef.current.src = url
        return () => URL.revokeObjectURL(url)
    }, [code])

    if (error) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-red-400'>
                {error}
            </div>
        )
    }
    if (!website) {
        return (
            <div className='h-screen flex items-center justify-center bg-black text-white'>
                Loading...
            </div>
        )
    }



    return (
        <div className='h-screen w-screen flex bg-[#0C0414] text-white overflow-hidden'>
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
            <aside className='hidden lg:flex w-95 flex-col border-r border-white/10 bg-[#0C0414]/80'>
                <Header />
                <>
                    <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"
                                    }`}
                            >

                                <div
                                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                                        ? "bg-white text-black"
                                        : "bg-white/5 border border-white/10 text-zinc-200"
                                        }`}
                                >

                                    {m.content}

                                </div>

                            </div>
                        ))}

                        {updateLoading &&

                            <div className='max-w-[85%] mr-auto'>
                                <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic'>{thinkingSteps[thinkingIndex]}</div>
                            </div>}




                    </div>
                    <div className='p-3 border-t border-white/10'>
                        <div className='flex gap-2'>
                            <input placeholder='Describe Changes...' className='flex-1 resize-none rounded-lg px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none text-white placeholder-zinc-500' onChange={(e) => setPrompt(e.target.value)} value={prompt} />
                            <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100"><button className='px-4 py-3 rounded-full bg-gray-800 text-white font-semibold' disabled={updateLoading} onClick={handleUpdate}><Send size={14} /></button></div>
                        </div>
                    </div>

                </>
            </aside>

            <div className='flex-1 flex flex-col'>
                <div className='h-14 px-4 flex justify-between items-center border-b border-white/10 bg-[#0C0414]/80'>
                    <span className='text-xs text-zinc-400'>Live Preview</span>
                    <div className='flex gap-2'>
                        {website.deployed ?"": <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100"><button className='flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-800 text-white text-sm font-semibold'
                        onClick={handleDeploy}
                        ><Rocket size={14} /> Deploy</button></div>}
                       
                        <button className='p-2 lg:hidden hover:bg-white/10 rounded-lg transition' onClick={() => setShowChat(true)}><MessageSquare size={18} /></button>

                        <button className='p-2 hover:bg-white/10 rounded-lg transition' onClick={() => setShowCode(true)}><Code2 size={18} /></button>
                        <button className='p-2 hover:bg-white/10 rounded-lg transition' onClick={() => setShowFullPreview(true)}><Monitor size={18} /></button>
                    </div>

                </div>

                <iframe ref={iframeRef} sandbox='allow-scripts allow-same-origin allow-forms' className='flex-1 w-full bg-white' />
            </div>

            <AnimatePresence>
                {showChat && (
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100%" }}
                        className="fixed inset-0 z-[9999] bg-[#0C0414] flex flex-col"
                    >
                   <Header onclose={()=>setShowChat(false)}/>
                   <>
                    <div className='flex-1 overflow-y-auto px-4 py-4 space-y-4'>
                        {messages.map((m, i) => (
                            <div
                                key={i}
                                className={`max-w-[85%] ${m.role === "user" ? "ml-auto" : "mr-auto"
                                    }`}
                            >

                                <div
                                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                                        ? "bg-white text-black"
                                        : "bg-white/5 border border-white/10 text-zinc-200"
                                        }`}
                                >

                                    {m.content}

                                </div>

                            </div>
                        ))}

                        {updateLoading &&

                            <div className='max-w-[85%] mr-auto'>
                                <div className='px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic'>{thinkingSteps[thinkingIndex]}</div>
                            </div>}




                    </div>
                    <div className='p-3 border-t border-white/10'>
                        <div className='flex gap-2'>
                            <input placeholder='Describe Changes...' className='flex-1 resize-none rounded-lg px-4 py-3 bg-white/5 border border-white/10 text-sm outline-none text-white placeholder-zinc-500' onChange={(e) => setPrompt(e.target.value)} value={prompt} />
                            <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100"><button className='px-4 py-3 rounded-full bg-gray-800 text-white font-semibold' disabled={updateLoading} onClick={handleUpdate}><Send size={14} /></button></div>
                        </div>
                    </div>

                </>
                    </motion.div>
                )}
            </AnimatePresence>


            <AnimatePresence>
                {showCode && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className="fixed inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-[#0C0414] flex flex-col"
                    >
                        <div className='h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#0C0414]'>
                            <span className='text-sm font-medium'>index.html</span>
                            <button onClick={() => setShowCode(false)} className='hover:bg-white/10 rounded-lg p-1'><X size={18} /></button>
                        </div>
                        <Editor
                            theme='vs-dark'
                            value={code}
                            language='html'
                            onChange={(v) => setCode(v)}
                        />

                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showFullPreview && (
                    <motion.div
                        className="fixed inset-0 z-[9999] bg-[#0C0414]"
                    >
                        <iframe className='w-full h-full bg-white' srcDoc={code} sandbox='allow-scripts allow-same-origin allow-forms'/>
                        <button onClick={() => setShowFullPreview(false)} className='absolute top-4 right-4 p-2 bg-black/70 rounded-lg hover:bg-black/90'><X /></button>
                    </motion.div>
                )}
            </AnimatePresence>


        </div>
    )

    function Header({onclose}) {
        return (
            <div className='h-14 px-4 flex items-center justify-between border-b border-white/10'>
                <div className='flex items-center gap-4'>
                    <span className='font-semibold truncate'>{website.title}</span>
                    <button
                       onClick={() => navigate("/")}
                      className='relative px-3 py-1.5 rounded-full text-sm font-semibold bg-gray-800 text-white overflow-hidden group'
                     >
                      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 opacity-20 blur-md group-hover:opacity-40 transition" />
                      <span className="relative z-10">Home</span>
                    </button>
                </div>
                {onclose &&  <button onClick={onclose} className='hover:bg-white/10 rounded-lg p-1'><X size={18} color='white'/></button>}
           
            </div>
        )
    }



}





export default WebsiteEditor
