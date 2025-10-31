import NewsTile from './NewsTile'
import { Article } from '../lib/articles'

export default function ArticleCard({ article }: { article: Article }) {
  // Reuse NewsTile to keep design consistent site-wide.
  return <NewsTile article={article} size="small" />
}
