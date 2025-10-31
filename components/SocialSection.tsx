import Image from 'next/image'
import Link from 'next/link'
import { getArticlesByCategory } from '../lib/articles'

const FALLBACK = [
  { slug: 'social-1', title: 'Maharashtra: सुंदर फोटो और लोक कार्यक्रम', publishedAt: 'October 9, 2025', image: '/uploads/Test2.jpg' },
  { slug: 'social-2', title: 'Community event highlights from across the state', publishedAt: 'October 2, 2025', image: '/uploads/national-election-preview.png' },
  { slug: 'social-3', title: 'Local volunteer drives bring change', publishedAt: 'September 30, 2025', image: '/uploads/new-tech-startups.jpg' },
  { slug: 'social-4', title: 'Street festival draws crowds', publishedAt: 'September 15, 2025', image: '/uploads/india-economy-growth.png' },
  { slug: 'social-5', title: 'Photo: sunrise over the plateau', publishedAt: 'September 1, 2025', image: '/uploads/national-election-preview.png' }
]

export default function SocialSection() {
  const items = getArticlesByCategory('social') || []
  const display = (items && items.length > 0) ? items.slice(0, 5) : FALLBACK

  return (
    <section className="mt-8">
      <div className="container">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold">Social</h2>
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
