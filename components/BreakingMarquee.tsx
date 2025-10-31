"use client"

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

export default function BreakingMarquee({ limit = 8 }: { limit?: number }) {
  const [items, setItems] = useState<any[]>([])
  const [paused, setPaused] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

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

  if (!items.length) return null

  return (
    <div className="flex items-center overflow-hidden gap-1">
      <span className="inline-block bg-red-600 text-white px-3 py-1 rounded font-bold">TRENDING</span>
      <div
        className="marquee py-2 flex items-center gap-4"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        tabIndex={0}
        ref={containerRef}
        aria-label="Breaking news"
      >

        <div className={`marquee-content ${paused ? 'paused' : ''}`}>
          {items.map(a => (
            <span key={a.slug} className="mx-6 inline-block">
              <Link href={`/articles/${a.slug}`} className="font-semibold hover:underline">{a.title}</Link>
              {/* <span className="text-sm text-gray-200 ml-2">• {a.publishedAt}</span> */}
            </span>
          ))}
          {/* duplicate to create seamless loop */}
          {items.map(a => (
            <span key={"dup-" + a.slug} className="mx-6 inline-block">
              <Link href={`/articles/${a.slug}`} className="font-semibold hover:underline">{a.title}</Link>
              <span className="text-sm text-gray-200 ml-2">• {a.publishedAt}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
