import type { Metadata } from 'next';
import { Footer, Layout } from 'nextra-theme-docs';
import { Head, Banner } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Navbar } from '../components/Navbar';
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let pageMap = {} as Awaited<ReturnType<typeof getPageMap>>;
  try {
    pageMap = await getPageMap();
  } catch (err) {
    pageMap = {} as typeof pageMap;
  }

  if (process.env.NODE_ENV !== 'production') {
  }

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="wwebjs" />
        <meta property="og:description" content="WhatsApp Web client for Node.js" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          banner={<Banner storageKey="wwebjs">wwebjs</Banner>}
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/wwebjs/wwebjs/tree/main/apps/website"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
