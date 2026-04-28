import { format } from 'prettier'
import * as prettierPluginBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import * as prettierPluginTypescript from 'prettier/plugins/typescript'
import * as prettierPluginPostcss from 'prettier/plugins/postcss'
import * as prettierPluginHtml from 'prettier/plugins/html'
import * as prettierPluginMarkdown from 'prettier/plugins/markdown'

const PRETTIER_OPTIONS = {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  arrowParens: 'always',
} as const

type PrettierConfig = { parser: string; plugins: object[] }

const LANGUAGE_PARSERS: Record<string, PrettierConfig> = {
  ts: { parser: 'typescript', plugins: [prettierPluginTypescript, prettierPluginEstree] },
  tsx: { parser: 'typescript', plugins: [prettierPluginTypescript, prettierPluginEstree] },
  typescript: { parser: 'typescript', plugins: [prettierPluginTypescript, prettierPluginEstree] },
  js: { parser: 'babel', plugins: [prettierPluginBabel, prettierPluginEstree] },
  jsx: { parser: 'babel', plugins: [prettierPluginBabel, prettierPluginEstree] },
  javascript: { parser: 'babel', plugins: [prettierPluginBabel, prettierPluginEstree] },
  json: { parser: 'json', plugins: [prettierPluginBabel, prettierPluginEstree] },
  css: { parser: 'css', plugins: [prettierPluginPostcss] },
  scss: { parser: 'scss', plugins: [prettierPluginPostcss] },
  html: { parser: 'html', plugins: [prettierPluginHtml] },
  markdown: { parser: 'markdown', plugins: [prettierPluginMarkdown] },
  md: { parser: 'markdown', plugins: [prettierPluginMarkdown] },
  mdx: { parser: 'mdx', plugins: [prettierPluginMarkdown] },
}

export async function formatCode(code: string, language: string): Promise<string> {
  const config = LANGUAGE_PARSERS[language]
  if (!config) return code
  try {
    const formatted = await format(code, { ...PRETTIER_OPTIONS, ...config })
    return formatted.trimEnd()
  } catch {
    return code
  }
}
