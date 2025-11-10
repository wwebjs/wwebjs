import type { Metadata } from 'next';
import { Footer, Layout } from 'nextra-theme-docs';
import { getPageMap } from 'nextra/page-map';
import { Navbar } from '../components/Navbar';
import React from 'react';
import Image from 'next/image';
import 'nextra-theme-docs/style.css';

export const metadata: Metadata = {
  title: 'wwebjs',
  description: 'WhatsApp Web client for Node.js',
};

const navbar = (
  <Navbar
    logo={
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 700,
          fontSize: '1.25rem',
        }}
      >
        <Image
          src="/wwebjs.png"
          alt="wwebjs"
          width={25}
          height={25}
          priority={false}
          style={{ display: 'block' }}
        />
        <span>WWebJS</span>
      </span>
    }
    projectLink="https://github.com/wwebjs/wwebjs"
    chatLink="https://discord.gg/QBVvx2B2kn"
  />
);

const footer = (
  <Footer>
    MIT {new Date().getFullYear()} ©{' '}
    <a href="https://github.com/wwebjs" target="_blank" rel="noreferrer">
      wwebjs
    </a>
  </Footer>
);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let pageMap = {} as Awaited<ReturnType<typeof getPageMap>>;
  try {
    pageMap = await getPageMap();
  } catch (_err) {
    void _err;
    pageMap = {} as typeof pageMap;
  }

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="wwebjs" />
        <meta
          property="og:description"
          content="WhatsApp Web client for Node.js"
        />
      </head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          docsRepositoryBase="https://github.com/wwebjs/wwebjs/tree/main/apps/website"
          footer={footer}
          editLink={null}
          feedback={{
            link: 'https://github.com/wwebjs/wwebjs/issues/new/choose',
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
