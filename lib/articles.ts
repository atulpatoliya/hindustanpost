import fs from 'fs'
import path from 'path'

export type Article = {
  slug: string
  title: string
  description: string
  content: string
  publishedAt: string
  category: string
  image?: string
}

const DATA_DIR = path.join(process.cwd(), 'data')
const DATA_FILE = path.join(DATA_DIR, 'articles.json')

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(DATA_FILE)) {
    const seed: Article[] = [
      {
        slug: 'india-economy-growth',
        title: 'India shows resilient economic growth in Q3',
        description: "A snapshot of India's economy as it outperforms expectations in Q3.",
        content:
          "India's economy showed resilience this quarter with strong consumer spending and a rebound in manufacturing. Experts say that fiscal measures and improved global demand are contributing factors.",
        publishedAt: '2025-10-01',
        category: 'business'
      },
      {
        slug: 'new-tech-startups',
        title: 'New tech startups emerge across tier-2 cities',
        description: 'A new wave of startups is taking root outside major metros.',
        content:
          'Founders are choosing tier-2 cities for lower costs and growing talent pools. Investors are taking notice, and incubators are appearing to support local entrepreneurs.',
        publishedAt: '2025-09-25',
        category: 'business'
      },
      {
        slug: 'national-election-preview',
        title: 'Nation prepares for upcoming state elections',
        description: 'Parties ramp up campaigns ahead of the state polls.',
        content: 'Campaigning intensifies as parties tour constituencies and present manifestos to voters.',
        publishedAt: '2025-10-10',
        category: 'politics'
      },
      {
        slug: 'global-climate-summit',
        title: 'World leaders convene at the climate summit',
        description: 'Talks aim to solidify commitments ahead of 2030 goals.',
        content: 'Delegates seek actionable agreements to cut emissions and finance climate resilience in vulnerable countries.',
        publishedAt: '2025-10-05',
        category: 'international'
      },
      {
        slug: 'cricket-finals-draw',
        title: 'Thrilling finish as cricket finals reach conclusion',
        description: 'A last-over finish keeps fans on edge.',
        content: 'The match delivered drama and outstanding individual performances that will be remembered.',
        publishedAt: '2025-09-30',
        category: 'sports'
      },
      {
        slug: 'city-police-bust',
        title: 'Police arrest suspects in major city crime ring',
        description: 'A coordinated operation dismantles a criminal network.',
        content: 'Authorities recovered evidence and are proceeding with multiple charges across jurisdictions.',
        publishedAt: '2025-10-02',
        category: 'crime'
      }
    ]
    fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2), 'utf8')
  }
}

export function readArticlesFromFile(): Article[] {
  ensureDataFile()
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    return JSON.parse(raw) as Article[]
  } catch (err) {
    // In case of parse error, seed a fresh file
    ensureDataFile()
    const raw = fs.readFileSync(DATA_FILE, 'utf8')
    return JSON.parse(raw) as Article[]
  }
}

export function saveArticlesToFile(articles: Article[]) {
  ensureDataFile()
  fs.writeFileSync(DATA_FILE, JSON.stringify(articles, null, 2), 'utf8')
}

export function getAllArticles(): Article[] {
  return readArticlesFromFile()
}

export function getArticleBySlug(slug: string) {
  const all = readArticlesFromFile()
  return all.find(a => a.slug === slug) || null
}

export function getArticlesByCategory(category: string) {
  const all = readArticlesFromFile()
  return all.filter(a => a.category === category)
}

// Exported helpers (no default export to satisfy lint rules)
// (functions above are exported individually)
