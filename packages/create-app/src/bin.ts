#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import * as p from '@clack/prompts';
import { Command } from 'commander';
import pc from 'picocolors';
import {
  AUTH_STRATEGIES,
  PACKAGE_MANAGERS,
  TEMPLATES,
  type PackageManager,
} from './constants.js';
import { create, type CreateOptions } from './index.js';
import { getPackageManager } from './auto-install.js';

function cancel(msg = 'Operation cancelled.'): never {
  p.cancel(msg);
  process.exit(0);
}

async function main(): Promise<void> {
  const program = new Command()
    .name('create-wwebjs-app')
    .description('Scaffold a new whatsapp-web.js project')
    .argument('[project-dir]', 'Target directory (use . for current)')
    .parse(process.argv);

  const [argDir] = program.args;

  p.intro(pc.bgCyan(pc.black(' create-wwebjs-app ')));

  let outputDir: string;
  let projectName: string;

  if (argDir) {
    outputDir = path.resolve(process.cwd(), argDir);
    projectName = path.basename(outputDir);
  } else {
    const name = await p.text({
      message: 'Project name',
      placeholder: 'my-wwebjs-app',
      defaultValue: 'my-wwebjs-app',
      validate(value) {
        if (!value.trim()) return 'Project name cannot be empty.';
      },
    });
    if (p.isCancel(name)) cancel();
    projectName = name;
    outputDir = path.resolve(process.cwd(), projectName);
  }

  let conflictMode: 'override' | 'skip' | undefined;
  const dirExists = fs.existsSync(outputDir);
  const hasFiles = dirExists && fs.readdirSync(outputDir).length > 0;

  if (hasFiles) {
    const choice = await p.select({
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
    if (p.isCancel(choice) || choice === 'stop') cancel();
    conflictMode = choice as 'override' | 'skip';
  }

  const result = await p.group(
    {
      template: () =>
        p.select({
          message: 'Select a template',
          options: TEMPLATES.map((t) => ({
            value: t.id,
            label: t.label,
            hint: t.description,
          })),
          initialValue: TEMPLATES[0]!.id,
        }),

      useSrc: ({ results }) =>
        results.template === 'typescript'
          ? Promise.resolve(true)
          : p.confirm({
              message: 'Use a src/ directory?',
              initialValue: false,
            }),

      auth: () =>
        p.select({
          message: 'Auth strategy',
          options: AUTH_STRATEGIES.map((a) => ({
            value: a.id,
            label: a.label,
            hint: a.description,
          })),
          initialValue: AUTH_STRATEGIES[0]!.id,
        }),

      packageManager: () =>
        p.select({
          message: 'Package manager',
          options: PACKAGE_MANAGERS.map((pm) => ({
            value: pm,
            label: pm,
          })),
          initialValue: getPackageManager(),
        }),

      install: () =>
        p.confirm({
          message: 'Install dependencies automatically?',
          initialValue: true,
        }),
    },
    {
      onCancel() {
        cancel();
      },
    },
  );

  const spinner = p.spinner();
  spinner.start('Creating project...');

  try {
    await create({
      outputDir,
      template: result.template as CreateOptions['template'],
      auth: result.auth as CreateOptions['auth'],
      packageManager: result.packageManager as PackageManager,
      install: result.install as boolean,
      useSrc: result.useSrc as boolean,
      conflictMode,
    });

    spinner.stop('Project created!');
  } catch (err) {
    spinner.stop('Failed to create project.');
    p.cancel(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }

  const isCurrentDir = outputDir === process.cwd();
  p.outro(
    [
      pc.green('Your project is ready!'),
      '',
      'Next steps:',
      ...(isCurrentDir ? [] : [`  ${pc.cyan(`cd ${projectName}`)}`]),
      ...(result.install
        ? []
        : [`  ${pc.cyan(`${result.packageManager} install`)}`]),
      `  ${pc.cyan(result.template === 'typescript' || result.useSrc ? `${result.packageManager} run start` : 'node index.js')}`,
    ].join('\n'),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
