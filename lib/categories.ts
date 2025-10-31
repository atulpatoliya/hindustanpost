import fs from 'fs'
import path from 'path'

export function ensureCategoriesFile() {
  const DATA_DIR = path.join(process.cwd(), 'data')
  const FILE = path.join(DATA_DIR, 'categories.json')
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, JSON.stringify(['national', 'international', 'business', 'politics', 'sports', 'crime'], null, 2), 'utf8')
  }
  return FILE
}

export function readCategoriesFromFile(): string[] {
  const FILE = ensureCategoriesFile()
  try {
    const raw = fs.readFileSync(FILE, 'utf8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed
    return []
  } catch (err) {
    return []
  }
}

export function saveCategoriesToFile(categories: string[]) {
  const FILE = ensureCategoriesFile()
  fs.writeFileSync(FILE, JSON.stringify(categories, null, 2), 'utf8')
}

export function getAllCategories() {
  return readCategoriesFromFile()
}

export function addCategory(name: string) {
  const categories = readCategoriesFromFile()
  const normalized = String(name).trim()
  if (!normalized) throw new Error('invalid category')
  if (!categories.includes(normalized)) {
    categories.push(normalized)
    saveCategoriesToFile(categories)
  }
  return categories
}

export function removeCategory(name: string) {
  const categories = readCategoriesFromFile()
  const idx = categories.indexOf(name)
  if (idx !== -1) {
    categories.splice(idx, 1)
    saveCategoriesToFile(categories)
  }
  return categories
}

export function updateCategory(oldName: string, newName: string) {
  const categories = readCategoriesFromFile()
  const normalizedOld = String(oldName).trim()
  const normalizedNew = String(newName).trim()
  if (!normalizedOld || !normalizedNew) throw new Error('invalid category name')
  const idx = categories.indexOf(normalizedOld)
  if (idx === -1) throw new Error('category not found')
  // avoid duplicate
  if (categories.includes(normalizedNew) && normalizedNew !== normalizedOld) {
    throw new Error('category already exists')
  }
  categories[idx] = normalizedNew
  saveCategoriesToFile(categories)
  return categories
}
