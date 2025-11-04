"use client"

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

export default function BreakingMarquee({ limit = 8, intervalMs = 4000 }: { limit?: number; intervalMs?: number }) {
  const [items, setItems] = useState<any[]>([])
  const [paused, setPaused] = useState(false)
  const [index, setIndex] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/articles', { signal: controller.signal })
      .then(r => r.json())
      .then((data) => {
        if (Array.isArray(data)) setItems(data.slice(0, limit))
      })
      .catch(() => { })
    return () => controller.abort()
  }, [limit])

  useEffect(() => {
    if (!items.length) return
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current)
      return
    }
    timerRef.current = setInterval(() => {
      setIndex(i => (i + 1) % items.length)
    }, intervalMs)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [items, paused, intervalMs])

  const prev = () => setIndex(i => (i - 1 + items.length) % items.length)
  const next = () => setIndex(i => (i + 1) % items.length)

  if (!items.length) return null

  return (
    <div className="flex items-center justify-between gap-2 mb-4">
      <div className="flex items-center gap-3 flex-1 overflow-hidden">
        <span className="inline-block bg-red-600 text-white px-3 py-1 rounded font-bold">TRENDING</span>
        <div
          className="relative flex-1 py-2"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          tabIndex={0}
          aria-label="Breaking news"
        >
          {items.map((a, i) => (
            <div
              key={a.slug}
              className={`absolute transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            >
              <Link href={`/articles/${a.slug}`} className="font-semibold hover:underline block pr-16">{a.title}</Link>
            </div>
          ))}
          {/* container height stabilization */}
          <div className="invisible">
            <span className="font-semibold">{items[0]?.title}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={prev} aria-label="Previous" className="w-8 h-8 border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 inline-flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button onClick={next} aria-label="Next" className="w-8 h-8 border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50 inline-flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  )
}
