import Image from 'next/image'
import Link from 'next/link'

const ITEMS = [
  { title: 'Telangana: पूर्व क्रिकेटर अजहरुद्दीन को कल दिलाई जाएगी मंत्री...', date: 'October 30, 2025', image: '/uploads/Test2.jpg', slug: 'rd-1' },
  { title: 'Bihar Assembly Elections: जानिये, भाजपा अध्यक्ष जेपी नड्डा ने...', date: 'October 30, 2025', image: '/uploads/jammu-and-kashmir-elections-bjp-muslim-candidates-lal-chowk.jpg', slug: 'rd-2' },
  { title: 'Bihar Assembly Elections: मोदी सरकार की बड़ी उपलब्धि, अमित...', date: 'October 30, 2025', image: '/uploads/india-economy-growth.png', slug: 'rd-3' },
  { title: 'Ministry of External Affairs: कम लागत वाली ऊर्जा...', date: 'October 30, 2025', image: '/uploads/new-tech-startups.jpg', slug: 'rd-4' },
  { title: 'Bihar Assembly Elections 2025: PM मोदी ने विपक्ष को...', date: 'October 30, 2025', image: '/uploads/national-election-preview.png', slug: 'rd-5' }
]

export default function RajDarbarSection() {
  return (
    <section className="mt-8">
      <div className="container">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold">राज दरबार</h2>
          <div className="flex-1 border-t border-gray-200" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ITEMS.map(item => (
            <article key={item.slug} className="bg-white rounded shadow-md overflow-hidden">
              <div className="w-full h-40 relative">
                <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} unoptimized />
              </div>
              <div className="p-3">
                <h3 className="text-sm leading-snug mb-2 line-clamp-3">
                  <Link href={`/articles/${item.slug}`} className="text-gray-900 hover:text-blue-600">{item.title}</Link>
                </h3>
                <div className="text-xs text-gray-500">{item.date}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
