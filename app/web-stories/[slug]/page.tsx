'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { WEB_STORIES_LIST } from '../../../data/webstories'

type StorySlide = {
    image: string
    title: string
    description?: string
}

type WebStory = {
    slug: string
    title: string
    image: string
    slides: StorySlide[]
}

// Build a simple story dataset using the shared list
const WEB_STORIES: Record<string, WebStory> = WEB_STORIES_LIST.reduce((acc, s) => {
  acc[s.slug] = {
    slug: s.slug,
    title: s.title,
    image: s.image,
    slides: [
      { image: s.image, title: s.title },
    ]
  }
  return acc
}, {} as Record<string, WebStory>)

export default function WebStoryPage({ params }: { params: { slug: string } }) {
    const router = useRouter()
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [progressMs, setProgressMs] = useState(0)
    const [shareOpen, setShareOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const [showRefresh, setShowRefresh] = useState(false)
    const [touchStart, setTouchStart] = useState(0)

    const story = WEB_STORIES[params.slug]
    const slides = story?.slides || (story ? [{ image: story.image, title: story.title }] : [])
    const totalSlides = slides.length
    const SLIDE_DURATION_MS = 5000

    // Autoplay progress loop (pauses when isPaused)
    useEffect(() => {
        if (!story) return
        if (isPaused) return
        const start = Date.now() - progressMs
        const id = setInterval(() => {
            const elapsed = Date.now() - start
            if (elapsed >= SLIDE_DURATION_MS) {
                setProgressMs(0)
                setCurrentSlide(prev => {
                    if (prev < totalSlides - 1) return prev + 1
                    // last slide reached: stop on this story and show refresh icon
                    setShowRefresh(true)
                    setIsPaused(true)
                    return prev
                })
            } else {
                setProgressMs(elapsed)
            }
        }, 100)
        return () => clearInterval(id)
    }, [isPaused, currentSlide, totalSlides, progressMs, story])

    // Reset progress when slide changes
    useEffect(() => {
        setProgressMs(0)
        setShowRefresh(false)
    }, [currentSlide])

    const goToNext = () => {
        if (currentSlide < totalSlides - 1) {
            setCurrentSlide(prev => prev + 1)
            setProgressMs(0)
        } else {
            // On last slide, do not close modal; show refresh and pause
            setShowRefresh(true)
            setIsPaused(true)
        }
    }

    const goToPrevious = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1)
            setProgressMs(0)
        } else {
            closeOverlay()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowRight') goToNext()
        if (e.key === 'ArrowLeft') goToPrevious()
        if (e.key === 'Escape') closeOverlay()
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0]
        setTouchStart(touch.clientX)
    }

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touch = e.changedTouches[0]
        const diff = touchStart - touch.clientX
        if (Math.abs(diff) > 50) {
            if (diff > 0) goToNext()
            else goToPrevious()
        }
    }

    const currentSlideData = slides[currentSlide]
    const currentProgressPct = Math.min(100, Math.max(0, (progressMs / SLIDE_DURATION_MS) * 100))

  function restartStory() {
    setCurrentSlide(0)
    setProgressMs(0)
    setShowRefresh(false)
    setIsPaused(false)
  }

  function closeOverlay() {
    try {
      if (typeof window !== 'undefined') {
        const hasStory = new URLSearchParams(window.location.search).has('story')
        if (hasStory) {
          window.history.back()
          return
        }
      }
    } catch (error) {
      console.error('Error checking URL parameters:', error)
    }
    router.push('/web-stories')
  }

    return (
        <div
            className="fixed inset-0 z-50 overflow-hidden"
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            tabIndex={0}
        >
            {/* Blurred background derived from current slide */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0">
                    <Image
                        src={currentSlideData.image}
                        alt="bg"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="scale-110 blur-2xl"
                        priority
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4),rgba(0,0,0,0.7))]" />
                </div>
            </div>
            {/* Centered story viewport (9:16) */}
            <div className="absolute inset-0 flex items-center justify-center md:p-0">
                <div className="relative w-full h-full md:aspect-[9/16] md:w-[min(92vw,420px)] md:max-h-[90vh] md:rounded-[28px] overflow-hidden md:shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
                    <Image
                        src={currentSlideData.image}
                        alt={currentSlideData.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="brightness-95"
                        priority
                        unoptimized
                    />
                    {/* slight vignette for readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50" />

                    {/* Segmented Progress Bar (inside viewport) */}
                    <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 px-3 py-2">
                        {slides.map((_, idx) => {
                            const filled = idx < currentSlide ? 100 : idx === currentSlide ? currentProgressPct : 0
                            return (
                                <div key={idx} className="flex-1 h-1.5 bg-white/40 rounded">
                                    <div className="h-full bg-white rounded" style={{ width: `${filled}%` }} />
                                </div>
                            )
                        })}
                    </div>

                    {/* Logo at top center */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                        <Image src="/Hindusthanpost-logo-300x57.png" alt="Hindusthanpost" width={160} height={30} priority />
                    </div>

                    {/* Top Right Controls */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-2">
                        <button
                            onClick={() => setIsPaused(!isPaused)}
                            className="w-9 h-9 bg-black/55 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                            aria-label={isPaused ? 'Play' : 'Pause'}
                        >
                            {isPaused ? (
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={() => { setShareOpen(true); setIsPaused(true) }}
                            className="w-9 h-9 bg-black/55 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                            aria-label="Share"
                        >
                            <Image
                                src="data:image/svg+xml;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' fill='none'><path fill='%23fff' d='m21.1 25.4 9.87-9.86 1.42 1.42-9.86 9.87z'/><path stroke='%23fff' stroke-linecap='round' stroke-width='1.9' d='m16.85 19.82 15.33-4.14c.04 0 .07.03.06.06l-4.02 15.34a1.6 1.6 0 0 1-2.97.33l-2.93-5.73-5.77-2.88a1.6 1.6 0 0 1 .3-2.98Z'/></svg>"
                                alt="Share"
                                width={32}
                                height={32}
                                className="min-w-8 min-h-8"
                            />
                        </button>
                        
                    </div>

                    {/* Center Title Bubble */}
                    <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 w-[86%] px-4">
                        <div className="mx-auto bg-white/90 backdrop-blur-xl rounded-[40px] px-7 py-6 shadow-[0_12px_50px_rgba(0,0,0,0.35)] border border-white/60">
                            <h2 className="text-[26px] md:text-[30px] font-extrabold text-[#C2185B] text-center leading-tight">
                                {currentSlideData.title}
                            </h2>
                            {currentSlideData.description && (
                                <p className="text-[15px] text-gray-800 text-center mt-3">
                                    {currentSlideData.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Share Modal */}
                    {shareOpen && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center">
                            <button
                                aria-label="Close share"
                                className="absolute inset-0 bg-black/50"
                                onClick={() => { setShareOpen(false); setIsPaused(false); setCopied(false) }}
                            />
                            <div className="relative bg-white rounded-xl shadow-2xl p-4 md:p-5 w-[320px]">
                                <button
                                    onClick={() => { setShareOpen(false); setIsPaused(false); setCopied(false) }}
                                    className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-white shadow flex items-center justify-center"
                                    aria-label="Close"
                                >
                                    <svg className="w-4 h-4 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <div className="grid grid-cols-4 gap-3">
                                    <button
                                        onClick={async () => {
                                            try {
                                                await navigator.clipboard.writeText(window.location.href)
                                                setCopied(true)
                                                setTimeout(() => setCopied(false), 1500)
                                            } catch (error) {
                                                console.error('Failed to copy to clipboard:', error)
                                            }
                                        }}
                                        className="flex flex-col items-center gap-2"
                                    >
                                        <span className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.172 7H7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-6.172a2 2 0 00-.586-1.414l-3.828-3.828A2 2 0 0013.172 7z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7V5a2 2 0 012-2h6" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-700">{copied ? 'Copied' : 'Get Link'}</span>
                                    </button>

                                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                        target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2">
                                        <span className="w-10 h-10 rounded bg-black flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M18.244 2H21.5l-7.69 8.79L23.5 22h-7.297l-5.716-6.727L3.06 22H-.5l8.23-9.41L-.5 2h7.453l5.152 5.963L18.244 2zm-1.277 18h2.118L7.62 4h-2.27l11.617 16z" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-700">Twitter</span>
                                    </a>

                                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                        target="_blank" rel="noreferrer" className="flex flex-col items-center gap-2">
                                        <span className="w-10 h-10 rounded bg-[#0A66C2] flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.1c.5-1 1.7-2.2 3.6-2.2 3.8 0 4.5 2.5 4.5 5.8V24h-4v-7.2c0-1.7 0-3.8-2.3-3.8-2.3 0-2.6 1.8-2.6 3.7V24h-4V8z" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-700">LinkedIn</span>
                                    </a>

                                    <a href={`mailto:?subject=${encodeURIComponent('Check this story')}&body=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                                        className="flex flex-col items-center gap-2">
                                        <span className="w-10 h-10 rounded bg-gray-200 flex items-center justify-center">
                                            <svg className="w-5 h-5 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8h18a2 2 0 002-2V8a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                            </svg>
                                        </span>
                                        <span className="text-xs text-gray-700">Email</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Tap zones for navigation (inside viewport) */}
                    <button
                        onClick={goToPrevious}
                        onMouseDown={() => setIsPaused(true)}
                        onMouseUp={() => setIsPaused(false)}
                        className="absolute left-0 top-0 h-full w-1/3 z-30 bg-transparent"
                        aria-label="Previous"
                    />
                    <button
                        onClick={goToNext}
                        onMouseDown={() => setIsPaused(true)}
                        onMouseUp={() => setIsPaused(false)}
                        className="absolute right-0 top-0 h-full w-1/3 z-30 bg-transparent"
                        aria-label="Next"
                    />

                    {/* Hide in-card arrows; we will render them outside the card on desktop */}
                    <div className="hidden" />
                </div>
            </div>

            {/* Desktop-only arrows placed OUTSIDE the story viewport */}
            <button
                onClick={goToPrevious}
                className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white/90 rounded-full shadow-md hover:bg-white"
                style={{ left: 'calc(50% - 240px - 20px)' }}
                aria-label="Previous slide"
            >
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={showRefresh ? restartStory : goToNext}
                className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 z-30 w-11 h-11 bg-white/90 rounded-full shadow-md hover:bg-white"
                style={{ right: 'calc(50% - 240px - 20px)' }}
                aria-label={showRefresh ? 'Restart' : 'Next slide'}
            >
                {showRefresh ? (
                  <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" d="M20 11a8 8 0 1 0 -2.343 5.657" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.6" d="M20 4v7h-7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                )}
            </button>










            {/* Slide Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                {slides.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? 'w-8 bg-white' : 'w-1.5 bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </div>
    )
}

