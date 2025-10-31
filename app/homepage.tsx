import HeroBanner from '../components/HeroBanner'
// NewsTile import intentionally removed (not used in this layout)
import FeaturedVideoSection from '../components/FeaturedVideoSection'
import RajDarbarSection from '../components/RajDarbarSection'
import PhotoGallerySection from '../components/PhotoGallerySection'
import SocialSection from '../components/SocialSection'
import SpecialSection from '../components/SpecialSection'
import LifestyleSection from '../components/LifestyleSection'
import BreakingMarquee from '../components/BreakingMarquee'
import { getAllArticles } from '../lib/articles'

export default function HomePage() {
  const all = getAllArticles()
  const featured = all[0]
  // Choose side tiles: next 4 articles
  const left = all.slice(1, 3)
  const right = all.slice(3, 5)
  
  // latest array previously used for sidebar; removed per design change
  return (
    <section>
      {/* Breaking news marquee above the hero banner */}
      <BreakingMarquee />

      <HeroBanner featured={featured} left={left} right={right} />

  {/* Featured video / second section (static design) */}
  <FeaturedVideoSection />

    {/* RajDarbar — third static section */}
    <RajDarbarSection />

  {/* Photo gallery — fourth static section */}
  <PhotoGallerySection />

  {/* Social (5th) — posts from the 'social' category */}
  <SocialSection />

  {/* Special (6th) — static list with sidebar widgets */}
  <SpecialSection />

  {/* Lifestyle (7th) — posts from 'lifestyle' category (fallback demo if empty) */}
  <LifestyleSection />

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* <div className="lg:col-span-12">
          <h3 className="text-xl font-semibold">Top stories</h3>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3 mt-4">
            {topStories.map(a => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>

          {getAllCategories().map(cat => {
            const items = getArticlesByCategory(cat)
            if (!items.length) return null
            return (
              <section key={cat} className="mt-6">
                <h4 className="capitalize font-medium">{cat}</h4>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-4 mt-2">
                  {items.map(a => (
                    <ArticleCard key={a.slug} article={a} />
                  ))}
                </div>
                <div className="mt-2">
                  <a href={`/category/${cat}`} className="text-blue-600 hover:underline">View all {cat} →</a>
                </div>
              </section>
            )
          })}
        </div> */}

        {/* Latest sidebar removed per request */}
      </div>
    </section>
  )
}
