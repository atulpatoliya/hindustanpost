import { getArticleBySlug, getAllArticles, getArticlesByCategory } from '../../../lib/articles'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import ShareButtons from '../../../components/ShareButtons'

function isExternal(src?: string) {
  if (!src) return false
  return /^https?:\/\//.test(src) || src.startsWith('data:')
}

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  } catch {
    return dateString
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params in Next.js 15+
  const { slug } = await params
  
  // Lightweight server-side logging for debugging (dev only)
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[ArticlePage] requested slug=', slug)
  }

  const article = getArticleBySlug(slug)
  if (!article) {
    // Use Next's notFound helper to return a proper 404
    notFound()
  }

  // Get related articles (same category, excluding current article)
  const relatedArticles = getArticlesByCategory(article.category)
    .filter(a => a.slug !== article.slug)
    .slice(0, 5)

  // Get latest articles for sidebar
  const latestArticles = getAllArticles()
    .filter(a => a.slug !== article.slug)
    .slice(0, 6)

  return (
    <div className="py-6">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 text-sm" style={{ fontSize: '15px' }}>
        <ol className="flex items-center gap-2 text-gray-600">
          <li>
            <Link href="/" className="hover:text-black transition-colors">होम</Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href={`/category/${article.category}`} className="hover:text-black transition-colors capitalize">
              {article.category}
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-800 line-clamp-1">{article.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Article Content */}
        <article className="lg:col-span-8">
          {/* Category Badge */}
          <div className="mb-4">
            <Link 
              href={`/category/${article.category}`}
              className="inline-block px-4 py-1.5 bg-[#C2185B] text-white text-sm font-semibold rounded-md hover:bg-[#A0144A] transition-colors capitalize"
            >
              {article.category}
            </Link>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
            {article.title}
          </h1>

          {/* Article Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>हिंदुस्थान पोस्ट संपादकीय</span>
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative rounded-lg overflow-hidden mb-6">
              <Image 
                src={article.image} 
                alt={article.title} 
                fill 
                style={{ objectFit: 'cover' }} 
                unoptimized={isExternal(article.image)}
                priority
                className="rounded-lg"
              />
            </div>
          )}

          {/* Article Description/Excerpt */}
          {article.description && (
            <div className="mb-6 p-4 bg-gray-50 border-l-4 border-[#C2185B] rounded">
              <p className="text-lg text-gray-700 italic leading-relaxed">{article.description}</p>
            </div>
          )}

          {/* Social Sharing Buttons */}
          <ShareButtons title={article.title} />

          {/* Article Content */}
          <div className="prose prose-lg max-w-none mb-8">
            <div className="text-gray-800 leading-relaxed text-base md:text-lg whitespace-pre-line">
              {article.content}
            </div>
          </div>

          {/* Tags/Categories */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-700" style={{ fontSize: '15px' }}>टैग:</span>
              <Link 
                href={`/category/${article.category}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors capitalize"
                style={{ fontSize: '15px' }}
              >
                {article.category}
              </Link>
            </div>
          </div>

          {/* Related Articles Section */}
          {relatedArticles.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">संबंधित समाचार</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((related) => (
                  <Link 
                    key={related.slug} 
                    href={`/articles/${related.slug}`}
                    className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {related.image && (
                      <div className="w-full h-48 relative overflow-hidden">
                        <Image 
                          src={related.image} 
                          alt={related.title} 
                          fill 
                          style={{ objectFit: 'cover' }} 
                          unoptimized={isExternal(related.image)}
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-xs text-[#C2185B] mb-2 capitalize font-semibold">{related.category}</div>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-[#C2185B] transition-colors">
                        {related.title}
                      </h3>
                      <div className="text-xs text-gray-500 mt-2">{related.publishedAt}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          {/* Latest News Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[#C2185B]" style={{ fontSize: '15px' }}>
              ताज़ा खबरें
            </h2>
            <div className="space-y-4">
              {latestArticles.map((item, index) => (
                <Link 
                  key={item.slug} 
                  href={`/articles/${item.slug}`}
                  className="group flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  {item.image && (
                    <div className="w-24 h-20 relative flex-shrink-0 rounded overflow-hidden">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                        unoptimized={isExternal(item.image)}
                        className="transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-[#C2185B] mb-1 capitalize font-semibold">{item.category}</div>
                    <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 group-hover:text-[#C2185B] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <div className="text-xs text-gray-500 mt-1">{item.publishedAt}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter/Subscribe Section */}
          <div className="bg-gradient-to-br from-[#C2185B] to-[#A0144A] rounded-lg shadow-sm p-6 text-white">
            <h2 className="text-xl font-bold mb-2" style={{ fontSize: '15px' }}>न्यूज़लेटर सब्सक्राइब करें</h2>
            <p className="text-sm mb-4 opacity-90" style={{ fontSize: '15px' }}>
              अपने इनबॉक्स में नवीनतम समाचार और अपडेट प्राप्त करें।
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="अपना ईमेल दर्ज करें"
                className="w-full px-4 py-2 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                style={{ fontSize: '15px' }}
              />
              <button
                type="submit"
                className="w-full bg-white text-[#C2185B] px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors text-sm"
                style={{ fontSize: '15px' }}
              >
                सब्सक्राइब करें
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  )
}
