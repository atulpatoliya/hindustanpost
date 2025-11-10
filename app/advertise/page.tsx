'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Advertise() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', company: '', message: '' })
    }, 3000)
  }

  return (
    <div className="py-6">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center gap-2 text-gray-600">
          <li>
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-800">Advertise</li>
        </ol>
      </nav>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Advertise With Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Reach your target audience with Hindustanpost. We offer various advertising opportunities to help your brand connect with engaged readers.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Advertising Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                Thank you for your interest! Our team will contact you soon.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#C2185B]"
                    placeholder="Tell us about your advertising needs..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#C2185B] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#A0144A] transition-colors"
                >
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Advertising Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Advertise With Us?</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C2185B] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Reach a large, engaged audience</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C2185B] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Targeted advertising options</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C2185B] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Multiple ad formats available</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C2185B] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Competitive pricing packages</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#C2185B] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Dedicated account management</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#C2185B] to-[#A0144A] rounded-lg shadow-sm p-6 text-white">
              <h2 className="text-xl font-bold mb-2">Contact Our Sales Team</h2>
              <p className="text-sm mb-4 opacity-90">
                For immediate assistance, contact our advertising team directly.
              </p>
              <div className="space-y-2">
                <div>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:ads@hindustanpost.com" className="underline">
                    ads@hindustanpost.com
                  </a>
                </div>
                <div>
                  <strong>Phone:</strong> +91-XXX-XXX-XXXX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
