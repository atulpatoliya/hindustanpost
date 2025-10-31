import Image from 'next/image'
import Link from 'next/link'
import { getArticlesByCategory } from '../lib/articles'

const FALLBACK = [
  { slug: 'life-1', title: 'लाइफस्टाइल: स्वस्थ रहने के आसान उपाय', publishedAt: 'October 20, 2025', image: '/uploads/india-economy-growth.png' },
  { slug: 'life-2', title: 'फैशन टिप्स: सर्दियों के लिए स्टाइलिश आउटफिट', publishedAt: 'October 18, 2025', image: '/uploads/new-tech-startups.jpg' },
  { slug: 'life-3', title: 'खान-पान: पौष्टिक और त्वरित नाश्ते', publishedAt: 'October 15, 2025', image: '/uploads/Test2.jpg' },
  { slug: 'life-4', title: 'यात्रा: वीकेंड के लिए बेस्ट गेटअवे', publishedAt: 'October 10, 2025', image: '/uploads/national-election-preview.png' },
  { slug: 'life-5', title: 'होम डेकोर: बजट में सुंदर घर', publishedAt: 'October 5, 2025', image: '/uploads/india-economy-growth.png' }
]

export default function LifestyleSection() {
  const items = getArticlesByCategory('lifestyle') || []
  const display = items.length > 0 ? items.slice(0, 5) : FALLBACK

  return (
    <section className="mt-8">
      <div className="container">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold">लाइफ स्टाइल</h2>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {display.map(item => (
            <article key={item.slug} className="bg-white rounded shadow-md overflow-hidden">
              <div className="w-full h-40 relative">
                {item.image ? (
                  <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} unoptimized />
                ) : (
                  <div className="bg-gray-200 w-full h-full" />
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm leading-snug mb-2 line-clamp-3">
                  <Link href={`/articles/${item.slug}`} className="text-gray-900 hover:text-blue-600">{item.title}</Link>
                </h3>
                <div className="text-xs text-gray-500">{item.publishedAt}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
