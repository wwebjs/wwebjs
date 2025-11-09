import type { NextConfig } from 'next';
import nextra from 'nextra';

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
  contentDirBasePath: '/',
});

const config: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/discover/:path*', destination: '/docs/discover/:path*' },
      { source: '/about/:path*', destination: '/docs/about/:path*' },
      { source: '/sponsor/:path*', destination: '/docs/sponsor/:path*' },
    ];
  },
};

export default withNextra(config);
