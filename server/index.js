import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDb from "./config/db.js"
import authRouter from "./routes/auth.routes.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import userRouter from "./routes/user.routes.js"
import websiteRouter from "./routes/website.routes.js"
import billingRouter from "./routes/billing.routes.js"
import { stripeWebhook } from "./controllers/stripeWebhook.controller.js"
import Website from "./models/website.model.js"
import { getCommunity, publishWebsite, unpublishWebsite } from "./controllers/website.controllers.js"
import isAuth from "./middlewares/isAuth.js"

const app=express()

app.post("/api/stripe/webhook",express.raw({type:"application/json"}),stripeWebhook)
const port=process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// Basic request logging for failed responses
app.use((req, res, next) => {
    const startedAt = Date.now()
    res.on("finish", () => {
        if (res.statusCode >= 400) {
            const durationMs = Date.now() - startedAt
            console.error(`[api] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationMs}ms)`)
        }
    })
    next()
})

// Client-side error logs (from the browser)
app.post("/api/logs/client", (req, res) => {
    const { level, message, meta } = req.body || {}
    const safeLevel = typeof level === "string" ? level.toUpperCase() : "ERROR"
    console.error(`[client:${safeLevel}] ${message || "Unknown error"}`)
    if (meta) {
        console.error(meta)
    }
    res.sendStatus(204)
})
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/website",websiteRouter)
app.use("/api/billing",billingRouter)
app.get("/api/community",getCommunity)
app.post("/api/website/publish/:id",isAuth,publishWebsite)
app.delete("/api/website/unpublish/:id",isAuth,unpublishWebsite)

// Server error handler
app.use((err, req, res, next) => {
    console.error("[server] Unhandled error:", err)
    res.status(500).json({ message: "Internal server error" })
})

process.on("unhandledRejection", (reason) => {
    console.error("[server] Unhandled Rejection:", reason)
})

process.on("uncaughtException", (err) => {
    console.error("[server] Uncaught Exception:", err)
})


app.listen(port,()=>{
    console.log("server started")
    connectDb()

    const cleanupPublishedWebsites = async () => {
        try {
            const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
            const result = await Website.updateMany(
                { isPublished: true, publishedAt: { $lt: cutoff } },
                { $set: { isPublished: false, publishedAt: null, publishedBy: null } }
            )
            if (result.modifiedCount > 0) {
                console.log(`[community] auto-unpublished ${result.modifiedCount} website(s) older than 30 days`)
            }
        } catch (error) {
            console.error("[community] cleanup error:", error)
        }
    }

    // Run once on startup and then every 24 hours
    setTimeout(cleanupPublishedWebsites, 10 * 1000)
    setInterval(cleanupPublishedWebsites, 24 * 60 * 60 * 1000)
})
