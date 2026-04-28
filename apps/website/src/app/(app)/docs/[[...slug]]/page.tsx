import { notFound } from 'next/navigation'
import { source } from '@/lib/source'
import { DocsPageContent } from '@/layouts/docs'

export default async function Page(props: PageProps<'/docs/[[...slug]]'>) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  return (
    <DocsPageContent
      title={page.data.title || undefined}
      description={page.data.description || undefined}
      MDX={(page.data as { body?: Parameters<typeof DocsPageContent>[0]['MDX'] }).body}
    />
  )
}
