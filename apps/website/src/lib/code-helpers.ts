export function getFileBadgeLabel(identifier: string): string {
  const ext = identifier.includes('.')
    ? (identifier.split('.').pop()?.toLowerCase() ?? '')
    : identifier.toLowerCase()

  switch (ext) {
    case 'js':
    case 'mjs':
    case 'cjs':
    case 'javascript':
      return 'JS'
    case 'ts':
    case 'mts':
    case 'typescript':
      return 'TS'
    case 'tsx':
      return 'TSX'
    case 'jsx':
      return 'JSX'
    case 'css':
      return 'CSS'
    case 'scss':
    case 'sass':
      return 'SC'
    case 'html':
      return 'HTML'
    case 'sh':
    case 'bash':
    case 'zsh':
    case 'shell':
      return 'SH'
    case 'md':
    case 'markdown':
      return 'MD'
    case 'mdx':
      return 'MDX'
    case 'json':
    case 'jsonc':
      return '{}'
    default:
      return ext.slice(0, 3).toUpperCase() || '?'
  }
}
