import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import axios from "axios"

const LOG_ENDPOINT = `${serverUrl}/api/logs/client`

const sendClientLog = (payload) => {
  try {
    const body = JSON.stringify(payload)
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" })
      navigator.sendBeacon(LOG_ENDPOINT, blob)
      return
    }
    fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body
    }).catch(() => {})
  } catch (err) {
    // Swallow logging errors to avoid breaking the app
  }
}

window.addEventListener("error", (event) => {
  sendClientLog({
    level: "error",
    message: event.message,
    meta: {
      source: event.filename,
      line: event.lineno,
      column: event.colno,
      stack: event.error?.stack
    }
  })
})

window.addEventListener("unhandledrejection", (event) => {
  sendClientLog({
    level: "error",
    message: "Unhandled promise rejection",
    meta: {
      reason: event.reason?.message || String(event.reason),
      stack: event.reason?.stack
    }
  })
})

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    const data = error?.response?.data
    const config = error?.config || {}
    sendClientLog({
      level: "error",
      message: "API request failed",
      meta: {
        method: config.method,
        url: config.url,
        status,
        data
      }
    })
    return Promise.reject(error)
  }
)

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
   <App />
 </Provider>
  
)
