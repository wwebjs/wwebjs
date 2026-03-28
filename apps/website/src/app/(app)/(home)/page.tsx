import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { HomeTabs } from './page.client'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Header */}
      <section className="w-full max-w-3xl mx-auto px-4 pt-16 pb-16 text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
          Build WhatsApp Automation, with whatsapp-web.js
        </h1>

        <p className="text-lg text-foreground max-w-xl mx-auto">
          A Node.js library for interacting with WhatsApp Web, allowing you to automate tasks, send
          messages and manage your WhatsApp.
        </p>

        <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
          <Link href="/guide/">
            <Button size="lg" className="hover:bg-primary/80">
              Get Started
            </Button>
          </Link>
          <Link href="/docs/">
            <Button size="lg" variant="ghost">
              API Reference
            </Button>
          </Link>
        </div>
      </section>

      {/* Main */}
      <main className="w-full max-w-[90rem] mx-auto px-4">
        <HomeTabs />
      </main>

      {/* Footer */}
      <footer className="w-full" />
    </div>
  )
}
