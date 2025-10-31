import Image from 'next/image'
import Link from 'next/link'

const ITEMS = [
  { title: 'Kaas Plateau: महाराष्ट्र के सतारा के काास पठार ने ओढ़ी पीले फूलों की चादर', date: 'October 15, 2025', image: '/uploads/Test2.jpg', slug: 'pg-1' },
  { title: 'Maharashtra: कोंकण का इंद्रधनुषी रेत, तीत पंक्षी', date: 'October 9, 2025', image: '/uploads/national-election-preview.png', slug: 'pg-2' },
  { title: 'Sangh Centenary: संग शताब्दी समारोह की तस्वीरें', date: 'October 2, 2025', image: '/uploads/india-economy-growth.png', slug: 'pg-3' },
  { title: 'Semiconductors: सेमीकंडक्टर क्षेत्र में नई उड़ान', date: 'September 3, 2025', image: '/uploads/new-tech-startups.jpg', slug: 'pg-4' }
]

export default function PhotoGallerySection() {
  return (
    <section className="mt-10 py-8">
      <div className="container">
        <div className="flex items-center gap-4 mb-6">
          <div className="inline-block bg-black text-white px-4 py-1 rounded">फोटो गैलरी</div>
          <div className="flex-1 border-t border-black/40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Large gallery feature on the left */}
          <div className="lg:col-span-8">
            <div className="relative rounded overflow-hidden shadow-lg">
              <div className="w-full h-[420px] relative">
                <Image src={ITEMS[0].image} alt={ITEMS[0].title} fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
              <div className="absolute left-0 right-0 bottom-0 bg-black/60 text-white p-6">
                <h3 className="text-2xl font-bold line-clamp-2">{ITEMS[0].title}</h3>
                <div className="text-sm mt-2">{ITEMS[0].date}</div>
              </div>
            </div>
          </div>

          {/* Right stacked list */}
          <aside className="lg:col-span-4">
            <div className="space-y-4">
              {ITEMS.slice(1).map(item => (
                <div key={item.slug} className="flex gap-3 items-start bg-white/80 p-3 rounded">
                  <div className="w-20 h-14 relative flex-shrink-0 rounded overflow-hidden">
                    <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} unoptimized />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold line-clamp-2">
                      <Link href={`/articles/${item.slug}`} className="text-black hover:text-blue-700">{item.title}</Link>
                    </h4>
                    <div className="text-xs text-gray-800 mt-1">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
