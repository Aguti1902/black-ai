import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Bot } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { intents, suggestions } from '../data/chatKnowledge.js'

/* ─── Language detection ─────────────────────────────────────────── */
const SPANISH_WORDS = /\b(hola|qué|que|cómo|como|cuál|cual|dónde|donde|cuándo|cuando|quién|quien|es|son|los|las|del|una|para|por|con|sin|sobre|tiene|tienen|hay|están|está|me|te|se|le|nos|vuestros|vuestra|nuestros|nuestra|eres|sois)\b/i

function detectLang(text) {
  return SPANISH_WORDS.test(text) ? 'es' : 'en'
}

/* ─── Intent matcher ─────────────────────────────────────────────── */
function getResponse(userText, lang) {
  const lower = userText.toLowerCase()

  for (const intent of intents) {
    if (intent.id === 'fallback') continue
    if (intent.keywords.some((kw) => lower.includes(kw))) {
      return intent[lang] || intent.en
    }
  }

  const fallback = intents.find((i) => i.id === 'fallback')
  return fallback[lang] || fallback.en
}

/* ─── Message bubble ─────────────────────────────────────────────── */
function Bubble({ role, text }) {
  const isBot = role === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className={`flex gap-2.5 ${isBot ? 'items-start' : 'items-end justify-end'}`}
    >
      {isBot && (
        <div
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center"
          style={{ backgroundColor: '#141414', borderRadius: '50%' }}
        >
          <Bot size={13} color="#B8924A" />
        </div>
      )}
      <div
        style={{
          maxWidth: '78%',
          padding: '10px 14px',
          borderRadius: isBot ? '2px 14px 14px 14px' : '14px 2px 14px 14px',
          backgroundColor: isBot ? '#F4F5F5' : '#141414',
          color: isBot ? '#141414' : '#FFFFFF',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '0.875rem',
          lineHeight: 1.55,
        }}
      >
        {text}
      </div>
    </motion.div>
  )
}

/* ─── Typing indicator ───────────────────────────────────────────── */
function TypingDots() {
  return (
    <div className="flex items-start gap-2.5">
      <div
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center"
        style={{ backgroundColor: '#141414', borderRadius: '50%' }}
      >
        <Bot size={13} color="#B8924A" />
      </div>
      <div
        style={{
          padding: '12px 16px',
          backgroundColor: '#F4F5F5',
          borderRadius: '2px 14px 14px 14px',
        }}
      >
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: '#9A9A9A' }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.1, delay: i * 0.18, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Main widget ────────────────────────────────────────────────── */
export default function ChatWidget() {
  const { lang } = useApp()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [chatLang, setChatLang] = useState(lang)
  const [showSuggestions, setShowSuggestions] = useState(true)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const labels = {
    en: {
      title: 'Black AI Assistant',
      subtitle: 'Ask me anything about Black AI',
      placeholder: 'Ask a question…',
      welcome: "Hello! I'm Black AI's virtual assistant. How can I help you today?",
    },
    es: {
      title: 'Asistente Black AI',
      subtitle: 'Pregúntame lo que quieras sobre Black AI',
      placeholder: 'Escribe una pregunta…',
      welcome: '¡Hola! Soy el asistente virtual de Black AI. ¿En qué puedo ayudarte hoy?',
    },
  }

  /* Sync chatLang with global lang */
  useEffect(() => {
    setChatLang(lang)
  }, [lang])

  /* Welcome message when opened */
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: Date.now(), role: 'bot', text: labels[chatLang].welcome }])
    }
  }, [open])

  /* Auto-scroll */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  /* Focus input when opened */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  function sendMessage(text) {
    if (!text.trim()) return
    const userText = text.trim()
    setInput('')
    setShowSuggestions(false)

    const detected = detectLang(userText)
    const responseLang = detected

    setMessages((prev) => [...prev, { id: Date.now(), role: 'user', text: userText }])
    setTyping(true)

    setTimeout(() => {
      const response = getResponse(userText, responseLang)
      setTyping(false)
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: 'bot', text: response }])
    }, 700 + Math.random() * 500)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const currentLabels = labels[chatLang]

  return (
    <>
      {/* ── Chat panel ────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              bottom: '88px',
              right: '24px',
              zIndex: 9999,
              width: 'min(380px, calc(100vw - 32px))',
              height: 'min(520px, calc(100vh - 130px))',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EEEEEE',
              boxShadow: '0 12px 48px rgba(20,20,20,0.14)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ backgroundColor: '#141414', flexShrink: 0 }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex h-8 w-8 items-center justify-center"
                  style={{ backgroundColor: 'rgba(184,146,74,0.15)', borderRadius: '50%' }}
                >
                  <Bot size={15} color="#B8924A" />
                </div>
                <div>
                  <p
                    className="text-[0.8rem] font-bold uppercase tracking-[0.05em] text-white"
                    style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif' }}
                  >
                    {currentLabels.title}
                  </p>
                  <p
                    className="text-[0.63rem] leading-none"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif', color: 'rgba(255,255,255,0.45)' }}
                  >
                    {currentLabels.subtitle}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Gold online dot */}
                <span
                  className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.1em]"
                  style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', color: 'rgba(255,255,255,0.4)' }}
                >
                  <span
                    className="block h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: '#B8924A' }}
                  />
                  Online
                </span>

                <button
                  onClick={() => setOpen(false)}
                  className="flex h-7 w-7 items-center justify-center transition-opacity hover:opacity-70"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                  aria-label="Close chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-5"
              style={{ gap: '12px', display: 'flex', flexDirection: 'column', backgroundColor: '#FAFBFB' }}
            >
              {messages.map((msg) => (
                <Bubble key={msg.id} role={msg.role} text={msg.text} />
              ))}
              {typing && <TypingDots />}

              {/* Suggestion chips */}
              {showSuggestions && messages.length <= 1 && !typing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  className="mt-2 flex flex-wrap gap-2"
                >
                  {suggestions[chatLang].map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-[0.7rem] font-bold uppercase tracking-[0.05em] transition-colors"
                      style={{
                        fontFamily: '"Space Grotesk", system-ui, sans-serif',
                        padding: '6px 10px',
                        border: '1px solid #EEEEEE',
                        color: '#141414',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#B8924A'
                        e.currentTarget.style.color = '#B8924A'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#EEEEEE'
                        e.currentTarget.style.color = '#141414'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderTop: '1px solid #EEEEEE', backgroundColor: '#FFFFFF', flexShrink: 0 }}
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={currentLabels.placeholder}
                style={{
                  flex: 1,
                  outline: 'none',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: '#141414',
                  backgroundColor: 'transparent',
                  lineHeight: 1.5,
                }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center transition-all"
                style={{
                  backgroundColor: input.trim() ? '#141414' : '#F4F5F5',
                  borderRadius: '50%',
                  cursor: input.trim() ? 'pointer' : 'default',
                }}
                aria-label="Send"
              >
                <Send size={13} color={input.trim() ? '#FFFFFF' : '#9A9A9A'} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ───────────────────────────────────── */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          backgroundColor: '#141414',
          border: '2px solid rgba(184,146,74,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(20,20,20,0.25)',
        }}
        aria-label={open ? 'Close chat' : 'Open AI assistant'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.18 }}
            >
              <X size={20} color="#FFFFFF" />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={20} color="#FFFFFF" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}
