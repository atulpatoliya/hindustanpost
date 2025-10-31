import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { readArticlesFromFile, saveArticlesToFile } from '../../../../../lib/articles'

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const body = await request.json()
    const { title, description, content, category, imageData, imageName } = body

    const articles = readArticlesFromFile()
  const idx = articles.findIndex((a: any) => a.slug === slug)
    if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })

    const article = { ...articles[idx] }
    if (title) article.title = title
    if (description !== undefined) article.description = description
    if (content !== undefined) article.content = content
    if (category) article.category = category

    // handle image update
    if (imageData && imageName) {
      try {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
        if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
        const matches = String(imageData).match(/^data:(.+);base64,(.+)$/)
        const base64 = matches ? matches[2] : String(imageData).replace(/^data:.+;base64,/, '')
        const ext = path.extname(String(imageName)) || ''
        const filename = `${slug}${ext}`
        const filepath = path.join(uploadsDir, filename)
        fs.writeFileSync(filepath, Buffer.from(base64, 'base64') as any)
        article.image = `/uploads/${filename}`
      } catch (err) {
        // ignore
      }
    }

    articles[idx] = article
    saveArticlesToFile(articles)
    return NextResponse.json(article)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const articles = readArticlesFromFile()
  const idx = articles.findIndex((a: any) => a.slug === slug)
    if (idx === -1) return NextResponse.json({ error: 'not found' }, { status: 404 })

    const [removed] = articles.splice(idx, 1)
    // delete image file if exists
    if (removed.image) {
      try {
        const filepath = path.join(process.cwd(), 'public', removed.image)
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath)
      } catch (err) {
        // ignore
      }
    }

    saveArticlesToFile(articles)
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
