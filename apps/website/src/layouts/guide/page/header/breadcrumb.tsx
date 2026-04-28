'use client'

import React, { useRef, useState, useLayoutEffect } from 'react'
import Link from 'next/link'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import type { CrumbSegment } from '@/lib/page-tree'
import { EllipsisDropdown } from './breadcrumb-ellipsis'

const COLLAPSE_BUFFER = 16

function crumbText(seg: CrumbSegment): string {
  return 'name' in seg ? seg.name : '…'
}

function crumbKey(seg: CrumbSegment): string {
  if (seg.type === 'link') return seg.url
  if (seg.type === 'ellipsis') return 'ellipsis'
  return seg.name
}

function BreadcrumbSegment({ seg }: { seg: CrumbSegment }) {
  switch (seg.type) {
    case 'link':
      return (
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href={seg.url} />}>{seg.name}</BreadcrumbLink>
        </BreadcrumbItem>
      )
    case 'label':
      return (
        <BreadcrumbItem>
          <span data-slot="breadcrumb-label">{seg.name}</span>
        </BreadcrumbItem>
      )
    case 'page':
      return (
        <BreadcrumbItem>
          <BreadcrumbPage>{seg.name}</BreadcrumbPage>
        </BreadcrumbItem>
      )
    case 'ellipsis':
      return <EllipsisDropdown hidden={seg.hidden} />
  }
}

export function PageBreadcrumb({ crumbs }: { crumbs: CrumbSegment[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const hiddenRef = useRef<HTMLDivElement>(null)
  const [collapsed, setCollapsed] = useState(false)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    const hidden = hiddenRef.current
    if (!wrapper || !hidden) return

    const check = () => {
      const naturalWidth = hidden.scrollWidth
      const availableWidth = wrapper.clientWidth
      setCollapsed(naturalWidth > availableWidth - COLLAPSE_BUFFER)
    }

    check()
    const ro = new ResizeObserver(check)
    ro.observe(wrapper)
    return () => ro.disconnect()
  }, [crumbs])

  const displayCrumbs =
    collapsed && crumbs.length > 2
      ? [
          crumbs[0],
          { type: 'ellipsis' as const, hidden: crumbs.slice(1, -1) },
          crumbs[crumbs.length - 1],
        ]
      : crumbs

  if (!crumbs.length) return null

  return (
    <div ref={wrapperRef} className="relative overflow-hidden">
      {/* Hidden sibling used to measure the natural (unconstrained) width of all crumbs */}
      <div
        ref={hiddenRef}
        aria-hidden
        className="pointer-events-none invisible absolute flex whitespace-nowrap"
      >
        {crumbs.map((seg, i) => (
          <React.Fragment key={crumbKey(seg)}>
            {i > 0 && <span className="mx-1">/</span>}
            <span>{crumbText(seg)}</span>
          </React.Fragment>
        ))}
      </div>

      <Breadcrumb className="cursor-default">
        <BreadcrumbList>
          {displayCrumbs.map((seg, i) => (
            <React.Fragment key={crumbKey(seg)}>
              {i > 0 && <BreadcrumbSeparator />}
              <BreadcrumbSegment seg={seg} />
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
