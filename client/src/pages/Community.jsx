import React, { useEffect, useState } from "react"
import axios from "axios"
import { serverUrl } from "../App"
import { useNavigate } from "react-router-dom"

function Community() {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(9)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const totalPages = Math.max(Math.ceil(total / limit), 1)

  useEffect(() => {
    const fetchCommunity = async () => {
      setLoading(true)
      setError("")
      try {
        const result = await axios.get(`${serverUrl}/api/community?page=${page}&limit=${limit}`)
        setItems(result.data.items || [])
        setTotal(result.data.total || 0)
      } catch (err) {
        setError("Unable to load community sites.")
      } finally {
        setLoading(false)
      }
    }
    fetchCommunity()
  }, [page, limit])

  return (
    <div className="min-h-screen bg-[#0C0414] text-white overflow-hidden">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:ital,wght@0,400..700;1,400..700&display=swap');
          h1, h2, h3{
            font-family: "Ibarra Real Nova", serif;
          }
          p, a, button{
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>

      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-white/10 transition" onClick={() => navigate("/")}>
              Home
            </button>
            <h1 className="text-xl font-semibold">Community</h1>
          </div>
          <button className="px-4 py-2 rounded-full text-sm bg-gray-800 text-white" onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-semibold">Published Websites</h2>
          <p className="text-sm text-zinc-400 mt-2">Discover community creations published in the last 30 days.</p>
        </div>

        {loading && <div className="mt-16 text-center text-zinc-400">Loading community websites...</div>}
        {error && !loading && <div className="mt-16 text-center text-red-400">{error}</div>}

        {!loading && !error && items.length === 0 && (
          <div className="mt-16 text-center text-zinc-400">No published websites yet.</div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((w) => (
              <div
                key={w._id}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col"
              >
                <div
                  className="relative h-44 bg-black cursor-pointer"
                  onClick={() => navigate(`/site/${w.slug}`)}
                >
                  <iframe
                    srcDoc={w.latestCode}
                    className="absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="text-base font-semibold line-clamp-2">{w.title}</h3>
                  <p className="text-xs text-zinc-400">
                    By {w.publishedBy?.name || "Unknown"} • {new Date(w.publishedAt).toLocaleDateString()}
                  </p>
                  <button
                    className="mt-3 px-3 py-2 rounded-lg text-sm bg-white/10 hover:bg-white/20 border border-white/10"
                    onClick={() => navigate(`/site/${w.slug}`)}
                  >
                    View Live Site
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              className="px-4 py-2 rounded-lg text-sm bg-white/10 hover:bg-white/20 border border-white/10 disabled:opacity-40"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <span className="text-xs text-zinc-400">Page {page} of {totalPages}</span>
            <button
              className="px-4 py-2 rounded-lg text-sm bg-white/10 hover:bg-white/20 border border-white/10 disabled:opacity-40"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Community
