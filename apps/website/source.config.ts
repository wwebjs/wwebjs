import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from 'fumadocs-mdx/config'
import rehypePrettyCode from 'rehype-pretty-code'
import { z } from 'zod'

import { transformers } from './src/lib/highlight-code'

const docsSchema = frontmatterSchema.extend({
  lastModified: z.coerce.date().optional(),
  badges: z.array(z.string()).optional(),
  notice: z.string().optional(),
})

export const docs = defineDocs({
  dir: 'content/guide',
  docs: {
    schema: docsSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
})

export const formatterDocs = defineDocs({
  dir: 'content/formatters',
  docs: {
    schema: docsSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
})

export const legacyDocs = defineDocs({
  dir: 'content/legacy',
  docs: {
    schema: docsSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
})

export default defineConfig({
  mdxOptions: {
    rehypePlugins: plugins => {
      // Remove fumadocs' default code highlighting plugin.
      plugins.shift()
      // Add rehype-pretty-code with our custom Shiki transformers.
      plugins.push([
        rehypePrettyCode,
        {
          theme: {
            dark: 'github-dark',
            light: 'github-light',
          },
          transformers,
        },
      ])
      return plugins
    },
  },
})
