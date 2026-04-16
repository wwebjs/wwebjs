#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import * as prompts from '@clack/prompts';
import { Command } from 'commander';
import pc from 'picocolors';
import {
  AUTH_STRATEGIES,
  LANGUAGES,
  PACKAGE_MANAGERS,
  type PackageManager,
} from './constants.js';
import { create, type CreateOptions } from './index.js';
import { getPackageManager } from './auto-install.js';
import { version } from './version.js';

function cancel(msg = 'Operation cancelled.'): never {
  prompts.cancel(msg);
  process.exit(0);
}

async function main(): Promise<void> {
  const program = new Command()
    .name('create-wwebjs-app')
    .description('Scaffold a new whatsapp-web.js project')
    .argument('[project-dir]', 'Target directory (use . for current)')
    .version(version, '-V, --version')
    .option(
      '--ts, --typescript',
      '\n  Initialize as a TypeScript project. (default)\n',
    )
    .option('--js, --javascript', '\n  Initialize as a JavaScript project.\n')
    .option('--src-dir', '\n  Initialize inside a `src/` directory.\n')
    .option('--empty', '\n  Initialize an empty project.\n')
    .option(
      '--use-npm',
      '\n  Explicitly tell the CLI to bootstrap the application using npm\n',
    )
    .option(
      '--use-pnpm',
      '\n  Explicitly tell the CLI to bootstrap the application using pnpm\n',
    )
    .option(
      '--use-yarn',
      '\n  Explicitly tell the CLI to bootstrap the application using Yarn\n',
    )
    .option(
      '--skip-install',
      '\n  Explicitly tell the CLI to skip installing packages\n',
    )
    .option(
      '--disable-git',
      '\n  Explicitly tell the CLI to skip initializing a git repository.\n',
    )
    .parse(process.argv);

  const [argDir] = program.args;
  const opts = program.opts<{
    typescript?: boolean;
    javascript?: boolean;
    srcDir?: boolean;
    empty?: boolean;
    useNpm?: boolean;
    usePnpm?: boolean;
    useYarn?: boolean;
    skipInstall?: boolean;
    disableGit?: boolean;
  }>();

  prompts.intro(pc.bgCyan(pc.black(' create-wwebjs-app ')));

  let outputDir: string;
  let projectName: string;

  if (argDir) {
    outputDir = path.resolve(process.cwd(), argDir);
    projectName = path.basename(outputDir);
  } else {
    const name = await prompts.text({
      message: 'Project name',
      placeholder: 'my-wwebjs-app',
      defaultValue: 'my-wwebjs-app',
      validate(value) {
        if (!value.trim()) return 'Project name cannot be empty.';
      },
    });
    if (prompts.isCancel(name)) cancel();
    projectName = name;
    outputDir = path.resolve(process.cwd(), projectName);
  }

  let conflictMode: 'override' | 'skip' | undefined;
  const dirExists = fs.existsSync(outputDir);
  const hasFiles = dirExists && fs.readdirSync(outputDir).length > 0;

  if (hasFiles) {
    const choice = await prompts.select({
      message: `"${projectName}" is not empty. How would you like to proceed?`,
      options: [
        {
          value: 'skip',
          label: 'Skip existing files',
          hint: 'only write files that do not exist yet',
        },
        {
          value: 'override',
          label: 'Override all',
          hint: 'clear the directory and start fresh',
        },
        { value: 'stop', label: 'Stop', hint: 'cancel the operation' },
      ],
    });
    if (prompts.isCancel(choice) || choice === 'stop') cancel();
    conflictMode = choice as 'override' | 'skip';
  }

  let language: 'typescript' | 'javascript';
  if (opts.typescript) {
    language = 'typescript';
  } else if (opts.javascript) {
    language = 'javascript';
  } else {
    const selectedLanguage = await prompts.select({
      message: 'Select a language',
      options: LANGUAGES.map((lang) => ({
        value: lang.id,
        label: lang.label,
        hint: lang.description,
      })),
      initialValue: LANGUAGES[0]!.id,
    });
    if (prompts.isCancel(selectedLanguage)) cancel();
    language = selectedLanguage as 'typescript' | 'javascript';
  }

  let useSrc: boolean;
  if (opts.empty) {
    useSrc = false;
  } else if (opts.srcDir) {
    useSrc = true;
  } else if (language === 'typescript') {
    useSrc = true;
  } else {
    const confirmedSrcDir = await prompts.confirm({
      message: 'Use a src/ directory?',
      initialValue: false,
    });
    if (prompts.isCancel(confirmedSrcDir)) cancel();
    useSrc = confirmedSrcDir as boolean;
  }

  let auth: CreateOptions['auth'];
  if (opts.empty) {
    auth = 'NoAuth';
  } else {
    const selectedAuth = await prompts.select({
      message: 'Auth strategy',
      options: AUTH_STRATEGIES.map((strategy) => ({
        value: strategy.id,
        label: strategy.label,
        hint: strategy.description,
      })),
      initialValue: AUTH_STRATEGIES[0]!.id,
    });
    if (prompts.isCancel(selectedAuth)) cancel();
    auth = selectedAuth as CreateOptions['auth'];
  }

  let packageManager: PackageManager;
  if (opts.useNpm) {
    packageManager = 'npm';
  } else if (opts.usePnpm) {
    packageManager = 'pnpm';
  } else if (opts.useYarn) {
    packageManager = 'yarn';
  } else {
    const selectedPackageManager = await prompts.select({
      message: 'Package manager',
      options: PACKAGE_MANAGERS.map((mgr) => ({
        value: mgr,
        label: mgr,
      })),
      initialValue: getPackageManager(),
    });
    if (prompts.isCancel(selectedPackageManager)) cancel();
    packageManager = selectedPackageManager as PackageManager;
  }

  let install: boolean;
  if (opts.skipInstall) {
    install = false;
  } else {
    const confirmedInstall = await prompts.confirm({
      message: 'Install dependencies automatically?',
      initialValue: true,
    });
    if (prompts.isCancel(confirmedInstall)) cancel();
    install = confirmedInstall as boolean;
  }

  const spinner = prompts.spinner();
  spinner.start('Creating project...');

  try {
    await create({
      outputDir,
      language,
      auth,
      packageManager,
      install,
      useSrc,
      initGit: !opts.disableGit,
      conflictMode,
    });

    spinner.stop('Project created!');
  } catch (err) {
    spinner.stop('Failed to create project.');
    prompts.cancel(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }

  const isCurrentDir = outputDir === process.cwd();
  prompts.outro(
    [
      pc.green('Your project is ready!'),
      '',
      'Next steps:',
      ...(isCurrentDir ? [] : [`  ${pc.cyan(`cd ${projectName}`)}`]),
      ...(install ? [] : [`  ${pc.cyan(`${packageManager} install`)}`]),
      `  ${pc.cyan(language === 'typescript' || useSrc ? `${packageManager} run start` : 'node index.js')}`,
    ].join('\n'),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
