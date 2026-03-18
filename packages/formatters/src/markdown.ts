/**
 * Formats text as bold.
 * @param content - The text to format
 * @returns The formatted string: `*content*`
 * @example
 * bold('hello') // '*hello*'
 */
export function bold<C extends string>(content: C): `*${C}*` {
  return `*${content}*`;
}

/**
 * Formats text as italic.
 * @param content - The text to format
 * @returns The formatted string: `_content_`
 * @example
 * italic('hello') // '_hello_'
 */
export function italic<C extends string>(content: C): `_${C}_` {
  return `_${content}_`;
}

/**
 * Formats text as strikethrough.
 * @param content - The text to format
 * @returns The formatted string: `~content~`
 * @example
 * strikethrough('hello') // '~hello~'
 */
export function strikethrough<C extends string>(content: C): `~${C}~` {
  return `~${content}~`;
}

/**
 * Formats text as inline code.
 * @param content - The text to format
 * @returns The formatted string: `` `content` ``
 * @example
 * inlineCode('hello') // '`hello`'
 */
export function inlineCode<C extends string>(content: C): `\`${C}\`` {
  return `\`${content}\``;
}

/**
 * Formats text as monospace using triple backticks.
 * @param content - The text to format
 * @returns The formatted string: ` ```content``` `
 * @example
 * monospace('hello') // '```hello```'
 */
export function monospace<C extends string>(content: C): `\`\`\`${C}\`\`\`` {
  return `\`\`\`${content}\`\`\``;
}

/**
 * Formats text as a block quote.
 * @param content - The text to quote
 * @returns The formatted string: `> content`
 * @example
 * quote('hello') // '> hello'
 */
export function quote<C extends string>(content: C): `> ${C}` {
  return `> ${content}`;
}

/**
 * Formats an array of items as a bulleted list.
 * Each item is prefixed with `- `.
 * @param items - The list items
 * @returns The formatted bulleted list string
 * @example
 * bulletedList(['foo', 'bar']) // '- foo\n- bar'
 */
export function bulletedList(items: readonly string[]): string {
  return items.map((item) => `- ${item}`).join('\n');
}

/**
 * Formats an array of items as a numbered list.
 * Each item is prefixed with its 1-based index.
 * @param items - The list items
 * @returns The formatted numbered list string
 * @example
 * numberedList(['foo', 'bar']) // '1. foo\n2. bar'
 */
export function numberedList(items: readonly string[]): string {
  return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
}
