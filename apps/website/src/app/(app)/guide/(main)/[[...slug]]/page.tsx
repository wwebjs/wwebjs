import { notFound, redirect } from 'next/navigation'
import { findNeighbour } from 'fumadocs-core/page-tree'
import { getGithubLastEdit } from 'fumadocs-core/content/github'
import type { Metadata } from 'next'

import { getPageImage, source } from '@/lib/source'
import { getPageCrumbs, findFirstPageUnder, type PageTreeNode } from '@/lib/page-tree'
import { GuidePageContent, getSectionCrumb } from '@/layouts/guide'

function redirectToFirstChild(slug: string[] | undefined): never {
  const prefix = '/guide/' + (slug ?? []).join('/') + '/'
  const firstUrl = findFirstPageUnder(source.pageTree.children as PageTreeNode[], prefix)
  if (firstUrl) redirect(firstUrl)
  notFound()
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: PageProps<'/guide/[[...slug]]'>): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) redirectToFirstChild(params.slug)

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: { images: getPageImage(page).url },
  }
}

export default async function Page(props: PageProps<'/guide/[[...slug]]'>) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) redirectToFirstChild(params.slug)

  // fumadocs-mdx injects these fields at runtime but they're absent from the generated PageData type
  const data = page.data as typeof page.data & {
    body?: Parameters<typeof GuidePageContent>[0]['MDX']
    getText?: (type: string) => Promise<string>
    lastModified?: Date
    toc?: Parameters<typeof GuidePageContent>[0]['toc']
    badges?: string[]
  }

  const raw = (await data.getText?.('raw')) ?? ''
  const lastModified = await getGithubLastEdit({
    owner: 'wwebjs',
    repo: 'wwebjs',
    path: `apps/website/content/guide/${page.path}`,
    token: process.env.GITHUB_TOKEN,
  }).catch(() => data.lastModified)

  return (
    <GuidePageContent
      title={page.data.title ?? ''}
      description={page.data.description}
      toc={data.toc ?? []}
      breadcrumbs={getPageCrumbs(source.pageTree, page.url, getSectionCrumb('guide'))}
      neighbours={findNeighbour(source.pageTree, page.url)}
      lastModified={lastModified ?? undefined}
      badges={data.badges}
      markdownUrl={`/llms.mdx${page.url}`}
      githubUrl={`https://github.com/wwebjs/wwebjs/edit/main/apps/website/content/guide/${page.path}`}
      page={raw}
      url={`https://wwebjs.dev${page.url}`}
      MDX={data.body!}
    />
  )
}
