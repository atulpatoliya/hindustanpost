import Image from 'next/image'
import Link from 'next/link'

const ITEMS = [
  { title: 'Mumbai: 17 बच्चों को बंदूक बनाने वाला रोहित आर्या की पुलिस की जवाबी कार्रवाई में मौत', date: 'October 30, 2025', image: '/uploads/Test2.jpg', slug: 'sp-1' },
  { title: 'Chhattisgarh: कोरबा में इनामी महिला समेत 3 नक्सलियों ने किया आत्मसमर्पण', date: 'October 30, 2025', image: '/uploads/national-election-preview.png', slug: 'sp-2' },
  { title: 'Cyclone Montha: चक्रवात “मंथा” से आंध्र प्रदेश को कितना का नुकसान?', date: 'October 30, 2025', image: '/uploads/india-economy-growth.png', slug: 'sp-3' },
  { title: 'Mumbai: बच्चों को बंदूक बनाने वाले रोहित आर्या की मौत की जाँच', date: 'October 30, 2025', image: '/uploads/new-tech-startups.jpg', slug: 'sp-4' },
  { title: 'Mumbai: बच्चों को बंदूक बनाने वाले रोहित आर्या की गिरफ्तारी', date: 'October 30, 2025', image: '/uploads/national-election-preview.png', slug: 'sp-5' }
]

export default function SpecialSection() {
  return (
    <section className="mt-10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: main list */}
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="inline-block bg-black text-white px-3 py-1 rounded">विशेष</div>
              <div className="flex-1 border-t border-gray-200" />
            </div>

            <div className="space-y-4">
              {ITEMS.map(item => (
                <article key={item.slug} className="flex gap-4 items-start bg-white p-3 rounded shadow-sm">
                  <div className="w-28 h-20 relative flex-shrink-0 rounded overflow-hidden">
                    <Image src={item.image} alt={item.title} fill style={{ objectFit: 'cover' }} unoptimized />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg line-clamp-2"><Link href={`/articles/${item.slug}`} className="hover:text-blue-700">{item.title}</Link></h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-3">{item.title} ...</p>
                    <div className="text-xs text-gray-500 mt-2">{item.date}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right: sidebar widgets */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-semibold mb-2">सुरक्षा</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm hover:text-blue-700">Rajnath Singh&apos;s Major Statement: राज मंत्री ...</Link>
                  <div className="text-xs text-gray-500 mt-1">October 28, 2025</div>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-blue-700">Indian Navy: आत्मनिर्भर भारत की नई पहचाच</Link>
                  <div className="text-xs text-gray-500 mt-1">October 27, 2025</div>
                </li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-semibold mb-2">खेलाधिक</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm hover:text-blue-700">Shreyas Iyer: श्रेष्ठ प्रदर्शन</Link>
                  <div className="text-xs text-gray-500 mt-1">October 30, 2025</div>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-blue-700">Ranji Trophy highlights</Link>
                  <div className="text-xs text-gray-500 mt-1">October 28, 2025</div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
