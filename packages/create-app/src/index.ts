import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { PackageManager } from './constants.js';
import { autoInstall, initGit } from './auto-install.js';
import {
  clearDir,
  copy,
  getLatestVersion,
  patchAuthStrategy,
  writeFile,
} from './utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface CreateOptions {
  outputDir: string;
  language: 'javascript' | 'typescript';
  auth: 'LocalAuth' | 'RemoteAuth' | 'NoAuth';
  packageManager: PackageManager;
  install: boolean;
  useSrc?: boolean;
  initGit?: boolean;
  conflictMode?: 'override' | 'skip';
}

export async function create(options: CreateOptions): Promise<void> {
  const {
    outputDir,
    language,
    auth,
    packageManager,
    install,
    useSrc = false,
    initGit: shouldInitGit = true,
    conflictMode,
  } = options;

  const wwjsVersion = await getLatestVersion('whatsapp-web.js');

  if (conflictMode === 'override' && fs.existsSync(outputDir)) {
    clearDir(outputDir);
  }

  const templateDir = path.resolve(__dirname, '..', 'template', language);

  copy(templateDir, outputDir, {
    rename: { 'example.gitignore': '.gitignore' },
    skipExisting: conflictMode === 'skip',
  });

  const isJavaScript = language !== 'typescript';
  if (isJavaScript && useSrc) {
    const srcFile = path.join(outputDir, 'index.js');
    const destFile = path.join(outputDir, 'src', 'index.js');
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    fs.renameSync(srcFile, destFile);
  }

  const packageJsonPath = path.join(outputDir, 'package.json');
  const packageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, 'utf-8'),
  ) as Record<string, unknown>;
  packageJson['name'] = path.basename(outputDir);
  const dependencies = packageJson['dependencies'] as Record<string, string>;
  dependencies['whatsapp-web.js'] = wwjsVersion;
  if (isJavaScript && useSrc) {
    packageJson['main'] = './src/index.js';
    (packageJson['scripts'] as Record<string, string>)['start'] =
      'node src/index.js';
  }

  writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

  const entryFile =
    language === 'typescript'
      ? path.join(outputDir, 'src', 'index.ts')
      : useSrc
        ? path.join(outputDir, 'src', 'index.js')
        : path.join(outputDir, 'index.js');

  const entryContent = fs.readFileSync(entryFile, 'utf-8');
  writeFile(entryFile, patchAuthStrategy(entryContent, auth));

  if (shouldInitGit) {
    await initGit(outputDir);
  }

  if (install) {
    await autoInstall(packageManager, outputDir);
  }
}
