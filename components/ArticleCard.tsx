import { Article } from '@/types/article'
import NewsTile from './NewsTile'

export default function ArticleCard({ article }: { article: Article }) {
  // Reuse NewsTile to keep design consistent site-wide.
  return <NewsTile article={article} size="small" />
}
