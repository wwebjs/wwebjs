import { ThemeProvider } from 'next-themes'
import './global.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

import { Banner } from '@/components/banner'

export const metadata: Metadata = {
  metadataBase: new URL('https://wwebjs.2hoch1.dev'),
}

const inter = Inter({
  subsets: ['latin'],
})

export default function Layout({ children }: LayoutProps<'/'>) {
  // suppressHydrationWarning: next-themes sets class/style on <html> after hydration, causing a mismatch
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning dir="ltr">
      <body className="flex flex-col min-h-screen">
        <Banner id="banner-experimental-preview">
          <div>
            <span>This is a experimental preview</span>
            <span className="italic mx-2 text-xs">-</span>
            <span>Expect bugs and breaking changes!</span>
          </div>
        </Banner>
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
