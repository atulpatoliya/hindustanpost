import type { NextRequest } from 'next/server'
import Parser from 'rss-parser'

const parser = new Parser()

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('feed')
  if (!url) return new Response(JSON.stringify({ error: 'Missing feed query param' }), { status: 400 })

  try {
    const feed = await parser.parseURL(url)
    // Map to a lightweight shape
    const items = (feed.items || []).map(i => ({
      title: i.title || '',
      link: i.link || i.guid || '',
      pubDate: i.pubDate || i.isoDate || '',
      contentSnippet: (i.contentSnippet || i.content || '').slice(0, 1000),
      content: i.content || i.contentSnippet || '',
      // enclosure may be an object with a 'url' property
      enclosure: (i.enclosure && (i.enclosure.url)) || null,
      source: feed.title || null
    }))

    return new Response(JSON.stringify({ title: feed.title || '', items }), { status: 200 })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: String(err?.message || err) }), { status: 500 })
  }
}
