import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { MDXComponents } from 'mdx/types'

import { cn } from '@/lib/utils'
import { Callout } from '@/components/callout'
import { CodeBlock } from '@/components/code-block'
import { WhatsAppChatPreview } from '@/components/custom/whatsapp-chat-preview'
import { CodeCollapsibleWrapper } from '@/components/code-collapsible-wrapper'
import { CodePreview } from '@/components/code-preview'
import { CopyButton } from '@/components/copy-button'
import { InstallTabs } from '@/components/install-tabs'
import { PackageManagerTabs } from '@/components/package-manager-tabs-dynamic'
import { Button } from '@/components/ui/button'
import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { File, Folder, Files } from 'fumadocs-ui/components/files'
import {
  AccordionCard,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/accordion-card'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    h1: ({ className, children, ...props }: React.ComponentProps<'h1'>) => (
      <h1
        className={cn('mt-2 scroll-m-28 font-heading text-3xl font-bold tracking-tight', className)}
        {...props}
      >
        {children}
      </h1>
    ),
    h2: ({ className, children, ...props }: React.ComponentProps<'h2'>) => (
      <h2
        id={children
          ?.toString()
          .replace(/ /g, '-')
          .replace(/'/g, '')
          .replace(/\?/g, '')
          .toLowerCase()}
        className={cn(
          'mt-10 scroll-m-28 font-heading text-xl font-medium tracking-tight first:mt-0 lg:mt-12 [&+.steps]:mt-0! [&+.steps>.step]:mt-4! [&+h3]:mt-6! [&+p]:mt-4!',
          className
        )}
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ className, children, ...props }: React.ComponentProps<'h3'>) => (
      <h3
        className={cn(
          'mt-12 scroll-m-28 font-heading text-lg font-medium tracking-tight [&+p]:mt-4!',
          className
        )}
        {...props}
      >
        {children}
      </h3>
    ),
    h4: ({ className, children, ...props }: React.ComponentProps<'h4'>) => (
      <h4
        className={cn(
          'mt-8 scroll-m-28 font-heading text-base font-medium tracking-tight',
          className
        )}
        {...props}
      >
        {children}
      </h4>
    ),
    h5: ({ className, children, ...props }: React.ComponentProps<'h5'>) => (
      <h5
        className={cn('mt-8 scroll-m-28 text-base font-medium tracking-tight', className)}
        {...props}
      >
        {children}
      </h5>
    ),
    h6: ({ className, children, ...props }: React.ComponentProps<'h6'>) => (
      <h6
        className={cn('mt-8 scroll-m-28 text-base font-medium tracking-tight', className)}
        {...props}
      >
        {children}
      </h6>
    ),
    a: ({ className, ...props }: React.ComponentProps<'a'>) => (
      <a className={cn('font-medium underline underline-offset-4', className)} {...props} />
    ),
    p: ({ className, ...props }: React.ComponentProps<'p'>) => (
      <p className={cn('leading-relaxed [&:not(:first-child)]:mt-6', className)} {...props} />
    ),
    strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <strong className={cn('font-medium', className)} {...props} />
    ),
    ul: ({ className, ...props }: React.ComponentProps<'ul'>) => (
      <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />
    ),
    ol: ({ className, ...props }: React.ComponentProps<'ol'>) => (
      <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />
    ),
    li: ({ className, ...props }: React.ComponentProps<'li'>) => (
      <li className={cn('mt-2', className)} {...props} />
    ),
    blockquote: ({ className, ...props }: React.ComponentProps<'blockquote'>) => (
      <blockquote className={cn('mt-6 border-l-2 pl-6 italic', className)} {...props} />
    ),
    img: ({ className, alt, src, width, height, ...props }: React.ComponentProps<'img'>) => (
      <Image
        className={cn('rounded-md', className)}
        src={(src as string) || ''}
        width={Number(width) || 800}
        height={Number(height) || 600}
        alt={alt || ''}
        {...props}
      />
    ),
    hr: ({ ...props }: React.ComponentProps<'hr'>) => <hr className="my-4 md:my-8" {...props} />,
    table: ({ className, ...props }: React.ComponentProps<'table'>) => (
      <div className="my-6 no-scrollbar w-full overflow-y-auto rounded-xl border">
        <table
          className={cn(
            'relative w-full overflow-hidden border-none text-sm [&_tbody_tr:last-child]:border-b-0',
            className
          )}
          {...props}
        />
      </div>
    ),
    tr: ({ className, ...props }: React.ComponentProps<'tr'>) => (
      <tr className={cn('m-0 border-b', className)} {...props} />
    ),
    th: ({ className, ...props }: React.ComponentProps<'th'>) => (
      <th
        className={cn(
          'px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }: React.ComponentProps<'td'>) => (
      <td
        className={cn(
          'px-4 py-2 text-left whitespace-nowrap [&[align=center]]:text-center [&[align=right]]:text-right',
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, children, ...props }: React.ComponentProps<'pre'>) => (
      <pre
        className={cn(
          'no-scrollbar overflow-x-auto overflow-y-auto overscroll-x-contain overscroll-y-auto px-4 py-3.5 outline-none has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 has-[[data-slot=tabs]]:p-0',
          className
        )}
        {...props}
      >
        {children}
      </pre>
    ),
    figure: ({ className, ...props }: React.ComponentProps<'figure'>) => (
      <figure className={cn(className)} {...props} />
    ),
    figcaption: ({ className, children, ...props }: React.ComponentProps<'figcaption'>) => (
      <figcaption
        className={cn(
          'flex items-center gap-2 text-code-foreground [&_svg]:size-4 [&_svg]:text-code-foreground [&_svg]:opacity-70',
          className
        )}
        {...props}
      >
        {children}
      </figcaption>
    ),
    code: ({
      className,
      __raw__,
      __npm__,
      __yarn__,
      __pnpm__,
      ...props
    }: React.ComponentProps<'code'> & {
      __raw__?: string
      __npm__?: string
      __yarn__?: string
      __pnpm__?: string
    }) => {
      if (__npm__ && __yarn__ && __pnpm__) {
        return <PackageManagerTabs npm={__npm__} yarn={__yarn__} pnpm={__pnpm__} />
      }
      return (
        <>
          {__raw__ && <CopyButton value={__raw__} />}
          <code className={className} {...props} />
        </>
      )
    },
    Step: ({ className, ...props }: React.ComponentProps<'div'>) => (
      <div className={cn('step', className)} {...props} />
    ),
    Steps: ({ className, ...props }: React.ComponentProps<'div'>) => (
      <div className={cn('steps', className)} {...props} />
    ),
    Image: ({ src, className, width, height, alt, ...props }: React.ComponentProps<'img'>) => (
      <Image
        className={cn('mt-6 rounded-md border', className)}
        src={(src as string) || ''}
        width={Number(width)}
        height={Number(height)}
        alt={alt || ''}
        {...props}
      />
    ),
    Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
      <Tabs className={cn('relative mt-6 w-full', className)} {...props} />
    ),
    TabsList: ({ className, ...props }: React.ComponentProps<typeof TabsList>) => (
      <TabsList
        variant="line"
        className={cn('justify-start gap-4 rounded-none bg-transparent px-0', className)}
        {...props}
      />
    ),
    TabsTrigger: ({ className, ...props }: React.ComponentProps<typeof TabsTrigger>) => (
      <TabsTrigger
        className={cn(
          'rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base text-muted-foreground hover:text-foreground data-active:border-primary data-active:bg-transparent data-active:text-foreground data-active:shadow-none!',
          className
        )}
        {...props}
      />
    ),
    TabsContent: ({ className, ...props }: React.ComponentProps<typeof TabsContent>) => (
      <TabsContent
        className={cn(
          'relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium [&>.steps]:mt-6',
          className
        )}
        {...props}
      />
    ),
    Tab: ({ className, ...props }: React.ComponentProps<'div'>) => (
      <div className={cn(className)} {...props} />
    ),
    Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
      <Link className={cn('font-medium underline underline-offset-4', className)} {...props} />
    ),
    LinkedCard: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
      <Link
        className={cn(
          'flex w-full flex-col items-center rounded-xl bg-muted p-6 text-foreground transition-colors hover:bg-muted/80 sm:p-10',
          className
        )}
        {...props}
      />
    ),
    Button,
    Cards: ({ className, ...props }: React.ComponentProps<'div'>) => (
      <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', className)} {...props} />
    ),
    Card: ({
      className,
      variant,
      ...props
    }: React.ComponentProps<typeof ShadcnCard> & { variant?: 'default' | 'light' }) => (
      <ShadcnCard
        className={cn(
          'mt-6',
          variant === 'light'
            ? 'bg-background border-border/50 shadow-none'
            : 'bg-muted/50 dark:bg-fd-card',
          className
        )}
        {...props}
      />
    ),
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Callout,
    CodeBlock,
    WhatsAppChatPreview,
    CodeCollapsibleWrapper,
    CodePreview,
    InstallTabs,
    PackageManagerTabs,
    File,
    Folder,
    Files,
    AccordionCard,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    CodeBlockTabs: Tabs,
    CodeBlockTabsList: TabsList,
    CodeBlockTabsTrigger: TabsTrigger,
    CodeBlockTab: TabsContent,
    ...components,
  }
}
