'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

// ─── Data ────────────────────────────────────────────────────────────────────

const agendaItems = [
  {
    time: '13:00–13:20',
    agenda: 'Registration, Demo Booths & Networking',
    speaker: '',
  },
  {
    time: '13:20–13:35',
    agenda: 'Opening Speech',
    speaker:
      'YB Tuan Jagdeep Singh Deo, The Deputy Chief Minister II of Penang, Malaysia Science & Technology, Human Talent Development',
  },
  {
    time: '13:35–13:50',
    agenda: 'Malaysia AI Adoption Insights',
    speaker: 'Mr. Duncan Lee, Director of Technology, MSIA',
  },
  {
    time: '13:50–14:10',
    agenda: 'AI Adoption Success Cases',
    speaker: 'Mr Tham Kok Tong, Specialist, Ashisuto',
  },
  {
    time: '14:10–14:40',
    agenda: 'AI Strategy in Semicon Industry (based in Taiwan Experience)',
    speaker: 'Mr James Yang, Special Assistant to CEO, Profet AI',
  },
  {
    time: '14:40–14:55',
    agenda:
      'Building Cloud-Ready AI Foundations For Semiconductor: A Practical Path with AWS',
    speaker:
      'Ms Wong Mei Yin, Senior Partner Sales Manager, AWS (Amazon Web Services)',
  },
  {
    time: '14:55–15:25',
    agenda: 'Tea Break, Demo Booths & Networking',
    speaker: '',
  },
  {
    time: '15:25–15:50',
    agenda:
      'Beyond Automation: How AI is Reshaping the Industry and Decision-Making in OSAT',
    speaker:
      'Dr Howard Hsieh, Consultant, Taiwan Artificial Intelligence Association',
  },
  {
    time: '15:50–16:00',
    agenda: 'Closing Remarks',
    speaker:
      'Log. Cefinny JP Teh, Director of Business Development & Finance, Ashisuto',
  },
]

const features = [
  {
    title: 'World-class insights',
    description:
      "Learn from Taiwan's semiconductor and advanced manufacturing AI experience.",
  },
  {
    title: 'Practical use cases',
    description:
      'Explore how frontline know-how becomes deployable AI applications.',
  },
  {
    title: 'Governed adoption',
    description:
      'Discuss what it takes to embed AI into workflows with control and visibility.',
  },
  {
    title: 'Measurable impact',
    description:
      'Connect AI projects to efficiency, quality, decision-making, and ROI.',
  },
]

const partners = [
  {
    label: 'MAIN SPONSOR',
    logos: [{ src: '/images/semicon-event/AWS_Logo.png', alt: 'AWS', cls: 'max-h-20 w-full brightness-0' }],
  },
  {
    label: 'SUPPORTED BY',
    logos: [{ src: '/images/semicon-event/VSTECS_Logo.png', alt: 'VSTECS', cls: 'max-h-50 w-full' }],
  },
  {
    label: 'ORGANIZERS',
    logos: [
      { src: '/images/semicon-event/Ashisuto_Logo.png', alt: 'Ashisuto', cls: 'max-h-70 w-full' },
      { src: '/images/semicon-event/Profet-AI_Logo.png', alt: 'Profet AI', cls: 'max-h-16 w-full' },
    ],
  },
  {
    label: 'STRATEGIC PARTNER',
    logos: [{ src: '/images/semicon-event/MSIA_Logo.png', alt: 'MSIA', cls: 'max-h-20 w-full' }],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1]

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Types ───────────────────────────────────────────────────────────────────

// Email                    entry.1062703884
// Name                     entry.1905216335
// Company                  entry.989688833
// Job Title                entry.279530392
// Contact Number           entry.662329868
// Any Question             entry.1811735037
// Invited By               entry.577908083
// AI Development Status    entry.1729592948

interface FormData {
  "entry.1062703884": string  // Email
  "entry.1905216335": string  // Name
  "entry.989688833": string   // Company
  "entry.279530392": string   // Job Title
  "entry.662329868": string   // Contact Number
  "entry.577908083": string   // Invited By
  "entry.1729592948": string  // AI Development Status
  "entry.1811735037": string  // Any Question
}

const emptyForm: FormData = {
  "entry.1062703884": '',  // Email
  "entry.1905216335": '',  // Name
  "entry.989688833": '',   // Company
  "entry.279530392": '',   // Job Title
  "entry.662329868": '',   // Contact Number
  "entry.577908083": '',   // Invited By
  "entry.1729592948": '',  // AI Development Status
  "entry.1811735037": '',  // Any Question
}

// ─── Field component ─────────────────────────────────────────────────────────

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-base font-medium text-gray-700 mb-1.5">
        {label}{' '}
        {required && <span className="text-[#F04E23]">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputCls =
  'w-full border border-gray-300 rounded-lg px-4 py-2.5 text-base bg-white focus:outline-none focus:ring-2 focus:ring-[#2E9E8E]/40 focus:border-[#2E9E8E] transition placeholder-gray-400'

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SemiconEventPage() {
  const [formData, setFormData] = useState<FormData>(emptyForm)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch('https://docs.google.com/forms/u/0/d/e/1FAIpQLSdXYjXcHIr7Piu8b6sxoBKA3Wh_r6LTHUc7yaH0ogVXLcERgw/formResponse', {
        method: 'POST',
        mode: 'no-cors', // Google Forms always returns a CORS error; no-cors lets the request through silently
        // No Content-Type header — browser sets it automatically with the correct boundary when using URLSearchParams
        body: new URLSearchParams({
            "entry.1062703884": formData["entry.1062703884"],  // Email
            "entry.1905216335": formData["entry.1905216335"],  // Name
            "entry.989688833": formData["entry.989688833"],    // Company
            "entry.279530392": formData["entry.279530392"],    // Job Title
            "entry.662329868": formData["entry.662329868"],    // Contact Number
            "entry.577908083": formData["entry.577908083"],    // Invited By
            "entry.1729592948": formData["entry.1729592948"],  // AI Development Status
            "entry.1811735037": formData["entry.1811735037"],  // Any Question
        }),
      })
      // With no-cors the response is opaque — we can't read res.ok.
      // A resolved promise means the request was dispatched successfully.
      setStatus('success')
      setFormData(emptyForm)
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="bg-white overflow-x-hidden">

      {/* ════════════════════════════════════════════════════════
          SUCCESS MODAL
      ════════════════════════════════════════════════════════ */}
      {status !== 'success' && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setStatus('idle')}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[88vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top: Poster — full width, natural height, no cropping */}
            <div className="shrink-0">
              <Image
                src="/images/semicon-event/Event-Poster-Cropped.png"
                alt="From Semiconductor Know-How to AI ROI"
                width={3508}
                height={1069}
                className="w-full h-auto"
              />
            </div>

            {/* Bottom: scrollable content + pinned footer */}
            <div className="flex flex-col min-h-0">

              {/* Scrollable body */}
              <div className="overflow-y-auto px-6 pt-5 pb-2 space-y-4 flex-1">
                {/* Confirmation notice */}
                <div className="bg-[#2E9E8E]/10 border border-[#2E9E8E]/25 rounded-xl px-4 py-4 text-sm text-gray-700 space-y-2">
                  <p className="font-semibold text-[#2E9E8E]">✅ Registration Submitted!</p>
                  <p className="leading-relaxed">
                    Our Marketing team will review your registration. An official confirmation email will be sent after 25 July 2026, once your attendance has been confirmed.
                  </p>
                  <p>We look forward to welcoming you to the event!</p>
                </div>

                <div>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    A practical session for semiconductor and advanced manufacturing leaders — from real-world AI use cases to measurable operational ROI.
                  </p>
                </div>

                <div className="text-sm text-gray-700 space-y-1.5 bg-gray-50 rounded-xl px-4 py-4">
                  <p>🗓️ <span className="font-semibold">Date:</span> Thursday, 30 July 2026</p>
                  <p>
                    🕘 <span className="font-semibold">Time:</span> 1:00 PM – 4:20 PM{' '}
                  </p>
                  <p>📍 <span className="font-semibold">Venue:</span> Amari SPICE Penang 4F, Jadeite</p>
                  <p>👔 <span className="font-semibold">Attire:</span> Business Casual</p>
                </div>

                <p className="text-sm text-gray-600">We look forward to welcoming you!</p>
              </div>

              {/* Footer — pinned, never scrolls */}
              <div className="shrink-0 px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setStatus('idle')}
                  className="flex-1 border border-gray-300 text-gray-700 font-medium text-sm py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Register another person
                </button>
                <button
                  onClick={() => setStatus('idle')}
                  className="flex-1 bg-[#F04E23] hover:bg-[#d4431e] text-white font-semibold text-sm py-2.5 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 pt-16 pb-14 md:pt-20 md:pb-18 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">

          {/* Left */}
          <motion.div
            className="flex-1 min-w-0"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="text-[#F04E23] font-semibold text-sm tracking-[0.18em] uppercase mb-5">
              — Executive Semiconductor AI Session
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-6">
              From{' '}
              <span className="text-[#F04E23]">Semiconductor Know&#8209;How</span>{' '}
              to AI ROI
            </h1>

            <p className="text-gray-600 text-lg md:text-xl mb-7 max-w-xl leading-relaxed">
              From use case to ROI. From world-class insights to Malaysia impact. A
              practical session for semiconductor and advanced manufacturing leaders
              ready to turn frontline know-how into scalable AI applications.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                'Practical use cases',
                'Measurable impact',
                'Scalable ROI',
                'AI adoption strategy',
              ].map((tag) => (
                <span
                  key={tag}
                  className="border border-gray-300 text-gray-600 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-10">
              <a
                href="#register"
                className="bg-[#F04E23] hover:bg-[#d4431e] text-white font-semibold text-base px-6 py-3 rounded-full transition-colors duration-200 shadow-sm"
              >
                Register on this page
              </a>
              <a
                href="#agenda"
                className="border border-gray-400 hover:border-gray-700 text-gray-700 font-semibold text-base px-6 py-3 rounded-full transition-colors duration-200"
              >
                View agenda
              </a>
            </div>

            {/* Event meta */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 border-t border-gray-200 pt-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Date &amp; Time
                </p>
                <p className="text-gray-800 font-semibold text-base">July 30 (Thursday)</p>
                <p className="text-gray-800 font-semibold text-base">13:00–16:00</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Venue
                </p>
                <p className="text-gray-800 font-semibold text-base">Amari SPICE Penang</p>
                <p className="text-gray-800 font-semibold text-base">4F, Jadeite</p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Approval
                </p>
                <p className="text-gray-800 font-semibold text-base">
                  Registration subject to organizer approval
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right – decorative visual */}
          <motion.div
            className="shrink-0 flex justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.15 }}
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#F04E23]/15" />
              <div className="absolute inset-4 rounded-full border border-dashed border-[#F04E23]/20" />
              {/* Inner ring */}
              <div className="absolute inset-10 rounded-full border-2 border-[#F04E23]/25" />
              {/* Center */}
              <div className="absolute inset-18 bg-gray-900 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white text-3xl font-black tracking-tight">AI</span>
              </div>
              {/* Floating labels */}
              <span className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                Use case
              </span>
              <span className="absolute bottom-12 left-5 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                Workflow
              </span>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#F04E23] font-bold uppercase tracking-wider">
                Impact
              </span>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-semibold uppercase tracking-wider text-center">
                <span className="text-[#F04E23] block">ROI</span>
                <span className="block">Scaled</span>
              </span>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BUILT FOR LEADERS
      ════════════════════════════════════════════════════════ */}
      <section className="bg-gray-50 py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-20 mb-12">
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                  Built for leaders moving from AI pilots to operational ROI.
                </h2>
              </div>
              <div className="lg:w-1/2 flex items-center">
                <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
                  As Malaysia&apos;s semiconductor ecosystem moves up the value chain,
                  manufacturers need AI that moves beyond isolated experiments and into
                  governed, repeatable workflows.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
                  <div className="w-8 h-1 bg-[#F04E23] rounded-full mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{f.title}</h3>
                  <p className="text-gray-500 text-base leading-relaxed flex-1">{f.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          EVENT AGENDA
      ════════════════════════════════════════════════════════ */}
      <section
        id="agenda"
        className="py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24"
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-20 mb-10">
              <div className="lg:w-1/2">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                  Event agenda
                </h2>
              </div>
              <div className="lg:w-1/2 flex items-center">
                <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                  Agenda and speakers are subject to change. Registration and demo booth
                  networking open at 13:00.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Desktop table */}
          <FadeIn delay={0.1}>
            <div className="hidden md:block overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
              <table className="w-full text-base">
                <thead>
                  <tr className="bg-[#2E9E8E] text-white">
                    <th className="text-left px-6 py-4 font-semibold w-36">Time</th>
                    <th className="text-left px-6 py-4 font-semibold">Agenda</th>
                    <th className="text-left px-6 py-4 font-semibold w-72">Speaker</th>
                  </tr>
                </thead>
                <tbody>
                  {agendaItems.map((item, i) => (
                    <tr
                      key={item.time}
                      className={
                        i % 2 === 0
                          ? 'bg-white border-t border-gray-100'
                          : 'bg-gray-50/60 border-t border-gray-100'
                      }
                    >
                      <td className="px-6 py-4 font-semibold text-gray-700 whitespace-nowrap align-top">
                        {item.time}
                      </td>
                      <td className="px-6 py-4 text-gray-700 align-top">{item.agenda}</td>
                      <td className="px-6 py-4 text-gray-500 align-top text-sm leading-relaxed">
                        {item.speaker}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FadeIn>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {agendaItems.map((item, i) => (
              <FadeIn key={item.time} delay={i * 0.05}>
                <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
                  <span className="inline-block bg-[#2E9E8E] text-white text-sm font-semibold px-3 py-1 rounded-full mb-2">
                    {item.time}
                  </span>
                  <p className="font-semibold text-gray-800 text-base mb-1">{item.agenda}</p>
                  {item.speaker && (
                    <p className="text-gray-500 text-sm leading-relaxed">{item.speaker}</p>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          REGISTER
      ════════════════════════════════════════════════════════ */}
      <section
        id="register"
        className="bg-gray-50 py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24"
      >
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-20 mb-10">
              <div className="lg:w-2/5">
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                  Register for the session
                </h2>
              </div>
              <div className="lg:w-3/5 flex items-center">
                <p className="text-gray-500 text-base md:text-lg leading-relaxed">
                  Submit your details directly here. Seats are limited, and registration
                  is subject to organizer approval.
                </p>
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col lg:flex-row gap-8 xl:gap-10">

            {/* ── Event details + Map ── */}
            <FadeIn className="lg:w-2/5">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-6 text-xl">Event details</h3>
                <dl className="space-y-4 text-base">
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                      DATE
                    </dt>
                    <dd className="text-gray-800 font-semibold">July 30 (Thursday)</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                      TIME
                    </dt>
                    <dd className="text-gray-800 font-semibold">13:00–16:00</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">
                      VENUE
                    </dt>
                    <dd className="text-gray-800 font-semibold">Amari SPICE Penang, 4F, Jadeite</dd>
                  </div>
                </dl>

                {/* Google Maps embed */}
                <div className="mt-6 rounded-xl overflow-hidden border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.5657782750363!2d100.27878617609836!3d5.330208994648347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x304ac18a353aeff5%3A0x69f4db7ff29a8fec!2sAmari%20SPICE%20Penang!5e0!3m2!1sen!2smy!4v1783560025906!5m2!1sen!2smy"
                    width="100%"
                    height="220"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Amari SPICE Penang map"
                  />
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Amari%20SPICE%20Penang%204F%20Jadeite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-base text-[#2E9E8E] hover:underline font-medium"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Open in Google Maps
                </a>

                <p className="text-sm text-gray-400 mt-4">
                  Registration is subject to organizer approval.
                </p>
              </div>
            </FadeIn>

            {/* ── Registration form ── */}
            <FadeIn delay={0.1} className="lg:w-3/5">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email */}
                    <Field label="Email" required>
                      <input
                        type="email"
                        name="entry.1062703884"
                        required
                        autoComplete="email"
                        placeholder="name@company.com"
                        value={formData["entry.1062703884"]}
                        onChange={handleChange}
                        className={inputCls}
                      />
                    </Field>

                    {/* Name + Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Name" required>
                        <input
                          type="text"
                          name="entry.1905216335"
                          required
                          autoComplete="name"
                          value={formData["entry.1905216335"]}
                          onChange={handleChange}
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Company" required>
                        <input
                          type="text"
                          name="entry.989688833"
                          required
                          autoComplete="organization"
                          value={formData["entry.989688833"]}
                          onChange={handleChange}
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    {/* Job Title + Contact Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Job Title" required>
                        <input
                          type="text"
                          name="entry.279530392"
                          required
                          autoComplete="organization-title"
                          value={formData["entry.279530392"]}
                          onChange={handleChange}
                          className={inputCls}
                        />
                      </Field>
                      <Field label="Contact Number" required>
                        <input
                          type="tel"
                          name="entry.662329868"
                          required
                          autoComplete="tel"
                          value={formData["entry.662329868"]}
                          onChange={handleChange}
                          className={inputCls}
                        />
                      </Field>
                    </div>

                    {/* Invited By */}
                    <Field label="Invited By" required>
                      <select
                        name="entry.577908083"
                        required
                        value={formData["entry.577908083"]}
                        onChange={handleChange}
                        className={inputCls}
                      >
                        <option value="">Select</option>
                        <option value="Ashisuto">Ashisuto</option>
                        <option value="Profet AI">Profet AI</option>
                        <option value="MSIA">MSIA</option>
                        <option value="AWS">AWS</option>
                        <option value="VSTECS">VSTECS</option>
                      </select>
                    </Field>

                    {/* AI development status */}
                    <Field label="Current status of AI development" required>
                      <select
                        name="entry.1729592948"
                        required
                        value={formData["entry.1729592948"]}
                        onChange={handleChange}
                        className={inputCls}
                      >
                        <option value="">Select the closest option</option>
                        <option value="Individual experimentation (Employees are using tools like ChatGPT on their own)">Individual experimentation (Employees are using tools like ChatGPT on their own)</option>
                        <option value="Enterprise productivity tools (The company has adopted tools such as Microsoft Copilot, ChatGPT Enterprise, or Gemini.)">Enterprise productivity tools (The company has adopted tools such as Microsoft Copilot, ChatGPT Enterprise, or Gemini.)</option>
                        <option value="Project-based AI use cases">Project-based AI use cases</option>
                        <option value="Governed workflow adoption (AI or AI agents are embedded into workflows with access control, monitoring, and auditability.)">Governed workflow adoption (AI or AI agents are embedded into workflows with access control, monitoring, and auditability.)</option>
                        <option value="I'm not sure">I&#x27;m not sure</option>
                      </select>
                    </Field>

                    {/* Questions */}
                    <Field label="Any questions you'd like to ask beforehand">
                      <textarea
                        name="entry.1811735037"
                        rows={3}
                        placeholder="Optional"
                        value={formData["entry.1811735037"]}
                        onChange={handleChange}
                        className={`${inputCls} resize-none`}
                      />
                    </Field>

                    {status === 'error' && (
                      <p className="text-base text-red-500 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                        Something went wrong. Please try again or contact us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full bg-[#F04E23] hover:bg-[#d4431e] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors duration-200 text-base"
                    >
                      {status === 'loading' ? 'Submitting…' : 'Submit registration'}
                    </button>
                  </form>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ORGANIZERS AND PARTNERS
      ════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              Organizers and partners
            </h2>
            <p className="text-gray-500 text-base md:text-lg max-w-md mx-auto">
              Hosted with support from Malaysia&apos;s semiconductor and technology ecosystem.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-gray-200 overflow-hidden shadow-sm bg-white">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                {partners.map((p) => (
                  <div key={p.label} className="flex flex-col">
                    {/* Label row */}
                    <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
                      <p className="text-sm font-bold uppercase tracking-widest text-gray-500 text-center">
                        {p.label}
                      </p>
                    </div>
                    {/* Logo area */}
                    <div className="flex flex-col items-center justify-center gap-8 px-8 py-10 flex-1 min-h-60">
                      {p.logos.map((logo) => (
                        <Image
                          key={logo.alt}
                          src={logo.src}
                          alt={logo.alt}
                          width={240}
                          height={96}
                          className={`object-contain ${logo.cls}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  )
}
