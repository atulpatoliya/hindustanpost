import NewsTile from './NewsTile'
import { Article } from '../lib/articles'

type Props = {
  featured?: Article
  left?: Article[]
  right?: Article[]
}

export default function HeroBanner({ featured, left = [], right = [] }: Props) {
  if (!featured && !left.length && !right.length) {
    return (
      <section className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Top story</h2>
        <p className="text-gray-700">No stories available.</p>
      </section>
    )
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
      {/* Left stacked small tiles (2) */}
      <div className="hidden lg:flex lg:flex-col lg:gap-4 lg:col-span-3">
        {left.slice(0, 2).map(a => (
          <NewsTile key={a.slug} article={a} size="small" />
        ))}
      </div>

      {/* Center big hero */}
      <div className="lg:col-span-6">
        {featured ? <NewsTile article={featured} size="large" /> : null}
      </div>

      {/* Right stacked small tiles (2) */}
      <div className="hidden lg:flex lg:flex-col lg:gap-4 lg:col-span-3">
        {right.slice(0, 2).map(a => (
          <NewsTile key={a.slug} article={a} size="small" />
        ))}
      </div>
    </section>
  )
}
