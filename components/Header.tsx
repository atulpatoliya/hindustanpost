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
    <header className=" bg-white">
      {/* Main header: logo centered with date below */}
      <div className="container py-4">
        <div className="flex items-start justify-between">
          {/* left-side: weather (visible on md+) */}
          <div className="hidden md:flex items-center gap-2 text-sm text-gray-700 pt-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <path d="M2 7c2-2 6-2 8 0s6 2 8 0" strokeLinecap="round" />
              <path d="M2 11c2-2 6-2 8 0s6 2 8 0" strokeLinecap="round" />
              <path d="M2 15c2-2 6-2 8 0s6 2 8 0" strokeLinecap="round" />
            </svg>
            <span className="font-medium">31 °C</span>
            <span className="text-gray-500">Mumbai</span>
          </div>

          {/* Center: Logo with date below */}
          <div className="flex-1 flex flex-col items-center">
            <Link href="/" className="inline-flex items-center relative">
              <Image src="/Hindusthanpost-logo-300x57.png" alt="Hindustanpost" width={300} height={57} priority />
            </Link>
            <div className="mt-2 text-sm text-gray-600 text-center">{dateStr}</div>
          </div>

          {/* Right: Social icons stacked vertically with Marathi button below */}
          <div className="hidden md:flex flex-col items-end gap-3 pt-1">
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Facebook" className="td-social-btn"><i className="td-icon-font td-icon-facebook" /></a>
              <a href="#" aria-label="Instagram" className="td-social-btn"><i className="td-icon-font td-icon-instagram" /></a>
              <a href="#" aria-label="Twitter" className="td-social-btn"><i className="td-icon-font td-icon-twitter" /></a>
              <a href="#" aria-label="YouTube" className="td-social-btn"><i className="td-icon-font td-icon-youtube" /></a>
            </div>
            <button className="px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium">मराठी</button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div className="border-t container border-black border-b">
        <div className="">
          <nav className="flex items-center gap-4 overflow-x-auto py-3 text-base text-black justify-center">            
            {categories.map((c: string) => (
              <Link 
                key={c} 
                href={c === 'वेब स्टोरी' ? '/web-stories' : `/category/${c}`} 
                className="capitalize px-3 py-1 hover:text-black whitespace-nowrap font-bold"
              >
                {c}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
