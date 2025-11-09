import { generateStaticParamsFor, importPage } from 'nextra/pages';
import type { FC } from 'react';
import type { Metadata } from 'next';
import { useMDXComponents as getMDXComponents } from '../../../../mdx-components.js';

export const generateStaticParams = generateStaticParamsFor('mdxPath');

type PageProps = Readonly<{
  params: Promise<{
    mdxPath?: string[];
    lang?: string;
  }>;
}>;

function resolveMdxPathArr(mdxPath?: string[] | undefined) {
  if (!mdxPath || !mdxPath.length) return [];
  if (mdxPath.some((s) => s.startsWith('.'))) return null;
  return mdxPath;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const mdxPathArr = resolveMdxPathArr(params.mdxPath);
  if (mdxPathArr === null) return {} as Metadata;

  try {
    const { metadata } = await importPage(mdxPathArr);
    return metadata as Metadata;
  } catch {
    return {} as Metadata;
  }
}

const Wrapper = getMDXComponents().wrapper;

const Page: FC<PageProps> = async (props) => {
  const params = await props.params;
  const mdxPathArr = resolveMdxPathArr(params.mdxPath);
  if (mdxPathArr === null) return null as unknown as React.ReactElement;

  const result = await importPage(mdxPathArr);
  const { default: MDXContent, toc, metadata, sourceCode } = result;
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
};

export default Page;
