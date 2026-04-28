import Link from 'next/link'
import RobotIcon from '@/../public/robot.svg'

import { Marketplace } from './components/marketplace'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config'
import { SearchBar } from './search'
import { MobileNav } from './mobile-nav'
import { GitHub } from './components/github'
import { Discord } from './components/discord'
import { ModeSwitcher } from './components/mode-switcher'
import { MainNav } from './components/main-nav'

function NavLeft() {
  return (
    <div className="flex items-center">
      <MobileNav items={siteConfig.navItems} className="flex lg:hidden" />
      <Button
        variant="ghost"
        size="icon-lg"
        nativeButton={false}
        render={
          <Link href="/" aria-label={siteConfig.name}>
            <RobotIcon className="size-4" aria-hidden="true" />
          </Link>
        }
      />
      <MainNav items={siteConfig.navItems} className="hidden lg:flex" />
    </div>
  )
}

function NavRight() {
  return (
    <div className="ml-auto flex items-center gap-1">
      <SearchBar />
      <div aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
      <Marketplace />
      <div aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
      <GitHub />
      <div aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
      <Discord />
      <div aria-hidden="true" className="mx-1 h-4 w-px bg-border" />
      <ModeSwitcher />
    </div>
  )
}

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 w-full bg-background"
      style={{ '--header-height': '3.5rem' } as React.CSSProperties}
    >
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center px-4 md:px-6">
        <NavLeft />
        <NavRight />
      </div>
    </header>
  )
}
