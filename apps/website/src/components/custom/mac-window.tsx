'use client'

import React, { useRef } from 'react'
import { createPortal } from 'react-dom'
import Draggable from 'react-draggable'
import { IconMaximize, IconMinimize } from '@tabler/icons-react'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { usePopout } from '@/hooks/use-popout'
import { useMacWindowGroup } from '@/components/custom/mac-window-group'
import { cn } from '@/lib/utils'

interface TitleBarProps {
  title?: string
  dragHandle?: boolean
  action: ReactNode
}

function TitleBar({ title, dragHandle, action }: TitleBarProps) {
  return (
    <div
      data-drag-handle={dragHandle || undefined}
      className={cn(
        'flex items-center gap-2 px-4 py-3 bg-muted/50',
        dragHandle && 'cursor-grab active:cursor-grabbing'
      )}
    >
      <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
      <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
      <span className="h-3 w-3 rounded-full bg-[#28C840]" />
      {title && (
        <span className="ml-3 text-xs text-muted-foreground font-mono truncate">{title}</span>
      )}
      <div className="ml-auto">{action}</div>
    </div>
  )
}

interface MacWindowProps {
  className?: string
  children?: ReactNode
  title?: string
  groupKey?: string
}

export function MacWindow({ className, children, title, groupKey }: MacWindowProps) {
  const { isPopped, origin, containerRef, popOut, popIn } = usePopout()
  const draggableRef = useRef<HTMLDivElement>(null)
  const group = useMacWindowGroup()

  const handlePopOut = () => {
    if (group && groupKey && !group.claim(groupKey)) return
    popOut()
  }

  const handlePopIn = () => {
    if (group && groupKey) group.release(groupKey)
    popIn()
  }

  return (
    <>
      <div
        ref={containerRef}
        className={cn(
          'rounded-xl bg-card overflow-hidden transition-[filter] duration-200',
          isPopped && 'blur-sm pointer-events-none select-none',
          className
        )}
      >
        <TitleBar
          title={title}
          action={
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handlePopOut}
              className="cursor-pointer"
            >
              <IconMaximize className="size-3" />
            </Button>
          }
        />
        {children}
      </div>

      {isPopped &&
        createPortal(
          <Draggable
            nodeRef={draggableRef as React.RefObject<HTMLElement>}
            defaultPosition={{ x: origin.x, y: origin.y }}
            handle="[data-drag-handle]"
          >
            <div
              ref={draggableRef}
              style={{ position: 'fixed', top: 0, left: 0, width: origin.width, zIndex: 9999 }}
              className={cn('rounded-xl overflow-hidden shadow-2xl bg-popover', className)}
            >
              <TitleBar
                title={title}
                dragHandle
                action={
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handlePopIn}
                    className="cursor-pointer"
                  >
                    <IconMinimize className="size-3" />
                  </Button>
                }
              />
              {children}
            </div>
          </Draggable>,
          document.body
        )}
    </>
  )
}
