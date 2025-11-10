'use client'

import { useEffect, useState } from 'react'

export default function ShareButtons({ title }: { title: string }) {
  const [shareUrl, setShareUrl] = useState('')
  const [shareText, setShareText] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(encodeURIComponent(window.location.href))
      setShareText(encodeURIComponent(title))
    }
  }, [title])

  return (
    <div className="mb-8 pb-6 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold text-gray-700">Share:</span>
        <div className="flex items-center gap-3">
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#1877F2] flex items-center justify-center hover:bg-[#166FE5] transition-colors"
            aria-label="Share on Facebook"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3h4v4h-3c-1.1 0-2 .9-2 2v3h5l-1 4h-4v8h-4v-8H5v-4h3V9c0-3.31 2.69-6 6-6z"/>
            </svg>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#1DA1F2] flex items-center justify-center hover:bg-[#1A91DA] transition-colors"
            aria-label="Share on Twitter"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.444 4.834c-.815.36-1.69.603-2.616.713a4.55 4.55 0 001.994-2.506 9.032 9.032 0 01-2.875 1.1A4.518 4.518 0 0016.29 3c-2.5 0-4.524 2.03-4.524 4.532 0 .356.04.704.116 1.037-3.76-.19-7.096-1.99-9.33-4.73a4.548 4.548 0 00-.613 2.28 4.533 4.533 0 002.015 3.772 4.49 4.49 0 01-2.048-.566v.058c0 2.18 1.548 4.003 3.6 4.417a4.54 4.54 0 01-2.04.078 4.525 4.525 0 004.223 3.142A9.064 9.064 0 010 19.54a12.78 12.78 0 006.92 2.03c8.303 0 12.843-6.878 12.843-12.84 0-.195-.004-.39-.013-.583a9.18 9.18 0 002.25-2.343z"/>
            </svg>
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#0A66C2] flex items-center justify-center hover:bg-[#095185] transition-colors"
            aria-label="Share on LinkedIn"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7 0h3.8v2.2h.1c.5-1 1.7-2.2 3.6-2.2 3.8 0 4.5 2.5 4.5 5.8V24h-4v-7.2c0-1.7 0-3.8-2.3-3.8-2.3 0-2.6 1.8-2.6 3.7V24h-4V8z"/>
            </svg>
          </a>
          <a
            href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#20BA5A] transition-colors"
            aria-label="Share on WhatsApp"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

