import { readFileSync } from 'fs'
import { join } from 'path'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Examples } from './examples'
import { NpmDownloadsChart, type RawNpmData } from './page.client'

function readNpmData(): RawNpmData {
  try {
    const raw = readFileSync(join(process.cwd(), 'public/data/npm-downloads.json'), 'utf-8')
    return JSON.parse(raw) as RawNpmData
  } catch {
    return {}
  }
}

export default function HomePage() {
  const npmData = readNpmData()

  return (
    <div className="flex flex-col items-center w-full">
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

      <main className="w-full max-w-[90rem] mx-auto px-4 space-y-24 pb-24">
        <section className="space-y-6">
          <Examples />
        </section>

        <section className="space-y-6">
          <NpmDownloadsChart data={npmData} />
        </section>
      </main>

      <footer className="w-full" />
    </div>
  )
}
