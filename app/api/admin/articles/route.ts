import { NextResponse } from 'next/server'
import { readArticlesFromFile, saveArticlesToFile } from '../../../../lib/articles'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Basic validation
    const { slug, title, description, content, publishedAt, category } = body
    if (!slug || !title) {
      return NextResponse.json({ error: 'slug and title are required' }, { status: 400 })
    }

    const articles = readArticlesFromFile()
    // avoid duplicates
    if (articles.find(a => a.slug === slug)) {
      return NextResponse.json({ error: 'slug already exists' }, { status: 409 })
    }

  const newArticle: any = { slug, title, description: description || '', content: content || '', publishedAt: publishedAt || new Date().toISOString().slice(0, 10), category: category || 'uncategorized' }

    // If an image is included as a data URL, save it to public/uploads and set image path
    if (body.imageData && body.imageName) {
      try {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })

        const matches = String(body.imageData).match(/^data:(.+);base64,(.+)$/)
        let base64 = ''
        if (matches) {
          base64 = matches[2]
        } else {
          // If the client sent raw base64 without prefix
          base64 = String(body.imageData).replace(/^data:.+;base64,/, '')
        }

        // create a filename using slug + extension from imageName
        const ext = path.extname(String(body.imageName)) || ''
        const filename = `${slug}${ext}`
        const filepath = path.join(uploadsDir, filename)
  // Buffer typing can be an issue in some TS configs; cast to any for write
  fs.writeFileSync(filepath, Buffer.from(base64, 'base64') as any)
        newArticle.image = `/uploads/${filename}`
      } catch (err) {
        // ignore image write errors but log in dev
        // eslint-disable-next-line no-console
        console.error('Failed to save image', err)
      }
    }

    // If an external image URL is provided (e.g., importing from RSS), just store the URL
    if (body.imageUrl && !newArticle.image) {
      try {
        newArticle.image = String(body.imageUrl)
      } catch (err) {
        // ignore
      }
    }

    articles.unshift(newArticle)
    saveArticlesToFile(articles)
    return NextResponse.json(newArticle)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
