import fs from 'node:fs';
import path from 'node:path';
import { AUTH_STRATEGIES } from './constants.js';

export interface CopyOptions {
  rename?: Record<string, string>;
  skipExisting?: boolean;
}

export function copy(
  src: string,
  dest: string,
  options: CopyOptions = {},
): void {
  const { rename = {}, skipExisting = false } = options;
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      const destName = rename[child] ?? child;
      copy(path.join(src, child), path.join(dest, destName), options);
    }
  } else {
    if (skipExisting && fs.existsSync(dest)) return;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

export function clearDir(dir: string): void {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      fs.rmSync(entryPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(entryPath);
    }
  }
}

export function writeFile(filePath: string, content: string): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf-8');
}

export async function getLatestVersion(packageName: string): Promise<string> {
  const response = await fetch(
    `https://registry.npmjs.org/${packageName}/latest`,
    { signal: AbortSignal.timeout(10_000) },
  );
  if (!response.ok)
    throw new Error(`Failed to fetch latest version for "${packageName}"`);
  const json = (await response.json()) as { version: string };
  return `^${json.version}`;
}

export function patchAuthStrategy(content: string, auth: string): string {
  const strategy = AUTH_STRATEGIES.find(
    (authStrategy) => authStrategy.id === auth,
  );
  const init = strategy?.init ?? AUTH_STRATEGIES[0]!.init;

  return content
    .replaceAll('__AUTH_CLASS__', auth)
    .replaceAll('__AUTH_INIT__', init);
}
