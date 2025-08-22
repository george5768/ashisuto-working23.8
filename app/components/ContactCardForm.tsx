'use client'

import { useState } from 'react'

export default function ContactCardForm() {
  const [form, setForm] = useState({
  name: '',
  email: '',
  company: '',
  mobile: '',
  message: '',
});

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus('loading');

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ name: '', email: '', mobile: '', company: '', message: '' });
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
      className="relative bg-cover bg-center bg-no-repeat py-20 px-4 mt-20"
      style={{ backgroundImage: "url('/images/contact-bg.jpg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Card */}
      <div className="relative z-10 max-w-xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={e => setForm({ ...form, mobile: e.target.value })}
              placeholder="Mobile Number"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            
            <input
            type="text"
            name="company"
            value={form.company}
            onChange={e => setForm({ ...form, company: e.target.value })}
            placeholder="Company Name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <textarea
              name="message"
              rows={5}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              placeholder="Your message"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md transition"
            >
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>

            {status === 'success' && (
              <p className="text-green-600 text-sm text-center mt-2">✅ Message sent successfully!</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 text-sm text-center mt-2">❌ Something went wrong. Please try again.</p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}