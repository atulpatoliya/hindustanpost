import { getArticlesByCategory } from '../../../lib/articles'
import NewsTile from '../../../components/NewsTile'

export default function CategoryPage({ params }: { params: { category: string } }) {
  const items = getArticlesByCategory(params.category)
  if (!items.length) return <p>No articles found for {params.category}</p>
  return (
    <section>
      <h2 className="capitalize text-2xl font-semibold">{params.category}</h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-4">
        {items.map(a => (
          <NewsTile key={a.slug} article={a} size="small" />
        ))}
      </div>
    </section>
  )
}
