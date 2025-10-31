"use client"
import React, { useState, FormEvent, useEffect } from 'react'
import Image from 'next/image'

export default function AdminDashboard() {
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [content, setContent] = useState('')
  const [category, setCategory] = useState('national')
  const [articles, setArticles] = useState<any[]>([])
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [imageName, setImageName] = useState<string | null>(null)
  const [imageData, setImageData] = useState<string | null>(null)
  const [existingImage, setExistingImage] = useState<string | null>(null)
  const [feedUrl, setFeedUrl] = useState('')
  const [feedItems, setFeedItems] = useState<any[] | null>(null)
  const [feedError, setFeedError] = useState<string | null>(null)
  const [categories, setCategories] = useState<string[]>([])
  const [newCategory, setNewCategory] = useState('')
  const [categoriesError, setCategoriesError] = useState<string | null>(null)
  const [categoriesSuccess, setCategoriesSuccess] = useState<string | null>(null)
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [editingValue, setEditingValue] = useState<string>('')
  // router not used; navigation handled via refresh

  async function refreshArticles() {
    try {
      const res = await fetch('/api/articles')
      const data = await res.json()
      // sort new -> old by publishedAt
      data.sort((a: any, b: any) => (b.publishedAt || '').localeCompare(a.publishedAt || ''))
      setArticles(data)
    } catch (err) {
      // ignore
    }
  }

  async function refreshCategories() {
    try {
      const res = await fetch('/api/admin/categories')
      const data = await res.json()
      if (res.ok && Array.isArray(data)) setCategories(data)
    } catch (err) {
      // ignore
    }
  }

  useEffect(() => {
    refreshArticles()
    refreshCategories()
  }, [])

  async function deleteArticle(slugToDelete: string) {
    if (!confirm(`Delete article "${slugToDelete}"? This can't be undone.`)) return
    try {
      const res = await fetch(`/api/admin/articles/${encodeURIComponent(slugToDelete)}`, { method: 'DELETE' })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data?.error || 'Delete failed')
      }
      await refreshArticles()
    } catch (err: any) {
      alert('Delete error: ' + (err?.message || String(err)))
    }
  }

  function startEditArticle(a: any) {
    setEditingSlug(a.slug)
    setSlug(a.slug)
    setTitle(a.title)
    setDescription(a.description || '')
    setContent(a.content || '')
    setCategory(a.category || 'national')
    // If the article already has an uploaded image, keep it so we can preview it
    if (a.image) {
      setExistingImage(a.image)
      try {
        const parts = String(a.image).split('/')
        setImageName(parts[parts.length - 1] || null)
      } catch (err) {
        setImageName(null)
      }
    } else {
      setExistingImage(null)
      setImageName(null)
    }
    setImageData(null)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    try {
      const bodyPayload: any = { slug, title, description, content, category }
      // Only send image payload when a NEW file was selected (data URL). If editing and
      // the article already has an uploaded image and no new file was chosen, don't resend it.
      if (imageData && imageName && imageData.startsWith('data:')) {
        bodyPayload.imageData = imageData
        bodyPayload.imageName = imageName
      }

      let res
      if (editingSlug) {
        // editing existing article
        res = await fetch(`/api/admin/articles/${encodeURIComponent(editingSlug)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyPayload)
        })
      } else {
        res = await fetch('/api/admin/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyPayload)
        })
      }
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      setSuccess(editingSlug ? 'Article updated' : 'Article added')
      // refresh list and clear form
      await refreshArticles()
      setSlug('')
      setTitle('')
      setDescription('')
      setContent('')
      setCategory('national')
      setImageName(null)
      setImageData(null)
  setExistingImage(null)
      setEditingSlug(null)
    } catch (err: any) {
      setError(err?.message || String(err))
    }
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    setImageName(f.name)
    // clear existing uploaded image when user selects a new file
    setExistingImage(null)
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string | null
      if (result) setImageData(result)
    }
    reader.readAsDataURL(f)
  }

  async function fetchFeed() {
    setFeedError(null)
    setFeedItems(null)
    if (!feedUrl) return setFeedError('Enter a feed URL')
    try {
      const res = await fetch(`/api/import?feed=${encodeURIComponent(feedUrl)}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to fetch feed')
      setFeedItems(data.items || [])
    } catch (err: any) {
      setFeedError(err?.message || String(err))
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>
      <p className="text-sm text-gray-600 mb-4">Create a news story — entries are stored in <code>data/articles.json</code>.</p>
      {/* Add story form (top) */}
      <form onSubmit={handleSubmit} className="grid gap-3 max-w-2xl">
        <label className="flex flex-col">
          <span className="text-sm font-medium">Slug (unique)</span>
          <input className="mt-1 border border-gray-300 rounded px-2 py-1" value={slug} onChange={e => setSlug(e.target.value)} />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Title</span>
          <input className="mt-1 border border-gray-300 rounded px-2 py-1" value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Description</span>
          <input className="mt-1 border border-gray-300 rounded px-2 py-1" value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Category</span>
          <select className="mt-1 border border-gray-300 rounded px-2 py-1" value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => (<option key={c}>{c}</option>))}
            <option>uncategorized</option>
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Content</span>
          <textarea className="mt-1 border border-gray-300 rounded px-2 py-1" value={content} onChange={e => setContent(e.target.value)} rows={8} />
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Image (optional)</span>
          <input className="mt-1" type="file" accept="image/*" onChange={handleFile} />
          {imageName && <div className="text-sm text-gray-700 mt-1">Selected: {imageName}</div>}
          {/* Preview: prefer the newly selected data URL; fall back to the existing uploaded image */}
          {(imageData || existingImage) && (
            <div className="mt-2">
              {/* Preview using next/image; unoptimized for data/external URLs */}
              { (imageData || existingImage) && (
                <Image
                  src={imageData || existingImage || ''}
                  alt="Preview"
                  width={320}
                  height={180}
                  className="max-w-xs h-32 object-cover rounded"
                  unoptimized={String(imageData || existingImage).startsWith('data:') || /^https?:\/\//.test(String(imageData || existingImage))}
                />
              )}
            </div>
          )}
        </label>
        <div className="flex gap-2">
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">{editingSlug ? 'Update story' : 'Add story'}</button>
        </div>
        {error && <div className="text-red-600">{error}</div>}
        {success && <div className="text-green-600">{success}</div>}
      </form>

      {/* RSS import panel */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold">Import from RSS</h3>
        <div className="mt-2 flex gap-2">
          <input value={feedUrl} onChange={e => setFeedUrl(e.target.value)} placeholder="https://example.com/feed.xml" className="flex-1 border px-2 py-1 rounded" />
          <button onClick={fetchFeed} className="px-3 py-1 bg-indigo-600 text-white rounded">Fetch</button>
        </div>
        {feedError && <div className="text-red-600 mt-2">{feedError}</div>}
        {feedItems && (
          <div className="mt-3 grid gap-2">
            {feedItems.map((it: any) => (
              <div key={it.link} className="border p-2 rounded flex justify-between items-start">
                <div>
                  <a href={it.link} target="_blank" rel="noreferrer" className="font-medium text-sm text-blue-600">{it.title}</a>
                  <div className="text-xs text-gray-600">{it.pubDate}</div>
                  <div className="text-sm text-gray-700 mt-1">{it.contentSnippet}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={async () => {
                    // Quick import: POST to admin articles using link as source and store imageUrl if present
                    const slug = it.link?.split('/').filter(Boolean).pop() || String(Date.now())
                    const payload: any = { slug, title: it.title || 'Untitled', description: it.contentSnippet || '', content: it.content || '', category: 'uncategorized', publishedAt: it.pubDate }
                    if (it.enclosure) payload.imageUrl = it.enclosure
                    const res = await fetch('/api/admin/articles', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
                    const data = await res.json()
                    if (!res.ok) return alert('Import failed: ' + (data?.error || ''))
                    alert('Imported: ' + data.title)
                    await refreshArticles()
                  }} className="px-2 py-1 bg-green-600 text-white rounded">Import</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Categories management */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold">Categories</h3>
        <div className="mt-2 flex gap-2 items-center">
          <input value={newCategory} onChange={e => setNewCategory(e.target.value)} placeholder="New category" className="border px-2 py-1 rounded" />
          <button onClick={async () => {
            if (!newCategory.trim()) return setCategoriesError('Enter a category name')
            setCategoriesError(null)
            try {
              const res = await fetch('/api/admin/categories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newCategory.trim() }) })
              const data = await res.json()
              if (!res.ok) throw new Error(data?.error || 'Add failed')
              setCategories(data || [])
              setNewCategory('')
              setCategoriesSuccess('Category added')
              setTimeout(() => setCategoriesSuccess(null), 2500)
            } catch (err: any) {
              setCategoriesError(err?.message || String(err))
            }
          }} className="px-3 py-1 bg-blue-600 text-white rounded">Add</button>
        </div>
        {categoriesError && <div className="text-red-600 mt-2">{categoriesError}</div>}
        {categoriesSuccess && <div className="text-green-600 mt-2">{categoriesSuccess}</div>}
        <div className="mt-3 grid gap-2">
          {categories.map(c => (
            <div key={c} className="flex items-center justify-between border p-2 rounded">
              <div className="flex items-center gap-3">
                {editingCategory === c ? (
                  <input aria-label="Edit category name" placeholder="New category name" value={editingValue} onChange={e => setEditingValue(e.target.value)} className="border px-2 py-1 rounded" />
                ) : (
                  <div className="capitalize">{c}</div>
                )}
              </div>
              <div className="flex items-center gap-2">
                {editingCategory === c ? (
                  <>
                    <button onClick={async () => {
                      // Save edit
                      const newName = editingValue.trim()
                      if (!newName) return alert('Enter a name')
                      try {
                        const res = await fetch(`/api/admin/categories/${encodeURIComponent(c)}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: newName }) })
                        const data = await res.json()
                        if (!res.ok) throw new Error(data?.error || 'Update failed')
                        setCategories(data || [])
                        setEditingCategory(null)
                        setEditingValue('')
                        setCategoriesSuccess('Category updated')
                        setTimeout(() => setCategoriesSuccess(null), 2500)
                      } catch (err: any) {
                        alert('Update error: ' + (err?.message || String(err)))
                      }
                    }} className="px-2 py-1 bg-green-600 text-white rounded">Save</button>
                    <button onClick={() => { setEditingCategory(null); setEditingValue('') }} className="px-2 py-1 bg-gray-200 rounded">Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditingCategory(c); setEditingValue(c) }} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
                    <button onClick={async () => {
                      if (!confirm(`Delete category '${c}'? This will not remove posts.`)) return
                      try {
                        const res = await fetch(`/api/admin/categories/${encodeURIComponent(c)}`, { method: 'DELETE' })
                        const data = await res.json()
                        if (!res.ok) throw new Error(data?.error || 'Delete failed')
                        setCategories(data || [])
                      } catch (err: any) {
                        alert('Delete error: ' + (err?.message || String(err)))
                      }
                    }} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Posts list (bottom) */}
      <section className="mt-6">
        <h3 className="text-lg font-semibold">All posts (new → old)</h3>
        <div className="grid gap-2 mt-2">
          {articles.map(a => (
            <div key={a.slug} className="border p-3 flex justify-between items-center rounded">
              <div>
                <strong className="block">{a.title}</strong>
                <div className="text-sm text-gray-600">{a.slug} • {a.publishedAt} • {a.category}</div>
              </div>
              <div>
                <button onClick={() => startEditArticle(a)} className="mr-2 px-2 py-1 bg-gray-200 rounded">Edit</button>
                <button onClick={() => deleteArticle(a.slug)} className="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* form moved above */}
    </section>
  )
}
