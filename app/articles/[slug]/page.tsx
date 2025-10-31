import { getArticleBySlug } from '../../../lib/articles'
import { notFound } from 'next/navigation'
import Image from 'next/image'

function isExternal(src?: string) {
  if (!src) return false
  return /^https?:\/\//.test(src) || src.startsWith('data:')
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  // Lightweight server-side logging for debugging (dev only)
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[ArticlePage] requested slug=', String(params.slug))
  }

  const article = getArticleBySlug(params.slug)
  if (!article) {
    // Use Next's notFound helper to return a proper 404
    notFound()
  }

  return (
    <article>
      {article.image && (
        <div className="w-full h-96 relative rounded-md mb-4 overflow-hidden">
          <Image src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} unoptimized={isExternal(article.image)} />
        </div>
      )}
      <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
      <small className="text-xs text-gray-500">{article.publishedAt}</small>
      <p className="mt-4 text-base leading-relaxed">{article.content}</p>
    </article>
  )
}
