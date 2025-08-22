'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

interface FormData {
  name: string
  email: string
  company: string
  mobile: string
  message: string
}

export default function ContactCardForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const form = useForm<FormData>({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      mobile: '',
      message: '',
    },
  })

  const onSubmit = async (data: FormData) => {
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
      className="relative bg-cover bg-center bg-no-repeat py-16 md:py-20 px-4 md:px-6 lg:px-8 mt-16 md:mt-20"
      style={{ backgroundImage: "url('/images/contact-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Card */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
            <p className="text-gray-600">We&apos;d love to hear from you</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="name"
                      placeholder="Name"
                      className="w-full"
                      {...form.register('name', { required: 'Name is required' })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email"
                      className="w-full"
                      {...form.register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <FormItem>
                  <FormLabel htmlFor="mobile">Mobile Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      id="mobile"
                      placeholder="Mobile Number"
                      className="w-full"
                      {...form.register('mobile')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
                <FormItem>
                  <FormLabel htmlFor="company">Company Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="company"
                      placeholder="Company Name"
                      className="w-full"
                      {...form.register('company')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </div>

              <FormItem>
                <FormLabel htmlFor="message">Your message</FormLabel>
                <FormControl>
                  <Textarea
                    id="message"
                    placeholder="Your message"
                    rows={4}
                    className="w-full"
                    {...form.register('message', { required: 'Message is required' })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

            <Button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 md:py-4 rounded-lg transition duration-300 shadow-md hover:shadow-lg"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </Button>

            {status === 'success' && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 text-sm md:text-base flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  Message sent successfully! We&apos;ll get back to you soon.
                </p>
              </div>
            )}
            {status === 'error' && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm md:text-base flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                  </svg>
                  Something went wrong. Please try again.
                </p>
              </div>
            )}
            </form>
          </Form>
        </div>
      </div>
    </section>
  )
}