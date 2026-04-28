import { createElement } from 'react'
import { docs, formatterDocs, legacyDocs } from 'fumadocs-mdx:collections/server'
import { type InferPageType, loader } from 'fumadocs-core/source'
import * as TablerIcons from '@tabler/icons-react'

function tablerIconsPlugin() {
  function replaceIcon<T extends { icon?: unknown }>(node: T): T {
    if (node.icon === undefined || typeof node.icon === 'string') {
      const name = node.icon as string | undefined
      if (!name) return node
      const icons = TablerIcons as unknown as Record<string, React.ComponentType>
      const Icon = icons[`Icon${name}Filled`] ?? icons[`Icon${name}`]
      if (!Icon) {
        console.warn(`[tabler-icons-plugin] Unknown icon: ${name}`)
        return node
      }
      node.icon = createElement(Icon)
    }
    return node
  }
  return {
    name: 'fumadocs:icon',
    transformPageTree: {
      file: replaceIcon,
      folder: replaceIcon,
      separator: replaceIcon,
    },
  }
}

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: '/guide',
  source: docs.toFumadocsSource(),
  plugins: [tablerIconsPlugin()],
})

export const formatterSource = loader({
  baseUrl: '/guide/formatters',
  source: formatterDocs.toFumadocsSource(),
  plugins: [tablerIconsPlugin()],
})

export const legacySource = loader({
  baseUrl: '/guide/legacy',
  source: legacyDocs.toFumadocsSource(),
  plugins: [tablerIconsPlugin()],
})

export function getPageImage(
  page: InferPageType<typeof source> | InferPageType<typeof legacySource>
) {
  const segments = [...page.slugs, 'image.png']

  return {
    segments,
    url: `/og/docs/${segments.join('/')}`,
  }
}

export async function getLLMText(page: InferPageType<typeof source>) {
  const data = page.data as typeof page.data & {
    getText?: (type: string) => Promise<string>
  }
  const processed = (await data.getText?.('processed')) ?? ''

  return `# ${page.data.title ?? ''}

${processed}`
}
