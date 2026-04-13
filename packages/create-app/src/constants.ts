export interface Language {
  id: string;
  label: string;
  description: string;
}

export interface AuthStrategy {
  id: string;
  label: string;
  description: string;
  init: string;
}

export const LANGUAGES: Language[] = [
  {
    id: 'javascript',
    label: 'JavaScript',
    description: 'Basic setup using require() syntax',
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    description: 'TypeScript setup with tsup build tooling',
  },
];

export const AUTH_STRATEGIES: AuthStrategy[] = [
  {
    id: 'LocalAuth',
    label: 'LocalAuth',
    description: 'Saves session to local filesystem (recommended)',
    init: 'new LocalAuth()',
  },
  {
    id: 'NoAuth',
    label: 'NoAuth',
    description: 'No session persistence (for testing)',
    init: 'new NoAuth()',
  },
  {
    id: 'RemoteAuth',
    label: 'RemoteAuth',
    description: 'Remote session storage (MongoDB, S3, etc.)',
    init: [
      'new RemoteAuth({',
      '    // TODO: configure your store - https://wwebjs.dev/guide/authentication',
      '    store: null,',
      '    backupSyncIntervalMs: 300000,',
      '  })',
    ].join('\n'),
  },
];

export const PACKAGE_MANAGERS = ['npm', 'pnpm', 'yarn'] as const;
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];
