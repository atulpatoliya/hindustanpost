import Image from 'next/image'
import Link from 'next/link'

const STATIC_ITEMS = {
  hero: {
    title: 'नए उपराष्ट्रपति का टर्म कितना होगा? 5 साल की कुर्सी या बचा हुआ कार्यकाल?',
    date: 'August 20, 2025',
    image: '/uploads/jammu-and-kashmir-elections-bjp-muslim-candidates-lal-chowk.jpg',
    slug: 'featured-video-hero'
  },
  side: [
    { title: 'Donald Trump पर भारी पड़ी Maria Corina Machado, जीता Nobel Peace Prize 2025', date: 'October 13, 2025', image: '/uploads/Test2.jpg', slug: 'side-1' },
    { title: 'Russia से तेल खरीदने पर जयशंकर के जवाब ने उड़ाए Trump के होश! इस वीडियो में देखिए पूरी सच्चाई!', date: 'August 22, 2025', image: '/uploads/india-economy-growth.png', slug: 'side-2' },
    { title: 'नए उपराष्ट्रपति का टर्म कितना होगा? 5 साल की कुर्सी या बचा हुआ कार्यकाल?', date: 'August 20, 2025', image: '/uploads/new-tech-startups.jpg', slug: 'side-3' }
  ]
}

export default function FeaturedVideoSection() {
  return (
    <section className="mt-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="inline-block bg-black text-white px-4 py-1 rounded">फोटो गैलरी</div>
        <div className="flex-1 border-t border-black/40" />
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left: big video-style hero */}
        <div className="lg:col-span-2 relative">
          <div className="relative border-2 border-yellow-500">
            <div className="w-full h-96 relative">
              <Image src={STATIC_ITEMS.hero.image} alt={STATIC_ITEMS.hero.title} fill style={{ objectFit: 'cover' }} unoptimized />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/80 rounded-full flex items-center justify-center">
                <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center">▶</div>
              </div>
            </div>
            <div className="absolute left-0 right-0 bottom-0 bg-black/60 text-white p-4">
              <h3 className="text-xl font-bold line-clamp-2">{STATIC_ITEMS.hero.title}</h3>
              <div className="text-sm mt-1">{STATIC_ITEMS.hero.date}</div>
            </div>
          </div>
        </div>

        {/* Right: stacked small items */}
        <aside className="lg:col-span-1 space-y-4">
          {STATIC_ITEMS.side.map(item => (
            <div key={item.slug} className="flex gap-3 items-start">
              <div className="w-20 h-14 relative flex-shrink-0 border rounded overflow-hidden">
                <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
              <div>
                <Link href={`/articles/${item.slug}`} className="font-medium hover:underline">{item.title}</Link>
                <div className="text-xs text-gray-500 mt-1">{item.date}</div>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </section>
  )
}
