import { getAllArticles } from '../../lib/articles'
import { getAllCategories } from '../../lib/categories'
import Link from 'next/link'
import Image from 'next/image'

function isExternal(src?: string) {
  if (!src) return false
  return /^https?:\/\//.test(src) || src.startsWith('data:')
}

export default function ArticlesPage() {
  // Get all articles, sorted by published date (newest first)
  const allArticles = getAllArticles()
  const sortedArticles = [...allArticles].sort((a, b) => {
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  })

  // Featured article (first one)
  const featured = sortedArticles[0]
  const otherArticles = sortedArticles.slice(1)

  // Get all unique categories
  const articleCategories = Array.from(new Set(allArticles.map(a => a.category))).sort()
  const allCategories = getAllCategories()
  const uniqueCategories = Array.from(new Set([...allCategories, ...articleCategories])).sort()

  // Get latest articles for sidebar
  const latestArticles = sortedArticles.slice(0, 6)

  return (
    <div className="py-6">
      {/* Breadcrumb Navigation */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center gap-2 text-gray-600">
          <li>
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-800">All Articles</li>
        </ol>
      </nav>

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">All Articles</h1>
          <div className="flex-1 border-t-2 border-[#C2185B]" />
          <div className="text-sm text-gray-600">
            {allArticles.length} {allArticles.length === 1 ? 'Article' : 'Articles'}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8">
          {/* Featured Article */}
          {featured && (
            <div className="mb-8">
              <Link 
                href={`/articles/${featured.slug}`}
                className="group block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {featured.image && (
                  <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden">
                    <Image 
                      src={featured.image} 
                      alt={featured.title} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      unoptimized={isExternal(featured.image)}
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute inset-0 flex items-end">
                      <div className="p-6 w-full">
                        <div className="text-xs text-white mb-2 capitalize bg-[#C2185B] inline-block px-3 py-1 rounded-md font-semibold">
                          {featured.category}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 line-clamp-3 group-hover:text-[#C2185B] transition-colors">
                          {featured.title}
                        </h2>
                        {featured.description && (
                          <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-2">
                            {featured.description}
                          </p>
                        )}
                        <div className="text-xs text-gray-300 mt-2">{featured.publishedAt}</div>
                      </div>
                    </div>
                  </div>
                )}
              </Link>
            </div>
          )}

          {/* Other Articles Grid */}
          {otherArticles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherArticles.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {article.image && (
                      <div className="w-full h-48 relative overflow-hidden">
                        <Image 
                          src={article.image} 
                          alt={article.title} 
                          fill 
                          style={{ objectFit: 'cover' }} 
                          unoptimized={isExternal(article.image)}
                          className="transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}
                    <div className="p-4">
                      <div className="text-xs text-[#C2185B] mb-2 capitalize font-semibold">{article.category}</div>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-[#C2185B] transition-colors mb-2">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {article.description}
                        </p>
                      )}
                      <div className="text-xs text-gray-500">{article.publishedAt}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          {/* Latest News Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[#C2185B]">
              Latest News
            </h2>
            <div className="space-y-4">
              {latestArticles.map((item) => (
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
            <h2 className="text-xl font-bold mb-2">Subscribe to Newsletter</h2>
            <p className="text-sm mb-4 opacity-90">
              Get the latest news and updates delivered to your inbox.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-md text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="w-full bg-white text-[#C2185B] px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Category Links */}
          <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-[#C2185B]">
              Categories
            </h2>
            <div className="flex flex-wrap gap-2">
              {uniqueCategories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${cat}`}
                  className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

