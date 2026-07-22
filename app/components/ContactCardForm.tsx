'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Form, FormItem, FormLabel, FormControl } from '@/components/ui/form'
import CustomButton from '@/components/ui/custom-button'
import { filterHydrationSensitiveProps } from '@/lib/hydration-utils'
import { CheckCircle2, XCircle, Loader2, Send } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  mobile: string
  message: string
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Shared field styling — orange accent, soft orange background, clearer focus state.
const fieldClass =
  'w-full bg-orange-50/60 border border-orange-200 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:border-orange-400 transition-colors'

// Label row that shows the field name, a required asterisk, and — when the
// field fails validation — a small red inline error message right beside it.
function FieldLabel({
  htmlFor,
  label,
  required = true,
  error,
}: {
  htmlFor: string
  label: string
  required?: boolean
  error?: string
}) {
  return (
    <FormLabel htmlFor={htmlFor} className="flex flex-wrap items-baseline gap-x-2">
      <span>
        {label} {required ? <span className="text-orange-500">*</span> : <span className="text-gray-400 font-normal normal-case">(Optional)</span>}
      </span>
      {error && <span className="text-red-500 text-xs font-normal normal-case">{error}</span>}
    </FormLabel>
  )
}

// Anti-spam: minimum time (ms) that must pass between successful submissions.
const RESUBMIT_COOLDOWN_MS = 60_000
const COOLDOWN_STORAGE_KEY = 'contactForm:lastSubmittedAt'

export default function ContactCardForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [isClient, setIsClient] = useState(false)
  const [cooldownRemaining, setCooldownRemaining] = useState(0)
  const submitStartRef = useRef(0) // guards against sub-second double submits (double click / double tap)
  const honeypotRef = useRef<HTMLInputElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Prevent hydration mismatch by ensuring client-side only behavior
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Restore any active cooldown from a previous successful submission (persists across reloads)
  useEffect(() => {
    if (typeof window === 'undefined') return
    const lastSubmittedAt = Number(window.localStorage.getItem(COOLDOWN_STORAGE_KEY) || 0)
    const remaining = lastSubmittedAt + RESUBMIT_COOLDOWN_MS - Date.now()
    if (remaining > 0) setCooldownRemaining(remaining)
  }, [])

  // Tick down the cooldown timer every second
  useEffect(() => {
    if (cooldownRemaining <= 0) return
    const interval = setInterval(() => {
      setCooldownRemaining((prev) => Math.max(0, prev - 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [cooldownRemaining])

  // Auto-dismiss the success/error banner after 1 minute
  useEffect(() => {
    if (status !== 'success' && status !== 'error') return
    const timer = setTimeout(() => setStatus('idle'), 60000)
    return () => clearTimeout(timer)
  }, [status])

  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      mobile: '',
      message: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldUseNativeValidation: false, // Reduce dynamic attributes
    criteriaMode: 'firstError',
    resolver: undefined,
  })

  const onSubmit = async (data: FormData) => {
    // Silently drop bot submissions that fill the hidden honeypot field.
    if (honeypotRef.current?.value) {
      form.reset()
      setStatus('success')
      return
    }

    // Block resubmission while a cooldown from a previous success is active,
    // and guard against rapid double-clicks/taps triggering duplicate requests.
    if (cooldownRemaining > 0 || status === 'loading') return
    const now = Date.now()
    if (now - submitStartRef.current < 2000) return
    submitStartRef.current = now

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        form.reset()
        setStatus('success');
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(COOLDOWN_STORAGE_KEY, String(now))
        }
        setCooldownRemaining(RESUBMIT_COOLDOWN_MS)
      } else {
        setStatus('error');
      }
    } catch {
      // error intentionally ignored
      setStatus('error'); // optional fallback if fetch throws before getting a response
    }
  };


  return (
    <section
      ref={sectionRef}
      className="relative bg-cover bg-center bg-no-repeat py-16 md:py-20 px-4 md:px-6 lg:px-8"
      style={{ backgroundImage: "url('/images/contact-bg.jpg')" }}
    >
      {/* Multi-layer overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/55 to-orange-950/50 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 48, filter: 'blur(6px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <div className="bg-white/97 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-10 border border-orange-100/70 ring-1 ring-orange-100/40">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">
              Send Us a <span className="text-orange-500">Message</span>
            </h2>
            <p className="text-gray-600 text-sm md:text-base">
              Fill in your details below and our team will get back to you shortly.
            </p>
          </div>
          
          {isClient && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                {/* Honeypot field: hidden from real users, bots often auto-fill it */}
                <input
                  ref={honeypotRef}
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormItem>
                    <FieldLabel htmlFor="name" label="Name" error={form.formState.errors.name?.message} />
                    <FormControl>
                      <Input
                        type="text"
                        id="name"
                        placeholder="Your full name"
                        className={fieldClass}
                        {...filterHydrationSensitiveProps(form.register('name', { required: 'Require' }))}
                      />
                    </FormControl>
                  </FormItem>
                  
                  <FormItem>
                    <FieldLabel htmlFor="email" label="Email" error={form.formState.errors.email?.message} />
                    <FormControl>
                      <Input
                        type="email"
                        id="email"
                        placeholder="you@company.com"
                        className={fieldClass}
                        {...filterHydrationSensitiveProps(form.register('email', {
                          required: 'Require',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Incorrect format: (name@example.com)'
                          }
                        }))}
                      />
                    </FormControl>
                  </FormItem>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormItem>
                    <FieldLabel htmlFor="mobile" label="Mobile Number" required={false} />
                    <FormControl>
                      <Input
                        type="tel"
                        id="mobile"
                        placeholder="+60 12-345 6789"
                        className={fieldClass}
                        {...filterHydrationSensitiveProps(form.register('mobile'))}
                      />
                    </FormControl>
                  </FormItem>
                  
                  <FormItem>
                    <FieldLabel htmlFor="company" label="Company Name" required={false} />
                    <FormControl>
                      <Input
                        type="text"
                        id="company"
                        placeholder="Your company"
                        className={fieldClass}
                        {...filterHydrationSensitiveProps(form.register('company'))}
                      />
                    </FormControl>
                  </FormItem>
                </div>

                <FormItem>
                  <FieldLabel htmlFor="message" label="Your Message" error={form.formState.errors.message?.message} />
                  <FormControl>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      rows={4}
                      className={fieldClass}
                      {...filterHydrationSensitiveProps(form.register('message', { required: 'Require' }))}
                    />
                  </FormControl>
                </FormItem>

              <CustomButton
                onClick={form.handleSubmit(onSubmit)}
                disabled={status === 'loading' || cooldownRemaining > 0}
                hoverShadow
                compactPadding
                className="w-full justify-center normal-case tracking-normal text-base rounded-xl"
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending...
                  </span>
                ) : cooldownRemaining > 0 ? (
                  <span className="flex items-center justify-center gap-2">
                    Please wait {Math.ceil(cooldownRemaining / 1000)}s before sending again
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </span>
                )}
              </CustomButton>

              {status === 'success' && (
                <div className="mt-0 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 text-sm md:text-base flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Message sent successfully! We&apos;ll get back to you soon.
                  </p>
                </div>
              )}
              {status === 'error' && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm md:text-base flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Something went wrong. Please try again.
                  </p>
                </div>
              )}
              </form>
            </Form>
          )}
        </div>
      </motion.div>
    </section>
  )
}