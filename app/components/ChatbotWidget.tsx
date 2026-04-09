'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, SendHorizontal, X } from 'lucide-react'
import { useLanguageContext } from '@/app/context/LanguageContext'
import { Languages } from '../enum/global'

interface ChatMessage {
  id: number
  role: 'bot' | 'user'
  text: string
  time: string
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatbotWidget() {
  const { currentLanguage: t, getCurrentLang } = useLanguageContext()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    { id: 0, role: 'bot', text: t.chatbot_welcome, time: getTime() },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const [botMsgCount, setBotMsgCount] = useState(0)
  const isOpenRef = useRef(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const nextId = useRef(1)

  useEffect(() => {
    const timer = setTimeout(() => setShowTeaser(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    isOpenRef.current = isOpen
    if (isOpen) {
      setBotMsgCount(0)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, isOpen])

  // Update welcome message text when language changes
  useEffect(() => {
    setMessages((prev) => {
      const first = prev[0]
      if (first?.id === 0 && first.role === 'bot') {
        return [{ ...first, text: t.chatbot_welcome }, ...prev.slice(1)]
      }
      return prev
    })
  }, [t.chatbot_welcome])

  const playBotSound = () => {
    if (typeof window === 'undefined') return
    try {
      const audioCtx = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
      const oscillator = audioCtx.createOscillator()
      const gainNode = audioCtx.createGain()
      oscillator.type = 'sine'
      oscillator.frequency.value = 740
      gainNode.gain.value = 0.05
      oscillator.connect(gainNode)
      gainNode.connect(audioCtx.destination)
      oscillator.start()
      oscillator.stop(audioCtx.currentTime + 0.08)
    } catch {
      // ignore
    }
  }

  const sendMessage = async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    const userMsg: ChatMessage = { id: nextId.current++, role: 'user', text: trimmed, time: getTime() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, lang: getCurrentLang() }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      const botMsg: ChatMessage = { id: nextId.current++, role: 'bot', text: data.reply, time: getTime() }
      setMessages((prev) => [...prev, botMsg])
      playBotSound()
      if (!isOpenRef.current) {
        setBotMsgCount((prev) => prev + 1)
      }
    } catch {
      const errMsg: ChatMessage = {
        id: nextId.current++,
        role: 'bot',
        text: t.chatbot_error,
        time: getTime(),
      }
      setMessages((prev) => [...prev, errMsg])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        {/* Teaser */}
        <AnimatePresence>
          {showTeaser && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={`absolute ${getCurrentLang() === Languages.MALAY ? '-top-28' : '-top-24'} right-0 w-80`}
            >
              <div className="relative overflow-hidden rounded-3xl border border-orange-200/40 bg-gradient-to-br from-orange-500 to-red-500 shadow-2xl shadow-orange-600/50 text-white">
                <div className="absolute inset-0 opacity-30 animate-shimmer pointer-events-none" />
                <button
                  type="button"
                  onClick={() => setShowTeaser(false)}
                  className="absolute right-3 top-3 z-20 rounded-full p-1 text-white/80 hover:text-white cursor-pointer"
                  aria-label="Close teaser"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="relative z-10 flex items-start gap-3 px-5 py-4">
                  <motion.span
                    className="text-2xl select-none"
                    animate={{ rotate: [0, 8, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                  >
                    🤖
                  </motion.span>
                  <div>
                    <p className="text-sm font-bold mb-1">{t.chatbot_teaser_title}</p>
                    <p className="text-xs text-white/90">
                      {t.chatbot_teaser_body}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <button
          onClick={() => {
            setIsOpen((prev) => !prev)
            setShowTeaser(false)
          }}
          className="relative group cursor-pointer"
          aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
        >
          <span className="absolute inset-0 rounded-full bg-orange-500 animate-ping-soft" />
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-red-500 shadow-xl shadow-orange-600/50 flex items-center justify-center text-white hover:shadow-2xl transition-all duration-300"
          >
            <motion.div
              key={isOpen ? 'close' : 'open'}
              initial={{ opacity: 0, rotate: -15, scale: 0.9 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.div>
          </motion.div>

          {botMsgCount > 0 && !isOpen && (
            <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 shadow-md animate-bounce-soft flex items-center justify-center text-white text-[10px] font-bold">
              {botMsgCount > 9 ? '9+' : botMsgCount}
            </span>
          )}
        </button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-22 right-4 z-50 w-[400px] max-w-[calc(100vw-2rem)] h-[500px] bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-5 text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.div
                    animate={{ rotate: [0, 8, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="w-10 h-10 rounded-full ring-2 ring-white bg-white/10 flex items-center justify-center text-2xl select-none"
                  >
                    🤖
                  </motion.div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 ring-2 ring-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg leading-none">{t.chatbot_bot_name}</h3>
                  <p className="text-xs text-white/70 mt-0.5">{t.chatbot_status}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 cursor-pointer"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 p-4 overflow-y-auto scroll-smooth bg-white space-y-4"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.map((msg) =>
                msg.role === 'bot' ? (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex gap-2 items-end"
                  >
                    <div className="w-7 h-7 flex items-center justify-center text-xl flex-shrink-0 select-none">🤖</div>
                    <div className="flex flex-col gap-1 max-w-[82%]">
                      <div className="bg-orange-50 border border-orange-100 rounded-3xl rounded-bl-none px-4 py-3 shadow-sm">
                        <p className="text-sm text-orange-900 whitespace-pre-line">{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-orange-300 ml-1 select-none">{msg.time}</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col items-end gap-1"
                  >
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-3xl rounded-tr-none px-4 py-3 max-w-[82%] shadow-sm">
                      <p className="text-sm">{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-orange-300 mr-1 select-none">{msg.time}</span>
                  </motion.div>
                )
              )}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-2 items-end"
                >
                  <div className="w-7 h-7 flex items-center justify-center text-xl flex-shrink-0 select-none">🤖</div>
                  <div className="bg-orange-50 border border-orange-100 rounded-3xl rounded-bl-none px-4 py-3 shadow-sm">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-2 h-2 rounded-full bg-orange-400 block"
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Actions — only on fresh open */}
              {messages.length === 1 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2 pt-1"
                >
                  {[t.chatbot_quick_1, t.chatbot_quick_2, t.chatbot_quick_3].map((action) => (
                    <motion.button
                      key={action}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => sendMessage(action)}
                      className="w-full text-left px-4 py-3 bg-orange-50 border border-orange-200 rounded-2xl hover:border-orange-400 hover:bg-orange-100 transition-all duration-200 text-sm font-medium text-orange-900 cursor-pointer"
                    >
                      {action}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-orange-100 flex-shrink-0">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t.chatbot_placeholder}
                  disabled={isTyping}
                  className="flex-1 px-4 py-2.5 bg-orange-50 border border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm transition-all disabled:opacity-60"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className={`w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center hover:shadow-lg hover:shadow-orange-600/50 transition-shadow ${input.trim() && !isTyping ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}`}
                >
                  <SendHorizontal className="w-4 h-4" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}