import Link from 'next/link'
import Image from 'next/image'
import { getAllCategories } from '../lib/categories'

export default function Header() {
  // server component: read categories from filesystem
  const categories = getAllCategories()

  // formatted date (server-side)
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <header className="border-b bg-white">
      {/* Top thin info bar */}
      <div className="bg-gray-50 border-b">
        <div className="container flex items-center justify-between text-sm text-gray-600 py-2">
          <div className="flex items-center gap-4">
            {/* <div className="hidden sm:inline-flex items-center gap-2">🌤️ <span className="">27 °C Mumbai</span></div> */}
            <div>{dateStr}</div>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                <path d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07c0 4.97 3.66 9.09 8.44 9.93v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.9h-2.3V22c4.78-.84 8.44-4.96 8.44-9.93z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 6.2A4.8 4.8 0 106.2 13 4.8 4.8 0 0012 8.2zm6.5-.7a1.2 1.2 0 11-1.2-1.2 1.2 1.2 0 011.2 1.2zM12 10.5A1.5 1.5 0 1110.5 12 1.5 1.5 0 0112 10.5z" />
              </svg>
            </a>
            <a href="#" aria-label="X (Twitter)" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                <path d="M22 5.92c-.63.28-1.3.47-2 .56a3.46 3.46 0 001.52-1.92 6.9 6.9 0 01-2.2.84 3.45 3.45 0 00-5.88 2.36c0 .27.03.53.09.78A9.8 9.8 0 013 4.87a3.45 3.45 0 001.07 4.6 3.38 3.38 0 01-1.56-.43v.04a3.45 3.45 0 002.76 3.38c-.5.14-1.03.17-1.56.06a3.45 3.45 0 003.22 2.39A6.9 6.9 0 012 19.54a9.73 9.73 0 005.29 1.55c6.35 0 9.83-5.26 9.83-9.83v-.45A7.05 7.05 0 0022 5.92z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube" className="text-gray-600 hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
                <path d="M23.5 6.2a3 3 0 00-2.1-2.12C19.7 3.5 12 3.5 12 3.5s-7.7 0-9.4.58A3 3 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3 3 0 002.1 2.12c1.7.6 9.4.6 9.4.6s7.7 0 9.4-.6a3 3 0 002.1-2.12A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.75 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main header: logo centered */}
      <div className="container py-4">
        <div className="flex items-center justify-between">
          {/* left-side: weather (visible on md+) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-orange-500" fill="currentColor" aria-hidden>
                <path d="M6.76 4.84l-1.8-1.79L3.17 4.84l1.79 1.79L6.76 4.84zM1 11h3v2H1v-2zm10-9h2v3h-2V2zm7.03 2.05l1.79-1.79-1.79-1.79-1.79 1.79L18.03 4.05zM17 11h6v2h-6v-2zM12 6a6 6 0 100 12 6 6 0 000-12zM4.24 19.16l1.79-1.79-1.79-1.79-1.79 1.79 1.79 1.79zM12 20h2v3h-2v-3zm7.76-1.84l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79z" />
              </svg>
              <span className="font-medium">27 °C</span>
              <span className="text-gray-500">Mumbai</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <Link href="/" className="inline-flex items-center">
              <Image src="/Hindusthanpost-logo-300x57.png" alt="Hindustanpost" width={300} height={57} priority />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="px-3 py-1 border rounded text-sm">मराठी</button>
            <Link href="/search" className="text-gray-600 hover:text-gray-900">Search</Link>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div className="border-t">
        <div className="container">
          <nav className="flex items-center gap-4 overflow-x-auto py-3 text-base text-black justify-center">            
            {categories.map((c: string) => (
              <Link key={c} href={`/category/${c}`} className="capitalize px-3 py-1 hover:text-black whitespace-nowrap font-bold">{c}</Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
