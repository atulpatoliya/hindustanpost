import Link from 'next/link'
import Image from 'next/image'
import { Article } from '../lib/articles'

function isExternal(src?: string) {
  if (!src) return false
  return /^https?:\/\//.test(src) || src.startsWith('data:')
}

export default function NewsTile({ article, size = 'small', className = '' }: { article: Article; size?: 'small' | 'large' | 'compact'; className?: string }) {
  if (!article) return null

  if (size === 'large') {
    return (
      <Link href={`/articles/${article.slug}`} className={`group block bg-white rounded overflow-hidden shadow-sm ${className}`}>
        {article.image && (
          <div className="w-full h-[400px] relative overflow-hidden">
            <Image className="transition-transform duration-300 ease-out group-hover:scale-105" src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} unoptimized={isExternal(article.image)} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
              <div className="p-6">
                <div className="text-[10px] text-white mb-1 capitalize bg-black/70 inline-block px-2 py-1 rounded">{article.category}</div>
                <h3 className="text-[19px] font-bold line-clamp-3 text-white">{article.title}</h3>
                {/* {article.description && <p className="mt-2 text-gray-200 line-clamp-2">{article.description}</p>} */}
                {/* <div className="mt-3 text-sm text-gray-300">{article.publishedAt}</div> */}
              </div>
            </div>
          </div>
        )}
      </Link>
    )
  }

  // small tile
  if (size === 'compact') {
    return (
      <Link href={`/articles/${article.slug}`} className={`group flex items-start gap-3 bg-white rounded overflow-hidden ${className}`}>
        {article.image && (
          <div className="w-20 h-14 relative flex-shrink-0 overflow-hidden">
            <Image className="transition-transform duration-300 ease-out group-hover:scale-105" src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} unoptimized={isExternal(article.image)} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>
        )}
        <div className="py-1 pr-2">
          <div className="text-xs text-blue-600 mb-1 capitalize">{article.category}</div>
          <div className="text-sm font-medium line-clamp-2">{article.title}</div>
          <div className="text-xs text-gray-500 mt-1">{article.publishedAt}</div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/articles/${article.slug}`} className={`group block bg-white rounded overflow-hidden shadow-sm ${className}`}>
      {article.image && (
        <div className="w-full h-[192px] relative overflow-hidden">
          <Image className="transition-transform duration-300 ease-out group-hover:scale-105" src={article.image} alt={article.title} fill style={{ objectFit: 'cover' }} unoptimized={isExternal(article.image)} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-3">
              <div className=" text-white mb-1 capitalize bg-black/70 inline-block px-2 py-0.5 rounded text-[10px]">{article.category}</div>
              <h4 className="text-sm font-semibold line-clamp-2 text-white">{article.title}</h4>
            </div>
          </div>
        </div>
      )}
    </Link>
  )
}
