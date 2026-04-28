'use client'

import { useState, useRef } from 'react'

import { cn } from '@/lib/utils'
import { submitRating } from '@/app/actions/rating'
import { Button } from '@/components/ui/button'

import FaceSad from 'public/icons/rating/face-sad.svg'
import FaceUnhappy from 'public/icons/rating/face-unhappy.svg'
import FaceHappy from 'public/icons/rating/face-happy.svg'
import FaceSmile from 'public/icons/rating/face-smile.svg'
import CheckCircleFill from 'public/icons/rating/check-circle-fill.svg'

const faces = [
  { value: 1, label: 'Sad', Icon: FaceSad },
  { value: 2, label: 'Unhappy', Icon: FaceUnhappy },
  { value: 3, label: 'Happy', Icon: FaceHappy },
  { value: 4, label: 'Smile', Icon: FaceSmile },
]

export function PageRating({ pageUrl }: { pageUrl: string }) {
  const [selected, setSelected] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  function handleSelect(value: number) {
    if (timerRef.current) clearTimeout(timerRef.current)
    setSelected(value)
    timerRef.current = setTimeout(() => {
      void submitRating(pageUrl, value)
      setSelected(null)
    }, 2000)
  }

  return (
    <div className="inline-flex h-9 items-center gap-0.5 rounded-lg border border-border bg-background px-2">
      <span className="select-none px-1.5 text-sm text-muted-foreground">Was this helpful?</span>
      {faces.map(({ value, label, Icon }) => (
        <Button
          key={value}
          type="button"
          variant="ghost"
          size="icon"
          aria-label={label}
          aria-pressed={selected === value}
          onClick={() => handleSelect(value)}
          className={cn(
            'size-7 border border-transparent rounded-md bg-clip-padding select-none text-muted-foreground',
            selected === value && 'bg-muted text-foreground'
          )}
        >
          {selected === value ? (
            <CheckCircleFill className="size-3.5" />
          ) : (
            <Icon className="size-3.5" />
          )}
        </Button>
      ))}
    </div>
  )
}
