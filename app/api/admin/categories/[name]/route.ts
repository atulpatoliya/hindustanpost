import { NextResponse } from 'next/server'
import { removeCategory, updateCategory } from '../../../../../lib/categories'

export async function DELETE(request: Request, context: any) {
  try {
    const params = await (context?.params ?? {})
    const name = params.name
    if (!name) return NextResponse.json({ error: 'name required' }, { status: 400 })
    const cats = removeCategory(decodeURIComponent(name))
    return NextResponse.json(cats)
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 })
  }
}

export async function PUT(request: Request, context: any) {
  try {
    const params = await (context?.params ?? {})
    const oldName = params.name
    if (!oldName) return NextResponse.json({ error: 'name required' }, { status: 400 })
    const body = await request.json()
    const { name: newName } = body
    if (!newName) return NextResponse.json({ error: 'new name is required' }, { status: 400 })
    const cats = updateCategory(decodeURIComponent(oldName), String(newName))
    return NextResponse.json(cats)
  } catch (err: any) {
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 })
  }
}
