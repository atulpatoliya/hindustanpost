import { NextResponse } from 'next/server'
import { getAllCategories, addCategory } from '../../../../lib/categories'

export async function GET() {
  try {
    const cats = getAllCategories()
    return NextResponse.json(cats)
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name } = body
    if (!name) return NextResponse.json({ error: 'name is required' }, { status: 400 })
    const cats = addCategory(String(name))
    return NextResponse.json(cats)
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 })
  }
}
