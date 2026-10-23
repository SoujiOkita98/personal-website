import { useEffect, useRef } from 'react'
import './text-scramble.css'

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>_/[]{}'
const DURATION_MS = 700
const FRAME_MS = 1000 / 30

interface TextScrambleProps {
  text: string
  replayKey?: string
}

export default function TextScramble({ text, replayKey }: TextScrambleProps) {
  const rootRef = useRef<HTMLSpanElement>(null)
  const layerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const layer = layerRef.current
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!root || !layer || media.matches) return

    let frame = 0
    let startedAt: number | undefined
    let lastPaint = -Infinity
    const finish = () => {
      window.cancelAnimationFrame(frame)
      delete root.dataset.scrambling
      layer.textContent = text
    }
    const animate = (now: number) => {
      startedAt ??= now
      const progress = Math.min(1, (now - startedAt) / DURATION_MS)
      if (progress >= 1) {
        finish()
        return
      }
      if (now - lastPaint >= FRAME_MS) {
        const revealed = Math.floor(progress * text.length)
        layer.textContent = Array.from(text, (character, index) => (
          /\s/.test(character) || index < revealed
            ? character
            : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
        )).join('')
        root.dataset.scrambling = 'true'
        lastPaint = now
      }
      frame = window.requestAnimationFrame(animate)
    }
    const handleMotionChange = (event: MediaQueryListEvent) => {
      if (event.matches) finish()
    }

    frame = window.requestAnimationFrame(animate)
    media.addEventListener('change', handleMotionChange)
    return () => {
      finish()
      media.removeEventListener('change', handleMotionChange)
    }
  }, [text, replayKey])

  return (
    <span ref={rootRef} className="text-scramble">
      <span className="text-scramble-source">{text}</span>
      <span ref={layerRef} className="text-scramble-layer" aria-hidden="true">{text}</span>
    </span>
  )
}
