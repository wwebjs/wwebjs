import { searchPath } from 'fumadocs-core/breadcrumb'
import type { Root, Node } from 'fumadocs-core/page-tree'

import type { source } from '@/lib/source'

export type PageTreeNode = (typeof source.pageTree)['children'][number]
export type PageTreeFolder = Extract<PageTreeNode, { type: 'folder' }>
export type PageTreePage = Extract<PageTreeNode, { type: 'page' }>
export type PageTreeSeparator = Extract<PageTreeNode, { type: 'separator' }>

export function getAllPagesFromFolder(folder: PageTreeFolder): PageTreePage[] {
  const pages: PageTreePage[] = []
  for (const child of folder.children) {
    if (child.type === 'page') pages.push(child as PageTreePage)
    else if (child.type === 'folder') pages.push(...getAllPagesFromFolder(child as PageTreeFolder))
  }
  return pages
}

export type CrumbSegment =
  | { type: 'link'; name: string; url: string }
  | { type: 'label'; name: string }
  | { type: 'page'; name: string }
  | { type: 'ellipsis'; hidden: CrumbSegment[] }

type FolderNode = Extract<Node, { type: 'folder' }>

function folderCrumb(node: FolderNode, next: Node | undefined): CrumbSegment {
  const name = String(node.name ?? '')
  if (node.index === next || !node.index?.url) return { type: 'label', name }
  return { type: 'link', name, url: node.index.url }
}

export function getPageCrumbs(
  tree: Root,
  url: string,
  root?: { name: string; url: string }
): CrumbSegment[] {
  const path = searchPath(tree.children as Node[], url)
  if (!path?.length) return []

  const raw: CrumbSegment[] = []
  for (let i = 0; i < path.length; i++) {
    const node = path[i]
    if (node.type === 'separator') {
      raw.push({ type: 'label', name: String(node.name ?? '') })
    } else if (node.type === 'folder') {
      raw.push(folderCrumb(node, path[i + 1]))
    } else if (node.type === 'page') {
      raw.push({ type: 'page', name: String(node.name ?? '') })
    }
  }

  if (!raw.length) return []

  if (root) {
    return [{ type: 'link', name: root.name, url: root.url }, ...raw]
  }

  return raw
}
