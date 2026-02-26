import { ArrowLeft, Check, Coins } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { motion } from "motion/react"
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
const plans = [
    {
        key: "free",
        name: "Free",
        price: "₹0",
        credits: 100,
        description: "Perfect to explore GenWeb.ai",
        features: [
            "AI website generation",
            "Responsive HTML output",
            "Basic animations",
        ],
        popular: false,
        button: "Get Started",
    },
    {
        key: "pro",
        name: "Pro",
        price: "₹499",
        credits: 500,
        description: "For serious creators & freelancers",
        features: [
            "Everything in Free",
            "Faster generation",
            "Edit & regenerate",
        ],
        popular: true,
        button: "Upgrade to Pro",
    },
    {
        key: "enterprise",
        name: "Enterprise",
        price: "₹1499",
        credits: 1000,
        description: "For teams & power users",
        features: [
            "Unlimited iterations",
            "Highest priority",
            "Team collaboration",
            "Dedicated support",
        ],
        popular: false,
        button: "Contact Sales",
    },
];
function Pricing() {
    const navigate = useNavigate()
  const {userData}=useSelector(state=>state.user)
  const [loading,setLoading]=useState(null)
    const handleBuy=async (planKey)=>{
if(!userData){
navigate("/")
return
}
if(planKey=="free"){
    navigate("/dashboard")
    return
}
setLoading(planKey)
try {
    const result=await axios.post(`${serverUrl}/api/billing`,{planType:planKey},{withCredentials:true})
    window.location.href=result.data.sessionUrl
} catch (error) {
    console.log(error)
    setLoading(null)
}

    }
    return (
        <div className='relative min-h-screen overflow-hidden bg-[#0C0414] text-white px-6 pt-16 pb-24'>
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

            <div className='absolute inset-0 pointer-events-none'>
                <div className='absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]' />
                <div className='absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[120px]' />
            </div>

            <button className='relative z-10 mb-8 flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition' onClick={() => navigate("/")}>
                <ArrowLeft size={16} />
                Back
            </button>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 max-w-4xl mx-auto text-center mb-16"
            >
                <h1 className='text-5xl md:text-6xl font-bold mb-4 bg-linear-to-r from-[#F5F5F5] via-[#F5F5F5] to-[#F5F5F5] text-transparent bg-clip-text'>Simple, transparent pricing</h1>
                <p className='text-slate-300 text-lg'>Buy credits once. Build anytime.</p>
            </motion.div>

            <div className='relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
                {plans.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.12 }}
                        whileHover={{ y: -8 }}
                        className={`relative rounded-2xl p-8 border backdrop-blur-xl transition-all
              ${p.popular
                                ? "border-indigo-500/50 bg-gradient-to-b from-indigo-500/20 to-transparent shadow-2xl shadow-indigo-500/20"
                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                            }`}
                    >
                        {p.popular && (
                            <span className='absolute top-5 right-5 px-3 py-1 text-xs rounded-full bg-indigo-500 text-white font-medium'>Most Popular</span>
                        )}

                        <h2 className='text-2xl font-semibold mb-2'>{p.name}</h2>
                        <p className='text-zinc-400 text-sm mb-6'>{p.description}</p>
                        <div className='flex items-end gap-1 mb-4'>
                            <span className='text-5xl font-bold'>{p.price}</span>
                            <span className='text-sm text-zinc-400 mb-1'>/one-time</span>
                        </div>

                        <div className='flex items-center gap-2 mb-8 px-3 py-2 rounded-lg bg-white/5 border border-white/10 w-fit'>
                            <Coins size={18} className='text-yellow-400' />
                            <span className='text-sm font-semibold'>{p.credits} Credits</span>
                        </div>

                        <ul className='space-y-3 mb-10'>
                            {p.features.map((f) => (
                                <li
                                    key={f}
                                    className='flex items-center gap-3 text-sm text-zinc-300'
                                >
                                    <Check size={18} className='text-green-400 flex-shrink-0' />
                                    {f}
                                </li>
                            ))}
                        </ul>


                        <div className="button-bg rounded-full p-0.5 hover:scale-105 transition duration-300 active:scale-100">
                          <motion.button
                              whileTap={{ scale: 0.96 }}
                              disabled={loading}
                              onClick={()=>handleBuy(p.key)}
                              className={`w-full py-3 rounded-full font-semibold text-sm transition cursor-pointer
                                ${p.popular
                                      ? "bg-gray-800 text-white"
                                      : "bg-gray-800 text-white"
                                  } disabled:opacity-60`}
                          >
                              {loading===p.key?"Redirecting...":p.button}


                        </motion.button>
                        </div>


                    </motion.div>
                ))}
            </div>


        </div>
    )
}

export default Pricing
