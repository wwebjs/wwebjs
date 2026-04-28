import { DocsBody } from 'fumadocs-ui/page'
import { getMDXComponents } from '@/mdx-components'

type DocsPageContentProps = {
  title: string | undefined
  description?: string | undefined | null
  MDX: React.ComponentType<{ components: ReturnType<typeof getMDXComponents> }> | undefined
}

export function DocsPageContent({ title, description, MDX }: DocsPageContentProps) {
  return (
    <div
      data-slot="docs"
      className="flex min-w-0 flex-1 flex-col scroll-mt-24 text-[1.05rem] sm:text-[15px]"
    >
      <div className="h-(--top-spacing) shrink-0" />
      <div className="mx-auto flex w-full max-w-[calc(52rem+10px)] min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
        <div className="flex flex-col gap-3 pb-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-base text-muted-foreground">{description}</p>}
        </div>
        <DocsBody className="mt-6 w-full flex-1 pb-16 *:data-[slot=alert]:first:mt-0 sm:pb-0">
          {MDX && <MDX components={getMDXComponents()} />}
        </DocsBody>
      </div>
    </div>
  )
}
