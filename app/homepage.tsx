import HeroBanner from "../components/HeroBanner";
// NewsTile import intentionally removed (not used in this layout)
import FeaturedVideoSection from "../components/FeaturedVideoSection";
import RajDarbarSection from "../components/RajDarbarSection";
import PhotoGallerySection from "../components/PhotoGallerySection";
import SocialSection from "../components/SocialSection";
import SpecialSection from "../components/SpecialSection";
import LifestyleSection from "../components/LifestyleSection";
import BreakingMarquee from "../components/BreakingMarquee";
import getInternalBaseUrl from "../lib/getInternalBaseUrl";
import { ArticleCategory, Article } from "@/types/article";

export const revalidate = 120;

export default async function HomePage() {
  let apiData: { data?: { posts?: Article[] } } | null = null;
  try {
    const baseUrl = await getInternalBaseUrl();
    const response = await fetch(`${baseUrl}/api/post`, {
      next: { revalidate: 120 },
    });
    apiData = await response.json();
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Failed to fetch /api/post:", err);
    }
  }

  const all: Article[] = Array.isArray(apiData?.data?.posts)
    ? apiData!.data!.posts.filter(Boolean)
    : [];
  const heroOrdered = [...all].sort((a, b) => {
    const dateA = a?.publishDate ? new Date(a.publishDate).getTime() : 0;
    const dateB = b?.publishDate ? new Date(b.publishDate).getTime() : 0;
    return dateB - dateA;
  });
  const featured = heroOrdered[0];
  const left = heroOrdered.slice(1, 3);
  const right = heroOrdered.slice(3, 5);
  const breakingPosts = [...all].sort(() => 0.5 - Math.random());
  const featuredData = [...all]
    .sort(() => 0.5 - Math.random())
    .slice(0, all?.length);
  const socialPosts = all.filter((post: any) =>
    post.categories?.some(
      (cat: ArticleCategory) => cat?.slug?.toLowerCase() === "social"
    )
  );
  const lifestylePosts = all.filter((post: any) =>
    post.categories?.some(
      (cat: ArticleCategory) => cat?.slug?.toLowerCase() === "lifestyle"
    )
  );

  return (
    <section>
      {/* Breaking news marquee above the hero banner */}
      <BreakingMarquee posts={breakingPosts} />

      <HeroBanner featured={featured} left={left} right={right} />

      {/* Featured video / second section (static design) */}
      <FeaturedVideoSection data={featuredData} />

      {/* RajDarbar — third static section */}
      <RajDarbarSection posts={all} />

      {/* Photo gallery — fourth static section */}
      <PhotoGallerySection posts={all} />

      {/* Social (5th) — posts from the 'social' category */}
      <SocialSection socialPosts={socialPosts} />

      {/* Special (6th) — static list with sidebar widgets */}
      <SpecialSection data={all} />

      {/* Lifestyle (7th) — posts from 'lifestyle' category (fallback demo if empty) */}
      <LifestyleSection lifestylePosts={lifestylePosts} />

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
  );
}
