import { writeFileSync } from 'fs'

interface Folder {
  id: number
  name: string
  parent_id: number | null
}

interface Favorite {
  id: number
  name: string
  folder_id: number | null
}

interface DB {
  folders: Folder[]
  favorites: Favorite[]
}

let db: DB = {
  folders: [],
  favorites: [],
}

let nextId = 0

export function addFolder(name: string, parent_id: number | null): Folder {
  const newFolder: Folder = {
    id: nextId++,
    name: name,
    parent_id,
  }

  db.folders.push(newFolder)

  return newFolder
}

export function addFavorite(name: string, folder_id: number | null): Favorite {
  const newFavorite: Favorite = {
    id: nextId++,
    name,
    folder_id,
  }

  db.favorites.push(newFavorite)

  return newFavorite
}

// for root folder id is null
export function getFolderContents(id: number | null): DB {
  const folders = db.folders.filter((f) => f.parent_id === id)

  const favorites = db.favorites.filter((f) => f.folder_id === id)

  return {
    folders,
    favorites,
  }
}

export function saveDB() {
  writeFileSync('db.json', JSON.stringify(db), 'utf-8')
}

// for demonstration purposes, favorites have a .txt ending
export function prettyPrint(contents: DB, name: string) {
  console.log(`./${name}/`)
  console.log('-'.repeat(name.length))

  // sort alphabetically
  const folders = contents.folders.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
  const favorites = contents.favorites.sort((a, b) =>
    a.name > b.name ? 1 : a.name < b.name ? -1 : 0
  )

  // print folders first
  folders.forEach((f) => {
    console.log(`${f.name}`)
  })

  favorites.forEach((f) => {
    console.log(`${f.name}.txt`)
  })

  console.log('-'.repeat(name.length))
  console.log()
}

export function printRecursiveTree() {
  const root = getFolderContents(null)

  console.log('/')
  printTree(root, 0)
}

export function printRecursive() {
  const root = getFolderContents(null)

  printFolder(root, '/')
}

function printTree(folder: DB, indentation: number) {
  // sort alphabetically
  const folders = folder.folders.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
  const favorites = folder.favorites.sort((a, b) =>
    a.name > b.name ? 1 : a.name < b.name ? -1 : 0
  )

  folders.forEach((f, i) => {
    const char = i + 1 === folders.length ? '└─' : '├─'
    console.log(`${'  '.repeat(indentation)}${char}/${f.name}/`)
    printTree(getFolderContents(f.id), indentation + 1)
  })

  favorites.forEach((f, i) => {
    const char = i + 1 === folders.length ? '└─' : '├─'
    console.log(`${'  '.repeat(indentation)}${char}${f.name}.txt`)
  })
}

function printFolder(folder: DB, prefix: string) {
  // sort alphabetically
  const folders = folder.folders.sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0))
  const favorites = folder.favorites.sort((a, b) =>
    a.name > b.name ? 1 : a.name < b.name ? -1 : 0
  )

  folders.forEach((f) => {
    const p = `${prefix}${f.name}/`
    console.log(p)
    printFolder(getFolderContents(f.id), p)
  })

  favorites.forEach((f) => {
    console.log(`${prefix}${f.name}`)
  })
}
