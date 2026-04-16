import { x } from 'tinyexec';
import type { PackageManager } from './constants.js';

export function getPackageManager(): PackageManager {
  const agent = process.env['npm_config_user_agent'] ?? '';

  if (agent.startsWith('pnpm')) return 'pnpm';
  if (agent.startsWith('yarn')) return 'yarn';
  return 'npm';
}

export async function autoInstall(
  pm: PackageManager,
  cwd: string,
): Promise<void> {
  await x(pm, ['install'], {
    nodeOptions: { cwd, stdio: 'inherit' },
  });
}

export async function initGit(cwd: string): Promise<void> {
  try {
    await x('git', ['init'], { nodeOptions: { cwd, stdio: 'ignore' } });
    await x('git', ['add', '-A'], { nodeOptions: { cwd, stdio: 'ignore' } });
  } catch {
    // git not available, skip silently
  }
}
